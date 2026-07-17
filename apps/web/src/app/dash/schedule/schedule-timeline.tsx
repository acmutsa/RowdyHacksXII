import { type EventType as Event } from "@/lib/types/events";
import Pin from "@/components/landing/Pin";
import { formatInTimeZone } from "date-fns-tz";
import Link from "next/link";
import { Manuale, Shadows_Into_Light } from "next/font/google";

const manuale = Manuale({
	subsets: ["latin"],
	display: "swap",
});
const shadow = Shadows_Into_Light({
	subsets: ["latin"],
	weight: "400",
});

function splitByDay(schedule: Event[], timezone: string) {
	const days = new Map<string, Event[]>();

	for (const event of schedule) {
		const day = formatInTimeZone(event.startTime, timezone, "EEEE");
		days.set(day, [...(days.get(day) ?? []), event]);
	}

	return Array.from(days.entries()).map(
		([day, events]) =>
			[
				day,
				[...events].sort(
					(a, b) => a.startTime.getTime() - b.startTime.getTime(),
				),
			] as const,
	);
}

type ScheduleTimelineProps = {
	schedule: Event[];
	timezone: string;
};

export default function ScheduleTimeline({
	schedule,
	timezone,
}: ScheduleTimelineProps) {
	const days = splitByDay(schedule, timezone);

	return (
		<>
			<section aria-label="Hackathon schedule" className="relative w-full items-center justify-center py-[12cqw] sm:py-[3cqw] md:py-[5cqw] [container-type:inline-size]">



				<div className={`relative w-full h-auto hidden md:block px-[5cqw] ${manuale.className}`}>
					<PaperPins />
					<div className="absolute inset-0 -z-10 overflow-hidden drop-shadow-[6px_8px_3px_rgba(0,0,0,0.45)]">
						<img
							src="/img/assets/dash/schedule-desktop-background.webp"
							alt=""
							aria-hidden
							className="w-full h-auto"
						/>
					</div>

					<div className="w-full h-auto grid grid-cols-2 gap-[5cqw] px-[6cqw] py-[10cqw]">
						{days.map(([day, events]) => (
							<DaySchedule
								key={day}
								day={day}
								events={events}
								timezone={timezone}
							/>
						))}
					</div>
				</div>

				{days.map(([day, events]) => (
					<div className={`pb-[15cqw] md:hidden px-[5cqw] ${manuale.className}`}>
						<div key={day} className="relative w-full h-auto" >
							<PaperPins />

							<div className="absolute inset-0 -z-10 overflow-hidden drop-shadow-[6px_8px_3px_rgba(0,0,0,0.45)]">
								<img
									src="/img/assets/dash/schedule-phone-background.webp"
									alt=""
									aria-hidden
									className="w-full h-auto"
								/>
							</div>

							<div className="w-full h-auto pl-[6cqw] pr-[12cqw] py-[15cqw] text-black">
								<DaySchedule
									day={day}
									events={events}
									timezone={timezone}
								/>
							</div>

						</div>
					</div>
				))}

			</section>
		</>
	);
}

function PaperPins() {
	return (
		<>
			<Pin className="absolute left-[8%] top-[3%] z-40 " />
			<Pin className="absolute right-[50%] top-[2%] z-40 " />
			<Pin className="absolute right-[5%] top-[7%] z-40 " />
			<Pin className="absolute right-[1%] top-[90%] z-40 md:hidden" />
		</>
	);
}

type DayScheduleProps = {
	day: string;
	events: Event[];
	timezone: string;
};

function DaySchedule({ day, events, timezone }: DayScheduleProps) {
	return (
		<div>
			<h2 className="mb-3 text-center text-xl font-bold sm:text-2xl md:mb-5 md:text-[clamp(1.35rem,1.8vw,2rem)]">
				{day}
			</h2>
			<div className="border border-black/70">
				{events.map((event) => (
					<EventRow
						key={event.id}
						event={event}
						timezone={timezone}
					/>
				))}
			</div>
		</div>
	);
}

function EventRow({ event, timezone }: { event: Event; timezone: string }) {
	const startTime = formatInTimeZone(event.startTime, timezone, "hh:mm a");

	return (
		<Link
			href={`/schedule/${event.id}`}
			className="group grid grid-cols-7 text-[0.72rem] sm:text-[0.8rem] md:text-[clamp(0.72rem,0.9vw,1rem)]"
		>
			<time className="flex items-start justify-center border-r border-black/60 col-span-2 px-2 py-2 md:px-3 md:py-3">
				{startTime}
			</time>
			<p className="col-span-5 w-full px-2 py-2 transition-colors group-hover:bg-black/5 md:px-3 md:py-3">
				<strong className="block text-[1.14em] leading-none">
					{event.title}
				</strong>
				<span
					title={event.description}
					className="mt-0.5 w-full overflow-hidden text-ellipsis break-words opacity-90 [-webkit-box-orient:vertical] [-webkit-line-clamp:2] [display:-webkit-box]"
				>
					{event.description}
				</span>
			</p>
		</Link>
	);
}
