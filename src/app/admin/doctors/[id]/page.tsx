import prisma from "@/lib/db";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import DoctorForm from "@/components/admin/doctors/DoctorForm";

async function getDoctor(id: string) {
    return await prisma.doctor.findUnique({
        where: { id },
        include: { services: true }
    });
}

async function getSpecialties() {
    return await prisma.specialty.findMany({ orderBy: { name: "asc" } });
}

async function getTreatments() {
    return await prisma.service.findMany({ orderBy: { name: "asc" } });
}

export default async function EditDoctorPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const [doctor, specialties, treatments] = await Promise.all([
        getDoctor(id),
        getSpecialties(),
        getTreatments(),
    ]);

    if (!doctor) {
        notFound();
    }

    const formattedTreatments = treatments.map(t => ({ id: t.id, name: t.name }));
    const formattedDoctor = {
        ...doctor,
        services: doctor.services.map(s => ({ id: s.id })),
        // Ensure other decimal fields (if any) are handled, but Doctor model seems safe (experience is Int, others String/Bool)
    };

    return (
        <div className="space-y-6">
            <div>
                <Button variant="ghost" asChild className="mb-4 pl-0 hover:bg-transparent hover:text-primary">
                    <Link href="/admin/doctors">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Doctors
                    </Link>
                </Button>
                <h2 className="text-3xl font-serif font-bold text-slate-900">Edit Doctor</h2>
            </div>

            <DoctorForm specialties={specialties} treatments={formattedTreatments} doctor={formattedDoctor} />
        </div>
    );
}
