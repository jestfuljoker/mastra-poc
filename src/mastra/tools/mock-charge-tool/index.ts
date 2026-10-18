import { createTool } from "@mastra/core/tools";
import { mockCharge } from "./lib/mock-charge";
import { mockChargeInputSchema, mockChargeOutputSchema } from "./schema";

export const mockChargeTool = createTool({
	id: "mock-charge-tool",
	description: "Simulates a Stripe-like card charge. Always succeeds.",
	inputSchema: mockChargeInputSchema,
	outputSchema: mockChargeOutputSchema,
	execute: mockCharge,
});
