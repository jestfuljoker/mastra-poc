import { createStep } from "@mastra/core/workflows";
import { approvalSchema, quoteSchema } from "../../schema";
import { approvePurchase } from "./approve-purchase";
import {
	approvePurchaseResumeSchema,
	approvePurchaseSuspendSchema,
} from "./schema";

export const approvePurchaseStep = createStep({
	id: "approve-purchase",
	inputSchema: quoteSchema,
	suspendSchema: approvePurchaseSuspendSchema,
	resumeSchema: approvePurchaseResumeSchema,
	outputSchema: approvalSchema,
	execute: ({ inputData, resumeData, suspend }) =>
		approvePurchase(inputData, resumeData, suspend),
});
