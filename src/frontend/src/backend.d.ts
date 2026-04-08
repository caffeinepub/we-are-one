import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
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
export interface PackageInput {
    packageType: PackageType;
    name: string;
    description: string;
    includes: Array<string>;
    festivalId?: FestivalId;
    priceGBP: bigint;
}
export type PackageId = bigint;
export type FestivalId = bigint;
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
    addPackage(input: PackageInput): Promise<PackageId>;
    adminLogin(password: string): Promise<string | null>;
    deleteFestival(id: FestivalId): Promise<boolean>;
    deletePackage(id: PackageId): Promise<boolean>;
    getAnalytics(): Promise<Array<Analytics>>;
    getFestival(id: FestivalId): Promise<Festival | null>;
    getFestivals(): Promise<Array<Festival>>;
    getPackages(): Promise<Array<Package>>;
    setFestivalImage(id: FestivalId, imageUrl: string): Promise<boolean>;
    setFestivalTicketUrl(id: FestivalId, url: string): Promise<boolean>;
    toggleFestivalStatus(id: FestivalId): Promise<boolean>;
    updateFestival(id: FestivalId, input: FestivalInput): Promise<boolean>;
    updatePackage(id: PackageId, input: PackageInput): Promise<boolean>;
}
