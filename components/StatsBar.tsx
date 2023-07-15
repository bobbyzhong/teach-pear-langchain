import React from "react";
import Image from "next/image";

export default function StatsBar() {
    return (
        <div className="w-full flex flex-row bg-[#f5f5f5]  py-3 items-center px-5 rounded-md justify-around">
            <div className="flex flex-row">
                <Image
                    src={"/assets/icons/people.png"}
                    height={40}
                    width={40}
                    alt={""}
                    className="mr-5 h-1/2"
                />
                <div>
                    <h1 className="text-zinc-500 text-sm">Total Students</h1>
                    <div className="text-2xl font-semibold">238</div>
                </div>
            </div>
            <Image
                className=""
                src={"/assets/line.png"}
                height={2}
                width={2}
                alt={"line"}
            />

            <div className="flex flex-row">
                <Image
                    src={"/assets/icons/people.png"}
                    height={40}
                    width={40}
                    alt={""}
                    className="mr-5 h-1/2"
                />
                <div>
                    <h1 className="text-zinc-500 text-sm">Meetings Today</h1>
                    <div className="text-2xl font-semibold">3</div>
                </div>
            </div>
            <Image
                className=""
                src={"/assets/line.png"}
                height={2}
                width={2}
                alt={"line"}
            />
            <div className="flex flex-row">
                <Image
                    src={"/assets/icons/people.png"}
                    height={40}
                    width={40}
                    alt={""}
                    className="mr-5 h-1/2"
                />
                <div>
                    <h1 className="text-zinc-500 text-sm">Students Failing</h1>
                    <div className="text-2xl font-semibold">0</div>
                </div>
            </div>
        </div>
    );
}
