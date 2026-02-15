import prisma from "@/lib/db";
import TreatmentForm from "@/components/admin/treatments/TreatmentForm";
import { updateTreatment } from "@/actions/treatments";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

interface EditTreatmentPageProps {
    params: Promise<{ id: string }>;
}

export default async function EditTreatmentPage({ params }: EditTreatmentPageProps) {
    const { id } = await params;

    const treatment = await prisma.service.findUnique({
        where: { id },
    });

    if (!treatment) {
        notFound();
    }

    const specialties = await prisma.specialty.findMany({
        orderBy: { name: "asc" },
    });

    const updateTreatmentWithId = updateTreatment.bind(null, id);

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/treatments">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h2 className="text-3xl font-serif font-bold text-slate-900">Edit Treatment</h2>
                    <p className="text-slate-500 mt-2">Update treatment details.</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg border">
                <TreatmentForm
                    action={updateTreatmentWithId}
                    specialties={specialties}
                    initialData={{
                        name: treatment.name,
                        duration: treatment.duration,
                        price: Number(treatment.price),
                        specialtyId: treatment.specialtyId,
                        description: treatment.description || "",
                        benefits: treatment.benefits.join(", "),
                        name_de: treatment.name_de || "",
                        name_fr: treatment.name_fr || "",
                        name_it: treatment.name_it || "",
                        description_de: treatment.description_de || "",
                        description_fr: treatment.description_fr || "",
                        description_it: treatment.description_it || "",
                        benefits_de: treatment.benefits_de?.join(", ") || "",
                        benefits_fr: treatment.benefits_fr?.join(", ") || "",
                        benefits_it: treatment.benefits_it?.join(", ") || "",
                    }}
                />
            </div>
        </div>
    );
}
