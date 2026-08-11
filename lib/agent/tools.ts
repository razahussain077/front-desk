import type { AppointmentSlot, BookingResult, Customer, Lead } from "./types";

export interface ToolContext {
  organizationId: string;
  callId?: string;
}

/**
 * Provider-independent tool contracts. Real Google Calendar/Supabase/Twilio
 * implementations will be injected behind these functions.
 */
export interface FrontDeskTools {
  checkAvailability(input: {
    start: string;
    end: string;
  }, context: ToolContext): Promise<AppointmentSlot[]>;

  bookAppointment(input: {
    customer: Customer;
    start: string;
    end: string;
    serviceType: string;
    issueSummary: string;
  }, context: ToolContext): Promise<BookingResult>;

  upsertCustomer(customer: Customer, context: ToolContext): Promise<Customer>;
  createLead(lead: Lead, context: ToolContext): Promise<Lead>;
  sendConfirmation(input: { customer: Customer; appointmentId: string; start: string; end: string }, context: ToolContext): Promise<{ success: boolean; reason?: string }>;
}

export const toolNames = [
  "check_availability",
  "book_appointment",
  "upsert_customer",
  "create_lead",
  "send_confirmation",
] as const;
