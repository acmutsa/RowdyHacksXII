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
		<div className="relative z-50 w-screen overflow-x-hidden"
			style={{
				backgroundImage: "url('/img/dash/menu/menu-bar.svg')",
				backgroundPosition: "center",
			}}
		>

			<div
				className={cn(
					`top-3 z-50 h-16 sm:h-20 md:h-24 w-full ${oswald.variable}`,
					className,
				)}>

				<div
					className="w-full h-16 sm:h-18 md:h-20 bg-cover bg-center bg-no-repeat flex items-center"
				>

					<img
						src="/img/dash/menu/pin1.png"
						alt="pin"
						className="absolute bottom-0 w-8 h-12 sm:w-12 sm:h-16 sm:top-2 md:w-16 md:h-20 md:top-4 lg:w-20 lg:h-24 lg:top-2 z-10"

/>

					<img
						src="/img/dash/menu/pin4.png"
						alt="pin"
						className="absolute top-[10px] right-0  w-8 h-12 sm:w-12 sm:h-18 sm:top-4 md:w-16 md:h-20 md:top-3 lg:w-20 lg:h-[104px] lg:top-0 z-10"
					/>
					<div className="px-2 md:px-0 lg:px-2"></div>
					<div className=" z-20 w-full flex items-center justify-between px-2 sm:px-6 md:px-12 lg:px-18">
						<div className="flex items-center gap-x-2 md:gap-x-6 lg:gap-x-10">
							<div className="relative sm:top-1 flex items-center gap-x-2 md:gap-x-6 lg:gap-x-10">
							<NavBarLinksGrouper />
							</div>
							<div className="absolute right-8 top-[18px] sm:right-10 md:right-[56px] md:top-6 lg:right-20 flex items-center whitespace-nowrap">
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
										className="items-center flex gap-x-2 md:gap-x-4 lg:gap-x-8 rounded-md">
										<Link href="/sign-in">
											<span className={`text-sm sm:text-2xl md:text-3xl lg:text-4xl text-black ${shadows.className}`}>
												Sign In
											</span>
										</Link>
										<Link href="/register">
											<span className={`text-sm sm:text-2xl md:text-3xl lg:text-4xl text-black ${shadows.className}`}>
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