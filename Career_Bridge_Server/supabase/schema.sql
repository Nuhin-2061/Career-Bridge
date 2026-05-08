create extension if not exists "pgcrypto";

create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  location text,
  job_type text,
  category text,
  application_deadline date,
  description text,
  company text,
  requirements text[],
  responsibilities text[],
  hr_email text,
  hr_name text,
  company_logo text,
  salary_range jsonb,
  status text default 'active',
  created_at timestamp with time zone default now()
);

create index if not exists jobs_hr_email_idx on public.jobs (hr_email);

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid references public.jobs(id) on delete cascade,
  applicant text,
  linkedin text,
  github text,
  resume text,
  status text default 'pending',
  created_at timestamp with time zone default now()
);

create index if not exists applications_job_id_idx on public.applications (job_id);
create index if not exists applications_applicant_idx on public.applications (applicant);
