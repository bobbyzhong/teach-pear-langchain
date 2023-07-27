import Notif from "./Notif";
export default function Notifications() {
    return (
        <div className="w-full flex flex-col border-[1.5px] border-gray2 rounded-[5px]  pt-5 pb-2 px-5 max-h-[32rem] ">
            <h1 className="text-[20px] font-semibold tracking-tight text-zinc-900 border-b-[1.5px] pb-3 border-gray2 ">
                Notifications
            </h1>
            <div className="overflow-scroll no-scrollbar">
                <Notif />
                <Notif />
                <Notif />
                <Notif />
                <Notif />
                <Notif />
                <Notif />
                <Notif />
            </div>
        </div>
    );
}
