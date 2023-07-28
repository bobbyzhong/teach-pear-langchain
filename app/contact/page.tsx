import React from "react";
import Image from "next/image";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
export default function Page() {
    return (
        <div className="font-outfit">
            <Navbar />
            <div className="mx-auto lg:max-w-screen-2xl ">
                <div className="flex flex-col items-center ">
                    <div className="flex flex-col justify-center  text-center textSection md:text-left  ">
                        <div className="text-xl font-medium mb-5">
                            Contact us via email or phone if you want a demo!
                        </div>
                        <h1 className="text-sm font-semibold text-lightestGray">
                            GIVE US A CALL
                        </h1>
                        <div className="inline  text-5xl font-medium tracking-[0.03em] mb-8">
                            714 330-9387{" "}
                        </div>
                        <h1 className="text-sm font-semibold text-lightestGray">
                            CONTACT US VIA EMAIL
                        </h1>
                        <div className="text-lighterGray lg:text-5xl text-4xl w-fit flex flex-col items-end tracking-[0.03em] ">
                            3bobbyzhong3
                            <div className="text-sm font-medium text-lighterGray">
                                @gmail.com
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
