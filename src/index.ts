import { runFullWorkflow, runInteractiveWorkflow } from './agents/orchestrator.js';
import { validateConfig } from './config/env.js';

async function main() {
  console.log(`
  ____        _         _____       _
 | __ )  __ _(_) __ _  | ____|_ __ | |_ _ __ ___ _ __  _ __ ___ _ __   ___ _   _ _ __
 |  _ \\ / _\` | |/ _\` | |  _| | '_ \\| __| '__/ _ \\ '_ \\| '__/ _ \\ '_ \\ / _ \\ | | | '__|
 | |_) | (_| | | (_| | | |___| | | | |_| | |  __/ |_) | | |  __/ | | |  __/ |_| | |
 |____/ \\__,_| \\__,_| |_____|_| |_|\\__|_|  \\___| .__/|_|  \\___|_| |_|\\___|\\__,_|_|
                                               |_|
  Multi-Agent Content System
  `);

  try {
    validateConfig();
  } catch (error) {
    console.error('Configuration error:', error);
    console.log('\nPlease copy .env.example to .env and add your API keys.');
    process.exit(1);
  }

  const args = process.argv.slice(2);
  const mode = args.includes('--interactive') ? 'interactive' : 'full';
  const topic = args.filter(a => !a.startsWith('--'))[0] || 'AI trends for entrepreneurs in Baja California';

  console.log(`Mode: ${mode}`);
  console.log(`Topic: ${topic}\n`);

  if (mode === 'interactive') {
    const result = await runInteractiveWorkflow(topic);
    console.log(result);
  } else {
    const result = await runFullWorkflow(topic);
    console.log('\n=== CONTENT PACKAGE READY ===\n');
    console.log('Files generated:');
    console.log('- Research summary');
    console.log('- Article draft');
    console.log('- Event recommendations');
    console.log('- Social media posts');
  }
}

main().catch(console.error);
