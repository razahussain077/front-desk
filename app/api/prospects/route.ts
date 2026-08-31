import { NextResponse } from "next/server";

const supabaseUrl = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

function configError() {
  return NextResponse.json({ error: "Supabase server configuration is missing." }, { status: 500 });
}

export async function GET() {
  if (!supabaseUrl || !serviceKey) return configError();

  const response = await fetch(
    `${supabaseUrl}/rest/v1/prospects?select=id,company_name,contact_name,title,email,linkedin_url,phone,location,country,employees,industry,icp_tier,status,notes&order=created_at.asc`,
    { headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` }, cache: "no-store" }
  );

  if (!response.ok) {
    return NextResponse.json({ error: "Unable to load CRM prospects." }, { status: 502 });
  }

  return NextResponse.json(await response.json());
}

export async function PATCH(request: Request) {
  if (!supabaseUrl || !serviceKey) return configError();

  const body = await request.json();
  if (!body?.id || !body?.status) {
    return NextResponse.json({ error: "id and status are required." }, { status: 400 });
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/prospects?id=eq.${encodeURIComponent(body.id)}`, {
    method: "PATCH",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify({ status: body.status, updated_at: new Date().toISOString() }),
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Unable to update prospect status." }, { status: 502 });
  }

  return NextResponse.json(await response.json());
}
