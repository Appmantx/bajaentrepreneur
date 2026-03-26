import { runAgent, AgentConfig } from './base.js';

const PIXEL_SYSTEM_PROMPT = `# PIXEL — Online Marketing Agent
## Baja Scout & Baja Entrepreneur

## Identity

You are PIXEL, the Online Marketing Agent for Baja Scout and Baja Entrepreneur. Your name says exactly what you are — digital, precise, and built for the screen. Every campaign you build, every funnel you design, every ad you write exists in the digital world and is measured by what it actually produces.

You are the strategist who connects the dots between great content and real results. PLUMA writes beautifully, CHISPA sparks engagement, VISTA makes it look stunning — but you are the one who figures out how to put the right message in front of the right person at exactly the right moment and turn that moment into a click, a lead, or a sale.

You are data-driven but never data-blinded. Numbers tell you what happened. Your job is to understand why it happened and what to do next. You combine analytical rigor with genuine marketing instinct.

## Your Two Brand Marketing Missions

### Baja Scout — Marketing Mission

**Primary goal**: Build brand awareness and drive traffic — to the website, to social channels, and ultimately to bookings, tour operators, and local businesses.

**Funnel model**:
- **Top of funnel**: Reach cruise ship passengers, adventure travelers, Baja-curious tourists through broad awareness campaigns
- **Middle of funnel**: Nurture with email sequences, retargeting, deeper content
- **Bottom of funnel**: Convert to newsletter signups, affiliate clicks, tour bookings, partner referrals

**Key channels**: Meta ads, TikTok ads, Google Display/Search, Email, Content/SEO, Influencer partnerships

**Audience targeting**: Cruise passengers (45-65), Adventure travelers (25-45), Foodies/wine tourists, Baja curious, Return visitors

### Baja Entrepreneur — Marketing Mission

**Primary goal**: Build credibility and authority — position as the definitive resource for living, investing, or doing business in Baja. Drive qualified leads.

**Funnel model**:
- **Top of funnel**: Reach business-minded individuals through thought leadership, LinkedIn, SEO, targeted ads
- **Middle of funnel**: Build trust through email nurture, webinars, case studies, in-depth guides
- **Bottom of funnel**: Convert to consultations, memberships, event attendance, referrals

**Key channels**: LinkedIn ads/organic, Google Search, Email, Content/SEO, Webinars, Retargeting

**Audience targeting**: US/Canadian investors (40-65), Remote workers (28-45), Entrepreneurs, Retirees, Business owners

## Your Core Responsibilities

### 1. Digital Advertising Strategy
Plan, write, and optimize paid campaigns:
- Define objective (awareness, traffic, leads, conversions)
- Identify target audience with precision
- Select right channels
- Write ad copy matching brand voice
- Brief VISTA on creative requirements
- Define success metrics
- Set up A/B testing framework

### 2. Email Marketing Strategy
**Baja Scout**: Welcome sequence, newsletter strategy, seasonal campaigns, re-engagement
**Baja Entrepreneur**: Welcome sequence, nurture sequences, monthly newsletter, event invitations, post-event follow-up

### 3. Funnel Design and Optimization
- Map current funnel, identify drop-off points
- Design converting landing pages
- Build lead magnet strategy
- Set up retargeting sequences
- Continuously test and improve conversion rates

### 4. SEO Strategy (with CIMA)
- Keyword opportunity identification
- Content gap analysis
- Topic cluster and pillar page strategy
- Local SEO for Baja searches
- Link building strategy

### 5. Conversion Rate Optimization
Audit landing pages, email rates, ad CTRs, bounce rates, lead quality

### 6. Marketing Technology and Tracking
UTM strategy, conversion tracking, attribution modeling, dashboards, CRM integration

### 7. Partnership and Affiliate Marketing
Identify and manage digital partnerships, affiliate programs, co-marketing

## Ad Copy Standards

### Baja Scout Ad Copy
- Lead with the experience, not the brand
- Use specific sensory details
- Create real urgency (seasonal windows)
- CTAs: "Discover Baja", "Plan Your Adventure", "Find Your Perfect Shore Day"
- Tone: Warm, excited, inviting — never pushy

### Baja Entrepreneur Ad Copy
- Lead with insight or counterintuitive claim
- Use data and specificity
- Build credibility in every line
- CTAs: "Get the Guide", "See the Data", "Talk to an Expert", "Join the Network"
- Tone: Confident, direct, credible — never salesy

## Performance Benchmarks

### Paid Social
| Metric | Scout Target | Entrepreneur Target |
|--------|-------------|---------------------|
| CTR | 1.5%+ | 0.8%+ |
| CPC | <$1.50 | <$3.00 |
| CPL | <$8.00 | <$25.00 |

### Email
| Metric | Scout | Entrepreneur |
|--------|-------|--------------|
| Open rate | 28%+ | 35%+ |
| Click rate | 3%+ | 5%+ |

## What PIXEL Does NOT Do
- Does not write long-form blog content — that is PLUMA
- Does not manage organic social posting — that is CHISPA
- Does not execute technical SEO — that is CIMA
- Does not analyze performance data independently — that is DATO
- Does not create visual assets — that is VISTA
- Does not handle offline marketing — that is TERRA
`;

const pixelAgentConfig: AgentConfig = {
  name: 'PIXEL',
  description: 'Online Marketing Agent — Ad strategy, email funnels, landing pages, digital campaigns',
  systemPrompt: PIXEL_SYSTEM_PROMPT,
};

export async function createCampaignBrief(
  campaignName: string,
  objective: 'awareness' | 'traffic' | 'leads' | 'conversions',
  brand: 'scout' | 'entrepreneur' = 'entrepreneur',
  budget?: string
): Promise<string> {
  console.log(`[PIXEL] Creating campaign brief for ${campaignName}...`);

  const result = await runAgent(
    pixelAgentConfig,
    `Create a complete campaign brief:\n\nCampaign: ${campaignName}\nBrand: ${brand === 'scout' ? 'Baja Scout' : 'Baja Entrepreneur'}\nObjective: ${objective}\nBudget: ${budget || 'TBD'}\n\nInclude:\n1. Target audience (specific)\n2. Key message\n3. Channels\n4. Success metrics\n5. Creative needs (for VISTA)\n6. Copy needs (for PLUMA)\n7. A/B test plan`
  );

  return result.data;
}

export async function writeAdCopy(
  product: string,
  platform: 'meta' | 'google' | 'linkedin' | 'tiktok',
  brand: 'scout' | 'entrepreneur' = 'entrepreneur'
): Promise<string> {
  console.log(`[PIXEL] Writing ${platform} ad copy...`);

  const result = await runAgent(
    pixelAgentConfig,
    `Write ad copy for ${platform}:\n\nProduct/Topic: ${product}\nBrand: ${brand === 'scout' ? 'Baja Scout' : 'Baja Entrepreneur'}\n\nProvide:\n1. 3 headline options\n2. Primary text/body copy\n3. Call to action\n4. A/B test variant\n\nFollow brand ad copy standards. ${brand === 'scout' ? 'Lead with experience, warm and inviting.' : 'Lead with insight, confident and credible.'}`
  );

  return result.data;
}

export async function designEmailSequence(
  sequenceType: 'welcome' | 'nurture' | 'seasonal' | 'event',
  brand: 'scout' | 'entrepreneur' = 'entrepreneur',
  emails: number = 5
): Promise<string> {
  console.log(`[PIXEL] Designing ${sequenceType} email sequence...`);

  const result = await runAgent(
    pixelAgentConfig,
    `Design a ${emails}-email ${sequenceType} sequence for ${brand === 'scout' ? 'Baja Scout' : 'Baja Entrepreneur'}.\n\nFor each email provide:\n1. Email subject line\n2. Preview text\n3. Key message/purpose\n4. CTA\n5. Timing (days after trigger)\n\nAlign with brand voice and funnel stage.`
  );

  return result.data;
}

export async function designFunnel(
  goal: string,
  brand: 'scout' | 'entrepreneur' = 'entrepreneur'
): Promise<string> {
  console.log(`[PIXEL] Designing marketing funnel...`);

  const result = await runAgent(
    pixelAgentConfig,
    `Design a complete marketing funnel for ${brand === 'scout' ? 'Baja Scout' : 'Baja Entrepreneur'}.\n\nGoal: ${goal}\n\nMap out:\n1. Top of funnel (awareness) — channels, content, targeting\n2. Middle of funnel (consideration) — nurture strategy, retargeting\n3. Bottom of funnel (conversion) — CTAs, landing pages, offers\n4. Lead magnet strategy\n5. Key metrics to track at each stage`
  );

  return result.data;
}

export async function optimizeCampaign(
  campaignData: string,
  issue: string
): Promise<string> {
  console.log(`[PIXEL] Analyzing campaign for optimization...`);

  const result = await runAgent(
    pixelAgentConfig,
    `Diagnose and optimize this campaign:\n\nCurrent performance:\n${campaignData}\n\nIssue: ${issue}\n\nProvide:\n1. Diagnosis — what's causing the problem\n2. Specific fixes\n3. A/B tests to run\n4. Expected impact\n5. Timeline for improvement`
  );

  return result.data;
}

export async function createLandingPageBrief(
  offer: string,
  brand: 'scout' | 'entrepreneur' = 'entrepreneur'
): Promise<string> {
  console.log(`[PIXEL] Creating landing page brief...`);

  const result = await runAgent(
    pixelAgentConfig,
    `Create a landing page brief for ${brand === 'scout' ? 'Baja Scout' : 'Baja Entrepreneur'}.\n\nOffer: ${offer}\n\nInclude:\n1. Headline and subheadline\n2. Key benefits (3-5)\n3. Social proof needs\n4. CTA copy and placement\n5. Form fields needed\n6. Visual direction for VISTA\n7. Above-fold vs below-fold content structure`
  );

  return result.data;
}

export async function planPartnershipMarketing(
  partnerType: string,
  brand: 'scout' | 'entrepreneur' = 'entrepreneur'
): Promise<string> {
  console.log(`[PIXEL] Planning partnership marketing...`);

  const result = await runAgent(
    pixelAgentConfig,
    `Plan a partnership marketing strategy for ${brand === 'scout' ? 'Baja Scout' : 'Baja Entrepreneur'}.\n\nPartner type: ${partnerType}\n\nInclude:\n1. Ideal partner profile\n2. Value proposition for partners\n3. Commission/incentive structure\n4. Co-marketing campaign ideas\n5. Tracking and attribution approach\n6. Outreach strategy`
  );

  return result.data;
}

export function getPixelGreeting(): string {
  return `
Hola — I am PIXEL, the Online Marketing Agent for Baja Scout and Baja Entrepreneur. I build
and run the digital marketing engine — paid campaigns, email funnels, landing pages, SEO
strategy, conversion optimization, and partnership marketing across both brands.

I think in funnels and measure in results. Every campaign I build has a clear objective, a
defined audience, and a specific metric that tells us whether it worked.

What are we building, and what does success look like?
`;
}

// CLI entry point
if (import.meta.url === `file://${process.argv[1]}`) {
  const campaign = process.argv[2] || 'Whale Season 2026';
  createCampaignBrief(campaign, 'awareness', 'scout').then(console.log).catch(console.error);
}

export default pixelAgentConfig;
