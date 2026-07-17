import ScheduleTimeline from "../dash/schedule/schedule-timeline";
import { getAllEvents } from "db/functions";
import { getClientTimeZone } from "@/lib/utils/client/shared";
import c from "config";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/landing/Footer";
import LandingThread from "@/components/landing/LandingThread";

export default async function Page() {
	const sched = await getAllEvents();
	const userTimeZone = getClientTimeZone(c.hackathonTimezone);
	return (
		<main className="max-w-full overflow-hidden pt-4 md:pt-8">
			<Navbar />
			<LandingThread />
			<main className="mx-auto w-full max-w-[1536px]">
				<ScheduleTimeline schedule={sched} timezone={userTimeZone} />
			</main>
		</main>
	);
}

export const revalidate = 60;
