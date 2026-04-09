import EventTypes "types/events";
import List "mo:core/List";

module {
  // ── Old types (inline from .old/src/backend/types/events.mo) ─────────────────

  type OldRaveEvent = {
    id : Nat;
    name : Text;
    description : Text;
    date : Text;
    location : Text;
    imageUrl : Text;
    festivalId : ?Nat;
    categoryId : ?Nat;
    eventType : Text;
    isStandalone : Bool;
    createdAt : Int;
  };

  type OldNightclubEvent = {
    id : Nat;
    name : Text;
    description : Text;
    date : Text;
    location : Text;
    imageUrl : Text;
    festivalId : ?Nat;
    categoryId : ?Nat;
    isStandalone : Bool;
    createdAt : Int;
  };

  type OldActor = {
    raveEvents : List.List<OldRaveEvent>;
    nightclubEvents : List.List<OldNightclubEvent>;
  };

  type NewActor = {
    raveEvents : List.List<EventTypes.RaveEvent>;
    nightclubEvents : List.List<EventTypes.NightclubEvent>;
    raveSets : List.List<EventTypes.RaveSet>;
    nightclubSets : List.List<EventTypes.NightclubSet>;
  };

  public func run(old : OldActor) : NewActor {
    let raveEvents = old.raveEvents.map<OldRaveEvent, EventTypes.RaveEvent>(
      func(e) { { e with ticketUrl = null } }
    );
    let nightclubEvents = old.nightclubEvents.map<OldNightclubEvent, EventTypes.NightclubEvent>(
      func(e) { { e with ticketUrl = null } }
    );
    let raveSets = List.empty<EventTypes.RaveSet>();
    let nightclubSets = List.empty<EventTypes.NightclubSet>();
    { raveEvents; nightclubEvents; raveSets; nightclubSets };
  };
};
