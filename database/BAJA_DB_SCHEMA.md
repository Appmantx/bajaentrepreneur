# Baja Knowledge Database Schema
## SQLite Database Reference for All Agents

*Database file: `database/baja_knowledge.db`*
*All agents have read access. MANDO, CHAVO, DATO, COLMENA have write access.*

---

## Tables Overview

| Table | Owner Agent | Purpose |
|-------|-------------|---------|
| `files` | CHAVO | All processed files and documents |
| `team_inbox_log` | CHAVO | Inbox processing history |
| `knowledge_base` | PLUMA | Published content library |
| `content_calendar` | CHISPA | Planned content schedule |
| `keywords` | CIMA | SEO keyword tracking |
| `newsletters` | COLMENA | Newsletter issues and performance |
| `subscribers` | COLMENA | Email subscriber data |
| `leads` | PIXEL | Lead tracking and attribution |
| `analytics_events` | DATO | Performance metrics log |
| `agent_interactions` | MANDO | Agent activity log |

---

## Table Definitions

### `files`
*Managed by CHAVO — Every file that passes through the system*

```sql
CREATE TABLE files (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    file_name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    file_type TEXT NOT NULL,              -- pdf, image, doc, md, csv, etc.
    file_size_kb INTEGER,
    brand TEXT CHECK(brand IN ('scout', 'entrepreneur', 'both', 'unknown')),
    category TEXT NOT NULL,               -- real_estate, legal, whale_watching, etc.
    description TEXT,
    ocr_text TEXT,                         -- Extracted text from scanned docs
    ocr_confidence TEXT CHECK(ocr_confidence IN ('high', 'medium', 'low', NULL)),
    language TEXT DEFAULT 'en',            -- en, es
    tags TEXT,                             -- JSON array of tags
    source TEXT,                           -- Where file came from
    agent_handler TEXT,                    -- Which agent processed it
    status TEXT DEFAULT 'active' CHECK(status IN ('active', 'archived', 'deleted')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_files_brand ON files(brand);
CREATE INDEX idx_files_category ON files(category);
CREATE INDEX idx_files_status ON files(status);
```

---

### `team_inbox_log`
*Managed by CHAVO — Log of all inbox processing*

```sql
CREATE TABLE team_inbox_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    file_name TEXT NOT NULL,
    item_type TEXT NOT NULL,              -- file, scan, image, document
    description TEXT,
    routed_to TEXT,                        -- Agent or folder
    action_taken TEXT,                     -- filed, flagged, archived
    output_path TEXT,                      -- Where it ended up
    status TEXT DEFAULT 'processed' CHECK(status IN ('processed', 'flagged', 'pending')),
    brand TEXT,
    notes TEXT,
    processed_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_inbox_status ON team_inbox_log(status);
CREATE INDEX idx_inbox_date ON team_inbox_log(processed_at);
```

---

### `knowledge_base`
*Managed by PLUMA — All published content*

```sql
CREATE TABLE knowledge_base (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT UNIQUE,
    content_type TEXT NOT NULL,            -- blog, guide, email, social, newsletter
    brand TEXT NOT NULL CHECK(brand IN ('scout', 'entrepreneur', 'both')),
    topic TEXT,                            -- whale_watching, real_estate, valle, etc.
    summary TEXT,
    content TEXT,                          -- Full content or file reference
    file_path TEXT,
    word_count INTEGER,
    primary_keyword TEXT,
    secondary_keywords TEXT,               -- JSON array
    agent_author TEXT,                     -- PLUMA, CASA, VELA, etc.
    status TEXT DEFAULT 'draft' CHECK(status IN ('draft', 'review', 'approved', 'published', 'archived')),
    published_url TEXT,
    published_at DATETIME,
    seasonal_tag TEXT,                     -- whale_season, valle_harvest, etc.
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_kb_brand ON knowledge_base(brand);
CREATE INDEX idx_kb_type ON knowledge_base(content_type);
CREATE INDEX idx_kb_status ON knowledge_base(status);
CREATE INDEX idx_kb_topic ON knowledge_base(topic);
```

---

### `content_calendar`
*Managed by CHISPA — Planned content schedule*

```sql
CREATE TABLE content_calendar (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content_type TEXT NOT NULL,            -- instagram, tiktok, linkedin, blog, email
    brand TEXT NOT NULL CHECK(brand IN ('scout', 'entrepreneur')),
    platform TEXT,                         -- instagram, tiktok, facebook, linkedin, blog
    planned_date DATE NOT NULL,
    planned_time TIME,
    topic TEXT,
    caption TEXT,
    hashtags TEXT,                         -- JSON array
    visual_direction TEXT,                 -- Brief for VISTA
    knowledge_base_id INTEGER,             -- Link to content if exists
    agent_owner TEXT,                      -- CHISPA, PLUMA, etc.
    status TEXT DEFAULT 'planned' CHECK(status IN ('planned', 'drafted', 'approved', 'posted', 'cancelled')),
    posted_url TEXT,
    seasonal_tag TEXT,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (knowledge_base_id) REFERENCES knowledge_base(id)
);

CREATE INDEX idx_calendar_date ON content_calendar(planned_date);
CREATE INDEX idx_calendar_brand ON content_calendar(brand);
CREATE INDEX idx_calendar_status ON content_calendar(status);
```

---

### `keywords`
*Managed by CIMA — SEO keyword tracking*

```sql
CREATE TABLE keywords (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    keyword TEXT NOT NULL,
    brand TEXT NOT NULL CHECK(brand IN ('scout', 'entrepreneur', 'both')),
    search_intent TEXT CHECK(search_intent IN ('informational', 'navigational', 'commercial', 'transactional')),
    monthly_volume INTEGER,
    difficulty_score INTEGER,              -- 1-100
    current_position INTEGER,              -- Current SERP position
    target_position INTEGER DEFAULT 10,
    target_url TEXT,                       -- Page targeting this keyword
    knowledge_base_id INTEGER,
    featured_snippet BOOLEAN DEFAULT FALSE,
    priority TEXT DEFAULT 'medium' CHECK(priority IN ('high', 'medium', 'low')),
    status TEXT DEFAULT 'tracking' CHECK(status IN ('tracking', 'ranking', 'won', 'lost', 'paused')),
    last_checked DATETIME,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (knowledge_base_id) REFERENCES knowledge_base(id)
);

CREATE INDEX idx_keywords_brand ON keywords(brand);
CREATE INDEX idx_keywords_priority ON keywords(priority);
CREATE INDEX idx_keywords_status ON keywords(status);
```

---

### `newsletters`
*Managed by COLMENA — Newsletter issues*

```sql
CREATE TABLE newsletters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    newsletter_name TEXT NOT NULL,         -- The Scout Report, The Cortez Brief
    brand TEXT NOT NULL CHECK(brand IN ('scout', 'entrepreneur')),
    issue_number INTEGER,
    subject_line TEXT,
    preview_text TEXT,
    content TEXT,                          -- Full newsletter content
    file_path TEXT,
    status TEXT DEFAULT 'draft' CHECK(status IN ('draft', 'review', 'approved', 'scheduled', 'sent')),
    scheduled_at DATETIME,
    sent_at DATETIME,
    beehiiv_post_id TEXT,                  -- Beehiiv reference
    -- Performance metrics (populated after send)
    recipients INTEGER,
    opens INTEGER,
    open_rate REAL,
    clicks INTEGER,
    click_rate REAL,
    unsubscribes INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_newsletters_brand ON newsletters(brand);
CREATE INDEX idx_newsletters_status ON newsletters(status);
CREATE INDEX idx_newsletters_sent ON newsletters(sent_at);
```

---

### `subscribers`
*Managed by COLMENA — Email subscribers*

```sql
CREATE TABLE subscribers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    first_name TEXT,
    last_name TEXT,
    brand TEXT NOT NULL CHECK(brand IN ('scout', 'entrepreneur')),
    segment TEXT,                          -- cruise_audience, whale_watchers, real_estate_buyers, etc.
    source TEXT,                           -- organic, referral, paid, import
    status TEXT DEFAULT 'active' CHECK(status IN ('active', 'inactive', 'unsubscribed', 'bounced')),
    beehiiv_subscriber_id TEXT,
    language TEXT DEFAULT 'en',
    location TEXT,
    tags TEXT,                             -- JSON array
    subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_open DATETIME,
    last_click DATETIME,
    total_opens INTEGER DEFAULT 0,
    total_clicks INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_subscribers_brand ON subscribers(brand);
CREATE INDEX idx_subscribers_segment ON subscribers(segment);
CREATE INDEX idx_subscribers_status ON subscribers(status);
```

---

### `leads`
*Managed by PIXEL — Lead tracking*

```sql
CREATE TABLE leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT,
    first_name TEXT,
    last_name TEXT,
    phone TEXT,
    brand TEXT NOT NULL CHECK(brand IN ('scout', 'entrepreneur')),
    lead_type TEXT,                        -- consultation, event, real_estate, newsletter
    source TEXT,                           -- google, meta, linkedin, organic, referral
    campaign TEXT,                         -- UTM campaign
    medium TEXT,                           -- UTM medium
    landing_page TEXT,
    interest TEXT,                         -- What they're interested in
    status TEXT DEFAULT 'new' CHECK(status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),
    score INTEGER DEFAULT 0,               -- Lead score 0-100
    assigned_to TEXT,                      -- Agent or partner
    notes TEXT,
    first_touch DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_touch DATETIME,
    converted_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_leads_brand ON leads(brand);
CREATE INDEX idx_leads_source ON leads(source);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_date ON leads(created_at);
```

---

### `analytics_events`
*Managed by DATO — Performance metrics*

```sql
CREATE TABLE analytics_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_type TEXT NOT NULL,              -- traffic, engagement, conversion, email, social
    brand TEXT CHECK(brand IN ('scout', 'entrepreneur', 'both')),
    channel TEXT,                          -- organic, paid, social, email, direct
    platform TEXT,                         -- google, meta, instagram, linkedin, beehiiv
    metric_name TEXT NOT NULL,             -- sessions, clicks, opens, conversions, etc.
    metric_value REAL NOT NULL,
    dimension TEXT,                        -- Page, campaign, post, etc.
    dimension_value TEXT,
    period_start DATE,
    period_end DATE,
    notes TEXT,
    recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_analytics_type ON analytics_events(event_type);
CREATE INDEX idx_analytics_brand ON analytics_events(brand);
CREATE INDEX idx_analytics_date ON analytics_events(recorded_at);
CREATE INDEX idx_analytics_channel ON analytics_events(channel);
```

---

### `agent_interactions`
*Managed by MANDO — Agent activity log*

```sql
CREATE TABLE agent_interactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    agent_name TEXT NOT NULL,
    action_type TEXT NOT NULL,             -- task, handoff, delivery, error
    description TEXT,
    input_summary TEXT,
    output_summary TEXT,
    handed_to TEXT,                        -- Next agent in chain
    brand TEXT,
    status TEXT DEFAULT 'completed' CHECK(status IN ('started', 'completed', 'error', 'pending')),
    duration_seconds INTEGER,
    session_id TEXT,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_interactions_agent ON agent_interactions(agent_name);
CREATE INDEX idx_interactions_date ON agent_interactions(created_at);
CREATE INDEX idx_interactions_session ON agent_interactions(session_id);
```

---

## Common Queries

### CHAVO — Recent inbox processing
```sql
SELECT * FROM team_inbox_log
WHERE processed_at >= date('now', '-7 days')
ORDER BY processed_at DESC;
```

### PLUMA — Find content ready for newsletter
```sql
SELECT title, content_type, topic, agent_author, file_path
FROM knowledge_base
WHERE status IN ('approved', 'published')
AND brand IN ('scout', 'both')
AND created_at >= date('now', '-14 days')
ORDER BY created_at DESC;
```

### CIMA — Priority keywords not yet ranking
```sql
SELECT keyword, monthly_volume, current_position, target_url
FROM keywords
WHERE brand = 'entrepreneur'
AND priority = 'high'
AND (current_position IS NULL OR current_position > 10)
ORDER BY monthly_volume DESC;
```

### DATO — Weekly email performance
```sql
SELECT newsletter_name, subject_line, sent_at,
       recipients, opens, open_rate, clicks, click_rate
FROM newsletters
WHERE sent_at >= date('now', '-7 days')
ORDER BY sent_at DESC;
```

### COLMENA — Subscriber segments
```sql
SELECT segment, COUNT(*) as count,
       AVG(total_opens) as avg_opens
FROM subscribers
WHERE brand = 'scout' AND status = 'active'
GROUP BY segment
ORDER BY count DESC;
```

### PIXEL — Lead sources this month
```sql
SELECT source, campaign, COUNT(*) as leads,
       SUM(CASE WHEN status = 'converted' THEN 1 ELSE 0 END) as conversions
FROM leads
WHERE created_at >= date('now', 'start of month')
GROUP BY source, campaign
ORDER BY leads DESC;
```

---

## Database Initialization

Run this SQL to create a fresh database:

```sql
-- Create all tables (run the CREATE TABLE statements above)

-- Seed agent_interactions with the team
INSERT INTO agent_interactions (agent_name, action_type, description, status)
VALUES
    ('MANDO', 'task', 'Database initialized', 'completed'),
    ('JEFE', 'task', 'Agent registered', 'completed'),
    ('CARMEN', 'task', 'Agent registered', 'completed'),
    ('SCOUT', 'task', 'Agent registered', 'completed'),
    ('PLUMA', 'task', 'Agent registered', 'completed'),
    ('CHISPA', 'task', 'Agent registered', 'completed'),
    ('PIXEL', 'task', 'Agent registered', 'completed'),
    ('TERRA', 'task', 'Agent registered', 'completed'),
    ('VISTA', 'task', 'Agent registered', 'completed'),
    ('CASA', 'task', 'Agent registered', 'completed'),
    ('VELA', 'task', 'Agent registered', 'completed'),
    ('CIMA', 'task', 'Agent registered', 'completed'),
    ('PUENTE', 'task', 'Agent registered', 'completed'),
    ('DATO', 'task', 'Agent registered', 'completed'),
    ('COLMENA', 'task', 'Agent registered', 'completed'),
    ('CHAVO', 'task', 'Agent registered', 'completed');
```

---

*Schema Version: 1.0*
*Last Updated: March 26, 2026*
*Maintained by: MANDO & CHAVO*
