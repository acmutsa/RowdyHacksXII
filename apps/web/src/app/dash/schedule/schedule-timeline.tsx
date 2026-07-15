import { type EventType as Event } from "@/lib/types/events";
import LandingThread from "@/components/landing/LandingThread";
import Pin from "@/components/landing/Pin";
import { formatInTimeZone } from "date-fns-tz";
import Link from "next/link";

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
		<section aria-label="Hackathon schedule" className="mx-auto w-full">
			<LandingThread />
			<div
				className="relative mx-auto hidden min-h-[calc(92vw*1.35)] w-[92vw] max-w-[96rem] bg-[length:100%_100%] bg-center bg-no-repeat px-[6%] pb-[18%] pt-[8%] drop-shadow-[6px_8px_3px_rgba(0,0,0,0.45)] md:block md:min-h-[82rem] xl:min-h-[105rem]"
				style={{
					backgroundImage:
						"url('/img/assets/dash/schedule-desktop.png')",
				}}
			>
				<PaperPins />
				<div className="grid grid-cols-2 gap-[7%] font-serif text-black">
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

			<div className="space-y-4 pb-10 md:hidden">
				{days.map(([day, events]) => (
					<div
						key={day}
						className="relative mx-auto min-h-[55rem] w-full max-w-[30rem] bg-[length:100%_100%] bg-top bg-no-repeat px-[10.5%] pb-[22%] pt-[14%] font-serif text-black drop-shadow-[6px_8px_3px_rgba(0,0,0,0.45)]"
						style={{
							backgroundImage:
								"url('/img/assets/dash/schedule-phone.png')",
						}}
					>
						<PaperPins />
						<div>
							<DaySchedule
								day={day}
								events={events}
								timezone={timezone}
							/>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}

function PaperPins() {
	return (
		<>
			<Pin className="absolute left-[-80%] top-[-20%] z-50 -rotate-12" />
			<Pin className="absolute left-[8%] top-[2.5%] z-50 -rotate-12" />
			<Pin className="absolute right-[8%] top-[5.5%] z-50 rotate-12" />
			<Pin className="absolute right-[15%] top-[95.5%] z-50 rotate-12" />
			<Pin className="absolute right-[-85%] top-[115.5%] z-50 rotate-12" />
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
			className="group grid grid-cols-[28%_72%] text-[0.72rem] leading-[1.08] sm:text-[0.8rem] md:text-[clamp(0.72rem,0.9vw,1rem)]"
		>
			<time className="flex items-start justify-center border-r border-black/60 px-1 py-2 tabular-nums md:py-3">
				{startTime}
			</time>
			<span className="min-w-0 px-2 py-2 transition-colors group-hover:bg-black/5 md:px-3 md:py-3">
				<strong className="block text-[1.14em] leading-none">
					{event.title}
				</strong>
				<span
					title={event.description}
					className="mt-0.5 w-full overflow-hidden text-ellipsis break-words opacity-90 [-webkit-box-orient:vertical] [-webkit-line-clamp:2] [display:-webkit-box]"
				>
					{event.description}
				</span>
			</span>
		</Link>
	);
}
