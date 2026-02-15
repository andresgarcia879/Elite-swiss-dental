"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Users,
    Calendar,
    Sparkles,
    Award,
    MessageSquare,
    Settings,
    LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const sidebarItems = [
    { icon: LayoutDashboard, label: "Overview", href: "/admin" },
    { icon: Calendar, label: "Appointments", href: "/admin/appointments" },
    { icon: Users, label: "Doctors", href: "/admin/doctors" },
    { icon: Sparkles, label: "Treatments", href: "/admin/treatments" },
    { icon: Award, label: "Specialties", href: "/admin/specialties" },
    { icon: MessageSquare, label: "Messages", href: "/admin/messages" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <div className="w-64 bg-white border-r h-full flex flex-col">
            <div className="p-6 border-b">
                <h1 className="font-serif text-xl font-bold text-slate-900">
                    Elite Swiss<span className="text-primary">.</span>
                </h1>
                <p className="text-xs text-slate-500 uppercase tracking-wider mt-1">Admin Portal</p>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {sidebarItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-slate-900 text-white shadow-md"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            )}
                        >
                            <item.icon className="size-5" />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t">
                <Button
                    variant="ghost"
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => signOut({ callbackUrl: "/login" })}
                >
                    <LogOut className="size-5 mr-3" />
                    Sign Out
                </Button>
            </div>
        </div>
    );
}
