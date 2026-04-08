import Types "../types/festival";
import Common "../types/common";
import FestivalLib "../lib/festival";
import List "mo:core/List";
import Map "mo:core/Map";

mixin (
  festivals : List.List<Types.Festival>,
  packages : List.List<Types.Package>,
  sessions : Map.Map<Text, Types.AdminSession>,
) {
  var nextFestivalId : Nat = festivals.size() + 1;
  var nextPackageId : Nat = packages.size() + 1;

  public query func getFestivals() : async [Types.Festival] {
    FestivalLib.getFestivals(festivals)
  };

  public query func getFestival(id : Common.FestivalId) : async ?Types.Festival {
    FestivalLib.getFestival(festivals, id)
  };

  public func addFestival(input : Types.FestivalInput) : async Common.FestivalId {
    let f = FestivalLib.addFestival(festivals, nextFestivalId, input);
    nextFestivalId += 1;
    f.id
  };

  public func updateFestival(id : Common.FestivalId, input : Types.FestivalInput) : async Bool {
    FestivalLib.updateFestival(festivals, id, input)
  };

  public func deleteFestival(id : Common.FestivalId) : async Bool {
    FestivalLib.deleteFestival(festivals, id)
  };

  public func toggleFestivalStatus(id : Common.FestivalId) : async Bool {
    FestivalLib.toggleFestivalStatus(festivals, id)
  };

  public query func getPackages() : async [Types.Package] {
    FestivalLib.getPackages(packages)
  };

  public func addPackage(input : Types.PackageInput) : async Common.PackageId {
    let p = FestivalLib.addPackage(packages, nextPackageId, input);
    nextPackageId += 1;
    p.id
  };

  public func updatePackage(id : Common.PackageId, input : Types.PackageInput) : async Bool {
    FestivalLib.updatePackage(packages, id, input)
  };

  public func deletePackage(id : Common.PackageId) : async Bool {
    FestivalLib.deletePackage(packages, id)
  };

  public func adminLogin(password : Text) : async ?Text {
    FestivalLib.adminLogin(sessions, password)
  };

  public query func getAnalytics() : async [Types.Analytics] {
    FestivalLib.getAnalytics(festivals)
  };

  public func setFestivalImage(id : Common.FestivalId, imageUrl : Text) : async Bool {
    FestivalLib.setFestivalImage(festivals, id, imageUrl)
  };
};
