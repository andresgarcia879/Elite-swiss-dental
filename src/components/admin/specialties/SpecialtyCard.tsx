"use client";

import { Trash2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteSpecialty } from "@/actions/specialties";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface SpecialtyCardProps {
    specialty: {
        id: string;
        name: string;
        _count: {
            doctors: number;
        };
    };
}

export function SpecialtyCard({ specialty }: SpecialtyCardProps) {
    return (
        <Card className="hover:shadow-md transition-shadow duration-300 border-slate-200 dark:border-slate-800">
            <CardHeader className="pb-2">
                <CardTitle className="font-serif text-xl text-slate-900 dark:text-white flex items-center justify-between">
                    {specialty.name}
                    <div className="h-8 w-8 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center">
                        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-300">
                            {specialty.name.charAt(0)}
                        </span>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{specialty._count.doctors} Doctors Assigned</span>
                </div>
            </CardContent>
            <CardFooter className="bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 p-3 flex justify-end">
                <form action={async () => {
                    await deleteSpecialty(specialty.id)
                }}>
                    <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 h-8"
                    >
                        <Trash2 className="w-4 h-4 mr-2" /> Delete
                    </Button>
                </form>
            </CardFooter>
        </Card>
    );
}
