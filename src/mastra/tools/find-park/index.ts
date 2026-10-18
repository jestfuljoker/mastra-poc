import { createTool } from "@mastra/core/tools";
import { findParks } from "./lib/find-parks";
import { findParkToolInputSchema, findParkToolOutputSchema } from "./schema";

export const findQueueTimesParkTool = createTool({
	id: "findQueueTimesParkTool",
	description: "Find a Queue-Times parkId by park name.",
	inputSchema: findParkToolInputSchema,
	outputSchema: findParkToolOutputSchema,
	execute: findParks,
});
