import React from "react";
import Image from "next/image";

export default function Notif() {
    return (
        <div className="w-full flex flex-row bg-[#e9e9e9]  py-5  px-2 rounded-md justify-around">
            <div className="flex flex-row">
                <Image
                    src={"/assets/icons/people.png"}
                    height={40}
                    width={40}
                    alt={""}
                    className="mr-5"
                />
                <div>
                    <h1 className="text-zinc-800 text-base">
                        Bobby Zhong submitted Quiz 1
                    </h1>
                    <div className="text-sm font-semibold text-zinc-400">
                        238
                    </div>
                </div>
            </div>
        </div>
    );
}
