import { createStep } from "@mastra/core/workflows";
import { quoteSchema, ticketPurchaseInputSchema } from "../../schema";
import { buildQuote } from "./build-quote";

export const buildQuoteStep = createStep({
	id: "build-quote",
	inputSchema: ticketPurchaseInputSchema,
	outputSchema: quoteSchema,
	execute: ({ inputData }) => buildQuote(inputData),
});
