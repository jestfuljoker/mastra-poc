import { Mastra } from "@mastra/core/mastra";
import { MastraCompositeStore } from "@mastra/core/storage";
import { DuckDBStore } from "@mastra/duckdb";
import { LibSQLStore } from "@mastra/libsql";
import {
	MastraPlatformExporter,
	MastraStorageExporter,
	Observability,
	SensitiveDataFilter,
} from "@mastra/observability";
import { themeParkAgent } from "./agents/theme-park-agent";
import { simulateTicketPurchaseWorkflow } from "./workflows/simulate-ticket-purchase-workflow";

export const mastra = new Mastra({
	bundler: {
		externals: ["@duckdb/node-bindings"],
	},
	agents: { themeParkAgent },
	workflows: { simulateTicketPurchaseWorkflow },
	storage: new MastraCompositeStore({
		id: "composite-storage",
		default: new LibSQLStore({
			id: "mastra-storage",
			url: process.env.TURSO_DATABASE_URL || "file:./mastra.db",
			authToken: process.env.TURSO_AUTH_TOKEN || undefined,
		}),
		domains: {
			observability: await new DuckDBStore().getStore("observability"),
		},
	}),
	observability: new Observability({
		configs: {
			default: {
				serviceName: "mastra",
				exporters: [new MastraStorageExporter(), new MastraPlatformExporter()],
				spanOutputProcessors: [new SensitiveDataFilter()],
			},
		},
	}),
});
