import c from "config";
import RegisterForm from "@/components/registration/RegisterForm";
import RegisterClosed from "@/components/registration/RegistretionClosed";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import { getUser } from "db/functions";


export default async function Page() {

	const registrationEnabled = c.registrationAvailable;

	if (registrationEnabled) {

		const { userId } = await auth();
		if (!userId) return redirect("/sign-up");

		const user = await currentUser();
		if (!user) return redirect("/sign-up");

		const registration = await getUser(userId);
		if (registration) return redirect("/dash");

		return (
			<>
				<Navbar />
				<main className="overflow-x-hidden bg-transparent flex items-center justify-center px-4">
					<div className="h-auto max-w-5xl my-5 rounded-[3px] bg-card px-10 py-20 shadow-[-2px_10px_8px_rgba(0,0,0,0.28)] drop-shadow-[10px_14px_7px_rgba(0,0,0,0.45)]">
						<RegisterForm defaultEmail={user.emailAddresses[0]?.emailAddress || ""} />

					</div>
				</main>
			</>
		);
	}

	return (<RegisterClosed />);
}
