import {
	type MockChargeInputSchema,
	type MockChargeOutputSchema,
} from "../schema";

export async function mockCharge(
	input: MockChargeInputSchema,
): Promise<MockChargeOutputSchema> {
	await new Promise((resolve) => setTimeout(resolve, 2000));

	return {
		paymentIntentId: `pi_${crypto.randomUUID().replace(/-/g, "").slice(0, 20)}`,
		amountUsd: input.amountUsd,
		card: {
			brand: ["Visa", "Mastercard", "Amex"][Math.floor(Math.random() * 3)],
			last4: String(Math.floor(1000 + Math.random() * 9000)),
		},
	};
}
