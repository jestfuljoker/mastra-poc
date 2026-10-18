import { createTool } from "@mastra/core/tools";
import { getWeather } from "./lib/get-weather";
import {
	getWeatherToolInputSchema,
	getWeatherToolOutputSchema,
} from "./schema";

export const weatherTool = createTool({
	id: "get-weather",
	description: "Get current weather for a location",
	inputSchema: getWeatherToolInputSchema,
	outputSchema: getWeatherToolOutputSchema,
	execute: getWeather,
});
