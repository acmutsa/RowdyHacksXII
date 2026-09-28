import ConfirmDialogue from "@/components/rsvp/ConfirmDialogue";
import c from "config";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { count, db } from "db";
import { eq } from "db/drizzle";
import { userCommonData } from "db/schema";
import ClientToast from "@/components/shared/ClientToast";
import { SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/shadcn/ui/button";
import { getUser } from "db/functions";
import { Manuale, Shadows_Into_Light } from "next/font/google";

const manuale = Manuale({
	subsets: ["latin"],
	display: "swap",
});
const shadow = Shadows_Into_Light({
	subsets: ["latin"],
	weight: "400",
});

export default async function RsvpPage() {
	const { userId } = await auth();

	if (!userId) {
		console.error("No user id");
		return (
			<SignedOut>
				<RedirectToSignIn signInFallbackRedirectUrl={"/rsvp"} />
			</SignedOut>
		);
	}

	const user = await getUser(userId);
	if (!user) return redirect("/register");

	if (
		(c.featureFlags.core.requireUsersApproval as boolean) === true &&
		user.isApproved === false
	) {
		return redirect("/i/approval");
	}

	const rsvpEnabled = c.rsvpAvailable;

	let isRsvpPossible = false;

	if (rsvpEnabled) {
		const rsvpLimit = c.rsvpLimit;

		const rsvpUserCount = await db
			.select({ count: count() })
			.from(userCommonData)
			.where(eq(userCommonData.isRSVPed, true))
			.limit(rsvpLimit)
			.then((result) => result[0].count);

		isRsvpPossible = rsvpUserCount < rsvpLimit;
	}

	if (isRsvpPossible || user.isRSVPed === true) {
		return (
			<>
				<ClientToast />
				<main className="my-10 flex min-h-screen flex-col items-center justify-center gap-y-10 px-4">
					<ConfirmDialogue hasRsvped={user.isRSVPed} />
				</main>
			</>
		);
	}

	return (
		<main className="my-10 flex min-h-screen flex-col items-center justify-center gap-y-10 px-4">
			<div
				className={`relative flex max-w-xl flex-col items-center justify-center gap-y-5 ${manuale.className} rounded-[3px] bg-card px-16 py-20 shadow-[-2px_10px_8px_rgba(0,0,0,0.28)] drop-shadow-[10px_14px_7px_rgba(0,0,0,0.45)]`}
			>
				<p
					className={`text-md w-full rotate-[-8deg] pb-[10%] text-end text-[#AC1903] text-hackathon sm:text-lg md:text-xl xl:text-3xl 2xl:text-4xl ${shadow.className}`}
				>
					The Plans Are Full
				</p>

				<h1 className="text-center text-xl font-black leading-tight sm:text-2xl md:text-3xl lg:text-4xl">
					RSVPs Are <br /> Currently Closed
				</h1>

				<p className="max-w-md text-center text-sm font-light sm:text-base md:text-lg xl:text-xl 2xl:text-2xl">
					We have currently reached capacity for RSVPs. However, we
					still encourage you to show up for walk-ins! If you have any
					questions or concerns, feel free to ask on{" "}
					<Link href={c.links.discord} className="underline">
						Discord
					</Link>{" "}
					or email us at {c.issueEmail}!
				</p>

				<div className="mt-2 flex items-center gap-x-4">
					<Link href="/dash">
						<Button>Go To Dashboard</Button>
					</Link>
				</div>
			</div>
		</main>
	);
}
