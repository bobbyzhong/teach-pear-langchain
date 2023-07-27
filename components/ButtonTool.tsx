"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function ButtonTool({
    icon,
    title,

    href,
    children,
}: {
    icon: any;
    title: any;

    href: any;
    children: any;
}) {
    const [modalOpen, setModalOpen] = useState<any>(false);

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
                                <Link
                                    href={"/createTextbookQuiz"}
                                    className="w-full flex items-center gap-3 mb-3"
                                >
                                    <p className="text-base">Textbook</p>
                                    <div className="w-10 h-10">
                                        <Image
                                            src={"/assets/icons/chevRight.svg"}
                                            height={30}
                                            width={30}
                                            alt={"arrow"}
                                        />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
            <button
                onClick={() => setModalOpen(true)}
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
