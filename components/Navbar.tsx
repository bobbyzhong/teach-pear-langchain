"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import NavLink from "./NavLink";

export default function Navbar({ className }: { className?: string }) {
    const pathname = usePathname();
    const reverse =
        pathname === "/" || pathname === "/dashboard" ? true : false;
    const transparent = reverse ? " top-0" : "relative";

    const isHomePage = pathname === "/";
    const isDashboard = pathname === "/dashboard";

    const logoColor =
        isHomePage || isDashboard ? "text-white" : "text-cyan-400";

    const menuPath = isHomePage ? "menu-black.svg" : "menu-black.svg";
    // set menu state
    const [open, setOpen] = useState(false);

    return (
        <div
            className={`${transparent} font-outfit lg:mx-auto bg-none  w-full z-[999] ${className} `}
        >
            <div className="flex items-center justify-between py-1 ">
                {/* Logo */}
                <h1 className="font-outfit">
                    <Link href={"/"}>
                        <p className={`text-[2.2rem] ml-8 my-4 `}>🍐 Pear</p>
                    </Link>
                </h1>
                {/* Hamburger Menu */}
                <div
                    onClick={() => setOpen(!open)}
                    className={`${
                        open && "bg-none"
                    }  rounded-lg mx-3 p-2 transition-colors duration-200 md:hidden hover:cursor-pointer w-10 h-10`}
                >
                    {open ? (
                        <Image
                            src="/assets/icons/menu-close.svg"
                            alt="Menu Icon"
                            width="20"
                            height="20"
                            className="py-0.5 mx-auto"
                        />
                    ) : (
                        <Image
                            src={`/assets/icons/${menuPath}`}
                            alt="Menu Icon"
                            width="24"
                            height="24"
                        />
                    )}
                </div>

                {/* Mobile Navbar */}
                <nav
                    onClick={() => setOpen(!open)}
                    className={`${
                        !open && "hidden"
                    } absolute left-1/2 top-36 transform md:hidden -translate-x-1/2  backdrop-filter backdrop-blur-[14px] border-2 border-gray-400 bg-opacity-10 
           -translate-y-16  flex flex-col gap-2 z-50 p-4 w-[80%] text-black font-bold rounded-lg`}
                >
                    <NavLink
                        href="/contact"
                        text="Demo"
                        currentPath={pathname}
                    />
                    <NavLink
                        href="/contact"
                        text="Contact us"
                        currentPath={pathname}
                    />
                </nav>
                {/* Desktop Navbar */}
                <nav
                    className={`items-center hidden md:flex md:flex-row md:gap-3 md:mr-8 `}
                >
                    <NavLink
                        href="/contact"
                        text="Demo"
                        currentPath={pathname}
                    />
                    <NavLink
                        href="/contact"
                        text="Contact us"
                        currentPath={pathname}
                    />
                </nav>
            </div>
        </div>
    );
}
