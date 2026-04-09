import Types "../types/sponsors";
import Common "../types/common";
import List "mo:core/List";
import Array "mo:core/Array";
import Time "mo:core/Time";

module {
  public func getSponsors(
    sponsors : List.List<Types.Sponsor>
  ) : [Types.Sponsor] {
    sponsors.toArray()
  };

  public func getSponsor(
    sponsors : List.List<Types.Sponsor>,
    id : Common.SponsorId,
  ) : ?Types.Sponsor {
    sponsors.find(func(s) { s.id == id })
  };

  public func getSponsorsByFestival(
    sponsors : List.List<Types.Sponsor>,
    festivalId : Common.FestivalId,
  ) : [Types.Sponsor] {
    sponsors.filter(func(s) {
      s.festivalIds.find<Nat>(func(fid) { fid == festivalId }) != null
    }).toArray()
  };

  public func addSponsor(
    sponsors : List.List<Types.Sponsor>,
    nextId : Nat,
    input : Types.SponsorInput,
  ) : Types.Sponsor {
    let sponsor : Types.Sponsor = {
      id = nextId;
      name = input.name;
      logoUrl = input.logoUrl;
      websiteUrl = input.websiteUrl;
      tier = input.tier;
      festivalIds = input.festivalIds;
      createdAt = Time.now();
    };
    sponsors.add(sponsor);
    sponsor
  };

  public func updateSponsor(
    sponsors : List.List<Types.Sponsor>,
    id : Common.SponsorId,
    input : Types.SponsorInput,
  ) : Bool {
    let idx = sponsors.findIndex(func(s) { s.id == id });
    switch (idx) {
      case null { false };
      case (?i) {
        let existing = sponsors.at(i);
        sponsors.put(i, {
          existing with
          name = input.name;
          logoUrl = input.logoUrl;
          websiteUrl = input.websiteUrl;
          tier = input.tier;
          festivalIds = input.festivalIds;
        });
        true
      };
    }
  };

  public func deleteSponsor(
    sponsors : List.List<Types.Sponsor>,
    id : Common.SponsorId,
  ) : Bool {
    let sizeBefore = sponsors.size();
    let filtered = sponsors.filter(func(s) { s.id != id });
    sponsors.clear();
    sponsors.append(filtered);
    sponsors.size() < sizeBefore
  };
};
