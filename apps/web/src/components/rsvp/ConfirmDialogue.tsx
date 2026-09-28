"use client";

import { useWindowSize } from "usehooks-ts";
import Confetti from "react-confetti";
import { Button } from "@/components/shadcn/ui/button";
import { useState, useEffect } from "react";
import { useAction } from "next-safe-action/hooks";
import { rsvpMyself } from "@/actions/rsvp";
import { CheckCircleIcon } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Balancer from "react-wrap-balancer";
import c from "config";
import { Manuale, Shadows_Into_Light } from "next/font/google";

const manuale = Manuale({
	subsets: ["latin"],
	display: "swap",
});
const shadow = Shadows_Into_Light({
	subsets: ["latin"],
	weight: "400",
});

export default function ConfirmDialogue({ hasRsvped }: { hasRsvped: boolean }) {
	const [showConfetti, setShowConfetti] = useState(false);
	const { width = 0, height = 0 } = useWindowSize();
	const router = useRouter();

	const { execute } = useAction(rsvpMyself, {
		onSuccess: () => {
			toast.dismiss();
			router.refresh();
		},
	});

	useEffect(() => {
		if (hasRsvped) {
			setShowConfetti(true);
		}
	}, [hasRsvped]);

	return (
		<>
			{showConfetti && (
				<Confetti
					onConfettiComplete={() => setShowConfetti(false)}
					recycle={false}
					run={showConfetti}
					numberOfPieces={200}
					width={width}
					height={height}
				/>
			)}
			<div
				className={`relative flex max-w-xl flex-col items-center justify-center gap-y-5 ${manuale.className} rounded-[3px] bg-card px-16 py-20 shadow-[-2px_10px_8px_rgba(0,0,0,0.28)] drop-shadow-[10px_14px_7px_rgba(0,0,0,0.45)]`}
			>
				<p
					className={`text-md w-full pb-[10%] text-end text-[#AC1903] text-hackathon sm:text-lg md:text-xl xl:text-3xl 2xl:text-4xl ${hasRsvped ? "rotate-[8deg]" : "rotate-[-5deg]"} ${shadow.className}`}
				>
					{hasRsvped ? "See You There" : "Add to Plan"}
				</p>

				{hasRsvped ? (
					<>
						<h1 className="flex items-center gap-x-3 text-center text-xl font-black leading-tight sm:text-2xl md:text-3xl lg:text-4xl">
							<CheckCircleIcon className="h-8 w-8 text-green-600" />
							You have RSVPed!
						</h1>
						<p className="max-w-md text-center text-sm font-light sm:text-base md:text-lg xl:text-xl 2xl:text-2xl">
							We can't wait to see you at {c.hackathonName}!
						</p>
						<div className="mt-2 flex items-center gap-x-4">
							<Link href="/dash">
								<Button>Go To Dashboard</Button>
							</Link>
						</div>
					</>
				) : (
					<>
						<h1 className="text-center text-xl font-black leading-tight sm:text-2xl md:text-3xl lg:text-4xl">
							<Balancer>
								Confirm your spot at
								<br />
								{c.hackathonName}?
							</Balancer>
						</h1>
						<p className="max-w-md text-center text-sm font-light sm:text-base md:text-lg xl:text-xl 2xl:text-2xl">
							Psst. make sure you only RSVP if you are certain you
							can attend the event!
						</p>
						<div className="mt-2 flex items-center gap-x-4">
							<Button
								onClick={() => {
									execute();
									toast.loading("Confirming your RSVP...", {
										duration: 0,
									});
								}}
								size={"lg"}
								className="font-bold"
							>
								Confirm RSVP
							</Button>
						</div>
					</>
				)}
			</div>
		</>
	);
}
