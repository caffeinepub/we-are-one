import DonationTypes "../types/donations";
import SponsorTypes "../types/sponsors";
import Common "../types/common";
import DonationsLib "../lib/donations";
import SponsorsLib "../lib/sponsors";
import List "mo:core/List";

mixin (
  donationGoals : List.List<DonationTypes.DonationGoal>,
  sponsors : List.List<SponsorTypes.Sponsor>,
) {
  var nextDonationGoalId : Nat = donationGoals.size() + 1;
  var nextSponsorId : Nat = sponsors.size() + 1;

  // ── Donation Goals ───────────────────────────────────────────────────────────

  public query func getDonationGoals() : async [DonationTypes.DonationGoal] {
    DonationsLib.getDonationGoals(donationGoals)
  };

  public query func getDonationGoal(id : Common.DonationGoalId) : async ?DonationTypes.DonationGoal {
    DonationsLib.getDonationGoal(donationGoals, id)
  };

  public func addDonationGoal(input : DonationTypes.DonationGoalInput) : async Common.DonationGoalId {
    let goal = DonationsLib.addDonationGoal(donationGoals, nextDonationGoalId, input);
    let id = goal.id;
    nextDonationGoalId += 1;
    id
  };

  public func updateDonationGoal(id : Common.DonationGoalId, input : DonationTypes.DonationGoalInput) : async Bool {
    DonationsLib.updateDonationGoal(donationGoals, id, input)
  };

  public func deleteDonationGoal(id : Common.DonationGoalId) : async Bool {
    DonationsLib.deleteDonationGoal(donationGoals, id)
  };

  // ── Sponsors ─────────────────────────────────────────────────────────────────

  public query func getSponsors() : async [SponsorTypes.Sponsor] {
    SponsorsLib.getSponsors(sponsors)
  };

  public query func getSponsor(id : Common.SponsorId) : async ?SponsorTypes.Sponsor {
    SponsorsLib.getSponsor(sponsors, id)
  };

  public query func getSponsorsByFestival(festivalId : Common.FestivalId) : async [SponsorTypes.Sponsor] {
    SponsorsLib.getSponsorsByFestival(sponsors, festivalId)
  };

  public func addSponsor(input : SponsorTypes.SponsorInput) : async Common.SponsorId {
    let sponsor = SponsorsLib.addSponsor(sponsors, nextSponsorId, input);
    let id = sponsor.id;
    nextSponsorId += 1;
    id
  };

  public func updateSponsor(id : Common.SponsorId, input : SponsorTypes.SponsorInput) : async Bool {
    SponsorsLib.updateSponsor(sponsors, id, input)
  };

  public func deleteSponsor(id : Common.SponsorId) : async Bool {
    SponsorsLib.deleteSponsor(sponsors, id)
  };
};
