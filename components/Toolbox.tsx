import ToolLink from "./ToolLink";

export default function Toolbox() {
    return (
        <div className="w-full flex flex-col bg-[#e9e9e9]  py-5 px-7 rounded-md ">
            <h1 className="text-3xl font-semibold text-zinc-800">Toolbox</h1>
            <p className="leading-5 w-10/12 text-zinc-500 text-[1rem] mt-2 mb-10">
                Here are all the tools we currently have that can help you
                create teaching material. Contact us if there’s any tool not
                here you might want!
            </p>
            <div className="flex flex-row gap-5">
                <div className="w-1/2">
                    <h1 className="text-xl font-semibold mb-3">
                        Quiz Generator
                    </h1>
                    <ToolLink href={"/createQuiz"} buttonText={"Create Quiz"}>
                        Create a custom quiz based on given content in seconds!
                    </ToolLink>
                </div>
                <div className="w-1/2 ">
                    <h1 className="text-xl font-semibold mb-3">
                        Quiz Generator
                    </h1>
                    <ToolLink
                        href={"/contentsimplifier"}
                        buttonText={"Simplify Content"}
                    >
                        Read something interesting online but it’s a bit out of
                        your student’s reading level? Create a handout that
                        contains a simplified version of that content!
                    </ToolLink>
                </div>
            </div>
        </div>
    );
}