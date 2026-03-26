-- Baja Knowledge Database Initialization
-- Run: sqlite3 baja_knowledge.db < init.sql

-- Files table (CHAVO)
CREATE TABLE IF NOT EXISTS files (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    file_name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size_kb INTEGER,
    brand TEXT CHECK(brand IN ('scout', 'entrepreneur', 'both', 'unknown')),
    category TEXT NOT NULL,
    description TEXT,
    ocr_text TEXT,
    ocr_confidence TEXT CHECK(ocr_confidence IN ('high', 'medium', 'low', NULL)),
    language TEXT DEFAULT 'en',
    tags TEXT,
    source TEXT,
    agent_handler TEXT,
    status TEXT DEFAULT 'active' CHECK(status IN ('active', 'archived', 'deleted')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_files_brand ON files(brand);
CREATE INDEX IF NOT EXISTS idx_files_category ON files(category);
CREATE INDEX IF NOT EXISTS idx_files_status ON files(status);

-- Team inbox log (CHAVO)
CREATE TABLE IF NOT EXISTS team_inbox_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    file_name TEXT NOT NULL,
    item_type TEXT NOT NULL,
    description TEXT,
    routed_to TEXT,
    action_taken TEXT,
    output_path TEXT,
    status TEXT DEFAULT 'processed' CHECK(status IN ('processed', 'flagged', 'pending')),
    brand TEXT,
    notes TEXT,
    processed_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_inbox_status ON team_inbox_log(status);
CREATE INDEX IF NOT EXISTS idx_inbox_date ON team_inbox_log(processed_at);

-- Knowledge base (PLUMA)
CREATE TABLE IF NOT EXISTS knowledge_base (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT UNIQUE,
    content_type TEXT NOT NULL,
    brand TEXT NOT NULL CHECK(brand IN ('scout', 'entrepreneur', 'both')),
    topic TEXT,
    summary TEXT,
    content TEXT,
    file_path TEXT,
    word_count INTEGER,
    primary_keyword TEXT,
    secondary_keywords TEXT,
    agent_author TEXT,
    status TEXT DEFAULT 'draft' CHECK(status IN ('draft', 'review', 'approved', 'published', 'archived')),
    published_url TEXT,
    published_at DATETIME,
    seasonal_tag TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_kb_brand ON knowledge_base(brand);
CREATE INDEX IF NOT EXISTS idx_kb_type ON knowledge_base(content_type);
CREATE INDEX IF NOT EXISTS idx_kb_status ON knowledge_base(status);
CREATE INDEX IF NOT EXISTS idx_kb_topic ON knowledge_base(topic);

-- Content calendar (CHISPA)
CREATE TABLE IF NOT EXISTS content_calendar (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content_type TEXT NOT NULL,
    brand TEXT NOT NULL CHECK(brand IN ('scout', 'entrepreneur')),
    platform TEXT,
    planned_date DATE NOT NULL,
    planned_time TIME,
    topic TEXT,
    caption TEXT,
    hashtags TEXT,
    visual_direction TEXT,
    knowledge_base_id INTEGER,
    agent_owner TEXT,
    status TEXT DEFAULT 'planned' CHECK(status IN ('planned', 'drafted', 'approved', 'posted', 'cancelled')),
    posted_url TEXT,
    seasonal_tag TEXT,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (knowledge_base_id) REFERENCES knowledge_base(id)
);
CREATE INDEX IF NOT EXISTS idx_calendar_date ON content_calendar(planned_date);
CREATE INDEX IF NOT EXISTS idx_calendar_brand ON content_calendar(brand);
CREATE INDEX IF NOT EXISTS idx_calendar_status ON content_calendar(status);

-- Keywords (CIMA)
CREATE TABLE IF NOT EXISTS keywords (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    keyword TEXT NOT NULL,
    brand TEXT NOT NULL CHECK(brand IN ('scout', 'entrepreneur', 'both')),
    search_intent TEXT CHECK(search_intent IN ('informational', 'navigational', 'commercial', 'transactional')),
    monthly_volume INTEGER,
    difficulty_score INTEGER,
    current_position INTEGER,
    target_position INTEGER DEFAULT 10,
    target_url TEXT,
    knowledge_base_id INTEGER,
    featured_snippet INTEGER DEFAULT 0,
    priority TEXT DEFAULT 'medium' CHECK(priority IN ('high', 'medium', 'low')),
    status TEXT DEFAULT 'tracking' CHECK(status IN ('tracking', 'ranking', 'won', 'lost', 'paused')),
    last_checked DATETIME,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (knowledge_base_id) REFERENCES knowledge_base(id)
);
CREATE INDEX IF NOT EXISTS idx_keywords_brand ON keywords(brand);
CREATE INDEX IF NOT EXISTS idx_keywords_priority ON keywords(priority);
CREATE INDEX IF NOT EXISTS idx_keywords_status ON keywords(status);

-- Newsletters (COLMENA)
CREATE TABLE IF NOT EXISTS newsletters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    newsletter_name TEXT NOT NULL,
    brand TEXT NOT NULL CHECK(brand IN ('scout', 'entrepreneur')),
    issue_number INTEGER,
    subject_line TEXT,
    preview_text TEXT,
    content TEXT,
    file_path TEXT,
    status TEXT DEFAULT 'draft' CHECK(status IN ('draft', 'review', 'approved', 'scheduled', 'sent')),
    scheduled_at DATETIME,
    sent_at DATETIME,
    beehiiv_post_id TEXT,
    recipients INTEGER,
    opens INTEGER,
    open_rate REAL,
    clicks INTEGER,
    click_rate REAL,
    unsubscribes INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_newsletters_brand ON newsletters(brand);
CREATE INDEX IF NOT EXISTS idx_newsletters_status ON newsletters(status);
CREATE INDEX IF NOT EXISTS idx_newsletters_sent ON newsletters(sent_at);

-- Subscribers (COLMENA)
CREATE TABLE IF NOT EXISTS subscribers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    first_name TEXT,
    last_name TEXT,
    brand TEXT NOT NULL CHECK(brand IN ('scout', 'entrepreneur')),
    segment TEXT,
    source TEXT,
    status TEXT DEFAULT 'active' CHECK(status IN ('active', 'inactive', 'unsubscribed', 'bounced')),
    beehiiv_subscriber_id TEXT,
    language TEXT DEFAULT 'en',
    location TEXT,
    tags TEXT,
    subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_open DATETIME,
    last_click DATETIME,
    total_opens INTEGER DEFAULT 0,
    total_clicks INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_subscribers_brand ON subscribers(brand);
CREATE INDEX IF NOT EXISTS idx_subscribers_segment ON subscribers(segment);
CREATE INDEX IF NOT EXISTS idx_subscribers_status ON subscribers(status);

-- Leads (PIXEL)
CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT,
    first_name TEXT,
    last_name TEXT,
    phone TEXT,
    brand TEXT NOT NULL CHECK(brand IN ('scout', 'entrepreneur')),
    lead_type TEXT,
    source TEXT,
    campaign TEXT,
    medium TEXT,
    landing_page TEXT,
    interest TEXT,
    status TEXT DEFAULT 'new' CHECK(status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),
    score INTEGER DEFAULT 0,
    assigned_to TEXT,
    notes TEXT,
    first_touch DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_touch DATETIME,
    converted_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_leads_brand ON leads(brand);
CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_date ON leads(created_at);

-- Analytics events (DATO)
CREATE TABLE IF NOT EXISTS analytics_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_type TEXT NOT NULL,
    brand TEXT CHECK(brand IN ('scout', 'entrepreneur', 'both')),
    channel TEXT,
    platform TEXT,
    metric_name TEXT NOT NULL,
    metric_value REAL NOT NULL,
    dimension TEXT,
    dimension_value TEXT,
    period_start DATE,
    period_end DATE,
    notes TEXT,
    recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_analytics_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_brand ON analytics_events(brand);
CREATE INDEX IF NOT EXISTS idx_analytics_date ON analytics_events(recorded_at);
CREATE INDEX IF NOT EXISTS idx_analytics_channel ON analytics_events(channel);

-- Agent interactions (MANDO)
CREATE TABLE IF NOT EXISTS agent_interactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    agent_name TEXT NOT NULL,
    action_type TEXT NOT NULL,
    description TEXT,
    input_summary TEXT,
    output_summary TEXT,
    handed_to TEXT,
    brand TEXT,
    status TEXT DEFAULT 'completed' CHECK(status IN ('started', 'completed', 'error', 'pending')),
    duration_seconds INTEGER,
    session_id TEXT,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_interactions_agent ON agent_interactions(agent_name);
CREATE INDEX IF NOT EXISTS idx_interactions_date ON agent_interactions(created_at);
CREATE INDEX IF NOT EXISTS idx_interactions_session ON agent_interactions(session_id);

-- Seed agent registrations
INSERT INTO agent_interactions (agent_name, action_type, description, status) VALUES
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
