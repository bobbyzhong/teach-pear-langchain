"use client";

import React, { useEffect, useState } from "react";
import { InputBox } from "./Inputs";
import { useRouter, useSearchParams } from "next/navigation";
import supabase from "../app/supabase-browser";

import SignOut from "./SignOut";
import Button from "./Button";
import Image from "next/image";
import { StaticBox, LargeStaticBox } from "./Inputs";
import Onboard from "./Onboard";

const USER_DATA_INITIAL_STATE = {
    user_id: "",
    email: "",
    f_name: "",
    l_name: "",
    school: "",
    students: [],
};

export function Dashboard2(user: any) {
    const [userData, setUserData] = useState<any>(USER_DATA_INITIAL_STATE);
    const [onboarded, setOnboarded] = useState<any>(false);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const { data: userInfo } = await supabase
                .from("users")
                .select("*")
                .eq("user_id", user.user.id);

            console.log(userInfo);

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
                <div className="w-full flex bg-slate-400 h-screen bg-cover flex-col items-center">
                    <Onboard user={user} />
                </div>
            ) : (
                <div className="flex flex-col items-center">
                    <div className="bg-sky-200 h-96 w-full absolute -z-40 overflow-clip">
                        <Image
                            src={"/home.png"}
                            height={100}
                            width={2000}
                            alt={"background"}
                            className="object-cover"
                        />
                    </div>
                    <div className="PROFILE shadow-lg md:w-[38rem] md:p-20 w-full p-10  bg-white rounded-xl mt-32">
                        <h1 className="border-b-2 text-xl pb-3">
                            Your Profile
                        </h1>

                        <StaticBox
                            label="First Name"
                            name="f_name"
                            type="text"
                            value={userData[0].f_name}
                            statusCompleted={userData.f_name ? true : false}
                        />
                        <StaticBox
                            label="Last Name"
                            name="l_name"
                            type="text"
                            value={userData[0].l_name}
                            statusCompleted={userData.f_name ? true : false}
                        />
                        <StaticBox
                            label="Employment"
                            name="employment"
                            type="text"
                            value={userData[0].employment}
                            statusCompleted={userData.f_name ? true : false}
                        />
                        <StaticBox
                            label="Phone Number"
                            name="phone"
                            type="text"
                            value={userData[0].phone}
                            statusCompleted={userData.f_name ? true : false}
                        />
                        <StaticBox
                            label="City"
                            name="city"
                            type="text"
                            value={userData[0].city}
                            statusCompleted={userData.f_name ? true : false}
                        />
                        <LargeStaticBox
                            label="Biography"
                            name="bio"
                            placeholder="Hey! My name is Kamari Johnson and I'm a soccer coach near Long Beach. I've lived in Long Beach for about 5 years now and so I'd say I'm pretty familiar with the area. Some of my favorite things to do is go to the beach, yoga, and try new foods. I love meeting new people and learning about different backgrounds and cultures. As your guide I'd be sure to take your to some of my favorite local restaurants and show you the Long Beach culture"
                            type="textarea"
                            value={userData[0].bio}
                            statusCompleted={userData.f_name ? true : false}
                        />
                        <StaticBox
                            label="Interests/Hobbies"
                            name="interests"
                            type="text"
                            value={userData[0].interests}
                            statusCompleted={userData.f_name ? true : false}
                        />
                        <StaticBox
                            label="Email"
                            name="email"
                            type="text"
                            value={userData[0].email}
                            statusCompleted={userData.f_name ? true : false}
                        />
                        <div className="mt-3 mb-1">Your Prices</div>
                        <div className="flex flex-row ">
                            <StaticBox
                                label="1 hour tour"
                                name="one_hour"
                                type="text"
                                value={`$${userData[0].one_hour}`}
                                statusCompleted={userData.f_name ? true : false}
                            />
                            <StaticBox
                                label="2 hour tour"
                                name="two_hour"
                                type="text"
                                value={`$${userData[0].two_hour}`}
                                statusCompleted={userData.f_name ? true : false}
                            />
                        </div>
                        <div className="flex flex-row ">
                            <StaticBox
                                label="3 hour tour"
                                name="three_hour"
                                type="text"
                                value={`$${userData[0].three_hour}`}
                                statusCompleted={userData.f_name ? true : false}
                            />
                            <StaticBox
                                label="5 hour tour"
                                name="five_hour"
                                type="text"
                                value={`$${userData[0].five_hour}`}
                                statusCompleted={userData.f_name ? true : false}
                            />
                        </div>
                    </div>
                </div>
            )}
            {!onboarded ? (
                ""
            ) : (
                <div className="w-full flex items-center justify-center mb-10">
                    <SignOut />
                </div>
            )}
        </div>
    );
}
