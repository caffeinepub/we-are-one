import Types "../types/festival";
import Common "../types/common";
import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";

module {
  public func getFestivals(
    festivals : List.List<Types.Festival>
  ) : [Types.Festival] {
    festivals.toArray()
  };

  public func getFestival(
    festivals : List.List<Types.Festival>,
    id : Common.FestivalId,
  ) : ?Types.Festival {
    festivals.find(func(f) { f.id == id })
  };

  public func addFestival(
    festivals : List.List<Types.Festival>,
    nextId : Nat,
    input : Types.FestivalInput,
  ) : Types.Festival {
    let festival : Types.Festival = {
      id = nextId;
      name = input.name;
      location = input.location;
      country = input.country;
      company = input.company;
      season = input.season;
      eventType = input.eventType;
      weekends = input.weekends;
      ticketPriceMin = input.ticketPriceMin;
      ticketPriceMax = input.ticketPriceMax;
      estimatedRevenueMin = input.estimatedRevenueMin;
      estimatedRevenueMax = input.estimatedRevenueMax;
      specialNotes = input.specialNotes;
      status = input.status;
      imageUrl = input.imageUrl;
      description = input.description;
      lineup = input.lineup;
      ageRestriction = input.ageRestriction;
      ticketUrl = input.ticketUrl;
    };
    festivals.add(festival);
    festival
  };

  public func updateFestival(
    festivals : List.List<Types.Festival>,
    id : Common.FestivalId,
    input : Types.FestivalInput,
  ) : Bool {
    let idx = festivals.findIndex(func(f) { f.id == id });
    switch (idx) {
      case null { false };
      case (?i) {
        let existing = festivals.at(i);
        festivals.put(i, {
          existing with
          name = input.name;
          location = input.location;
          country = input.country;
          company = input.company;
          season = input.season;
          eventType = input.eventType;
          weekends = input.weekends;
          ticketPriceMin = input.ticketPriceMin;
          ticketPriceMax = input.ticketPriceMax;
          estimatedRevenueMin = input.estimatedRevenueMin;
          estimatedRevenueMax = input.estimatedRevenueMax;
          specialNotes = input.specialNotes;
          status = input.status;
          imageUrl = input.imageUrl;
          description = input.description;
          lineup = input.lineup;
          ageRestriction = input.ageRestriction;
          ticketUrl = input.ticketUrl;
        });
        true
      };
    }
  };

  public func deleteFestival(
    festivals : List.List<Types.Festival>,
    id : Common.FestivalId,
  ) : Bool {
    let sizeBefore = festivals.size();
    let filtered = festivals.filter(func(f) { f.id != id });
    festivals.clear();
    festivals.append(filtered);
    festivals.size() < sizeBefore
  };

  public func toggleFestivalStatus(
    festivals : List.List<Types.Festival>,
    id : Common.FestivalId,
  ) : Bool {
    let idx = festivals.findIndex(func(f) { f.id == id });
    switch (idx) {
      case null { false };
      case (?i) {
        let existing = festivals.at(i);
        let newStatus : Types.FestivalStatus = switch (existing.status) {
          case (#ComingSoon) { #Active };
          case (#Active) { #ComingSoon };
        };
        festivals.put(i, { existing with status = newStatus });
        true
      };
    }
  };

  public func setFestivalImage(
    festivals : List.List<Types.Festival>,
    id : Common.FestivalId,
    imageUrl : Text,
  ) : Bool {
    let idx = festivals.findIndex(func(f) { f.id == id });
    switch (idx) {
      case null { false };
      case (?i) {
        let existing = festivals.at(i);
        festivals.put(i, { existing with imageUrl = ?imageUrl });
        true
      };
    }
  };

  public func setFestivalTicketUrl(
    festivals : List.List<Types.Festival>,
    id : Common.FestivalId,
    url : Text,
  ) : Bool {
    let idx = festivals.findIndex(func(f) { f.id == id });
    switch (idx) {
      case null { false };
      case (?i) {
        let existing = festivals.at(i);
        festivals.put(i, { existing with ticketUrl = ?url });
        true
      };
    }
  };

  public func getPackages(
    packages : List.List<Types.Package>
  ) : [Types.Package] {
    packages.toArray()
  };

  public func addPackage(
    packages : List.List<Types.Package>,
    nextId : Nat,
    input : Types.PackageInput,
  ) : Types.Package {
    let pkg : Types.Package = {
      id = nextId;
      name = input.name;
      description = input.description;
      priceGBP = input.priceGBP;
      includes = input.includes;
      packageType = input.packageType;
      festivalId = input.festivalId;
    };
    packages.add(pkg);
    pkg
  };

  public func updatePackage(
    packages : List.List<Types.Package>,
    id : Common.PackageId,
    input : Types.PackageInput,
  ) : Bool {
    let idx = packages.findIndex(func(p) { p.id == id });
    switch (idx) {
      case null { false };
      case (?i) {
        let existing = packages.at(i);
        packages.put(i, {
          existing with
          name = input.name;
          description = input.description;
          priceGBP = input.priceGBP;
          includes = input.includes;
          packageType = input.packageType;
          festivalId = input.festivalId;
        });
        true
      };
    }
  };

  public func deletePackage(
    packages : List.List<Types.Package>,
    id : Common.PackageId,
  ) : Bool {
    let sizeBefore = packages.size();
    let filtered = packages.filter(func(p) { p.id != id });
    packages.clear();
    packages.append(filtered);
    packages.size() < sizeBefore
  };

  public func getAnalytics(
    festivals : List.List<Types.Festival>
  ) : [Types.Analytics] {
    festivals.map<Types.Festival, Types.Analytics>(func(f) {
      let avgPrice = (f.ticketPriceMin + f.ticketPriceMax) / 2;
      let estimated = if (avgPrice > 0) { 1000 * 100 / avgPrice } else { 0 };
      {
        festivalId = f.id;
        estimatedAttendance = estimated * 10;
        estimatedRevenue = f.estimatedRevenueMin # " – " # f.estimatedRevenueMax;
        ticketsSold = 0;
      }
    }).toArray()
  };

  public func adminLogin(
    sessions : Map.Map<Text, Types.AdminSession>,
    password : Text,
  ) : ?Text {
    if (password != "b9bkzisthebest") {
      return null;
    };
    let token = "admin-token-" # password;
    let session : Types.AdminSession = {
      token = token;
      expiresAt = Time.now() + 86_400_000_000_000; // 24 hours in nanoseconds
    };
    sessions.add(token, session);
    ?token
  };
};
