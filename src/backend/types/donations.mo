module {
  public type DonationGoal = {
    id : Nat;
    title : Text;
    description : Text;
    targetAmount : Nat;
    currentAmount : Nat;
    donationUrl : Text;
    festivalId : ?Nat;
    isGlobal : Bool;
    createdAt : Int;
  };

  public type DonationGoalInput = {
    title : Text;
    description : Text;
    targetAmount : Nat;
    currentAmount : Nat;
    donationUrl : Text;
    festivalId : ?Nat;
    isGlobal : Bool;
  };
};
