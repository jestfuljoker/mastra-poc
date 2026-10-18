import { mockChargeTool } from "../../../../tools/mock-charge-tool";
import { type MockChargeOutputSchema } from "../../../../tools/mock-charge-tool/schema";
import { type ApprovalSchema, type ResultSchema } from "../../schema";

export async function chargeCard(
	inputData: ApprovalSchema,
): Promise<ResultSchema> {
	if (!inputData.approved) {
		return {
			status: "cancelled",
			note: "Cancelled.",
			quote: inputData.quote,
		};
	}

	const charge = (await mockChargeTool.execute?.(
		{ amountUsd: inputData.quote.totalUsd },
		{} as any,
	)) as MockChargeOutputSchema;

	if ("error" in charge) {
		return {
			status: "cancelled",
			note: "Payment failed.",
			quote: inputData.quote,
		};
	}

	return {
		status: "confirmed",
		confirmationId: charge.paymentIntentId,
		card: charge.card,
		note: "Simulated charge complete. No money was charged.",
		quote: inputData.quote,
	};
}
