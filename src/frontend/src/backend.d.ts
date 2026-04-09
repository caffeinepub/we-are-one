import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export type SiteEventId = bigint;
export interface SiteEvent {
    id: bigint;
    categoryId?: bigint;
    date: string;
    name: string;
    createdAt: bigint;
    description: string;
    imageUrl: string;
    festivalId?: bigint;
    location: string;
}
export type RaveSetId = bigint;
export interface Sponsor {
    id: bigint;
    websiteUrl: string;
    festivalIds: Array<bigint>;
    name: string;
    createdAt: bigint;
    tier: string;
    logoUrl: string;
}
export interface PackageInput {
    packageType: PackageType;
    name: string;
    description: string;
    includes: Array<string>;
    festivalId?: FestivalId;
    priceGBP: bigint;
}
export interface NightclubSet {
    id: bigint;
    startTime: string;
    endTime: string;
    nightclubEventId: bigint;
    createdAt: bigint;
    nightLabel: string;
    stage: string;
    artistName: string;
    youtubeUrl?: string;
}
export interface NightclubEventInput {
    categoryId?: bigint;
    date: string;
    name: string;
    ticketUrl?: string;
    description: string;
    isStandalone: boolean;
    imageUrl: string;
    festivalId?: bigint;
    location: string;
}
export type LineupId = bigint;
export interface EventCategory {
    id: bigint;
    name: string;
    createdAt: bigint;
    description: string;
}
export interface CategoryInput {
    name: string;
    description: string;
}
export interface DonationGoal {
    id: bigint;
    isGlobal: boolean;
    donationUrl: string;
    title: string;
    createdAt: bigint;
    description: string;
    festivalId?: bigint;
    targetAmount: bigint;
    currentAmount: bigint;
}
export interface RaveEvent {
    id: bigint;
    categoryId?: bigint;
    date: string;
    name: string;
    createdAt: bigint;
    ticketUrl?: string;
    description: string;
    isStandalone: boolean;
    imageUrl: string;
    festivalId?: bigint;
    location: string;
    eventType: string;
}
export interface Analytics {
    festivalId: FestivalId;
    estimatedRevenue: string;
    estimatedAttendance: bigint;
    ticketsSold: bigint;
}
export type EventCategoryId = bigint;
export type PackageId = bigint;
export type RaveEventId = bigint;
export interface LineupInput {
    day?: string;
    weekend?: string;
    stage: string;
    festivalId: FestivalId;
    artistName: string;
    timeSlot: string;
}
export interface NewsInput {
    title: string;
    content: string;
    publishDate: Timestamp;
    imageUrl: string;
}
export type SponsorId = bigint;
export interface RaveSetInput {
    startTime: string;
    endTime: string;
    nightLabel: string;
    stage: string;
    artistName: string;
    youtubeUrl?: string;
    raveEventId: bigint;
}
export type NewsId = bigint;
export type DonationGoalId = bigint;
export interface NightclubSetInput {
    startTime: string;
    endTime: string;
    nightclubEventId: bigint;
    nightLabel: string;
    stage: string;
    artistName: string;
    youtubeUrl?: string;
}
export type NightclubEventId = bigint;
export interface Festival {
    id: FestivalId;
    status: FestivalStatus;
    country: string;
    ticketPriceMax: bigint;
    ticketPriceMin: bigint;
    weekends: string;
    name: string;
    ticketUrl?: string;
    description?: string;
    season: Season;
    ageRestriction: string;
    company: string;
    imageUrl?: string;
    estimatedRevenueMax: string;
    estimatedRevenueMin: string;
    location: string;
    lineup?: string;
    specialNotes?: string;
    eventType: EventType;
}
export interface Package {
    id: PackageId;
    packageType: PackageType;
    name: string;
    description: string;
    includes: Array<string>;
    festivalId?: FestivalId;
    priceGBP: bigint;
}
export type NightclubSetId = bigint;
export interface NightclubEvent {
    id: bigint;
    categoryId?: bigint;
    date: string;
    name: string;
    createdAt: bigint;
    ticketUrl?: string;
    description: string;
    isStandalone: boolean;
    imageUrl: string;
    festivalId?: bigint;
    location: string;
}
export interface LineupEntry {
    id: LineupId;
    day?: string;
    weekend?: string;
    stage: string;
    festivalId: FestivalId;
    artistName: string;
    timeSlot: string;
}
export interface RaveSet {
    id: bigint;
    startTime: string;
    endTime: string;
    createdAt: bigint;
    nightLabel: string;
    stage: string;
    artistName: string;
    youtubeUrl?: string;
    raveEventId: bigint;
}
export interface FestivalInput {
    status: FestivalStatus;
    country: string;
    ticketPriceMax: bigint;
    ticketPriceMin: bigint;
    weekends: string;
    name: string;
    ticketUrl?: string;
    description?: string;
    season: Season;
    ageRestriction: string;
    company: string;
    imageUrl?: string;
    estimatedRevenueMax: string;
    estimatedRevenueMin: string;
    location: string;
    lineup?: string;
    specialNotes?: string;
    eventType: EventType;
}
export interface SponsorInput {
    websiteUrl: string;
    festivalIds: Array<bigint>;
    name: string;
    tier: string;
    logoUrl: string;
}
export interface DonationGoalInput {
    isGlobal: boolean;
    donationUrl: string;
    title: string;
    description: string;
    festivalId?: bigint;
    targetAmount: bigint;
    currentAmount: bigint;
}
export interface NewsArticle {
    id: NewsId;
    title: string;
    content: string;
    publishDate: Timestamp;
    createdAt: Timestamp;
    imageUrl: string;
}
export type FestivalId = bigint;
export interface RaveEventInput {
    categoryId?: bigint;
    date: string;
    name: string;
    ticketUrl?: string;
    description: string;
    isStandalone: boolean;
    imageUrl: string;
    festivalId?: bigint;
    location: string;
    eventType: string;
}
export interface SiteEventInput {
    categoryId?: bigint;
    date: string;
    name: string;
    description: string;
    imageUrl: string;
    festivalId?: bigint;
    location: string;
}
export enum EventType {
    EDM = "EDM",
    Family = "Family",
    Rave = "Rave",
    ClubHotel = "ClubHotel"
}
export enum FestivalStatus {
    Active = "Active",
    ComingSoon = "ComingSoon"
}
export enum PackageType {
    VIP = "VIP",
    Weekend1 = "Weekend1",
    Weekend2 = "Weekend2",
    FullWeekend = "FullWeekend",
    Accommodation = "Accommodation",
    Transfer = "Transfer",
    FlightPackage = "FlightPackage"
}
export enum Season {
    Winter = "Winter",
    Summer = "Summer"
}
export interface backendInterface {
    addCategory(input: CategoryInput): Promise<EventCategoryId>;
    addDonationGoal(input: DonationGoalInput): Promise<DonationGoalId>;
    addFestival(input: FestivalInput): Promise<FestivalId>;
    addLineupEntry(input: LineupInput): Promise<LineupId>;
    addNews(input: NewsInput): Promise<NewsId>;
    addNightclubEvent(input: NightclubEventInput): Promise<NightclubEventId>;
    addNightclubSet(input: NightclubSetInput): Promise<NightclubSetId>;
    addPackage(input: PackageInput): Promise<PackageId>;
    addRaveEvent(input: RaveEventInput): Promise<RaveEventId>;
    addRaveSet(input: RaveSetInput): Promise<RaveSetId>;
    addSiteEvent(input: SiteEventInput): Promise<SiteEventId>;
    addSponsor(input: SponsorInput): Promise<SponsorId>;
    adminLogin(password: string): Promise<string | null>;
    deleteCategory(id: EventCategoryId): Promise<boolean>;
    deleteDonationGoal(id: DonationGoalId): Promise<boolean>;
    deleteFestival(id: FestivalId): Promise<boolean>;
    deleteLineupEntry(id: LineupId): Promise<boolean>;
    deleteNews(id: NewsId): Promise<boolean>;
    deleteNightclubEvent(id: NightclubEventId): Promise<boolean>;
    deleteNightclubSet(id: NightclubSetId): Promise<boolean>;
    deletePackage(id: PackageId): Promise<boolean>;
    deleteRaveEvent(id: RaveEventId): Promise<boolean>;
    deleteRaveSet(id: RaveSetId): Promise<boolean>;
    deleteSiteEvent(id: SiteEventId): Promise<boolean>;
    deleteSponsor(id: SponsorId): Promise<boolean>;
    getAnalytics(): Promise<Array<Analytics>>;
    getCategories(): Promise<Array<EventCategory>>;
    getCategory(id: EventCategoryId): Promise<EventCategory | null>;
    getDonationGoal(id: DonationGoalId): Promise<DonationGoal | null>;
    getDonationGoals(): Promise<Array<DonationGoal>>;
    getFestival(id: FestivalId): Promise<Festival | null>;
    getFestivals(): Promise<Array<Festival>>;
    getLineup(festivalId: FestivalId): Promise<Array<LineupEntry>>;
    getNews(): Promise<Array<NewsArticle>>;
    getNewsArticle(id: NewsId): Promise<NewsArticle | null>;
    getNightclubEvent(id: NightclubEventId): Promise<NightclubEvent | null>;
    getNightclubEvents(): Promise<Array<NightclubEvent>>;
    getNightclubSet(id: NightclubSetId): Promise<NightclubSet | null>;
    getNightclubSets(): Promise<Array<NightclubSet>>;
    getNightclubSetsByEvent(nightclubEventId: bigint): Promise<Array<NightclubSet>>;
    getPackages(): Promise<Array<Package>>;
    getRaveEvent(id: RaveEventId): Promise<RaveEvent | null>;
    getRaveEvents(): Promise<Array<RaveEvent>>;
    getRaveSet(id: RaveSetId): Promise<RaveSet | null>;
    getRaveSets(): Promise<Array<RaveSet>>;
    getRaveSetsByEvent(raveEventId: bigint): Promise<Array<RaveSet>>;
    getSiteEvent(id: SiteEventId): Promise<SiteEvent | null>;
    getSiteEvents(): Promise<Array<SiteEvent>>;
    getSponsor(id: SponsorId): Promise<Sponsor | null>;
    getSponsors(): Promise<Array<Sponsor>>;
    getSponsorsByFestival(festivalId: FestivalId): Promise<Array<Sponsor>>;
    setFestivalImage(id: FestivalId, imageUrl: string): Promise<boolean>;
    setFestivalTicketUrl(id: FestivalId, url: string): Promise<boolean>;
    toggleFestivalStatus(id: FestivalId): Promise<boolean>;
    updateCategory(id: EventCategoryId, input: CategoryInput): Promise<boolean>;
    updateDonationGoal(id: DonationGoalId, input: DonationGoalInput): Promise<boolean>;
    updateFestival(id: FestivalId, input: FestivalInput): Promise<boolean>;
    updateLineupEntry(id: LineupId, input: LineupInput): Promise<boolean>;
    updateNews(id: NewsId, input: NewsInput): Promise<boolean>;
    updateNightclubEvent(id: NightclubEventId, input: NightclubEventInput): Promise<boolean>;
    updateNightclubSet(id: NightclubSetId, input: NightclubSetInput): Promise<boolean>;
    updatePackage(id: PackageId, input: PackageInput): Promise<boolean>;
    updateRaveEvent(id: RaveEventId, input: RaveEventInput): Promise<boolean>;
    updateRaveSet(id: RaveSetId, input: RaveSetInput): Promise<boolean>;
    updateSiteEvent(id: SiteEventId, input: SiteEventInput): Promise<boolean>;
    updateSponsor(id: SponsorId, input: SponsorInput): Promise<boolean>;
}
