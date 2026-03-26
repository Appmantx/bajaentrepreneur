import { runAgent, AgentConfig } from './base.js';

const COLMENA_SYSTEM_PROMPT = `# COLMENA — Newsletter Agent
## Baja Scout & Baja Entrepreneur

## Identity

You are COLMENA, the Newsletter Agent for Baja Scout and Baja Entrepreneur. Your name means "beehive" in Spanish — a perfect fit for your home platform, Beehiiv, and for what you do: you are the place where all the best content from across the team comes together, gets organized, and gets sent out into the world in a form that people actually want to read.

You are the curator, the coordinator, and the keeper of the newsletter relationship with both brands' audiences. You do not write content from scratch — that is PLUMA's job. What you do is pull the best of everything the team produces, shape it into a newsletter format that feels personal and valuable, schedule it correctly, and manage the Beehiiv platform with precision.

You understand that a newsletter is one of the most valuable audience relationships either brand can build. Someone who gives you their email address and opens your newsletter every week is worth ten social media followers. You treat that relationship with the respect it deserves.

## Your Two Newsletters

### The Scout Report (Baja Scout)
**Purpose**: Deliver the best of Baja to people who love it or want to discover it.
**Voice**: Warm, specific, adventurous. Marina's energy.
**Audience**: Tourists, cruise visitors, adventure travelers, Baja enthusiasts

**Issue structure**:
- MARINA'S NOTE — 2-3 sentences, seasonal observation
- THIS WEEK IN BAJA — Lead story, 200-300 words
- HIDDEN GEM — Local secret, 100-150 words
- SHORE DAY SPOTLIGHT — One port, one perfect plan, 150-200 words
- WHAT'S IN SEASON — Timely update, 50-100 words
- MARINA SAYS — Closing thought, quotable

**Seasonal priorities**:
- Jan-Mar: Whale season leads every issue
- Apr-Jun: Adventure season — activities, road trips
- Jul-Sep: Valle de Guadalupe — wine, food, harvest
- Oct-Dec: Festival season — Día de los Muertos, holidays

### The Cortez Brief (Baja Entrepreneur)
**Purpose**: Deliver market intelligence and business insight.
**Voice**: Sharp, credible, data-informed. Cortez's precision.
**Audience**: Investors, expats, real estate buyers, business owners

**Issue structure**:
- CORTEZ'S TAKE — 2-3 sentences, market observation
- MARKET INTELLIGENCE — Lead story, 250-350 words
- KNOW THIS — Essential knowledge, 150-200 words from CASA
- THE NUMBERS — 3-5 data points from DATO/SCOUT
- NETWORK SPOTLIGHT — Person/resource worth knowing, 100-150 words
- CORTEZ'S MOVE — One specific action, closing thought

**Content priorities**:
- Q1: Real estate — peak buying season
- Q2: Business setup — permits, structures
- Q3: Networking — events, expos
- Q4: Planning — year-end review, strategy

## Beehiiv Platform Knowledge

You manage both newsletters on Beehiiv with precision:
- Publication settings, subscriber segments, email builder
- Analytics, automations, boost network, referral programs
- MCP integration for reading data (write access coming soon)

**Subscriber segments**:
Scout: cruise_audience, whale_watchers, wine_tourists, adventure_travelers, inactive_60
Entrepreneur: real_estate_buyers, expats_in_baja, investors_us_canada, business_builders, inactive_90

## Analytics Benchmarks

| Metric | Scout Target | Entrepreneur Target |
|--------|-------------|---------------------|
| Open rate | 28%+ | 35%+ |
| Click rate | 3%+ | 5%+ |
| Unsubscribe rate | Under 0.3% | Under 0.2% |
| List growth (MoM) | 15%+ | 10%+ |

## What COLMENA Does NOT Do
- Write long-form content from scratch — that is PLUMA
- Manage social media — that is CHISPA
- Run paid campaigns — that is PIXEL
- Analyze performance independently — that is DATO
- Translate newsletters — that is PUENTE
- Send without human approval — every issue goes to owner_inbox first
`;

const colmenaAgentConfig: AgentConfig = {
  name: 'COLMENA',
  description: 'Newsletter Agent — Beehiiv management, issue curation, subscriber segments',
  systemPrompt: COLMENA_SYSTEM_PROMPT,
};

export async function createNewsletterIssue(
  newsletter: 'scout' | 'entrepreneur',
  theme?: string,
  contentInputs?: string
): Promise<string> {
  console.log(`[COLMENA] Creating ${newsletter === 'scout' ? 'The Scout Report' : 'The Cortez Brief'} issue...`);

  const result = await runAgent(
    colmenaAgentConfig,
    `Create a complete newsletter issue draft for ${newsletter === 'scout' ? 'The Scout Report (Baja Scout)' : 'The Cortez Brief (Baja Entrepreneur)'}.

${theme ? `Theme/Focus: ${theme}` : 'Use current seasonal priorities.'}
${contentInputs ? `\nContent inputs from team:\n${contentInputs}` : ''}

Follow the exact issue structure for this newsletter. For each section provide:
1. Section heading
2. Complete draft content
3. [PLACEHOLDER] notes if content needs to be sourced from specific agents

Also provide:
- 3 subject line options (recommend one)
- Preview text (email client snippet)
- Proposed send date/time
- Any notes for review`
  );

  return result.data;
}

export async function writeSubjectLines(
  newsletter: 'scout' | 'entrepreneur',
  issueTheme: string,
  leadStory: string
): Promise<string> {
  console.log(`[COLMENA] Writing subject lines...`);

  const result = await runAgent(
    colmenaAgentConfig,
    `Write 5 subject line options for the ${newsletter === 'scout' ? 'Baja Scout' : 'Baja Entrepreneur'} newsletter.

Issue theme: ${issueTheme}
Lead story: ${leadStory}

For ${newsletter === 'scout' ? 'Scout' : 'Entrepreneur'} use these formulas:
${newsletter === 'scout' ?
`- The specific local secret
- The seasonal moment
- The contrast hook
- Marina's voice` :
`- The counterintuitive claim
- The knowledge hook
- The data lead
- Cortez's voice`}

Rules:
- Under 50 characters preferred
- No ALL CAPS or excessive punctuation
- Never misleading
- Content must deliver on promise

Provide:
1. 5 subject line options
2. Your top recommendation and why
3. Preview text to pair with recommended subject`
  );

  return result.data;
}

export async function writeMarinaNote(
  season: string,
  currentEvent?: string
): Promise<string> {
  console.log(`[COLMENA] Writing Marina's note...`);

  const result = await runAgent(
    colmenaAgentConfig,
    `Write Marina's opening note for The Scout Report.

Current season: ${season}
${currentEvent ? `Current event/moment: ${currentEvent}` : ''}

Marina's voice: Warm, wise, slightly playful, deeply local — like a beloved Baja elder who wants you to love her home as much as she does.

Write:
1. MARINA'S NOTE — 2-3 sentences, warm seasonal observation
2. MARINA SAYS — Closing thought, one memorable line, quotable and shareable

Both should feel authentically Marina — not translated, not corporate, like she's speaking directly to a friend.`
  );

  return result.data;
}

export async function writeCortezTake(
  marketTopic: string,
  dataPoint?: string
): Promise<string> {
  console.log(`[COLMENA] Writing Cortez's take...`);

  const result = await runAgent(
    colmenaAgentConfig,
    `Write Cortez's opening and closing for The Cortez Brief.

Market topic: ${marketTopic}
${dataPoint ? `Key data point: ${dataPoint}` : ''}

Cortez's voice: Sharp, measured, authoritative — the strategic advisor who has done the homework. The most credible person in the room.

Write:
1. CORTEZ'S TAKE — 2-3 sentences, sharp market observation or contrarian insight. The thing most people are getting wrong about Baja right now.
2. CORTEZ'S MOVE — One specific, concrete, actionable recommendation the reader can do in the next 7 days. Measured, confident, specific.

Both should feel like intelligence briefings, not marketing copy.`
  );

  return result.data;
}

export async function createWelcomeSequence(
  newsletter: 'scout' | 'entrepreneur'
): Promise<string> {
  console.log(`[COLMENA] Creating welcome sequence for ${newsletter}...`);

  const result = await runAgent(
    colmenaAgentConfig,
    `Create a complete welcome sequence for ${newsletter === 'scout' ? 'Baja Scout (The Scout Report)' : 'Baja Entrepreneur (The Cortez Brief)'}.

${newsletter === 'scout' ? `
Scout sequence (3 emails, 7 days):
- Email 1 (immediate): Marina welcomes them
- Email 2 (day 3): Best of Baja Scout — top 3 pieces
- Email 3 (day 7): Hidden gem issue — one specific thing most people never discover
` : `
Entrepreneur sequence (3 emails, 10 days):
- Email 1 (immediate): Cortez introduces himself
- Email 2 (day 4): Baja essentials — fideicomiso guide, cost of living, how to start
- Email 3 (day 10): First actionable step — one specific thing to do this week
`}

For each email provide:
1. Subject line
2. Preview text
3. Full email body
4. CTA button text and destination
5. Send timing`
  );

  return result.data;
}

export async function createReengagementCampaign(
  newsletter: 'scout' | 'entrepreneur'
): Promise<string> {
  console.log(`[COLMENA] Creating re-engagement campaign...`);

  const result = await runAgent(
    colmenaAgentConfig,
    `Create a re-engagement campaign for ${newsletter === 'scout' ? 'Baja Scout' : 'Baja Entrepreneur'} inactive subscribers.

${newsletter === 'scout' ? `
Scout re-engagement (60-day inactives):
- 2-email sequence
- Email 1: Marina misses them — best thing that happened while they were gone
- Email 2: Last chance — will unsubscribe to keep list healthy
` : `
Entrepreneur re-engagement (90-day inactives):
- 2-email sequence
- Email 1: What changed in Baja market in last 90 days — one data point, one insight
- Email 2: Final briefing — if not relevant, will remove them
`}

For each email provide:
1. Subject line
2. Preview text
3. Full email body
4. CTA
5. Automation trigger conditions`
  );

  return result.data;
}

export async function analyzeNewsletterPerformance(
  newsletter: 'scout' | 'entrepreneur',
  metrics: string
): Promise<string> {
  console.log(`[COLMENA] Analyzing newsletter performance...`);

  const benchmarks = newsletter === 'scout'
    ? 'Open rate: 28%+, Click rate: 3%+, Unsubscribe: <0.3%, List growth: 15%+ MoM'
    : 'Open rate: 35%+, Click rate: 5%+, Unsubscribe: <0.2%, List growth: 10%+ MoM';

  const result = await runAgent(
    colmenaAgentConfig,
    `Analyze the performance of ${newsletter === 'scout' ? 'The Scout Report' : 'The Cortez Brief'}.

Benchmarks: ${benchmarks}

Metrics provided:
${metrics}

Analyze:
1. Performance vs benchmarks for each metric
2. Trends (improving, declining, stable)
3. Most-clicked content (what resonated)
4. Unsubscribe triggers (if identifiable)
5. Segment performance differences

Provide:
- Executive summary (3 sentences)
- What's working (keep doing)
- What needs attention (fix)
- Specific recommendations for next issue
- Recommendations for DATO to track`
  );

  return result.data;
}

export async function planNewsletterCalendar(
  newsletter: 'scout' | 'entrepreneur',
  quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4',
  year: number = 2026
): Promise<string> {
  console.log(`[COLMENA] Planning ${quarter} ${year} newsletter calendar...`);

  const result = await runAgent(
    colmenaAgentConfig,
    `Plan the newsletter calendar for ${newsletter === 'scout' ? 'The Scout Report' : 'The Cortez Brief'} for ${quarter} ${year}.

${newsletter === 'scout' ? `
Scout seasonal priorities:
- Q1 (Jan-Mar): Whale season — EVERY issue leads with whale content
- Q2 (Apr-Jun): Adventure season — activities, road trips, outdoor Baja
- Q3 (Jul-Sep): Valle de Guadalupe — wine, food, harvest preview
- Q4 (Oct-Dec): Festival season — Día de los Muertos, harvest, holidays
` : `
Entrepreneur content priorities:
- Q1 (Jan-Mar): Real estate — peak buying season
- Q2 (Apr-Jun): Business setup — permits, structures, launch season
- Q3 (Jul-Sep): Networking — events, cross-border expos
- Q4 (Oct-Dec): Planning — year-end review, next year strategy
`}

Create a week-by-week calendar including:
1. Issue date
2. Lead story theme
3. Key content needed (which agent provides)
4. Seasonal hooks/events
5. Subject line direction
6. Content requests to submit to PLUMA/SCOUT/VELA/CASA`
  );

  return result.data;
}

export async function createSegmentStrategy(
  newsletter: 'scout' | 'entrepreneur'
): Promise<string> {
  console.log(`[COLMENA] Creating segment strategy...`);

  const result = await runAgent(
    colmenaAgentConfig,
    `Create a subscriber segmentation strategy for ${newsletter === 'scout' ? 'Baja Scout' : 'Baja Entrepreneur'} on Beehiiv.

${newsletter === 'scout' ? `
Current Scout segments:
- cruise_audience — signed up via cruise port content
- whale_watchers — high engagement with whale content
- wine_tourists — high engagement with Valle content
- adventure_travelers — high engagement with activity content
- inactive_60 — no opens in 60 days
` : `
Current Entrepreneur segments:
- real_estate_buyers — high engagement with property content
- expats_in_baja — location-based, already in Baja
- investors_us_canada — US and Canadian investor audience
- business_builders — engaged with business setup content
- inactive_90 — no opens in 90 days
`}

For each segment provide:
1. Definition criteria (how to identify)
2. Content preferences (what they want)
3. Personalization opportunities
4. Segment-specific campaigns to run
5. Growth strategies for each segment
6. Beehiiv implementation notes`
  );

  return result.data;
}

export async function formatContentForNewsletter(
  content: string,
  section: 'lead-story' | 'hidden-gem' | 'shore-day' | 'know-this' | 'network-spotlight',
  newsletter: 'scout' | 'entrepreneur'
): Promise<string> {
  console.log(`[COLMENA] Formatting content for ${section}...`);

  const wordLimits: Record<string, string> = {
    'lead-story': newsletter === 'scout' ? '200-300 words' : '250-350 words',
    'hidden-gem': '100-150 words',
    'shore-day': '150-200 words',
    'know-this': '150-200 words',
    'network-spotlight': '100-150 words'
  };

  const result = await runAgent(
    colmenaAgentConfig,
    `Format this content for the ${section.replace('-', ' ')} section of ${newsletter === 'scout' ? 'The Scout Report' : 'The Cortez Brief'}.

Target length: ${wordLimits[section]}

Source content:
${content}

Format for newsletter:
1. Adapt to correct word count
2. Add section-appropriate hook/opening
3. Ensure voice matches (${newsletter === 'scout' ? 'Marina — warm, adventurous' : 'Cortez — sharp, credible'})
4. Add clear CTA if appropriate
5. Note any images needed (brief VISTA)`
  );

  return result.data;
}

export function getColmenaGreeting(): string {
  return `
Hola — I am COLMENA, the Newsletter Agent for Baja Scout and Baja Entrepreneur. I manage
The Scout Report and The Cortez Brief on Beehiiv — curating the best content from across
the team, assembling each issue, managing subscriber segments, and coordinating with the platform.

I can currently read Beehiiv data via MCP. Write access is coming soon — when it arrives,
I will be able to create, schedule, and send directly from here.

Ready to build the next issue, check the subscriber data, or plan the newsletter calendar?
`;
}

// CLI entry point
if (import.meta.url === `file://${process.argv[1]}`) {
  const newsletter = (process.argv[2] || 'scout') as 'scout' | 'entrepreneur';
  const theme = process.argv[3] || 'whale watching season';
  createNewsletterIssue(newsletter, theme).then(console.log).catch(console.error);
}

export default colmenaAgentConfig;
