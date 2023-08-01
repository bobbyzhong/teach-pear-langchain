import Link from "next/link";
import { QuizModalLink } from "./QuizModalLink";
import Image from "next/image";

export const QuizModal = ({
    isVisible,
    onClose,
}: {
    isVisible: any;
    onClose: any;
}) => {
    if (!isVisible) return null;

    const handleClose = (e: any) => {
        if (e.target.id === "wrapper") onClose();
    };

    return (
        <div
            className="z-[60] fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm
        flex justify-center items-center"
            id="wrapper"
            onClick={handleClose}
        >
            <div className="w-[550px] flex flex-col bg-white1 py-6 px-8 mb-5">
                <div className="flex flex-row justify-between mb-3">
                    <Image
                        src={"/assets/icons/quizmodalicons.svg"}
                        height={120}
                        width={120}
                        alt="icongroup"
                    />
                    <Image
                        src={"/assets/icons/x.svg"}
                        height={20}
                        width={20}
                        alt="icongroup"
                        onClick={onClose}
                        className="cursor-pointer"
                    />
                </div>
                <div className="flex flex-col TEXT mb-4">
                    <h1 className="font-semibold text-lg tracking-tight mb-1">
                        Select Quiz Type
                    </h1>
                    <p className="text-zinc-500 text-sm">
                        Choose where the content of your quiz will be coming
                        from
                    </p>
                </div>
                <div className="flex flex-col gap-3">
                    <QuizModalLink
                        link={"/createStandardQuiz"}
                        title={"Plain Content"}
                        icon={"/assets/icons/pageicon.svg"}
                    >
                        Create a quiz based off your own content. Copy and paste
                        the material yourself!
                    </QuizModalLink>
                    <QuizModalLink
                        link={"/createTextbookQuiz"}
                        title={"Textbook"}
                        icon={"/assets/icons/textbookicon.svg"}
                    >
                        Create a quiz based off of a specific textbook. Quiz key
                        concepts or chapters of a textbook.
                    </QuizModalLink>
                    <QuizModalLink
                        link={"/comingsoon"}
                        title={"Online Article/Website"}
                        icon={"/assets/icons/qrcodeicon.svg"}
                    >
                        Create a quiz based off an online article or website.
                        Just provide the link and we’ll make the quiz!
                    </QuizModalLink>
                    <QuizModalLink
                        link={"/comingsoon"}
                        title={"YouTube Video"}
                        icon={"/assets/icons/youtubeicon.svg"}
                    >
                        Create a quiz based off a youtube video. Provide the
                        link to the video and we’ll take care of the rest!
                    </QuizModalLink>
                </div>
            </div>
        </div>
    );
};
