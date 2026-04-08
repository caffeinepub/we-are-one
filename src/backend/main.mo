import Types "types/festival";
import FestivalApi "mixins/festival-api";
import FestivalLib "lib/festival";
import Migration "migration";
import List "mo:core/List";
import Map "mo:core/Map";

(with migration = Migration.run)
actor {
  let festivals = List.empty<Types.Festival>();
  let packages = List.empty<Types.Package>();
  let sessions = Map.empty<Text, Types.AdminSession>();

  // ── Seed festivals ───────────────────────────────────────────────────────────

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

  // ── Mixin composition ────────────────────────────────────────────────────────

  include FestivalApi(festivals, packages, sessions);
};
