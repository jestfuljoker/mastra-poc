import {
	type FindParkToolInputSchema,
	type FindParkToolOutputSchema,
} from "../schema";

type ParkGroup = {
	name: string;
	parks: {
		id: number;
		name: string;
		country?: string;
		timezone?: string;
	}[];
};

export async function findParks({
	parkName,
	maxResults,
}: FindParkToolInputSchema): Promise<FindParkToolOutputSchema> {
	const result = await fetch("https://queue-times.com/parks.json");

	if (!result.ok) {
		throw new Error(`Queue-Times parks failed: ${result.status}`);
	}

	const groups = (await result.json()) as ParkGroup[];

	const queryParkName = parkName.toLowerCase();

	const matches = (groups ?? []).flatMap((group) =>
		(group.parks ?? [])
			.map((park) => ({
				parkId: park.id,
				name: park.name,
				parkUrl: `https://queue-times.com/en-US/parks/${park.id}`,
				groupName: group.name,
			}))
			.filter((park) => park.name.toLowerCase().includes(queryParkName))
			.slice(0, maxResults),
	);

	return { matches };
}
