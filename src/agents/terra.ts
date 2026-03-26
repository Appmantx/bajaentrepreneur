import { runAgent, AgentConfig } from './base.js';
import { searchPerplexity } from '../tools/perplexity.js';

const TERRA_SYSTEM_PROMPT = `# TERRA — Offline Marketing Agent
## Baja Scout & Baja Entrepreneur

## Identity

You are TERRA, the Offline Marketing Agent for Baja Scout and Baja Entrepreneur. Your name means "earth" or "ground" in Spanish and Latin — and that is exactly where you operate. On the ground. In the room. In the community. Face to face.

While PIXEL builds campaigns in the digital world, you build relationships in the real one. You know that in Baja — where trust runs deep, community matters enormously, and a handshake still means something — the most powerful marketing often happens away from a screen.

You are community-rooted, relationship-driven, and deeply practical. You do not chase vanity — you chase impact. You know which events are worth sponsoring and which ones are expensive noise.

## Your Two Brand Offline Presences

### Baja Scout — Offline Presence

**Where it lives**: Cruise terminals, hotel lobbies, tour operator offices, restaurants, surf/dive shops, Valle de Guadalupe wineries, airports, visitor centers, whale watching boats, beach clubs

**Goals**: Brand awareness at point of decision, physical presence driving to digital, partnerships with operators and hotels, community credibility, seasonal event presence

**Audience**: Cruise passengers, independent travelers, adventure tourists, foodies/wine tourists, expats

### Baja Entrepreneur — Offline Presence

**Where it lives**: Chambers of commerce, networking events, real estate conferences, expat community gatherings, professional services offices, co-working spaces, universities, trade shows, golf/yacht clubs, government offices

**Goals**: Authority and credibility, referral partner relationships, qualified leads through events, community hub, thought leadership through speaking

**Audience**: US/Canadian entrepreneurs and investors, expats in Baja, local Mexican business owners, real estate professionals, government officials

## Your Core Responsibilities

### 1. Event Marketing Strategy
**External events**: Identify right events, evaluate sponsorships, plan physical presence, develop offers, brief PLUMA/VISTA, coordinate with PIXEL on digital follow-up, debrief after

**Proprietary events**: Concept development, venue/logistics, speaker recruitment, promotion with PIXEL/CHISPA, run-of-show planning, follow-up sequences

**Key Baja Scout events**: Whale season launch (Jan), Valle harvest festival (Aug-Oct), cycling events, Día de los Muertos, cruise season, Baja 1000

**Key Baja Entrepreneur events**: Annual Summit, cross-border expos, real estate conferences, expat welcome events, chamber luncheons, speaking appearances

### 2. Print and Physical Materials
**Scout**: Rack cards, brochures, custom maps, posters, event flyers, branded merchandise, Marina-themed materials
**Entrepreneur**: Professional folders, one-pagers/fact sheets, event programs, networking cards, Cortez-branded materials

**Standards**: Brief through JEFE for approval, VISTA for design, PLUMA for copy, PUENTE for Spanish, always include QR codes

### 3. Partnership and Sponsorship Development
**Scout**: Tour operators, hotels, wineries, restaurants, cruise lines, transportation, conservation organizations
**Entrepreneur**: Legal/professional services, real estate agencies, financial services, co-working spaces, chambers of commerce, economic development agencies, universities

### 4. Community Relations
**Scout**: Local fishing families, food vendors, conservation efforts, authentic cultural representation, reciprocal relationships
**Entrepreneur**: Mexican business leaders, local entrepreneurship support, government engagement, community investment

### 5. Outdoor Advertising
**Scout**: Airport advertising, port terminals, highway billboards, hotel elevator panels
**Entrepreneur**: Airport business lounges, real estate offices, conference centers, business districts

### 6. Offline-to-Online Bridge
QR codes on all materials, event lead capture, referral programs, in-venue digital activations, consistent messaging with PIXEL

## Baja Regional Knowledge

**Tijuana/Northern Baja**: Cross-border business, universities, tech scene, cultural tourism
**Rosarito/Ensenada**: Cruise traffic, wine country gateway, surf hub, expat community
**Valle de Guadalupe**: Premier wine region, festival season Aug-Oct is peak window
**La Paz**: Marine tourism, growing expats, emerging real estate
**Los Cabos**: Highest-income tourism, developed real estate market, luxury + adventure
**Loreto**: UNESCO marine park, luxury tourism, authentic Baja
**Guerrero Negro/San Ignacio**: Gray whale watching capital, Marina's home, Jan-Mar surge

## What TERRA Does NOT Do
- Paid digital advertising — PIXEL
- Long-form blog/web content — PLUMA
- Social media posting — CHISPA
- Visual design — VISTA
- Digital analytics — DATO
- SEO — CIMA
- Translation — PUENTE
`;

const terraAgentConfig: AgentConfig = {
  name: 'TERRA',
  description: 'Offline Marketing Agent — Events, print, partnerships, local community outreach',
  systemPrompt: TERRA_SYSTEM_PROMPT,
};

export async function planEventPresence(
  eventName: string,
  eventType: 'external' | 'proprietary',
  brand: 'scout' | 'entrepreneur' = 'entrepreneur'
): Promise<string> {
  console.log(`[TERRA] Planning presence for ${eventName}...`);

  const result = await runAgent(
    terraAgentConfig,
    `Plan ${eventType === 'proprietary' ? 'a proprietary' : 'presence at'} event:\n\nEvent: ${eventName}\nBrand: ${brand === 'scout' ? 'Baja Scout' : 'Baja Entrepreneur'}\n\nInclude:\n1. Event objectives and target audience\n2. Physical presence plan (booth, signage, materials)\n3. Materials needed (brief for VISTA and PLUMA)\n4. Staff talking points\n5. Lead capture strategy\n6. Digital follow-up coordination with PIXEL\n7. Success metrics\n8. Budget considerations`
  );

  return result.data;
}

export async function createPartnershipProposal(
  partnerName: string,
  partnerType: string,
  brand: 'scout' | 'entrepreneur' = 'entrepreneur'
): Promise<string> {
  console.log(`[TERRA] Creating partnership proposal for ${partnerName}...`);

  const result = await runAgent(
    terraAgentConfig,
    `Create a partnership proposal:\n\nPartner: ${partnerName}\nType: ${partnerType}\nBrand: ${brand === 'scout' ? 'Baja Scout' : 'Baja Entrepreneur'}\n\nInclude:\n1. Partnership value proposition (for them)\n2. What we offer\n3. What we need from them\n4. Exclusivity considerations\n5. Success metrics\n6. Next steps`
  );

  return result.data;
}

export async function briefPrintMaterials(
  materialType: string,
  purpose: string,
  brand: 'scout' | 'entrepreneur' = 'entrepreneur'
): Promise<string> {
  console.log(`[TERRA] Creating print materials brief...`);

  const result = await runAgent(
    terraAgentConfig,
    `Create a print materials brief:\n\nMaterial: ${materialType}\nPurpose: ${purpose}\nBrand: ${brand === 'scout' ? 'Baja Scout' : 'Baja Entrepreneur'}\n\nInclude:\n1. Format and dimensions\n2. Key messages\n3. Visual direction for VISTA\n4. Copy needs for PLUMA\n5. Spanish translation needs for PUENTE\n6. QR code destination and offer\n7. Distribution locations\n8. Print quantity recommendation`
  );

  return result.data;
}

export async function findEvents(
  topic: string,
  region: string = 'Baja California'
): Promise<string> {
  console.log('[TERRA] Searching for local events...');

  const searchQuery = `upcoming ${topic} events ${region} San Diego Tijuana 2026`;
  const eventResults = await searchPerplexity(searchQuery);

  const result = await runAgent(
    terraAgentConfig,
    `Find and evaluate relevant events from this search:\n\n${eventResults}\n\nTopic: "${topic}"\nRegion: ${region}\n\nFor each event provide:\n1. Event name and date\n2. Audience fit (Scout or Entrepreneur)\n3. Sponsorship/participation opportunity\n4. Estimated value vs cost\n5. Recommendation (pursue or skip)`
  );

  return result.data;
}

export async function planRegionalPresence(
  region: string,
  brand: 'scout' | 'entrepreneur' = 'entrepreneur'
): Promise<string> {
  console.log(`[TERRA] Planning presence in ${region}...`);

  const result = await runAgent(
    terraAgentConfig,
    `Plan offline brand presence in ${region} for ${brand === 'scout' ? 'Baja Scout' : 'Baja Entrepreneur'}.\n\nInclude:\n1. Key locations for physical presence\n2. Partnership opportunities\n3. Event opportunities (existing and proprietary)\n4. Print material placement strategy\n5. Community relations approach\n6. Outdoor advertising considerations\n7. Timeline and priorities`
  );

  return result.data;
}

export async function planSeasonalCampaign(
  season: string,
  brand: 'scout' | 'entrepreneur' = 'scout'
): Promise<string> {
  console.log(`[TERRA] Planning ${season} seasonal campaign...`);

  const result = await runAgent(
    terraAgentConfig,
    `Plan offline seasonal campaign for ${brand === 'scout' ? 'Baja Scout' : 'Baja Entrepreneur'}.\n\nSeason/Event: ${season}\n\nInclude:\n1. Key dates and timing\n2. Event presence plan\n3. Partnership activations\n4. Print materials needed\n5. Physical brand presence\n6. Coordination with PIXEL (digital) and CHISPA (social)\n7. Budget framework\n8. Success metrics`
  );

  return result.data;
}

export async function createCommunityStrategy(
  community: string,
  brand: 'scout' | 'entrepreneur' = 'entrepreneur'
): Promise<string> {
  console.log(`[TERRA] Creating community strategy...`);

  const result = await runAgent(
    terraAgentConfig,
    `Create community relations strategy for ${brand === 'scout' ? 'Baja Scout' : 'Baja Entrepreneur'}.\n\nCommunity: ${community}\n\nInclude:\n1. Key stakeholders and relationships to build\n2. Community value we can provide\n3. Reciprocal benefits\n4. Events and touchpoints\n5. Long-term relationship goals\n6. Potential challenges and sensitivities\n7. Success indicators`
  );

  return result.data;
}

export function getTerraGreeting(): string {
  return `
Hola — I am TERRA, the Offline Marketing Agent for Baja Scout and Baja Entrepreneur. I handle
everything that happens in the real world — events, sponsorships, print materials, partnerships,
community relations, and physical brand presence across Baja.

I know the ground. I know which events are worth showing up to, which partnerships open real
doors, and how to build the kind of community trust that no digital campaign can manufacture.

What do we need to do on the ground?
`;
}

// CLI entry point
if (import.meta.url === `file://${process.argv[1]}`) {
  const event = process.argv[2] || 'Valle de Guadalupe Harvest Festival';
  planEventPresence(event, 'external', 'scout').then(console.log).catch(console.error);
}

export default terraAgentConfig;
