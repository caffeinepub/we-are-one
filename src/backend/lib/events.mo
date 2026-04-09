import Types "../types/events";
import Common "../types/common";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  // ── Categories ───────────────────────────────────────────────────────────────

  public func getCategories(
    categories : List.List<Types.EventCategory>
  ) : [Types.EventCategory] {
    categories.toArray()
  };

  public func getCategory(
    categories : List.List<Types.EventCategory>,
    id : Common.EventCategoryId,
  ) : ?Types.EventCategory {
    categories.find(func(c) { c.id == id })
  };

  public func addCategory(
    categories : List.List<Types.EventCategory>,
    nextId : Nat,
    input : Types.CategoryInput,
  ) : Types.EventCategory {
    let category : Types.EventCategory = {
      id = nextId;
      name = input.name;
      description = input.description;
      createdAt = Time.now();
    };
    categories.add(category);
    category
  };

  public func updateCategory(
    categories : List.List<Types.EventCategory>,
    id : Common.EventCategoryId,
    input : Types.CategoryInput,
  ) : Bool {
    let idx = categories.findIndex(func(c) { c.id == id });
    switch (idx) {
      case null { false };
      case (?i) {
        let existing = categories.at(i);
        categories.put(i, {
          existing with
          name = input.name;
          description = input.description;
        });
        true
      };
    }
  };

  public func deleteCategory(
    categories : List.List<Types.EventCategory>,
    id : Common.EventCategoryId,
  ) : Bool {
    let sizeBefore = categories.size();
    let filtered = categories.filter(func(c) { c.id != id });
    categories.clear();
    categories.append(filtered);
    categories.size() < sizeBefore
  };

  // ── Rave Events ──────────────────────────────────────────────────────────────

  public func getRaveEvents(
    raveEvents : List.List<Types.RaveEvent>
  ) : [Types.RaveEvent] {
    raveEvents.toArray()
  };

  public func getRaveEvent(
    raveEvents : List.List<Types.RaveEvent>,
    id : Common.RaveEventId,
  ) : ?Types.RaveEvent {
    raveEvents.find(func(e) { e.id == id })
  };

  public func addRaveEvent(
    raveEvents : List.List<Types.RaveEvent>,
    nextId : Nat,
    input : Types.RaveEventInput,
  ) : Types.RaveEvent {
    let event : Types.RaveEvent = {
      id = nextId;
      name = input.name;
      description = input.description;
      date = input.date;
      location = input.location;
      imageUrl = input.imageUrl;
      festivalId = input.festivalId;
      categoryId = input.categoryId;
      eventType = input.eventType;
      isStandalone = input.isStandalone;
      createdAt = Time.now();
    };
    raveEvents.add(event);
    event
  };

  public func updateRaveEvent(
    raveEvents : List.List<Types.RaveEvent>,
    id : Common.RaveEventId,
    input : Types.RaveEventInput,
  ) : Bool {
    let idx = raveEvents.findIndex(func(e) { e.id == id });
    switch (idx) {
      case null { false };
      case (?i) {
        let existing = raveEvents.at(i);
        raveEvents.put(i, {
          existing with
          name = input.name;
          description = input.description;
          date = input.date;
          location = input.location;
          imageUrl = input.imageUrl;
          festivalId = input.festivalId;
          categoryId = input.categoryId;
          eventType = input.eventType;
          isStandalone = input.isStandalone;
        });
        true
      };
    }
  };

  public func deleteRaveEvent(
    raveEvents : List.List<Types.RaveEvent>,
    id : Common.RaveEventId,
  ) : Bool {
    let sizeBefore = raveEvents.size();
    let filtered = raveEvents.filter(func(e) { e.id != id });
    raveEvents.clear();
    raveEvents.append(filtered);
    raveEvents.size() < sizeBefore
  };

  // ── Nightclub Events ─────────────────────────────────────────────────────────

  public func getNightclubEvents(
    nightclubEvents : List.List<Types.NightclubEvent>
  ) : [Types.NightclubEvent] {
    nightclubEvents.toArray()
  };

  public func getNightclubEvent(
    nightclubEvents : List.List<Types.NightclubEvent>,
    id : Common.NightclubEventId,
  ) : ?Types.NightclubEvent {
    nightclubEvents.find(func(e) { e.id == id })
  };

  public func addNightclubEvent(
    nightclubEvents : List.List<Types.NightclubEvent>,
    nextId : Nat,
    input : Types.NightclubEventInput,
  ) : Types.NightclubEvent {
    let event : Types.NightclubEvent = {
      id = nextId;
      name = input.name;
      description = input.description;
      date = input.date;
      location = input.location;
      imageUrl = input.imageUrl;
      festivalId = input.festivalId;
      categoryId = input.categoryId;
      isStandalone = input.isStandalone;
      createdAt = Time.now();
    };
    nightclubEvents.add(event);
    event
  };

  public func updateNightclubEvent(
    nightclubEvents : List.List<Types.NightclubEvent>,
    id : Common.NightclubEventId,
    input : Types.NightclubEventInput,
  ) : Bool {
    let idx = nightclubEvents.findIndex(func(e) { e.id == id });
    switch (idx) {
      case null { false };
      case (?i) {
        let existing = nightclubEvents.at(i);
        nightclubEvents.put(i, {
          existing with
          name = input.name;
          description = input.description;
          date = input.date;
          location = input.location;
          imageUrl = input.imageUrl;
          festivalId = input.festivalId;
          categoryId = input.categoryId;
          isStandalone = input.isStandalone;
        });
        true
      };
    }
  };

  public func deleteNightclubEvent(
    nightclubEvents : List.List<Types.NightclubEvent>,
    id : Common.NightclubEventId,
  ) : Bool {
    let sizeBefore = nightclubEvents.size();
    let filtered = nightclubEvents.filter(func(e) { e.id != id });
    nightclubEvents.clear();
    nightclubEvents.append(filtered);
    nightclubEvents.size() < sizeBefore
  };

  // ── Site Events ──────────────────────────────────────────────────────────────

  public func getSiteEvents(
    siteEvents : List.List<Types.SiteEvent>
  ) : [Types.SiteEvent] {
    siteEvents.toArray()
  };

  public func getSiteEvent(
    siteEvents : List.List<Types.SiteEvent>,
    id : Common.SiteEventId,
  ) : ?Types.SiteEvent {
    siteEvents.find(func(e) { e.id == id })
  };

  public func addSiteEvent(
    siteEvents : List.List<Types.SiteEvent>,
    nextId : Nat,
    input : Types.SiteEventInput,
  ) : Types.SiteEvent {
    let event : Types.SiteEvent = {
      id = nextId;
      name = input.name;
      description = input.description;
      date = input.date;
      location = input.location;
      imageUrl = input.imageUrl;
      categoryId = input.categoryId;
      festivalId = input.festivalId;
      createdAt = Time.now();
    };
    siteEvents.add(event);
    event
  };

  public func updateSiteEvent(
    siteEvents : List.List<Types.SiteEvent>,
    id : Common.SiteEventId,
    input : Types.SiteEventInput,
  ) : Bool {
    let idx = siteEvents.findIndex(func(e) { e.id == id });
    switch (idx) {
      case null { false };
      case (?i) {
        let existing = siteEvents.at(i);
        siteEvents.put(i, {
          existing with
          name = input.name;
          description = input.description;
          date = input.date;
          location = input.location;
          imageUrl = input.imageUrl;
          categoryId = input.categoryId;
          festivalId = input.festivalId;
        });
        true
      };
    }
  };

  public func deleteSiteEvent(
    siteEvents : List.List<Types.SiteEvent>,
    id : Common.SiteEventId,
  ) : Bool {
    let sizeBefore = siteEvents.size();
    let filtered = siteEvents.filter(func(e) { e.id != id });
    siteEvents.clear();
    siteEvents.append(filtered);
    siteEvents.size() < sizeBefore
  };
};
