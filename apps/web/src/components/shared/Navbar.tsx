import Link from "next/link";
import Image from "next/image";
import c from "config";
import { Button } from "../shadcn/ui/button";
import ProfileButton from "./ProfileButton";
import { auth, currentUser } from "@clerk/nextjs/server";
import NavBarLinksGrouper from "./NavBarLinksGrouper";
import { Oswald } from "next/font/google";
import { cn } from "@/lib/utils/client/cn";
import { getUser } from "db/functions";
import { Divide } from "lucide-react";
import { Shadows_Into_Light } from "next/font/google";

const shadows = Shadows_Into_Light({
	weight: "400",
	subsets: ["latin"],
	variable: "--font-shadows-into-light",
});

const oswald = Oswald({
	variable: "--font-oswald",
	subsets: ["latin"],
});

interface NavbarProps {
	className?: string;
}

export default async function Navbar({ className }: NavbarProps) {
	const user = await currentUser();
	const registrationIsComplete =
		user != null && (await getUser(user.id)) != undefined;
	return (
		<div className="z-50 w-screen">
			<div
				className={cn(
					`relative top-3 z-50 h-24 w-screen ${oswald.variable}`,
					className,
				)}>
				<div
					className="relative w-full sm:h-18 md:h-20 bg-cover bg-center bg-no-repeat flex items-center"
					style={{
						backgroundImage: "url('/img/dash/menu/menu-bar.svg')",
	
					}}
				>
					<img
						src="/img/dash/menu/pin1.png"
						alt="pin"
						className="absolute bottom-[20px] left-[95px] w-10 h-14 md:block hidden z-10"
					/>

					<img
						src="/img/dash/menu/pin4.png"
						alt="pin"
						className="absolute top-[8px] right-[160px] w-12 h-12 md:block hidden  z-10"
					/>

					<div className="relative z-20 w-full flex items-center justify-between px-20 md:px-24">
						<div className="relative -right-[40px] hidden md:flex items-center gap-x-6 lg:gap-x-10">
							<NavBarLinksGrouper />
						
						<div className="px-12"></div>
						<div className="hidden md:flex items-center ">
							{user ? (
								<Link href={registrationIsComplete ? "/dash" : "/register"}>
									<Button
										variant={"outline"}
										className="bg-nav hover:bg-background"
									>
										{registrationIsComplete
											? "Dashboard"
											: "Complete Registration"}
									</Button>
								</Link>
							) : (
								<div
									className="items-center flex gap-x-8 px-4 py-1 rounded-md">				
									<Link href="/sign-in">
										<span className={`text-2xl text-black  ${shadows.className}`}>
											Sign In
										</span>
									</Link>
									<Link href="/register">
										<span className={`text-2xl text-black  ${shadows.className}`}>
											Register
										</span>
									</Link>
								</div>
							)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}