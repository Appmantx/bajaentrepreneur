import { runFullWorkflow, runInteractiveWorkflow, getMandoGreeting } from './agents/orchestrator.js';
import { validateConfig } from './config/env.js';

async function main() {
  console.log(`
  ███╗   ███╗ █████╗ ███╗   ██╗██████╗  ██████╗
  ████╗ ████║██╔══██╗████╗  ██║██╔══██╗██╔═══██╗
  ██╔████╔██║███████║██╔██╗ ██║██║  ██║██║   ██║
  ██║╚██╔╝██║██╔══██║██║╚██╗██║██║  ██║██║   ██║
  ██║ ╚═╝ ██║██║  ██║██║ ╚████║██████╔╝╚██████╔╝
  ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝  ╚═════╝

  Baja Scout & Baja Entrepreneur — Orchestrator
  13 Specialized Agents at Your Command
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

  // Show MANDO greeting
  console.log(getMandoGreeting());

  console.log(`Mode: ${mode}`);
  console.log(`Topic: ${topic}\n`);

  if (mode === 'interactive') {
    const result = await runInteractiveWorkflow(topic);
    console.log(result);
  } else {
    console.log('[MANDO] Got it — let me get the right people on this.\n');
    const result = await runFullWorkflow(topic);
    console.log('\n=== CONTENT PACKAGE READY ===\n');
    console.log('Done. Here is what the team produced:');
    console.log('- SCOUT: Research summary');
    console.log('- PLUMA: Article draft');
    console.log('- TERRA: Event recommendations');
    console.log('- CHISPA: Social media posts');
  }
}

main().catch(console.error);
