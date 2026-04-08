import NewTypes "types/festival";
import List "mo:core/List";
import Map "mo:core/Map";

module {
  // ── Old types (from previous version, defined inline) ───────────────────────

  type OldFestivalId = Nat;
  type OldPackageId = Nat;
  type OldTimestamp = Int;

  type OldSeason = { #Summer; #Winter };
  type OldEventType = { #EDM; #Family; #ClubHotel; #Rave };
  type OldFestivalStatus = { #ComingSoon; #Active };

  type OldFestival = {
    id : OldFestivalId;
    name : Text;
    location : Text;
    country : Text;
    company : Text;
    season : OldSeason;
    eventType : OldEventType;
    weekends : Text;
    ticketPriceMin : Nat;
    ticketPriceMax : Nat;
    estimatedRevenueMin : Text;
    estimatedRevenueMax : Text;
    specialNotes : ?Text;
    status : OldFestivalStatus;
    imageUrl : ?Text;
    description : ?Text;
    lineup : ?Text;
    ageRestriction : Text;
  };

  type OldPackage = {
    id : OldPackageId;
    name : Text;
    description : Text;
    priceGBP : Nat;
    includes : [Text];
    packageType : NewTypes.PackageType;
    festivalId : ?OldFestivalId;
  };

  type OldAdminSession = {
    token : Text;
    expiresAt : OldTimestamp;
  };

  type OldActor = {
    festivals : List.List<OldFestival>;
    packages : List.List<OldPackage>;
    sessions : Map.Map<Text, OldAdminSession>;
    var seedFestivalId : Nat;
    var seedPackageId : Nat;
  };

  type NewActor = {
    festivals : List.List<NewTypes.Festival>;
    packages : List.List<NewTypes.Package>;
    sessions : Map.Map<Text, NewTypes.AdminSession>;
    var seedFestivalId : Nat;
    var seedPackageId : Nat;
  };

  public func run(old : OldActor) : NewActor {
    let festivals = old.festivals.map<OldFestival, NewTypes.Festival>(
      func(f) { { f with ticketUrl = null } }
    );
    {
      festivals;
      packages = old.packages;
      sessions = old.sessions;
      var seedFestivalId = old.seedFestivalId;
      var seedPackageId = old.seedPackageId;
    };
  };
};
