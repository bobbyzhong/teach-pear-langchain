import React from "react";
import Image from "next/image";

export default function Notif() {
    return (
        <div>
            <div className="w-full flex flex-row   pt-5 pb-3  rounded-md justify-start">
                <div className="flex flex-row ">
                    <Image
                        src={"/assets/icons/people.png"}
                        height={50}
                        width={50}
                        alt={""}
                        className="object-contain mr-3"
                    />

                    <div>
                        <h1 className="text-zinc-800 text-[0.9rem] mb-[0.15rem] font-medium">
                            Bobby Zhong submitted Quiz 1
                        </h1>
                        <div>
                            <div className="text-[0.8rem] font-medium text-zinc-400">
                                Time: 7/12/23 12:19PM
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Image
                src={"/assets/icons/horizontal.svg"}
                height={200}
                width={300}
                alt={"line"}
            />
        </div>
    );
}
