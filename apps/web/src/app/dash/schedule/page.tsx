import ScheduleTimeline from "./schedule-timeline";
import { getAllEvents } from "db/functions";
import { getClientTimeZone } from "@/lib/utils/client/shared";
import c from "config";

import LandingThread from "@/components/landing/LandingThread";

export default async function Page() {
	const sched = await getAllEvents();

	const userTimeZone = getClientTimeZone(c.hackathonTimezone);
	return (
		<>
			<LandingThread />
			<main className="mx-auto w-full max-w-[1536px]">
				<ScheduleTimeline schedule={sched} timezone={userTimeZone} />
			</main>
		</>
	);
}

export const revalidate = 60;
