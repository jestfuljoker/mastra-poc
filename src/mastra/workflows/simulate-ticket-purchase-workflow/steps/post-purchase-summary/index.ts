import { createStep } from "@mastra/core/workflows";
import { postPurchaseSummaryResultSchema, resultSchema } from "../../schema";
import { postPurchaseSummary } from "./post-purchase-summary";

export const postPurchaseSummaryStep = createStep({
	id: "post-purchase-summary",
	inputSchema: resultSchema,
	outputSchema: postPurchaseSummaryResultSchema,
	execute: ({ inputData, mastra }) => postPurchaseSummary(inputData, mastra),
});
