import ScheduleTimeline from "../dash/schedule/schedule-timeline";
import { getAllEvents } from "db/functions";
import { getClientTimeZone } from "@/lib/utils/client/shared";
import c from "config";
import Pin from "@/components/landing/Pin";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/landing/Footer";
import LandingThread from "@/components/landing/LandingThread";

export default async function Page() {
	const sched = await getAllEvents();
	const userTimeZone = getClientTimeZone(c.hackathonTimezone);
	return (
<>
			<Navbar />
			<LandingThread />
			<div className="w-full">

		
			<Pin className="absolute left-[0%] top-[30%] z-40" no_img size={1} />
			<main className=" mx-auto w-full max-w-[1536px]">
								
				<ScheduleTimeline schedule={sched} timezone={userTimeZone} />
			</main>
						<Pin className="hidden md:block absolute left-[100%] top-[30%] z-40" no_img size={1} />
				</div>

</>
	);
}

export const revalidate = 60;
