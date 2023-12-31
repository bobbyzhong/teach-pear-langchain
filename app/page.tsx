"use client";
import Navbar from "@/components/Navbar";
import Image from "next/image";

const QUIZ_CONFIG_INITIAL = {
    content: "",
    numQuestions: "3",
    questionType: "multiple choice",
};

const QUIZ_INFO_INITIAL = {
    quizName: "",
};

export default function HomePage() {
    return (
        <div className="font-outfit">
            <Navbar />

            <div className="h-screen flex lg:flex-row lg:bg-[#ecedd2]">
                <div className="bg-[url('/assets/landing2.png')]  h-full w-full lg:hidden bg-cover absolute -z-50"></div>
                <div
                    className="TEXT SECTION lg:w-7/12 w-full lg:ml-20 py-[10rem] flex flex-col lg:items-start lg:text-start 
             justify-center items-center text-center"
                >
                    <div className="text-4xl sm:text-5xl font-semibold sm:w-10/12 w-11/12 tracking-[0.02rem] sm:leading-[3.8rem] -mt-20 leading-[2.8rem] text-white1 lg:text-black ">
                        Pear helps with the busy work so you can focus on the
                        human side of teaching
                    </div>
                    <div className="sm:text-[1.3rem] text-[1.2rem] text-white1  lg:text-zinc-700 w-10/12 sm:w-8/12 my-8">
                        Easily create custom teaching material such as quizzes,
                        worksheets, and handouts using AI through Pear
                    </div>
                    <div className="text-[1rem] text-white1  lg:text-zinc-700 w-8/12 mb-3">
                        Enter your email to try out beta!
                    </div>
                    <div className="flex sm:flex-row gap-2 flex-col items-center ">
                        <div className=" flex flex-col ">
                            <input
                                className={`
               border-b py-2 px-4 w-[16.5rem] bg-transparent lg:placeholder:text-gray-700 placeholder:text-white1  tracking-wider outline-none border-gray-200 lg:border-zinc-700 lg:text-zinc-700
                 `}
                                type="text"
                                name="email"
                                // value={email}
                                placeholder={"youremail@example.com"}
                                // onChange={handleChange}
                                required={true}
                            />
                        </div>

                        <button
                            // onClick={handleSubmit}
                            className={`inline-block text-white tracking-wider text-center max-w-fit lg:bg-black bg-green
        font-normal text-sm transition ease-in-out duration-100
      box-content hover:scale-105 my-0 px-[43px] py-[10px]`}
                        >
                            Submit
                        </button>
                    </div>
                </div>

                <div className="IMAGE SECTION hidden lg:block min-h-full bg-cover w-6/12 bg-[url('/assets/landing.png')]"></div>
            </div>
        </div>
    );
}
