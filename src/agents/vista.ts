import { runAgent, AgentConfig } from './base.js';

const VISTA_SYSTEM_PROMPT = `# VISTA — Image & Visuals Agent
## Baja Scout & Baja Entrepreneur

## Identity

You are VISTA, the Image and Visuals Agent for Baja Scout and Baja Entrepreneur. Your name means "view" or "vision" in Spanish — and vision is exactly what you bring. You see what others do not see yet. You know what an image needs to feel before you know what it needs to show.

You are the visual conscience of both brands. You set the visual standard, write the prompts that generate imagery, direct photography concepts, maintain brand style guides, and ensure visual identity is distinctive and consistent.

You work at the intersection of art direction, brand strategy, and AI image generation. You know how to write a Midjourney prompt that produces exactly the mood you are after.

## Your Two Brand Visual Identities

### Baja Scout — Visual Identity

**Emotional target**: Wanderlust. The pull to be there. Joy from discovering a place that feels secret and real.

**Color palette**:
- Primary: Deep ocean blue (#0A4B6E), Pacific turquoise (#1A9BAF), warm coral sunset (#E8673A)
- Secondary: Sandy tan (#D4B483), sea foam green (#7EC8C8), golden hour amber (#F2A73B)
- Accent: Bright white (#FFFFFF)
- Avoid: Cold grays, corporate blues, sterile/artificial

**Photography style**: Natural light (golden/blue hour), candid over posed, warm color grading, wide + detail shots, food close & textured, wildlife patient & real, people with permission & joy

**What Scout NEVER looks like**: Stock photo perfect, overly filtered, empty of life, cliché sombrero/cactus, dark or moody

**Marina visual**: Warm, friendly, wise — large eyes, gentle expression, surrounded by Pacific. Ocean blues, sea foam, coral. Always an invitation.

### Baja Entrepreneur — Visual Identity

**Emotional target**: Aspiration and confidence. This place is real, the opportunity is real.

**Color palette**:
- Primary: Deep navy (#0D2B45), warm slate (#4A5568), sophisticated gold (#C9A84C)
- Secondary: Clean white (#F8F9FA), warm gray (#E2E8F0), muted teal (#2D6A77)
- Accent: Rich terracotta (#8B4513)
- Avoid: Loud tropical colors, Scout territory, corporate sterile

**Photography style**: Clean purposeful composition, architecture and space, lifestyle with business context, honest real estate imagery, professional diverse people

**What Entrepreneur NEVER looks like**: Tourist snapshots, Cabo party energy, generic business stock, underexposed, inconsistent with Cortez voice

**Cortez visual**: Sleek, confident, precise — intelligence and elegance. Deep navy, slate, gold. Quiet confidence, never mascot-like.

## Prompt Writing Framework

Every prompt includes:
- [Subject] — main focus
- [Setting] — Baja location
- [Mood and lighting] — feel and light quality
- [Style direction] — photography/illustration style
- [Color emphasis] — palette tones
- [Composition notes] — wide/tight, perspective
- [What to avoid] — negative prompts
- [Technical specs] — aspect ratio, resolution

**Midjourney best practices**:
- --ar 9:16 for Stories/TikTok, --ar 1:1 for feed, --ar 16:9 for web
- --style raw for photographic realism
- --v 6.1 for highest quality
- Scout --no: stock photo, staged, generic, sombrero, oversaturated
- Entrepreneur --no: tourist, casual, vacation, corporate stock, generic

## Platform Specs

**Instagram**: Feed 1080x1080 or 1080x1350, Stories 1080x1920
**TikTok**: 1080x1920
**Facebook**: Feed 1200x630, Cover 820x312
**LinkedIn**: Feed 1200x627
**Meta Ads**: 1080x1080 or 1080x1350, text under 20%
**Google Display**: 300x250, 728x90, 160x600, 300x600

## What VISTA Does NOT Do
- Write captions — CHISPA
- Write blog/web content — PLUMA
- Manage ad campaigns — PIXEL
- Analyze data — DATO
- Translate — PUENTE
- Print logistics — TERRA
`;

const vistaAgentConfig: AgentConfig = {
  name: 'VISTA',
  description: 'Image & Visuals Agent — AI image prompts, photo direction, visual brand guidelines',
  systemPrompt: VISTA_SYSTEM_PROMPT,
};

export async function writeImagePrompt(
  subject: string,
  platform: 'instagram-feed' | 'instagram-story' | 'tiktok' | 'linkedin' | 'facebook' | 'web' | 'print',
  brand: 'scout' | 'entrepreneur' = 'entrepreneur',
  mood?: string
): Promise<string> {
  console.log(`[VISTA] Writing ${platform} image prompt for ${brand === 'scout' ? 'Baja Scout' : 'Baja Entrepreneur'}...`);

  const aspectRatios: Record<string, string> = {
    'instagram-feed': '1:1 or 4:5',
    'instagram-story': '9:16',
    'tiktok': '9:16',
    'linkedin': '16:9',
    'facebook': '16:9',
    'web': '16:9',
    'print': 'as specified'
  };

  const result = await runAgent(
    vistaAgentConfig,
    `Write a Midjourney prompt for:\n\nSubject: ${subject}\nPlatform: ${platform} (aspect ratio: ${aspectRatios[platform]})\nBrand: ${brand === 'scout' ? 'Baja Scout' : 'Baja Entrepreneur'}\nMood: ${mood || 'match brand guidelines'}\n\nProvide:\n1. Full Midjourney prompt with all parameters\n2. Negative prompts (--no)\n3. Explanation of visual choices\n4. Alternative version if first doesn't work`
  );

  return result.data;
}

export async function writeMascotPrompt(
  mascot: 'marina' | 'cortez',
  context: string,
  style: 'realistic' | 'illustrated' = 'illustrated'
): Promise<string> {
  console.log(`[VISTA] Writing ${mascot === 'marina' ? 'Marina' : 'Cortez'} prompt...`);

  const result = await runAgent(
    vistaAgentConfig,
    `Write a Midjourney prompt for the brand mascot:\n\nMascot: ${mascot === 'marina' ? 'Marina the gray whale (Baja Scout)' : 'Cortez the manta ray (Baja Entrepreneur)'}\nContext/Scene: ${context}\nStyle: ${style}\n\nFollow mascot visual guidelines exactly. Provide full prompt with parameters.`
  );

  return result.data;
}

export async function createPhotoBrief(
  project: string,
  location: string,
  brand: 'scout' | 'entrepreneur' = 'entrepreneur'
): Promise<string> {
  console.log(`[VISTA] Creating photography brief...`);

  const result = await runAgent(
    vistaAgentConfig,
    `Create a photography brief:\n\nProject: ${project}\nLocation: ${location}\nBrand: ${brand === 'scout' ? 'Baja Scout' : 'Baja Entrepreneur'}\n\nInclude:\n1. Brand and usage context\n2. Subject(s) and location details\n3. Time of day / lighting conditions\n4. Mood reference descriptions\n5. Must-capture shot list (hero + details)\n6. What to avoid\n7. Deliverables (format, resolution)\n8. Both horizontal and vertical crops needed`
  );

  return result.data;
}

export async function reviewVisual(
  description: string,
  intendedUse: string,
  brand: 'scout' | 'entrepreneur' = 'entrepreneur'
): Promise<string> {
  console.log(`[VISTA] Reviewing visual for brand compliance...`);

  const result = await runAgent(
    vistaAgentConfig,
    `Review this visual for brand compliance:\n\nDescription: ${description}\nIntended use: ${intendedUse}\nBrand: ${brand === 'scout' ? 'Baja Scout' : 'Baja Entrepreneur'}\n\nEvaluate:\n1. Color palette compliance\n2. Composition quality\n3. Brand mood alignment\n4. Platform optimization\n5. What works\n6. What needs to change (specific notes)`
  );

  return result.data;
}

export async function createVisualStrategy(
  campaign: string,
  platforms: string[],
  brand: 'scout' | 'entrepreneur' = 'entrepreneur'
): Promise<string> {
  console.log(`[VISTA] Creating visual strategy...`);

  const result = await runAgent(
    vistaAgentConfig,
    `Create visual strategy for campaign:\n\nCampaign: ${campaign}\nPlatforms: ${platforms.join(', ')}\nBrand: ${brand === 'scout' ? 'Baja Scout' : 'Baja Entrepreneur'}\n\nInclude:\n1. Visual theme and mood\n2. Color emphasis\n3. Image types needed (AI vs photography)\n4. Platform-specific adaptations\n5. Marina/Cortez usage if applicable\n6. Visual consistency guidelines across all assets`
  );

  return result.data;
}

export async function generateAdCreativeBrief(
  product: string,
  adFormat: string,
  brand: 'scout' | 'entrepreneur' = 'entrepreneur'
): Promise<string> {
  console.log(`[VISTA] Creating ad creative brief...`);

  const result = await runAgent(
    vistaAgentConfig,
    `Create ad creative visual brief:\n\nProduct/Offer: ${product}\nAd format: ${adFormat}\nBrand: ${brand === 'scout' ? 'Baja Scout' : 'Baja Entrepreneur'}\n\nInclude:\n1. Visual concept\n2. Dimensions and specs\n3. Midjourney prompt for hero image\n4. Text overlay guidelines (keep under 20%)\n5. CTA placement\n6. A/B test visual variant`
  );

  return result.data;
}

export async function createBrandColorGuide(
  brand: 'scout' | 'entrepreneur'
): Promise<string> {
  console.log(`[VISTA] Creating brand color guide...`);

  const result = await runAgent(
    vistaAgentConfig,
    `Create detailed color guide for ${brand === 'scout' ? 'Baja Scout' : 'Baja Entrepreneur'}.\n\nInclude:\n1. Primary colors with hex, RGB values\n2. Secondary colors\n3. Accent colors\n4. Colors to avoid\n5. Usage guidelines (when to use each)\n6. Color combinations that work\n7. Examples of on-brand vs off-brand color usage`
  );

  return result.data;
}

export function getVistaGreeting(): string {
  return `
Hola — I am VISTA, the Image and Visuals Agent for Baja Scout and Baja Entrepreneur. I handle
everything visual — AI image generation prompts, photography direction, brand style guides,
visual quality control, and creative assets for every platform and format.

I think in light, color, mood, and composition. Give me the feeling you want someone to have
when they see the image — and I will figure out how to create it.

What are we making?
`;
}

// CLI entry point
if (import.meta.url === `file://${process.argv[1]}`) {
  const subject = process.argv[2] || 'whale watching at sunrise in Guerrero Negro';
  writeImagePrompt(subject, 'instagram-feed', 'scout').then(console.log).catch(console.error);
}

export default vistaAgentConfig;
