module {
  public type EventCategory = {
    id : Nat;
    name : Text;
    description : Text;
    createdAt : Int;
  };

  public type CategoryInput = {
    name : Text;
    description : Text;
  };

  public type RaveEvent = {
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
    ticketUrl : ?Text;
    createdAt : Int;
  };

  public type RaveEventInput = {
    name : Text;
    description : Text;
    date : Text;
    location : Text;
    imageUrl : Text;
    festivalId : ?Nat;
    categoryId : ?Nat;
    eventType : Text;
    isStandalone : Bool;
    ticketUrl : ?Text;
  };

  public type NightclubEvent = {
    id : Nat;
    name : Text;
    description : Text;
    date : Text;
    location : Text;
    imageUrl : Text;
    festivalId : ?Nat;
    categoryId : ?Nat;
    isStandalone : Bool;
    ticketUrl : ?Text;
    createdAt : Int;
  };

  public type NightclubEventInput = {
    name : Text;
    description : Text;
    date : Text;
    location : Text;
    imageUrl : Text;
    festivalId : ?Nat;
    categoryId : ?Nat;
    isStandalone : Bool;
    ticketUrl : ?Text;
  };

  public type SiteEvent = {
    id : Nat;
    name : Text;
    description : Text;
    date : Text;
    location : Text;
    imageUrl : Text;
    categoryId : ?Nat;
    festivalId : ?Nat;
    createdAt : Int;
  };

  public type SiteEventInput = {
    name : Text;
    description : Text;
    date : Text;
    location : Text;
    imageUrl : Text;
    categoryId : ?Nat;
    festivalId : ?Nat;
  };

  public type RaveSet = {
    id : Nat;
    raveEventId : Nat;
    nightLabel : Text;
    artistName : Text;
    stage : Text;
    startTime : Text;
    endTime : Text;
    youtubeUrl : ?Text;
    createdAt : Int;
  };

  public type RaveSetInput = {
    raveEventId : Nat;
    nightLabel : Text;
    artistName : Text;
    stage : Text;
    startTime : Text;
    endTime : Text;
    youtubeUrl : ?Text;
  };

  public type NightclubSet = {
    id : Nat;
    nightclubEventId : Nat;
    nightLabel : Text;
    artistName : Text;
    stage : Text;
    startTime : Text;
    endTime : Text;
    youtubeUrl : ?Text;
    createdAt : Int;
  };

  public type NightclubSetInput = {
    nightclubEventId : Nat;
    nightLabel : Text;
    artistName : Text;
    stage : Text;
    startTime : Text;
    endTime : Text;
    youtubeUrl : ?Text;
  };
};
