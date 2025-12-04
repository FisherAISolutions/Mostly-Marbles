-- Example schema to adapt inside Supabase

create table if not exists user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  email text not null,
  role text not null check (role in ('owner', 'admin', 'user')),
  created_at timestamptz default now()
);

create table if not exists listings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  title text not null,
  description text,
  price numeric,
  type text,
  origin text,
  rarity text,
  age text,
  maker text,
  created_at timestamptz default now()
);

create table if not exists training_samples (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  title text,
  type text,
  origin text,
  age text,
  rarity text,
  notes text,
  image_url text,
  created_at timestamptz default now()
);

create table if not exists admin_chat (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  email text,
  message text not null,
  created_at timestamptz default now()
);
