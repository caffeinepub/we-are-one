import Types "types/festival";
import NewsTypes "types/news";
import DonationTypes "types/donations";
import SponsorTypes "types/sponsors";
import EventTypes "types/events";
import FestivalApi "mixins/festival-api";
import NewsLineupApi "mixins/news-lineup-api";
import DonationsSponsorsApi "mixins/donations-sponsors-api";
import EventsApi "mixins/events-api";
import FestivalLib "lib/festival";
import Migration "migration";

import List "mo:core/List";
import Map "mo:core/Map";


(with migration = Migration.run)
actor {
  let festivals = List.empty<Types.Festival>();
  let packages = List.empty<Types.Package>();
  let sessions = Map.empty<Text, Types.AdminSession>();
  let newsArticles = List.empty<NewsTypes.NewsArticle>();
  let lineupEntries = List.empty<NewsTypes.LineupEntry>();
  let donationGoals = List.empty<DonationTypes.DonationGoal>();
  let sponsors = List.empty<SponsorTypes.Sponsor>();
  let categories = List.empty<EventTypes.EventCategory>();
  let raveEvents = List.empty<EventTypes.RaveEvent>();
  let nightclubEvents = List.empty<EventTypes.NightclubEvent>();
  let siteEvents = List.empty<EventTypes.SiteEvent>();
  let raveSets = List.empty<EventTypes.RaveSet>();
  let nightclubSets = List.empty<EventTypes.NightclubSet>();

  // ── Seed festivals (only on first deploy when list is empty) ─────────────────

  if (festivals.size() == 0) {

  var seedFestivalId : Nat = 1;
  var seedPackageId : Nat = 1;

  func seedFestival(input : Types.FestivalInput) {
    ignore FestivalLib.addFestival(festivals, seedFestivalId, input);
    seedFestivalId += 1;
  };

  func seedPackage(input : Types.PackageInput) {
    ignore FestivalLib.addPackage(packages, seedPackageId, input);
    seedPackageId += 1;
  };

  // Summer / International Festivals
  seedFestival({
    name = "WE ARE ONE Brazil – Summer Carnival EDM Festival";
    location = "São Paulo";
    country = "Brazil";
    company = "WE ARE ONE Brazil Ltd";
    season = #Summer;
    eventType = #EDM;
    weekends = "3 weekends";
    ticketPriceMin = 3500;
    ticketPriceMax = 5000;
    estimatedRevenueMin = "£10,500,000";
    estimatedRevenueMax = "£15,000,000";
    specialNotes = null;
    status = #ComingSoon;
    imageUrl = null;
    description = null;
    lineup = null;
    ageRestriction = "14+";
    ticketUrl = null;
  });

  seedFestival({
    name = "WE ARE ONE Boom – Belgium";
    location = "Boom";
    country = "Belgium";
    company = "WE ARE ONE Boom Ltd";
    season = #Summer;
    eventType = #EDM;
    weekends = "3 weekends";
    ticketPriceMin = 4000;
    ticketPriceMax = 6000;
    estimatedRevenueMin = "£12,000,000";
    estimatedRevenueMax = "£18,000,000";
    specialNotes = null;
    status = #ComingSoon;
    imageUrl = null;
    description = null;
    lineup = null;
    ageRestriction = "14+";
    ticketUrl = null;
  });

  seedFestival({
    name = "WE ARE ONE Netherlands – Ultra/Hardcore Rave";
    location = "Amsterdam";
    country = "Netherlands";
    company = "WE ARE ONE Netherlands Ultra Rave Ltd";
    season = #Summer;
    eventType = #Rave;
    weekends = "3 weekends";
    ticketPriceMin = 2500;
    ticketPriceMax = 4000;
    estimatedRevenueMin = "£7,500,000";
    estimatedRevenueMax = "£12,000,000";
    specialNotes = ?"Event Hours: 12 AM – 5 AM";
    status = #ComingSoon;
    imageUrl = null;
    description = null;
    lineup = null;
    ageRestriction = "14+";
    ticketUrl = null;
  });

  seedFestival({
    name = "WE ARE ONE Ibiza – Club/Hotel Hybrid";
    location = "Ibiza";
    country = "Spain";
    company = "WE ARE ONE Ibiza Ltd";
    season = #Summer;
    eventType = #ClubHotel;
    weekends = "Year-round (summer-focused)";
    ticketPriceMin = 4500;
    ticketPriceMax = 6500;
    estimatedRevenueMin = "£10,000+ per night";
    estimatedRevenueMax = "£10,000+ per night";
    specialNotes = ?"Per-night pricing. Up to 10k guests at peak.";
    status = #ComingSoon;
    imageUrl = null;
    description = null;
    lineup = null;
    ageRestriction = "18+";
    ticketUrl = null;
  });

  seedFestival({
    name = "WE ARE ONE Asia – Summer Regional Festivals";
    location = "Various cities";
    country = "Asia";
    company = "WE ARE ONE Asia Ltd";
    season = #Summer;
    eventType = #EDM;
    weekends = "3 weekends per city";
    ticketPriceMin = 3000;
    ticketPriceMax = 5000;
    estimatedRevenueMin = "£9,000,000";
    estimatedRevenueMax = "£15,000,000 per city";
    specialNotes = null;
    status = #ComingSoon;
    imageUrl = null;
    description = null;
    lineup = null;
    ageRestriction = "14+";
    ticketUrl = null;
  });

  seedFestival({
    name = "WE ARE ONE Canada – Summer EDM Festival";
    location = "Toronto";
    country = "Canada";
    company = "WE ARE ONE Canada Ltd";
    season = #Summer;
    eventType = #EDM;
    weekends = "3 weekends";
    ticketPriceMin = 3000;
    ticketPriceMax = 5000;
    estimatedRevenueMin = "£9,000,000";
    estimatedRevenueMax = "£15,000,000";
    specialNotes = null;
    status = #ComingSoon;
    imageUrl = null;
    description = null;
    lineup = null;
    ageRestriction = "14+";
    ticketUrl = null;
  });

  // Winter Festivals
  seedFestival({
    name = "WE ARE ONE UK Winter – Bolesworth";
    location = "Bolesworth, Cheshire";
    country = "United Kingdom";
    company = "WE ARE ONE Ltd";
    season = #Winter;
    eventType = #EDM;
    weekends = "4 weekends";
    ticketPriceMin = 2500;
    ticketPriceMax = 5000;
    estimatedRevenueMin = "£1,000,000";
    estimatedRevenueMax = "£2,000,000";
    specialNotes = null;
    status = #ComingSoon;
    imageUrl = null;
    description = null;
    lineup = null;
    ageRestriction = "14+";
    ticketUrl = null;
  });

  seedFestival({
    name = "WE ARE ONE France Winter – French Alps";
    location = "French Alps";
    country = "France";
    company = "WE ARE ONE France Ltd";
    season = #Winter;
    eventType = #EDM;
    weekends = "3 weekends";
    ticketPriceMin = 3000;
    ticketPriceMax = 5000;
    estimatedRevenueMin = "£900,000";
    estimatedRevenueMax = "£1,500,000";
    specialNotes = null;
    status = #ComingSoon;
    imageUrl = null;
    description = null;
    lineup = null;
    ageRestriction = "14+";
    ticketUrl = null;
  });

  seedFestival({
    name = "WE ARE ONE Italy Winter – Italian Alps";
    location = "Italian Alps";
    country = "Italy";
    company = "WE ARE ONE Italy Ltd";
    season = #Winter;
    eventType = #EDM;
    weekends = "3 weekends";
    ticketPriceMin = 3000;
    ticketPriceMax = 5000;
    estimatedRevenueMin = "£900,000";
    estimatedRevenueMax = "£1,500,000";
    specialNotes = null;
    status = #ComingSoon;
    imageUrl = null;
    description = null;
    lineup = null;
    ageRestriction = "14+";
    ticketUrl = null;
  });

  seedFestival({
    name = "WE ARE ONE Finland Winter – Lapland";
    location = "Lapland";
    country = "Finland";
    company = "WE ARE ONE Finland Ltd";
    season = #Winter;
    eventType = #EDM;
    weekends = "3 weekends";
    ticketPriceMin = 3000;
    ticketPriceMax = 5000;
    estimatedRevenueMin = "£900,000";
    estimatedRevenueMax = "£1,500,000";
    specialNotes = null;
    status = #ComingSoon;
    imageUrl = null;
    description = null;
    lineup = null;
    ageRestriction = "14+";
    ticketUrl = null;
  });

  seedFestival({
    name = "WE ARE ONE Canada Winter";
    location = "Vancouver";
    country = "Canada";
    company = "WE ARE ONE Canada Winter Ltd";
    season = #Winter;
    eventType = #EDM;
    weekends = "3 weekends";
    ticketPriceMin = 3000;
    ticketPriceMax = 5000;
    estimatedRevenueMin = "£900,000";
    estimatedRevenueMax = "£1,500,000";
    specialNotes = null;
    status = #ComingSoon;
    imageUrl = null;
    description = null;
    lineup = null;
    ageRestriction = "14+";
    ticketUrl = null;
  });

  seedFestival({
    name = "WE ARE ONE Russia Winter – Moscow/Siberia";
    location = "Moscow / Siberia";
    country = "Russia";
    company = "WE ARE ONE Russia Ltd";
    season = #Winter;
    eventType = #EDM;
    weekends = "3 weekends";
    ticketPriceMin = 3000;
    ticketPriceMax = 5000;
    estimatedRevenueMin = "£900,000";
    estimatedRevenueMax = "£1,500,000";
    specialNotes = null;
    status = #ComingSoon;
    imageUrl = null;
    description = null;
    lineup = null;
    ageRestriction = "14+";
    ticketUrl = null;
  });

  // Additional Summer / International Festivals (to reach 24 total)
  seedFestival({
    name = "WE ARE ONE Australia – Sydney";
    location = "Sydney";
    country = "Australia";
    company = "WE ARE ONE Australia Ltd";
    season = #Summer;
    eventType = #EDM;
    weekends = "3 weekends";
    ticketPriceMin = 3500;
    ticketPriceMax = 5500;
    estimatedRevenueMin = "£10,500,000";
    estimatedRevenueMax = "£16,500,000";
    specialNotes = null;
    status = #ComingSoon;
    imageUrl = null;
    description = null;
    lineup = null;
    ageRestriction = "14+";
    ticketUrl = null;
  });

  seedFestival({
    name = "WE ARE ONE South Africa – Cape Town";
    location = "Cape Town";
    country = "South Africa";
    company = "WE ARE ONE South Africa Ltd";
    season = #Summer;
    eventType = #EDM;
    weekends = "3 weekends";
    ticketPriceMin = 2500;
    ticketPriceMax = 4500;
    estimatedRevenueMin = "£7,500,000";
    estimatedRevenueMax = "£13,500,000";
    specialNotes = null;
    status = #ComingSoon;
    imageUrl = null;
    description = null;
    lineup = null;
    ageRestriction = "14+";
    ticketUrl = null;
  });

  seedFestival({
    name = "WE ARE ONE USA – Miami";
    location = "Miami, Florida";
    country = "United States";
    company = "WE ARE ONE USA Ltd";
    season = #Summer;
    eventType = #EDM;
    weekends = "3 weekends";
    ticketPriceMin = 4500;
    ticketPriceMax = 7000;
    estimatedRevenueMin = "£13,500,000";
    estimatedRevenueMax = "£21,000,000";
    specialNotes = null;
    status = #ComingSoon;
    imageUrl = null;
    description = null;
    lineup = null;
    ageRestriction = "14+";
    ticketUrl = null;
  });

  seedFestival({
    name = "WE ARE ONE Mexico – Cancun";
    location = "Cancun";
    country = "Mexico";
    company = "WE ARE ONE Mexico Ltd";
    season = #Summer;
    eventType = #EDM;
    weekends = "3 weekends";
    ticketPriceMin = 3000;
    ticketPriceMax = 5000;
    estimatedRevenueMin = "£9,000,000";
    estimatedRevenueMax = "£15,000,000";
    specialNotes = null;
    status = #ComingSoon;
    imageUrl = null;
    description = null;
    lineup = null;
    ageRestriction = "14+";
    ticketUrl = null;
  });

  seedFestival({
    name = "WE ARE ONE Colombia – Bogotá";
    location = "Bogotá";
    country = "Colombia";
    company = "WE ARE ONE Colombia Ltd";
    season = #Summer;
    eventType = #EDM;
    weekends = "3 weekends";
    ticketPriceMin = 2500;
    ticketPriceMax = 4000;
    estimatedRevenueMin = "£7,500,000";
    estimatedRevenueMax = "£12,000,000";
    specialNotes = null;
    status = #ComingSoon;
    imageUrl = null;
    description = null;
    lineup = null;
    ageRestriction = "14+";
    ticketUrl = null;
  });

  seedFestival({
    name = "WE ARE ONE Japan – Tokyo";
    location = "Tokyo";
    country = "Japan";
    company = "WE ARE ONE Japan Ltd";
    season = #Summer;
    eventType = #Family;
    weekends = "3 weekends";
    ticketPriceMin = 3500;
    ticketPriceMax = 5500;
    estimatedRevenueMin = "£10,500,000";
    estimatedRevenueMax = "£16,500,000";
    specialNotes = null;
    status = #ComingSoon;
    imageUrl = null;
    description = null;
    lineup = null;
    ageRestriction = "All Ages";
    ticketUrl = null;
  });

  seedFestival({
    name = "WE ARE ONE UAE – Dubai";
    location = "Dubai";
    country = "United Arab Emirates";
    company = "WE ARE ONE UAE Ltd";
    season = #Winter;
    eventType = #EDM;
    weekends = "3 weekends";
    ticketPriceMin = 5000;
    ticketPriceMax = 8000;
    estimatedRevenueMin = "£15,000,000";
    estimatedRevenueMax = "£24,000,000";
    specialNotes = null;
    status = #ComingSoon;
    imageUrl = null;
    description = null;
    lineup = null;
    ageRestriction = "14+";
    ticketUrl = null;
  });

  seedFestival({
    name = "WE ARE ONE India – Goa";
    location = "Goa";
    country = "India";
    company = "WE ARE ONE India Ltd";
    season = #Winter;
    eventType = #EDM;
    weekends = "3 weekends";
    ticketPriceMin = 2000;
    ticketPriceMax = 3500;
    estimatedRevenueMin = "£6,000,000";
    estimatedRevenueMax = "£10,500,000";
    specialNotes = null;
    status = #ComingSoon;
    imageUrl = null;
    description = null;
    lineup = null;
    ageRestriction = "14+";
    ticketUrl = null;
  });

  seedFestival({
    name = "WE ARE ONE Argentina – Buenos Aires";
    location = "Buenos Aires";
    country = "Argentina";
    company = "WE ARE ONE Argentina Ltd";
    season = #Summer;
    eventType = #EDM;
    weekends = "3 weekends";
    ticketPriceMin = 2500;
    ticketPriceMax = 4500;
    estimatedRevenueMin = "£7,500,000";
    estimatedRevenueMax = "£13,500,000";
    specialNotes = null;
    status = #ComingSoon;
    imageUrl = null;
    description = null;
    lineup = null;
    ageRestriction = "14+";
    ticketUrl = null;
  });

  seedFestival({
    name = "WE ARE ONE Greece – Mykonos";
    location = "Mykonos";
    country = "Greece";
    company = "WE ARE ONE Greece Ltd";
    season = #Summer;
    eventType = #ClubHotel;
    weekends = "Summer season";
    ticketPriceMin = 5000;
    ticketPriceMax = 7500;
    estimatedRevenueMin = "£12,000+ per night";
    estimatedRevenueMax = "£12,000+ per night";
    specialNotes = ?"Per-night pricing. Beachfront venue.";
    status = #ComingSoon;
    imageUrl = null;
    description = null;
    lineup = null;
    ageRestriction = "18+";
    ticketUrl = null;
  });

  seedFestival({
    name = "WE ARE ONE Germany – Berlin";
    location = "Berlin";
    country = "Germany";
    company = "WE ARE ONE Germany Ltd";
    season = #Summer;
    eventType = #EDM;
    weekends = "3 weekends";
    ticketPriceMin = 4000;
    ticketPriceMax = 6000;
    estimatedRevenueMin = "£12,000,000";
    estimatedRevenueMax = "£18,000,000";
    specialNotes = null;
    status = #ComingSoon;
    imageUrl = null;
    description = null;
    lineup = null;
    ageRestriction = "14+";
    ticketUrl = null;
  });

  seedFestival({
    name = "WE ARE ONE Spain – Barcelona";
    location = "Barcelona";
    country = "Spain";
    company = "WE ARE ONE Spain Ltd";
    season = #Summer;
    eventType = #EDM;
    weekends = "3 weekends";
    ticketPriceMin = 4000;
    ticketPriceMax = 6500;
    estimatedRevenueMin = "£12,000,000";
    estimatedRevenueMax = "£19,500,000";
    specialNotes = null;
    status = #ComingSoon;
    imageUrl = null;
    description = null;
    lineup = null;
    ageRestriction = "14+";
    ticketUrl = null;
  });

  // ── Seed default packages ────────────────────────────────────────────────────

  seedPackage({
    name = "Weekend 1 Pass";
    description = "Single weekend access pass for Weekend 1";
    priceGBP = 35;
    includes = ["Weekend 1 access", "General admission"];
    packageType = #Weekend1;
    festivalId = null;
  });

  seedPackage({
    name = "Weekend 2 Pass";
    description = "Single weekend access pass for Weekend 2";
    priceGBP = 35;
    includes = ["Weekend 2 access", "General admission"];
    packageType = #Weekend2;
    festivalId = null;
  });

  seedPackage({
    name = "Full Weekend Pass";
    description = "Access to both weekends of the festival";
    priceGBP = 60;
    includes = ["Both weekends access", "General admission"];
    packageType = #FullWeekend;
    festivalId = null;
  });

  seedPackage({
    name = "VIP Pass";
    description = "Full VIP experience for both weekends";
    priceGBP = 150;
    includes = ["Full weekend VIP access", "VIP lounge", "Meet & greet", "Exclusive merch"];
    packageType = #VIP;
    festivalId = null;
  });

  seedPackage({
    name = "Flight + Festival Package";
    description = "Return flights and full weekend festival access";
    priceGBP = 299;
    includes = ["Return flights", "Full weekend pass", "Airport transfer"];
    packageType = #FlightPackage;
    festivalId = null;
  });

  seedPackage({
    name = "Hotel + Festival Package";
    description = "3 nights accommodation with festival access";
    priceGBP = 199;
    includes = ["3 nights accommodation", "Full weekend pass", "Shuttle service"];
    packageType = #Accommodation;
    festivalId = null;
  });

  }; // end seeding guard

  // ── Mixin composition ────────────────────────────────────────────────────────

  include FestivalApi(festivals, packages, sessions);
  include NewsLineupApi(newsArticles, lineupEntries);
  include DonationsSponsorsApi(donationGoals, sponsors);
  include EventsApi(categories, raveEvents, nightclubEvents, siteEvents, raveSets, nightclubSets);
};
