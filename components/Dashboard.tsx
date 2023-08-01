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
import { QuizModal } from "./QuizModal";

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
    const [showModal, setShowModal] = useState<any>(false);
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
    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "scroll";
        }
    }, [showModal]);

    return (
        <div className="w-full">
            {!onboarded ? (
                <div className="w-full flex  h-screen bg-cover flex-col items-center">
                    <Onboard user={user} />
                </div>
            ) : (
                <div>
                    <QuizModal
                        isVisible={showModal}
                        onClose={() => {
                            setShowModal(false);
                        }}
                    />

                    <div className="absolute w-full">
                        <DashNav
                            title={"Your Dashboard"}
                            bio={
                                "Below are some of the tools you can use to create teaching material"
                            }
                            userInfo={userData}
                        />
                    </div>
                    <div className="MAIN CONTAINER bg-gray1 flex flex-row ">
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
                                            handleClick={() =>
                                                setShowModal(true)
                                            }
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
                                <div className="flex w-2/3 flex-col gap-8 ml-4">
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
                                                    <PlainButton href={""}>
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
                                                    <PlainButton href="/contact">
                                                        Get In Touch
                                                    </PlainButton>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <div
                                            className="w-full flex flex-col text-start bg-white1 border-[1.5px] h-[13.3rem] justify-between
             border-gray2 p-6 rounded-[5px]"
                                        >
                                            <div>
                                                <h1 className="text-[20px] font-semibold tracking-tight text-zinc-900 border-b-[1.5px] pb-3 border-gray2 mb-3">
                                                    Heads Up!
                                                </h1>
                                                <div className="leading-[1.5rem] text-[15px] font-[350] text-zinc-700">
                                                    We are still early in
                                                    development so might be some
                                                    bugs and errors sometimes.
                                                    However, the team at Pear is
                                                    working hard to make sure to
                                                    create the best possible
                                                    experience for teachers and
                                                    we are constantly working on
                                                    new features. Also, AI, like
                                                    humans, can also mess up
                                                    sometimes so just make sure
                                                    to look over the content you
                                                    create and please let us
                                                    know if there are any large
                                                    issues!
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
