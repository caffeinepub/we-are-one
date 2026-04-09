// Re-export all types and enums from the generated backend bindings
export type {
  Analytics,
  CategoryInput,
  DonationGoal,
  DonationGoalInput,
  EventCategory,
  Festival,
  FestivalId,
  FestivalInput,
  LineupEntry,
  LineupId,
  LineupInput,
  NewsArticle,
  NewsId,
  NewsInput,
  NightclubEvent,
  NightclubEventInput,
  NightclubSet,
  NightclubSetId,
  NightclubSetInput,
  Package,
  PackageId,
  PackageInput,
  RaveEvent,
  RaveEventInput,
  RaveSet,
  RaveSetId,
  RaveSetInput,
  SiteEvent,
  SiteEventInput,
  Sponsor,
  SponsorInput,
} from "../backend";
export {
  EventType,
  FestivalStatus,
  PackageType,
  Season,
} from "../backend";

import { EventType, FestivalStatus, PackageType, Season } from "../backend";
import type { Analytics, Festival, Package } from "../backend";

export interface AdminSession {
  token: string;
  expiresAt: number;
}

// Helper functions for enum types
export function isSummer(season: Season): boolean {
  return season === Season.Summer;
}

export function isEDM(eventType: EventType): boolean {
  return eventType === EventType.EDM;
}

export function isFamily(eventType: EventType): boolean {
  return eventType === EventType.Family;
}

export function isComingSoon(status: FestivalStatus): boolean {
  return status === FestivalStatus.ComingSoon;
}

export function getSeasonLabel(season: Season): string {
  return season === Season.Summer ? "Summer" : "Winter";
}

export function getEventTypeLabel(eventType: EventType): string {
  if (eventType === EventType.EDM) return "EDM";
  if (eventType === EventType.Family) return "Family";
  if (eventType === EventType.ClubHotel) return "Club Hotel";
  return "Rave";
}

export function getPackageTypeLabel(packageType: PackageType): string {
  if (packageType === PackageType.Weekend1) return "Weekend 1";
  if (packageType === PackageType.Weekend2) return "Weekend 2";
  if (packageType === PackageType.FullWeekend) return "Full Weekend";
  if (packageType === PackageType.VIP) return "VIP";
  if (packageType === PackageType.FlightPackage) return "Flight Package";
  if (packageType === PackageType.Transfer) return "Transfer";
  return "Accommodation";
}

// Static festival data (used as placeholders while backend loads)
export const STATIC_FESTIVALS: Festival[] = [
  {
    id: 1n,
    name: "WE ARE ONE Summer Festival UK",
    location: "London",
    country: "United Kingdom",
    company: "WE ARE ONE Ltd",
    season: Season.Summer,
    eventType: EventType.EDM,
    weekends: "July 12-13 & July 19-20, 2025",
    ticketPriceMin: 89n,
    ticketPriceMax: 350n,
    estimatedRevenueMin: "£500K",
    estimatedRevenueMax: "£1.2M",
    specialNotes: undefined,
    status: FestivalStatus.ComingSoon,
    imageUrl: undefined,
    description:
      "The ultimate UK summer EDM experience. Two weekends of world-class music, breathtaking production, and unforgettable memories.",
    lineup: "Martin Garrix, Armin van Buuren, David Guetta, Tiësto",
    ageRestriction: "14+",
  },
  {
    id: 2n,
    name: "WE ARE ONE Winter Festival UK",
    location: "Manchester",
    country: "United Kingdom",
    company: "WE ARE ONE Ltd",
    season: Season.Winter,
    eventType: EventType.EDM,
    weekends: "December 6-7 & December 13-14, 2025",
    ticketPriceMin: 79n,
    ticketPriceMax: 280n,
    estimatedRevenueMin: "£400K",
    estimatedRevenueMax: "£900K",
    specialNotes: undefined,
    status: FestivalStatus.ComingSoon,
    imageUrl: undefined,
    description:
      "Experience the magic of winter EDM in the heart of Manchester. Neon lights, sub-zero beats, and world-class DJs.",
    lineup: "Hardwell, Dimitri Vegas & Like Mike, W&W",
    ageRestriction: "14+",
  },
  {
    id: 3n,
    name: "WE ARE ONE International - Ibiza",
    location: "Ibiza",
    country: "Spain",
    company: "WE ARE ONE International",
    season: Season.Summer,
    eventType: EventType.EDM,
    weekends: "August 2-3 & August 9-10, 2025",
    ticketPriceMin: 120n,
    ticketPriceMax: 500n,
    estimatedRevenueMin: "£800K",
    estimatedRevenueMax: "£2M",
    specialNotes: "Venue closes at 06:00. Last entry 02:00.",
    status: FestivalStatus.ComingSoon,
    imageUrl: undefined,
    description:
      "The world's most iconic island. Infinite beats, crystal waters, and legendary sunsets — only at WE ARE ONE Ibiza.",
    lineup: "Solomun, DJ Snake, Fisher, Tale Of Us",
    ageRestriction: "14+",
  },
  {
    id: 4n,
    name: "WE ARE ONE Family Festival UK",
    location: "Birmingham",
    country: "United Kingdom",
    company: "WE ARE ONE Ltd",
    season: Season.Summer,
    eventType: EventType.Family,
    weekends: "June 21-22, 2025",
    ticketPriceMin: 45n,
    ticketPriceMax: 120n,
    estimatedRevenueMin: "£200K",
    estimatedRevenueMax: "£500K",
    specialNotes: undefined,
    status: FestivalStatus.ComingSoon,
    imageUrl: undefined,
    description:
      "A magical day out for the whole family. Live music, funfair rides, arts & crafts, and family-friendly entertainment.",
    lineup: "Family-friendly live acts & DJs",
    ageRestriction: "All Ages",
  },
  {
    id: 5n,
    name: "WE ARE ONE International - Netherlands",
    location: "Amsterdam",
    country: "Netherlands",
    company: "WE ARE ONE International",
    season: Season.Summer,
    eventType: EventType.Rave,
    weekends: "September 5-7, 2025",
    ticketPriceMin: 110n,
    ticketPriceMax: 450n,
    estimatedRevenueMin: "£700K",
    estimatedRevenueMax: "£1.8M",
    specialNotes: "Event hours: 14:00 – 23:00. No re-entry.",
    status: FestivalStatus.ComingSoon,
    imageUrl: undefined,
    description:
      "Amsterdam's premier festival experience. Three days of relentless techno, trance, and house in iconic outdoor venues.",
    lineup: "Charlotte de Witte, Adam Beyer, Amelie Lens, Reinier Zonneveld",
    ageRestriction: "14+",
  },
  {
    id: 6n,
    name: "WE ARE ONE Winter International - Alps",
    location: "Innsbruck",
    country: "Austria",
    company: "WE ARE ONE International",
    season: Season.Winter,
    eventType: EventType.ClubHotel,
    weekends: "January 17-19 & January 24-26, 2025",
    ticketPriceMin: 250n,
    ticketPriceMax: 1200n,
    estimatedRevenueMin: "£1.2M",
    estimatedRevenueMax: "£3M",
    specialNotes: "All-inclusive ski & festival package available",
    status: FestivalStatus.ComingSoon,
    imageUrl: undefined,
    description:
      "Dance at altitude. The ultimate ski & music festival fusion — après-ski by day, world-class DJs by night.",
    lineup: "Nicky Romero, Don Diablo, Showtek",
    ageRestriction: "14+",
  },
];

export const STATIC_PACKAGES: Package[] = [
  {
    id: 1n,
    name: "Weekend Pass",
    description: "Access to one full weekend of the festival (Friday–Sunday)",
    priceGBP: 149n,
    includes: [
      "3-day festival access",
      "Wristband & lanyard",
      "Festival map & programme",
    ],
    packageType: PackageType.FullWeekend,
    festivalId: undefined,
  },
  {
    id: 2n,
    name: "Weekend 1 Pass",
    description: "Access to Weekend 1 only — perfect for first-timers",
    priceGBP: 89n,
    includes: ["Weekend 1 access", "Wristband", "Festival guide"],
    packageType: PackageType.Weekend1,
    festivalId: undefined,
  },
  {
    id: 3n,
    name: "Weekend 2 Pass",
    description: "Access to Weekend 2 — often features headliner changes",
    priceGBP: 89n,
    includes: ["Weekend 2 access", "Wristband", "Festival guide"],
    packageType: PackageType.Weekend2,
    festivalId: undefined,
  },
  {
    id: 4n,
    name: "VIP Experience",
    description:
      "Full VIP access with exclusive zones, fast track entry, and premium amenities",
    priceGBP: 350n,
    includes: [
      "Full weekend access",
      "VIP lounge access",
      "Fast track entry",
      "Dedicated bar area",
      "Premium toilets",
      "VIP viewing platform",
      "Welcome drink",
    ],
    packageType: PackageType.VIP,
    festivalId: undefined,
  },
  {
    id: 5n,
    name: "Flight & Festival Bundle",
    description:
      "Return flights from major UK airports plus full weekend festival access",
    priceGBP: 499n,
    includes: [
      "Return flights",
      "Full weekend pass",
      "Airport transfers",
      "Welcome pack",
    ],
    packageType: PackageType.FlightPackage,
    festivalId: undefined,
  },
  {
    id: 6n,
    name: "Festival Transfer",
    description: "Shuttle bus from city centre to festival site and back",
    priceGBP: 35n,
    includes: [
      "Return coach transfer",
      "Dedicated festival drop-off",
      "Night return service",
    ],
    packageType: PackageType.Transfer,
    festivalId: undefined,
  },
  {
    id: 7n,
    name: "Glamping Weekend",
    description:
      "Luxury on-site glamping accommodation for the full festival weekend",
    priceGBP: 280n,
    includes: [
      "Luxury glamping tent",
      "Bed & bedding",
      "Private shower access",
      "Charging locker",
      "Breakfast each morning",
    ],
    packageType: PackageType.Accommodation,
    festivalId: undefined,
  },
];

export const STATIC_ANALYTICS: Analytics[] = STATIC_FESTIVALS.map((f, i) => ({
  festivalId: f.id,
  estimatedAttendance: BigInt(
    [15000, 12000, 20000, 8000, 25000, 10000][i] ?? 10000,
  ),
  estimatedRevenue: f.estimatedRevenueMax,
  ticketsSold: BigInt([3200, 2800, 4500, 1800, 5500, 2100][i] ?? 1000),
}));
