import z from "zod";

export const getQueueTimesLiveToolInputSchema = z.object({
	parkId: z
		.number()
		.describe("Queue-Times parkId, from findQueueTimesParkTool"),
});

export const getQueueTimesLiveToolOutputSchema = z.object({
	parkId: z.number(),
	fetchedAt: z.string(),
	items: z.array(
		z.object({
			id: z.string(),
			name: z.string(),
			land: z.string().nullable().describe("Null for rides outside any land"),
			isOpen: z.boolean(),
			waitTime: z.number(),
			lastUpdatedUtc: z.string(),
		}),
	),
});

export type GetQueueTimesLiveToolInputSchema = z.infer<
	typeof getQueueTimesLiveToolInputSchema
>;

export type GetQueueTimesLiveToolOutputSchema = z.infer<
	typeof getQueueTimesLiveToolOutputSchema
>;
