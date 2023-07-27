"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import NavLink from "./NavLink";

export default function VertNav() {
    return (
        <div className="sticky top-[0] z-[70] border-r  border-gray2 bg-white1 h-screen">
            <div className="border-b border-gray2 pr-16">
                <h1 className="font-outfit">
                    <Link href={"/"}>
                        <p
                            className={`text-[2.2rem] ml-12 my-4 flex flex-row items-center `}
                        >
                            🍐 <span className="text-[1.8rem] ml-2">Pear</span>
                        </p>
                    </Link>
                </h1>
            </div>
            <div className="flex flex-col h-full justify-between ml-8">
                <div className="">
                    <h2 className="mt-5 mb-8 text-zinc-400 font-[650] tracking-tight text-[12px]">
                        GENERAL
                    </h2>
                    <div className="space-y-7 tracking-wide text-zinc-600">
                        <div className="flex flex-row items-center gap-3">
                            <Image
                                src={"/assets/icons/dashboard.svg"}
                                height={25}
                                width={25}
                                alt={"dash"}
                            />
                            <p>Dashboard</p>
                        </div>
                        <div className="flex flex-row items-center gap-3">
                            <Image
                                src={"/assets/icons/profile.svg"}
                                height={25}
                                width={25}
                                alt={"dash"}
                            />
                            <p>Profile</p>
                        </div>
                        <div className="flex flex-row items-center gap-3">
                            <Image
                                src={"/assets/icons/students.svg"}
                                height={25}
                                width={25}
                                alt={"dash"}
                            />
                            <p>Students</p>
                        </div>
                    </div>
                </div>
                {/* <div className="flex flex-row items-center ml-10 space-x-2 pb-5">
                    <Image
                        src={"/assets/icons/logout.svg"}
                        height={38}
                        width={38}
                        alt={"logout"}
                    />
                    <p className="text-zinc-600">Log Out</p>
                </div> */}
            </div>
        </div>
    );
}
