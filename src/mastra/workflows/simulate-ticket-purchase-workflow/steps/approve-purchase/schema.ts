import z from "zod";

export const approvePurchaseSuspendSchema = z.object({ message: z.string() });

export type ApprovePurchaseSuspendSchema = z.infer<
	typeof approvePurchaseSuspendSchema
>;

export const approvePurchaseResumeSchema = z.object({ approved: z.boolean() });

export type ApprovePurchaseResumeSchema = z.infer<
	typeof approvePurchaseResumeSchema
>;
