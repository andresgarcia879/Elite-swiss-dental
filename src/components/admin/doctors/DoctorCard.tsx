"use client";

import Image from "next/image";
import Link from "next/link";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface DoctorCardProps {
    doctor: {
        id: string;
        fullName: string;
        title: string;
        specialty?: { name: string } | null;
        imageUrl: string;
        isActive: boolean;
        experience: number;
    };
}

export function DoctorCard({ doctor }: DoctorCardProps) {
    return (
        <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-800">
            <div className="relative h-64 w-full bg-slate-100 overflow-hidden">
                {doctor.imageUrl ? (
                    <Image
                        src={doctor.imageUrl}
                        alt={doctor.fullName}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300 bg-slate-50">
                        No Image
                    </div>
                )}
                <div className="absolute top-3 right-3">
                    <Badge
                        variant={doctor.isActive ? "default" : "secondary"}
                        className={doctor.isActive ? "bg-emerald-500 hover:bg-emerald-600" : "bg-slate-500"}
                    >
                        {doctor.isActive ? "Active" : "Inactive"}
                    </Badge>
                </div>
            </div>

            <CardContent className="p-5">
                <div className="mb-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                        {doctor.specialty?.name || "General"}
                    </p>
                    <h3 className="font-serif text-xl font-bold text-slate-900 line-clamp-1">
                        {doctor.fullName}
                    </h3>
                    <p className="text-sm text-slate-500 font-medium">
                        {doctor.title}
                    </p>
                </div>

                <div className="flex items-center gap-4 text-sm text-slate-600 mt-4 pt-4 border-t border-slate-100">
                    <div>
                        <span className="font-bold text-slate-900">{doctor.experience}</span>
                        <span className="text-slate-400 ml-1">Years Exp.</span>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="p-4 bg-slate-50/50 border-t border-slate-100 flex justify-between gap-2">
                <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href={`/admin/doctors/${doctor.id}`}>
                        <Edit className="w-3 h-3 mr-2" /> Edit Profile
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
