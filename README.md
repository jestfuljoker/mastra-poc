# Theme Park Agent — Mastra POC

An educational project for exploring AI agents and workflows with [Mastra](https://mastra.ai). The agent helps plan a theme-park visit using live queue information, park data, weather, conversation memory, and a simulated ticket-purchase workflow.

> This is a learning project, not a production booking or payment system. The payment step is simulated and never charges a card.

## What it can do

- Find parks by name and retrieve their Queue-Times park IDs.
- Fetch current ride wait times and sort attractions from the shortest wait to the longest.
- Use Firecrawl through MCP to scrape Queue-Times pages for park hours, crowd forecasts, ride status, and attendance information.
- Retrieve current weather through Open-Meteo when weather is relevant to the plan.
- Keep conversation context with Mastra Memory.
- Run a ticket-purchase workflow that validates the park, builds a quote, pauses for approval, simulates a charge, and asks the agent to create a short visit brief after confirmation.

## How it is organized

- **Agent:** `src/mastra/agents/theme-park-agent.ts` defines the assistant, its instructions, memory, and tools.
- **Tools:** `src/mastra/tools/` contains the Queue-Times lookup, live wait-time, weather, and mock-charge tools. Tool input and output contracts use Zod schemas.
- **MCP:** `src/mastra/mcp/firecrawl-mcp.ts` connects the Firecrawl MCP server and exposes its scraping tool to the agent.
- **Workflow:** `src/mastra/workflows/simulate-ticket-purchase-workflow/` contains the purchase steps, including human approval and a post-purchase agent call.
- **Mastra setup:** `src/mastra/index.ts` registers the agent and workflow and configures storage and observability.

The workflow currently follows this sequence:

1. Validate the park name.
2. Calculate the ticket quote.
3. Suspend and wait for an approval decision.
4. Simulate the payment if approved.
5. Ask the theme-park agent for a three-point visit brief.

## Run locally

### Requirements

- Node.js 24 or newer
- pnpm
- An OpenAI API key with access to the configured `openai/gpt-6-luna` model
- A Firecrawl API key for the MCP scraping tool

### Setup

```bash
pnpm install
cp .env.example .env
```

Add your keys to `.env`:

```dotenv
OPENAI_API_KEY=your-openai-api-key
FIRECRAWL_API_KEY=your-firecrawl-api-key
```

Start the development server:

```bash
pnpm run dev
```

Open [Mastra Studio](http://localhost:4111) to try the agent, inspect tools, and run the workflow. The workflow graph displays its steps and execution progress.

To create a production build:

```bash
pnpm run build
```

## Storage and observability

The default storage is `LibSQLStore`. Without Turso credentials, the project uses a local `./mastra.db` file. To use a remote Turso database, add these optional variables to `.env`:

```dotenv
TURSO_DATABASE_URL=libsql://your-database.turso.io
TURSO_AUTH_TOKEN=your-turso-auth-token
```

Observability uses DuckDB, with Mastra exporters configured in `src/mastra/index.ts`.

## Data and safety notes

- Queue-Times and Open-Meteo are external data sources; availability and accuracy depend on those services.
- Firecrawl scraping requires a valid API key.
- The purchase workflow uses `mockChargeTool`; it generates simulated payment details and does not contact a payment processor.
- Keep `.env` private. Never commit API keys or database tokens.

## Useful links

- [Mastra documentation](https://mastra.ai/docs)
- [Mastra Studio](https://mastra.ai/docs/studio/overview)
- [Queue-Times](https://queue-times.com/)
- [Open-Meteo](https://open-meteo.com/)
- [Firecrawl](https://www.firecrawl.dev/)

## License

Apache-2.0
