"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function ButtonTool({
    icon,
    title,
    handleClick,
    href,
    children,
}: {
    icon: any;
    title: any;
    handleClick?: any;
    href: any;
    children: any;
}) {
    return (
        <div>
            <button
                onClick={handleClick}
                className="w-full flex flex-col text-start bg-white1 border-[1.5px] h-[16.8rem] justify-between hover:border-green 
             border-gray2 p-6 rounded-[5px]"
            >
                <div>
                    <Image src={icon} height={45} width={45} alt={"icon"} />
                    <h1 className="mt-4 mb-2 text-[20px] font-semibold tracking-tight text-zinc-900">
                        {title}
                    </h1>
                    <div className="leading-[1.5rem] text-[15px] font-[350] text-zinc-700">
                        {children}
                    </div>
                </div>
                <div className="w-full flex items-center">
                    <p className="text-[16px] text-green font-[550] mr-2">
                        Get Started
                    </p>
                    <Image
                        src={"assets/icons/greenarrow.svg"}
                        height={20}
                        width={20}
                        alt={""}
                    />
                </div>
            </button>
        </div>
    );
}
