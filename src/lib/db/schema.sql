create table if not exists app_user (
  id text primary key,
  name text not null,
  streak_days integer not null default 0,
  strongest_tag text,
  created_at timestamptz not null default now()
);

create table if not exists user_settings (
  user_id text primary key references app_user(id) on delete cascade,
  daily_target integer not null default 12,
  auto_play_audio boolean not null default true,
  show_hints_first boolean not null default true,
  review_pace text not null default 'steady',
  offline_mode boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists deck (
  id text primary key,
  title text not null,
  description text not null,
  category text not null,
  total_words integer not null default 0,
  due_count integer not null default 0,
  accent text not null,
  bamboo_note text not null
);

create table if not exists word (
  id text primary key,
  deck_id text not null references deck(id) on delete cascade,
  term text not null,
  phonetic text not null,
  meaning text not null,
  short_meaning text not null,
  hint text not null,
  examples jsonb not null default '[]'::jsonb,
  synonyms jsonb not null default '[]'::jsonb,
  etymology text not null,
  tags jsonb not null default '[]'::jsonb,
  difficulty text not null,
  audio_url text
);

create table if not exists review_session (
  id text primary key,
  user_id text not null references app_user(id) on delete cascade,
  source text not null default 'daily',
  target_count integer not null,
  status text not null default 'active',
  current_index integer not null default 0,
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  duration_seconds integer not null default 0
);

create table if not exists review_session_item (
  id text primary key,
  session_id text not null references review_session(id) on delete cascade,
  order_index integer not null,
  word_id text not null references word(id) on delete cascade,
  verdict text,
  answered_at timestamptz
);
