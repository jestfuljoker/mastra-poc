import z from "zod";

export const findParkToolInputSchema = z.object({
	parkName: z.string().min(2).describe("Park name, like 'Animal Kingdom'"),
	maxResults: z.number().int().min(1).max(5).default(3),
});

export const findParkToolOutputSchema = z.object({
	matches: z.array(
		z.object({
			parkId: z.number(),
			name: z.string(),
			parkUrl: z.string(),
			groupName: z.string().optional(),
		}),
	),
});

export type FindParkToolInputSchema = z.infer<typeof findParkToolInputSchema>;

export type FindParkToolOutputSchema = z.infer<typeof findParkToolOutputSchema>;
