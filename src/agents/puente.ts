import { runAgent, AgentConfig } from './base.js';

const PUENTE_SYSTEM_PROMPT = `# PUENTE — Translation Agent
## Baja Scout & Baja Entrepreneur

## Identity

You are PUENTE, the Translation Agent for Baja Scout and Baja Entrepreneur. Your name means "bridge" in Spanish — and that is exactly what you are. You bridge languages, cultures, and worlds. You connect the English-speaking content this team produces with the Spanish-speaking audiences who deserve to receive it in a way that feels like it was written for them — not translated at them.

You are not a translation tool. You are a cultural interpreter, a bilingual writer, and a guardian of authenticity. You understand that the gap between a direct translation and a genuinely resonant one is the difference between content that informs and content that connects.

You are deeply fluent in both English and Spanish, and fluent in something more important — the cultural context that gives words their real meaning. You know that Baja California Spanish carries regional vocabulary distinct from Mexico City Spanish, Colombian Spanish, and Castilian Spanish.

## Baja Scout — Spanish Translation Mission

**Audience**: Mexican domestic tourists, Mexican nationals from other states, Latin American travelers, Baja locals, Spanish-speaking expats

**Voice**: Warm, local, alive. The same energetic friend-who-knows-Baja energy — but in Spanish that sounds like it was written by someone from Baja, not translated from English.

**Key considerations**:
- Food vocabulary must be locally accurate
- Marina's voice translates with warmth and regional personality
- Humor requires creative adaptation — find the Spanish equivalent
- Use tú (informal) register

## Baja Entrepreneur — Spanish Translation Mission

**Audience**: Mexican business professionals, Mexican investors, Latin American investors, Spanish-speaking expats in Baja, Mexican government officials

**Voice**: Professional, credible, respectful. The Spanish of a well-educated Mexican professional communicating with peers.

**Key considerations**:
- Legal and business terminology must be precise
- Formality register must match (use usted)
- Numbers follow Mexican formatting conventions
- Legal caveats must be accurate
- Cortez's voice is measured and authoritative

## Regional Spanish Expertise

**Northern Baja (Tijuana, Mexicali, Ensenada)**:
- Heavy border culture influence, Spanglish is natural in casual contexts
- US cultural references land more naturally

**Southern Baja (La Paz, Los Cabos, Loreto)**:
- More traditional Mexican Spanish
- Distinct Sudcaliforniano identity
- Hospitality-inflected vocabulary

## Key Vocabulary Standards

**Food (Scout)**: taco de pescado, ceviche, aguachile, mariscos (not "comida del mar")

**Real estate/Legal (Entrepreneur)**:
- Fideicomiso — never translate to "bank trust" in Spanish
- Notario Público — full term on first reference
- Escritura — correct term for deed
- Zona Restringida — not "zona prohibida"
- Predial — property tax (not "impuesto a la propiedad")
- Ejido — never translate this culturally specific term

**Geography**:
- Baja California (northern state, NOT "Baja California Norte")
- Baja California Sur (southern state)

## Translation Process

1. Review source content — purpose, audience, brand, register (tú/usted)
2. Flag issues — idioms, humor, cultural references needing adaptation
3. Translate with cultural intelligence — write as if originally in Spanish
4. Review for authenticity — does it read as native Spanish?
5. Deliver with notes — register used, adaptations made, review recommendations

## Quality Standards

**Authenticity Test**: "Would a well-educated Mexican professional think this was written by a Mexican?"

**Voice Test**: Marina and Cortez must sound like they have always spoken Spanish, not like translated characters.

**Accuracy Test**: Technical and legal terms must be precisely correct.

## What PUENTE Does NOT Do
- Write original Spanish content from scratch — PLUMA writes, PUENTE translates
- Provide legal advice
- Manage Spanish social media posting — that is CHISPA
- Handle SEO technical implementation — that is CIMA
- Translate into languages other than Spanish
`;

const puenteAgentConfig: AgentConfig = {
  name: 'PUENTE',
  description: 'Translation Agent — English to Spanish translation with cultural adaptation',
  systemPrompt: PUENTE_SYSTEM_PROMPT,
};

export async function translateContent(
  content: string,
  contentType: 'blog' | 'social' | 'email' | 'legal' | 'website' | 'print' | 'video-script',
  brand: 'scout' | 'entrepreneur' = 'entrepreneur',
  targetAudience?: string
): Promise<string> {
  console.log(`[PUENTE] Translating ${contentType} content to Spanish...`);

  const register = brand === 'scout' ? 'tú (informal)' : 'usted (formal)';

  const result = await runAgent(
    puenteAgentConfig,
    `Translate this content into Mexican Spanish.

Content type: ${contentType}
Brand: ${brand === 'scout' ? 'Baja Scout' : 'Baja Entrepreneur'}
Register: ${register}
${targetAudience ? `Target audience: ${targetAudience}` : ''}

Source content:
${content}

Provide:
1. Full Spanish translation
2. Notes on register used and why
3. Any significant adaptations made (idioms, humor, cultural references)
4. Recommendations for review (CASA for legal terms, VELA for tourism terms)
5. Text length change percentage for VISTA

Remember: The translation should read as if it was originally written in Spanish by a Mexican.`
  );

  return result.data;
}

export async function translateSocialCaption(
  caption: string,
  platform: 'instagram' | 'facebook' | 'linkedin' | 'tiktok',
  brand: 'scout' | 'entrepreneur' = 'scout'
): Promise<string> {
  console.log(`[PUENTE] Translating social caption for ${platform}...`);

  const result = await runAgent(
    puenteAgentConfig,
    `Translate this social media caption into Mexican Spanish.

Platform: ${platform}
Brand: ${brand === 'scout' ? 'Baja Scout' : 'Baja Entrepreneur'}
Register: ${brand === 'scout' ? 'tú (informal, warm)' : 'usted (professional)'}

English caption:
${caption}

Important: Social captions require creative adaptation, not direct translation. The Spanish version should achieve the same emotional impact and engagement potential. Preserve hashtag strategy but adapt hashtags to Spanish where appropriate.

Provide:
1. Spanish caption (ready to post)
2. Adapted hashtags
3. Notes on adaptations made
4. Character count comparison`
  );

  return result.data;
}

export async function translateMarinaContent(
  content: string,
  contentType: string
): Promise<string> {
  console.log(`[PUENTE] Translating Marina content...`);

  const result = await runAgent(
    puenteAgentConfig,
    `Translate this Marina (gray whale mascot) content into Mexican Spanish.

Content type: ${contentType}

Marina's voice in English: Warm, wise, slightly playful, deeply local — like a beloved Baja elder who wants you to love her home as much as she does.

Marina's voice in Spanish: The same warmth, wisdom, and playfulness — but she sounds like a Baja local who has always spoken Spanish, not a translated character.

Register: tú (informal, warm)

English content:
${content}

Provide:
1. Full Spanish translation with Marina's voice intact
2. Notes on how you preserved her personality
3. Any phrases that required creative adaptation`
  );

  return result.data;
}

export async function translateCortezContent(
  content: string,
  contentType: string
): Promise<string> {
  console.log(`[PUENTE] Translating Cortez content...`);

  const result = await runAgent(
    puenteAgentConfig,
    `Translate this Cortez (manta ray mascot) content into Mexican Spanish.

Content type: ${contentType}

Cortez's voice in English: Sharp, measured, authoritative — the strategic advisor who has done the homework.

Cortez's voice in Spanish: The same sharpness and precision — in the register of a sophisticated Mexican professional. He sounds like the most credible person in the room at a Baja business event.

Register: usted (formal, professional)

English content:
${content}

Provide:
1. Full Spanish translation with Cortez's voice intact
2. Notes on how you preserved his authority
3. Any technical terms verified for accuracy`
  );

  return result.data;
}

export async function translateLegalContent(
  content: string,
  documentType: string
): Promise<string> {
  console.log(`[PUENTE] Translating legal/real estate content...`);

  const result = await runAgent(
    puenteAgentConfig,
    `Translate this legal/real estate content into Mexican Spanish with precise terminology.

Document type: ${documentType}
Brand: Baja Entrepreneur
Register: usted (formal)

CRITICAL: Legal and real estate terminology must be precisely correct. Use the exact Spanish legal terms:
- Fideicomiso (never "bank trust")
- Notario Público (full term)
- Escritura (deed)
- Zona Restringida (restricted zone)
- Predial (property tax)
- Ejido (never translate)
- Registro Público de la Propiedad

English content:
${content}

Provide:
1. Full Spanish translation with precise legal terminology
2. List of all legal terms used and their exact Spanish equivalents
3. Flag any terms that should be reviewed by CASA or a Mexican attorney
4. Disclaimer recommendations for Spanish version`
  );

  return result.data;
}

export async function createSpanishKeywordRecommendations(
  englishKeywords: string[],
  brand: 'scout' | 'entrepreneur' = 'entrepreneur'
): Promise<string> {
  console.log(`[PUENTE] Creating Spanish keyword recommendations...`);

  const result = await runAgent(
    puenteAgentConfig,
    `Provide Spanish keyword recommendations for these English SEO targets.

English keywords:
${englishKeywords.map((k, i) => `${i + 1}. ${k}`).join('\n')}

Brand: ${brand === 'scout' ? 'Baja Scout' : 'Baja Entrepreneur'}

Important: Spanish keywords are not direct translations. Provide the natural Spanish search terms a Mexican would actually type.

For each English keyword, provide:
1. Natural Spanish equivalent (how Mexicans actually search)
2. Alternative Spanish search variations
3. Regional variations if applicable (northern vs southern Baja)
4. Search intent notes
5. Recommended hreflang tag (es-MX for Mexico-specific, es for all Spanish)`
  );

  return result.data;
}

export async function translateEmailSequence(
  emails: string[],
  sequenceName: string,
  brand: 'scout' | 'entrepreneur' = 'entrepreneur'
): Promise<string> {
  console.log(`[PUENTE] Translating email sequence: ${sequenceName}...`);

  const result = await runAgent(
    puenteAgentConfig,
    `Translate this email sequence into Mexican Spanish.

Sequence name: ${sequenceName}
Brand: ${brand === 'scout' ? 'Baja Scout' : 'Baja Entrepreneur'}
Register: ${brand === 'scout' ? 'tú (warm, friendly)' : 'usted (professional)'}

Emails to translate:
${emails.map((email, i) => `--- EMAIL ${i + 1} ---\n${email}`).join('\n\n')}

For each email provide:
1. Translated subject line
2. Translated body
3. Notes on adaptations
4. CTA translation

Also provide:
- Overall sequence flow check (does it feel natural in Spanish?)
- Any emails that need significant rewriting vs direct translation`
  );

  return result.data;
}

export async function reviewSpanishContent(
  spanishContent: string,
  originalEnglish: string,
  brand: 'scout' | 'entrepreneur' = 'entrepreneur'
): Promise<string> {
  console.log(`[PUENTE] Reviewing Spanish content for authenticity...`);

  const result = await runAgent(
    puenteAgentConfig,
    `Review this Spanish translation for authenticity and quality.

Brand: ${brand === 'scout' ? 'Baja Scout' : 'Baja Entrepreneur'}

Original English:
${originalEnglish}

Spanish translation to review:
${spanishContent}

Evaluate:
1. Authenticity test — does it read as native Mexican Spanish?
2. Register consistency — is tú/usted used correctly throughout?
3. Cultural adaptation — were idioms and references properly adapted?
4. Brand voice — does the brand personality come through?
5. Technical accuracy — are any specialized terms correct?
6. Regional appropriateness — is it suitable for Baja audiences?

Provide:
- Overall quality score (1-10)
- Specific issues found
- Recommended corrections
- What works well`
  );

  return result.data;
}

export async function adaptHumor(
  englishJoke: string,
  context: string
): Promise<string> {
  console.log(`[PUENTE] Adapting humor for Spanish...`);

  const result = await runAgent(
    puenteAgentConfig,
    `Adapt this English humor/wordplay into Spanish.

English:
${englishJoke}

Context: ${context}

Remember: Direct translation kills humor. Find a Spanish equivalent that achieves the same laugh or emotional response.

Provide:
1. Spanish adaptation (not translation)
2. Explanation of why the adaptation works
3. Alternative version if the first might not land
4. Whether to keep or remove the humor entirely (sometimes removal is best)`
  );

  return result.data;
}

export function getPuenteGreeting(): string {
  return `
Hola — soy PUENTE, el agente de traducción para Baja Scout y Baja Entrepreneur. I bridge the
two languages that define Baja — and I make sure that every piece of content this team produces
in English reaches Spanish-speaking audiences in a way that feels written for them, not
translated at them.

Send me the content, tell me the audience and the platform, and I will bring it across the
bridge with the full personality of the brand intact.

¿Qué traducimos hoy?
`;
}

// CLI entry point
if (import.meta.url === `file://${process.argv[1]}`) {
  const testContent = process.argv[2] || 'Welcome to Baja California, where adventure meets authenticity.';
  translateContent(testContent, 'website', 'scout').then(console.log).catch(console.error);
}

export default puenteAgentConfig;
