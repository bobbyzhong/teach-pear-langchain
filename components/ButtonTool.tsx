"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function ToolLink({
    buttonText,
    href,
    children,
}: {
    buttonText: any;
    href: any;
    children: any;
}) {
    const [modalOpen, setModalOpen] = useState<any>(true);

    return (
        <div>
            {modalOpen ? (
                <div className="absolute flex items-center justify-center top-0 left-0 w-full h-full bg-[#a2a2a285]">
                    <div
                        className="w-4/12 flex flex-col bg-[#f5f5f5] 
            text-zinc-800  pt-5 pb-2 px-5 rounded-xl h-52 justify-between mb-5 "
                    >
                        <div className="flex flex-col justify-between h-full">
                            <div className="flex flex-row w-full justify-between">
                                <h1 className="text-lg">
                                    Where will the content of the quiz come
                                    from?
                                </h1>
                                <button
                                    className="font-semibold "
                                    onClick={() => setModalOpen(false)}
                                >
                                    x
                                </button>
                            </div>
                            <div className="flex flex-row justify-between ">
                                <Link
                                    href={"/createStandardQuiz"}
                                    className="w-full flex items-center gap-3 mb-3"
                                >
                                    <p className="text-base">Plain Content</p>
                                    <div className="w-10 h-10">
                                        <Image
                                            src={"/assets/icons/chevRight.svg"}
                                            height={30}
                                            width={30}
                                            alt={"arrow"}
                                        />
                                    </div>
                                </Link>
                                <div className="w-full flex items-center gap-3 mb-3">
                                    <p className="text-base">Textbook</p>
                                    <div className="w-10 h-10">
                                        <Image
                                            src={"/assets/icons/chevRight.svg"}
                                            height={30}
                                            width={30}
                                            alt={"arrow"}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
            <button
                onClick={() => setModalOpen(true)}
                className="w-full flex flex-col text-start bg-[#f5f5f5] border-[2px] hover:border-black 
            text-zinc-500 hover:text-black border-zinc-500  pt-5 pb-2 px-5 rounded-xl h-52 justify-between mb-5 "
            >
                <div className="leading-[1.32rem] text-sm">{children}</div>
                <div className="w-full flex justify-end items-center gap-3">
                    <p className="text-sm">{buttonText}</p>
                    <div className="w-10 h-10">
                        <Image
                            src={"/assets/icons/chevdark.svg"}
                            height={100}
                            width={100}
                            alt={"arrow"}
                        />
                    </div>
                </div>
            </button>
        </div>
    );
}
