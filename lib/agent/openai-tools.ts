export const realtimeTools = [
  {
    type: "function",
    name: "check_availability",
    description: "Check the business calendar for real available appointment slots. Never invent availability.",
    parameters: {
      type: "object",
      properties: {
        start: { type: "string", description: "ISO 8601 start of the requested search window." },
        end: { type: "string", description: "ISO 8601 end of the requested search window." },
      },
      required: ["start", "end"],
    },
  },
  {
    type: "function",
    name: "book_appointment",
    description: "Book an appointment only after the customer confirms a real available slot.",
    parameters: {
      type: "object",
      properties: {
        customerName: { type: "string" },
        phone: { type: "string" },
        address: { type: "string" },
        start: { type: "string", description: "Confirmed ISO 8601 appointment start." },
        end: { type: "string", description: "Confirmed ISO 8601 appointment end." },
        serviceType: { type: "string" },
        issueSummary: { type: "string" },
      },
      required: ["customerName", "phone", "address", "start", "end", "serviceType", "issueSummary"],
    },
  },
  {
    type: "function",
    name: "upsert_customer",
    description: "Create or update the caller's customer record.",
    parameters: {
      type: "object",
      properties: {
        name: { type: "string" },
        phone: { type: "string" },
        address: { type: "string" },
      },
      required: ["name", "phone"],
    },
  },
  {
    type: "function",
    name: "create_lead",
    description: "Record a qualified HVAC lead and its current status.",
    parameters: {
      type: "object",
      properties: {
        customerId: { type: "string" },
        serviceType: { type: "string" },
        issueSummary: { type: "string" },
        urgency: { type: "string", enum: ["normal", "urgent", "emergency"] },
        status: { type: "string", enum: ["new", "qualified", "booked", "follow_up", "closed"] },
      },
      required: ["customerId", "serviceType", "issueSummary", "urgency", "status"],
    },
  },
  {
    type: "function",
    name: "send_confirmation",
    description: "Send an appointment confirmation only after a successful booking.",
    parameters: {
      type: "object",
      properties: {
        customerId: { type: "string" },
        appointmentId: { type: "string" },
        start: { type: "string" },
        end: { type: "string" },
      },
      required: ["customerId", "appointmentId", "start", "end"],
    },
  },
] as const;
