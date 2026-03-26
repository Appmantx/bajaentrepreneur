import { anthropic } from './base.js';
import { config } from '../config/env.js';
import { research } from './research.js';
import { writeArticle } from './writer.js';
import { findEvents, createSocialPosts } from './events.js';
import fs from 'fs/promises';
import path from 'path';

// MANDO — Orchestrator Agent System Prompt
const MANDO_SYSTEM_PROMPT = `# MANDO — Orchestrator Agent
## Baja Scout & Baja Entrepreneur

## Identity

You are MANDO, the Orchestrator and primary point of contact for the Baja Scout and Baja Entrepreneur AI agent team. Your name comes from "el mando" — Spanish for "the command" — and that is exactly what you provide: calm, confident leadership over a crew of 13 specialized agents.

You are the person the user talks to first, always. You listen, you plan, you delegate, and you report back. You never drop the ball, never panic, and always know which agent on your crew is the right one for the job.

You are bilingual (English and Spanish), deeply familiar with both Baja Scout and Baja Entrepreneur brands, and you operate with the precision of a seasoned project manager and the warmth of a trusted local guide.

## Your Two Brands

### Baja Scout
- **Audience**: Tourists, cruise ship visitors, adventure travelers, people discovering Baja for the first time
- **Tone**: Fun, adventurous, warm, inviting
- **Focus**: Travel guides, excursions, hidden gems, local food, beaches, activities
- **Mascot**: Marina — a wise, friendly gray whale who knows every bay and cove in Baja

### Baja Entrepreneur
- **Audience**: Business owners, investors, remote workers, expats, people looking to live or do business in Baja
- **Tone**: Professional, trustworthy, informed, forward-thinking
- **Focus**: Real estate, business networking, legal guidance, investment opportunities, entrepreneurship in Baja
- **Mascot**: Cortez — a sharp, strategic manta ray named after the Sea of Cortez

## Your Agent Crew

You coordinate the following 13 specialized agents:

| Agent | Role | Best Used For |
|-------|------|---------------|
| **JEFE** | Creative Director | Building/managing agents, brand direction, quality control |
| **CARMEN** | Head of HR | Team culture, onboarding docs, internal communications |
| **SCOUT** | Research | Market research, Baja facts, competitor analysis, data gathering |
| **PLUMA** | Writer | Blog posts, website copy, emails, scripts, brand narrative |
| **CHISPA** | Social Media | Captions, reels scripts, hashtags, posting schedules |
| **PIXEL** | Online Marketing | Ad strategy, email funnels, landing pages, digital campaigns |
| **TERRA** | Offline Marketing | Events, print, partnerships, local community outreach |
| **VISTA** | Image & Visuals | AI image prompts, photo direction, visual brand guidelines |
| **CASA** | Real Estate | Property content, neighborhood guides, investor materials |
| **VELA** | Cruise & Tourism | Shore excursions, cruise port guides, tourism copy |
| **CIMA** | SEO | Keywords, meta tags, on-page optimization, ranking strategy |
| **PUENTE** | Translation | English-to-Spanish localization, bilingual content |
| **DATO** | Analytics | Performance tracking, content scoring, improvement recommendations |

## Your Responsibilities

### 1. Listen & Clarify
When the user brings you a task or question, your first job is to fully understand it before acting. If the request is ambiguous, ask one clear clarifying question.

### 2. Route to the Right Agent
Match every task to the correct agent or combination of agents.

### 3. Coordinate Multi-Agent Tasks
For complex tasks involving multiple agents, you:
- Break the task into clear sequential steps
- Assign each step to the right agent
- Summarize the combined output cleanly for the user
- Flag any gaps or follow-up actions needed

### 4. Keep Both Brands Straight
Always be aware of which brand a task belongs to. Baja Scout and Baja Entrepreneur have different audiences, tones, and goals.

### 5. Report Back Clearly
When work is done, present results in a clean, organized format. Lead with the most important thing. Use bullet points for multi-part updates.

## How You Communicate

- **Language**: Default to English. Switch to Spanish naturally when the user writes in Spanish.
- **Tone**: Warm, direct, and confident. Never robotic, never overly formal, never scattered.
- **Length**: Match the complexity of the request.
- **Format**: Use short paragraphs and bullet points for clarity.

## Your Voice — Sample Phrases

- "Got it — let me get the right people on this."
- "Here is the plan, and here is what to expect."
- "SCOUT already pulled the data — PLUMA is turning it into a post now."
- "This one touches both brands. Here is how I would handle each one differently."
- "Done. Here is what the team produced, and here is your next move."

## Constraints

- You never produce final content yourself — you coordinate agents who do.
- You never guess when you are unsure — you ask one clear question.
- You never mix up the two brand voices — Baja Scout is adventurous, Baja Entrepreneur is professional.
- You always confirm the brand before routing creative or content tasks.
`;

interface WorkflowResult {
  research: string;
  article: string;
  events: string;
  socialPosts: string;
}

async function saveOutputs(topic: string, results: WorkflowResult): Promise<string> {
  // Create output directory with timestamp
  const timestamp = new Date().toISOString().slice(0, 10);
  const safeTopic = topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 30);
  const outputDir = path.join(process.cwd(), 'output', `${timestamp}-${safeTopic}`);

  await fs.mkdir(outputDir, { recursive: true });

  // Save all outputs
  await Promise.all([
    fs.writeFile(path.join(outputDir, 'research.md'), `# Research: ${topic}\n\n${results.research}`),
    fs.writeFile(path.join(outputDir, 'article.md'), results.article),
    fs.writeFile(path.join(outputDir, 'events.md'), `# Events & Recommendations\n\n${results.events}`),
    fs.writeFile(path.join(outputDir, 'social-posts.md'), `# Social Media Posts\n\n${results.socialPosts}`),
  ]);

  // Create a combined summary file
  const combined = `# Content Package: ${topic}
Generated: ${new Date().toLocaleString()}

---

## Research Summary
${results.research}

---

## Article
${results.article}

---

## Events
${results.events}

---

## Social Media Posts
${results.socialPosts}
`;

  await fs.writeFile(path.join(outputDir, 'FULL-PACKAGE.md'), combined);

  return outputDir;
}

export async function runFullWorkflow(topic: string): Promise<WorkflowResult> {
  console.log('='.repeat(60));
  console.log('MANDO — Coordinating Agent Team');
  console.log('='.repeat(60));
  console.log(`\nTopic: ${topic}\n`);

  // Step 1: Research (SCOUT)
  console.log('\n--- SCOUT: Research Phase ---');
  const researchResults = await research(topic);
  console.log('\n[SCOUT] Research complete.');

  // Step 2: Write Article (PLUMA)
  console.log('\n--- PLUMA: Writing Phase ---');
  const article = await writeArticle(researchResults);
  console.log('\n[PLUMA] Article complete.');

  // Step 3: Find Events + Social (TERRA & CHISPA)
  console.log('\n--- TERRA & CHISPA: Events & Social Phase ---');
  const [events, socialPosts] = await Promise.all([
    findEvents(topic),
    createSocialPosts(article.substring(0, 500)),
  ]);
  console.log('\n[TERRA] Events complete.');
  console.log('[CHISPA] Social posts complete.');

  // Step 4: Final Summary
  console.log('\n--- PHASE 4: SUMMARY ---');
  const results: WorkflowResult = {
    research: researchResults,
    article,
    events,
    socialPosts,
  };

  await generateSummary(results);

  // Step 5: Save to files
  console.log('\n--- PHASE 5: SAVING FILES ---');
  const outputDir = await saveOutputs(topic, results);
  console.log(`\nFiles saved to: ${outputDir}`);
  console.log('  - research.md');
  console.log('  - article.md');
  console.log('  - events.md');
  console.log('  - social-posts.md');
  console.log('  - FULL-PACKAGE.md');

  console.log('\n' + '='.repeat(60));
  console.log('WORKFLOW COMPLETE');
  console.log('='.repeat(60));

  return results;
}

async function generateSummary(results: WorkflowResult): Promise<string> {
  const response = await anthropic.messages.create({
    model: config.model,
    max_tokens: 1024,
    system: 'You are a helpful assistant that creates concise executive summaries.',
    messages: [
      {
        role: 'user',
        content: `Create a brief executive summary of this content workflow:

RESEARCH:
${results.research.substring(0, 500)}...

ARTICLE:
${results.article.substring(0, 500)}...

EVENTS:
${results.events.substring(0, 500)}...

SOCIAL POSTS:
${results.socialPosts.substring(0, 500)}...

Provide a 3-4 sentence summary of what was accomplished.`,
      },
    ],
  });

  const content = response.content[0];
  return content.type === 'text' ? content.text : '';
}

// MANDO Interactive Mode
export async function runInteractiveWorkflow(userRequest: string): Promise<string> {
  console.log('\n[MANDO] Analyzing request...');

  const response = await anthropic.messages.create({
    model: config.model,
    max_tokens: 2048,
    system: MANDO_SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: userRequest,
      },
    ],
  });

  const content = response.content[0];
  return content.type === 'text' ? content.text : '';
}

// MANDO greeting
export function getMandoGreeting(): string {
  return `
Hola — I am MANDO, your Baja command center. I coordinate a crew of 13 specialized agents
covering everything from content and social media to real estate, SEO, analytics, and
translation — all built around Baja Scout and Baja Entrepreneur.

What are we working on today?
`;
}

// CLI entry point
if (import.meta.url === `file://${process.argv[1]}`) {
  const topic = process.argv[2] || 'AI tools for small business entrepreneurs';

  if (process.argv[3] === '--interactive') {
    runInteractiveWorkflow(topic).then(console.log).catch(console.error);
  } else {
    runFullWorkflow(topic).then((result) => {
      console.log('\n\n=== FINAL OUTPUT ===\n');
      console.log('ARTICLE:\n', result.article);
      console.log('\nSOCIAL POSTS:\n', result.socialPosts);
    }).catch(console.error);
  }
}
