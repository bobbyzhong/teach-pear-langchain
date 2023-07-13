import Notif from "./Notif";
export default function Notifications() {
    return (
        <div className="w-full flex flex-col bg-[#e9e9e9]  py-5 px-7 rounded-md ">
            <h1 className="text-3xl font-semibold text-zinc-800">
                Notifications
            </h1>
            <Notif />
        </div>
    );
}
