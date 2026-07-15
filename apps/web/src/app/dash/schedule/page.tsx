import ScheduleTimeline from "./schedule-timeline";
import { getAllEvents } from "db/functions";
import { getClientTimeZone } from "@/lib/utils/client/shared";
import c from "config";

export default async function Page() {
	const sched = await getAllEvents();

	const userTimeZone = getClientTimeZone(c.hackathonTimezone);
	return (
		<main className="max-w-full overflow-hidden py-4 md:pt-8">
			<ScheduleTimeline schedule={sched} timezone={userTimeZone} />
		</main>
	);
}

export const revalidate = 60;
