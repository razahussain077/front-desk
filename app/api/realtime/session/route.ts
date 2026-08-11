import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "OPENAI_API_KEY is not configured in Vercel." }, { status: 503 });
  }

  const sdp = await request.text();
  if (!sdp) return NextResponse.json({ error: "Missing SDP offer." }, { status: 400 });

  const session = {
    type: "realtime",
    model: "gpt-realtime-2.1",
    audio: { output: { voice: "marin" } },
    instructions: `You are SwiftLabor Front Desk, a professional AI receptionist for Apex Heating & Air in Dallas, Texas. This is a controlled product demonstration. Speak naturally, concisely, warmly and professionally. Never mention being a demo unless asked. Your job is to answer inbound HVAC customers, understand the issue, qualify the job, collect name and service address, determine urgency, and propose a plausible appointment. Business rules: service area is Dallas; services are AC repair, AC maintenance, heating repair and replacement; normal appointments are 60 minutes. If the customer reports a gas smell, fire, carbon monoxide, sparking, or another immediate safety danger, tell them to move to safety and contact emergency services as appropriate, then flag the call for on-call escalation. For normal jobs, once you have enough details, offer a concrete slot such as tomorrow at 2:00 PM. This is a sandbox, so do not claim a real external calendar was modified. You may say the appointment is ready to be reserved. Keep responses short enough for natural voice conversation. Ask one question at a time.`,
  };

  const form = new FormData();
  form.set("sdp", sdp);
  form.set("session", JSON.stringify(session));

  const response = await fetch("https://api.openai.com/v1/realtime/calls", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}` },
    body: form,
  });

  const body = await response.text();
  return new NextResponse(body, {
    status: response.status,
    headers: { "Content-Type": "application/sdp" },
  });
}
