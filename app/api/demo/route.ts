import { NextResponse } from "next/server";

const serviceMap: Record<string, string> = {
  "not cooling": "AC repair",
  "not turning on": "AC repair",
  "making noise": "AC repair",
  maintenance: "AC maintenance",
  "air conditioner": "AC repair",
  ac: "AC repair",
};

function inferService(message: string) {
  const lower = message.toLowerCase();
  for (const [key, value] of Object.entries(serviceMap)) if (lower.includes(key)) return value;
  return "HVAC service";
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const message = String(body.message || "").trim();
  if (!message) return NextResponse.json({ error: "Message is required." }, { status: 400 });

  const lower = message.toLowerCase();
  const service = inferService(message);
  const emergency = /(gas smell|fire|smoke|burning smell|carbon monoxide|danger)/i.test(message);

  let reply = "I can help with that. What's the best name, phone number, and service address for the appointment?";
  if (emergency) {
    reply = "That may be an emergency. Please move to a safe location and contact the appropriate emergency service if there is immediate danger. I can also flag this for the HVAC team.";
  } else if (/(tomorrow|today|morning|afternoon|evening|appointment|schedule)/i.test(lower)) {
    reply = `Got it — I'll help schedule ${service}. For this demo, the next step is checking the company's live availability before offering a confirmed time.`;
  } else if (/(price|cost|how much)/i.test(lower)) {
    reply = "Pricing depends on the issue and service required. I can collect the job details first and arrange an appointment with the HVAC team.";
  }

  return NextResponse.json({
    reply,
    extracted: { serviceType: service, urgency: emergency ? "emergency" : "normal" },
  });
}
