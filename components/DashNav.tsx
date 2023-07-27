"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import NavLink from "./NavLink";

export default function DashNav(userInfo: any) {
    console.log(userInfo);
    return (
        <div
            className="sticky top-0 z-[50] border-b pl-[15rem] flex flex-row justify-between items-center
         border-gray2  bg-white1 h-[86px] w-full"
        >
            <div>
                <h1 className="text-2xl font-semibold">Your Dashboard</h1>
                <p className="text-zinc-500 text-sm">
                    Below are some of the tools you can use to create teaching
                    material
                </p>
            </div>
            <div className="mr-14 flex flex-row">
                <Image
                    src={"/assets/icons/notif.svg"}
                    height={39}
                    width={39}
                    alt={"Notification"}
                    className="mr-3"
                />
                <Image
                    src={"/assets/icons/setting.svg"}
                    height={39}
                    width={39}
                    alt={"setting"}
                />
                <div className="flex flex-col justify-center border-l border-gray2 pl-5 ml-5">
                    <h1 className="text-[17px] font-medium">
                        {userInfo.userInfo[0].f_name}{" "}
                        {userInfo.userInfo[0].l_name}
                    </h1>
                    <p className="text-[13px] text-zinc-600">Teacher</p>
                </div>
            </div>
        </div>
    );
}
