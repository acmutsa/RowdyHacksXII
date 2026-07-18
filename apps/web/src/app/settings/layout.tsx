import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import SettingsSection from "@/components/settings/SettingsSection";
import Navbar from "@/components/shared/Navbar";
import { Settings } from "lucide-react";
import ClientToast from "@/components/shared/ClientToast";
import { getUser } from "db/functions/user";
import { Manuale } from "next/font/google";

const manuale = Manuale({
	subsets: ["latin"],
	display: "swap",
});

export default async function ({ children }: { children: ReactNode }) {
	const { userId } = await auth();
	const user = await currentUser();

	if (!user || !userId) {
		return redirect("/sign-in");
	}

	if ((await getUser(userId)) == undefined) {
		return redirect("/register");
	}

	return (
		<>
			<ClientToast />
			<Navbar />
			<main className="flex justify-center overflow-x-hidden bg-transparent px-4 py-24">
				<div className="my-5 w-full max-w-5xl rounded-[3px] bg-card px-6 py-12 shadow-[-2px_10px_8px_rgba(0,0,0,0.28)] drop-shadow-[10px_14px_7px_rgba(0,0,0,0.45)] sm:px-10">

					<div className={`my-10 md:col-span-4 md:ml-5 ${manuale.className}`}>
						{children}
					</div>

				</div>
			</main>
		</>
	);
}
