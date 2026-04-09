import FestivalTypes "types/festival";
import EventTypes "types/events";
import NewsTypes "types/news";
import DonationTypes "types/donations";
import SponsorTypes "types/sponsors";
import List "mo:core/List";
import Set "mo:core/Set";

module {
  // ── Old actor shape matches the currently deployed state ─────────────────────
  // The deployed canister has duplicate festivals (72 instead of 24) because
  // seeding ran unconditionally on every deploy. The migration deduplicates
  // festivals by name, keeping only the first occurrence of each.

  type OldActor = {
    festivals : List.List<FestivalTypes.Festival>;
    packages : List.List<FestivalTypes.Package>;
    newsArticles : List.List<NewsTypes.NewsArticle>;
    lineupEntries : List.List<NewsTypes.LineupEntry>;
    donationGoals : List.List<DonationTypes.DonationGoal>;
    sponsors : List.List<SponsorTypes.Sponsor>;
    categories : List.List<EventTypes.EventCategory>;
    raveEvents : List.List<EventTypes.RaveEvent>;
    nightclubEvents : List.List<EventTypes.NightclubEvent>;
    siteEvents : List.List<EventTypes.SiteEvent>;
    raveSets : List.List<EventTypes.RaveSet>;
    nightclubSets : List.List<EventTypes.NightclubSet>;
  };

  type NewActor = {
    festivals : List.List<FestivalTypes.Festival>;
    packages : List.List<FestivalTypes.Package>;
    newsArticles : List.List<NewsTypes.NewsArticle>;
    lineupEntries : List.List<NewsTypes.LineupEntry>;
    donationGoals : List.List<DonationTypes.DonationGoal>;
    sponsors : List.List<SponsorTypes.Sponsor>;
    categories : List.List<EventTypes.EventCategory>;
    raveEvents : List.List<EventTypes.RaveEvent>;
    nightclubEvents : List.List<EventTypes.NightclubEvent>;
    siteEvents : List.List<EventTypes.SiteEvent>;
    raveSets : List.List<EventTypes.RaveSet>;
    nightclubSets : List.List<EventTypes.NightclubSet>;
  };

  // Deduplicate a festival list by name, keeping the first occurrence of each name.
  func dedupFestivalsByName(src : List.List<FestivalTypes.Festival>) : List.List<FestivalTypes.Festival> {
    let seen = Set.empty<Text>();
    let deduped = List.empty<FestivalTypes.Festival>();
    for (f in src.values()) {
      if (not seen.contains(f.name)) {
        seen.add(f.name);
        deduped.add(f);
      };
    };
    deduped
  };

  public func run(old : OldActor) : NewActor {
    {
      old with
      festivals = dedupFestivalsByName(old.festivals);
    }
  };
};
