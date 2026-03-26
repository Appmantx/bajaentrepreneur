import { runAgent, AgentConfig } from './base.js';

const CHAVO_SYSTEM_PROMPT = `# CHAVO — Librarian Agent
## Baja Scout & Baja Entrepreneur

## Identity

You are CHAVO, the Librarian for Baja Scout and Baja Entrepreneur. Your name is a nod to the beloved Mexican cultural icon — friendly, resourceful, always in the middle of everything, somehow making it all work. You are in the middle of every file, every document, every image that flows through this operation — and you make sure nothing gets lost, nothing goes unprocessed, and nothing is harder to find tomorrow than it was today.

You are the keeper of the physical knowledge layer. While DATO manages analytics data and SCOUT manages research intelligence, you manage the files. PDFs, scanned invoices, property contracts, images, audio recordings, research articles, press clippings, brand assets — anything that arrives as a file passes through your hands first.

You watch the team_inbox/ folder. The moment something arrives, you pick it up, figure out what it is, extract what can be extracted, categorize it intelligently, file it to the right place on disk and in the database, and deliver a clean summary to owner_inbox/.

**Core mission: Inbox zero. Always.**

## File Categories

**Baja Scout categories:**
- whale_watching, tourism_activity, food_culture, destination_guide
- press_media, event_material, brand_asset

**Baja Entrepreneur categories:**
- real_estate, legal, financial, investor_material
- business_contact, event_material, brand_asset

**General categories:**
- research, correspondence, media, audio_video, unknown

## Smart Routing

| File Type | Route To |
|-----------|----------|
| Research articles | SCOUT |
| Images/photography | VISTA |
| Real estate docs | CASA |
| Legal documents | Flag for human review |
| Financial documents | owner_inbox/financial/ |
| Press coverage | PLUMA |
| Brand assets | assets/ subfolder |
| Newsletter content | COLMENA |
| Unknown | owner_inbox/review_needed/ |

## File Naming Standard

[brand]-[category]-[description]-[date].[ext]

Examples:
- scout-event-valle-harvest-festival-flyer-2026-08-01.pdf
- entrepreneur-real_estate-ensenada-condo-listing-2026-03-15.pdf

## What CHAVO Does NOT Do
- Interpret legal documents — extract and flag only
- Make financial decisions — extract data, flag for owner
- Delete files — archive only, owner deletes
- Edit document content — read and extract only
- Share files externally — all processing is local
`;

const chavoAgentConfig: AgentConfig = {
  name: 'CHAVO',
  description: 'Librarian Agent — File processing, OCR, inbox management, database filing',
  systemPrompt: CHAVO_SYSTEM_PROMPT,
};

export async function processInboxFile(
  fileName: string,
  fileType: string,
  fileContent?: string
): Promise<string> {
  console.log(`[CHAVO] Processing inbox file: ${fileName}...`);

  const result = await runAgent(
    chavoAgentConfig,
    `Process this file from the team inbox.

File name: ${fileName}
File type: ${fileType}
${fileContent ? `\nContent preview:\n${fileContent.substring(0, 2000)}` : ''}

Determine:
1. Brand context (Baja Scout, Baja Entrepreneur, both, or unknown)
2. Category (from the standard categories)
3. Key metadata to extract (dates, names, amounts, addresses)
4. Route destination (which agent or folder)
5. Recommended new file name (following naming standard)
6. Any flags or concerns

Provide a structured processing report.`
  );

  return result.data;
}

export async function categorizeFile(
  fileName: string,
  contentSummary: string
): Promise<string> {
  console.log(`[CHAVO] Categorizing file: ${fileName}...`);

  const result = await runAgent(
    chavoAgentConfig,
    `Categorize this file for the knowledge base.

File: ${fileName}
Content summary: ${contentSummary}

Determine:
1. Primary category
2. Secondary tags
3. Brand (scout/entrepreneur/both)
4. Destination folder path
5. Database entry fields:
   - file_name
   - file_type
   - brand
   - category
   - description
   - tags
   - agent_handler`
  );

  return result.data;
}

export async function generateInboxReport(
  processedFiles: Array<{name: string, category: string, route: string, status: string}>
): Promise<string> {
  console.log(`[CHAVO] Generating inbox report...`);

  const fileList = processedFiles.map(f =>
    `├── ${f.name} → ${f.category} → ${f.route} ${f.status === 'flagged' ? '⚠️ FLAGGED' : '✓'}`
  ).join('\n');

  const flaggedCount = processedFiles.filter(f => f.status === 'flagged').length;

  const result = await runAgent(
    chavoAgentConfig,
    `Generate a clean inbox processing report.

Files processed:
${fileList}

Total files: ${processedFiles.length}
Flagged for review: ${flaggedCount}

Create a report in this format:
CHAVO — Inbox Processing Report
Session: [current date/time]

FILES PROCESSED: [count]
[file list with categories and routes]

FILES REQUIRING YOUR REVIEW: [count]
[flagged files with reasons]

DATABASE: [count] new records added
INBOX STATUS: [Clean ✓ or Items pending]`
  );

  return result.data;
}

export async function auditKnowledgeBase(
  folderPath: string
): Promise<string> {
  console.log(`[CHAVO] Auditing knowledge base: ${folderPath}...`);

  const result = await runAgent(
    chavoAgentConfig,
    `Create an audit plan for the knowledge base folder.

Folder to audit: ${folderPath}

The audit should check for:
1. Files on disk but not in database (orphaned files)
2. Database entries with missing files (broken references)
3. Duplicate files (same content, multiple locations)
4. Files not following naming convention
5. Uncategorized or miscategorized files
6. Old content that may need archiving

Provide:
1. Audit checklist
2. SQL queries to run against the files table
3. File system checks to perform
4. Report template for findings
5. Recommended remediation steps for common issues`
  );

  return result.data;
}

export async function processScannedDocument(
  fileName: string,
  ocrText: string,
  ocrConfidence: 'high' | 'medium' | 'low'
): Promise<string> {
  console.log(`[CHAVO] Processing scanned document: ${fileName}...`);

  const result = await runAgent(
    chavoAgentConfig,
    `Process this scanned document with OCR results.

File: ${fileName}
OCR Confidence: ${ocrConfidence}

Extracted text:
${ocrText}

Determine:
1. Document type (invoice, contract, listing, correspondence, etc.)
2. Language (English or Spanish)
3. Key fields extracted:
   - Dates
   - Names/parties
   - Amounts/figures
   - Addresses
   - Reference numbers
4. Category and routing
5. Recommended file name
6. Flags or concerns

${ocrConfidence === 'low' ? 'NOTE: OCR quality is low — flag extracted data for manual verification.' : ''}
${ocrText.includes('fideicomiso') || ocrText.includes('contrato') ? 'NOTE: This appears to be a legal document — flag for CASA or human review.' : ''}`
  );

  return result.data;
}

export async function createDatabaseEntry(
  file: {
    name: string,
    path: string,
    type: string,
    sizeKb: number,
    brand: string,
    category: string,
    description: string,
    ocrText?: string,
    tags?: string[]
  }
): Promise<string> {
  console.log(`[CHAVO] Creating database entry for: ${file.name}...`);

  const result = await runAgent(
    chavoAgentConfig,
    `Generate the database INSERT statement for this file.

File details:
- Name: ${file.name}
- Path: ${file.path}
- Type: ${file.type}
- Size: ${file.sizeKb} KB
- Brand: ${file.brand}
- Category: ${file.category}
- Description: ${file.description}
${file.ocrText ? `- OCR Text: [${file.ocrText.length} characters extracted]` : ''}
${file.tags ? `- Tags: ${file.tags.join(', ')}` : ''}

Generate:
1. INSERT statement for the files table
2. INSERT statement for the team_inbox_log table
3. Any additional metadata to store
4. Verification query to confirm insertion`
  );

  return result.data;
}

export async function suggestFileOrganization(
  files: string[],
  currentFolder: string
): Promise<string> {
  console.log(`[CHAVO] Suggesting file organization...`);

  const result = await runAgent(
    chavoAgentConfig,
    `Suggest organization for these files.

Current folder: ${currentFolder}
Files:
${files.map((f, i) => `${i + 1}. ${f}`).join('\n')}

For each file, suggest:
1. Correct category
2. Proper file name (following naming convention)
3. Destination folder
4. Any files that should be grouped together
5. Any files that appear to be duplicates

Provide a reorganization plan with specific move/rename commands.`
  );

  return result.data;
}

export async function findFile(
  searchQuery: string,
  searchType: 'name' | 'content' | 'category' | 'date'
): Promise<string> {
  console.log(`[CHAVO] Searching for files: ${searchQuery}...`);

  const result = await runAgent(
    chavoAgentConfig,
    `Help locate a file in the knowledge base.

Search query: "${searchQuery}"
Search type: ${searchType}

Generate:
1. SQL query to search the files table
2. File system search command
3. Alternative search terms to try
4. Likely locations based on the query
5. Tips for narrowing down results`
  );

  return result.data;
}

export async function standardizeFileNames(
  files: Array<{current: string, context: string}>
): Promise<string> {
  console.log(`[CHAVO] Standardizing file names...`);

  const fileList = files.map(f => `- Current: ${f.current}\n  Context: ${f.context}`).join('\n\n');

  const result = await runAgent(
    chavoAgentConfig,
    `Standardize these file names to follow the naming convention.

Naming convention: [brand]-[category]-[description]-[date].[ext]

Files to rename:
${fileList}

For each file provide:
1. Recommended new name
2. Rename command
3. Database UPDATE statement to reflect new name`
  );

  return result.data;
}

export function getChavoGreeting(): string {
  return `
Hola — soy CHAVO, the Librarian. I keep the files organized, the inbox clean, and the
database complete.

Let me check the team inbox first and see what came in since the last session. I will
have a report for you in a moment.
`;
}

// CLI entry point
if (import.meta.url === `file://${process.argv[1]}`) {
  const fileName = process.argv[2] || 'sample-document.pdf';
  const fileType = process.argv[3] || 'pdf';
  processInboxFile(fileName, fileType).then(console.log).catch(console.error);
}

export default chavoAgentConfig;
