import z from "zod";

export const mockChargeInputSchema = z.object({
	amountUsd: z.number().positive(),
});

export type MockChargeInputSchema = z.infer<typeof mockChargeInputSchema>;

export const mockChargeOutputSchema = z.object({
	paymentIntentId: z.string(),
	amountUsd: z.number(),
	card: z.object({ brand: z.string(), last4: z.string() }),
});

export type MockChargeOutputSchema = z.infer<typeof mockChargeOutputSchema>;
