import {
	type GetQueueTimesLiveToolInputSchema,
	type GetQueueTimesLiveToolOutputSchema,
} from "../schema";

type Ride = {
	id: number;
	name: string;
	is_open: boolean;
	wait_time: number;
	last_updated: string;
};

type QueueTimes = {
	lands?: { name: string; rides?: Ride[] }[];
	rides?: Ride[];
};

export async function getQueueTimesLive(
	{ parkId }: GetQueueTimesLiveToolInputSchema,
	{ abortSignal }: { abortSignal?: AbortSignal } = {},
): Promise<GetQueueTimesLiveToolOutputSchema> {
	const result = await fetch(
		`https://queue-times.com/parks/${parkId}/queue_times.json`,
		{ signal: abortSignal },
	);

	if (!result.ok) {
		throw new Error(`Queue-Times queue_times failed: ${result.status}`);
	}

	const data = (await result.json()) as QueueTimes;

	const toItem = (ride: Ride, land: string | null) => ({
		id: String(ride.id),
		name: ride.name,
		land,
		isOpen: ride.is_open,
		waitTime: ride.wait_time,
		lastUpdatedUtc: ride.last_updated,
	});

	const items = [
		...(data.lands ?? []).flatMap((land) =>
			(land.rides ?? []).map((ride) => toItem(ride, land.name)),
		),
		...(data.rides ?? []).map((ride) => toItem(ride, null)),
	].sort((a, b) => a.waitTime - b.waitTime);

	return { parkId, fetchedAt: new Date().toISOString(), items };
}
