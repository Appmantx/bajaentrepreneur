import { anthropic } from './base.js';
import { config } from '../config/env.js';
import { research } from './research.js';
import { writeArticle } from './writer.js';
import { findEvents, createSocialPosts } from './events.js';

interface WorkflowResult {
  research: string;
  article: string;
  events: string;
  socialPosts: string;
}

export async function runFullWorkflow(topic: string): Promise<WorkflowResult> {
  console.log('='.repeat(60));
  console.log('BAJA ENTREPRENEUR - MULTI-AGENT CONTENT SYSTEM');
  console.log('='.repeat(60));
  console.log(`\nTopic: ${topic}\n`);

  // Step 1: Research
  console.log('\n--- PHASE 1: RESEARCH ---');
  const researchResults = await research(topic);
  console.log('\nResearch complete.');

  // Step 2: Write Article
  console.log('\n--- PHASE 2: WRITING ---');
  const article = await writeArticle(researchResults);
  console.log('\nArticle complete.');

  // Step 3: Find Events (parallel with social posts)
  console.log('\n--- PHASE 3: EVENTS & SOCIAL ---');
  const [events, socialPosts] = await Promise.all([
    findEvents(topic),
    createSocialPosts(article.substring(0, 500)),
  ]);
  console.log('\nEvents and social posts complete.');

  // Step 4: Final Summary
  console.log('\n--- PHASE 4: SUMMARY ---');
  const summary = await generateSummary({
    research: researchResults,
    article,
    events,
    socialPosts,
  });

  console.log('\n' + '='.repeat(60));
  console.log('WORKFLOW COMPLETE');
  console.log('='.repeat(60));

  return {
    research: researchResults,
    article,
    events,
    socialPosts,
  };
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

// Interactive orchestrator with Claude deciding next steps
export async function runInteractiveWorkflow(userRequest: string): Promise<string> {
  console.log('\n[Orchestrator] Analyzing request...');

  const response = await anthropic.messages.create({
    model: config.model,
    max_tokens: 2048,
    system: `You are the Orchestrator for Baja Entrepreneur's multi-agent content system.

Available agents:
1. Research Agent - Searches for trending topics and information
2. Writer Agent - Creates articles and content
3. Events Agent - Finds local events and creates social media posts

Based on the user's request, determine the best workflow and explain what each agent will do.
Then provide a detailed plan of action.`,
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
