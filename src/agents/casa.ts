import { runAgent, AgentConfig } from './base.js';
import { searchPerplexity } from '../tools/perplexity.js';

const CASA_SYSTEM_PROMPT = `# CASA — Real Estate Agent
## Baja Scout & Baja Entrepreneur

## Identity

You are CASA, the Real Estate Agent for Baja Scout and Baja Entrepreneur. Your name means "home" in Spanish — and that is the heart of everything you do. You help people find their place in Baja. Not just a property. A life.

You are the most trust-sensitive agent on the team. Everything you say carries weight because the decisions your audience is making are serious — financially, legally, and personally. You are not a salesperson. You are an advisor. You educate, clarify, and guide — always telling people what they need to know even when it is complicated.

## Legal Framework Knowledge

### The Restricted Zone
Mexican law restricts direct foreign ownership within 100km of borders and 50km of coastlines. Most desirable Baja falls in this zone.

### Fideicomiso — The Bank Trust
- Mexican bank holds legal title as trustee
- Foreign buyer is beneficiary with full use/enjoyment/transfer rights
- 50-year term, renewable automatically
- Annual fee $500-800 USD
- NOT a loophole — legitimate structure since 1973

**Common misconceptions to correct**:
- "Bank owns my property" — False. You are beneficial owner with full rights.
- "Government takes it after 50 years" — False. Trust renews automatically.
- "Foreigners cannot own in Mexico" — False. Just requires fideicomiso or corporation.

### Mexican Corporation (S.A. or S. de R.L.)
For investment/commercial properties or multiple purchases. Always recommend consulting qualified Mexican corporate attorney.

### Ejido Land — CRITICAL WARNING
Communally held agricultural land. NEVER purchase without full privatization verification. Most common source of foreign buyer disputes.

### Purchase Process
1. Offer/negotiation (5-10% deposit)
2. Due diligence (title search, survey, fideicomiso permit)
3. Notario involvement (government-appointed attorney, 1-3% fees)
4. Closing (escrow transfer, deed signed)
5. Post-closing (registration, predial tax, utilities)

## Regional Market Knowledge

**Tijuana**: Urban/commercial hub, $100K-400K, cross-border business focus
**Rosarito**: Weekend destination, $150K-600K oceanfront, STR market growing
**Ensenada**: Most balanced market, $120K-800K, Valle wine country opportunity
**La Paz**: Best value in Baja, $150K-1.2M, 40-60% below Cabo prices
**Loreto**: Boutique/UNESCO, $200K-800K, lifestyle over rental income
**Los Cabos**: Premium market, $300K-10M+, strongest rental/resale

## What CASA NEVER Does
- Never gives legal advice — always recommend Mexican attorney
- Never gives financial/investment advice — provide data, not recommendations
- Never recommends specific properties — market knowledge only
- Never minimizes risk — name ejido, developer, title risks honestly
- Never oversimplifies — respect the genuine complexity
`;

const casaAgentConfig: AgentConfig = {
  name: 'CASA',
  description: 'Real Estate Agent — Property content, neighborhood guides, investor materials',
  systemPrompt: CASA_SYSTEM_PROMPT,
};

export async function explainFideicomiso(): Promise<string> {
  console.log('[CASA] Explaining fideicomiso...');

  const result = await runAgent(
    casaAgentConfig,
    `Explain the fideicomiso (bank trust) system for foreign buyers in Baja California.\n\nInclude:\n1. What it is and how it works\n2. Rights it provides to the buyer\n3. Costs involved\n4. Common misconceptions corrected\n5. When to consider alternatives (corporation)\n6. Appropriate legal disclaimer`
  );

  return result.data;
}

export async function createMarketReport(
  region: string
): Promise<string> {
  console.log(`[CASA] Creating market report for ${region}...`);

  const perplexityData = await searchPerplexity(`${region} Baja California real estate market 2026 prices trends`);

  const result = await runAgent(
    casaAgentConfig,
    `Create a real estate market report for ${region}, Baja California.\n\nPerplexity research:\n${perplexityData}\n\nInclude:\n1. Market character and buyer profile\n2. Property types available\n3. Price ranges\n4. Investment opportunities\n5. Watch-outs and risks\n6. Comparison to other Baja markets\n7. Appropriate disclaimers`
  );

  return result.data;
}

export async function createNeighborhoodGuide(
  city: string,
  audienceType: 'retiree' | 'investor' | 'remote-worker' | 'family' = 'investor'
): Promise<string> {
  console.log(`[CASA] Creating neighborhood guide for ${city}...`);

  const result = await runAgent(
    casaAgentConfig,
    `Create a neighborhood guide for ${city}, Baja California for ${audienceType} buyers.\n\nInclude:\n1. Overview of neighborhoods\n2. Character and lifestyle of each area\n3. Price range by neighborhood\n4. Pros and cons for the target audience\n5. Expat community presence\n6. Practical considerations (walkability, services, safety)\n7. Recommended for vs. not recommended for`
  );

  return result.data;
}

export async function createBuyerGuide(
  buyerType: 'first-time' | 'investor' | 'retiree' | 'developer',
  propertyType: string = 'residential'
): Promise<string> {
  console.log(`[CASA] Creating buyer guide for ${buyerType}...`);

  const result = await runAgent(
    casaAgentConfig,
    `Create a comprehensive buyer guide for ${buyerType} buyers looking at ${propertyType} property in Baja.\n\nInclude:\n1. Key considerations for this buyer type\n2. Legal structure recommendation (fideicomiso vs corporation)\n3. Step-by-step purchase process\n4. Due diligence checklist\n5. Costs breakdown (purchase + ongoing)\n6. Common mistakes to avoid\n7. Professional team needed\n8. Appropriate legal/financial disclaimers`
  );

  return result.data;
}

export async function explainEjidoRisks(): Promise<string> {
  console.log('[CASA] Explaining ejido land risks...');

  const result = await runAgent(
    casaAgentConfig,
    `Create comprehensive content about ejido land risks in Baja California.\n\nInclude:\n1. What ejido land is\n2. Why it is dangerous for foreign buyers\n3. How to verify if land has ejido status\n4. Real examples of problems (anonymized)\n5. Red flags that suggest ejido issues\n6. How to protect yourself\n7. When to walk away from a deal\n\nBe direct and clear about the risks — this is cautionary content.`
  );

  return result.data;
}

export async function compareMarkets(
  market1: string,
  market2: string
): Promise<string> {
  console.log(`[CASA] Comparing ${market1} vs ${market2}...`);

  const result = await runAgent(
    casaAgentConfig,
    `Create a comparison guide: ${market1} vs ${market2} for Baja real estate buyers.\n\nCompare:\n1. Market character and vibe\n2. Price points (entry, mid, premium)\n3. Buyer profile fit\n4. Rental income potential\n5. Liquidity (how easy to sell)\n6. Growth trajectory\n7. Lifestyle differences\n8. Who should choose which and why`
  );

  return result.data;
}

export async function answerRealEstateQuestion(
  question: string
): Promise<string> {
  console.log('[CASA] Answering real estate question...');

  const result = await runAgent(
    casaAgentConfig,
    `Answer this Baja real estate question thoroughly and accurately:\n\n"${question}"\n\nProvide:\n1. Direct answer\n2. Important context they need to know\n3. What they should also ask that they didn't\n4. When to consult a professional\n5. Appropriate disclaimers`
  );

  return result.data;
}

export async function createInvestorAnalysis(
  investmentType: 'short-term-rental' | 'long-term-rental' | 'flip' | 'development' | 'commercial',
  region: string
): Promise<string> {
  console.log(`[CASA] Creating investor analysis for ${investmentType} in ${region}...`);

  const result = await runAgent(
    casaAgentConfig,
    `Create an investment analysis for ${investmentType} investment in ${region}, Baja California.\n\nInclude:\n1. Market conditions for this investment type\n2. Realistic return expectations (with caveats)\n3. Entry costs and ongoing costs\n4. Regulatory considerations\n5. Risks specific to this investment type\n6. Exit strategy considerations\n7. Strong disclaimer that this is educational, not financial advice`
  );

  return result.data;
}

export function getCasaGreeting(): string {
  return `
Hola — I am CASA, the Real Estate Agent for Baja Scout and Baja Entrepreneur. I know the Baja
real estate market — the legal framework, the regional differences, the genuine opportunities,
and the pitfalls that catch buyers who did not do their homework.

I am not here to sell you anything. I am here to make sure you understand exactly what you
are getting into — and what to do to protect yourself when you decide to move forward.

What do you need to know about buying, investing, or building in Baja?
`;
}

// CLI entry point
if (import.meta.url === `file://${process.argv[1]}`) {
  const task = process.argv[2] || 'fideicomiso';
  if (task === 'fideicomiso') {
    explainFideicomiso().then(console.log).catch(console.error);
  } else if (task === 'market') {
    const region = process.argv[3] || 'La Paz';
    createMarketReport(region).then(console.log).catch(console.error);
  }
}

export default casaAgentConfig;
