-- Create the contact_messages table
create table if not exists public.contact_messages (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    email text not null,
    subject text not null,
    message text not null,
    status text not null default 'new' check (status in ('new', 'read', 'replied')),
    created_at timestamptz default now() not null,
    updated_at timestamptz default now() not null
);

-- Enable RLS
alter table public.contact_messages enable row level security;

-- Create policies
create policy "Enable insert access for all users"
    on public.contact_messages for insert
    to public
    with check (true);

create policy "Enable read access for authenticated users"
    on public.contact_messages for select
    to authenticated
    using (true);

-- Create updated_at trigger
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger set_updated_at
    before update on public.contact_messages
    for each row
    execute function public.handle_updated_at();

-- Grant necessary permissions
grant usage on schema public to anon, authenticated;
grant all on public.contact_messages to anon, authenticated;