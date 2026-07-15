import c from "config";
import { Badge } from "@/components/shadcn/ui/badge";
import Balancer from "react-wrap-balancer";
import { formatInTimeZone } from "date-fns-tz";
import { Event } from "db/types";
import { getClientTimeZone } from "@/lib/utils/client/shared";
import Link from "next/link";

export default function EventFull({ event }: { event: Event }) {
	const userTimeZone = getClientTimeZone(c.hackathonTimezone);

	return (
		<main className="relative mx-auto flex min-h-[calc(100vh-7rem)] w-full max-w-5xl items-start justify-center px-3 py-10 sm:px-6 md:py-16">
			<article
				className="relative w-full bg-[length:100%_100%] bg-center bg-no-repeat px-[10%] py-[12%] font-serif text-black drop-shadow-[6px_8px_3px_rgba(0,0,0,0.45)] sm:px-[12%] sm:py-[10%] md:px-[14%]"
				style={{
					backgroundImage:
						"url('/img/assets/dash/have-questions-background.webp')",
				}}
			>
				<Link
					href="/schedule"
					className="mb-6 inline-block text-sm font-bold underline decoration-1 underline-offset-4 hover:text-[#ac1703]"
				>
					← Back to schedule
				</Link>

				<div className="mb-3 flex flex-wrap items-center gap-2">
					<Badge
						className="bg-transparent text-sm text-black"
						variant={"outline"}
						style={{
							borderColor:
								(c.eventTypes as Record<string, string>)[
									event.type
								] || c.eventTypes.Other,
						}}
					>
						{event.type}
					</Badge>
					<p className="text-sm font-bold md:text-base">{`${formatInTimeZone(
						event.startTime,
						userTimeZone,
						"EEEE MMMM do",
					)}, ${formatInTimeZone(
						event.startTime,
						userTimeZone,
						"h:mm a",
					)} - ${formatInTimeZone(event.endTime, userTimeZone, "h:mm a")}`}</p>
				</div>

				<h1 className="mb-3 text-4xl font-black leading-none sm:text-5xl md:text-7xl">
					<Balancer>{event.title}</Balancer>
				</h1>
				{event.host && (
					<h2 className="mb-10 text-base font-bold sm:mb-14 sm:text-lg">
						Hosted by {event.host}
					</h2>
				)}
				<h3 className="mb-5 text-base font-bold sm:text-lg">
					Location:{" "}
					<span className="font-normal">{event.location}</span>
				</h3>

				<h3 className="mb-2 text-base font-bold sm:text-lg">Description:</h3>
				<p className="text-base leading-relaxed sm:text-lg">
					<Balancer>{event.description}</Balancer>
				</p>
			</article>
		</main>
	);
}
