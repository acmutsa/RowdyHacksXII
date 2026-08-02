import AccountSettings from "@/components/settings/AccountSettings";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ProfileSettings from "@/components/settings/ProfileSettings";
import RegistrationSettings from "@/components/settings/RegistrationSettings";
import { getUser } from "db/functions";

export default async function Page() {
	const { userId } = await auth();
	if (!userId) return redirect("/sign-in");
	const user = await getUser(userId);
	if (!user) return redirect("/sign-in");
	const { email, ...userData } = user;
	return (
		<main className="space-y-6">
			<div id="account">
				<AccountSettings user={userData} email={email} />
			</div>
			<div id="profile">
				<ProfileSettings profile={userData} />
			</div>
			<div id="registration">
				<RegistrationSettings />
			</div>
		</main>
	);
}
