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

const sponsors: Sponsor[] = sponsorsData.sponsors;

function DossierPins() {
	return (
		<>
			<Pin className="absolute left-[70%] top-[18%] z-30 sm:left-[70%] sm:top-[15%] md:left-[69%] md:top-[17%] lg:left-[60%] lg:top-[10%]" />
			<Pin className="absolute left-[50%] top-[0%] z-30 lg:left-[50%] lg:top-[3%]" />
			<Pin className="absolute left-[26%] top-[26%] z-30 sm:left-[26%] sm:top-[23%] md:left-[30%] md:top-[22%] lg:left-[38%] lg:top-[23%]" />
		</>
	);
}

export default async function Sponsors() {
	return (
		<section id="Sponsors" className="relative w-full flex items-center justify-center pb-[0cqw] sm:pb-[3cqw] md:pb-[5cqw] [container-type:inline-size]" >


			<div className="relative flex flex-col items-center justify-center gap-y-6 py-10">


				<div
					className={`relative h-fit w-[65cqw] sm:w-[60cqw] md:w-[50cqw] lg:w-[30cqw] bg-contain bg-center bg-no-repeat ${shadowsIntoLight.className} -rotate-6 drop-shadow-[2px_5px_1px_rgba(0,0,0,0.35)]`}
					style={{
						backgroundImage:
							"url('/img/assets/sponsors/sponsors-header-background.svg')",
					}}
				>
					<DossierPins />

					<p className="font-shadows p-6 text-center text-black sm:text-lg md:text-xl lg:text-2xl xl:text-4xl 2xl:text-5xl">
						Sponsors
					</p>
				</div>



				<div className={`relative w-[80cqw] h-auto ${manuale.className}`}>

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
								Title Sponsors
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

					<img
						src="/img/assets/sponsors/sponsors2.svg"
						alt=""
						aria-hidden
						className="absolute inset-0 h-full w-full object-fill drop-shadow-[6px_8px_3px_rgba(0,0,0,0.45)]"
					/>

					<div className="relative flex flex-col py-[35%] sm:py-[20%] px-[10%]">

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
								Bronze Sponsors
							</p>
						</div>
						<div className="w-full py-4 border-b border-foreground"></div>
						{sponsors
							.filter((sponsor) => sponsor.tier === "bronze")
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

					</div>
				</div>


			</div>
		</section>
	);
}
