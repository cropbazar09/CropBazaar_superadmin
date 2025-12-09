"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Navbar } from "./dashboard/_components/navbar";
import { Sidebar } from "./dashboard/_components/sidebar";
import useUserSession from "@/hooks/useUser";

const layout = ({ children }) => {
    const { session, loading } = useUserSession();

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-[#F4F5F9]">

                <p className="text-gray-500">Loading...</p>
            </div>
        );
    }
    if (!session) {
        return (
            <div className="flex items-center justify-center h-screen bg-[#F4F5F9]">
                <p className="text-gray-500">You are not logged in.</p>
            </div>
        );
    }
    return (
        <div className="flex h-screen bg-[#F4F5F9]">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
                <Navbar />
                <ScrollArea className="px-6">
                    {children}
                    <div className="h-4"></div>
                </ScrollArea>
            </div>
        </div>
    );
}

export default layout;

