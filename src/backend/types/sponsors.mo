module {
  public type Sponsor = {
    id : Nat;
    name : Text;
    logoUrl : Text;
    websiteUrl : Text;
    tier : Text;
    festivalIds : [Nat];
    createdAt : Int;
  };

  public type SponsorInput = {
    name : Text;
    logoUrl : Text;
    websiteUrl : Text;
    tier : Text;
    festivalIds : [Nat];
  };
};
