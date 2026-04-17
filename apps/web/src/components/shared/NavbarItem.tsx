import Link from "next/link";
import { Shadows_Into_Light } from "next/font/google";

const shadowsIntoLight = Shadows_Into_Light({
  subsets: ["latin"],
  weight: "400", // required (not a variable font)
});

interface NavbarItemProps {
	link: string;
	children: React.ReactNode;
}

export default function NavbarItem({ children, link }: NavbarItemProps) {
	return (
		<Link
			href={link}
			// className={`text-2xl text-black  ${shadowsIntoLight.className}`}
			className={`text-sm sm:text-2xl md:text-3xl lg:text-4xl text-black  ${shadowsIntoLight.className}`}
		>
			{children}
		</Link>
	);
}
