import { type QuoteSchema, type TicketPurchaseInputSchema } from "../../schema";

export async function buildQuote(
	params: TicketPurchaseInputSchema,
): Promise<QuoteSchema> {
	const { unitPriceUsd, ...rest } = params;

	const feesUsd = Math.max(5, Math.round(unitPriceUsd * rest.quantity * 0.06));

	return {
		...rest,
		unitPriceUsd,
		feesUsd,
		totalUsd: unitPriceUsd * rest.quantity + feesUsd,
	};
}
