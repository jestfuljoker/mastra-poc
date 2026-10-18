import z from "zod";

export const getWeatherToolInputSchema = z.object({
	location: z.string().describe("City name"),
});

export const getWeatherToolOutputSchema = z.object({
	temperature: z.number(),
	feelsLike: z.number(),
	humidity: z.number(),
	windSpeed: z.number(),
	windGust: z.number(),
	conditions: z.string(),
	location: z.string(),
});

export type GetWeatherToolInputSchema = z.infer<
	typeof getWeatherToolInputSchema
>;

export type GetWeatherToolOutputSchema = z.infer<
	typeof getWeatherToolOutputSchema
>;
