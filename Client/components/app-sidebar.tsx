"use client"

import Link from "next/link"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

import { IconHome } from "@tabler/icons-react"
import { FiHome } from "react-icons/fi";
import { LuUsers } from "react-icons/lu";
import { FaCar } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";
import Image from "next/image";

interface AppSidebarProps {
    name: string;
    href: string;
    icon: string
}

type sidebarProps = {
    data: AppSidebarProps[]
}

const iconMap: Record<string, IconType> = {
    dashboard: FiHome,
    users: LuUsers,
    booking: SlCalender,
    vehicles: FaCar,
    bookings: SlCalender,
};

export function AppSidebar({ data }: sidebarProps) {
    let path = usePathname()


    return (
        <Sidebar>
            <SidebarHeader className="">  <Image
                src="/logo.png"
                width={150}
                height={50}
                alt="Logo"
                className="ms-3 mt-3"

            />  </SidebarHeader>
            <SidebarContent>
                <SidebarMenu className="p-4">
                    {data.map((item, index) => {
                        const Icon = iconMap[item.icon];
                        const isActive = path.startsWith(item.href);

                        return (
                            <SidebarMenuItem
                                key={index}
                                className={`p-2 rounded-md ${isActive ? "bg-blue-900" : "hover:bg-gray-100"
                                    }`}
                            >
                                <SidebarMenuButton asChild className="hover:bg-transparent hover:text-inherit">
                                    <Link
                                        href={item.href}
                                        className="flex items-center gap-3"
                                    >
                                        {Icon && (
                                            <Icon height={30} width={30}
                                                className={`w-7 h-7 ${isActive
                                                    ? "text-white"
                                                    : "text-black"
                                                    }`}
                                            />
                                        )}
                                        <span
                                            className={
                                                isActive
                                                    ? "text-white"
                                                    : "text-gray-700"
                                            }
                                        >
                                            {item.name}
                                        </span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className="border-t border-gray-300">
                <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                        <Link href="/">
                            <div className="flex items-center gap-3 hover:bg-accent hover:text-accent-foreground p-2 rounded-md">
                                <SlCalender className="w-6 h-6 text-gray-500" />
                                <span className="text-gray-500 text-lg">
                                    Sign Out
                                </span>
                            </div>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarFooter>        </Sidebar>
    )
}
