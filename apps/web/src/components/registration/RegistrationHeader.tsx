import c from "config";
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

export default function RegistrationHeader() {
  return (
    <>
      <p className={` text-end pb-[5%] pr-[10%] text-md text-[#AC1903] sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl rotate-[8deg]  text-hackathon ${shadow.className} w-full`}>
        Case File · {c.hackathonName}
      </p>
      <h1 className={`font-black  text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-5xl leading-tight ${manuale.className}`}>
        Register
      </h1>
      <p className={`mt-5 font-light text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl 2xl:text-2xl  ${manuale.className}`} >
        <span className="font-bold">Welcome Hacker!</span>{" "}
        Please fill out the form below to complete your
        registration for {c.hackathonName}.
      </p>
      <p className={`pb-10 pt-5 font-light text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl 2xl:text-2xl  ${manuale.className}`}>
        Psttt... Running into a issue? Please let us know on{" "}
        <Link className="underline text-[#AC1903]" href={c.links.discord}>
          Discord
        </Link>
        !
      </p>
    </>
  )
}