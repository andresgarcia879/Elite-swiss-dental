import prisma from "@/lib/db";
import TreatmentForm from "@/components/admin/treatments/TreatmentForm";
import { createTreatment } from "@/actions/treatments";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default async function NewTreatmentPage() {
    const specialties = await prisma.specialty.findMany({
        orderBy: { name: "asc" },
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/treatments">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h2 className="text-3xl font-serif font-bold text-slate-900">Add Treatment</h2>
                    <p className="text-slate-500 mt-2">Create a new service.</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg border">
                <TreatmentForm action={createTreatment} specialties={specialties} />
            </div>
        </div>
    );
}
