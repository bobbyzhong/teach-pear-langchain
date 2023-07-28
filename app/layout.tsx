import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/components/AuthProvider";
import createClient from "./supabase-server";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Teach with Pear",
    description:
        "Pear helps with the busy work so you can focus on the human side of teaching",
    icon: "/assets/icons/pearemoji.png",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = createClient();
    const {
        data: { session },
    } = await supabase.auth.getSession();

    const accessToken = session?.access_token || null;

    return (
        <html lang="en">
            <meta
                content="width=device-width, initial-scale=1"
                name="viewport"
            />
            <meta name="description" content="Teach with Pear" />
            <meta property="og:image" content="/landing.png" />
            <link rel="icon" href="/assets/icons/pearemoji.png" />
            <body className={inter.className}>
                {" "}
                <AuthProvider accessToken={accessToken}>
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}
