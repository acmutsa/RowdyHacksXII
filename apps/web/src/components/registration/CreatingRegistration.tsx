"use client";

import { LineWave } from "react-loader-spinner";
import { Check } from "lucide-react";
import { Manuale, Shadows_Into_Light } from "next/font/google";

const manuale = Manuale({
	subsets: ["latin"],
	display: "swap",
});
const shadow = Shadows_Into_Light({
	subsets: ["latin"],
	weight: "400",
});

interface CreatingRegistrationProps {
	hasSuccess: boolean | undefined;
	isLoading: boolean;
}
export default function CreatingRegistration(props: CreatingRegistrationProps) {
	const { hasSuccess, isLoading } = props;

	const isLoadingState = isLoading && !hasSuccess;
	const hasSuccessState = hasSuccess && isLoading;

	const message = isLoadingState
		? "Creating Your Registration..."
		: hasSuccessState
			? "Registration successfully created! Redirecting to the dashboard..."
			: "Something Went Wrong. Please Try Again.";

	return (
		<>
			<h1 className={`font-bold mt-5 font-light text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl 2xl:text-2xl ${manuale.className}`}>
				{message}
			</h1>
			<div className={`w-full h-auto flex item-center justify-center p-10 ${manuale.className}`}>
				{hasSuccessState ? (
					<Check size={40} color="#000000" />
				) : (

					<LineWave
						visible={true}
						height="60"
						width="60"
						color="#000000"
						ariaLabel="line-wave-loading"
						wrapperStyle={{}}
						wrapperClass=""
						firstLineColor=""
						middleLineColor=""
						lastLineColor=""
					/>
				)}
			</div>
		</>

	);
}
