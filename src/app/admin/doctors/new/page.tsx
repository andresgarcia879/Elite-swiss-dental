import prisma from "@/lib/db";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import DoctorsForm from "@/components/admin/doctors/DoctorForm";

async function getSpecialties() {
    return await prisma.specialty.findMany({ orderBy: { name: "asc" } });
}

async function getTreatments() {
    return await prisma.service.findMany({ orderBy: { name: "asc" } });
}

export default async function NewDoctorPage() {
    const [specialties, treatments] = await Promise.all([
        getSpecialties(),
        getTreatments()
    ]);

    const formattedTreatments = treatments.map(t => ({ id: t.id, name: t.name }));

    return (
        <div className="space-y-6">
            <div>
                <Button variant="ghost" asChild className="mb-4 pl-0 hover:bg-transparent hover:text-primary">
                    <Link href="/admin/doctors">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Doctors
                    </Link>
                </Button>
                <h2 className="text-3xl font-serif font-bold text-slate-900">Add New Doctor</h2>
            </div>

            <DoctorsForm specialties={specialties} treatments={formattedTreatments} />
        </div>
    );
}
