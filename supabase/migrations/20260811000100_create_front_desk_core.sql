create extension if not exists pgcrypto;

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  timezone text not null default 'America/Chicago',
  phone_number text,
  business_hours jsonb not null default '{}'::jsonb,
  emergency_policy text,
  created_at timestamptz not null default now()
);

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  phone text,
  email text,
  address text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, phone)
);

create table if not exists public.calls (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  customer_id uuid references public.customers(id) on delete set null,
  twilio_call_sid text,
  status text not null default 'in_progress',
  duration_seconds integer,
  summary text,
  transcript text,
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  customer_id uuid references public.customers(id) on delete set null,
  call_id uuid references public.calls(id) on delete set null,
  source text not null default 'phone',
  service_type text,
  issue_description text,
  urgency text not null default 'normal',
  status text not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  customer_id uuid not null references public.customers(id) on delete cascade,
  lead_id uuid references public.leads(id) on delete set null,
  calendar_event_id text,
  service_type text,
  start_time timestamptz not null,
  end_time timestamptz not null,
  status text not null default 'booked',
  created_at timestamptz not null default now()
);

create table if not exists public.agent_events (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  call_id uuid references public.calls(id) on delete cascade,
  event_type text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists customers_org_idx on public.customers(organization_id);
create index if not exists calls_org_started_idx on public.calls(organization_id, started_at desc);
create index if not exists leads_org_created_idx on public.leads(organization_id, created_at desc);
create index if not exists appointments_org_start_idx on public.appointments(organization_id, start_time);
create index if not exists agent_events_call_idx on public.agent_events(call_id, created_at);

alter table public.organizations enable row level security;
alter table public.customers enable row level security;
alter table public.calls enable row level security;
alter table public.leads enable row level security;
alter table public.appointments enable row level security;
alter table public.agent_events enable row level security;

insert into public.organizations (name, timezone, business_hours, emergency_policy)
select 'Apex Heating & Air', 'America/Chicago',
'{"mon":{"open":"08:00","close":"18:00"},"tue":{"open":"08:00","close":"18:00"},"wed":{"open":"08:00","close":"18:00"},"thu":{"open":"08:00","close":"18:00"},"fri":{"open":"08:00","close":"18:00"}}'::jsonb,
'For immediate danger, fire, gas smell, or electrical burning smell, follow the configured emergency escalation procedure and do not provide hazardous troubleshooting instructions.'
where not exists (select 1 from public.organizations where name = 'Apex Heating & Air');
