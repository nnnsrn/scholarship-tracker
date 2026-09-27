# Master's Compass

Build a personal web application called Master's Application OS for tracking master's degree and scholarship applications.

This is a single-user personal productivity application, not a SaaS product. Prioritize usability, clean information architecture, fast interactions, and maintainable code over unnecessary complexity.

Tech stack

Use:

React

TypeScript

Tailwind CSS

Supabase for PostgreSQL database, authentication, and file storage

Vercel-compatible deployment

GitHub-compatible project structure

Do not introduce unnecessary backend services, microservices, Redis, Docker, GraphQL, vector databases, or AI agents.

The application should be responsive for desktop and tablet.

Design direction

Create a polished academic productivity dashboard with a calm, modern visual style.

Primary color palette:

Deep Indigo: #403D88

Purple: #8B639B

Mauve: #AF719D

Soft Pink: #F8B2B2

Use the colors intentionally:

#403D88 for primary actions, navigation, headings, and important UI elements

#8B639B for secondary accents

#AF719D for borders, tags, secondary emphasis, and decorative accents

#F8B2B2 for soft highlights, warning/deadline accents, and selected states

Do not make the application overwhelmingly purple or pink. Use white/light neutral surfaces for cards and content areas, with the palette used as accents.

Style:

modern

minimal

academic

polished

slightly feminine but not childish

visually similar to a premium productivity application

rounded cards but not excessively rounded

subtle shadows

excellent spacing

strong typography hierarchy

Avoid:

excessive gradients

excessive glassmorphism

flashy animations

generic corporate dashboard styling

oversized illustrations

unnecessary decorative elements

Authentication

This is a single-user application.

Implement simple authentication using Supabase Auth.

Use either email/password or magic-link authentication.

All application data should belong to the authenticated user.

Use Supabase Row Level Security so authenticated users can only access their own records.

Do not build multi-user roles or an admin system.

Main navigation

Create these main sections:

Dashboard

Programs

Documents

Language Tests

Recommendations

Calendar

Settings should be accessible from a small profile/settings control.

DATABASE

Create the following Supabase tables.

programs

Fields:

id: uuid primary key

user_id: uuid

university: text

program_name: text

scholarship_name: text nullable

country: text

city: text nullable

major: text

research_topic: text nullable

degree_type: text nullable

deadline: date nullable

scholarship_deadline: date nullable

application_link: text nullable

program_link: text nullable

scholarship_link: text nullable

funding_type: text nullable

tuition_fee: numeric nullable

application_fee: numeric nullable

status: text

priority: text

notes: text nullable

created_at: timestamp

updated_at: timestamp

Allowed status values:

Researching

Interested

Preparing

Ready to Submit

Submitted

Interview

Accepted

Rejected

Withdrawn

Allowed priority values:

High

Medium

Low

requirements

Fields:

id: uuid primary key

user_id: uuid

program_id: uuid

name: text

category: text

is_required: boolean

deadline: date nullable

status: text

minimum_score: text nullable

document_id: uuid nullable

notes: text nullable

created_at: timestamp

updated_at: timestamp

Allowed categories:

Document

Language Test

Recommendation

Academic

Financial

Other

Allowed statuses:

Not Started

In Progress

Completed

Not Required

documents

Fields:

id: uuid primary key

user_id: uuid

name: text

document_type: text

version: text nullable

file_url: text nullable

status: text

notes: text nullable

created_at: timestamp

updated_at: timestamp

Allowed document types:

CV

Personal Statement

Statement of Purpose

Research Proposal

Transcript

Diploma

IELTS Certificate

TOEFL Certificate

Passport

Recommendation Letter

Other

Allowed statuses:

Draft

Ready

Submitted

Archived

Use Supabase Storage for uploaded files instead of storing file contents directly in PostgreSQL.

language_tests

Fields:

id: uuid primary key

user_id: uuid

test_type: text

test_date: date nullable

expiry_date: date nullable

score: text nullable

listening: text nullable

reading: text nullable

writing: text nullable

speaking: text nullable

price: numeric nullable

currency: text nullable

provider: text nullable

certificate_document_id: uuid nullable

notes: text nullable

created_at: timestamp

updated_at: timestamp

Examples of test types:

IELTS Academic

IELTS General

TOEFL iBT

TOEFL Essentials

Other

recommenders

Fields:

id: uuid primary key

user_id: uuid

name: text

affiliation: text nullable

position: text nullable

email: text nullable

notes: text nullable

created_at: timestamp

updated_at: timestamp

recommendation_requests

Fields:

id: uuid primary key

user_id: uuid

program_id: uuid

recommender_id: uuid

deadline: date nullable

requested_date: date nullable

received_date: date nullable

status: text

notes: text nullable

created_at: timestamp

updated_at: timestamp

Allowed statuses:

Not Requested

Requested

In Progress

Received

application_events

Fields:

id: uuid primary key

user_id: uuid

program_id: uuid nullable

title: text

event_type: text

date: date

notes: text nullable

completed: boolean

created_at: timestamp

Allowed event types:

Application Deadline

Scholarship Deadline

Language Test

Recommendation

Document

Interview

Other

Add foreign-key relationships where appropriate.

All user-owned tables must include user_id and appropriate RLS policies.

DASHBOARD

Create a visually polished dashboard.

Header:

Master's Applications

Subtitle:

2026–2027 Application Cycle

At the top show summary cards:

Total Programs

Preparing

Ready to Submit

Submitted

Below that show:

Upcoming Deadlines

Display the nearest deadlines first.

Each card should show:

university

program name

country and city

major

deadline

number of days remaining

readiness percentage

current status

Calculate days remaining automatically from the current date.

Use visual urgency:

more than 30 days: normal

14–30 days: warning

less than 14 days: urgent

overdue: clearly marked overdue

Needs Attention

Show requirements or events that need action soon.

Examples:

missing recommendation letter

incomplete personal statement

IELTS requirement not completed

upcoming application deadline

overdue requirement

Application Pipeline

Show applications grouped by status.

Example:

Researching → Interested → Preparing → Ready to Submit → Submitted → Result

Research Interests

Show frequently used research-topic tags based on the user's programs.

Examples:

Artificial Intelligence

Machine Learning

Bioinformatics

Computational Biology

AI in Biomedicine

Marine Biology

PROGRAMS PAGE

Create a searchable, filterable program list.

Include:

search bar

country filter

major filter

status filter

priority filter

deadline filter

scholarship-only filter

sort by deadline

sort by priority

Allow switching between:

card view

compact table view

Each program card should display:

University
Program
Country · City
Major
Research topic
Deadline
Days remaining
Status
Priority
Readiness percentage

Add a prominent + Add Program button.

ADD / EDIT PROGRAM

Create a clean form.

Sections:

Basic Information

University

Program name

Scholarship name

Degree type

Country

City

Major

Research topic

Deadlines

Application deadline

Scholarship deadline

Links

Program website

Scholarship website

Application portal

Financial

Funding type

Tuition fee

Application fee

Tracking

Status

Priority

Notes

After creating a program, allow the user to immediately add requirements.

PROGRAM DETAIL PAGE

Create a detailed application workspace.

Top section:

University
Program name
Country · City
Major

Buttons:

Program Website

Scholarship

Application Portal

Edit

Show deadline prominently.

Example:

Application Deadline
15 January 2027
116 days remaining

Show a readiness indicator:

Application Readiness
82%

Calculate this deterministically:

completed required requirements / total required requirements × 100

Do not use AI for this calculation.

Create tabs:

Overview

Requirements

Documents

Recommendations

Notes

Overview

Show:

major

research topic

scholarship

funding

tuition

application fee

application deadline

scholarship deadline

status

priority

Requirements

Display a checklist/table containing:

requirement name

category

required/not required

deadline

status

minimum score

linked document

Allow:

add requirement

edit requirement

mark complete

link existing document

unlink document

Documents

Show the documents associated with the application.

Allow selecting existing documents from the Documents library.

Recommendations

Show recommendation requests related to the application.

Display:

recommender

status

deadline

requested date

received date

Notes

Provide a clean rich-text or multiline notes area.

DOCUMENTS PAGE

Create a reusable document library.

Include:

search

filter by type

filter by status

upload document

Group documents by type.

Example:

CV

General CV v3

Research CV v2

Personal Statement

AI version

Bioinformatics version

Research Proposal

Computational Biology

Each document should show:

name

type

version

status

upload date

Allow preview/download/delete.

Documents should be stored in Supabase Storage.

LANGUAGE TESTS PAGE

Create cards for each test.

Example:

IELTS Academic

Overall: 8.0
Listening: 8.5
Reading: 8.5
Writing: 7.5
Speaking: 7.0

Test date
Expiry date
Provider
Price

Make price display with currency.

Show validity clearly.

Also include a section:

Planned Tests

where the user can record a future test and estimated price.

Allow attaching the certificate from the Documents library.

RECOMMENDATIONS PAGE

Create a recommender directory.

Each recommender card shows:

name

affiliation

position

email

active recommendation requests

Below this, display recommendation requests across programs.

Show:

Program
Recommender
Deadline
Status
Requested date
Received date

Make pending deadlines visually noticeable.

CALENDAR PAGE

Create a monthly calendar.

Events should include:

Application deadlines

Scholarship deadlines

Language tests

Recommendation deadlines

Document deadlines

Interviews

Allow clicking an event to open the related program or task.

Use the existing color palette to distinguish event types subtly.

COMPONENTS

Create reusable components for:

ProgramCard

ProgramTable

DeadlineBadge

StatusBadge

PriorityBadge

ReadinessProgress

RequirementChecklist

DocumentCard

LanguageTestCard

RecommendationCard

DeadlineSummaryCard

EmptyState

ConfirmationDialog

Add/Edit Modal or Drawer

Avoid duplicating UI code.

UX REQUIREMENTS

The application should feel fast and practical.

Important interactions should have:

loading states

empty states

success feedback

error feedback

confirmation before destructive actions

Forms should validate required fields.

Dates should be displayed in a human-friendly format such as:

15 January 2027

Internally store ISO dates.

Use responsive layouts.

On smaller screens, convert large tables into cards instead of forcing horizontal scrolling when practical.

IMPORTANT SCOPE RESTRICTIONS

Do NOT add these in the first version:

AI chatbot

automatic web scraping

automatic scholarship discovery

email integration

Gmail integration

Google Calendar sync

complex analytics

social features

multi-user collaboration

subscription/payment system

The application should first become an excellent personal tracking system.

After the core application is stable, an AI-assisted scholarship requirement parser may be added as a separate feature.

SEED DATA

Create realistic sample data so the UI does not look empty during development.

Use fictional or clearly marked sample universities/programs rather than pretending the sample deadlines are real.

Include several sample programs with different statuses and deadlines so the dashboard demonstrates:

upcoming deadline

overdue deadline

missing requirements

completed application

pending recommendations

IELTS requirement

Make sample data easy to delete.

FINAL DESIGN GOAL

The finished application should feel like:

Notion + application tracker + academic dashboard

but more focused and easier to scan.

The primary user experience should be:

"I open this every morning and immediately know which master's applications need my attention."

Prioritize clarity and usefulness over visual complexity.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b188a02f-facb-4f9f-9c46-1dcb864d3188).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
