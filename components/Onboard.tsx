"use client";
import supabase from "../app/supabase-browser";
import { InputBox, LargeInputBox } from "@/components/Inputs";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { UserDataTypes } from "@/types/types";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "./Navbar";
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
                router.push("/login");
                // router.refresh();
            } else {
                console.log(error);
            }
        } catch (error: any) {
            alert(error.message);
        }
    };

    return (
        <div className="w-full">
            <Navbar />
            <div className="auth-container font-outfit">
                {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
                <div className="auth-card ">
                    <h1 className="auth-title">Last Step!</h1>
                    <div className="w-full text-center text-[16px] text-zinc-500 font-medium mb-4">
                        Just fill out this information and you're all set!
                    </div>
                    <div className="auth-form">
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
                            placeholder="Cerritos Elementary, Private Tutor"
                            type="text"
                            value={userData.school}
                            statusCompleted={userData.f_name ? true : false}
                            handleChange={handleChange}
                        />

                        <div className="w-full pt-5 flex justify-between">
                            <button
                                className={`auth-button`}
                                onClick={handleSubmit}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
