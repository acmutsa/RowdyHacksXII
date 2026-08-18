"use client"
import { SponsorRow } from "./SponsorRow";
import { Manuale, Shadows_Into_Light } from "next/font/google";
import Pin from "./Pin";
import sponsorsData from "./sponsors.json";
import { motion } from "motion/react";

const shadowsIntoLight = Shadows_Into_Light({
	weight: "400",
	subsets: ["latin"],
	variable: "--font-shadows",
});

const manuale = Manuale({
	subsets: ["latin"],
	display: "swap",
});

const line = "Thank you our sponsors!!!";

const sponsors: Sponsor[] = sponsorsData.sponsors;

function DossierPinsLable() {
	return (
		<>
			<Pin className="absolute left-[90%] top-[18%] z-30 sm:left-[85%] sm:top-[18%]" />
			<Pin className="absolute left-[50%] top-[0%] z-30 lg:left-[50%] lg:top-[3%]" />
			<Pin className="absolute left-[10%] top-[40%] z-30" />
		</>
	);
}
function DossierPinsTitle() {
	return (
		<>
			<Pin className="absolute left-[20%] top-[10%] z-30" />
			<Pin className="absolute left-[3%] top-[45%] z-30 " />
			<Pin className="absolute left-[12%] top-[81%] z-30" />

		</>
	);
}
function DossierPins() {
	return (
		<>
			<Pin className="absolute left-[45%] top-[10%] z-30 " />
			<Pin className="absolute left-[93%] top-[15%] z-30 " />
			<Pin className="absolute left-[100%] top-[56%] z-30" />
			<Pin className="absolute left-[87%] top-[93%] z-30" />
		</>
	);
}

export default async function Sponsors() {
	return (
		<section id="Sponsors" className="relative w-full flex items-center justify-center pb-[0cqw] sm:pb-[3cqw] md:pb-[5cqw] [container-type:inline-size]" >


			<div className="relative flex flex-col items-center justify-center gap-y-6 py-10">

				<div className="relative flex flex-col items-center justify-center gap-y-6 py-[3%] sm:px-[5%]">
					<DossierPinsLable />
					<div
						className={`relative h-fit w-[48cqw] bg-contain bg-center bg-no-repeat sm:w-[38cqw] ${shadowsIntoLight.className} -rotate-6 drop-shadow-[2px_5px_1px_rgba(0,0,0,0.35)]`}
						style={{
							backgroundImage:
								"url('/img/assets/sponsors/sponsors-header-background.svg')",
						}}
					>

						<p className="font-shadows p-6 text-center text-black sm:text-lg md:text-xl lg:text-2xl xl:text-4xl 2xl:text-5xl">
							Sponsors
						</p>
					</div>
				</div>



				<div className={`relative w-[80cqw] h-auto ${manuale.className}`}>
					<DossierPinsTitle />

					<img
						src="/img/assets/sponsors/sponsors1.svg"
						alt=""
						aria-hidden
						className="absolute inset-0 h-full w-full object-fill drop-shadow-[6px_8px_3px_rgba(0,0,0,0.45)]"
					/>

					<div className="relative flex flex-col p-[10%]">

						<motion.img
							src="/img/assets/sponsors/investigation.svg"
							className="absolute h-auto w-[30%] rotate-[20deg] object-contain top-[15%] right-[5%] z-10"
							initial={{ scale: 0, y: -40, opacity: 0, rotate: 15 }}
							whileInView={{
								scale: [0.25, 3, 1],
								y: [-80, 0],
								opacity: [0, 1, 1],
							}}
							transition={{
								duration: 0.5,
								delay: 0.75,
								ease: [0.2, 0.9, 0.2, 1],
							}}
							viewport={{ once: false, margin: "0px 0px -20% 0px" }}
						/>

						<div className="w-full h-auto flex item-center justify-center border-b border-foreground ">
							<p className=" text-center text-md font-bold leading-tight sm:text-lg md:text-xl lg:text-2xl xl:text-4xl ">
								Title Sponsor
							</p>
						</div>
						<div className="w-full py-4 border-b border-foreground"></div>
						{sponsors
							.filter((sponsor) => sponsor.tier === "title")
							.map((sponsor) => (
								<SponsorRow key={sponsor.name} sponsor={sponsor} />
							))}
					</div>

				</div>

				<div className={`relative w-full h-auto ${manuale.className}`}>
					<DossierPins />

					<img
						src="/img/assets/sponsors/sponsors2.svg"
						alt=""
						aria-hidden
						className="absolute inset-0 h-full w-full object-fill drop-shadow-[6px_8px_3px_rgba(0,0,0,0.45)]"
					/>

					<div className="relative flex flex-col pt-[35%] pb-[29%] sm:py-[20%] px-[10%]">

						<div className="w-full h-auto flex item-center justify-center border-b border-foreground pt-8">
							<p className=" text-center text-md font-bold leading-tight sm:text-lg md:text-xl lg:text-2xl xl:text-4xl ">
								Gold Sponsors
							</p>
						</div>
						<div className="w-full py-4 border-b border-foreground"></div>
						{sponsors
							.filter((sponsor) => sponsor.tier === "gold")
							.map((sponsor) => (
								<SponsorRow key={sponsor.name} sponsor={sponsor} />
							))}

						<div className="w-full h-auto flex item-center justify-center border-b border-foreground pt-8">
							<p className=" text-center text-md font-bold leading-tight sm:text-lg md:text-xl lg:text-2xl xl:text-4xl ">
								Silver Sponsors
							</p>
						</div>
						<div className="w-full py-4 border-b border-foreground"></div>
						{sponsors
							.filter((sponsor) => sponsor.tier === "silver")
							.map((sponsor) => (
								<SponsorRow key={sponsor.name} sponsor={sponsor} />
							))}

						<div className="w-full h-auto flex item-center justify-center border-b border-foreground pt-8">
							<p className=" text-center text-md font-bold leading-tight sm:text-lg md:text-xl lg:text-2xl xl:text-4xl ">
								Partners
							</p>
						</div>
						<div className="w-full py-4 border-b border-foreground"></div>
						{sponsors
							.filter((sponsor) => sponsor.tier === "partner")
							.map((sponsor) => (
								<SponsorRow key={sponsor.name} sponsor={sponsor} />
							))}

						<p className={` absolute insetr-0 ${shadowsIntoLight.className} text-[#AC1903] sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl rotate-[-7deg] left-[30%] bottom-[5%] sm:bottom-[7%] md:bottom-[7%] lg:bottom-[10%]`}>
							{line.split("").map((char, i) => (
								<motion.span
									key={`l1-${i}`}
									initial={{ opacity: 0, y: 6 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ delay: i * 0.05 }}
									viewport={{ once: false, amount: 0.95 }}
								>
									{char}
								</motion.span>
							))}
						</p>

					</div>


				</div>


			</div>
		</section >
	);
}
