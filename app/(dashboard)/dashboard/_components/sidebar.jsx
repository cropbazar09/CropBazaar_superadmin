"use client"

import { LayoutDashboard, Briefcase, Database, CreditCard, Users, Newspaper, Ticket, SendToBack, FileQuestion, SquareAsterisk, Bell, Boxes, Cog, Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard", id: "dashboard" },
  { icon: Briefcase, label: "Crops", href: "/Crops", id: "Crops" },
  { icon: Database, label: "Database", href: "/database", id: "database" },
   { icon: Briefcase, label: "Teams", href: "/teams", id: "teams" },
  
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-screen overflow-auto w-64 bg-white border-r">
      <div className="flex items-center justify-center my-6">
        <Link href="/dashboard">
          <img src="/crop.png" className="h-14" alt="Logo" />
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto pb-6">
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const isActive =
              item.href !== "" && pathname.startsWith(item.href)

            return (
              <li key={index}>
                <div className="flex gap-3 pr-3 mt-2">
                  {isActive ? (
                    <div className="bg-gradient-to-r from-[#1FFF9A] to-[#1EE3FF] h-11 w-3 rounded-r-lg" />
                  ) : (
                    <div className="h-11 w-3 rounded-r-lg" />
                  )}

                  <Link href={item.href} className="w-full">
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start h-11",
                        isActive &&
                          "bg-gradient-to-r from-[#79FFC3] to-[#78EEFF] text-black"
                      )}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.label}
                    </Button>
                  </Link>
                </div>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
