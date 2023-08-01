"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import NavLink from "./NavLink";
import SignOut from "./SignOut";

export default function VertNav() {
    return (
        <div className="sticky top-[0] z-[50] border-r  border-gray2 bg-white1 h-[98vh]">
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
                    <h2 className="mt-5 mb-8 text-zinc-400 font-[650]  text-[11.5px]">
                        GENERAL
                    </h2>
                    <div className="space-y-7 tracking-wide text-zinc-600 ">
                        <Link
                            href={"/dashboard"}
                            className="flex flex-row items-center gap-3"
                        >
                            <Image
                                src={"/assets/icons/dashboard.svg"}
                                height={20}
                                width={20}
                                alt={"dash"}
                            />
                            <p className="text-sm">Dashboard</p>
                        </Link>
                        <Link
                            href={"/dashboard/profile"}
                            className="flex flex-row items-center gap-3"
                        >
                            <Image
                                src={"/assets/icons/profile.svg"}
                                height={25}
                                width={25}
                                alt={"dash"}
                            />
                            <p className="text-sm">Profile</p>
                        </Link>
                        <Link
                            href={"/dashboard/students"}
                            className="flex flex-row items-center gap-3"
                        >
                            <Image
                                src={"/assets/icons/students.svg"}
                                height={25}
                                width={25}
                                alt={"dash"}
                            />
                            <p className="text-sm">Students</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
