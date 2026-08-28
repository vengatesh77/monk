// Shared TypeScript interfaces

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  peopleCount: number;
  message?: string;
}

export interface NewsletterFormData {
  name?: string;
  contactNumber?: string;
  email: string;
}

export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface ContactRecord {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface BookingRecord {
  _id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  peopleCount: number;
  message?: string;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
}

export interface NewsletterRecord {
  _id: string;
  name?: string;
  contactNumber?: string;
  email: string;
  createdAt: string;
}

export interface ApiResponse<T = undefined> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: "podcast" | "video" | "photography" | "branding";
  image: string;
  description: string;
  link?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  image: string;
}

export const SERVICE_OPTIONS = [
  "Podcast Recording",
  "Podcast Video",
  "Video Production",
  "Photography",
  "Branding",
  "Other",
] as const;

export type ServiceOption = (typeof SERVICE_OPTIONS)[number];
