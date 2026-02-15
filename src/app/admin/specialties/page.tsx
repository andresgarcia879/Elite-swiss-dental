import prisma from "@/lib/db";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { SpecialtyCard } from "@/components/admin/specialties/SpecialtyCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSpecialty } from "@/actions/specialties";
import { Plus } from "lucide-react";

async function getSpecialties() {
    return await prisma.specialty.findMany({
        orderBy: { name: 'asc' },
        include: { _count: { select: { doctors: true } } }
    });
}

export default async function SpecialtiesPage() {
    const specialties = await getSpecialties();

    return (
        <div className="space-y-8 max-w-6xl">
            <div>
                <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white">Specialties</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-2">Manage medical specialties and categories.</p>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
                <div className="order-2 lg:order-1">
                    {specialties.length === 0 ? (
                        <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl">
                            <p className="text-slate-500">No specialties found. Add one to get started.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {specialties.map((specialty) => (
                                <SpecialtyCard key={specialty.id} specialty={specialty} />
                            ))}
                        </div>
                    )}
                </div>

                <div className="order-1 lg:order-2">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm sticky top-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Plus className="w-5 h-5 text-emerald-600" />
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Add New Specialty</h3>
                        </div>
                        <form action={async (formData) => {
                            "use server"
                            await createSpecialty(formData)
                        }} className="space-y-4">
                            <div>
                                <Input
                                    name="name"
                                    placeholder="e.g. Orthodontics"
                                    required
                                    className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                                />
                            </div>
                            <Button type="submit" className="w-full bg-slate-900 text-white hover:bg-slate-800">
                                Create Specialty
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
