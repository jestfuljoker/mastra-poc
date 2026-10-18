import { createStep } from "@mastra/core/workflows";
import { approvalSchema, resultSchema } from "../../schema";
import { chargeCard } from "./charge-card";

export const chargeCardStep = createStep({
	id: "charge-card",
	inputSchema: approvalSchema,
	outputSchema: resultSchema,
	execute: ({ inputData }) => chargeCard(inputData),
});
