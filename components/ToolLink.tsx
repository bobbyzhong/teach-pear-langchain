import Link from "next/link";
import Image from "next/image";

export default function ToolLink({
    buttonText,
    href,
    children,
}: {
    buttonText: any;
    href: any;
    children: any;
}) {
    return (
        <Link
            href={href}
            className="w-full flex flex-col bg-[#e5e5e5] border-[2px] hover:border-black 
            text-zinc-500 hover:text-black border-zinc-500  py-5 px-5 rounded-xl h-52 justify-between  "
        >
            <div className="leading-[1.32rem]">{children}</div>
            <div className="w-full flex justify-end items-center gap-3">
                <p className="">{buttonText}</p>
                <div className="w-10 h-10">
                    <Image
                        src={"/assets/icons/chevdark.svg"}
                        height={100}
                        width={100}
                        alt={"arrow"}
                    />
                </div>
            </div>
        </Link>
    );
}
