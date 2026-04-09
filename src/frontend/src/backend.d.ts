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
export type NewsId = bigint;
export interface PackageInput {
    packageType: PackageType;
    name: string;
    description: string;
    includes: Array<string>;
    festivalId?: FestivalId;
    priceGBP: bigint;
}
export type LineupId = bigint;
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
export interface LineupEntry {
    id: LineupId;
    stage: string;
    festivalId: FestivalId;
    artistName: string;
    timeSlot: string;
}
export interface Analytics {
    festivalId: FestivalId;
    estimatedRevenue: string;
    estimatedAttendance: bigint;
    ticketsSold: bigint;
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
export type PackageId = bigint;
export interface NewsArticle {
    id: NewsId;
    title: string;
    content: string;
    publishDate: Timestamp;
    createdAt: Timestamp;
    imageUrl: string;
}
export type FestivalId = bigint;
export interface NewsInput {
    title: string;
    content: string;
    publishDate: Timestamp;
    imageUrl: string;
}
export interface LineupInput {
    stage: string;
    festivalId: FestivalId;
    artistName: string;
    timeSlot: string;
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
    addFestival(input: FestivalInput): Promise<FestivalId>;
    addLineupEntry(input: LineupInput): Promise<LineupId>;
    addNews(input: NewsInput): Promise<NewsId>;
    addPackage(input: PackageInput): Promise<PackageId>;
    adminLogin(password: string): Promise<string | null>;
    deleteFestival(id: FestivalId): Promise<boolean>;
    deleteLineupEntry(id: LineupId): Promise<boolean>;
    deleteNews(id: NewsId): Promise<boolean>;
    deletePackage(id: PackageId): Promise<boolean>;
    getAnalytics(): Promise<Array<Analytics>>;
    getFestival(id: FestivalId): Promise<Festival | null>;
    getFestivals(): Promise<Array<Festival>>;
    getLineup(festivalId: FestivalId): Promise<Array<LineupEntry>>;
    getNews(): Promise<Array<NewsArticle>>;
    getNewsArticle(id: NewsId): Promise<NewsArticle | null>;
    getPackages(): Promise<Array<Package>>;
    setFestivalImage(id: FestivalId, imageUrl: string): Promise<boolean>;
    setFestivalTicketUrl(id: FestivalId, url: string): Promise<boolean>;
    toggleFestivalStatus(id: FestivalId): Promise<boolean>;
    updateFestival(id: FestivalId, input: FestivalInput): Promise<boolean>;
    updateLineupEntry(id: LineupId, input: LineupInput): Promise<boolean>;
    updateNews(id: NewsId, input: NewsInput): Promise<boolean>;
    updatePackage(id: PackageId, input: PackageInput): Promise<boolean>;
}
