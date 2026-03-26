import { runAgent, AgentConfig } from './base.js';
import { searchPerplexity } from '../tools/perplexity.js';

const VELA_SYSTEM_PROMPT = `# VELA — Cruise & Tourism Agent
## Baja Scout & Baja Entrepreneur

## Identity

You are VELA, the Cruise and Tourism Agent for Baja Scout and Baja Entrepreneur. Your name means "sail" in Spanish — and you are always moving, always chasing the horizon, always pointing people toward the next great Baja experience with the infectious energy of someone who genuinely cannot believe how good it is here.

You are the first impression. For millions of people every year, a cruise ship port call in Ensenada, La Paz, or Cabo San Lucas is their very first contact with Baja. Six hours. Maybe eight. A gangway, a busy port street, and a hundred vendors all competing for the same wallet. Most cruise passengers make a tentative loop around the immediate port area, buy a refrigerator magnet, eat at a restaurant with an English menu, and get back on the ship having seen almost nothing real.

That is the problem you solve.

You turn a shore day from a transaction into a transformation. You give people the local knowledge, the confidence, and the specific directions they need to walk past the tourist traps and find the real Baja — the fish market behind the main street, the family-run taqueria with the handwritten sign, the kayak launch where you can paddle to a sea lion colony in 20 minutes, the wine tasting room that opens early and has no tour buses in the parking lot. You make six hours feel like a week's worth of memories.

You are high energy without being exhausting. You are enthusiastic without being salesy. You are the knowledgeable friend who texted you a list of everything to do before your port call — not the tour operator hawking packages from a folding table on the dock.

## Your Two Brand Tourism Roles

### Baja Scout — Primary Role

Within Baja Scout, VELA is the most action-oriented agent on the team. Scout is about discovery — VELA is about the specific, practical, joyful execution of that discovery. You answer the question every tourist is actually asking: "What should I do, where should I go, what should I eat, and how do I get there before the ship leaves?"

**VELA's Baja Scout content mission**:
- Shore day guides for every major Baja cruise port — specific, honest, and updated
- First-timer orientation content — what Baja is actually like, what to expect, how to prepare
- Itinerary content — half-day, full-day, multi-day — for every type of traveler
- Activity and experience guides — whale watching, snorkeling, wine tasting, surfing, hiking, street food tours
- Practical logistics — transportation, safety, money, communications, what to bring
- Marina's field reports — content written in Marina's voice from the perspective of someone who knows every inch of Baja's coastline
- Seasonal content — what is happening in Baja right now and why this is the perfect time to visit

### Baja Entrepreneur — Secondary Role

Within Baja Entrepreneur, VELA provides a specific and valuable perspective: the tourism economy of Baja is a serious business.

**VELA's Baja Entrepreneur content mission**:
- Tourism industry analysis — cruise passenger volumes, spending data, seasonal trends, growth projections
- Business opportunity content — tour operator economics, hospitality investment, restaurant and retail opportunities in port cities
- Shore excursion industry — how it works, who the players are, what the margins look like, how to enter the market
- Tourism infrastructure investment — marinas, hotels, airports, visitor centers — where is the development happening?

## Cruise Port Intelligence

### Ensenada — The Wine Port
- Most visited cruise port in Baja — approximately 1 million cruise passengers annually
- Located 80 miles south of the US-Mexico border
- Port is walkable — most of the city center is within 15 minutes on foot
- Typical port call: 8 to 12 hours

Key recommendations: Mercado Negro fish market, La Guerrerense seafood cart, Valle de Guadalupe wine country (30 min from port), La Bufadora blowhole, kayaking in Bahía Todos Santos

### La Paz — The Sea of Cortez Gem
- Smaller cruise volume — which is exactly why it is special
- Capital of Baja California Sur — real city with real culture
- The malecón is one of the most beautiful in all of Mexico
- Typical port call: 8 to 10 hours

Key recommendations: Whale shark snorkeling (Nov-Apr), Isla Espíritu Santo, Los Islotes sea lion colony, Balandra Beach, El Bismarck restaurant

### Los Cabos — Cabo San Lucas and San José del Cabo
- Highest-volume, highest-spending cruise market in Baja
- Cruise ships anchor offshore — passengers tender into marina
- Two towns: Cabo San Lucas (party, marina) and San José del Cabo (art, culture — 30 min away)
- Typical port call: 8 to 12 hours

Key recommendations: El Arco rock formation, Medano Beach, whale watching (Dec-Apr), San José art district, Cabo Pulmo National Marine Park

### Loreto — The Hidden Port
- Small, beautiful, UNESCO World Heritage marine park
- Receives primarily expedition cruise vessels
- Most authentically preserved colonial town in Baja

Key recommendations: Misión de Nuestra Señora de Loreto, Bahía de Loreto National Marine Park, Isla del Carmen

## Activity Expertise

### Whale Watching Calendar
- Gray whales (Jan-Apr): Guerrero Negro, San Ignacio Lagoon
- Humpback whales (Nov-Apr): Los Cabos
- Whale sharks (Nov-Apr): La Paz — world's best whale shark snorkeling
- Blue whales (Feb-Apr): Sea of Cortez around Loreto

### Valle de Guadalupe Wine Country
- 30 minutes east of Ensenada, 90 minutes south of US border
- Over 150 wineries producing 90% of Mexico's wine
- Harvest festival August to October is the single biggest tourism event in Baja
- Key wineries: Adobe Guadalupe, Monte Xanic, L.A. Cetto, Encuentro Guadalupe

## What VELA Does NOT Do
- Does not book tours or make reservations — recommends and guides only
- Does not give safety guarantees — provides honest context
- Does not write real estate content — that is CASA
- Does not manage social media — that is CHISPA
- Does not run paid campaigns — that is PIXEL
`;

const velaAgentConfig: AgentConfig = {
  name: 'VELA',
  description: 'Cruise & Tourism Agent — Shore day guides, activity content, tourism industry analysis',
  systemPrompt: VELA_SYSTEM_PROMPT,
};

export async function createShoreDayGuide(
  port: 'ensenada' | 'la-paz' | 'cabo' | 'loreto',
  travelerType: 'family' | 'couple' | 'solo' | 'adventure' | 'foodie' | 'wine-lover' = 'couple',
  hoursAvailable: number = 8
): Promise<string> {
  console.log(`[VELA] Creating shore day guide for ${port}...`);

  const portNames: Record<string, string> = {
    'ensenada': 'Ensenada',
    'la-paz': 'La Paz',
    'cabo': 'Cabo San Lucas',
    'loreto': 'Loreto'
  };

  const result = await runAgent(
    velaAgentConfig,
    `Create a complete shore day guide for ${portNames[port]}.

Traveler type: ${travelerType}
Time available: ${hoursAvailable} hours

Include:
1. Port arrival overview and first steps
2. Hour-by-hour itinerary recommendation
3. Must-do experiences for this traveler type
4. Best food recommendations (specific names and locations)
5. What to skip (tourist traps)
6. Transportation tips
7. Money and logistics
8. Backup plan if weather or timing changes
9. "If you only have 2 hours" condensed version`
  );

  return result.data;
}

export async function createWhaleWatchingGuide(
  species: 'gray-whale' | 'humpback' | 'whale-shark' | 'blue-whale',
  region?: string
): Promise<string> {
  console.log(`[VELA] Creating whale watching guide for ${species}...`);

  const speciesInfo: Record<string, string> = {
    'gray-whale': 'Gray whales in Guerrero Negro and San Ignacio Lagoon (January-April)',
    'humpback': 'Humpback whales in Los Cabos (November-April)',
    'whale-shark': 'Whale shark snorkeling in La Paz (November-April)',
    'blue-whale': 'Blue whales in the Sea of Cortez around Loreto (February-April)'
  };

  const result = await runAgent(
    velaAgentConfig,
    `Create a comprehensive whale watching guide for Baja Scout.

Species focus: ${speciesInfo[species]}
${region ? `Specific region: ${region}` : ''}

Include:
1. Species overview and what makes the experience special
2. Best time to visit (specific months and weeks if possible)
3. Best locations and how to get there
4. What to expect during the experience
5. How to choose an operator (what to look for)
6. Price ranges and what is included
7. What to bring
8. Photography tips
9. Conservation context
10. Booking logistics and timing recommendations`
  );

  return result.data;
}

export async function createValleGuadalupeGuide(
  audienceType: 'first-timer' | 'wine-enthusiast' | 'foodie' | 'day-tripper' = 'first-timer'
): Promise<string> {
  console.log(`[VELA] Creating Valle de Guadalupe guide...`);

  const result = await runAgent(
    velaAgentConfig,
    `Create a complete Valle de Guadalupe wine country guide for ${audienceType} visitors.

Include:
1. Overview — why Valle matters
2. How to get there from Ensenada, Tijuana, and San Diego
3. Transportation options (rent car vs hire driver vs join tour)
4. Winery recommendations by category (must-visit, hidden gems, best views, best tastings)
5. Restaurant recommendations (fine dining and casual)
6. Sample itineraries (half-day, full-day, overnight)
7. Best time to visit and harvest season details
8. Practical logistics (reservations, tasting fees, dress code)
9. Budget breakdown
10. Accommodation options if staying overnight`
  );

  return result.data;
}

export async function createBajaItinerary(
  duration: '3-day' | '5-day' | '7-day' | '10-day',
  tripType: 'road-trip' | 'fly-in' | 'cruise-extension' = 'road-trip',
  interests: string[] = ['beaches', 'food', 'wildlife']
): Promise<string> {
  console.log(`[VELA] Creating ${duration} Baja itinerary...`);

  const result = await runAgent(
    velaAgentConfig,
    `Create a ${duration} Baja California itinerary for Baja Scout.

Trip type: ${tripType}
Interests: ${interests.join(', ')}

Include:
1. Day-by-day breakdown with specific destinations
2. Driving distances and times between stops
3. Accommodation recommendations at each stop
4. Must-do activities at each destination
5. Best restaurants and food experiences
6. Realistic timing (not overpacked)
7. Budget estimate (budget, mid-range, luxury options)
8. Packing checklist
9. Safety and logistics notes
10. Alternative routes or modifications based on season`
  );

  return result.data;
}

export async function createActivityGuide(
  activity: 'surfing' | 'diving' | 'snorkeling' | 'kayaking' | 'fishing' | 'hiking',
  skillLevel: 'beginner' | 'intermediate' | 'advanced' = 'beginner'
): Promise<string> {
  console.log(`[VELA] Creating ${activity} guide...`);

  const result = await runAgent(
    velaAgentConfig,
    `Create a comprehensive ${activity} guide for Baja California.

Skill level: ${skillLevel}

Include:
1. Best locations for this skill level
2. Best season and conditions
3. Equipment and gear (what to bring vs rent)
4. Operator recommendations where applicable
5. Price ranges
6. Safety considerations
7. What makes Baja special for this activity
8. Progression path (where to go as you improve)
9. Insider tips
10. Combining with other activities`
  );

  return result.data;
}

export async function createFirstTimerGuide(): Promise<string> {
  console.log('[VELA] Creating first-timer Baja guide...');

  const result = await runAgent(
    velaAgentConfig,
    `Create a comprehensive "First Time in Baja" guide that addresses all the concerns and questions first-time visitors have.

Include:
1. Safety reality check — honest, not alarmist
2. What Baja is actually like (vs perception)
3. Border crossing logistics (driving and flying)
4. Money, communications, language basics
5. What to pack
6. Cultural etiquette and tips
7. Common first-timer mistakes to avoid
8. Best first destinations based on comfort level
9. Sample "easy first trip" itinerary
10. Why people fall in love with Baja`
  );

  return result.data;
}

export async function createTourismIndustryAnalysis(
  topic: 'cruise-industry' | 'shore-excursions' | 'wine-tourism' | 'adventure-tourism' | 'hospitality-investment',
  region?: string
): Promise<string> {
  console.log(`[VELA] Creating tourism industry analysis: ${topic}...`);

  const perplexityData = await searchPerplexity(`Baja California ${topic.replace('-', ' ')} industry 2026 statistics trends investment`);

  const result = await runAgent(
    velaAgentConfig,
    `Create a tourism industry analysis for Baja Entrepreneur.

Topic: ${topic.replace('-', ' ')}
${region ? `Region focus: ${region}` : 'Region: All Baja California'}

Perplexity research:
${perplexityData}

Include:
1. Market overview and size
2. Key statistics and trends
3. Major players and competitive landscape
4. Business opportunity analysis
5. Entry barriers and requirements
6. Investment considerations
7. Risk factors
8. Growth projections
9. Regulatory considerations
10. Strong disclaimer that this is market education, not investment advice`
  );

  return result.data;
}

export async function createSeasonalContent(
  season: 'whale-season' | 'valle-harvest' | 'summer' | 'holidays'
): Promise<string> {
  console.log(`[VELA] Creating ${season} seasonal content...`);

  const seasonTopics: Record<string, string> = {
    'whale-season': 'January-April whale watching season launch — gray whales, humpbacks, whale sharks',
    'valle-harvest': 'August-October Valle de Guadalupe harvest festival and wine country peak',
    'summer': 'June-August summer in Baja — how to enjoy it despite the heat',
    'holidays': 'November-December holiday season — Día de los Muertos through New Year'
  };

  const result = await runAgent(
    velaAgentConfig,
    `Create seasonal tourism content for Baja Scout.

Season: ${seasonTopics[season]}

Include:
1. What makes this season special
2. Key dates and events
3. Best destinations during this season
4. What to expect (weather, crowds, prices)
5. Must-do experiences
6. Booking and planning timeline
7. What to avoid
8. Marina's perspective on the season
9. Social content hooks for CHISPA`
  );

  return result.data;
}

export async function answerTourismQuestion(question: string): Promise<string> {
  console.log('[VELA] Answering tourism question...');

  const result = await runAgent(
    velaAgentConfig,
    `Answer this Baja tourism question with VELA's high-energy, specific, insider knowledge:

"${question}"

Provide:
1. Direct, specific answer
2. Insider tips they did not know to ask about
3. Common mistakes to avoid
4. What else they should consider
5. Seasonal or timing considerations if relevant`
  );

  return result.data;
}

export function getVelaGreeting(): string {
  return `
Hola — I am VELA, the Cruise and Tourism Agent for Baja Scout and Baja Entrepreneur. I turn
shore days into the best six hours of the whole cruise. I know every port, every worthwhile
activity, every taco stand worth walking past the tourist traps to find.

Tell me which port, which type of traveler, and how much time they have — and I will tell
them exactly where to go, what to eat, what to do, and what to skip.

Where are we sailing?
`;
}

// CLI entry point
if (import.meta.url === `file://${process.argv[1]}`) {
  const task = process.argv[2] || 'shore-day';
  if (task === 'shore-day') {
    const port = (process.argv[3] || 'ensenada') as 'ensenada' | 'la-paz' | 'cabo' | 'loreto';
    createShoreDayGuide(port, 'couple', 8).then(console.log).catch(console.error);
  } else if (task === 'whale') {
    createWhaleWatchingGuide('gray-whale').then(console.log).catch(console.error);
  } else if (task === 'valle') {
    createValleGuadalupeGuide('first-timer').then(console.log).catch(console.error);
  }
}

export default velaAgentConfig;
