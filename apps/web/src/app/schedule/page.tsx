import ScheduleTimeline from "../dash/schedule/schedule-timeline";
import { getAllEvents } from "db/functions";
import { getClientTimeZone } from "@/lib/utils/client/shared";
import c from "config";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/landing/Footer";

export default async function Page() {
	const sched = await getAllEvents();
	const userTimeZone = getClientTimeZone(c.hackathonTimezone);
	return (
		<main className="max-w-full overflow-hidden pt-4 md:pt-8">
			<Navbar />
			<div className="mb-5 mt-12 px-4 md:px-0">
				<ScheduleTimeline schedule={sched} timezone={userTimeZone} />
			</div>
			<Footer />
		</main>
	);
}

export const revalidate = 60;
