import z from "zod";

export const ticketPurchaseInputSchema = z.object({
	parkName: z.string().min(2),
	date: z.string().min(4),
	quantity: z.number().int().min(1).max(12).default(2),
	unitPriceUsd: z.number().positive().default(110),
});

export type TicketPurchaseInputSchema = z.infer<
	typeof ticketPurchaseInputSchema
>;

export const quoteSchema = z.object({
	parkName: z.string(),
	date: z.string(),
	quantity: z.number(),
	unitPriceUsd: z.number(),
	feesUsd: z.number(),
	totalUsd: z.number(),
});

export type QuoteSchema = z.infer<typeof quoteSchema>;

export const approvalSchema = z.object({
	approved: z.boolean(),
	quote: quoteSchema,
});

export type ApprovalSchema = z.infer<typeof approvalSchema>;

export const resultSchema = z.object({
	status: z.enum(["confirmed", "cancelled"]),
	note: z.string(),
	quote: quoteSchema,
	confirmationId: z.string().optional(),
	card: z.object({ brand: z.string(), last4: z.string() }).optional(),
});

export type ResultSchema = z.infer<typeof resultSchema>;
