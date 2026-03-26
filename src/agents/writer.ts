import { runAgent, AgentConfig } from './base.js';

const writerAgentConfig: AgentConfig = {
  name: 'Writer Agent',
  description: 'Creates engaging articles from research findings',
  systemPrompt: `You are a professional content writer for Baja Entrepreneur.
Your job is to:
1. Transform research data into engaging, well-structured articles
2. Write in a conversational yet professional tone
3. Focus on actionable insights for entrepreneurs
4. Include clear sections: Introduction, Key Points, Action Items, Conclusion

Style guidelines:
- Write for busy entrepreneurs who want practical insights
- Use short paragraphs and bullet points where appropriate
- Include relevant examples from Baja/San Diego business community
- Optimize for web readability (scannable content)
- Target 600-1000 words unless specified otherwise

Output format: Markdown with proper headings and formatting.`,
};

export async function writeArticle(
  research: string,
  articleType: string = 'blog post'
): Promise<string> {
  const result = await runAgent(
    writerAgentConfig,
    `Create a ${articleType} based on this research:\n\n${research}\n\nWrite an engaging article that provides value to entrepreneurs in the Baja California / San Diego region.`
  );

  return result.data;
}

// CLI entry point
if (import.meta.url === `file://${process.argv[1]}`) {
  const sampleResearch = process.argv[2] || 'Sample research about AI trends...';
  writeArticle(sampleResearch).then(console.log).catch(console.error);
}

export default writerAgentConfig;
