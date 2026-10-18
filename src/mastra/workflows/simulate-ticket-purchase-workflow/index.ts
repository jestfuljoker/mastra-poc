import { createWorkflow } from "@mastra/core/workflows";
import {
	postPurchaseSummaryResultSchema,
	ticketPurchaseInputSchema,
} from "./schema";
import { approvePurchaseStep } from "./steps/approve-purchase";
import { buildQuoteStep } from "./steps/build-quote";
import { chargeCardStep } from "./steps/charge-card";
import { postPurchaseSummaryStep } from "./steps/post-purchase-summary";
import { validateParkStep } from "./steps/validate-park";

export const simulateTicketPurchaseWorkflow = createWorkflow({
	id: "simulate-ticket-purchase-workflow",
	inputSchema: ticketPurchaseInputSchema,
	outputSchema: postPurchaseSummaryResultSchema,
})
	.then(validateParkStep)
	.then(buildQuoteStep)
	.then(approvePurchaseStep)
	.then(chargeCardStep)
	.then(postPurchaseSummaryStep)
	.commit();
