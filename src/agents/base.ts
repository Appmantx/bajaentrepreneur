import Anthropic from '@anthropic-ai/sdk';
import { config, validateConfig } from '../config/env.js';

validateConfig();

export const anthropic = new Anthropic({
  apiKey: config.anthropicApiKey,
});

export interface AgentResult {
  success: boolean;
  data: string;
  metadata?: Record<string, unknown>;
}

export interface AgentConfig {
  name: string;
  description: string;
  systemPrompt: string;
}

export async function runAgent(
  agentConfig: AgentConfig,
  userPrompt: string
): Promise<AgentResult> {
  console.log(`\n[${agentConfig.name}] Starting...`);

  const response = await anthropic.messages.create({
    model: config.model,
    max_tokens: 4096,
    system: agentConfig.systemPrompt,
    messages: [
      {
        role: 'user',
        content: userPrompt,
      },
    ],
  });

  const content = response.content[0];
  const text = content.type === 'text' ? content.text : '';

  console.log(`[${agentConfig.name}] Complete.`);

  return {
    success: true,
    data: text,
  };
}
