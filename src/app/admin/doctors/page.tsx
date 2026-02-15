import prisma from "@/lib/db";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { DoctorCard } from "@/components/admin/doctors/DoctorCard";
import { Badge } from "@/components/ui/badge";

async function getDoctors() {
    return await prisma.doctor.findMany({
        include: {
            specialty: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
}

export default async function DoctorsPage() {
    const doctors = await getDoctors();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-serif font-bold text-slate-900">Doctors</h2>
                    <p className="text-slate-500 mt-2">Manage your team of specialists.</p>
                </div>
                <Button asChild>
                    <Link href="/admin/doctors/new">
                        <Plus className="mr-2 h-4 w-4" /> Add Doctor
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {doctors.map((doctor) => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
            </div>
        </div>
    );
}
