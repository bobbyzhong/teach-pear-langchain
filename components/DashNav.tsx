"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import SignOut from "./SignOut";

export default function DashNav({
    title,
    bio,
    userInfo,
}: {
    title: any;
    bio: any;
    userInfo: any;
}) {
    let [open, setOpen] = useState(false);
    const handleClose = (e: any) => {
        if (e.target.id === "wrapper") setOpen(false);
    };

    return (
        <div
            className="sticky top-0 z-[40] border-b pl-[15rem] flex flex-row justify-between items-center
         border-gray2  bg-white1 h-[86px] w-full"
        >
            <div className="">
                <h1 className="text-2xl font-semibold">{title}</h1>
                <p className="text-zinc-500 text-sm">{bio}</p>
            </div>
            <div className="mr-14 flex flex-row ">
                <div className="dropdown ">
                    <label tabIndex={0} className="cursor-pointer">
                        <Image
                            src={"/assets/icons/notif.svg"}
                            height={39}
                            width={39}
                            alt={"Notification"}
                            className="mr-3"
                        />
                    </label>
                    <ul
                        tabIndex={0}
                        className="dropdown-content bg-white1 z-[1] mt-3 border
                         border-gray2 menu p-2  rounded-sm w-52"
                    >
                        <li>Notif 1</li>
                        <li>Notif 2</li>
                    </ul>
                </div>

                <div className="dropdown">
                    <label tabIndex={0} className="cursor-pointer">
                        <Image
                            src={"/assets/icons/setting.svg"}
                            height={39}
                            width={39}
                            alt={"Notification"}
                            className="mr-3"
                        />
                    </label>
                    <ul
                        tabIndex={0}
                        className="dropdown-content bg-white1 z-[1] mt-3 border
                         border-gray2 menu p-2  rounded-sm w-52"
                    >
                        <li>
                            <Link href={"/profile"}>View Profile</Link>
                        </li>
                        <li>
                            <Link href={"/contact"}>Get Help</Link>
                        </li>
                        <li>
                            <SignOut />
                        </li>
                    </ul>
                </div>

                <div className="flex flex-col justify-center border-l border-gray2 pl-5 ml-5">
                    <h1 className="text-[17px] font-medium">
                        {userInfo[0].f_name} {userInfo[0].l_name}
                    </h1>
                    <p className="text-[13px] text-zinc-600">Teacher</p>
                </div>
            </div>
        </div>
    );
}
