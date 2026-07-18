import c from "config";
import { Button } from "@/components/shadcn/ui/button";
import Link from "next/link";
import { Manuale, Shadows_Into_Light } from "next/font/google";

const manuale = Manuale({
	subsets: ["latin"],
	display: "swap",
});
const shadow = Shadows_Into_Light({
	subsets: ["latin"],
	weight: "400",
});

export default function Page() {
	return (
		<main className="flex min-h-screen my-10 flex-col items-center justify-center gap-y-10 px-4">

			<div className={`relative flex max-w-xl flex-col items-center justify-center gap-y-5 ${manuale.className} bg-card px-16 py-20 rounded-[3px] shadow-[-2px_10px_8px_rgba(0,0,0,0.28)] drop-shadow-[10px_14px_7px_rgba(0,0,0,0.45)]`} >
				<p className={`w-full pb-[10%] rotate-[8deg] text-end text-md text-[#AC1903] text-hackathon sm:text-lg md:text-xl xl:text-3xl 2xl:text-4xl ${shadow.className}`}>
					You're On the Plan
				</p>

				<h1 className="text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl font-black leading-tight">
					Account Linked
				</h1>

				<p className="max-w-md text-center font-light text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl 2xl:text-2xl">
					Your Discord account is now linked. To unlink, go to your{" "}
					{c.hackathonName} account settings to unlink before linking a
					new one.
				</p>

				<div className="mt-2 flex items-center gap-x-4">
					<Link href="/dash">
						<Button>Dash Board</Button>
					</Link>
				</div>
			</div>

		</main>
	);
}
