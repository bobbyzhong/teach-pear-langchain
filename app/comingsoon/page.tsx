"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page() {
    const router = useRouter();

    return (
        <section className="bg-white1">
            <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
                <div>
                    <p className="text-sm font-medium text-green ">
                        🍐 Coming Soon!
                    </p>
                    <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">
                        Sorry that feature is coming soon
                    </h1>
                    <p className="mt-4 text-gray-500 ">
                        The team at Pear is currently working on that feature.
                        We'll let you know once it's finished!
                    </p>

                    <div className="flex items-center mt-6 gap-x-3">
                        <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto  hover:bg-gray-100 ">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="w-5 h-5 rtl:rotate-180"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                                />
                            </svg>

                            <span onClick={() => router.back()}>Go back</span>
                        </button>

                        <Link
                            href={"/dashboard"}
                            className="w-1/2 px-5 py-2 text-sm tracking-wide text-white1 transition-colors duration-200 bg-green rounded-lg shrink-0 sm:w-auto hover:bg-green2  "
                        >
                            Take me home
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
