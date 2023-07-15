"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import NavLink from "./NavLink";

export default function VertNav() {
    return (
        <div className="sticky top-0  bg-[#f5f5f5] h-screen w-[35rem] 2xl:w-[20rem]">
            <div className="flex flex-col h-full justify-between">
                <div className="">
                    <h1 className="font-outfit">
                        <Link href={"/"}>
                            <p className={`text-[2.1rem] ml-12 mr-14 my-5 `}>
                                🍐 Pear
                            </p>
                        </Link>
                    </h1>
                    <div className="ml-14 space-y-7 tracking-wide text-zinc-600">
                        <div>Schedule</div>
                        <div>Courses</div>
                        <div>Students</div>
                        <div>Settings</div>
                    </div>
                </div>
                <div className="flex flex-row items-center ml-10 space-x-2 pb-5">
                    <Image
                        src={"/assets/icons/logout.svg"}
                        height={38}
                        width={38}
                        alt={"logout"}
                    />
                    <p className="text-zinc-600">Log Out</p>
                </div>
            </div>
        </div>
    );
}
