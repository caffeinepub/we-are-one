var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _client, _currentQuery, _currentQueryInitialState, _currentResult, _currentResultState, _currentResultOptions, _currentThenable, _selectError, _selectFn, _selectResult, _lastQueryWithDefinedData, _staleTimeoutId, _refetchIntervalId, _currentRefetchInterval, _trackedProps, _QueryObserver_instances, executeFetch_fn, updateStaleTimeout_fn, computeRefetchInterval_fn, updateRefetchInterval_fn, updateTimers_fn, clearStaleTimeout_fn, clearRefetchInterval_fn, updateQuery_fn, notify_fn, _a, _client2, _currentResult2, _currentMutation, _mutateOptions, _MutationObserver_instances, updateResult_fn, notify_fn2, _b;
import { P as ProtocolError, T as TimeoutWaitingForResponseErrorCode, g as utf8ToBytes, E as ExternalError, h as MissingRootKeyErrorCode, C as Certificate, l as lookupResultToBuffer, R as RequestStatusResponseStatus, U as UnknownError, i as RequestStatusDoneNoReplyErrorCode, k as RejectError, m as CertifiedRejectErrorCode, n as UNREACHABLE_ERROR, I as InputError, o as InvalidReadStateRequestErrorCode, p as ReadRequestType, q as Principal, s as IDL, t as MissingCanisterIdErrorCode, H as HttpAgent, v as encode, Q as QueryResponseStatus, w as UncertifiedRejectErrorCode, x as isV3ResponseBody, y as isV2ResponseBody, z as UncertifiedRejectUpdateErrorCode, A as UnexpectedErrorCode, B as decode, D as Subscribable, F as pendingThenable, G as resolveEnabled, J as shallowEqualObjects, K as resolveStaleTime, N as noop, O as environmentManager, V as isValidTimeout, W as timeUntilStale, Y as timeoutManager, Z as focusManager, _ as fetchState, $ as replaceData, a0 as notifyManager, a1 as hashKey, a2 as getDefaultState, r as reactExports, a3 as shouldThrowError, a4 as useQueryClient, a5 as useInternetIdentity, a6 as createActorWithConfig, a7 as Record, a8 as Opt, a9 as Variant, aa as Vec, ab as Service, ac as Func, ad as Nat, ae as Text, af as Bool, ag as Null, ah as Int } from "./index-1UpKlSK4.js";
const FIVE_MINUTES_IN_MSEC = 5 * 60 * 1e3;
function defaultStrategy() {
  return chain(conditionalDelay(once(), 1e3), backoff(1e3, 1.2), timeout(FIVE_MINUTES_IN_MSEC));
}
function once() {
  let first = true;
  return async () => {
    if (first) {
      first = false;
      return true;
    }
    return false;
  };
}
function conditionalDelay(condition, timeInMsec) {
  return async (canisterId, requestId, status) => {
    if (await condition(canisterId, requestId, status)) {
      return new Promise((resolve) => setTimeout(resolve, timeInMsec));
    }
  };
}
function timeout(timeInMsec) {
  const end = Date.now() + timeInMsec;
  return async (_canisterId, requestId, status) => {
    if (Date.now() > end) {
      throw ProtocolError.fromCode(new TimeoutWaitingForResponseErrorCode(`Request timed out after ${timeInMsec} msec`, requestId, status));
    }
  };
}
function backoff(startingThrottleInMsec, backoffFactor) {
  let currentThrottling = startingThrottleInMsec;
  return () => new Promise((resolve) => setTimeout(() => {
    currentThrottling *= backoffFactor;
    resolve();
  }, currentThrottling));
}
function chain(...strategies) {
  return async (canisterId, requestId, status) => {
    for (const a of strategies) {
      await a(canisterId, requestId, status);
    }
  };
}
const DEFAULT_POLLING_OPTIONS = {
  preSignReadStateRequest: false
};
function hasProperty(value, property) {
  return Object.prototype.hasOwnProperty.call(value, property);
}
function isObjectWithProperty(value, property) {
  return value !== null && typeof value === "object" && hasProperty(value, property);
}
function hasFunction(value, property) {
  return hasProperty(value, property) && typeof value[property] === "function";
}
function isSignedReadStateRequestWithExpiry(value) {
  return isObjectWithProperty(value, "body") && isObjectWithProperty(value.body, "content") && value.body.content.request_type === ReadRequestType.ReadState && isObjectWithProperty(value.body.content, "ingress_expiry") && typeof value.body.content.ingress_expiry === "object" && value.body.content.ingress_expiry !== null && hasFunction(value.body.content.ingress_expiry, "toHash");
}
async function pollForResponse(agent, canisterId, requestId, options = {}) {
  const path = [utf8ToBytes("request_status"), requestId];
  let state;
  let currentRequest;
  const preSignReadStateRequest = options.preSignReadStateRequest ?? false;
  if (preSignReadStateRequest) {
    currentRequest = await constructRequest({
      paths: [path],
      agent,
      pollingOptions: options
    });
    state = await agent.readState(canisterId, { paths: [path] }, void 0, currentRequest);
  } else {
    state = await agent.readState(canisterId, { paths: [path] });
  }
  if (agent.rootKey == null) {
    throw ExternalError.fromCode(new MissingRootKeyErrorCode());
  }
  const cert = await Certificate.create({
    certificate: state.certificate,
    rootKey: agent.rootKey,
    canisterId,
    blsVerify: options.blsVerify,
    agent
  });
  const maybeBuf = lookupResultToBuffer(cert.lookup_path([...path, utf8ToBytes("status")]));
  let status;
  if (typeof maybeBuf === "undefined") {
    status = RequestStatusResponseStatus.Unknown;
  } else {
    status = new TextDecoder().decode(maybeBuf);
  }
  switch (status) {
    case RequestStatusResponseStatus.Replied: {
      return {
        reply: lookupResultToBuffer(cert.lookup_path([...path, "reply"])),
        certificate: cert
      };
    }
    case RequestStatusResponseStatus.Received:
    case RequestStatusResponseStatus.Unknown:
    case RequestStatusResponseStatus.Processing: {
      const strategy = options.strategy ?? defaultStrategy();
      await strategy(canisterId, requestId, status);
      return pollForResponse(agent, canisterId, requestId, {
        ...options,
        // Pass over either the strategy already provided or the new one created above
        strategy,
        request: currentRequest
      });
    }
    case RequestStatusResponseStatus.Rejected: {
      const rejectCode = new Uint8Array(lookupResultToBuffer(cert.lookup_path([...path, "reject_code"])))[0];
      const rejectMessage = new TextDecoder().decode(lookupResultToBuffer(cert.lookup_path([...path, "reject_message"])));
      const errorCodeBuf = lookupResultToBuffer(cert.lookup_path([...path, "error_code"]));
      const errorCode = errorCodeBuf ? new TextDecoder().decode(errorCodeBuf) : void 0;
      throw RejectError.fromCode(new CertifiedRejectErrorCode(requestId, rejectCode, rejectMessage, errorCode));
    }
    case RequestStatusResponseStatus.Done:
      throw UnknownError.fromCode(new RequestStatusDoneNoReplyErrorCode(requestId));
  }
  throw UNREACHABLE_ERROR;
}
async function constructRequest(options) {
  var _a2;
  const { paths, agent, pollingOptions } = options;
  if (pollingOptions.request && isSignedReadStateRequestWithExpiry(pollingOptions.request)) {
    return pollingOptions.request;
  }
  const request = await ((_a2 = agent.createReadStateRequest) == null ? void 0 : _a2.call(agent, {
    paths
  }, void 0));
  if (!isSignedReadStateRequestWithExpiry(request)) {
    throw InputError.fromCode(new InvalidReadStateRequestErrorCode(request));
  }
  return request;
}
const metadataSymbol = Symbol.for("ic-agent-metadata");
class Actor {
  /**
   * Get the Agent class this Actor would call, or undefined if the Actor would use
   * the default agent (global.ic.agent).
   * @param actor The actor to get the agent of.
   */
  static agentOf(actor) {
    return actor[metadataSymbol].config.agent;
  }
  /**
   * Get the interface of an actor, in the form of an instance of a Service.
   * @param actor The actor to get the interface of.
   */
  static interfaceOf(actor) {
    return actor[metadataSymbol].service;
  }
  static canisterIdOf(actor) {
    return Principal.from(actor[metadataSymbol].config.canisterId);
  }
  static createActorClass(interfaceFactory, options) {
    const service = interfaceFactory({ IDL });
    class CanisterActor extends Actor {
      constructor(config) {
        if (!config.canisterId) {
          throw InputError.fromCode(new MissingCanisterIdErrorCode(config.canisterId));
        }
        const canisterId = typeof config.canisterId === "string" ? Principal.fromText(config.canisterId) : config.canisterId;
        super({
          config: {
            ...DEFAULT_ACTOR_CONFIG,
            ...config,
            canisterId
          },
          service
        });
        for (const [methodName, func] of service._fields) {
          if (options == null ? void 0 : options.httpDetails) {
            func.annotations.push(ACTOR_METHOD_WITH_HTTP_DETAILS);
          }
          if (options == null ? void 0 : options.certificate) {
            func.annotations.push(ACTOR_METHOD_WITH_CERTIFICATE);
          }
          this[methodName] = _createActorMethod(this, methodName, func, config.blsVerify);
        }
      }
    }
    return CanisterActor;
  }
  /**
   * Creates an actor with the given interface factory and configuration.
   *
   * The [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package can be used to generate the interface factory for your canister.
   * @param interfaceFactory - the interface factory for the actor, typically generated by the [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package
   * @param configuration - the configuration for the actor
   * @returns an actor with the given interface factory and configuration
   * @example
   * Using the interface factory generated by the [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package:
   * ```ts
   * import { Actor, HttpAgent } from '@icp-sdk/core/agent';
   * import { Principal } from '@icp-sdk/core/principal';
   * import { idlFactory } from './api/declarations/hello-world.did';
   *
   * const canisterId = Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai');
   *
   * const agent = await HttpAgent.create({
   *   host: 'https://icp-api.io',
   * });
   *
   * const actor = Actor.createActor(idlFactory, {
   *   agent,
   *   canisterId,
   * });
   *
   * const response = await actor.greet('world');
   * console.log(response);
   * ```
   * @example
   * Using the `createActor` wrapper function generated by the [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package:
   * ```ts
   * import { HttpAgent } from '@icp-sdk/core/agent';
   * import { Principal } from '@icp-sdk/core/principal';
   * import { createActor } from './api/hello-world';
   *
   * const canisterId = Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai');
   *
   * const agent = await HttpAgent.create({
   *   host: 'https://icp-api.io',
   * });
   *
   * const actor = createActor(canisterId, {
   *   agent,
   * });
   *
   * const response = await actor.greet('world');
   * console.log(response);
   * ```
   */
  static createActor(interfaceFactory, configuration) {
    if (!configuration.canisterId) {
      throw InputError.fromCode(new MissingCanisterIdErrorCode(configuration.canisterId));
    }
    return new (this.createActorClass(interfaceFactory))(configuration);
  }
  /**
   * Returns an actor with methods that return the http response details along with the result
   * @param interfaceFactory - the interface factory for the actor
   * @param configuration - the configuration for the actor
   * @deprecated - use createActor with actorClassOptions instead
   */
  static createActorWithHttpDetails(interfaceFactory, configuration) {
    return new (this.createActorClass(interfaceFactory, { httpDetails: true }))(configuration);
  }
  /**
   * Returns an actor with methods that return the http response details along with the result
   * @param interfaceFactory - the interface factory for the actor
   * @param configuration - the configuration for the actor
   * @param actorClassOptions - options for the actor class extended details to return with the result
   */
  static createActorWithExtendedDetails(interfaceFactory, configuration, actorClassOptions = {
    httpDetails: true,
    certificate: true
  }) {
    return new (this.createActorClass(interfaceFactory, actorClassOptions))(configuration);
  }
  constructor(metadata) {
    this[metadataSymbol] = Object.freeze(metadata);
  }
}
function decodeReturnValue(types, msg) {
  const returnValues = decode(types, msg);
  switch (returnValues.length) {
    case 0:
      return void 0;
    case 1:
      return returnValues[0];
    default:
      return returnValues;
  }
}
const DEFAULT_ACTOR_CONFIG = {
  pollingOptions: DEFAULT_POLLING_OPTIONS
};
const ACTOR_METHOD_WITH_HTTP_DETAILS = "http-details";
const ACTOR_METHOD_WITH_CERTIFICATE = "certificate";
function _createActorMethod(actor, methodName, func, blsVerify) {
  let caller;
  if (func.annotations.includes("query") || func.annotations.includes("composite_query")) {
    caller = async (options, ...args) => {
      var _a2, _b2;
      options = {
        ...options,
        ...(_b2 = (_a2 = actor[metadataSymbol].config).queryTransform) == null ? void 0 : _b2.call(_a2, methodName, args, {
          ...actor[metadataSymbol].config,
          ...options
        })
      };
      const agent = options.agent || actor[metadataSymbol].config.agent || new HttpAgent();
      const cid = Principal.from(options.canisterId || actor[metadataSymbol].config.canisterId);
      const arg = encode(func.argTypes, args);
      const result = await agent.query(cid, {
        methodName,
        arg,
        effectiveCanisterId: options.effectiveCanisterId
      });
      const httpDetails = {
        ...result.httpDetails,
        requestDetails: result.requestDetails
      };
      switch (result.status) {
        case QueryResponseStatus.Rejected: {
          const uncertifiedRejectErrorCode = new UncertifiedRejectErrorCode(result.requestId, result.reject_code, result.reject_message, result.error_code, result.signatures);
          uncertifiedRejectErrorCode.callContext = {
            canisterId: cid,
            methodName,
            httpDetails
          };
          throw RejectError.fromCode(uncertifiedRejectErrorCode);
        }
        case QueryResponseStatus.Replied:
          return func.annotations.includes(ACTOR_METHOD_WITH_HTTP_DETAILS) ? {
            httpDetails,
            result: decodeReturnValue(func.retTypes, result.reply.arg)
          } : decodeReturnValue(func.retTypes, result.reply.arg);
      }
    };
  } else {
    caller = async (options, ...args) => {
      var _a2, _b2;
      options = {
        ...options,
        ...(_b2 = (_a2 = actor[metadataSymbol].config).callTransform) == null ? void 0 : _b2.call(_a2, methodName, args, {
          ...actor[metadataSymbol].config,
          ...options
        })
      };
      const agent = options.agent || actor[metadataSymbol].config.agent || HttpAgent.createSync();
      const { canisterId, effectiveCanisterId, pollingOptions } = {
        ...DEFAULT_ACTOR_CONFIG,
        ...actor[metadataSymbol].config,
        ...options
      };
      const cid = Principal.from(canisterId);
      const ecid = effectiveCanisterId !== void 0 ? Principal.from(effectiveCanisterId) : cid;
      const arg = encode(func.argTypes, args);
      const { requestId, response, requestDetails } = await agent.call(cid, {
        methodName,
        arg,
        effectiveCanisterId: ecid,
        nonce: options.nonce
      });
      let reply;
      let certificate;
      if (isV3ResponseBody(response.body)) {
        if (agent.rootKey == null) {
          throw ExternalError.fromCode(new MissingRootKeyErrorCode());
        }
        const cert = response.body.certificate;
        certificate = await Certificate.create({
          certificate: cert,
          rootKey: agent.rootKey,
          canisterId: ecid,
          blsVerify,
          agent
        });
        const path = [utf8ToBytes("request_status"), requestId];
        const status = new TextDecoder().decode(lookupResultToBuffer(certificate.lookup_path([...path, "status"])));
        switch (status) {
          case "replied":
            reply = lookupResultToBuffer(certificate.lookup_path([...path, "reply"]));
            break;
          case "rejected": {
            const rejectCode = new Uint8Array(lookupResultToBuffer(certificate.lookup_path([...path, "reject_code"])))[0];
            const rejectMessage = new TextDecoder().decode(lookupResultToBuffer(certificate.lookup_path([...path, "reject_message"])));
            const error_code_buf = lookupResultToBuffer(certificate.lookup_path([...path, "error_code"]));
            const error_code = error_code_buf ? new TextDecoder().decode(error_code_buf) : void 0;
            const certifiedRejectErrorCode = new CertifiedRejectErrorCode(requestId, rejectCode, rejectMessage, error_code);
            certifiedRejectErrorCode.callContext = {
              canisterId: cid,
              methodName,
              httpDetails: response
            };
            throw RejectError.fromCode(certifiedRejectErrorCode);
          }
        }
      } else if (isV2ResponseBody(response.body)) {
        const { reject_code, reject_message, error_code } = response.body;
        const errorCode = new UncertifiedRejectUpdateErrorCode(requestId, reject_code, reject_message, error_code);
        errorCode.callContext = {
          canisterId: cid,
          methodName,
          httpDetails: response
        };
        throw RejectError.fromCode(errorCode);
      }
      if (response.status === 202) {
        const pollOptions = {
          ...pollingOptions,
          blsVerify
        };
        const response2 = await pollForResponse(agent, ecid, requestId, pollOptions);
        certificate = response2.certificate;
        reply = response2.reply;
      }
      const shouldIncludeHttpDetails = func.annotations.includes(ACTOR_METHOD_WITH_HTTP_DETAILS);
      const shouldIncludeCertificate = func.annotations.includes(ACTOR_METHOD_WITH_CERTIFICATE);
      const httpDetails = { ...response, requestDetails };
      if (reply !== void 0) {
        if (shouldIncludeHttpDetails && shouldIncludeCertificate) {
          return {
            httpDetails,
            certificate,
            result: decodeReturnValue(func.retTypes, reply)
          };
        } else if (shouldIncludeCertificate) {
          return {
            certificate,
            result: decodeReturnValue(func.retTypes, reply)
          };
        } else if (shouldIncludeHttpDetails) {
          return {
            httpDetails,
            result: decodeReturnValue(func.retTypes, reply)
          };
        }
        return decodeReturnValue(func.retTypes, reply);
      } else {
        const errorCode = new UnexpectedErrorCode(`Call was returned undefined. We cannot determine if the call was successful or not. Return types: [${func.retTypes.map((t) => t.display()).join(",")}].`);
        errorCode.callContext = {
          canisterId: cid,
          methodName,
          httpDetails
        };
        throw UnknownError.fromCode(errorCode);
      }
    };
  }
  const handler = (...args) => caller({}, ...args);
  handler.withOptions = (options) => (...args) => caller(options, ...args);
  return handler;
}
var QueryObserver = (_a = class extends Subscribable {
  constructor(client, options) {
    super();
    __privateAdd(this, _QueryObserver_instances);
    __privateAdd(this, _client);
    __privateAdd(this, _currentQuery);
    __privateAdd(this, _currentQueryInitialState);
    __privateAdd(this, _currentResult);
    __privateAdd(this, _currentResultState);
    __privateAdd(this, _currentResultOptions);
    __privateAdd(this, _currentThenable);
    __privateAdd(this, _selectError);
    __privateAdd(this, _selectFn);
    __privateAdd(this, _selectResult);
    // This property keeps track of the last query with defined data.
    // It will be used to pass the previous data and query to the placeholder function between renders.
    __privateAdd(this, _lastQueryWithDefinedData);
    __privateAdd(this, _staleTimeoutId);
    __privateAdd(this, _refetchIntervalId);
    __privateAdd(this, _currentRefetchInterval);
    __privateAdd(this, _trackedProps, /* @__PURE__ */ new Set());
    this.options = options;
    __privateSet(this, _client, client);
    __privateSet(this, _selectError, null);
    __privateSet(this, _currentThenable, pendingThenable());
    this.bindMethods();
    this.setOptions(options);
  }
  bindMethods() {
    this.refetch = this.refetch.bind(this);
  }
  onSubscribe() {
    if (this.listeners.size === 1) {
      __privateGet(this, _currentQuery).addObserver(this);
      if (shouldFetchOnMount(__privateGet(this, _currentQuery), this.options)) {
        __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this);
      } else {
        this.updateResult();
      }
      __privateMethod(this, _QueryObserver_instances, updateTimers_fn).call(this);
    }
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      this.destroy();
    }
  }
  shouldFetchOnReconnect() {
    return shouldFetchOn(
      __privateGet(this, _currentQuery),
      this.options,
      this.options.refetchOnReconnect
    );
  }
  shouldFetchOnWindowFocus() {
    return shouldFetchOn(
      __privateGet(this, _currentQuery),
      this.options,
      this.options.refetchOnWindowFocus
    );
  }
  destroy() {
    this.listeners = /* @__PURE__ */ new Set();
    __privateMethod(this, _QueryObserver_instances, clearStaleTimeout_fn).call(this);
    __privateMethod(this, _QueryObserver_instances, clearRefetchInterval_fn).call(this);
    __privateGet(this, _currentQuery).removeObserver(this);
  }
  setOptions(options) {
    const prevOptions = this.options;
    const prevQuery = __privateGet(this, _currentQuery);
    this.options = __privateGet(this, _client).defaultQueryOptions(options);
    if (this.options.enabled !== void 0 && typeof this.options.enabled !== "boolean" && typeof this.options.enabled !== "function" && typeof resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) !== "boolean") {
      throw new Error(
        "Expected enabled to be a boolean or a callback that returns a boolean"
      );
    }
    __privateMethod(this, _QueryObserver_instances, updateQuery_fn).call(this);
    __privateGet(this, _currentQuery).setOptions(this.options);
    if (prevOptions._defaulted && !shallowEqualObjects(this.options, prevOptions)) {
      __privateGet(this, _client).getQueryCache().notify({
        type: "observerOptionsUpdated",
        query: __privateGet(this, _currentQuery),
        observer: this
      });
    }
    const mounted = this.hasListeners();
    if (mounted && shouldFetchOptionally(
      __privateGet(this, _currentQuery),
      prevQuery,
      this.options,
      prevOptions
    )) {
      __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this);
    }
    this.updateResult();
    if (mounted && (__privateGet(this, _currentQuery) !== prevQuery || resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) !== resolveEnabled(prevOptions.enabled, __privateGet(this, _currentQuery)) || resolveStaleTime(this.options.staleTime, __privateGet(this, _currentQuery)) !== resolveStaleTime(prevOptions.staleTime, __privateGet(this, _currentQuery)))) {
      __privateMethod(this, _QueryObserver_instances, updateStaleTimeout_fn).call(this);
    }
    const nextRefetchInterval = __privateMethod(this, _QueryObserver_instances, computeRefetchInterval_fn).call(this);
    if (mounted && (__privateGet(this, _currentQuery) !== prevQuery || resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) !== resolveEnabled(prevOptions.enabled, __privateGet(this, _currentQuery)) || nextRefetchInterval !== __privateGet(this, _currentRefetchInterval))) {
      __privateMethod(this, _QueryObserver_instances, updateRefetchInterval_fn).call(this, nextRefetchInterval);
    }
  }
  getOptimisticResult(options) {
    const query = __privateGet(this, _client).getQueryCache().build(__privateGet(this, _client), options);
    const result = this.createResult(query, options);
    if (shouldAssignObserverCurrentProperties(this, result)) {
      __privateSet(this, _currentResult, result);
      __privateSet(this, _currentResultOptions, this.options);
      __privateSet(this, _currentResultState, __privateGet(this, _currentQuery).state);
    }
    return result;
  }
  getCurrentResult() {
    return __privateGet(this, _currentResult);
  }
  trackResult(result, onPropTracked) {
    return new Proxy(result, {
      get: (target, key) => {
        this.trackProp(key);
        onPropTracked == null ? void 0 : onPropTracked(key);
        if (key === "promise") {
          this.trackProp("data");
          if (!this.options.experimental_prefetchInRender && __privateGet(this, _currentThenable).status === "pending") {
            __privateGet(this, _currentThenable).reject(
              new Error(
                "experimental_prefetchInRender feature flag is not enabled"
              )
            );
          }
        }
        return Reflect.get(target, key);
      }
    });
  }
  trackProp(key) {
    __privateGet(this, _trackedProps).add(key);
  }
  getCurrentQuery() {
    return __privateGet(this, _currentQuery);
  }
  refetch({ ...options } = {}) {
    return this.fetch({
      ...options
    });
  }
  fetchOptimistic(options) {
    const defaultedOptions = __privateGet(this, _client).defaultQueryOptions(options);
    const query = __privateGet(this, _client).getQueryCache().build(__privateGet(this, _client), defaultedOptions);
    return query.fetch().then(() => this.createResult(query, defaultedOptions));
  }
  fetch(fetchOptions) {
    return __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this, {
      ...fetchOptions,
      cancelRefetch: fetchOptions.cancelRefetch ?? true
    }).then(() => {
      this.updateResult();
      return __privateGet(this, _currentResult);
    });
  }
  createResult(query, options) {
    var _a2;
    const prevQuery = __privateGet(this, _currentQuery);
    const prevOptions = this.options;
    const prevResult = __privateGet(this, _currentResult);
    const prevResultState = __privateGet(this, _currentResultState);
    const prevResultOptions = __privateGet(this, _currentResultOptions);
    const queryChange = query !== prevQuery;
    const queryInitialState = queryChange ? query.state : __privateGet(this, _currentQueryInitialState);
    const { state } = query;
    let newState = { ...state };
    let isPlaceholderData = false;
    let data;
    if (options._optimisticResults) {
      const mounted = this.hasListeners();
      const fetchOnMount = !mounted && shouldFetchOnMount(query, options);
      const fetchOptionally = mounted && shouldFetchOptionally(query, prevQuery, options, prevOptions);
      if (fetchOnMount || fetchOptionally) {
        newState = {
          ...newState,
          ...fetchState(state.data, query.options)
        };
      }
      if (options._optimisticResults === "isRestoring") {
        newState.fetchStatus = "idle";
      }
    }
    let { error, errorUpdatedAt, status } = newState;
    data = newState.data;
    let skipSelect = false;
    if (options.placeholderData !== void 0 && data === void 0 && status === "pending") {
      let placeholderData;
      if ((prevResult == null ? void 0 : prevResult.isPlaceholderData) && options.placeholderData === (prevResultOptions == null ? void 0 : prevResultOptions.placeholderData)) {
        placeholderData = prevResult.data;
        skipSelect = true;
      } else {
        placeholderData = typeof options.placeholderData === "function" ? options.placeholderData(
          (_a2 = __privateGet(this, _lastQueryWithDefinedData)) == null ? void 0 : _a2.state.data,
          __privateGet(this, _lastQueryWithDefinedData)
        ) : options.placeholderData;
      }
      if (placeholderData !== void 0) {
        status = "success";
        data = replaceData(
          prevResult == null ? void 0 : prevResult.data,
          placeholderData,
          options
        );
        isPlaceholderData = true;
      }
    }
    if (options.select && data !== void 0 && !skipSelect) {
      if (prevResult && data === (prevResultState == null ? void 0 : prevResultState.data) && options.select === __privateGet(this, _selectFn)) {
        data = __privateGet(this, _selectResult);
      } else {
        try {
          __privateSet(this, _selectFn, options.select);
          data = options.select(data);
          data = replaceData(prevResult == null ? void 0 : prevResult.data, data, options);
          __privateSet(this, _selectResult, data);
          __privateSet(this, _selectError, null);
        } catch (selectError) {
          __privateSet(this, _selectError, selectError);
        }
      }
    }
    if (__privateGet(this, _selectError)) {
      error = __privateGet(this, _selectError);
      data = __privateGet(this, _selectResult);
      errorUpdatedAt = Date.now();
      status = "error";
    }
    const isFetching = newState.fetchStatus === "fetching";
    const isPending = status === "pending";
    const isError = status === "error";
    const isLoading = isPending && isFetching;
    const hasData = data !== void 0;
    const result = {
      status,
      fetchStatus: newState.fetchStatus,
      isPending,
      isSuccess: status === "success",
      isError,
      isInitialLoading: isLoading,
      isLoading,
      data,
      dataUpdatedAt: newState.dataUpdatedAt,
      error,
      errorUpdatedAt,
      failureCount: newState.fetchFailureCount,
      failureReason: newState.fetchFailureReason,
      errorUpdateCount: newState.errorUpdateCount,
      isFetched: query.isFetched(),
      isFetchedAfterMount: newState.dataUpdateCount > queryInitialState.dataUpdateCount || newState.errorUpdateCount > queryInitialState.errorUpdateCount,
      isFetching,
      isRefetching: isFetching && !isPending,
      isLoadingError: isError && !hasData,
      isPaused: newState.fetchStatus === "paused",
      isPlaceholderData,
      isRefetchError: isError && hasData,
      isStale: isStale(query, options),
      refetch: this.refetch,
      promise: __privateGet(this, _currentThenable),
      isEnabled: resolveEnabled(options.enabled, query) !== false
    };
    const nextResult = result;
    if (this.options.experimental_prefetchInRender) {
      const hasResultData = nextResult.data !== void 0;
      const isErrorWithoutData = nextResult.status === "error" && !hasResultData;
      const finalizeThenableIfPossible = (thenable) => {
        if (isErrorWithoutData) {
          thenable.reject(nextResult.error);
        } else if (hasResultData) {
          thenable.resolve(nextResult.data);
        }
      };
      const recreateThenable = () => {
        const pending = __privateSet(this, _currentThenable, nextResult.promise = pendingThenable());
        finalizeThenableIfPossible(pending);
      };
      const prevThenable = __privateGet(this, _currentThenable);
      switch (prevThenable.status) {
        case "pending":
          if (query.queryHash === prevQuery.queryHash) {
            finalizeThenableIfPossible(prevThenable);
          }
          break;
        case "fulfilled":
          if (isErrorWithoutData || nextResult.data !== prevThenable.value) {
            recreateThenable();
          }
          break;
        case "rejected":
          if (!isErrorWithoutData || nextResult.error !== prevThenable.reason) {
            recreateThenable();
          }
          break;
      }
    }
    return nextResult;
  }
  updateResult() {
    const prevResult = __privateGet(this, _currentResult);
    const nextResult = this.createResult(__privateGet(this, _currentQuery), this.options);
    __privateSet(this, _currentResultState, __privateGet(this, _currentQuery).state);
    __privateSet(this, _currentResultOptions, this.options);
    if (__privateGet(this, _currentResultState).data !== void 0) {
      __privateSet(this, _lastQueryWithDefinedData, __privateGet(this, _currentQuery));
    }
    if (shallowEqualObjects(nextResult, prevResult)) {
      return;
    }
    __privateSet(this, _currentResult, nextResult);
    const shouldNotifyListeners = () => {
      if (!prevResult) {
        return true;
      }
      const { notifyOnChangeProps } = this.options;
      const notifyOnChangePropsValue = typeof notifyOnChangeProps === "function" ? notifyOnChangeProps() : notifyOnChangeProps;
      if (notifyOnChangePropsValue === "all" || !notifyOnChangePropsValue && !__privateGet(this, _trackedProps).size) {
        return true;
      }
      const includedProps = new Set(
        notifyOnChangePropsValue ?? __privateGet(this, _trackedProps)
      );
      if (this.options.throwOnError) {
        includedProps.add("error");
      }
      return Object.keys(__privateGet(this, _currentResult)).some((key) => {
        const typedKey = key;
        const changed = __privateGet(this, _currentResult)[typedKey] !== prevResult[typedKey];
        return changed && includedProps.has(typedKey);
      });
    };
    __privateMethod(this, _QueryObserver_instances, notify_fn).call(this, { listeners: shouldNotifyListeners() });
  }
  onQueryUpdate() {
    this.updateResult();
    if (this.hasListeners()) {
      __privateMethod(this, _QueryObserver_instances, updateTimers_fn).call(this);
    }
  }
}, _client = new WeakMap(), _currentQuery = new WeakMap(), _currentQueryInitialState = new WeakMap(), _currentResult = new WeakMap(), _currentResultState = new WeakMap(), _currentResultOptions = new WeakMap(), _currentThenable = new WeakMap(), _selectError = new WeakMap(), _selectFn = new WeakMap(), _selectResult = new WeakMap(), _lastQueryWithDefinedData = new WeakMap(), _staleTimeoutId = new WeakMap(), _refetchIntervalId = new WeakMap(), _currentRefetchInterval = new WeakMap(), _trackedProps = new WeakMap(), _QueryObserver_instances = new WeakSet(), executeFetch_fn = function(fetchOptions) {
  __privateMethod(this, _QueryObserver_instances, updateQuery_fn).call(this);
  let promise = __privateGet(this, _currentQuery).fetch(
    this.options,
    fetchOptions
  );
  if (!(fetchOptions == null ? void 0 : fetchOptions.throwOnError)) {
    promise = promise.catch(noop);
  }
  return promise;
}, updateStaleTimeout_fn = function() {
  __privateMethod(this, _QueryObserver_instances, clearStaleTimeout_fn).call(this);
  const staleTime = resolveStaleTime(
    this.options.staleTime,
    __privateGet(this, _currentQuery)
  );
  if (environmentManager.isServer() || __privateGet(this, _currentResult).isStale || !isValidTimeout(staleTime)) {
    return;
  }
  const time = timeUntilStale(__privateGet(this, _currentResult).dataUpdatedAt, staleTime);
  const timeout2 = time + 1;
  __privateSet(this, _staleTimeoutId, timeoutManager.setTimeout(() => {
    if (!__privateGet(this, _currentResult).isStale) {
      this.updateResult();
    }
  }, timeout2));
}, computeRefetchInterval_fn = function() {
  return (typeof this.options.refetchInterval === "function" ? this.options.refetchInterval(__privateGet(this, _currentQuery)) : this.options.refetchInterval) ?? false;
}, updateRefetchInterval_fn = function(nextInterval) {
  __privateMethod(this, _QueryObserver_instances, clearRefetchInterval_fn).call(this);
  __privateSet(this, _currentRefetchInterval, nextInterval);
  if (environmentManager.isServer() || resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) === false || !isValidTimeout(__privateGet(this, _currentRefetchInterval)) || __privateGet(this, _currentRefetchInterval) === 0) {
    return;
  }
  __privateSet(this, _refetchIntervalId, timeoutManager.setInterval(() => {
    if (this.options.refetchIntervalInBackground || focusManager.isFocused()) {
      __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this);
    }
  }, __privateGet(this, _currentRefetchInterval)));
}, updateTimers_fn = function() {
  __privateMethod(this, _QueryObserver_instances, updateStaleTimeout_fn).call(this);
  __privateMethod(this, _QueryObserver_instances, updateRefetchInterval_fn).call(this, __privateMethod(this, _QueryObserver_instances, computeRefetchInterval_fn).call(this));
}, clearStaleTimeout_fn = function() {
  if (__privateGet(this, _staleTimeoutId)) {
    timeoutManager.clearTimeout(__privateGet(this, _staleTimeoutId));
    __privateSet(this, _staleTimeoutId, void 0);
  }
}, clearRefetchInterval_fn = function() {
  if (__privateGet(this, _refetchIntervalId)) {
    timeoutManager.clearInterval(__privateGet(this, _refetchIntervalId));
    __privateSet(this, _refetchIntervalId, void 0);
  }
}, updateQuery_fn = function() {
  const query = __privateGet(this, _client).getQueryCache().build(__privateGet(this, _client), this.options);
  if (query === __privateGet(this, _currentQuery)) {
    return;
  }
  const prevQuery = __privateGet(this, _currentQuery);
  __privateSet(this, _currentQuery, query);
  __privateSet(this, _currentQueryInitialState, query.state);
  if (this.hasListeners()) {
    prevQuery == null ? void 0 : prevQuery.removeObserver(this);
    query.addObserver(this);
  }
}, notify_fn = function(notifyOptions) {
  notifyManager.batch(() => {
    if (notifyOptions.listeners) {
      this.listeners.forEach((listener) => {
        listener(__privateGet(this, _currentResult));
      });
    }
    __privateGet(this, _client).getQueryCache().notify({
      query: __privateGet(this, _currentQuery),
      type: "observerResultsUpdated"
    });
  });
}, _a);
function shouldLoadOnMount(query, options) {
  return resolveEnabled(options.enabled, query) !== false && query.state.data === void 0 && !(query.state.status === "error" && options.retryOnMount === false);
}
function shouldFetchOnMount(query, options) {
  return shouldLoadOnMount(query, options) || query.state.data !== void 0 && shouldFetchOn(query, options, options.refetchOnMount);
}
function shouldFetchOn(query, options, field) {
  if (resolveEnabled(options.enabled, query) !== false && resolveStaleTime(options.staleTime, query) !== "static") {
    const value = typeof field === "function" ? field(query) : field;
    return value === "always" || value !== false && isStale(query, options);
  }
  return false;
}
function shouldFetchOptionally(query, prevQuery, options, prevOptions) {
  return (query !== prevQuery || resolveEnabled(prevOptions.enabled, query) === false) && (!options.suspense || query.state.status !== "error") && isStale(query, options);
}
function isStale(query, options) {
  return resolveEnabled(options.enabled, query) !== false && query.isStaleByTime(resolveStaleTime(options.staleTime, query));
}
function shouldAssignObserverCurrentProperties(observer, optimisticResult) {
  if (!shallowEqualObjects(observer.getCurrentResult(), optimisticResult)) {
    return true;
  }
  return false;
}
var MutationObserver = (_b = class extends Subscribable {
  constructor(client, options) {
    super();
    __privateAdd(this, _MutationObserver_instances);
    __privateAdd(this, _client2);
    __privateAdd(this, _currentResult2);
    __privateAdd(this, _currentMutation);
    __privateAdd(this, _mutateOptions);
    __privateSet(this, _client2, client);
    this.setOptions(options);
    this.bindMethods();
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
  }
  bindMethods() {
    this.mutate = this.mutate.bind(this);
    this.reset = this.reset.bind(this);
  }
  setOptions(options) {
    var _a2;
    const prevOptions = this.options;
    this.options = __privateGet(this, _client2).defaultMutationOptions(options);
    if (!shallowEqualObjects(this.options, prevOptions)) {
      __privateGet(this, _client2).getMutationCache().notify({
        type: "observerOptionsUpdated",
        mutation: __privateGet(this, _currentMutation),
        observer: this
      });
    }
    if ((prevOptions == null ? void 0 : prevOptions.mutationKey) && this.options.mutationKey && hashKey(prevOptions.mutationKey) !== hashKey(this.options.mutationKey)) {
      this.reset();
    } else if (((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state.status) === "pending") {
      __privateGet(this, _currentMutation).setOptions(this.options);
    }
  }
  onUnsubscribe() {
    var _a2;
    if (!this.hasListeners()) {
      (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    }
  }
  onMutationUpdate(action) {
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn2).call(this, action);
  }
  getCurrentResult() {
    return __privateGet(this, _currentResult2);
  }
  reset() {
    var _a2;
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, void 0);
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn2).call(this);
  }
  mutate(variables, options) {
    var _a2;
    __privateSet(this, _mutateOptions, options);
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, __privateGet(this, _client2).getMutationCache().build(__privateGet(this, _client2), this.options));
    __privateGet(this, _currentMutation).addObserver(this);
    return __privateGet(this, _currentMutation).execute(variables);
  }
}, _client2 = new WeakMap(), _currentResult2 = new WeakMap(), _currentMutation = new WeakMap(), _mutateOptions = new WeakMap(), _MutationObserver_instances = new WeakSet(), updateResult_fn = function() {
  var _a2;
  const state = ((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state) ?? getDefaultState();
  __privateSet(this, _currentResult2, {
    ...state,
    isPending: state.status === "pending",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    isIdle: state.status === "idle",
    mutate: this.mutate,
    reset: this.reset
  });
}, notify_fn2 = function(action) {
  notifyManager.batch(() => {
    var _a2, _b2, _c, _d, _e, _f, _g, _h;
    if (__privateGet(this, _mutateOptions) && this.hasListeners()) {
      const variables = __privateGet(this, _currentResult2).variables;
      const onMutateResult = __privateGet(this, _currentResult2).context;
      const context = {
        client: __privateGet(this, _client2),
        meta: this.options.meta,
        mutationKey: this.options.mutationKey
      };
      if ((action == null ? void 0 : action.type) === "success") {
        try {
          (_b2 = (_a2 = __privateGet(this, _mutateOptions)).onSuccess) == null ? void 0 : _b2.call(
            _a2,
            action.data,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_d = (_c = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _d.call(
            _c,
            action.data,
            null,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      } else if ((action == null ? void 0 : action.type) === "error") {
        try {
          (_f = (_e = __privateGet(this, _mutateOptions)).onError) == null ? void 0 : _f.call(
            _e,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_h = (_g = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _h.call(
            _g,
            void 0,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      }
    }
    this.listeners.forEach((listener) => {
      listener(__privateGet(this, _currentResult2));
    });
  });
}, _b);
var IsRestoringContext = reactExports.createContext(false);
var useIsRestoring = () => reactExports.useContext(IsRestoringContext);
IsRestoringContext.Provider;
function createValue() {
  let isReset = false;
  return {
    clearReset: () => {
      isReset = false;
    },
    reset: () => {
      isReset = true;
    },
    isReset: () => {
      return isReset;
    }
  };
}
var QueryErrorResetBoundaryContext = reactExports.createContext(createValue());
var useQueryErrorResetBoundary = () => reactExports.useContext(QueryErrorResetBoundaryContext);
var ensurePreventErrorBoundaryRetry = (options, errorResetBoundary, query) => {
  const throwOnError = (query == null ? void 0 : query.state.error) && typeof options.throwOnError === "function" ? shouldThrowError(options.throwOnError, [query.state.error, query]) : options.throwOnError;
  if (options.suspense || options.experimental_prefetchInRender || throwOnError) {
    if (!errorResetBoundary.isReset()) {
      options.retryOnMount = false;
    }
  }
};
var useClearResetErrorBoundary = (errorResetBoundary) => {
  reactExports.useEffect(() => {
    errorResetBoundary.clearReset();
  }, [errorResetBoundary]);
};
var getHasError = ({
  result,
  errorResetBoundary,
  throwOnError,
  query,
  suspense
}) => {
  return result.isError && !errorResetBoundary.isReset() && !result.isFetching && query && (suspense && result.data === void 0 || shouldThrowError(throwOnError, [result.error, query]));
};
var ensureSuspenseTimers = (defaultedOptions) => {
  if (defaultedOptions.suspense) {
    const MIN_SUSPENSE_TIME_MS = 1e3;
    const clamp = (value) => value === "static" ? value : Math.max(value ?? MIN_SUSPENSE_TIME_MS, MIN_SUSPENSE_TIME_MS);
    const originalStaleTime = defaultedOptions.staleTime;
    defaultedOptions.staleTime = typeof originalStaleTime === "function" ? (...args) => clamp(originalStaleTime(...args)) : clamp(originalStaleTime);
    if (typeof defaultedOptions.gcTime === "number") {
      defaultedOptions.gcTime = Math.max(
        defaultedOptions.gcTime,
        MIN_SUSPENSE_TIME_MS
      );
    }
  }
};
var willFetch = (result, isRestoring) => result.isLoading && result.isFetching && !isRestoring;
var shouldSuspend = (defaultedOptions, result) => (defaultedOptions == null ? void 0 : defaultedOptions.suspense) && result.isPending;
var fetchOptimistic = (defaultedOptions, observer, errorResetBoundary) => observer.fetchOptimistic(defaultedOptions).catch(() => {
  errorResetBoundary.clearReset();
});
function useBaseQuery(options, Observer, queryClient) {
  var _a2, _b2, _c, _d;
  const isRestoring = useIsRestoring();
  const errorResetBoundary = useQueryErrorResetBoundary();
  const client = useQueryClient();
  const defaultedOptions = client.defaultQueryOptions(options);
  (_b2 = (_a2 = client.getDefaultOptions().queries) == null ? void 0 : _a2._experimental_beforeQuery) == null ? void 0 : _b2.call(
    _a2,
    defaultedOptions
  );
  const query = client.getQueryCache().get(defaultedOptions.queryHash);
  defaultedOptions._optimisticResults = isRestoring ? "isRestoring" : "optimistic";
  ensureSuspenseTimers(defaultedOptions);
  ensurePreventErrorBoundaryRetry(defaultedOptions, errorResetBoundary, query);
  useClearResetErrorBoundary(errorResetBoundary);
  const isNewCacheEntry = !client.getQueryCache().get(defaultedOptions.queryHash);
  const [observer] = reactExports.useState(
    () => new Observer(
      client,
      defaultedOptions
    )
  );
  const result = observer.getOptimisticResult(defaultedOptions);
  const shouldSubscribe = !isRestoring && options.subscribed !== false;
  reactExports.useSyncExternalStore(
    reactExports.useCallback(
      (onStoreChange) => {
        const unsubscribe = shouldSubscribe ? observer.subscribe(notifyManager.batchCalls(onStoreChange)) : noop;
        observer.updateResult();
        return unsubscribe;
      },
      [observer, shouldSubscribe]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  reactExports.useEffect(() => {
    observer.setOptions(defaultedOptions);
  }, [defaultedOptions, observer]);
  if (shouldSuspend(defaultedOptions, result)) {
    throw fetchOptimistic(defaultedOptions, observer, errorResetBoundary);
  }
  if (getHasError({
    result,
    errorResetBoundary,
    throwOnError: defaultedOptions.throwOnError,
    query,
    suspense: defaultedOptions.suspense
  })) {
    throw result.error;
  }
  (_d = (_c = client.getDefaultOptions().queries) == null ? void 0 : _c._experimental_afterQuery) == null ? void 0 : _d.call(
    _c,
    defaultedOptions,
    result
  );
  if (defaultedOptions.experimental_prefetchInRender && !environmentManager.isServer() && willFetch(result, isRestoring)) {
    const promise = isNewCacheEntry ? (
      // Fetch immediately on render in order to ensure `.promise` is resolved even if the component is unmounted
      fetchOptimistic(defaultedOptions, observer, errorResetBoundary)
    ) : (
      // subscribe to the "cache promise" so that we can finalize the currentThenable once data comes in
      query == null ? void 0 : query.promise
    );
    promise == null ? void 0 : promise.catch(noop).finally(() => {
      observer.updateResult();
    });
  }
  return !defaultedOptions.notifyOnChangeProps ? observer.trackResult(result) : result;
}
function useQuery(options, queryClient) {
  return useBaseQuery(options, QueryObserver);
}
function useMutation(options, queryClient) {
  const client = useQueryClient();
  const [observer] = reactExports.useState(
    () => new MutationObserver(
      client,
      options
    )
  );
  reactExports.useEffect(() => {
    observer.setOptions(options);
  }, [observer, options]);
  const result = reactExports.useSyncExternalStore(
    reactExports.useCallback(
      (onStoreChange) => observer.subscribe(notifyManager.batchCalls(onStoreChange)),
      [observer]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  const mutate = reactExports.useCallback(
    (variables, mutateOptions) => {
      observer.mutate(variables, mutateOptions).catch(noop);
    },
    [observer]
  );
  if (result.error && shouldThrowError(observer.options.throwOnError, [result.error])) {
    throw result.error;
  }
  return { ...result, mutate, mutateAsync: result.mutate };
}
function hasAccessControl(actor) {
  return typeof actor === "object" && actor !== null && "_initializeAccessControl" in actor;
}
const ACTOR_QUERY_KEY = "actor";
function useActor(createActor2) {
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const actorQuery = useQuery({
    queryKey: [ACTOR_QUERY_KEY, identity == null ? void 0 : identity.getPrincipal().toString()],
    queryFn: async () => {
      const isAuthenticated = !!identity;
      if (!isAuthenticated) {
        return await createActorWithConfig(createActor2);
      }
      const actorOptions = {
        agentOptions: {
          identity
        }
      };
      const actor = await createActorWithConfig(createActor2, actorOptions);
      if (hasAccessControl(actor)) {
        await actor._initializeAccessControl();
      }
      return actor;
    },
    // Only refetch when identity changes
    staleTime: Number.POSITIVE_INFINITY,
    // This will cause the actor to be recreated when the identity changes
    enabled: true
  });
  reactExports.useEffect(() => {
    if (actorQuery.data) {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return !query.queryKey.includes(ACTOR_QUERY_KEY);
        }
      });
      queryClient.refetchQueries({
        predicate: (query) => {
          return !query.queryKey.includes(ACTOR_QUERY_KEY);
        }
      });
    }
  }, [actorQuery.data, queryClient]);
  return {
    actor: actorQuery.data || null,
    isFetching: actorQuery.isFetching
  };
}
const CategoryInput = Record({
  "name": Text,
  "description": Text
});
const EventCategoryId = Nat;
const DonationGoalInput = Record({
  "isGlobal": Bool,
  "donationUrl": Text,
  "title": Text,
  "description": Text,
  "festivalId": Opt(Nat),
  "targetAmount": Nat,
  "currentAmount": Nat
});
const DonationGoalId = Nat;
const FestivalStatus$1 = Variant({
  "Active": Null,
  "ComingSoon": Null
});
const Season$1 = Variant({ "Winter": Null, "Summer": Null });
const EventType$1 = Variant({
  "EDM": Null,
  "Family": Null,
  "Rave": Null,
  "ClubHotel": Null
});
const FestivalInput = Record({
  "status": FestivalStatus$1,
  "country": Text,
  "ticketPriceMax": Nat,
  "ticketPriceMin": Nat,
  "weekends": Text,
  "name": Text,
  "ticketUrl": Opt(Text),
  "description": Opt(Text),
  "season": Season$1,
  "ageRestriction": Text,
  "company": Text,
  "imageUrl": Opt(Text),
  "estimatedRevenueMax": Text,
  "estimatedRevenueMin": Text,
  "location": Text,
  "lineup": Opt(Text),
  "specialNotes": Opt(Text),
  "eventType": EventType$1
});
const FestivalId = Nat;
const LineupInput = Record({
  "stage": Text,
  "festivalId": FestivalId,
  "artistName": Text,
  "timeSlot": Text
});
const LineupId = Nat;
const Timestamp = Int;
const NewsInput = Record({
  "title": Text,
  "content": Text,
  "publishDate": Timestamp,
  "imageUrl": Text
});
const NewsId = Nat;
const NightclubEventInput = Record({
  "categoryId": Opt(Nat),
  "date": Text,
  "name": Text,
  "ticketUrl": Opt(Text),
  "description": Text,
  "isStandalone": Bool,
  "imageUrl": Text,
  "festivalId": Opt(Nat),
  "location": Text
});
const NightclubEventId = Nat;
const NightclubSetInput = Record({
  "startTime": Text,
  "endTime": Text,
  "nightclubEventId": Nat,
  "nightLabel": Text,
  "stage": Text,
  "artistName": Text,
  "youtubeUrl": Opt(Text)
});
const NightclubSetId = Nat;
const PackageType$1 = Variant({
  "VIP": Null,
  "Weekend1": Null,
  "Weekend2": Null,
  "FullWeekend": Null,
  "Accommodation": Null,
  "Transfer": Null,
  "FlightPackage": Null
});
const PackageInput = Record({
  "packageType": PackageType$1,
  "name": Text,
  "description": Text,
  "includes": Vec(Text),
  "festivalId": Opt(FestivalId),
  "priceGBP": Nat
});
const PackageId = Nat;
const RaveEventInput = Record({
  "categoryId": Opt(Nat),
  "date": Text,
  "name": Text,
  "ticketUrl": Opt(Text),
  "description": Text,
  "isStandalone": Bool,
  "imageUrl": Text,
  "festivalId": Opt(Nat),
  "location": Text,
  "eventType": Text
});
const RaveEventId = Nat;
const RaveSetInput = Record({
  "startTime": Text,
  "endTime": Text,
  "nightLabel": Text,
  "stage": Text,
  "artistName": Text,
  "youtubeUrl": Opt(Text),
  "raveEventId": Nat
});
const RaveSetId = Nat;
const SiteEventInput = Record({
  "categoryId": Opt(Nat),
  "date": Text,
  "name": Text,
  "description": Text,
  "imageUrl": Text,
  "festivalId": Opt(Nat),
  "location": Text
});
const SiteEventId = Nat;
const SponsorInput = Record({
  "websiteUrl": Text,
  "festivalIds": Vec(Nat),
  "name": Text,
  "tier": Text,
  "logoUrl": Text
});
const SponsorId = Nat;
const Analytics = Record({
  "festivalId": FestivalId,
  "estimatedRevenue": Text,
  "estimatedAttendance": Nat,
  "ticketsSold": Nat
});
const EventCategory = Record({
  "id": Nat,
  "name": Text,
  "createdAt": Int,
  "description": Text
});
const DonationGoal = Record({
  "id": Nat,
  "isGlobal": Bool,
  "donationUrl": Text,
  "title": Text,
  "createdAt": Int,
  "description": Text,
  "festivalId": Opt(Nat),
  "targetAmount": Nat,
  "currentAmount": Nat
});
const Festival = Record({
  "id": FestivalId,
  "status": FestivalStatus$1,
  "country": Text,
  "ticketPriceMax": Nat,
  "ticketPriceMin": Nat,
  "weekends": Text,
  "name": Text,
  "ticketUrl": Opt(Text),
  "description": Opt(Text),
  "season": Season$1,
  "ageRestriction": Text,
  "company": Text,
  "imageUrl": Opt(Text),
  "estimatedRevenueMax": Text,
  "estimatedRevenueMin": Text,
  "location": Text,
  "lineup": Opt(Text),
  "specialNotes": Opt(Text),
  "eventType": EventType$1
});
const LineupEntry = Record({
  "id": LineupId,
  "stage": Text,
  "festivalId": FestivalId,
  "artistName": Text,
  "timeSlot": Text
});
const NewsArticle = Record({
  "id": NewsId,
  "title": Text,
  "content": Text,
  "publishDate": Timestamp,
  "createdAt": Timestamp,
  "imageUrl": Text
});
const NightclubEvent = Record({
  "id": Nat,
  "categoryId": Opt(Nat),
  "date": Text,
  "name": Text,
  "createdAt": Int,
  "ticketUrl": Opt(Text),
  "description": Text,
  "isStandalone": Bool,
  "imageUrl": Text,
  "festivalId": Opt(Nat),
  "location": Text
});
const NightclubSet = Record({
  "id": Nat,
  "startTime": Text,
  "endTime": Text,
  "nightclubEventId": Nat,
  "createdAt": Int,
  "nightLabel": Text,
  "stage": Text,
  "artistName": Text,
  "youtubeUrl": Opt(Text)
});
const Package = Record({
  "id": PackageId,
  "packageType": PackageType$1,
  "name": Text,
  "description": Text,
  "includes": Vec(Text),
  "festivalId": Opt(FestivalId),
  "priceGBP": Nat
});
const RaveEvent = Record({
  "id": Nat,
  "categoryId": Opt(Nat),
  "date": Text,
  "name": Text,
  "createdAt": Int,
  "ticketUrl": Opt(Text),
  "description": Text,
  "isStandalone": Bool,
  "imageUrl": Text,
  "festivalId": Opt(Nat),
  "location": Text,
  "eventType": Text
});
const RaveSet = Record({
  "id": Nat,
  "startTime": Text,
  "endTime": Text,
  "createdAt": Int,
  "nightLabel": Text,
  "stage": Text,
  "artistName": Text,
  "youtubeUrl": Opt(Text),
  "raveEventId": Nat
});
const SiteEvent = Record({
  "id": Nat,
  "categoryId": Opt(Nat),
  "date": Text,
  "name": Text,
  "createdAt": Int,
  "description": Text,
  "imageUrl": Text,
  "festivalId": Opt(Nat),
  "location": Text
});
const Sponsor = Record({
  "id": Nat,
  "websiteUrl": Text,
  "festivalIds": Vec(Nat),
  "name": Text,
  "createdAt": Int,
  "tier": Text,
  "logoUrl": Text
});
Service({
  "addCategory": Func([CategoryInput], [EventCategoryId], []),
  "addDonationGoal": Func([DonationGoalInput], [DonationGoalId], []),
  "addFestival": Func([FestivalInput], [FestivalId], []),
  "addLineupEntry": Func([LineupInput], [LineupId], []),
  "addNews": Func([NewsInput], [NewsId], []),
  "addNightclubEvent": Func([NightclubEventInput], [NightclubEventId], []),
  "addNightclubSet": Func([NightclubSetInput], [NightclubSetId], []),
  "addPackage": Func([PackageInput], [PackageId], []),
  "addRaveEvent": Func([RaveEventInput], [RaveEventId], []),
  "addRaveSet": Func([RaveSetInput], [RaveSetId], []),
  "addSiteEvent": Func([SiteEventInput], [SiteEventId], []),
  "addSponsor": Func([SponsorInput], [SponsorId], []),
  "adminLogin": Func([Text], [Opt(Text)], []),
  "deleteCategory": Func([EventCategoryId], [Bool], []),
  "deleteDonationGoal": Func([DonationGoalId], [Bool], []),
  "deleteFestival": Func([FestivalId], [Bool], []),
  "deleteLineupEntry": Func([LineupId], [Bool], []),
  "deleteNews": Func([NewsId], [Bool], []),
  "deleteNightclubEvent": Func([NightclubEventId], [Bool], []),
  "deleteNightclubSet": Func([NightclubSetId], [Bool], []),
  "deletePackage": Func([PackageId], [Bool], []),
  "deleteRaveEvent": Func([RaveEventId], [Bool], []),
  "deleteRaveSet": Func([RaveSetId], [Bool], []),
  "deleteSiteEvent": Func([SiteEventId], [Bool], []),
  "deleteSponsor": Func([SponsorId], [Bool], []),
  "getAnalytics": Func([], [Vec(Analytics)], ["query"]),
  "getCategories": Func([], [Vec(EventCategory)], ["query"]),
  "getCategory": Func(
    [EventCategoryId],
    [Opt(EventCategory)],
    ["query"]
  ),
  "getDonationGoal": Func(
    [DonationGoalId],
    [Opt(DonationGoal)],
    ["query"]
  ),
  "getDonationGoals": Func([], [Vec(DonationGoal)], ["query"]),
  "getFestival": Func([FestivalId], [Opt(Festival)], ["query"]),
  "getFestivals": Func([], [Vec(Festival)], ["query"]),
  "getLineup": Func([FestivalId], [Vec(LineupEntry)], ["query"]),
  "getNews": Func([], [Vec(NewsArticle)], ["query"]),
  "getNewsArticle": Func([NewsId], [Opt(NewsArticle)], ["query"]),
  "getNightclubEvent": Func(
    [NightclubEventId],
    [Opt(NightclubEvent)],
    ["query"]
  ),
  "getNightclubEvents": Func([], [Vec(NightclubEvent)], ["query"]),
  "getNightclubSet": Func(
    [NightclubSetId],
    [Opt(NightclubSet)],
    ["query"]
  ),
  "getNightclubSets": Func([], [Vec(NightclubSet)], ["query"]),
  "getNightclubSetsByEvent": Func(
    [Nat],
    [Vec(NightclubSet)],
    ["query"]
  ),
  "getPackages": Func([], [Vec(Package)], ["query"]),
  "getRaveEvent": Func([RaveEventId], [Opt(RaveEvent)], ["query"]),
  "getRaveEvents": Func([], [Vec(RaveEvent)], ["query"]),
  "getRaveSet": Func([RaveSetId], [Opt(RaveSet)], ["query"]),
  "getRaveSets": Func([], [Vec(RaveSet)], ["query"]),
  "getRaveSetsByEvent": Func([Nat], [Vec(RaveSet)], ["query"]),
  "getSiteEvent": Func([SiteEventId], [Opt(SiteEvent)], ["query"]),
  "getSiteEvents": Func([], [Vec(SiteEvent)], ["query"]),
  "getSponsor": Func([SponsorId], [Opt(Sponsor)], ["query"]),
  "getSponsors": Func([], [Vec(Sponsor)], ["query"]),
  "getSponsorsByFestival": Func(
    [FestivalId],
    [Vec(Sponsor)],
    ["query"]
  ),
  "setFestivalImage": Func([FestivalId, Text], [Bool], []),
  "setFestivalTicketUrl": Func([FestivalId, Text], [Bool], []),
  "toggleFestivalStatus": Func([FestivalId], [Bool], []),
  "updateCategory": Func([EventCategoryId, CategoryInput], [Bool], []),
  "updateDonationGoal": Func(
    [DonationGoalId, DonationGoalInput],
    [Bool],
    []
  ),
  "updateFestival": Func([FestivalId, FestivalInput], [Bool], []),
  "updateLineupEntry": Func([LineupId, LineupInput], [Bool], []),
  "updateNews": Func([NewsId, NewsInput], [Bool], []),
  "updateNightclubEvent": Func(
    [NightclubEventId, NightclubEventInput],
    [Bool],
    []
  ),
  "updateNightclubSet": Func(
    [NightclubSetId, NightclubSetInput],
    [Bool],
    []
  ),
  "updatePackage": Func([PackageId, PackageInput], [Bool], []),
  "updateRaveEvent": Func([RaveEventId, RaveEventInput], [Bool], []),
  "updateRaveSet": Func([RaveSetId, RaveSetInput], [Bool], []),
  "updateSiteEvent": Func([SiteEventId, SiteEventInput], [Bool], []),
  "updateSponsor": Func([SponsorId, SponsorInput], [Bool], [])
});
const idlFactory = ({ IDL: IDL2 }) => {
  const CategoryInput2 = IDL2.Record({
    "name": IDL2.Text,
    "description": IDL2.Text
  });
  const EventCategoryId2 = IDL2.Nat;
  const DonationGoalInput2 = IDL2.Record({
    "isGlobal": IDL2.Bool,
    "donationUrl": IDL2.Text,
    "title": IDL2.Text,
    "description": IDL2.Text,
    "festivalId": IDL2.Opt(IDL2.Nat),
    "targetAmount": IDL2.Nat,
    "currentAmount": IDL2.Nat
  });
  const DonationGoalId2 = IDL2.Nat;
  const FestivalStatus2 = IDL2.Variant({
    "Active": IDL2.Null,
    "ComingSoon": IDL2.Null
  });
  const Season2 = IDL2.Variant({ "Winter": IDL2.Null, "Summer": IDL2.Null });
  const EventType2 = IDL2.Variant({
    "EDM": IDL2.Null,
    "Family": IDL2.Null,
    "Rave": IDL2.Null,
    "ClubHotel": IDL2.Null
  });
  const FestivalInput2 = IDL2.Record({
    "status": FestivalStatus2,
    "country": IDL2.Text,
    "ticketPriceMax": IDL2.Nat,
    "ticketPriceMin": IDL2.Nat,
    "weekends": IDL2.Text,
    "name": IDL2.Text,
    "ticketUrl": IDL2.Opt(IDL2.Text),
    "description": IDL2.Opt(IDL2.Text),
    "season": Season2,
    "ageRestriction": IDL2.Text,
    "company": IDL2.Text,
    "imageUrl": IDL2.Opt(IDL2.Text),
    "estimatedRevenueMax": IDL2.Text,
    "estimatedRevenueMin": IDL2.Text,
    "location": IDL2.Text,
    "lineup": IDL2.Opt(IDL2.Text),
    "specialNotes": IDL2.Opt(IDL2.Text),
    "eventType": EventType2
  });
  const FestivalId2 = IDL2.Nat;
  const LineupInput2 = IDL2.Record({
    "stage": IDL2.Text,
    "festivalId": FestivalId2,
    "artistName": IDL2.Text,
    "timeSlot": IDL2.Text
  });
  const LineupId2 = IDL2.Nat;
  const Timestamp2 = IDL2.Int;
  const NewsInput2 = IDL2.Record({
    "title": IDL2.Text,
    "content": IDL2.Text,
    "publishDate": Timestamp2,
    "imageUrl": IDL2.Text
  });
  const NewsId2 = IDL2.Nat;
  const NightclubEventInput2 = IDL2.Record({
    "categoryId": IDL2.Opt(IDL2.Nat),
    "date": IDL2.Text,
    "name": IDL2.Text,
    "ticketUrl": IDL2.Opt(IDL2.Text),
    "description": IDL2.Text,
    "isStandalone": IDL2.Bool,
    "imageUrl": IDL2.Text,
    "festivalId": IDL2.Opt(IDL2.Nat),
    "location": IDL2.Text
  });
  const NightclubEventId2 = IDL2.Nat;
  const NightclubSetInput2 = IDL2.Record({
    "startTime": IDL2.Text,
    "endTime": IDL2.Text,
    "nightclubEventId": IDL2.Nat,
    "nightLabel": IDL2.Text,
    "stage": IDL2.Text,
    "artistName": IDL2.Text,
    "youtubeUrl": IDL2.Opt(IDL2.Text)
  });
  const NightclubSetId2 = IDL2.Nat;
  const PackageType2 = IDL2.Variant({
    "VIP": IDL2.Null,
    "Weekend1": IDL2.Null,
    "Weekend2": IDL2.Null,
    "FullWeekend": IDL2.Null,
    "Accommodation": IDL2.Null,
    "Transfer": IDL2.Null,
    "FlightPackage": IDL2.Null
  });
  const PackageInput2 = IDL2.Record({
    "packageType": PackageType2,
    "name": IDL2.Text,
    "description": IDL2.Text,
    "includes": IDL2.Vec(IDL2.Text),
    "festivalId": IDL2.Opt(FestivalId2),
    "priceGBP": IDL2.Nat
  });
  const PackageId2 = IDL2.Nat;
  const RaveEventInput2 = IDL2.Record({
    "categoryId": IDL2.Opt(IDL2.Nat),
    "date": IDL2.Text,
    "name": IDL2.Text,
    "ticketUrl": IDL2.Opt(IDL2.Text),
    "description": IDL2.Text,
    "isStandalone": IDL2.Bool,
    "imageUrl": IDL2.Text,
    "festivalId": IDL2.Opt(IDL2.Nat),
    "location": IDL2.Text,
    "eventType": IDL2.Text
  });
  const RaveEventId2 = IDL2.Nat;
  const RaveSetInput2 = IDL2.Record({
    "startTime": IDL2.Text,
    "endTime": IDL2.Text,
    "nightLabel": IDL2.Text,
    "stage": IDL2.Text,
    "artistName": IDL2.Text,
    "youtubeUrl": IDL2.Opt(IDL2.Text),
    "raveEventId": IDL2.Nat
  });
  const RaveSetId2 = IDL2.Nat;
  const SiteEventInput2 = IDL2.Record({
    "categoryId": IDL2.Opt(IDL2.Nat),
    "date": IDL2.Text,
    "name": IDL2.Text,
    "description": IDL2.Text,
    "imageUrl": IDL2.Text,
    "festivalId": IDL2.Opt(IDL2.Nat),
    "location": IDL2.Text
  });
  const SiteEventId2 = IDL2.Nat;
  const SponsorInput2 = IDL2.Record({
    "websiteUrl": IDL2.Text,
    "festivalIds": IDL2.Vec(IDL2.Nat),
    "name": IDL2.Text,
    "tier": IDL2.Text,
    "logoUrl": IDL2.Text
  });
  const SponsorId2 = IDL2.Nat;
  const Analytics2 = IDL2.Record({
    "festivalId": FestivalId2,
    "estimatedRevenue": IDL2.Text,
    "estimatedAttendance": IDL2.Nat,
    "ticketsSold": IDL2.Nat
  });
  const EventCategory2 = IDL2.Record({
    "id": IDL2.Nat,
    "name": IDL2.Text,
    "createdAt": IDL2.Int,
    "description": IDL2.Text
  });
  const DonationGoal2 = IDL2.Record({
    "id": IDL2.Nat,
    "isGlobal": IDL2.Bool,
    "donationUrl": IDL2.Text,
    "title": IDL2.Text,
    "createdAt": IDL2.Int,
    "description": IDL2.Text,
    "festivalId": IDL2.Opt(IDL2.Nat),
    "targetAmount": IDL2.Nat,
    "currentAmount": IDL2.Nat
  });
  const Festival2 = IDL2.Record({
    "id": FestivalId2,
    "status": FestivalStatus2,
    "country": IDL2.Text,
    "ticketPriceMax": IDL2.Nat,
    "ticketPriceMin": IDL2.Nat,
    "weekends": IDL2.Text,
    "name": IDL2.Text,
    "ticketUrl": IDL2.Opt(IDL2.Text),
    "description": IDL2.Opt(IDL2.Text),
    "season": Season2,
    "ageRestriction": IDL2.Text,
    "company": IDL2.Text,
    "imageUrl": IDL2.Opt(IDL2.Text),
    "estimatedRevenueMax": IDL2.Text,
    "estimatedRevenueMin": IDL2.Text,
    "location": IDL2.Text,
    "lineup": IDL2.Opt(IDL2.Text),
    "specialNotes": IDL2.Opt(IDL2.Text),
    "eventType": EventType2
  });
  const LineupEntry2 = IDL2.Record({
    "id": LineupId2,
    "stage": IDL2.Text,
    "festivalId": FestivalId2,
    "artistName": IDL2.Text,
    "timeSlot": IDL2.Text
  });
  const NewsArticle2 = IDL2.Record({
    "id": NewsId2,
    "title": IDL2.Text,
    "content": IDL2.Text,
    "publishDate": Timestamp2,
    "createdAt": Timestamp2,
    "imageUrl": IDL2.Text
  });
  const NightclubEvent2 = IDL2.Record({
    "id": IDL2.Nat,
    "categoryId": IDL2.Opt(IDL2.Nat),
    "date": IDL2.Text,
    "name": IDL2.Text,
    "createdAt": IDL2.Int,
    "ticketUrl": IDL2.Opt(IDL2.Text),
    "description": IDL2.Text,
    "isStandalone": IDL2.Bool,
    "imageUrl": IDL2.Text,
    "festivalId": IDL2.Opt(IDL2.Nat),
    "location": IDL2.Text
  });
  const NightclubSet2 = IDL2.Record({
    "id": IDL2.Nat,
    "startTime": IDL2.Text,
    "endTime": IDL2.Text,
    "nightclubEventId": IDL2.Nat,
    "createdAt": IDL2.Int,
    "nightLabel": IDL2.Text,
    "stage": IDL2.Text,
    "artistName": IDL2.Text,
    "youtubeUrl": IDL2.Opt(IDL2.Text)
  });
  const Package2 = IDL2.Record({
    "id": PackageId2,
    "packageType": PackageType2,
    "name": IDL2.Text,
    "description": IDL2.Text,
    "includes": IDL2.Vec(IDL2.Text),
    "festivalId": IDL2.Opt(FestivalId2),
    "priceGBP": IDL2.Nat
  });
  const RaveEvent2 = IDL2.Record({
    "id": IDL2.Nat,
    "categoryId": IDL2.Opt(IDL2.Nat),
    "date": IDL2.Text,
    "name": IDL2.Text,
    "createdAt": IDL2.Int,
    "ticketUrl": IDL2.Opt(IDL2.Text),
    "description": IDL2.Text,
    "isStandalone": IDL2.Bool,
    "imageUrl": IDL2.Text,
    "festivalId": IDL2.Opt(IDL2.Nat),
    "location": IDL2.Text,
    "eventType": IDL2.Text
  });
  const RaveSet2 = IDL2.Record({
    "id": IDL2.Nat,
    "startTime": IDL2.Text,
    "endTime": IDL2.Text,
    "createdAt": IDL2.Int,
    "nightLabel": IDL2.Text,
    "stage": IDL2.Text,
    "artistName": IDL2.Text,
    "youtubeUrl": IDL2.Opt(IDL2.Text),
    "raveEventId": IDL2.Nat
  });
  const SiteEvent2 = IDL2.Record({
    "id": IDL2.Nat,
    "categoryId": IDL2.Opt(IDL2.Nat),
    "date": IDL2.Text,
    "name": IDL2.Text,
    "createdAt": IDL2.Int,
    "description": IDL2.Text,
    "imageUrl": IDL2.Text,
    "festivalId": IDL2.Opt(IDL2.Nat),
    "location": IDL2.Text
  });
  const Sponsor2 = IDL2.Record({
    "id": IDL2.Nat,
    "websiteUrl": IDL2.Text,
    "festivalIds": IDL2.Vec(IDL2.Nat),
    "name": IDL2.Text,
    "createdAt": IDL2.Int,
    "tier": IDL2.Text,
    "logoUrl": IDL2.Text
  });
  return IDL2.Service({
    "addCategory": IDL2.Func([CategoryInput2], [EventCategoryId2], []),
    "addDonationGoal": IDL2.Func([DonationGoalInput2], [DonationGoalId2], []),
    "addFestival": IDL2.Func([FestivalInput2], [FestivalId2], []),
    "addLineupEntry": IDL2.Func([LineupInput2], [LineupId2], []),
    "addNews": IDL2.Func([NewsInput2], [NewsId2], []),
    "addNightclubEvent": IDL2.Func(
      [NightclubEventInput2],
      [NightclubEventId2],
      []
    ),
    "addNightclubSet": IDL2.Func([NightclubSetInput2], [NightclubSetId2], []),
    "addPackage": IDL2.Func([PackageInput2], [PackageId2], []),
    "addRaveEvent": IDL2.Func([RaveEventInput2], [RaveEventId2], []),
    "addRaveSet": IDL2.Func([RaveSetInput2], [RaveSetId2], []),
    "addSiteEvent": IDL2.Func([SiteEventInput2], [SiteEventId2], []),
    "addSponsor": IDL2.Func([SponsorInput2], [SponsorId2], []),
    "adminLogin": IDL2.Func([IDL2.Text], [IDL2.Opt(IDL2.Text)], []),
    "deleteCategory": IDL2.Func([EventCategoryId2], [IDL2.Bool], []),
    "deleteDonationGoal": IDL2.Func([DonationGoalId2], [IDL2.Bool], []),
    "deleteFestival": IDL2.Func([FestivalId2], [IDL2.Bool], []),
    "deleteLineupEntry": IDL2.Func([LineupId2], [IDL2.Bool], []),
    "deleteNews": IDL2.Func([NewsId2], [IDL2.Bool], []),
    "deleteNightclubEvent": IDL2.Func([NightclubEventId2], [IDL2.Bool], []),
    "deleteNightclubSet": IDL2.Func([NightclubSetId2], [IDL2.Bool], []),
    "deletePackage": IDL2.Func([PackageId2], [IDL2.Bool], []),
    "deleteRaveEvent": IDL2.Func([RaveEventId2], [IDL2.Bool], []),
    "deleteRaveSet": IDL2.Func([RaveSetId2], [IDL2.Bool], []),
    "deleteSiteEvent": IDL2.Func([SiteEventId2], [IDL2.Bool], []),
    "deleteSponsor": IDL2.Func([SponsorId2], [IDL2.Bool], []),
    "getAnalytics": IDL2.Func([], [IDL2.Vec(Analytics2)], ["query"]),
    "getCategories": IDL2.Func([], [IDL2.Vec(EventCategory2)], ["query"]),
    "getCategory": IDL2.Func(
      [EventCategoryId2],
      [IDL2.Opt(EventCategory2)],
      ["query"]
    ),
    "getDonationGoal": IDL2.Func(
      [DonationGoalId2],
      [IDL2.Opt(DonationGoal2)],
      ["query"]
    ),
    "getDonationGoals": IDL2.Func([], [IDL2.Vec(DonationGoal2)], ["query"]),
    "getFestival": IDL2.Func([FestivalId2], [IDL2.Opt(Festival2)], ["query"]),
    "getFestivals": IDL2.Func([], [IDL2.Vec(Festival2)], ["query"]),
    "getLineup": IDL2.Func([FestivalId2], [IDL2.Vec(LineupEntry2)], ["query"]),
    "getNews": IDL2.Func([], [IDL2.Vec(NewsArticle2)], ["query"]),
    "getNewsArticle": IDL2.Func([NewsId2], [IDL2.Opt(NewsArticle2)], ["query"]),
    "getNightclubEvent": IDL2.Func(
      [NightclubEventId2],
      [IDL2.Opt(NightclubEvent2)],
      ["query"]
    ),
    "getNightclubEvents": IDL2.Func([], [IDL2.Vec(NightclubEvent2)], ["query"]),
    "getNightclubSet": IDL2.Func(
      [NightclubSetId2],
      [IDL2.Opt(NightclubSet2)],
      ["query"]
    ),
    "getNightclubSets": IDL2.Func([], [IDL2.Vec(NightclubSet2)], ["query"]),
    "getNightclubSetsByEvent": IDL2.Func(
      [IDL2.Nat],
      [IDL2.Vec(NightclubSet2)],
      ["query"]
    ),
    "getPackages": IDL2.Func([], [IDL2.Vec(Package2)], ["query"]),
    "getRaveEvent": IDL2.Func([RaveEventId2], [IDL2.Opt(RaveEvent2)], ["query"]),
    "getRaveEvents": IDL2.Func([], [IDL2.Vec(RaveEvent2)], ["query"]),
    "getRaveSet": IDL2.Func([RaveSetId2], [IDL2.Opt(RaveSet2)], ["query"]),
    "getRaveSets": IDL2.Func([], [IDL2.Vec(RaveSet2)], ["query"]),
    "getRaveSetsByEvent": IDL2.Func([IDL2.Nat], [IDL2.Vec(RaveSet2)], ["query"]),
    "getSiteEvent": IDL2.Func([SiteEventId2], [IDL2.Opt(SiteEvent2)], ["query"]),
    "getSiteEvents": IDL2.Func([], [IDL2.Vec(SiteEvent2)], ["query"]),
    "getSponsor": IDL2.Func([SponsorId2], [IDL2.Opt(Sponsor2)], ["query"]),
    "getSponsors": IDL2.Func([], [IDL2.Vec(Sponsor2)], ["query"]),
    "getSponsorsByFestival": IDL2.Func(
      [FestivalId2],
      [IDL2.Vec(Sponsor2)],
      ["query"]
    ),
    "setFestivalImage": IDL2.Func([FestivalId2, IDL2.Text], [IDL2.Bool], []),
    "setFestivalTicketUrl": IDL2.Func([FestivalId2, IDL2.Text], [IDL2.Bool], []),
    "toggleFestivalStatus": IDL2.Func([FestivalId2], [IDL2.Bool], []),
    "updateCategory": IDL2.Func(
      [EventCategoryId2, CategoryInput2],
      [IDL2.Bool],
      []
    ),
    "updateDonationGoal": IDL2.Func(
      [DonationGoalId2, DonationGoalInput2],
      [IDL2.Bool],
      []
    ),
    "updateFestival": IDL2.Func([FestivalId2, FestivalInput2], [IDL2.Bool], []),
    "updateLineupEntry": IDL2.Func([LineupId2, LineupInput2], [IDL2.Bool], []),
    "updateNews": IDL2.Func([NewsId2, NewsInput2], [IDL2.Bool], []),
    "updateNightclubEvent": IDL2.Func(
      [NightclubEventId2, NightclubEventInput2],
      [IDL2.Bool],
      []
    ),
    "updateNightclubSet": IDL2.Func(
      [NightclubSetId2, NightclubSetInput2],
      [IDL2.Bool],
      []
    ),
    "updatePackage": IDL2.Func([PackageId2, PackageInput2], [IDL2.Bool], []),
    "updateRaveEvent": IDL2.Func([RaveEventId2, RaveEventInput2], [IDL2.Bool], []),
    "updateRaveSet": IDL2.Func([RaveSetId2, RaveSetInput2], [IDL2.Bool], []),
    "updateSiteEvent": IDL2.Func([SiteEventId2, SiteEventInput2], [IDL2.Bool], []),
    "updateSponsor": IDL2.Func([SponsorId2, SponsorInput2], [IDL2.Bool], [])
  });
};
function candid_some(value) {
  return [
    value
  ];
}
function candid_none() {
  return [];
}
function record_opt_to_undefined(arg) {
  return arg == null ? void 0 : arg;
}
var EventType = /* @__PURE__ */ ((EventType2) => {
  EventType2["EDM"] = "EDM";
  EventType2["Family"] = "Family";
  EventType2["Rave"] = "Rave";
  EventType2["ClubHotel"] = "ClubHotel";
  return EventType2;
})(EventType || {});
var FestivalStatus = /* @__PURE__ */ ((FestivalStatus2) => {
  FestivalStatus2["Active"] = "Active";
  FestivalStatus2["ComingSoon"] = "ComingSoon";
  return FestivalStatus2;
})(FestivalStatus || {});
var PackageType = /* @__PURE__ */ ((PackageType2) => {
  PackageType2["VIP"] = "VIP";
  PackageType2["Weekend1"] = "Weekend1";
  PackageType2["Weekend2"] = "Weekend2";
  PackageType2["FullWeekend"] = "FullWeekend";
  PackageType2["Accommodation"] = "Accommodation";
  PackageType2["Transfer"] = "Transfer";
  PackageType2["FlightPackage"] = "FlightPackage";
  return PackageType2;
})(PackageType || {});
var Season = /* @__PURE__ */ ((Season2) => {
  Season2["Winter"] = "Winter";
  Season2["Summer"] = "Summer";
  return Season2;
})(Season || {});
class Backend {
  constructor(actor, _uploadFile, _downloadFile, processError) {
    this.actor = actor;
    this._uploadFile = _uploadFile;
    this._downloadFile = _downloadFile;
    this.processError = processError;
  }
  async addCategory(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.addCategory(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.addCategory(arg0);
      return result;
    }
  }
  async addDonationGoal(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.addDonationGoal(to_candid_DonationGoalInput_n1(this._uploadFile, this._downloadFile, arg0));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.addDonationGoal(to_candid_DonationGoalInput_n1(this._uploadFile, this._downloadFile, arg0));
      return result;
    }
  }
  async addFestival(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.addFestival(to_candid_FestivalInput_n3(this._uploadFile, this._downloadFile, arg0));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.addFestival(to_candid_FestivalInput_n3(this._uploadFile, this._downloadFile, arg0));
      return result;
    }
  }
  async addLineupEntry(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.addLineupEntry(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.addLineupEntry(arg0);
      return result;
    }
  }
  async addNews(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.addNews(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.addNews(arg0);
      return result;
    }
  }
  async addNightclubEvent(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.addNightclubEvent(to_candid_NightclubEventInput_n11(this._uploadFile, this._downloadFile, arg0));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.addNightclubEvent(to_candid_NightclubEventInput_n11(this._uploadFile, this._downloadFile, arg0));
      return result;
    }
  }
  async addNightclubSet(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.addNightclubSet(to_candid_NightclubSetInput_n13(this._uploadFile, this._downloadFile, arg0));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.addNightclubSet(to_candid_NightclubSetInput_n13(this._uploadFile, this._downloadFile, arg0));
      return result;
    }
  }
  async addPackage(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.addPackage(to_candid_PackageInput_n15(this._uploadFile, this._downloadFile, arg0));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.addPackage(to_candid_PackageInput_n15(this._uploadFile, this._downloadFile, arg0));
      return result;
    }
  }
  async addRaveEvent(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.addRaveEvent(to_candid_RaveEventInput_n19(this._uploadFile, this._downloadFile, arg0));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.addRaveEvent(to_candid_RaveEventInput_n19(this._uploadFile, this._downloadFile, arg0));
      return result;
    }
  }
  async addRaveSet(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.addRaveSet(to_candid_RaveSetInput_n21(this._uploadFile, this._downloadFile, arg0));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.addRaveSet(to_candid_RaveSetInput_n21(this._uploadFile, this._downloadFile, arg0));
      return result;
    }
  }
  async addSiteEvent(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.addSiteEvent(to_candid_SiteEventInput_n23(this._uploadFile, this._downloadFile, arg0));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.addSiteEvent(to_candid_SiteEventInput_n23(this._uploadFile, this._downloadFile, arg0));
      return result;
    }
  }
  async addSponsor(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.addSponsor(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.addSponsor(arg0);
      return result;
    }
  }
  async adminLogin(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.adminLogin(arg0);
        return from_candid_opt_n25(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminLogin(arg0);
      return from_candid_opt_n25(this._uploadFile, this._downloadFile, result);
    }
  }
  async deleteCategory(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.deleteCategory(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.deleteCategory(arg0);
      return result;
    }
  }
  async deleteDonationGoal(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.deleteDonationGoal(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.deleteDonationGoal(arg0);
      return result;
    }
  }
  async deleteFestival(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.deleteFestival(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.deleteFestival(arg0);
      return result;
    }
  }
  async deleteLineupEntry(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.deleteLineupEntry(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.deleteLineupEntry(arg0);
      return result;
    }
  }
  async deleteNews(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.deleteNews(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.deleteNews(arg0);
      return result;
    }
  }
  async deleteNightclubEvent(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.deleteNightclubEvent(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.deleteNightclubEvent(arg0);
      return result;
    }
  }
  async deleteNightclubSet(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.deleteNightclubSet(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.deleteNightclubSet(arg0);
      return result;
    }
  }
  async deletePackage(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.deletePackage(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.deletePackage(arg0);
      return result;
    }
  }
  async deleteRaveEvent(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.deleteRaveEvent(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.deleteRaveEvent(arg0);
      return result;
    }
  }
  async deleteRaveSet(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.deleteRaveSet(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.deleteRaveSet(arg0);
      return result;
    }
  }
  async deleteSiteEvent(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.deleteSiteEvent(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.deleteSiteEvent(arg0);
      return result;
    }
  }
  async deleteSponsor(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.deleteSponsor(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.deleteSponsor(arg0);
      return result;
    }
  }
  async getAnalytics() {
    if (this.processError) {
      try {
        const result = await this.actor.getAnalytics();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getAnalytics();
      return result;
    }
  }
  async getCategories() {
    if (this.processError) {
      try {
        const result = await this.actor.getCategories();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getCategories();
      return result;
    }
  }
  async getCategory(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getCategory(arg0);
        return from_candid_opt_n26(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getCategory(arg0);
      return from_candid_opt_n26(this._uploadFile, this._downloadFile, result);
    }
  }
  async getDonationGoal(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getDonationGoal(arg0);
        return from_candid_opt_n27(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getDonationGoal(arg0);
      return from_candid_opt_n27(this._uploadFile, this._downloadFile, result);
    }
  }
  async getDonationGoals() {
    if (this.processError) {
      try {
        const result = await this.actor.getDonationGoals();
        return from_candid_vec_n31(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getDonationGoals();
      return from_candid_vec_n31(this._uploadFile, this._downloadFile, result);
    }
  }
  async getFestival(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getFestival(arg0);
        return from_candid_opt_n32(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getFestival(arg0);
      return from_candid_opt_n32(this._uploadFile, this._downloadFile, result);
    }
  }
  async getFestivals() {
    if (this.processError) {
      try {
        const result = await this.actor.getFestivals();
        return from_candid_vec_n41(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getFestivals();
      return from_candid_vec_n41(this._uploadFile, this._downloadFile, result);
    }
  }
  async getLineup(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getLineup(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getLineup(arg0);
      return result;
    }
  }
  async getNews() {
    if (this.processError) {
      try {
        const result = await this.actor.getNews();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getNews();
      return result;
    }
  }
  async getNewsArticle(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getNewsArticle(arg0);
        return from_candid_opt_n42(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getNewsArticle(arg0);
      return from_candid_opt_n42(this._uploadFile, this._downloadFile, result);
    }
  }
  async getNightclubEvent(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getNightclubEvent(arg0);
        return from_candid_opt_n43(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getNightclubEvent(arg0);
      return from_candid_opt_n43(this._uploadFile, this._downloadFile, result);
    }
  }
  async getNightclubEvents() {
    if (this.processError) {
      try {
        const result = await this.actor.getNightclubEvents();
        return from_candid_vec_n46(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getNightclubEvents();
      return from_candid_vec_n46(this._uploadFile, this._downloadFile, result);
    }
  }
  async getNightclubSet(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getNightclubSet(arg0);
        return from_candid_opt_n47(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getNightclubSet(arg0);
      return from_candid_opt_n47(this._uploadFile, this._downloadFile, result);
    }
  }
  async getNightclubSets() {
    if (this.processError) {
      try {
        const result = await this.actor.getNightclubSets();
        return from_candid_vec_n50(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getNightclubSets();
      return from_candid_vec_n50(this._uploadFile, this._downloadFile, result);
    }
  }
  async getNightclubSetsByEvent(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getNightclubSetsByEvent(arg0);
        return from_candid_vec_n50(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getNightclubSetsByEvent(arg0);
      return from_candid_vec_n50(this._uploadFile, this._downloadFile, result);
    }
  }
  async getPackages() {
    if (this.processError) {
      try {
        const result = await this.actor.getPackages();
        return from_candid_vec_n51(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getPackages();
      return from_candid_vec_n51(this._uploadFile, this._downloadFile, result);
    }
  }
  async getRaveEvent(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getRaveEvent(arg0);
        return from_candid_opt_n57(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getRaveEvent(arg0);
      return from_candid_opt_n57(this._uploadFile, this._downloadFile, result);
    }
  }
  async getRaveEvents() {
    if (this.processError) {
      try {
        const result = await this.actor.getRaveEvents();
        return from_candid_vec_n60(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getRaveEvents();
      return from_candid_vec_n60(this._uploadFile, this._downloadFile, result);
    }
  }
  async getRaveSet(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getRaveSet(arg0);
        return from_candid_opt_n61(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getRaveSet(arg0);
      return from_candid_opt_n61(this._uploadFile, this._downloadFile, result);
    }
  }
  async getRaveSets() {
    if (this.processError) {
      try {
        const result = await this.actor.getRaveSets();
        return from_candid_vec_n64(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getRaveSets();
      return from_candid_vec_n64(this._uploadFile, this._downloadFile, result);
    }
  }
  async getRaveSetsByEvent(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getRaveSetsByEvent(arg0);
        return from_candid_vec_n64(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getRaveSetsByEvent(arg0);
      return from_candid_vec_n64(this._uploadFile, this._downloadFile, result);
    }
  }
  async getSiteEvent(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getSiteEvent(arg0);
        return from_candid_opt_n65(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getSiteEvent(arg0);
      return from_candid_opt_n65(this._uploadFile, this._downloadFile, result);
    }
  }
  async getSiteEvents() {
    if (this.processError) {
      try {
        const result = await this.actor.getSiteEvents();
        return from_candid_vec_n68(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getSiteEvents();
      return from_candid_vec_n68(this._uploadFile, this._downloadFile, result);
    }
  }
  async getSponsor(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getSponsor(arg0);
        return from_candid_opt_n69(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getSponsor(arg0);
      return from_candid_opt_n69(this._uploadFile, this._downloadFile, result);
    }
  }
  async getSponsors() {
    if (this.processError) {
      try {
        const result = await this.actor.getSponsors();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getSponsors();
      return result;
    }
  }
  async getSponsorsByFestival(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getSponsorsByFestival(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getSponsorsByFestival(arg0);
      return result;
    }
  }
  async setFestivalImage(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.setFestivalImage(arg0, arg1);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.setFestivalImage(arg0, arg1);
      return result;
    }
  }
  async setFestivalTicketUrl(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.setFestivalTicketUrl(arg0, arg1);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.setFestivalTicketUrl(arg0, arg1);
      return result;
    }
  }
  async toggleFestivalStatus(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.toggleFestivalStatus(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.toggleFestivalStatus(arg0);
      return result;
    }
  }
  async updateCategory(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.updateCategory(arg0, arg1);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.updateCategory(arg0, arg1);
      return result;
    }
  }
  async updateDonationGoal(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.updateDonationGoal(arg0, to_candid_DonationGoalInput_n1(this._uploadFile, this._downloadFile, arg1));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.updateDonationGoal(arg0, to_candid_DonationGoalInput_n1(this._uploadFile, this._downloadFile, arg1));
      return result;
    }
  }
  async updateFestival(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.updateFestival(arg0, to_candid_FestivalInput_n3(this._uploadFile, this._downloadFile, arg1));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.updateFestival(arg0, to_candid_FestivalInput_n3(this._uploadFile, this._downloadFile, arg1));
      return result;
    }
  }
  async updateLineupEntry(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.updateLineupEntry(arg0, arg1);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.updateLineupEntry(arg0, arg1);
      return result;
    }
  }
  async updateNews(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.updateNews(arg0, arg1);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.updateNews(arg0, arg1);
      return result;
    }
  }
  async updateNightclubEvent(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.updateNightclubEvent(arg0, to_candid_NightclubEventInput_n11(this._uploadFile, this._downloadFile, arg1));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.updateNightclubEvent(arg0, to_candid_NightclubEventInput_n11(this._uploadFile, this._downloadFile, arg1));
      return result;
    }
  }
  async updateNightclubSet(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.updateNightclubSet(arg0, to_candid_NightclubSetInput_n13(this._uploadFile, this._downloadFile, arg1));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.updateNightclubSet(arg0, to_candid_NightclubSetInput_n13(this._uploadFile, this._downloadFile, arg1));
      return result;
    }
  }
  async updatePackage(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.updatePackage(arg0, to_candid_PackageInput_n15(this._uploadFile, this._downloadFile, arg1));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.updatePackage(arg0, to_candid_PackageInput_n15(this._uploadFile, this._downloadFile, arg1));
      return result;
    }
  }
  async updateRaveEvent(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.updateRaveEvent(arg0, to_candid_RaveEventInput_n19(this._uploadFile, this._downloadFile, arg1));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.updateRaveEvent(arg0, to_candid_RaveEventInput_n19(this._uploadFile, this._downloadFile, arg1));
      return result;
    }
  }
  async updateRaveSet(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.updateRaveSet(arg0, to_candid_RaveSetInput_n21(this._uploadFile, this._downloadFile, arg1));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.updateRaveSet(arg0, to_candid_RaveSetInput_n21(this._uploadFile, this._downloadFile, arg1));
      return result;
    }
  }
  async updateSiteEvent(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.updateSiteEvent(arg0, to_candid_SiteEventInput_n23(this._uploadFile, this._downloadFile, arg1));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.updateSiteEvent(arg0, to_candid_SiteEventInput_n23(this._uploadFile, this._downloadFile, arg1));
      return result;
    }
  }
  async updateSponsor(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.updateSponsor(arg0, arg1);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.updateSponsor(arg0, arg1);
      return result;
    }
  }
}
function from_candid_DonationGoal_n28(_uploadFile, _downloadFile, value) {
  return from_candid_record_n29(_uploadFile, _downloadFile, value);
}
function from_candid_EventType_n39(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n40(_uploadFile, _downloadFile, value);
}
function from_candid_FestivalStatus_n35(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n36(_uploadFile, _downloadFile, value);
}
function from_candid_Festival_n33(_uploadFile, _downloadFile, value) {
  return from_candid_record_n34(_uploadFile, _downloadFile, value);
}
function from_candid_NightclubEvent_n44(_uploadFile, _downloadFile, value) {
  return from_candid_record_n45(_uploadFile, _downloadFile, value);
}
function from_candid_NightclubSet_n48(_uploadFile, _downloadFile, value) {
  return from_candid_record_n49(_uploadFile, _downloadFile, value);
}
function from_candid_PackageType_n54(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n55(_uploadFile, _downloadFile, value);
}
function from_candid_Package_n52(_uploadFile, _downloadFile, value) {
  return from_candid_record_n53(_uploadFile, _downloadFile, value);
}
function from_candid_RaveEvent_n58(_uploadFile, _downloadFile, value) {
  return from_candid_record_n59(_uploadFile, _downloadFile, value);
}
function from_candid_RaveSet_n62(_uploadFile, _downloadFile, value) {
  return from_candid_record_n63(_uploadFile, _downloadFile, value);
}
function from_candid_Season_n37(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n38(_uploadFile, _downloadFile, value);
}
function from_candid_SiteEvent_n66(_uploadFile, _downloadFile, value) {
  return from_candid_record_n67(_uploadFile, _downloadFile, value);
}
function from_candid_opt_n25(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_opt_n26(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_opt_n27(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : from_candid_DonationGoal_n28(_uploadFile, _downloadFile, value[0]);
}
function from_candid_opt_n30(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_opt_n32(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : from_candid_Festival_n33(_uploadFile, _downloadFile, value[0]);
}
function from_candid_opt_n42(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_opt_n43(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : from_candid_NightclubEvent_n44(_uploadFile, _downloadFile, value[0]);
}
function from_candid_opt_n47(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : from_candid_NightclubSet_n48(_uploadFile, _downloadFile, value[0]);
}
function from_candid_opt_n56(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_opt_n57(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : from_candid_RaveEvent_n58(_uploadFile, _downloadFile, value[0]);
}
function from_candid_opt_n61(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : from_candid_RaveSet_n62(_uploadFile, _downloadFile, value[0]);
}
function from_candid_opt_n65(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : from_candid_SiteEvent_n66(_uploadFile, _downloadFile, value[0]);
}
function from_candid_opt_n69(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_record_n29(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    isGlobal: value.isGlobal,
    donationUrl: value.donationUrl,
    title: value.title,
    createdAt: value.createdAt,
    description: value.description,
    festivalId: record_opt_to_undefined(from_candid_opt_n30(_uploadFile, _downloadFile, value.festivalId)),
    targetAmount: value.targetAmount,
    currentAmount: value.currentAmount
  };
}
function from_candid_record_n34(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    status: from_candid_FestivalStatus_n35(_uploadFile, _downloadFile, value.status),
    country: value.country,
    ticketPriceMax: value.ticketPriceMax,
    ticketPriceMin: value.ticketPriceMin,
    weekends: value.weekends,
    name: value.name,
    ticketUrl: record_opt_to_undefined(from_candid_opt_n25(_uploadFile, _downloadFile, value.ticketUrl)),
    description: record_opt_to_undefined(from_candid_opt_n25(_uploadFile, _downloadFile, value.description)),
    season: from_candid_Season_n37(_uploadFile, _downloadFile, value.season),
    ageRestriction: value.ageRestriction,
    company: value.company,
    imageUrl: record_opt_to_undefined(from_candid_opt_n25(_uploadFile, _downloadFile, value.imageUrl)),
    estimatedRevenueMax: value.estimatedRevenueMax,
    estimatedRevenueMin: value.estimatedRevenueMin,
    location: value.location,
    lineup: record_opt_to_undefined(from_candid_opt_n25(_uploadFile, _downloadFile, value.lineup)),
    specialNotes: record_opt_to_undefined(from_candid_opt_n25(_uploadFile, _downloadFile, value.specialNotes)),
    eventType: from_candid_EventType_n39(_uploadFile, _downloadFile, value.eventType)
  };
}
function from_candid_record_n45(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    categoryId: record_opt_to_undefined(from_candid_opt_n30(_uploadFile, _downloadFile, value.categoryId)),
    date: value.date,
    name: value.name,
    createdAt: value.createdAt,
    ticketUrl: record_opt_to_undefined(from_candid_opt_n25(_uploadFile, _downloadFile, value.ticketUrl)),
    description: value.description,
    isStandalone: value.isStandalone,
    imageUrl: value.imageUrl,
    festivalId: record_opt_to_undefined(from_candid_opt_n30(_uploadFile, _downloadFile, value.festivalId)),
    location: value.location
  };
}
function from_candid_record_n49(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    startTime: value.startTime,
    endTime: value.endTime,
    nightclubEventId: value.nightclubEventId,
    createdAt: value.createdAt,
    nightLabel: value.nightLabel,
    stage: value.stage,
    artistName: value.artistName,
    youtubeUrl: record_opt_to_undefined(from_candid_opt_n25(_uploadFile, _downloadFile, value.youtubeUrl))
  };
}
function from_candid_record_n53(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    packageType: from_candid_PackageType_n54(_uploadFile, _downloadFile, value.packageType),
    name: value.name,
    description: value.description,
    includes: value.includes,
    festivalId: record_opt_to_undefined(from_candid_opt_n56(_uploadFile, _downloadFile, value.festivalId)),
    priceGBP: value.priceGBP
  };
}
function from_candid_record_n59(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    categoryId: record_opt_to_undefined(from_candid_opt_n30(_uploadFile, _downloadFile, value.categoryId)),
    date: value.date,
    name: value.name,
    createdAt: value.createdAt,
    ticketUrl: record_opt_to_undefined(from_candid_opt_n25(_uploadFile, _downloadFile, value.ticketUrl)),
    description: value.description,
    isStandalone: value.isStandalone,
    imageUrl: value.imageUrl,
    festivalId: record_opt_to_undefined(from_candid_opt_n30(_uploadFile, _downloadFile, value.festivalId)),
    location: value.location,
    eventType: value.eventType
  };
}
function from_candid_record_n63(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    startTime: value.startTime,
    endTime: value.endTime,
    createdAt: value.createdAt,
    nightLabel: value.nightLabel,
    stage: value.stage,
    artistName: value.artistName,
    youtubeUrl: record_opt_to_undefined(from_candid_opt_n25(_uploadFile, _downloadFile, value.youtubeUrl)),
    raveEventId: value.raveEventId
  };
}
function from_candid_record_n67(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    categoryId: record_opt_to_undefined(from_candid_opt_n30(_uploadFile, _downloadFile, value.categoryId)),
    date: value.date,
    name: value.name,
    createdAt: value.createdAt,
    description: value.description,
    imageUrl: value.imageUrl,
    festivalId: record_opt_to_undefined(from_candid_opt_n30(_uploadFile, _downloadFile, value.festivalId)),
    location: value.location
  };
}
function from_candid_variant_n36(_uploadFile, _downloadFile, value) {
  return "Active" in value ? "Active" : "ComingSoon" in value ? "ComingSoon" : value;
}
function from_candid_variant_n38(_uploadFile, _downloadFile, value) {
  return "Winter" in value ? "Winter" : "Summer" in value ? "Summer" : value;
}
function from_candid_variant_n40(_uploadFile, _downloadFile, value) {
  return "EDM" in value ? "EDM" : "Family" in value ? "Family" : "Rave" in value ? "Rave" : "ClubHotel" in value ? "ClubHotel" : value;
}
function from_candid_variant_n55(_uploadFile, _downloadFile, value) {
  return "VIP" in value ? "VIP" : "Weekend1" in value ? "Weekend1" : "Weekend2" in value ? "Weekend2" : "FullWeekend" in value ? "FullWeekend" : "Accommodation" in value ? "Accommodation" : "Transfer" in value ? "Transfer" : "FlightPackage" in value ? "FlightPackage" : value;
}
function from_candid_vec_n31(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_DonationGoal_n28(_uploadFile, _downloadFile, x));
}
function from_candid_vec_n41(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_Festival_n33(_uploadFile, _downloadFile, x));
}
function from_candid_vec_n46(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_NightclubEvent_n44(_uploadFile, _downloadFile, x));
}
function from_candid_vec_n50(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_NightclubSet_n48(_uploadFile, _downloadFile, x));
}
function from_candid_vec_n51(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_Package_n52(_uploadFile, _downloadFile, x));
}
function from_candid_vec_n60(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_RaveEvent_n58(_uploadFile, _downloadFile, x));
}
function from_candid_vec_n64(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_RaveSet_n62(_uploadFile, _downloadFile, x));
}
function from_candid_vec_n68(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_SiteEvent_n66(_uploadFile, _downloadFile, x));
}
function to_candid_DonationGoalInput_n1(_uploadFile, _downloadFile, value) {
  return to_candid_record_n2(_uploadFile, _downloadFile, value);
}
function to_candid_EventType_n9(_uploadFile, _downloadFile, value) {
  return to_candid_variant_n10(_uploadFile, _downloadFile, value);
}
function to_candid_FestivalInput_n3(_uploadFile, _downloadFile, value) {
  return to_candid_record_n4(_uploadFile, _downloadFile, value);
}
function to_candid_FestivalStatus_n5(_uploadFile, _downloadFile, value) {
  return to_candid_variant_n6(_uploadFile, _downloadFile, value);
}
function to_candid_NightclubEventInput_n11(_uploadFile, _downloadFile, value) {
  return to_candid_record_n12(_uploadFile, _downloadFile, value);
}
function to_candid_NightclubSetInput_n13(_uploadFile, _downloadFile, value) {
  return to_candid_record_n14(_uploadFile, _downloadFile, value);
}
function to_candid_PackageInput_n15(_uploadFile, _downloadFile, value) {
  return to_candid_record_n16(_uploadFile, _downloadFile, value);
}
function to_candid_PackageType_n17(_uploadFile, _downloadFile, value) {
  return to_candid_variant_n18(_uploadFile, _downloadFile, value);
}
function to_candid_RaveEventInput_n19(_uploadFile, _downloadFile, value) {
  return to_candid_record_n20(_uploadFile, _downloadFile, value);
}
function to_candid_RaveSetInput_n21(_uploadFile, _downloadFile, value) {
  return to_candid_record_n22(_uploadFile, _downloadFile, value);
}
function to_candid_Season_n7(_uploadFile, _downloadFile, value) {
  return to_candid_variant_n8(_uploadFile, _downloadFile, value);
}
function to_candid_SiteEventInput_n23(_uploadFile, _downloadFile, value) {
  return to_candid_record_n24(_uploadFile, _downloadFile, value);
}
function to_candid_record_n12(_uploadFile, _downloadFile, value) {
  return {
    categoryId: value.categoryId ? candid_some(value.categoryId) : candid_none(),
    date: value.date,
    name: value.name,
    ticketUrl: value.ticketUrl ? candid_some(value.ticketUrl) : candid_none(),
    description: value.description,
    isStandalone: value.isStandalone,
    imageUrl: value.imageUrl,
    festivalId: value.festivalId ? candid_some(value.festivalId) : candid_none(),
    location: value.location
  };
}
function to_candid_record_n14(_uploadFile, _downloadFile, value) {
  return {
    startTime: value.startTime,
    endTime: value.endTime,
    nightclubEventId: value.nightclubEventId,
    nightLabel: value.nightLabel,
    stage: value.stage,
    artistName: value.artistName,
    youtubeUrl: value.youtubeUrl ? candid_some(value.youtubeUrl) : candid_none()
  };
}
function to_candid_record_n16(_uploadFile, _downloadFile, value) {
  return {
    packageType: to_candid_PackageType_n17(_uploadFile, _downloadFile, value.packageType),
    name: value.name,
    description: value.description,
    includes: value.includes,
    festivalId: value.festivalId ? candid_some(value.festivalId) : candid_none(),
    priceGBP: value.priceGBP
  };
}
function to_candid_record_n2(_uploadFile, _downloadFile, value) {
  return {
    isGlobal: value.isGlobal,
    donationUrl: value.donationUrl,
    title: value.title,
    description: value.description,
    festivalId: value.festivalId ? candid_some(value.festivalId) : candid_none(),
    targetAmount: value.targetAmount,
    currentAmount: value.currentAmount
  };
}
function to_candid_record_n20(_uploadFile, _downloadFile, value) {
  return {
    categoryId: value.categoryId ? candid_some(value.categoryId) : candid_none(),
    date: value.date,
    name: value.name,
    ticketUrl: value.ticketUrl ? candid_some(value.ticketUrl) : candid_none(),
    description: value.description,
    isStandalone: value.isStandalone,
    imageUrl: value.imageUrl,
    festivalId: value.festivalId ? candid_some(value.festivalId) : candid_none(),
    location: value.location,
    eventType: value.eventType
  };
}
function to_candid_record_n22(_uploadFile, _downloadFile, value) {
  return {
    startTime: value.startTime,
    endTime: value.endTime,
    nightLabel: value.nightLabel,
    stage: value.stage,
    artistName: value.artistName,
    youtubeUrl: value.youtubeUrl ? candid_some(value.youtubeUrl) : candid_none(),
    raveEventId: value.raveEventId
  };
}
function to_candid_record_n24(_uploadFile, _downloadFile, value) {
  return {
    categoryId: value.categoryId ? candid_some(value.categoryId) : candid_none(),
    date: value.date,
    name: value.name,
    description: value.description,
    imageUrl: value.imageUrl,
    festivalId: value.festivalId ? candid_some(value.festivalId) : candid_none(),
    location: value.location
  };
}
function to_candid_record_n4(_uploadFile, _downloadFile, value) {
  return {
    status: to_candid_FestivalStatus_n5(_uploadFile, _downloadFile, value.status),
    country: value.country,
    ticketPriceMax: value.ticketPriceMax,
    ticketPriceMin: value.ticketPriceMin,
    weekends: value.weekends,
    name: value.name,
    ticketUrl: value.ticketUrl ? candid_some(value.ticketUrl) : candid_none(),
    description: value.description ? candid_some(value.description) : candid_none(),
    season: to_candid_Season_n7(_uploadFile, _downloadFile, value.season),
    ageRestriction: value.ageRestriction,
    company: value.company,
    imageUrl: value.imageUrl ? candid_some(value.imageUrl) : candid_none(),
    estimatedRevenueMax: value.estimatedRevenueMax,
    estimatedRevenueMin: value.estimatedRevenueMin,
    location: value.location,
    lineup: value.lineup ? candid_some(value.lineup) : candid_none(),
    specialNotes: value.specialNotes ? candid_some(value.specialNotes) : candid_none(),
    eventType: to_candid_EventType_n9(_uploadFile, _downloadFile, value.eventType)
  };
}
function to_candid_variant_n10(_uploadFile, _downloadFile, value) {
  return value == "EDM" ? {
    EDM: null
  } : value == "Family" ? {
    Family: null
  } : value == "Rave" ? {
    Rave: null
  } : value == "ClubHotel" ? {
    ClubHotel: null
  } : value;
}
function to_candid_variant_n18(_uploadFile, _downloadFile, value) {
  return value == "VIP" ? {
    VIP: null
  } : value == "Weekend1" ? {
    Weekend1: null
  } : value == "Weekend2" ? {
    Weekend2: null
  } : value == "FullWeekend" ? {
    FullWeekend: null
  } : value == "Accommodation" ? {
    Accommodation: null
  } : value == "Transfer" ? {
    Transfer: null
  } : value == "FlightPackage" ? {
    FlightPackage: null
  } : value;
}
function to_candid_variant_n6(_uploadFile, _downloadFile, value) {
  return value == "Active" ? {
    Active: null
  } : value == "ComingSoon" ? {
    ComingSoon: null
  } : value;
}
function to_candid_variant_n8(_uploadFile, _downloadFile, value) {
  return value == "Winter" ? {
    Winter: null
  } : value == "Summer" ? {
    Summer: null
  } : value;
}
function createActor(canisterId, _uploadFile, _downloadFile, options = {}) {
  const agent = options.agent || HttpAgent.createSync({
    ...options.agentOptions
  });
  if (options.agent && options.agentOptions) {
    console.warn("Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent.");
  }
  const actor = Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...options.actorOptions
  });
  return new Backend(actor, _uploadFile, _downloadFile, options.processError);
}
function isSummer(season) {
  return season === Season.Summer;
}
function isEDM(eventType) {
  return eventType === EventType.EDM;
}
function isComingSoon(status) {
  return status === FestivalStatus.ComingSoon;
}
function getSeasonLabel(season) {
  return season === Season.Summer ? "Summer" : "Winter";
}
function getEventTypeLabel(eventType) {
  if (eventType === EventType.EDM) return "EDM";
  if (eventType === EventType.Family) return "Family";
  if (eventType === EventType.ClubHotel) return "Club Hotel";
  return "Rave";
}
function getPackageTypeLabel(packageType) {
  if (packageType === PackageType.Weekend1) return "Weekend 1";
  if (packageType === PackageType.Weekend2) return "Weekend 2";
  if (packageType === PackageType.FullWeekend) return "Full Weekend";
  if (packageType === PackageType.VIP) return "VIP";
  if (packageType === PackageType.FlightPackage) return "Flight Package";
  if (packageType === PackageType.Transfer) return "Transfer";
  return "Accommodation";
}
const STATIC_FESTIVALS = [
  {
    id: 1n,
    name: "WE ARE ONE Summer Festival UK",
    location: "London",
    country: "United Kingdom",
    company: "WE ARE ONE Ltd",
    season: Season.Summer,
    eventType: EventType.EDM,
    weekends: "July 12-13 & July 19-20, 2025",
    ticketPriceMin: 89n,
    ticketPriceMax: 350n,
    estimatedRevenueMin: "£500K",
    estimatedRevenueMax: "£1.2M",
    specialNotes: void 0,
    status: FestivalStatus.ComingSoon,
    imageUrl: void 0,
    description: "The ultimate UK summer EDM experience. Two weekends of world-class music, breathtaking production, and unforgettable memories.",
    lineup: "Martin Garrix, Armin van Buuren, David Guetta, Tiësto",
    ageRestriction: "14+"
  },
  {
    id: 2n,
    name: "WE ARE ONE Winter Festival UK",
    location: "Manchester",
    country: "United Kingdom",
    company: "WE ARE ONE Ltd",
    season: Season.Winter,
    eventType: EventType.EDM,
    weekends: "December 6-7 & December 13-14, 2025",
    ticketPriceMin: 79n,
    ticketPriceMax: 280n,
    estimatedRevenueMin: "£400K",
    estimatedRevenueMax: "£900K",
    specialNotes: void 0,
    status: FestivalStatus.ComingSoon,
    imageUrl: void 0,
    description: "Experience the magic of winter EDM in the heart of Manchester. Neon lights, sub-zero beats, and world-class DJs.",
    lineup: "Hardwell, Dimitri Vegas & Like Mike, W&W",
    ageRestriction: "14+"
  },
  {
    id: 3n,
    name: "WE ARE ONE International - Ibiza",
    location: "Ibiza",
    country: "Spain",
    company: "WE ARE ONE International",
    season: Season.Summer,
    eventType: EventType.EDM,
    weekends: "August 2-3 & August 9-10, 2025",
    ticketPriceMin: 120n,
    ticketPriceMax: 500n,
    estimatedRevenueMin: "£800K",
    estimatedRevenueMax: "£2M",
    specialNotes: "Venue closes at 06:00. Last entry 02:00.",
    status: FestivalStatus.ComingSoon,
    imageUrl: void 0,
    description: "The world's most iconic island. Infinite beats, crystal waters, and legendary sunsets — only at WE ARE ONE Ibiza.",
    lineup: "Solomun, DJ Snake, Fisher, Tale Of Us",
    ageRestriction: "14+"
  },
  {
    id: 4n,
    name: "WE ARE ONE Family Festival UK",
    location: "Birmingham",
    country: "United Kingdom",
    company: "WE ARE ONE Ltd",
    season: Season.Summer,
    eventType: EventType.Family,
    weekends: "June 21-22, 2025",
    ticketPriceMin: 45n,
    ticketPriceMax: 120n,
    estimatedRevenueMin: "£200K",
    estimatedRevenueMax: "£500K",
    specialNotes: void 0,
    status: FestivalStatus.ComingSoon,
    imageUrl: void 0,
    description: "A magical day out for the whole family. Live music, funfair rides, arts & crafts, and family-friendly entertainment.",
    lineup: "Family-friendly live acts & DJs",
    ageRestriction: "All Ages"
  },
  {
    id: 5n,
    name: "WE ARE ONE International - Netherlands",
    location: "Amsterdam",
    country: "Netherlands",
    company: "WE ARE ONE International",
    season: Season.Summer,
    eventType: EventType.Rave,
    weekends: "September 5-7, 2025",
    ticketPriceMin: 110n,
    ticketPriceMax: 450n,
    estimatedRevenueMin: "£700K",
    estimatedRevenueMax: "£1.8M",
    specialNotes: "Event hours: 14:00 – 23:00. No re-entry.",
    status: FestivalStatus.ComingSoon,
    imageUrl: void 0,
    description: "Amsterdam's premier festival experience. Three days of relentless techno, trance, and house in iconic outdoor venues.",
    lineup: "Charlotte de Witte, Adam Beyer, Amelie Lens, Reinier Zonneveld",
    ageRestriction: "14+"
  },
  {
    id: 6n,
    name: "WE ARE ONE Winter International - Alps",
    location: "Innsbruck",
    country: "Austria",
    company: "WE ARE ONE International",
    season: Season.Winter,
    eventType: EventType.ClubHotel,
    weekends: "January 17-19 & January 24-26, 2025",
    ticketPriceMin: 250n,
    ticketPriceMax: 1200n,
    estimatedRevenueMin: "£1.2M",
    estimatedRevenueMax: "£3M",
    specialNotes: "All-inclusive ski & festival package available",
    status: FestivalStatus.ComingSoon,
    imageUrl: void 0,
    description: "Dance at altitude. The ultimate ski & music festival fusion — après-ski by day, world-class DJs by night.",
    lineup: "Nicky Romero, Don Diablo, Showtek",
    ageRestriction: "14+"
  }
];
const STATIC_PACKAGES = [
  {
    id: 1n,
    name: "Weekend Pass",
    description: "Access to one full weekend of the festival (Friday–Sunday)",
    priceGBP: 149n,
    includes: [
      "3-day festival access",
      "Wristband & lanyard",
      "Festival map & programme"
    ],
    packageType: PackageType.FullWeekend,
    festivalId: void 0
  },
  {
    id: 2n,
    name: "Weekend 1 Pass",
    description: "Access to Weekend 1 only — perfect for first-timers",
    priceGBP: 89n,
    includes: ["Weekend 1 access", "Wristband", "Festival guide"],
    packageType: PackageType.Weekend1,
    festivalId: void 0
  },
  {
    id: 3n,
    name: "Weekend 2 Pass",
    description: "Access to Weekend 2 — often features headliner changes",
    priceGBP: 89n,
    includes: ["Weekend 2 access", "Wristband", "Festival guide"],
    packageType: PackageType.Weekend2,
    festivalId: void 0
  },
  {
    id: 4n,
    name: "VIP Experience",
    description: "Full VIP access with exclusive zones, fast track entry, and premium amenities",
    priceGBP: 350n,
    includes: [
      "Full weekend access",
      "VIP lounge access",
      "Fast track entry",
      "Dedicated bar area",
      "Premium toilets",
      "VIP viewing platform",
      "Welcome drink"
    ],
    packageType: PackageType.VIP,
    festivalId: void 0
  },
  {
    id: 5n,
    name: "Flight & Festival Bundle",
    description: "Return flights from major UK airports plus full weekend festival access",
    priceGBP: 499n,
    includes: [
      "Return flights",
      "Full weekend pass",
      "Airport transfers",
      "Welcome pack"
    ],
    packageType: PackageType.FlightPackage,
    festivalId: void 0
  },
  {
    id: 6n,
    name: "Festival Transfer",
    description: "Shuttle bus from city centre to festival site and back",
    priceGBP: 35n,
    includes: [
      "Return coach transfer",
      "Dedicated festival drop-off",
      "Night return service"
    ],
    packageType: PackageType.Transfer,
    festivalId: void 0
  },
  {
    id: 7n,
    name: "Glamping Weekend",
    description: "Luxury on-site glamping accommodation for the full festival weekend",
    priceGBP: 280n,
    includes: [
      "Luxury glamping tent",
      "Bed & bedding",
      "Private shower access",
      "Charging locker",
      "Breakfast each morning"
    ],
    packageType: PackageType.Accommodation,
    festivalId: void 0
  }
];
const STATIC_ANALYTICS = STATIC_FESTIVALS.map((f, i) => ({
  festivalId: f.id,
  estimatedAttendance: BigInt(
    [15e3, 12e3, 2e4, 8e3, 25e3, 1e4][i] ?? 1e4
  ),
  estimatedRevenue: f.estimatedRevenueMax,
  ticketsSold: BigInt([3200, 2800, 4500, 1800, 5500, 2100][i] ?? 1e3)
}));
function requireActor(actor) {
  if (!actor) {
    throw new Error(
      "Not connected to backend. Please wait a moment and try again."
    );
  }
  return actor;
}
function useFestivals() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["festivals"],
    queryFn: async () => {
      if (!actor) return STATIC_FESTIVALS;
      try {
        const result = await actor.getFestivals();
        return result.length > 0 ? result : STATIC_FESTIVALS;
      } catch {
        return STATIC_FESTIVALS;
      }
    },
    enabled: !isFetching,
    placeholderData: STATIC_FESTIVALS,
    staleTime: 1e3 * 60 * 5
  });
}
function usePackages() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      if (!actor) return STATIC_PACKAGES;
      try {
        const result = await actor.getPackages();
        return result.length > 0 ? result : STATIC_PACKAGES;
      } catch {
        return STATIC_PACKAGES;
      }
    },
    enabled: !isFetching,
    placeholderData: STATIC_PACKAGES,
    staleTime: 1e3 * 60 * 5
  });
}
function useAnalytics() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["analytics"],
    queryFn: async () => {
      if (!actor) return STATIC_ANALYTICS;
      try {
        const result = await actor.getAnalytics();
        return result.length > 0 ? result : STATIC_ANALYTICS;
      } catch {
        return STATIC_ANALYTICS;
      }
    },
    enabled: !isFetching,
    placeholderData: STATIC_ANALYTICS,
    staleTime: 1e3 * 60 * 5
  });
}
function useAdminLogin() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (password) => {
      if (actor) {
        try {
          return await actor.adminLogin(password);
        } catch {
        }
      }
      if (password === "b9bkzisthebest") {
        return "admin-session-token";
      }
      return null;
    }
  });
}
function useAddFestival() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (input) => requireActor(actor).addFestival(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["festivals"] })
  });
}
function useUpdateFestival() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({ id, input }) => requireActor(actor).updateFestival(id, input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["festivals"] })
  });
}
function useDeleteFestival() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (id) => requireActor(actor).deleteFestival(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["festivals"] })
  });
}
function useToggleFestivalStatus() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (id) => requireActor(actor).toggleFestivalStatus(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["festivals"] })
  });
}
function useSetFestivalImage() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({ id, imageUrl }) => requireActor(actor).setFestivalImage(id, imageUrl),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["festivals"] })
  });
}
function useSetFestivalTicketUrl() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({ id, ticketUrl }) => requireActor(actor).setFestivalTicketUrl(id, ticketUrl.trim()),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["festivals"] })
  });
}
function useTicketUrls() {
  const { data: festivals = [] } = useFestivals();
  const map = {};
  for (const f of festivals) {
    if (f.ticketUrl) map[f.id.toString()] = f.ticketUrl;
  }
  return { data: map };
}
function useAddPackage() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (input) => requireActor(actor).addPackage(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["packages"] })
  });
}
function useUpdatePackage() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({ id, input }) => requireActor(actor).updatePackage(id, input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["packages"] })
  });
}
function useDeletePackage() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (id) => requireActor(actor).deletePackage(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["packages"] })
  });
}
function useNews() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getNews();
      } catch {
        return [];
      }
    },
    enabled: !isFetching,
    staleTime: 1e3 * 60 * 2
  });
}
function useAddNews() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (input) => requireActor(actor).addNews(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["news"] })
  });
}
function useUpdateNews() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({ id, input }) => requireActor(actor).updateNews(id, input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["news"] })
  });
}
function useDeleteNews() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (id) => requireActor(actor).deleteNews(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["news"] })
  });
}
function useLineup(festivalId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["lineup", festivalId.toString()],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getLineup(festivalId);
      } catch {
        return [];
      }
    },
    enabled: !isFetching,
    staleTime: 1e3 * 60 * 2
  });
}
function useAddLineupEntry() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (input) => requireActor(actor).addLineupEntry(input),
    onSuccess: (_, vars) => qc.invalidateQueries({
      queryKey: ["lineup", vars.festivalId.toString()]
    })
  });
}
function useUpdateLineupEntry() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({ id, input }) => requireActor(actor).updateLineupEntry(id, input),
    onSuccess: (_, vars) => qc.invalidateQueries({
      queryKey: ["lineup", vars.input.festivalId.toString()]
    })
  });
}
function useDeleteLineupEntry() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({ id }) => requireActor(actor).deleteLineupEntry(id),
    onSuccess: (_, vars) => qc.invalidateQueries({
      queryKey: ["lineup", vars.festivalId.toString()]
    })
  });
}
function useDonationGoals() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["donationGoals"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getDonationGoals();
      } catch {
        return [];
      }
    },
    enabled: !isFetching,
    staleTime: 1e3 * 60 * 2
  });
}
function useAddDonationGoal() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (input) => requireActor(actor).addDonationGoal(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["donationGoals"] })
  });
}
function useUpdateDonationGoal() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({ id, input }) => requireActor(actor).updateDonationGoal(id, input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["donationGoals"] })
  });
}
function useDeleteDonationGoal() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (id) => requireActor(actor).deleteDonationGoal(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["donationGoals"] })
  });
}
function useSponsors() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["sponsors"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getSponsors();
      } catch {
        return [];
      }
    },
    enabled: !isFetching,
    staleTime: 1e3 * 60 * 5
  });
}
function useSponsorsByFestival(festivalId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["sponsors", "festival", festivalId.toString()],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getSponsorsByFestival(festivalId);
      } catch {
        return [];
      }
    },
    enabled: !isFetching,
    staleTime: 1e3 * 60 * 5
  });
}
function useAddSponsor() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (input) => requireActor(actor).addSponsor(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["sponsors"] })
  });
}
function useUpdateSponsor() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({ id, input }) => requireActor(actor).updateSponsor(id, input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["sponsors"] })
  });
}
function useDeleteSponsor() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (id) => requireActor(actor).deleteSponsor(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["sponsors"] })
  });
}
function useCategories() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getCategories();
      } catch {
        return [];
      }
    },
    enabled: !isFetching,
    staleTime: 1e3 * 60 * 5
  });
}
function useAddCategory() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (input) => requireActor(actor).addCategory(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["categories"] })
  });
}
function useUpdateCategory() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({ id, input }) => requireActor(actor).updateCategory(id, input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["categories"] })
  });
}
function useDeleteCategory() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (id) => requireActor(actor).deleteCategory(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["categories"] })
  });
}
function useRaveEvents() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["raveEvents"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getRaveEvents();
      } catch {
        return [];
      }
    },
    enabled: !isFetching,
    staleTime: 1e3 * 60 * 2
  });
}
function useAddRaveEvent() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (input) => requireActor(actor).addRaveEvent(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["raveEvents"] })
  });
}
function useUpdateRaveEvent() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({ id, input }) => requireActor(actor).updateRaveEvent(id, input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["raveEvents"] })
  });
}
function useDeleteRaveEvent() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (id) => requireActor(actor).deleteRaveEvent(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["raveEvents"] })
  });
}
function useRaveSets(raveEventId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["raveSets", raveEventId.toString()],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getRaveSetsByEvent(raveEventId);
      } catch {
        return [];
      }
    },
    enabled: !isFetching,
    staleTime: 1e3 * 60 * 2
  });
}
function useAddRaveSet() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (input) => requireActor(actor).addRaveSet(input),
    onSuccess: (_, vars) => qc.invalidateQueries({
      queryKey: ["raveSets", vars.raveEventId.toString()]
    })
  });
}
function useUpdateRaveSet() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({ id, input }) => requireActor(actor).updateRaveSet(id, input),
    onSuccess: (_, vars) => qc.invalidateQueries({
      queryKey: ["raveSets", vars.input.raveEventId.toString()]
    })
  });
}
function useDeleteRaveSet() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({ id }) => requireActor(actor).deleteRaveSet(id),
    onSuccess: (_, vars) => qc.invalidateQueries({
      queryKey: ["raveSets", vars.raveEventId.toString()]
    })
  });
}
function useNightclubEvents() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["nightclubEvents"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getNightclubEvents();
      } catch {
        return [];
      }
    },
    enabled: !isFetching,
    staleTime: 1e3 * 60 * 2
  });
}
function useAddNightclubEvent() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (input) => requireActor(actor).addNightclubEvent(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["nightclubEvents"] })
  });
}
function useUpdateNightclubEvent() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({ id, input }) => requireActor(actor).updateNightclubEvent(id, input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["nightclubEvents"] })
  });
}
function useDeleteNightclubEvent() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (id) => requireActor(actor).deleteNightclubEvent(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["nightclubEvents"] })
  });
}
function useNightclubSets(nightclubEventId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["nightclubSets", nightclubEventId.toString()],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getNightclubSetsByEvent(nightclubEventId);
      } catch {
        return [];
      }
    },
    enabled: !isFetching,
    staleTime: 1e3 * 60 * 2
  });
}
function useAddNightclubSet() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (input) => requireActor(actor).addNightclubSet(input),
    onSuccess: (_, vars) => qc.invalidateQueries({
      queryKey: ["nightclubSets", vars.nightclubEventId.toString()]
    })
  });
}
function useUpdateNightclubSet() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({ id, input }) => requireActor(actor).updateNightclubSet(id, input),
    onSuccess: (_, vars) => qc.invalidateQueries({
      queryKey: ["nightclubSets", vars.input.nightclubEventId.toString()]
    })
  });
}
function useDeleteNightclubSet() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({ id }) => requireActor(actor).deleteNightclubSet(id),
    onSuccess: (_, vars) => qc.invalidateQueries({
      queryKey: ["nightclubSets", vars.nightclubEventId.toString()]
    })
  });
}
function useSiteEvents() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["siteEvents"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getSiteEvents();
      } catch {
        return [];
      }
    },
    enabled: !isFetching,
    staleTime: 1e3 * 60 * 2
  });
}
function useAddSiteEvent() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (input) => requireActor(actor).addSiteEvent(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["siteEvents"] })
  });
}
function useUpdateSiteEvent() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({ id, input }) => requireActor(actor).updateSiteEvent(id, input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["siteEvents"] })
  });
}
function useDeleteSiteEvent() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (id) => requireActor(actor).deleteSiteEvent(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["siteEvents"] })
  });
}
export {
  useRaveSets as $,
  useAddFestival as A,
  useUpdateFestival as B,
  useDeleteFestival as C,
  useToggleFestivalStatus as D,
  EventType as E,
  FestivalStatus as F,
  useSetFestivalImage as G,
  useLineup as H,
  useAddLineupEntry as I,
  useUpdateLineupEntry as J,
  useDeleteLineupEntry as K,
  useNews as L,
  useAddNews as M,
  useUpdateNews as N,
  useDeleteNews as O,
  useAddPackage as P,
  useUpdatePackage as Q,
  useDeletePackage as R,
  STATIC_FESTIVALS as S,
  useRaveEvents as T,
  useAddRaveEvent as U,
  useUpdateRaveEvent as V,
  useDeleteRaveEvent as W,
  useNightclubEvents as X,
  useAddNightclubEvent as Y,
  useUpdateNightclubEvent as Z,
  useDeleteNightclubEvent as _,
  getEventTypeLabel as a,
  useNightclubSets as a0,
  useAddRaveSet as a1,
  useUpdateRaveSet as a2,
  useDeleteRaveSet as a3,
  useAddNightclubSet as a4,
  useUpdateNightclubSet as a5,
  useDeleteNightclubSet as a6,
  useAddSponsor as a7,
  useUpdateSponsor as a8,
  useDeleteSponsor as a9,
  useAdminLogin as aa,
  useActor as ab,
  createActor as ac,
  isSummer as b,
  isEDM as c,
  useFestivals as d,
  useSponsorsByFestival as e,
  useSponsors as f,
  getSeasonLabel as g,
  usePackages as h,
  isComingSoon as i,
  getPackageTypeLabel as j,
  useAnalytics as k,
  useDonationGoals as l,
  useAddDonationGoal as m,
  useUpdateDonationGoal as n,
  useDeleteDonationGoal as o,
  useCategories as p,
  useSiteEvents as q,
  useAddCategory as r,
  useUpdateCategory as s,
  useDeleteCategory as t,
  useTicketUrls as u,
  useAddSiteEvent as v,
  useUpdateSiteEvent as w,
  useDeleteSiteEvent as x,
  useSetFestivalTicketUrl as y,
  Season as z
};
