"use client"
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Manuale } from "next/font/google";

const manuale = Manuale({
	subsets: ["latin"],
	display: "swap",
});

function SponsorRow({
	sponsor,
}: {
	sponsor: Sponsor;
}) {
	const [blackNumber] = useState(() => Math.floor(Math.random() * 3) + 1);

	return (
		<Link
			href={sponsor.url || "#Sponsors"}
			target={sponsor.url ? "_blank" : undefined}
			className={`duration-350 group flex h-fit w-full items-stretch divide-x divide-foreground border-b border-foreground font-semibold opacity-100 ${sponsor.url ? "" : "cursor-default"}`}
		>
			<div className="flex flex-1 items-center justify-center p-4">
				{sponsor.logo ? (
					<div className="relative h-12 w-full">
						<Image
							src={`/img/partner-logos/${sponsor.logo}`}
							alt={`${sponsor.name} logo`}
							fill
							className="object-contain"
						/>
					</div>
				) : (
					<span>Logo</span>
				)}
			</div>
			<div className="flex flex-1 items-center justify-center p-4">
				<span>{sponsor.name}</span>
			</div>
			<div className="flex flex-1 items-center justify-center p-4" >
				{sponsor.lable ? (
					<span>{sponsor.lable}</span>
				) : (

					<div className="relative h-12 w-full">
						<Image
							src={`/img/sponsors/black${blackNumber}.svg`}
							alt={`${sponsor.name} logo`}
							fill
							className="object-contain"
						/>
					</div>
				)}
			</div>
		</Link>
	);
}
export { SponsorRow };

