import EventTypes "../types/events";
import Common "../types/common";
import EventsLib "../lib/events";
import List "mo:core/List";
mixin (
  categories : List.List<EventTypes.EventCategory>,
  raveEvents : List.List<EventTypes.RaveEvent>,
  nightclubEvents : List.List<EventTypes.NightclubEvent>,
  siteEvents : List.List<EventTypes.SiteEvent>,
  raveSets : List.List<EventTypes.RaveSet>,
  nightclubSets : List.List<EventTypes.NightclubSet>,
) {
  var nextCategoryId : Nat = categories.size() + 1;
  var nextRaveEventId : Nat = raveEvents.size() + 1;
  var nextNightclubEventId : Nat = nightclubEvents.size() + 1;
  var nextSiteEventId : Nat = siteEvents.size() + 1;
  var nextRaveSetId : Nat = raveSets.size() + 1;
  var nextNightclubSetId : Nat = nightclubSets.size() + 1;

  // ── Categories ───────────────────────────────────────────────────────────────

  public query func getCategories() : async [EventTypes.EventCategory] {
    EventsLib.getCategories(categories)
  };

  public query func getCategory(id : Common.EventCategoryId) : async ?EventTypes.EventCategory {
    EventsLib.getCategory(categories, id)
  };

  public func addCategory(input : EventTypes.CategoryInput) : async Common.EventCategoryId {
    let category = EventsLib.addCategory(categories, nextCategoryId, input);
    let id = category.id;
    nextCategoryId += 1;
    id
  };

  public func updateCategory(id : Common.EventCategoryId, input : EventTypes.CategoryInput) : async Bool {
    EventsLib.updateCategory(categories, id, input)
  };

  public func deleteCategory(id : Common.EventCategoryId) : async Bool {
    EventsLib.deleteCategory(categories, id)
  };

  // ── Rave Events ──────────────────────────────────────────────────────────────

  public query func getRaveEvents() : async [EventTypes.RaveEvent] {
    EventsLib.getRaveEvents(raveEvents)
  };

  public query func getRaveEvent(id : Common.RaveEventId) : async ?EventTypes.RaveEvent {
    EventsLib.getRaveEvent(raveEvents, id)
  };

  public func addRaveEvent(input : EventTypes.RaveEventInput) : async Common.RaveEventId {
    let event = EventsLib.addRaveEvent(raveEvents, nextRaveEventId, input);
    let id = event.id;
    nextRaveEventId += 1;
    id
  };

  public func updateRaveEvent(id : Common.RaveEventId, input : EventTypes.RaveEventInput) : async Bool {
    EventsLib.updateRaveEvent(raveEvents, id, input)
  };

  public func deleteRaveEvent(id : Common.RaveEventId) : async Bool {
    EventsLib.deleteRaveEvent(raveEvents, id)
  };

  // ── Nightclub Events ─────────────────────────────────────────────────────────

  public query func getNightclubEvents() : async [EventTypes.NightclubEvent] {
    EventsLib.getNightclubEvents(nightclubEvents)
  };

  public query func getNightclubEvent(id : Common.NightclubEventId) : async ?EventTypes.NightclubEvent {
    EventsLib.getNightclubEvent(nightclubEvents, id)
  };

  public func addNightclubEvent(input : EventTypes.NightclubEventInput) : async Common.NightclubEventId {
    let event = EventsLib.addNightclubEvent(nightclubEvents, nextNightclubEventId, input);
    let id = event.id;
    nextNightclubEventId += 1;
    id
  };

  public func updateNightclubEvent(id : Common.NightclubEventId, input : EventTypes.NightclubEventInput) : async Bool {
    EventsLib.updateNightclubEvent(nightclubEvents, id, input)
  };

  public func deleteNightclubEvent(id : Common.NightclubEventId) : async Bool {
    EventsLib.deleteNightclubEvent(nightclubEvents, id)
  };

  // ── Site Events ──────────────────────────────────────────────────────────────

  public query func getSiteEvents() : async [EventTypes.SiteEvent] {
    EventsLib.getSiteEvents(siteEvents)
  };

  public query func getSiteEvent(id : Common.SiteEventId) : async ?EventTypes.SiteEvent {
    EventsLib.getSiteEvent(siteEvents, id)
  };

  public func addSiteEvent(input : EventTypes.SiteEventInput) : async Common.SiteEventId {
    let event = EventsLib.addSiteEvent(siteEvents, nextSiteEventId, input);
    let id = event.id;
    nextSiteEventId += 1;
    id
  };

  public func updateSiteEvent(id : Common.SiteEventId, input : EventTypes.SiteEventInput) : async Bool {
    EventsLib.updateSiteEvent(siteEvents, id, input)
  };

  public func deleteSiteEvent(id : Common.SiteEventId) : async Bool {
    EventsLib.deleteSiteEvent(siteEvents, id)
  };

  // ── Rave Sets ─────────────────────────────────────────────────────────────────

  public query func getRaveSets() : async [EventTypes.RaveSet] {
    EventsLib.getRaveSets(raveSets)
  };

  public query func getRaveSetsByEvent(raveEventId : Nat) : async [EventTypes.RaveSet] {
    EventsLib.getRaveSetsByEvent(raveSets, raveEventId)
  };

  public query func getRaveSet(id : Common.RaveSetId) : async ?EventTypes.RaveSet {
    EventsLib.getRaveSet(raveSets, id)
  };

  public func addRaveSet(input : EventTypes.RaveSetInput) : async Common.RaveSetId {
    let s = EventsLib.addRaveSet(raveSets, nextRaveSetId, input);
    let id = s.id;
    nextRaveSetId += 1;
    id
  };

  public func updateRaveSet(id : Common.RaveSetId, input : EventTypes.RaveSetInput) : async Bool {
    EventsLib.updateRaveSet(raveSets, id, input)
  };

  public func deleteRaveSet(id : Common.RaveSetId) : async Bool {
    EventsLib.deleteRaveSet(raveSets, id)
  };

  // ── Nightclub Sets ────────────────────────────────────────────────────────────

  public query func getNightclubSets() : async [EventTypes.NightclubSet] {
    EventsLib.getNightclubSets(nightclubSets)
  };

  public query func getNightclubSetsByEvent(nightclubEventId : Nat) : async [EventTypes.NightclubSet] {
    EventsLib.getNightclubSetsByEvent(nightclubSets, nightclubEventId)
  };

  public query func getNightclubSet(id : Common.NightclubSetId) : async ?EventTypes.NightclubSet {
    EventsLib.getNightclubSet(nightclubSets, id)
  };

  public func addNightclubSet(input : EventTypes.NightclubSetInput) : async Common.NightclubSetId {
    let s = EventsLib.addNightclubSet(nightclubSets, nextNightclubSetId, input);
    let id = s.id;
    nextNightclubSetId += 1;
    id
  };

  public func updateNightclubSet(id : Common.NightclubSetId, input : EventTypes.NightclubSetInput) : async Bool {
    EventsLib.updateNightclubSet(nightclubSets, id, input)
  };

  public func deleteNightclubSet(id : Common.NightclubSetId) : async Bool {
    EventsLib.deleteNightclubSet(nightclubSets, id)
  };
};
