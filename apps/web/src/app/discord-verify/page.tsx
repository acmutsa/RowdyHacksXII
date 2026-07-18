import { db } from "db";
import { discordVerification, userCommonData } from "db/schema";
import { eq, and, or } from "db/drizzle";
import { notFound, redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import c from "config";
import Balancer from "react-wrap-balancer";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import ClientToast from "@/components/shared/ClientToast";
import DiscordVerifyButton from "@/components/settings/DiscordVerifyButton";
import { Manuale, Shadows_Into_Light } from "next/font/google";

const manuale = Manuale({
	subsets: ["latin"],
	display: "swap",
});
const shadow = Shadows_Into_Light({
	subsets: ["latin"],
	weight: "400",
});

export default async function Page({
	params,
	searchParams,
}: {
	params: { slug: string };
	searchParams?: { [key: string]: string | string[] | undefined };
}) {
	const passedCode = searchParams?.code;

	if (!passedCode || typeof passedCode !== "string") {
		return notFound();
	}

	const { userId } = await auth();

	if (!userId) {
		return redirect("/sign-in");
	}

	const user = await db.query.userCommonData.findFirst({
		where: eq(userCommonData.clerkID, userId),
		with: {
			discordVerification: true,
		},
	});

	if (!user) {
		return redirect("/register");
	}

	if (
		(c.featureFlags.core.requireUsersApproval as boolean) === true &&
		user.isApproved === false
	) {
		return redirect("/i/approval");
	}

	if (user.discordVerification) {
		await db
			.update(discordVerification)
			.set({ status: "rejected" })
			.where(eq(discordVerification.code, passedCode));
		return redirect("/discord-verify/linked");
	}

	const verification = await db.query.discordVerification.findFirst({
		where: and(
			eq(discordVerification.code, passedCode),
			or(
				eq(discordVerification.status, "pending"),
				eq(discordVerification.status, "expired"),
			),
		),
	});

	if (!verification) {
		return notFound();
	}

	const expiresAt = new Date();
	expiresAt.setTime(verification.createdAt.getTime() + 5 * 60 * 1000);

	if (verification && new Date() > expiresAt) {
		await db
			.update(discordVerification)
			.set({ status: "expired" })
			.where(eq(discordVerification.code, passedCode));
		return (
			<main className="flex min-h-screen my-10 flex-col items-center justify-center gap-y-10 px-4">
				<div className={`relative flex max-w-xl flex-col items-center justify-center gap-y-5 ${manuale.className} bg-card px-16 py-20 rounded-[3px] shadow-[-2px_10px_8px_rgba(0,0,0,0.28)] drop-shadow-[10px_14px_7px_rgba(0,0,0,0.45)]`}>

					<p className={`w-full pb-[10%] rotate-[-8deg] text-end text-md text-[#AC1903] text-hackathon sm:text-lg md:text-xl xl:text-3xl 2xl:text-4xl ${shadow.className}`}>
						These Plans Are Stale
					</p>

					<h1 className="text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl font-black leading-tight">
						Verification Link <br /> Has Expired
					</h1>

					<p className="max-w-md text-center font-light text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl 2xl:text-2xl">
						Please click the verify button in Discord again to generate a
						new one.
					</p>

				</div>
			</main>
		);
	}

	if (!verification) {
		return notFound();
	}

	return (
		<>
			<ClientToast />
			<main className="flex min-h-screen my-10 flex-col items-center justify-center gap-y-10 px-4">
				<div className={`relative flex max-w-xl flex-col items-center justify-center gap-y-5 ${manuale.className} bg-card px-16 py-20 rounded-[3px] shadow-[-2px_10px_8px_rgba(0,0,0,0.28)] drop-shadow-[10px_14px_7px_rgba(0,0,0,0.45)]`}>

					<p className={`w-full pb-[10%] rotate-[-5deg] text-end text-md text-[#AC1903] text-hackathon sm:text-lg md:text-xl xl:text-3xl 2xl:text-4xl ${shadow.className}`} >
						Add to Plan
					</p>

					<h1 className="text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl font-black leading-tight ">
						<Balancer>
							Link @{verification.discordName} to your
							<br />
							{c.hackathonName} account?
						</Balancer>
					</h1>

					<div className="flex items-center gap-x-5 py-6">
						<Image
							height={100}
							width={100}
							alt="Discord Profile Photo"
							className="aspect-square max-w-[72px] rounded-full"
							src={`https://cdn.discordapp.com/avatars/${verification.discordUserID}/${verification.discordProfilePhoto}.png`}
						/>
						<MoveRight />
						<Image
							height={100}
							width={100}
							alt="Discord Profile Photo"
							className="aspect-square max-w-[75px] rounded-full"
							src="/img/assets/logo_stamp.webp"
						/>
					</div>

					<DiscordVerifyButton />

				</div>
			</main>
		</>
	);
}
