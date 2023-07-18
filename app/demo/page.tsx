"use client";
import VertNav from "@/components/VertNav";
import Image from "next/image";
import StatsBar from "@/components/StatsBar";
import Toolbox from "@/components/Toolbox";
import Notifications from "@/components/Notifications";

export default function DemoPage() {
    return (
        <div>
            <div className="bg-[#ececec] ">
                <div className="MAIN CONTAINER   flex flex-row gap-9">
                    <VertNav />
                    <div className="pt-[2.8rem] mr-[2.2rem]  flex flex-row gap-9">
                        <div className="w-8/12 flex flex-col gap-9">
                            <StatsBar />
                            <Toolbox />
                        </div>
                        <div className="w-4/12">
                            <Notifications />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
