import { type InnerOutput } from "@mastra/core/workflows";
import { type SuspendFunction } from "../../../../shared/types/suspend-function-type";
import { type ApprovalSchema, type QuoteSchema } from "../../schema";
import {
	type ApprovePurchaseResumeSchema,
	type ApprovePurchaseSuspendSchema,
} from "./schema";

export async function approvePurchase(
	inputData: QuoteSchema,
	resumeData: ApprovePurchaseResumeSchema | undefined,
	suspend: SuspendFunction<ApprovePurchaseSuspendSchema>,
): Promise<ApprovalSchema | InnerOutput> {
	if (!resumeData) {
		return suspend({
			message: `Simulate purchase for "${inputData.parkName}" on ${inputData.date} (${inputData.totalUsd}). Approve?`,
		});
	}

	return { approved: resumeData.approved, quote: inputData };
}
