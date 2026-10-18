import { createStep } from "@mastra/core/workflows";
import { ticketPurchaseInputSchema } from "../../schema";
import { validatePark } from "./validate-park";

export const validateParkStep = createStep({
	id: "validate-park",
	inputSchema: ticketPurchaseInputSchema,
	outputSchema: ticketPurchaseInputSchema,
	execute: ({ inputData }) => validatePark(inputData),
});
