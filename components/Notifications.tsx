import Notif from "./Notif";
export default function Notifications() {
    return (
        <div className="w-full flex flex-col bg-[#f5f5f5]  pt-5 pb-2 px-5 rounded-md ">
            <h1 className="text-2xl font-semibold text-zinc-800">
                Notifications
            </h1>
            <Notif />
            <Notif />
            <Notif />
            <Notif />
            <Notif />
            <Notif />
            <Notif />
            <Notif />
            <Notif />
            <Notif />
        </div>
    );
}
