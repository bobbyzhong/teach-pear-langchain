"use client";

import React, { useEffect, useState } from "react";
import { InputBox } from "./Inputs";
import { useRouter, useSearchParams } from "next/navigation";
import supabase from "../app/supabase-browser";
import VertNav from "@/components/VertNav";
import StatsBar from "@/components/StatsBar";
import Notifications from "@/components/Notifications";
import SignOut from "./SignOut";
import Button from "./Button";
import Image from "next/image";
import { StaticBox, LargeStaticBox } from "./Inputs";
import Onboard from "./Onboard";
import DashNav from "./DashNav";
import ButtonTool from "./ButtonTool";
import ToolLink from "./ToolLink";
import { PlainButton } from "./Button";

const USER_DATA_INITIAL_STATE = {
    user_id: "",
    email: "",
    f_name: "",
    l_name: "",
    school: "",
    students: [],
};

export function Dashboard(user: any) {
    const [userData, setUserData] = useState<any>(USER_DATA_INITIAL_STATE);
    const [onboarded, setOnboarded] = useState<any>(false);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const { data: userInfo } = await supabase
                .from("teachers")
                .select("*")
                .eq("user_id", user.user.id);

            if (userInfo?.length == 0 || userInfo === null) {
                setOnboarded(false);
                console.log("NOT ONBOARDED");
            } else {
                setUserData(userInfo);
                setOnboarded(true);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="w-full">
            {!onboarded ? (
                <div className="w-full flex  h-screen bg-cover flex-col items-center">
                    <Onboard user={user} />
                </div>
            ) : (
                <div>
                    <div className="absolute w-full">
                        <DashNav userInfo={userData} />
                    </div>
                    <div className="MAIN CONTAINER bg-gray1 flex flex-row h-[200rem] ">
                        <VertNav />

                        <div className="pt-[5.5rem] flex flex-col gap-9 ">
                            <div className="w-full flex flex-col gap-9">
                                <div className="flex flex-row gap-8 mt-8 mx-8">
                                    {/* TOOL 1 */}
                                    <div className="w-1/3">
                                        <ButtonTool
                                            icon={"assets/icons/star.svg"}
                                            title={"Make a quiz"}
                                            href={"/createQuiz"}
                                        >
                                            Create an adaptive quiz based on
                                            your own content whether it be from
                                            a textbook or online article
                                        </ButtonTool>
                                    </div>

                                    <div className="w-1/3">
                                        <ButtonTool
                                            icon={"assets/icons/star.svg"}
                                            title={"Make a quiz"}
                                            href={"/createQuiz"}
                                        >
                                            Create a custom quiz based on given
                                            content in seconds!
                                        </ButtonTool>
                                    </div>

                                    <div className="w-1/3">
                                        <ButtonTool
                                            icon={"assets/icons/star.svg"}
                                            title={"Make a quiz"}
                                            href={"/createQuiz"}
                                        >
                                            Create a custom quiz based on given
                                            content in seconds!
                                        </ButtonTool>
                                    </div>

                                    {/* TOOL 2 */}
                                    {/* <div className="w-1/3 ">
                                        <ToolLink
                                            href={"/contentsimplifier"}
                                            buttonText={"Simplify Content"}
                                        >
                                            Read something interesting online
                                            but it’s a bit out of your student’s
                                            reading level? Create a handout that
                                            contains a simplified version of
                                            that content!
                                        </ToolLink>
                                    </div> */}
                                    {/* TOOL 3 */}
                                    {/* <div className="w-1/3 ">
                                        <ToolLink
                                            href={"/createQuiz"}
                                            buttonText={"Create Quiz"}
                                        >
                                            Take a previous quiz or assignment
                                            and make a different version of it!
                                            Great for if you have a quiz or exam
                                            that covers the topics you want and
                                            you want to create a different
                                            version that tests the same concepts
                                        </ToolLink>
                                    </div> */}
                                </div>
                            </div>

                            <div className="w-full flex flex-row  px-8 bg-white1 py-8">
                                <div className="w-1/3 pr-4">
                                    <Notifications />
                                </div>
                                <div className="flex w-2/3 flex-col ml-4">
                                    <div className="flex flow-row gap-8 ">
                                        <div className="w-1/2">
                                            <div
                                                className="w-full flex flex-col text-start bg-white1 border-[1.5px] h-[16.8rem] justify-between hover:border-green 
             border-gray2 p-6 rounded-[5px]"
                                            >
                                                <div>
                                                    <h1 className="text-[20px] font-semibold tracking-tight text-zinc-900 border-b-[1.5px] pb-3 border-gray2 mb-3">
                                                        Take a tour
                                                    </h1>
                                                    <div className="leading-[1.5rem] text-[15px] font-[350] text-zinc-700">
                                                        Check out this demo
                                                        video for a walkthrough
                                                        of how to use Pear. It
                                                        covers everything from
                                                        assignment creation to
                                                        classroom management.
                                                    </div>
                                                </div>
                                                <div className="w-full flex items-center">
                                                    <PlainButton>
                                                        Continue To Demo
                                                    </PlainButton>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-1/2">
                                            <div
                                                className="w-full flex flex-col text-start bg-white1 border-[1.5px] h-[16.8rem] justify-between hover:border-green 
             border-gray2 p-6 rounded-[5px]"
                                            >
                                                <div>
                                                    <h1 className="text-[20px] font-semibold tracking-tight text-zinc-900 border-b-[1.5px] pb-3 border-gray2 mb-3">
                                                        Have feedback or
                                                        questions?
                                                    </h1>
                                                    <div className="leading-[1.5rem] text-[15px] font-[350] text-zinc-700">
                                                        Contact us if you have
                                                        any textbook requests,
                                                        feedback, or questions.
                                                        We’re happy to help with
                                                        anything!
                                                    </div>
                                                </div>
                                                <div className="w-full flex items-center">
                                                    <PlainButton>
                                                        Get In Touch
                                                    </PlainButton>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                // <div>
                //     <div className="bg-[#ececec] ">

                //     </div>
                //     <div className="w-full flex items-center justify-center mb-10">
                //         <SignOut />
                //     </div>
                // </div>
                // <div className="flex flex-col items-center">
                //     <div className="PROFILE shadow-lg md:w-[38rem] md:p-20 w-full p-10  bg-white rounded-xl mt-32">
                //         <h1 className="border-b-2 text-xl pb-3">
                //             Your Profile
                //         </h1>

                //         <StaticBox
                //             label="First Name"
                //             name="f_name"
                //             type="text"
                //             value={userData[0].f_name}
                //             statusCompleted={userData.f_name ? true : false}
                //         />
                //         <StaticBox
                //             label="Last Name"
                //             name="l_name"
                //             type="text"
                //             value={userData[0].l_name}
                //             statusCompleted={userData.f_name ? true : false}
                //         />
                //         <StaticBox
                //             label="School you teach at"
                //             name="school"
                //             type="text"
                //             value={userData[0].school}
                //             statusCompleted={userData.f_name ? true : false}
                //         />
                //     </div>
                // </div>
            )}
        </div>
    );
}
