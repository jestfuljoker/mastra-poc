import { findQueueTimesParkTool } from "../../../../tools/find-park";
import { type FindParkToolOutputSchema } from "../../../../tools/find-park/schema";
import { type TicketPurchaseInputSchema } from "../../schema";

export async function validatePark(
	inputData: TicketPurchaseInputSchema,
): Promise<TicketPurchaseInputSchema> {
	const lookup = (await findQueueTimesParkTool.execute?.(
		{ parkName: inputData.parkName, maxResults: 1 },
		{} as any,
	)) as FindParkToolOutputSchema;

	if (!lookup || "error" in lookup) {
		throw new Error(`Park lookup failed for "${inputData.parkName}".`);
	}

	const [topMatch] = lookup.matches;

	if (!topMatch) {
		throw new Error(`No park found matching "${inputData.parkName}".`);
	}

	return { ...inputData, parkName: topMatch.name };
}
