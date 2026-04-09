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
};
