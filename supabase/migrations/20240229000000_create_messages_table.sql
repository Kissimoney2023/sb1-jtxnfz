-- Create messages table
create table public.messages (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  status text not null default 'new',
  user_id uuid references auth.users(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.messages enable row level security;

-- Create policies
create policy "Anyone can create messages"
  on public.messages
  for insert
  with check (true);

create policy "Users can view their own messages"
  on public.messages
  for select
  using (
    auth.uid() = user_id
    or user_id is null
    or auth.jwt()->>'email' = 'admin@example.com'
  );

-- Create indexes
create index messages_user_id_idx on public.messages(user_id);
create index messages_status_idx on public.messages(status);
create index messages_created_at_idx on public.messages(created_at desc);

-- Set up updated_at trigger
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

create trigger messages_updated_at
  before update on public.messages
  for each row
  execute procedure public.handle_updated_at();