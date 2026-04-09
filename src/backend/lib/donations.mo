import Types "../types/donations";
import Common "../types/common";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  public func getDonationGoals(
    goals : List.List<Types.DonationGoal>
  ) : [Types.DonationGoal] {
    goals.toArray()
  };

  public func getDonationGoal(
    goals : List.List<Types.DonationGoal>,
    id : Common.DonationGoalId,
  ) : ?Types.DonationGoal {
    goals.find(func(g) { g.id == id })
  };

  public func addDonationGoal(
    goals : List.List<Types.DonationGoal>,
    nextId : Nat,
    input : Types.DonationGoalInput,
  ) : Types.DonationGoal {
    let goal : Types.DonationGoal = {
      id = nextId;
      title = input.title;
      description = input.description;
      targetAmount = input.targetAmount;
      currentAmount = input.currentAmount;
      donationUrl = input.donationUrl;
      festivalId = input.festivalId;
      isGlobal = input.isGlobal;
      createdAt = Time.now();
    };
    goals.add(goal);
    goal
  };

  public func updateDonationGoal(
    goals : List.List<Types.DonationGoal>,
    id : Common.DonationGoalId,
    input : Types.DonationGoalInput,
  ) : Bool {
    let idx = goals.findIndex(func(g) { g.id == id });
    switch (idx) {
      case null { false };
      case (?i) {
        let existing = goals.at(i);
        goals.put(i, {
          existing with
          title = input.title;
          description = input.description;
          targetAmount = input.targetAmount;
          currentAmount = input.currentAmount;
          donationUrl = input.donationUrl;
          festivalId = input.festivalId;
          isGlobal = input.isGlobal;
        });
        true
      };
    }
  };

  public func deleteDonationGoal(
    goals : List.List<Types.DonationGoal>,
    id : Common.DonationGoalId,
  ) : Bool {
    let sizeBefore = goals.size();
    let filtered = goals.filter(func(g) { g.id != id });
    goals.clear();
    goals.append(filtered);
    goals.size() < sizeBefore
  };
};
