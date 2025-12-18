"use client"

import { Bell, BriefcaseBusiness, ChevronRight, HelpCircle, MapPin, Upload } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User2, Building, LogOut, Contact, Mail, right } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { use, useEffect, useState } from "react"

import { IoIosHelpCircle } from "react-icons/io";
import { supabase } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"
import useUserSession from "@/hooks/useUser"




export function Navbar() {
    const [selectType, setSelectType] = useState(false)
    const [jobDialog, setJobDialog] = useState(false);
    const [internshipDialog, setInternshipDialog] = useState(false);
    const router = useRouter();
    const { session } = useUserSession();
    const [userName, setUserName] = useState("");
    const [userImage, setUserImage] = useState("");
    const [loading, setLoading] = useState(true);
    const [notificationData, setNotificationData] = useState([]);
    const userid = session?.user.id;

    useEffect(() => {
        const fetchUserData = async () => {
            if (userid) {
                const { data, error } = await supabase
                    .from("recruiters")
                    .select("recruiter_name,recruiter_profile")
                    .eq("recruiter_id", userid)
                    .single();
                if (!error && data) {
                    // console.log("profile", data)
                    setUserName(data.recruiter_name);
                    setUserImage(data.recruiter_profile);
                }
                setLoading(false);
            }
        };

        const fetchNotification = async () => {
            if (userid) {
                const { data, error } = await supabase
                    .from("recruiter_notifications")
                    .select("*")
                    .eq("recruiter_id", "superadmin")
                    .eq("is_seen", false);

                if (!error && data) {
                    setNotificationData(data);
                }
            }
        }

        fetchNotification();
        fetchUserData();
    }, [userid]);

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (!error) {
            router.push("/");
        }
    };


    const handleJobBox = () => {
        setSelectType(false)
        setJobDialog(true)
    }
    const handleInternBox = () => {
        setSelectType(false)
        setInternshipDialog(true)
    }

    return (
        <header className="bg-[#F4F5F9]">
            <div className=" px-4 sm:px-6 bg-white lg:px-8 shadow-sm my-4 mx-6 rounded-xl">
              
                    <div className="flex items-center">
                        <Link href={'/dashboard/notifications'}>
                            <Button variant="ghost" size="icon" className="relative">
                                <Bell className="h-5 w-5 text-bluecolor" />
                                {notificationData.length > 0 && <span className="absolute -top-1 -right-1 size-4 center bg-red-500 rounded-full text-[10px] text-white">{notificationData.length}</span>}
                            </Button>
                        </Link>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="outline-none">
                                <div className="flex items-center outline-none">
                                    <Avatar className="ml-4">
                                        <AvatarImage src={
                                            userImage || session?.user?.user_metadata?.avatar_url
                                        } alt="User" />
                                        <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <span className="ml-2 text-sm font-medium text-gray-700">{userName}</span>
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-[250px]">
                                <Link href={'/dashboard/profile'}>
                                    <DropdownMenuItem>
                                        <div className="flex gap-2 items-center text-[#4B5690]">
                                            <User2 />
                                            <p>Personal Profile</p>
                                        </div>
                                    </DropdownMenuItem>
                                </Link>
                                <div className="h-2"></div>
                                <DropdownMenuItem onClick={handleLogout}>
                                    <div className="flex gap-2 items-center text-[#DE0000]">
                                        <LogOut />
                                        <p>Logout</p>
                                    </div>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </div>
                </div>
         

        </header>
    )
}