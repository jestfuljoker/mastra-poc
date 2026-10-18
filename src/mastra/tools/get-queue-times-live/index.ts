import { createTool } from "@mastra/core/tools";
import { getQueueTimesLive } from "./lib/get-queue-times-live";
import {
	getQueueTimesLiveToolInputSchema,
	getQueueTimesLiveToolOutputSchema,
} from "./schema";

export const getQueueTimesLiveTool = createTool({
	id: "getQueueTimesLiveTool",
	description:
		"Get live ride wait times for a Queue-Times park, sorted from shortest to longest wait.",
	inputSchema: getQueueTimesLiveToolInputSchema,
	outputSchema: getQueueTimesLiveToolOutputSchema,
	execute: getQueueTimesLive,
});
