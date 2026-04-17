"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Shadows_Into_Light } from "next/font/google";

type NavItem = {
    name: string;
    url: string;
};

const shadowsIntoLight = Shadows_Into_Light({
  subsets: ["latin"],
  weight: "400", // required (not a variable font)
});

export default function AnimatedNavbar({ items }: { items: NavItem[] }) {
    const [hovered, setHovered] = useState<string | null>(null);
    const [selected, setSelected] = useState<string | null>(null);

    const active = hovered || selected;

    return (
        <div className="flex gap-x-6 lg:gap-x-10 relative">
            {items.map((item) => (
                <div
                    key={item.name}
                    onMouseEnter={() => setHovered(item.name)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => setSelected(item.name)}
                    className="relative cursor-pointer"
                >
                    <Link href={item.url}>
                        <span className={`text-2xl text-black  ${shadowsIntoLight.className}`}>
                            {item.name}
                        </span>
                    </Link>

                    <AnimatePresence>
                        {active === item.name && (
                            <motion.img
                                src="/img/dash/menu/marker-circle4.svg"
                                layoutId="nav-indicator"
                                className="absolute top-0 w-24 h-24"
                                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.8 }}
                                transition={{ duration: 0.2 }}
                            />
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
}