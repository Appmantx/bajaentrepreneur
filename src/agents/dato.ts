import { runAgent, AgentConfig } from './base.js';

const DATO_SYSTEM_PROMPT = `# DATO — Analytics Agent
## Baja Scout & Baja Entrepreneur

## Identity

You are DATO, the Analytics Agent for Baja Scout and Baja Entrepreneur. Your name means "data" or "fact" in Spanish — and facts are the only currency you trade in. Not opinions. Not hunches. Not "I feel like this is working." Facts. Numbers. Patterns. The cold, clear signal inside the noise that tells this team what is actually happening and what to do about it.

You are the agent who keeps the whole operation honest. PLUMA writes with passion, CHISPA creates with energy, PIXEL campaigns with ambition — and you are the one who comes back and tells everyone which of those efforts actually moved the needle and which ones looked good but produced nothing.

You are sharp, objective, and relentlessly actionable. You do not produce data dumps. You find the three numbers that matter most, tell the team what they mean, and deliver a specific recommendation for what to do differently.

## Baja Scout — Analytics Mission

Baja Scout is primarily an awareness and engagement brand. Key metrics:
- **Organic search traffic**: Which content drives most organic sessions?
- **Social engagement**: Saves, shares, comments matter more than likes
- **Email list growth**: Open rates 28%+, click rates 3%+
- **Content performance by topic**: Whale watching, Valle, shore days, food
- **Audience retention**: Return visitor rate 25%+
- **Seasonal performance**: Whale season, harvest festival, cruise season

## Baja Entrepreneur — Analytics Mission

Baja Entrepreneur is a lead generation and authority brand. Key metrics:
- **Lead generation**: Volume and source breakdown
- **Lead quality**: Downstream conversion rates
- **High-intent keyword traffic**: "buying property in Baja," "fideicomiso explained"
- **Email nurture performance**: Open rates 35%+, click rates 5%+
- **LinkedIn performance**: Engagement rate 3%+
- **Cost per qualified lead**: Under $25 USD target
- **Event registration**: Invitation to registration to attendance rates

## Reporting Tiers

**Weekly snapshot**: 5-7 key numbers, one highlight, one flag
**Monthly report**: Full channel breakdown, top 10 content, 3 specific recommendations
**Quarterly review**: 90-day trends, content ROI, channel efficiency, strategic recommendations

## Analytics Philosophy

- Lead with the finding, not the data
- Be specific about what to do next
- Separate signal from noise
- Honest about data quality
- Connect dots across agents

## What DATO Does NOT Do
- Make creative decisions — provide data, not direction
- Set marketing strategy — inform decisions, not make them
- Manufacture certainty — honest when data is inconclusive
- Conduct external research — that is SCOUT
`;

const datoAgentConfig: AgentConfig = {
  name: 'DATO',
  description: 'Analytics Agent — Performance reporting, content analysis, audience intelligence',
  systemPrompt: DATO_SYSTEM_PROMPT,
};

export async function generateWeeklySnapshot(
  brand: 'scout' | 'entrepreneur' | 'both' = 'both'
): Promise<string> {
  console.log(`[DATO] Generating weekly snapshot...`);

  const result = await runAgent(
    datoAgentConfig,
    `Generate a weekly performance snapshot template for ${brand === 'both' ? 'both Baja Scout and Baja Entrepreneur' : brand === 'scout' ? 'Baja Scout' : 'Baja Entrepreneur'}.

Create a template that includes:
1. The 5-7 key metrics to track weekly
2. Format for presenting each metric (current value, vs last week, vs target)
3. "Highlight of the week" section template
4. "Flag / needs attention" section template
5. Quick action items format

This should be a concise Monday morning pulse check — no deep analysis, just the numbers that matter.`
  );

  return result.data;
}

export async function generateMonthlyReport(
  brand: 'scout' | 'entrepreneur' = 'entrepreneur',
  performanceData?: string
): Promise<string> {
  console.log(`[DATO] Generating monthly report for ${brand === 'scout' ? 'Baja Scout' : 'Baja Entrepreneur'}...`);

  const result = await runAgent(
    datoAgentConfig,
    `Generate a monthly performance report ${performanceData ? 'analysis' : 'template'} for ${brand === 'scout' ? 'Baja Scout' : 'Baja Entrepreneur'}.

${performanceData ? `Performance data to analyze:\n${performanceData}` : 'Create a comprehensive template that includes:'}

1. Executive summary (3 sentences max — the findings that matter)
2. Channel breakdown structure:
   - Organic search (traffic, top pages, keyword rankings)
   - Social media (engagement by platform, top posts)
   - Email (list size, open rate, click rate, growth)
   - Paid campaigns (spend, CPC, CPL, ROAS)
3. Top 10 content pieces by traffic and engagement
4. Lead generation summary (Entrepreneur) or audience growth (Scout)
5. Month-over-month comparisons
6. 3 specific recommendations with:
   - What to do
   - Why the data supports it
   - Which agent needs to act

${performanceData ? 'Analyze the provided data and deliver actionable insights.' : 'Make this template actionable and focused on decisions, not just numbers.'}`
  );

  return result.data;
}

export async function analyzeContentPerformance(
  contentType: 'blog' | 'social' | 'email' | 'video',
  contentDescription: string,
  metrics?: string
): Promise<string> {
  console.log(`[DATO] Analyzing ${contentType} content performance...`);

  const result = await runAgent(
    datoAgentConfig,
    `Analyze the performance of this ${contentType} content.

Content: ${contentDescription}
${metrics ? `Metrics provided:\n${metrics}` : 'No metrics provided — create an analysis framework.'}

${metrics ? 'Analyze and provide:' : 'Create an analysis template that covers:'}

For blog content:
- Organic sessions and traffic sources
- Time on page and scroll depth
- Bounce rate and next page flow
- Conversions generated
- Keyword ranking position
- Backlinks earned

For social content:
- Reach and impressions
- Engagement rate breakdown
- Saves and shares (high-value signals)
- Link clicks
- Video completion rate (if applicable)

For email content:
- Open rate vs benchmark
- Click rate and top links
- Unsubscribe rate
- Conversion rate

${metrics ? 'Conclude with specific recommendations: what worked, what did not, what to do next.' : 'Include benchmark targets for each metric.'}`
  );

  return result.data;
}

export async function analyzeAudience(
  brand: 'scout' | 'entrepreneur' = 'entrepreneur',
  audienceData?: string
): Promise<string> {
  console.log(`[DATO] Analyzing audience for ${brand === 'scout' ? 'Baja Scout' : 'Baja Entrepreneur'}...`);

  const result = await runAgent(
    datoAgentConfig,
    `Provide an audience intelligence analysis ${audienceData ? 'based on this data' : 'framework'} for ${brand === 'scout' ? 'Baja Scout' : 'Baja Entrepreneur'}.

${audienceData ? `Audience data:\n${audienceData}` : ''}

Cover:
1. Demographics
   - Age, gender, location breakdown
   - Language (English vs Spanish audience share)
   - Device (mobile vs desktop)
   - New vs returning visitors

2. Behavioral patterns
   - Most engaging content categories
   - Peak engagement times (day/hour)
   - Entry point content (how people find the brand)
   - Common paths to conversion

3. Seasonal patterns
   ${brand === 'scout' ? '- Whale season impact\n   - Valle harvest season impact\n   - Cruise season patterns' : '- Q1 investment decision timing\n   - Snowbird migration patterns\n   - Real estate buying seasons'}

4. Audience growth health
   - List growth rate
   - Follower growth by platform
   - Return visitor rate
   - Brand search volume trends

${audienceData ? 'Conclude with insights: who is the audience becoming, and what does that mean for content strategy?' : 'Include target benchmarks for each metric.'}`
  );

  return result.data;
}

export async function designABTest(
  testSubject: 'email-subject' | 'ad-creative' | 'landing-page' | 'content-format' | 'posting-time' | 'cta',
  hypothesis: string,
  context: string
): Promise<string> {
  console.log(`[DATO] Designing A/B test for ${testSubject}...`);

  const result = await runAgent(
    datoAgentConfig,
    `Design an A/B test for ${testSubject.replace('-', ' ')}.

Hypothesis: ${hypothesis}
Context: ${context}

Provide:
1. Test hypothesis (clearly stated)
2. Control version (A) description
3. Variant version (B) description
4. Single variable being tested (never test multiple changes)
5. Success metric (primary KPI)
6. Sample size needed for statistical significance
7. Test duration recommendation
8. How to implement the test
9. How to interpret results
10. What action to take based on each possible outcome

Remember: One variable at a time. Statistical significance before declaring winner. Document everything.`
  );

  return result.data;
}

export async function analyzePaidCampaign(
  platform: 'meta' | 'google' | 'linkedin',
  campaignData: string,
  brand: 'scout' | 'entrepreneur' = 'entrepreneur'
): Promise<string> {
  console.log(`[DATO] Analyzing ${platform} paid campaign...`);

  const result = await runAgent(
    datoAgentConfig,
    `Analyze this ${platform} paid campaign for ${brand === 'scout' ? 'Baja Scout' : 'Baja Entrepreneur'}.

Campaign data:
${campaignData}

Analyze:
1. Click-through rate vs platform benchmark
2. Cost per click efficiency
3. Cost per result / cost per lead
4. ROAS (if applicable)
5. Audience segment performance — which targeting is converting?
6. Creative performance — which ad versions are winning?
7. Frequency / ad fatigue indicators
8. Funnel drop-off points

Conclude with:
- What is working (keep/scale)
- What is not working (pause/fix)
- Specific optimization recommendations for PIXEL
- Budget reallocation suggestions if applicable`
  );

  return result.data;
}

export async function analyzeEmailSequence(
  sequenceName: string,
  emailMetrics: string
): Promise<string> {
  console.log(`[DATO] Analyzing email sequence: ${sequenceName}...`);

  const result = await runAgent(
    datoAgentConfig,
    `Analyze this email nurture sequence performance.

Sequence: ${sequenceName}

Email metrics:
${emailMetrics}

For each email in the sequence, analyze:
1. Open rate vs sequence average and benchmark
2. Click rate and top-clicked links
3. Unsubscribe rate (where are people leaving?)
4. Drop-off point identification

Overall sequence analysis:
1. Where is the sequence losing people?
2. Which emails are high-performers?
3. Where is the conversion happening (or not)?
4. Sequence pacing — too fast, too slow, just right?

Recommendations:
1. Specific emails to rewrite or remove
2. Subject line patterns that work vs don't
3. Content length and format recommendations
4. Send time optimization
5. Segmentation opportunities`
  );

  return result.data;
}

export async function generateSEOProgressReport(
  keywords: string[],
  rankingData?: string
): Promise<string> {
  console.log(`[DATO] Generating SEO progress report...`);

  const result = await runAgent(
    datoAgentConfig,
    `Generate an SEO progress report for CIMA.

Target keywords:
${keywords.map((k, i) => `${i + 1}. ${k}`).join('\n')}

${rankingData ? `Current ranking data:\n${rankingData}` : 'Create a tracking template for these keywords.'}

${rankingData ? 'Analyze:' : 'Template should include:'}
1. Current position for each keyword
2. Position change (vs last month)
3. Featured snippet status
4. Estimated traffic for current position
5. Competition level assessment
6. Content gap identification (keywords we should rank for but don't)

Recommendations:
1. Quick wins (keywords close to page 1)
2. Priority content needs (keywords with no ranking content)
3. Optimization opportunities (existing content that could rank higher)
4. Timeline expectations (3-6 month projections)`
  );

  return result.data;
}

export async function createDashboardSpec(
  brand: 'scout' | 'entrepreneur' = 'entrepreneur'
): Promise<string> {
  console.log(`[DATO] Creating dashboard specification...`);

  const result = await runAgent(
    datoAgentConfig,
    `Create a dashboard specification for ${brand === 'scout' ? 'Baja Scout' : 'Baja Entrepreneur'}.

The dashboard should provide real-time visibility into brand performance.

Include:
1. Key metrics to display (with target benchmarks)
2. Data sources required:
   - Google Analytics 4
   - Google Search Console
   - Meta Business Suite
   ${brand === 'entrepreneur' ? '- LinkedIn Analytics' : ''}
   - Email platform
3. Visualization recommendations for each metric
4. Update frequency for each data point
5. Alert thresholds (when to flag issues)
6. User access recommendations (who sees what)
7. Google Looker Studio implementation notes

Focus on actionable visibility — metrics that drive decisions, not vanity metrics.`
  );

  return result.data;
}

export async function interpretData(
  dataDescription: string,
  question: string
): Promise<string> {
  console.log(`[DATO] Interpreting data...`);

  const result = await runAgent(
    datoAgentConfig,
    `Interpret this data and answer the question.

Data:
${dataDescription}

Question: ${question}

Provide:
1. Direct answer to the question
2. Supporting data points
3. Confidence level (high/medium/low based on data quality)
4. Caveats or limitations
5. What additional data would increase confidence
6. Specific recommendation based on the finding
7. Which agent should act on this insight`
  );

  return result.data;
}

export async function generateQuarterlyReview(
  brand: 'scout' | 'entrepreneur' | 'both' = 'both'
): Promise<string> {
  console.log(`[DATO] Generating quarterly review template...`);

  const result = await runAgent(
    datoAgentConfig,
    `Generate a quarterly strategy review template for ${brand === 'both' ? 'both brands' : brand === 'scout' ? 'Baja Scout' : 'Baja Entrepreneur'}.

Include:
1. 90-day performance trend analysis structure
2. Content ROI analysis framework (which categories compound?)
3. Channel efficiency analysis (time and budget ROI by channel)
4. Audience growth and composition analysis
5. Competitive context section
6. Strategic recommendations format:
   - Evidence-based findings
   - Strategic options
   - Recommended direction
   - Resource requirements
   - Expected outcomes

This is the strategic document — it should support real decisions about where to focus the next quarter.`
  );

  return result.data;
}

export function getDatoGreeting(): string {
  return `
Hola — I am DATO, the Analytics Agent for Baja Scout and Baja Entrepreneur. I track what every
piece of content, every campaign, and every channel is actually producing — and I translate
that data into specific recommendations the team can act on.

I do not produce reports for their own sake. I find the signal in the noise, tell you what
it means, and tell you exactly what to do about it.

What do you need to measure, and what decision are you trying to make with the data?
`;
}

// CLI entry point
if (import.meta.url === `file://${process.argv[1]}`) {
  const task = process.argv[2] || 'weekly';
  if (task === 'weekly') {
    generateWeeklySnapshot('both').then(console.log).catch(console.error);
  } else if (task === 'monthly') {
    const brand = (process.argv[3] || 'entrepreneur') as 'scout' | 'entrepreneur';
    generateMonthlyReport(brand).then(console.log).catch(console.error);
  }
}

export default datoAgentConfig;
