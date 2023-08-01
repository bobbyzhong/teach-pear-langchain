import Link from "next/link";
import { redirect } from "next/navigation";
import createClient from "../supabase-server";
import { CreateStandardQuiz } from "@/components/CreateStandardQuiz";
import React from "react";

export default async function Page() {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const { data: userInfo } = await supabase
        .from("users")
        .select("*")
        .eq("user_id", user.id);

    return (
        <div className="">
            <CreateStandardQuiz user={user} />
        </div>
    );
}
