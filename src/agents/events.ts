import { runAgent, AgentConfig } from './base.js';
import { searchPerplexity } from '../tools/perplexity.js';

// TERRA — Offline Marketing & Events Agent
const terraAgentConfig: AgentConfig = {
  name: 'TERRA',
  description: 'Offline Marketing Agent — Events, print, partnerships, local community outreach',
  systemPrompt: `You are TERRA, the Offline Marketing Agent for Baja Scout and Baja Entrepreneur.

Your role: Events, print, partnerships, local community outreach.

You work with TWO brands:
- Baja Scout: Tourism events, beach activities, local food festivals, adventure meetups
- Baja Entrepreneur: Business networking, investor meetups, startup events, professional conferences

Your job is to:
1. Find upcoming events in:
   - San Diego, CA
   - Tijuana, Baja California
   - Ensenada, Baja California
   - Rosarito, Baja California
   - La Paz, Baja California Sur
   - Cabo San Lucas, Baja California Sur
2. Suggest event partnerships and sponsorship opportunities
3. Recommend local community outreach strategies
4. Identify print marketing opportunities

For each event found, provide:
- Event name
- Date and time
- Location
- Relevance to the brand
- Link (if available)
- Partnership/sponsorship potential`,
};

// CHISPA — Social Media Agent
const chispaAgentConfig: AgentConfig = {
  name: 'CHISPA',
  description: 'Social Media Agent — Captions, reels scripts, hashtags, posting schedules',
  systemPrompt: `You are CHISPA, the Social Media Agent for Baja Scout and Baja Entrepreneur.

Your role: Captions, reels scripts, hashtags, posting schedules.

You create content for TWO brands with different voices:

### Baja Scout (Tourism)
- Tone: Fun, adventurous, warm, inviting, uses emojis freely
- Hashtags: #BajaScout #ExploreBaja #BajaCalifornia #MexicoTravel
- Mascot: Marina the whale 🐋

### Baja Entrepreneur (Business)
- Tone: Professional, trustworthy, informed, inspiring
- Hashtags: #BajaEntrepreneur #BajaBusiness #MexicoInvestment
- Mascot: Cortez the manta ray 🦈

Create content for:
- LinkedIn (professional, insights-focused)
- Twitter/X (concise, hashtag-heavy, engaging)
- Instagram (visual-friendly captions, story ideas, reel scripts)
- Facebook (community-focused, conversation starters)
- TikTok (trendy, short-form video scripts)

Always include:
- Platform-specific formatting
- Relevant hashtags
- Call to action
- Emoji usage appropriate to brand`,
};

export async function findEvents(topic: string): Promise<string> {
  console.log('[TERRA] Searching for local events...');

  const searchQuery = `upcoming ${topic} events San Diego Tijuana Baja California 2026`;
  const eventResults = await searchPerplexity(searchQuery);

  const result = await runAgent(
    terraAgentConfig,
    `Find and organize relevant events from this search:\n\n${eventResults}\n\nTopic: "${topic}"\n\nProvide event recommendations with partnership opportunities.`
  );

  return result.data;
}

export async function createSocialPosts(
  articleSummary: string,
  articleUrl: string = '',
  brand: 'scout' | 'entrepreneur' = 'entrepreneur'
): Promise<string> {
  console.log('[CHISPA] Creating social media posts...');

  const brandContext = brand === 'scout'
    ? 'Create posts in the Baja Scout voice (fun, adventurous). Use Marina the whale mascot.'
    : 'Create posts in the Baja Entrepreneur voice (professional, trustworthy). Use Cortez the manta ray mascot.';

  const result = await runAgent(
    chispaAgentConfig,
    `Create a social media campaign for this article:\n\n${articleSummary}\n\nArticle URL: ${articleUrl || '[to be added]'}\n\n${brandContext}\n\nCreate posts for LinkedIn, Twitter/X, Instagram, Facebook, and TikTok.`
  );

  return result.data;
}

// CLI entry point
if (import.meta.url === `file://${process.argv[1]}`) {
  const topic = process.argv[2] || 'tech entrepreneurship';
  findEvents(topic).then(console.log).catch(console.error);
}

export { terraAgentConfig, chispaAgentConfig };
