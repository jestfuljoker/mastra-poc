import { createWorkflow } from "@mastra/core/workflows";
import { resultSchema, ticketPurchaseInputSchema } from "./schema";
import { approvePurchaseStep } from "./steps/approve-purchase";
import { buildQuoteStep } from "./steps/build-quote";
import { chargeCardStep } from "./steps/charge-card";

export const simulateTicketPurchaseWorkflow = createWorkflow({
	id: "simulate-ticket-purchase-workflow",
	inputSchema: ticketPurchaseInputSchema,
	outputSchema: resultSchema,
})
	.then(buildQuoteStep)
	.then(approvePurchaseStep)
	.then(chargeCardStep)
	.commit();
