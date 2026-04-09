import EventTypes "types/events";
import List "mo:core/List";

module {
  // ── Old types match the previous deployed version ────────────────────────────
  // The previous actor already had ticketUrl on raveEvents/nightclubEvents and
  // had raveSets/nightclubSets — so old and new types are identical; pass through.

  type OldActor = {
    raveEvents : List.List<EventTypes.RaveEvent>;
    nightclubEvents : List.List<EventTypes.NightclubEvent>;
    raveSets : List.List<EventTypes.RaveSet>;
    nightclubSets : List.List<EventTypes.NightclubSet>;
  };

  type NewActor = {
    raveEvents : List.List<EventTypes.RaveEvent>;
    nightclubEvents : List.List<EventTypes.NightclubEvent>;
    raveSets : List.List<EventTypes.RaveSet>;
    nightclubSets : List.List<EventTypes.NightclubSet>;
  };

  public func run(old : OldActor) : NewActor {
    old
  };
};
