import { NextResponse } from "next/server";

// Supports the exact lowercase Vercel variable name the user configured,
// while retaining compatibility with the canonical uppercase names.
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.supabase_url;
const secretKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY || process.env.supabase_service_role_key || process.env.supabase_service_role_key;

function configError() {
  return NextResponse.json({ error: "Supabase server configuration is missing. Expected SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (lowercase names are also supported)." }, { status: 500 });
}

function headers() {
  return { apikey: secretKey!, Authorization: `Bearer ${secretKey!}`, "Content-Type": "application/json" };
}

export async function GET() {
  if (!supabaseUrl || !secretKey) return configError();
  const response = await fetch(`${supabaseUrl}/rest/v1/prospects?select=id,company_name,contact_name,title,email,linkedin_url,phone,location,country,employees,industry,icp_tier,status,notes&order=company_name.asc,created_at.asc`, { headers: headers(), cache: "no-store" });
  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    return NextResponse.json({ error: `Unable to load CRM prospects (${response.status}).`, detail: detail.slice(0, 300) }, { status: 502 });
  }
  return NextResponse.json(await response.json());
}

export async function PATCH(request: Request) {
  if (!supabaseUrl || !secretKey) return configError();
  const body = await request.json();
  if (!body?.id || !body?.status) return NextResponse.json({ error: "id and status are required." }, { status: 400 });
  const response = await fetch(`${supabaseUrl}/rest/v1/prospects?id=eq.${encodeURIComponent(body.id)}`, { method: "PATCH", headers: { ...headers(), Prefer: "return=representation" }, body: JSON.stringify({ status: body.status, updated_at: new Date().toISOString() }) });
  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    return NextResponse.json({ error: `Unable to update prospect status (${response.status}).`, detail: detail.slice(0, 300) }, { status: 502 });
  }
  return NextResponse.json(await response.json());
}