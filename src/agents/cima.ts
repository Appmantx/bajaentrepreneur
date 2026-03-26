import { runAgent, AgentConfig } from './base.js';
import { searchPerplexity } from '../tools/perplexity.js';

const CIMA_SYSTEM_PROMPT = `# CIMA — SEO Agent
## Baja Scout & Baja Entrepreneur

## Identity

You are CIMA, the SEO Agent for Baja Scout and Baja Entrepreneur. Your name means "summit" or "peak" in Spanish — and that is your singular obsession. Page one. Position one. The top of the results page where the audience is already looking, already searching, already raising their hand and saying they want exactly what these brands offer.

You do not create content — PLUMA does that. You do not set the business strategy for what to rank for — PIXEL does that. You are the technical and tactical expert who makes the content rankable, the site architecture logical, and the keyword strategy precise enough to win in competitive search landscapes.

You think in search intent. Before you touch a single piece of content, you ask: what is this person actually trying to find? Are they researching? Comparing? Ready to act? The answer changes everything — the keyword target, the content structure, the meta description, the internal linking strategy.

You are rigorous without being robotic. Great SEO in 2025+ means content that is genuinely useful, written for humans first and search engines second — because that is exactly what search engines now reward.

## Baja Scout — SEO Mission

Baja-specific travel content is a winnable niche. Major travel publications cover Mexico broadly but rarely go deep on Baja.

**Top keyword categories**:
- Cruise/shore excursion: "things to do in Ensenada from cruise ship", "Ensenada shore excursions"
- Whale watching: "whale watching Baja California", "whale shark snorkeling La Paz"
- Destinations: "Valle de Guadalupe wine tasting", "La Paz travel guide", "Baja road trip itinerary"
- Food/wine: "fish tacos Ensenada", "Valle de Guadalupe wineries"
- First-timer: "is Baja California safe to visit", "Baja California travel tips"

## Baja Entrepreneur — SEO Mission

High-intent, high-value niche with relatively thin competition. Someone searching "how to buy property in Baja California" is extremely valuable.

**Top keyword categories**:
- Real estate: "buying property in Baja California", "fideicomiso explained", "foreigner buying property Mexico"
- Investment: "investing in Baja California Mexico", "Baja California Sur investment"
- Expat: "living in Baja California as an expat", "cost of living La Paz Mexico"
- Business: "starting a business in Mexico as a foreigner", "Mexico business visa"
- Legal: "notario Mexico real estate", "ejido land Mexico warning"

## Core Responsibilities

### Keyword Research Process
1. Seed keyword identification
2. Intent classification (informational, navigational, commercial investigation, transactional)
3. Competition and difficulty assessment
4. Opportunity scoring (volume + competition + intent + strategic value)
5. Keyword brief delivery to PLUMA and PIXEL

### On-Page Optimization
- Title tags: Primary keyword near front, under 60 characters, compelling
- Meta descriptions: 150-160 characters, natural keyword inclusion, clear value proposition
- Header structure: One H1, H2s for major sections with secondary keywords, logical outline
- Keyword placement: H1, first 100 words, at least two H2s, natural distribution
- Image optimization: Descriptive alt text, SEO-friendly file names
- URL structure: Short, descriptive, keyword-inclusive, lowercase with hyphens
- Internal linking: 2-3 related links minimum, pillar-cluster connections, descriptive anchor text

### Technical SEO
- Page speed: Core Web Vitals targets (LCP <2.5s, CLS <0.1, INP <200ms)
- Crawlability: XML sitemap, robots.txt, canonical tags, proper redirects
- Schema markup: Article, LocalBusiness, FAQ, Review, BreadcrumbList
- Mobile optimization: Mobile-first, proper tap targets, no horizontal scroll
- HTTPS: Required for both domains

### Local SEO
- Google Business Profile optimization
- City-specific landing pages
- Local link building through directories and partnerships

## SEO Standards — Non-Negotiables
1. Keyword research precedes content creation
2. One primary keyword per page
3. Search intent match is everything
4. Content quality is the foundation
5. Never sacrifice readability for SEO
6. Cannibalization is the enemy
7. Internal linking is non-negotiable
8. Patience is required — 3-6 months to rank, compound value builds over 12-24 months

## What CIMA Does NOT Do
- Write final content — that is PLUMA
- Set business strategy — that is PIXEL
- Run paid search — that is PIXEL
- Conduct external research — that is SCOUT
- Implement technical fixes — specify only, dev team implements
- Manage social media — that is CHISPA
`;

const cimaAgentConfig: AgentConfig = {
  name: 'CIMA',
  description: 'SEO Agent — Keyword research, on-page optimization, content briefs, technical SEO',
  systemPrompt: CIMA_SYSTEM_PROMPT,
};

export async function createKeywordBrief(
  topic: string,
  brand: 'scout' | 'entrepreneur' = 'entrepreneur'
): Promise<string> {
  console.log(`[CIMA] Creating keyword brief for "${topic}"...`);

  const perplexityData = await searchPerplexity(`${topic} Baja California search keywords SEO competition 2026`);

  const result = await runAgent(
    cimaAgentConfig,
    `Create a comprehensive keyword brief for PLUMA before they write content on this topic.

Topic: ${topic}
Brand: ${brand === 'scout' ? 'Baja Scout' : 'Baja Entrepreneur'}

Perplexity research:
${perplexityData}

Deliver:
1. Primary keyword (the main target)
2. Secondary keywords (related terms to include naturally)
3. LSI keywords (semantically related terms)
4. Search intent classification
5. Recommended content type and length
6. Top 3 competing pages and what they are missing
7. Featured snippet and People Also Ask opportunities
8. Internal linking suggestions
9. Recommended H2 structure
10. Meta title and description recommendations`
  );

  return result.data;
}

export async function optimizeContent(
  content: string,
  targetKeyword: string,
  brand: 'scout' | 'entrepreneur' = 'entrepreneur'
): Promise<string> {
  console.log(`[CIMA] Optimizing content for "${targetKeyword}"...`);

  const result = await runAgent(
    cimaAgentConfig,
    `Review and optimize this content for SEO. Do not rewrite PLUMA's work — only refine structure and optimization layer.

Target keyword: ${targetKeyword}
Brand: ${brand === 'scout' ? 'Baja Scout' : 'Baja Entrepreneur'}

Content to optimize:
${content}

Provide:
1. Optimized title tag (under 60 characters)
2. Optimized meta description (150-160 characters)
3. H1 recommendation
4. Header structure audit (are H2s/H3s optimized?)
5. Keyword placement check (first 100 words, H1, H2s)
6. Internal linking recommendations
7. Image alt text suggestions
8. URL slug recommendation
9. Schema markup recommendations
10. Specific changes needed (with line references if possible)`
  );

  return result.data;
}

export async function performContentGapAnalysis(
  topic: string,
  brand: 'scout' | 'entrepreneur' = 'entrepreneur'
): Promise<string> {
  console.log(`[CIMA] Performing content gap analysis for ${topic}...`);

  const perplexityData = await searchPerplexity(`${topic} best content ranking Google 2026 what is missing`);

  const result = await runAgent(
    cimaAgentConfig,
    `Perform a content gap analysis for this topic.

Topic: ${topic}
Brand: ${brand === 'scout' ? 'Baja Scout' : 'Baja Entrepreneur'}

Perplexity competitor research:
${perplexityData}

Analyze:
1. What content currently ranks for this topic?
2. What are the top 5 competitors doing well?
3. What gaps exist in the current content landscape?
4. What questions are not being answered?
5. What angle could we take to create 10x better content?
6. What keywords are competitors ranking for that we could target?
7. Featured snippet opportunities
8. Recommended content to create to fill gaps
9. Priority ranking (which gaps to fill first)
10. Estimated difficulty and timeline to rank`
  );

  return result.data;
}

export async function createTechnicalAudit(
  siteUrl: string,
  brand: 'scout' | 'entrepreneur' = 'entrepreneur'
): Promise<string> {
  console.log(`[CIMA] Creating technical SEO audit checklist...`);

  const result = await runAgent(
    cimaAgentConfig,
    `Create a technical SEO audit checklist for the ${brand === 'scout' ? 'Baja Scout' : 'Baja Entrepreneur'} website.

Site: ${siteUrl}

Provide an audit framework covering:
1. Page Speed / Core Web Vitals checklist
2. Crawlability audit items (sitemap, robots.txt, canonical tags)
3. Mobile optimization checklist
4. Schema markup requirements
5. HTTPS and security checks
6. Index coverage items to verify
7. Internal linking health checks
8. Duplicate content checks
9. 404 and redirect audit
10. Priority action items (what to fix first)

Format as an actionable checklist the dev team can work through.`
  );

  return result.data;
}

export async function createLocalSEOStrategy(
  city: string,
  brand: 'scout' | 'entrepreneur' = 'entrepreneur'
): Promise<string> {
  console.log(`[CIMA] Creating local SEO strategy for ${city}...`);

  const result = await runAgent(
    cimaAgentConfig,
    `Create a local SEO strategy for ${city}, Baja California.

Brand: ${brand === 'scout' ? 'Baja Scout' : 'Baja Entrepreneur'}

Include:
1. Google Business Profile optimization checklist
2. Local keyword targets for this city
3. City-specific landing page recommendations
4. Local link building opportunities
5. Citation sources (directories to list in)
6. Local content ideas
7. Review generation strategy
8. "Near me" keyword opportunities
9. Competitor local presence analysis
10. Priority actions`
  );

  return result.data;
}

export async function createSeasonalSEOCalendar(
  brand: 'scout' | 'entrepreneur' = 'scout'
): Promise<string> {
  console.log(`[CIMA] Creating seasonal SEO calendar...`);

  const result = await runAgent(
    cimaAgentConfig,
    `Create a seasonal SEO content calendar for ${brand === 'scout' ? 'Baja Scout' : 'Baja Entrepreneur'}.

For Baja Scout focus on:
- Whale watching season (searches peak Dec-Jan, content needed by Oct)
- Valle de Guadalupe harvest (searches peak Aug-Sep)
- Cruise season patterns
- Summer travel planning
- Holiday travel

For Baja Entrepreneur focus on:
- Real estate buying seasons
- Tax planning timing
- Snowbird migration patterns
- Investment planning cycles

Provide:
1. Month-by-month keyword focus areas
2. When to publish content (lead time before search peaks)
3. Specific content pieces needed for each season
4. Google Trends patterns to monitor
5. Evergreen vs. seasonal content balance
6. Update schedule for existing seasonal content`
  );

  return result.data;
}

export async function createLinkBuildingStrategy(
  brand: 'scout' | 'entrepreneur' = 'entrepreneur'
): Promise<string> {
  console.log(`[CIMA] Creating link building strategy...`);

  const result = await runAgent(
    cimaAgentConfig,
    `Create a link building strategy for ${brand === 'scout' ? 'Baja Scout' : 'Baja Entrepreneur'}.

Include:
1. Target publications and websites for outreach
2. Guest posting opportunities
3. Partnership link opportunities
4. Broken link building targets
5. Content that naturally attracts links
6. Local/regional link sources
7. Industry-specific link opportunities
8. Competitor backlink analysis approach
9. Link quality criteria
10. Outreach templates and approach
11. What to avoid (link schemes, paid links, PBNs)
12. Monthly link building targets`
  );

  return result.data;
}

export async function writePillarClusterStrategy(
  pillarTopic: string,
  brand: 'scout' | 'entrepreneur' = 'entrepreneur'
): Promise<string> {
  console.log(`[CIMA] Creating pillar-cluster strategy for "${pillarTopic}"...`);

  const result = await runAgent(
    cimaAgentConfig,
    `Create a pillar page and cluster content strategy for this topic.

Pillar topic: ${pillarTopic}
Brand: ${brand === 'scout' ? 'Baja Scout' : 'Baja Entrepreneur'}

Provide:
1. Pillar page concept and target keyword
2. Pillar page recommended structure and length
3. 8-12 cluster content pieces with target keywords
4. Internal linking map (how everything connects)
5. Content creation sequence (what to write first)
6. Combined traffic potential estimate
7. Competition analysis for the pillar keyword
8. Featured snippet strategy
9. Update and maintenance plan
10. Success metrics`
  );

  return result.data;
}

export async function analyzeKeywordCannibalization(
  keywords: string[]
): Promise<string> {
  console.log(`[CIMA] Analyzing keyword cannibalization...`);

  const result = await runAgent(
    cimaAgentConfig,
    `Analyze these keywords for potential cannibalization issues.

Keywords to analyze:
${keywords.map((k, i) => `${i + 1}. ${k}`).join('\n')}

For each keyword pair that might compete:
1. Identify the conflict
2. Explain why they are competing
3. Recommend resolution (consolidate, differentiate, or redirect)
4. Provide specific action items

Also provide:
- Keyword mapping recommendations
- How to prevent future cannibalization
- Content audit checklist for existing pages`
  );

  return result.data;
}

export function getCimaGreeting(): string {
  return `
Hola — I am CIMA, the SEO Agent for Baja Scout and Baja Entrepreneur. I make sure the content
this team produces gets found by the people already searching for exactly what these brands offer.

I work before PLUMA writes and after PLUMA finishes — keyword strategy at the front end,
on-page optimization at the back end. Give me a content topic and I will tell you exactly
what to target, how to structure it, and what it will take to rank.

What are we trying to rank for?
`;
}

// CLI entry point
if (import.meta.url === `file://${process.argv[1]}`) {
  const task = process.argv[2] || 'keyword-brief';
  if (task === 'keyword-brief') {
    const topic = process.argv[3] || 'whale watching Baja California';
    createKeywordBrief(topic, 'scout').then(console.log).catch(console.error);
  } else if (task === 'gap-analysis') {
    const topic = process.argv[3] || 'fideicomiso Mexico';
    performContentGapAnalysis(topic, 'entrepreneur').then(console.log).catch(console.error);
  }
}

export default cimaAgentConfig;
