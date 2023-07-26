"use client";
import Link from "next/link";
import { redirect } from "next/navigation";
import supabase from "../app/supabase-browser";
import SignOut from "../components/SignOut";
import { useAuth } from "../components/AuthProvider";
import { InputBox, LargeInputBox } from "@/components/Inputs";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { UserDataTypes } from "../../types/types";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React from "react";

import { PlainButton } from "./Button";

const USER_DATA_INITIAL_STATE = {
    user_id: "",
    email: "",
    f_name: "",
    l_name: "",
    phone: "",
    city: "",
    company: "",
    employment: "",
    languages: "",
    bio: "",
    interests: "",
    why: "",
    one_hour: "",
    two_hour: "",
    three_hour: "",
    five_hour: "",
};

export default function Onboard(user: any) {
    const router = useRouter();
    const [userData, setUserData] = useState<UserDataTypes>(
        USER_DATA_INITIAL_STATE
    );
    let [questNum, setQuestNum] = useState<number>(0);

    useEffect(() => {
        setUserData((prevState) => ({
            ...prevState,
            user_id: user.user.id,
            email: user.user.email,
        }));
    }, []);

    const handleChange = (e: any) => {
        setUserData((prevState: any) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async () => {
        try {
            const { error } = await supabase.from("users").insert(userData);
            if (!error) {
                router.push("/dashboard");
            } else {
                console.log(error);
            }
        } catch (error: any) {
            alert(error.message);
        }
    };

    const forward = () => {
        setQuestNum(questNum + 1);
    };

    const backward = () => {
        setQuestNum(questNum - 1);
    };

    return (
        <div className="flex w-full justify-center">
            {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
            {questNum == 0 ? (
                <>
                    <div className="md:mx-20 mx-10 mt-8 flex flex-col justify-center items-center">
                        <h1 className="md:text-3xl text-2xl md:w-8/12 w-full text-center mb-8">
                            Here is an example card of how the information you
                            provide will fit in
                        </h1>
                        <p className="w-10/12 md:w-7/12 mt-8 mb-3 text-center font-light">
                            Any of the information you provide will be used
                            soley for the purpose of giving travelers a better
                            idea of who you are.
                        </p>
                        <div className="w-full mt-3 md:pr-10  pr-0 flex justify-center md:justify-end">
                            <PlainButton action={forward}>Continue</PlainButton>
                        </div>
                    </div>
                </>
            ) : questNum == 1 ? (
                <div className="w-full flex flex-col items-center">
                    <h1 className="text-3xl">The Basics</h1>
                    <p className="md:w-4/12 w-10/12 text-center font-light mt-3">
                        Don't worry we won't spam you or anything. Your number
                        will be private; it is just for us to have in case of
                        any emergencies.
                    </p>
                    <div className="mx-20 md:w-4/12 w-10/12 mt-8 flex flex-col space-y-3">
                        <InputBox
                            label="First Name"
                            name="f_name"
                            placeholder="John"
                            type="text"
                            value={userData.f_name}
                            statusCompleted={userData.f_name ? true : false}
                            handleChange={handleChange}
                        />
                        <InputBox
                            label="Last Name"
                            name="l_name"
                            placeholder="Smith"
                            type="text"
                            value={userData.l_name}
                            statusCompleted={userData.f_name ? true : false}
                            handleChange={handleChange}
                        />
                        <InputBox
                            label="Phone Number"
                            name="phone"
                            placeholder="(714) 330 9387"
                            type="text"
                            value={userData.phone}
                            statusCompleted={userData.f_name ? true : false}
                            handleChange={handleChange}
                        />
                        <InputBox
                            label="City to be guide for"
                            name="city"
                            placeholder="Long Beach, CA"
                            type="text"
                            value={userData.city}
                            statusCompleted={userData.f_name ? true : false}
                            handleChange={handleChange}
                        />
                        <div className="w-full pt-10 flex justify-between">
                            <button onClick={backward}>
                                <Image
                                    src={"/chev-left.png"}
                                    height={30}
                                    width={30}
                                    onClick={() => backward}
                                    alt={"Back"}
                                />
                            </button>

                            <PlainButton action={forward}>Continue</PlainButton>
                        </div>
                    </div>
                </div>
            ) : questNum == 2 ? (
                <div className="w-full flex flex-col items-center">
                    <h1 className="text-3xl">Work Stuff</h1>
                    <p className="md:w-4/12 w-10/12 text-center font-light mt-3">
                        This helps travelers get to know you a little better! If
                        you want you can skip the name of the company but it is
                        recommended as it adds a little more credibility to your
                        profile
                    </p>
                    <div className="mx-20 md:w-4/12 w-10/12 mt-8 flex flex-col space-y-3">
                        <h1 className="text-xl font-[400]">
                            What is your current occupation/employment status?
                        </h1>
                        <InputBox
                            label="Ex. Software Engineer, Retiree, Student, Yoga Instructor"
                            name="employment"
                            placeholder="Soccer Coach for LAFC"
                            type="text"
                            value={userData.employment}
                            statusCompleted={userData.f_name ? true : false}
                            handleChange={handleChange}
                        />
                        <h1 className="pt-5 text-xl font-[400]">
                            What is the name of the company or organization you
                            work at? (optional)
                        </h1>
                        <InputBox
                            label="Ex. Google, Kaiser, Target"
                            name="company"
                            placeholder="Google"
                            value={userData.company}
                            type="text"
                            statusCompleted={userData.f_name ? true : false}
                            handleChange={handleChange}
                        />
                        <div className="w-full pt-10 flex justify-between">
                            <button onClick={backward}>
                                <Image
                                    src={"/chev-left.png"}
                                    height={30}
                                    width={30}
                                    onClick={() => backward}
                                    alt={"Back"}
                                />
                            </button>

                            <PlainButton action={forward}>Continue</PlainButton>
                        </div>
                    </div>
                </div>
            ) : questNum == 3 ? (
                <div className="w-full flex flex-col items-center">
                    <h1 className="text-3xl">Hola, Hello, Salut!</h1>
                    <p className="md:w-4/12 w-10/12 text-center font-light mt-3">
                        Our travelers come from all around the world so having
                        someone who speaks a common language would make it a lot
                        easier to get around!
                    </p>
                    <div className="mx-20 md:w-4/12 w-10/12 mt-8 flex flex-col space-y-3">
                        <h1 className="text-xl font-[400]">
                            What languages can you speak and understand?
                        </h1>
                        <InputBox
                            value={userData.languages}
                            label="List them separated with commas"
                            name="languages"
                            placeholder="English, Spanish, French, German"
                            type="text"
                            statusCompleted={userData.f_name ? true : false}
                            handleChange={handleChange}
                        />

                        <div className="w-full pt-10 flex justify-between">
                            <button onClick={backward}>
                                <Image
                                    src={"/chev-left.png"}
                                    height={30}
                                    width={30}
                                    onClick={() => backward}
                                    alt={"Back"}
                                />
                            </button>

                            <PlainButton action={forward}>Continue</PlainButton>
                        </div>
                    </div>
                </div>
            ) : questNum == 4 ? (
                <div className="w-full flex flex-col items-center">
                    <h1 className="text-3xl">About you</h1>
                    <p className="md:w-4/12 w-10/12 text-center font-light mt-3">
                        The more you write the better! Potential travelers will
                        probably learn the most about you from this bio so try
                        to give them a good understanding of who you are.
                    </p>
                    <div className="mx-20 md:w-4/12 w-10/12 mt-8 flex flex-col space-y-3">
                        <h1 className="text-xl font-[400]">
                            Introduce yourself to a potential traveler!
                        </h1>
                        <LargeInputBox
                            label="This will be dispalyed as a bio for travelers to learn about you"
                            name="bio"
                            placeholder="Hey! My name is Kamari Johnson and I'm a soccer coach near Long Beach. I've lived in Long Beach for about 5 years now and so I'd say I'm pretty familiar with the area. Some of my favorite things to do is go to the beach, yoga, and try new foods. I love meeting new people and learning about different backgrounds and cultures. As your guide I'd be sure to take your to some of my favorite local restaurants and show you the Long Beach culture"
                            type="textarea"
                            value={userData.bio}
                            statusCompleted={userData.f_name ? true : false}
                            handleChange={handleChange}
                        />

                        <div className="w-full pt-10 flex justify-between">
                            <button onClick={backward}>
                                <Image
                                    src={"/chev-left.png"}
                                    height={30}
                                    width={30}
                                    onClick={() => backward}
                                    alt={"Back"}
                                />
                            </button>

                            <PlainButton action={forward}>Continue</PlainButton>
                        </div>
                    </div>
                </div>
            ) : questNum == 5 ? (
                <div className="w-full flex flex-col items-center">
                    <h1 className="text-3xl">Your Interests</h1>
                    <p className="md:w-4/12 w-10/12 text-center font-light mt-3">
                        Our travelers want to hear about some of the interest
                        you have! We all love going down rabbit holes in topics
                        we're interested in whether it be yoga, anime, sports,
                        or something!
                    </p>
                    <div className="mx-20 md:w-4/12 w-10/12 mt-8 flex flex-col space-y-3">
                        <h1 className="text-xl font-[400]">
                            What are your interests or hobbies?
                        </h1>
                        <InputBox
                            label="Ex. Yoga, Food, Gaming, Anime, Football"
                            name="interests"
                            placeholder="Cycling, beaches, eating, baseball"
                            type="text"
                            statusCompleted={userData.f_name ? true : false}
                            handleChange={handleChange}
                            value={userData.interests}
                        />

                        <div className="w-full pt-10 flex justify-between">
                            <button onClick={backward}>
                                <Image
                                    src={"/chev-left.png"}
                                    height={30}
                                    width={30}
                                    onClick={() => backward}
                                    alt={"Back"}
                                />
                            </button>

                            <PlainButton action={forward}>Continue</PlainButton>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="w-full flex flex-col items-center mb-8">
                    <h1 className="text-3xl">Last Step!</h1>
                    <p className="md:w-4/12 w-10/12 text-center font-light mt-3">
                        We want to hear about why you decided to be a guide for
                        Otter Guides. Any answer is a good answer whether it's
                        meeting new people, making some money on the side, or
                        something else!
                    </p>
                    <div className="mx-20 md:w-4/12 w-10/12 mt-8 flex flex-col space-y-3">
                        <h1 className="text-xl font-[400]">
                            Why do you want to become a local guide for Otter
                            Guides
                        </h1>
                        <InputBox
                            label=""
                            name="why"
                            placeholder="I want to make friends from different parts of the world!"
                            type="text"
                            value={userData.why}
                            statusCompleted={userData.f_name ? true : false}
                            handleChange={handleChange}
                        />

                        <h1 className="text-xl font-[400]">Set your prices</h1>
                        <h1 className="text-sm font-[300]">
                            Note: The price is completely up to you! We will
                            have a 5+ hour tour option in a future update
                        </h1>
                        <h1 className="text-base">1 hour tour</h1>
                        <InputBox
                            label=""
                            name="one_hour"
                            placeholder="$50"
                            type="text"
                            value={userData.one_hour}
                            statusCompleted={userData.f_name ? true : false}
                            handleChange={handleChange}
                        />
                        <h1 className="text-base">2 hour tour</h1>
                        <InputBox
                            label=""
                            name="two_hour"
                            placeholder="$90"
                            type="text"
                            value={userData.two_hour}
                            statusCompleted={userData.f_name ? true : false}
                            handleChange={handleChange}
                        />
                        <h1 className="text-base">3 hour tour</h1>
                        <InputBox
                            label=""
                            name="three_hour"
                            placeholder="$130"
                            type="text"
                            value={userData.three_hour}
                            statusCompleted={userData.f_name ? true : false}
                            handleChange={handleChange}
                        />
                        <h1 className="text-base">5 hour tour</h1>
                        <InputBox
                            label=""
                            name="five_hour"
                            placeholder="$160"
                            type="text"
                            value={userData.five_hour}
                            statusCompleted={userData.f_name ? true : false}
                            handleChange={handleChange}
                        />

                        <div className="w-full pt-10 flex justify-between ">
                            <button onClick={backward}>
                                <Image
                                    src={"/chev-left.png"}
                                    height={30}
                                    width={30}
                                    onClick={() => backward}
                                    alt={"Back"}
                                />
                            </button>

                            <PlainButton action={handleSubmit}>
                                Submit
                            </PlainButton>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
