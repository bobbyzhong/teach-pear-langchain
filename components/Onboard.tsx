"use client";
import Link from "next/link";
import { redirect } from "next/navigation";
import supabase from "../app/supabase-browser";
import SignOut from "../components/SignOut";
import { useAuth } from "../components/AuthProvider";
import { InputBox, LargeInputBox } from "@/components/Inputs";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { UserDataTypes } from "@/types/types";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React from "react";

import { PlainButton } from "./Button";

const USER_DATA_INITIAL_STATE = {
    user_id: "",
    email: "",
    f_name: "",
    l_name: "",
    school: "",
    students: [],
};

export default function Onboard(user: any) {
    const router = useRouter();
    const [userData, setUserData] = useState<UserDataTypes>(
        USER_DATA_INITIAL_STATE
    );

    useEffect(() => {
        setUserData((prevState) => ({
            ...prevState,
            user_id: user.user.user.id,
            email: user.user.user.email,
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
            const { error } = await supabase.from("teachers").insert(userData);
            if (!error) {
                router.push("/dashboard");
            } else {
                console.log(error);
            }
        } catch (error: any) {
            alert(error.message);
        }
    };

    return (
        <div className="flex w-full justify-center">
            {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
            <div className="w-full flex flex-col items-center">
                <h1 className="text-3xl">Last Step!</h1>
                <p className="md:w-6/12 w-10/12 text-center font-light mt-3">
                    Just fill out this information and you'll be all good to go
                </p>
                <div className="mx-20 md:w-3/12 w-10/12 mt-8 flex flex-col space-y-3">
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
                        label="School you teach at"
                        name="school"
                        placeholder="Cerritos Elementary, LB High School, Private Tutor"
                        type="text"
                        value={userData.school}
                        statusCompleted={userData.f_name ? true : false}
                        handleChange={handleChange}
                    />

                    <div className="w-full pt-10 flex justify-between">
                        <button
                            className={`"mt-8 mr-0 bg-black text-white inline-block text-center w-full text-sm transition ease-in-out duration-100
                            hover:scale-105 tracking-wider rounded-md my-0 py-[10px] `}
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
