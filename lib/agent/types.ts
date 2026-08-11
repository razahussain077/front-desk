export type ServiceType = "ac_repair" | "ac_installation" | "maintenance" | "heating_repair" | "other";
export type LeadStatus = "new" | "qualified" | "booked" | "follow_up" | "closed";
export type Urgency = "normal" | "urgent" | "emergency";

export interface BusinessProfile {
  id: string;
  name: string;
  timezone: string;
  serviceArea: string;
  services: string[];
  businessHours: string;
  emergencyPolicy: string;
}

export interface Customer {
  id?: string;
  name: string;
  phone: string;
  address?: string;
}

export interface Lead {
  id?: string;
  customer: Customer;
  serviceType: ServiceType;
  issueSummary: string;
  urgency: Urgency;
  status: LeadStatus;
}

export interface AppointmentSlot {
  start: string;
  end: string;
  available: boolean;
}

export interface BookingResult {
  success: boolean;
  appointmentId?: string;
  start?: string;
  end?: string;
  reason?: string;
}
