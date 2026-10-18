import { type Mastra } from "@mastra/core/mastra";
import {
	type PostPurchaseSummaryResultSchema,
	type ResultSchema,
} from "../../schema";

export async function postPurchaseSummary(
	inputData: ResultSchema,
	mastra: Mastra,
): Promise<PostPurchaseSummaryResultSchema> {
	if (inputData.status !== "confirmed") {
		return inputData;
	}

	const { parkName, date, quantity, totalUsd } = inputData.quote;
	const { confirmationId, card } = inputData;
	const cardLabel = card ? `${card.brand} ending ${card.last4}` : "unknown card";

	console.log(
		`\nPurchase confirmed (${confirmationId}): ${quantity} ticket(s) to ${parkName} on ${date}, $${totalUsd} on ${cardLabel}.`,
	);
	console.log("Generating your visit brief...\n");

	const agent = mastra.getAgent("themeParkAgent");

	const stream = await agent.stream(
		`A user just booked a ticket to ${parkName} on ${date}. Write a concise three-point visit brief:
1. Best arrival time and why.
2. One must-do attraction in the first 30 minutes.
3. One specific thing to avoid or watch out for.

Use your tools to check the crowd forecast and historical business data for ${date} before answering.`,
		{
			memory: {
				thread: confirmationId ?? `${parkName}-${date}`,
				resource: "post-purchase-summary",
			},
		},
	);

	for await (const chunk of stream.textStream) {
		process.stdout.write(chunk);
	}
	process.stdout.write("\n");

	return { ...inputData, summary: await stream.text };
}
