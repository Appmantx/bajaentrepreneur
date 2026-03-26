# Baja Project — Folder Structure Guide
## Setup Reference for Claude Code

*Drop this file in the root of your project folder. Every agent on the team uses this structure.*

---

## Root Folder Layout

```
Baja Entrepreneur/              ← Your project root
│
├── .claude/                    ← Hidden — auto-managed by Claude Code
│   ├── CLAUDE.md               ← Master orchestration file (MANDO reads this first)
│   └── settings.json           ← Claude Code settings
│
├── src/
│   └── agents/                 ← Your TypeScript agent files
│       ├── orchestrator.ts     ← MANDO
│       ├── jefe.ts
│       ├── carmen.ts
│       ├── research.ts         ← SCOUT
│       ├── writer.ts           ← PLUMA
│       ├── chispa.ts
│       ├── pixel.ts
│       ├── terra.ts
│       ├── vista.ts
│       ├── casa.ts
│       ├── vela.ts
│       ├── cima.ts
│       ├── puente.ts
│       ├── dato.ts
│       ├── colmena.ts
│       └── chavo.ts
│
├── owner_inbox/                ← WHERE AGENTS DELIVER WORK TO YOU
│   │   (You review everything that appears here)
│   ├── reports/                ← DATO's weekly/monthly reports
│   ├── drafts/                 ← PLUMA's content drafts for review
│   ├── research/               ← SCOUT's research outputs
│   ├── newsletters/            ← COLMENA's newsletter drafts before send
│   ├── financial/              ← Financial documents for review
│   ├── review_needed/          ← Items CHAVO couldn't auto-categorize
│   └── organized_files/        ← CHAVO's processed and categorized documents
│
├── team_inbox/                 ← WHERE YOU DROP FILES FOR THE TEAM
│   │   (Drop anything here — CHAVO auto-detects and routes)
│   ├── scanner/                ← Point your scanner output here
│   ├── images/                 ← Images for VISTA to process
│   └── documents/              ← PDFs, contracts, research docs
│
├── team/                       ← AGENT KNOWLEDGE & MEMORY
│   ├── team_roster.md          ← Living crew list (CARMEN maintains)
│   ├── brand_scout.md          ← Baja Scout brand bible
│   ├── brand_entrepreneur.md   ← Baja Entrepreneur brand bible
│   ├── marina_character.md     ← Marina character bible
│   ├── cortez_character.md     ← Cortez character bible
│   └── style_guides/           ← Visual and writing style references
│
├── knowledge_base/             ← PUBLISHED & APPROVED CONTENT
│   ├── scout/
│   │   ├── blog/
│   │   ├── social/
│   │   ├── email/
│   │   └── guides/
│   └── entrepreneur/
│       ├── blog/
│       ├── social/
│       ├── email/
│       └── guides/
│
├── newsletters/                ← NEWSLETTER WORKING FOLDER (COLMENA)
│   ├── scout/
│   │   ├── drafts/
│   │   ├── sent/
│   │   └── templates/
│   └── entrepreneur/
│       ├── drafts/
│       ├── sent/
│       └── templates/
│
├── database/                   ← LOCAL DATABASE
│   ├── baja_knowledge.db       ← SQLite database (all agent memory)
│   ├── baja_viewer.html        ← Open in browser to view database
│   └── BAJA_DB_SCHEMA.md       ← Schema reference for all agents
│
├── assets/                     ← BRAND ASSETS
│   ├── logos/
│   ├── images/
│   ├── templates/
│   └── fonts/
│
├── output/                     ← WORKFLOW OUTPUT (date-stamped folders)
│
├── docs/                       ← PROJECT DOCUMENTATION
│   ├── team_roster.md
│   └── FOLDER_STRUCTURE.md
│
├── .env                        ← API keys (never commit this to GitHub)
└── .gitignore                  ← Make sure .env is in here
```

---

## The Two Inbox Rules

### `owner_inbox/` — This is YOUR inbox
- Agents put completed work here for you to review
- Nothing in here is live until you approve it
- COLMENA puts newsletter drafts here before sending to Beehiiv
- DATO puts reports here every Monday morning
- CHAVO puts processed documents here after filing to database
- You review, approve, and either archive or move to `knowledge_base/`

### `team_inbox/` — This is the TEAM'S inbox
- You drop files here for the team to process
- CHAVO monitors this folder and auto-routes everything
- Scanner output folder → CHAVO reads, OCRs, categorizes, files to database
- Drop an image → CHAVO routes to VISTA
- Drop a PDF contract → CHAVO routes to CASA or TERRA
- Drop a research article → CHAVO routes to SCOUT for indexing
- You never need to tell anyone what to do with a file — just drop it

---

## File Naming Conventions

All agents follow these naming standards when creating files:

```
[BRAND]-[AGENT]-[TYPE]-[TOPIC]-[DATE].ext

Examples:
scout-pluma-blog-whale-watching-guide-2026-01-10.md
entrepreneur-casa-guide-fideicomiso-explained-2026-02-01.md
scout-colmena-newsletter-issue-001-2026-01-15.md
entrepreneur-colmena-newsletter-issue-001-2026-02-01.md
scout-chispa-caption-marina-whale-season-2026-01-10.md
```

---

## What Goes in `.gitignore`

Make sure these are never committed to GitHub:

```
.env
*.db
owner_inbox/
team_inbox/
assets/images/
```

The agent `.ts` files, `team_roster.md`, brand bibles, and schema docs should all be committed — they are the team's institutional knowledge.

---

## Session Startup Sequence

Every time you open Claude Code in this folder, this is what happens automatically:

1. Claude reads `.claude/CLAUDE.md` — loads MANDO's identity and instructions
2. MANDO reads `team_roster.md` — knows the full crew
3. MANDO checks `team_inbox/` — routes any new files that arrived since last session
4. MANDO checks `database/baja_knowledge.db` — loads active projects and context
5. MANDO greets you and asks what you are working on today

---

## Adding a New Agent

When CARMEN onboards a new agent:
1. New `.ts` file created in `src/agents/`
2. `team_roster.md` updated with the new entry
3. `baja_knowledge.db` agent_interactions table gets a seed record
4. `.claude/CLAUDE.md` updated to reference the new agent
5. JEFE reviews the agent persona for brand alignment

---

*Folder Structure Guide v1.0*
*Baja Scout & Baja Entrepreneur Project*
*Last updated: March 26, 2026*
