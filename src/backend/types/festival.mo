import Common "common";

module {
  public type Season = { #Summer; #Winter };

  public type EventType = { #EDM; #Family; #ClubHotel; #Rave };

  public type FestivalStatus = { #ComingSoon; #Active };

  public type Festival = {
    id : Common.FestivalId;
    name : Text;
    location : Text;
    country : Text;
    company : Text;
    season : Season;
    eventType : EventType;
    weekends : Text;
    ticketPriceMin : Nat;
    ticketPriceMax : Nat;
    estimatedRevenueMin : Text;
    estimatedRevenueMax : Text;
    specialNotes : ?Text;
    status : FestivalStatus;
    imageUrl : ?Text;
    description : ?Text;
    lineup : ?Text;
    ageRestriction : Text;
    ticketUrl : ?Text;
  };

  public type FestivalInput = {
    name : Text;
    location : Text;
    country : Text;
    company : Text;
    season : Season;
    eventType : EventType;
    weekends : Text;
    ticketPriceMin : Nat;
    ticketPriceMax : Nat;
    estimatedRevenueMin : Text;
    estimatedRevenueMax : Text;
    specialNotes : ?Text;
    status : FestivalStatus;
    imageUrl : ?Text;
    description : ?Text;
    lineup : ?Text;
    ageRestriction : Text;
    ticketUrl : ?Text;
  };

  public type PackageType = {
    #Weekend1;
    #Weekend2;
    #FullWeekend;
    #VIP;
    #FlightPackage;
    #Transfer;
    #Accommodation;
  };

  public type Package = {
    id : Common.PackageId;
    name : Text;
    description : Text;
    priceGBP : Nat;
    includes : [Text];
    packageType : PackageType;
    festivalId : ?Common.FestivalId;
  };

  public type PackageInput = {
    name : Text;
    description : Text;
    priceGBP : Nat;
    includes : [Text];
    packageType : PackageType;
    festivalId : ?Common.FestivalId;
  };

  public type AdminSession = {
    token : Text;
    expiresAt : Common.Timestamp;
  };

  public type Analytics = {
    festivalId : Common.FestivalId;
    estimatedAttendance : Nat;
    estimatedRevenue : Text;
    ticketsSold : Nat;
  };
};
