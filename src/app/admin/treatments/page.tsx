import prisma from "@/lib/db";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { deleteTreatment } from "@/actions/treatments";

export const dynamic = "force-dynamic";

async function getTreatments() {
    return await prisma.service.findMany({
        include: {
            specialty: true,
        },
        orderBy: { name: "asc" },
    });
}

export default async function TreatmentsPage() {
    const treatments = await getTreatments();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-serif font-bold text-slate-900">Treatments</h2>
                    <p className="text-slate-500 mt-2">Manage medical services and prices.</p>
                </div>
                <Link href="/admin/treatments/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Add Treatment
                    </Button>
                </Link>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
                        <TableRow>
                            <TableHead className="font-serif font-bold text-slate-900 dark:text-white pl-6 py-4">Name</TableHead>
                            <TableHead className="font-serif font-bold text-slate-900 dark:text-white py-4">Specialty</TableHead>
                            <TableHead className="font-serif font-bold text-slate-900 dark:text-white py-4">Duration</TableHead>
                            <TableHead className="font-serif font-bold text-slate-900 dark:text-white py-4">Price (CHF)</TableHead>
                            <TableHead className="text-right font-serif font-bold text-slate-900 dark:text-white pr-6 py-4">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {treatments.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-12 text-slate-500">
                                    <p className="text-lg font-medium text-slate-900 dark:text-white mb-1">No treatments found</p>
                                    <p className="text-sm text-slate-500">Get started by adding a new treatment service.</p>
                                </TableCell>
                            </TableRow>
                        ) : (
                            treatments.map((treatment) => (
                                <TableRow key={treatment.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors">
                                    <TableCell className="font-medium pl-6 py-4 text-base">{treatment.name}</TableCell>
                                    <TableCell className="py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                                            {treatment.specialty.name}
                                        </span>
                                    </TableCell>
                                    <TableCell className="py-4 text-slate-500">{treatment.duration} min</TableCell>
                                    <TableCell className="py-4 font-mono text-slate-700 dark:text-slate-300">
                                        {Number(treatment.price).toFixed(2)}
                                    </TableCell>
                                    <TableCell className="text-right pr-6 py-4">
                                        <div className="flex justify-end gap-2">
                                            <Link href={`/admin/treatments/${treatment.id}`}>
                                                <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
                                                    <Pencil className="size-4 text-slate-500" />
                                                </Button>
                                            </Link>
                                            <form action={async () => {
                                                "use server"
                                                await deleteTreatment(treatment.id)
                                            }}>
                                                <Button size="icon" variant="ghost" className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-full">
                                                    <Trash2 className="size-4" />
                                                </Button>
                                            </form>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
