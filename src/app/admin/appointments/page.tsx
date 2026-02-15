import prisma from "@/lib/db";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Trash2 } from "lucide-react";
import { updateAppointmentStatus, deleteAppointment } from "@/actions/appointments";
export const dynamic = "force-dynamic";

async function getAppointments() {
    const appointments = await prisma.appointment.findMany({
        include: {
            service: true,
        },
        orderBy: { createdAt: "desc" },
    });
    console.log("Admin: Fetched appointments count:", appointments.length);
    if (appointments.length > 0) {
        console.log("Admin: First appointment:", JSON.stringify(appointments[0], null, 2));
    }
    return appointments;
}

export default async function AppointmentsPage() {
    const appointments = await getAppointments();

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-serif font-bold text-slate-900">Appointments</h2>
                <p className="text-slate-500 mt-2">Manage patient bookings.</p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
                        <TableRow>
                            <TableHead className="font-serif font-bold text-slate-900 dark:text-white pl-6 py-4">Date</TableHead>
                            <TableHead className="font-serif font-bold text-slate-900 dark:text-white py-4">Patient</TableHead>
                            <TableHead className="font-serif font-bold text-slate-900 dark:text-white py-4">Contact</TableHead>
                            <TableHead className="font-serif font-bold text-slate-900 dark:text-white py-4">Service</TableHead>
                            <TableHead className="font-serif font-bold text-slate-900 dark:text-white py-4">Status</TableHead>
                            <TableHead className="text-right font-serif font-bold text-slate-900 dark:text-white pr-6 py-4">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {appointments.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-12 text-slate-500">
                                    <p className="text-lg font-medium text-slate-900 dark:text-white mb-1">No appointments found</p>
                                    <p className="text-sm text-slate-500">New bookings will appear here.</p>
                                </TableCell>
                            </TableRow>
                        ) : (
                            appointments.map((appointment) => (
                                <TableRow key={appointment.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors">
                                    <TableCell className="pl-6 py-4">
                                        <div className="font-medium text-slate-900">{appointment.preferredDate.toLocaleDateString()}</div>
                                        <div className="text-xs text-slate-500">{appointment.preferredDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                    </TableCell>
                                    <TableCell className="font-medium py-4 text-base text-slate-900">{appointment.fullName}</TableCell>
                                    <TableCell className="py-4">
                                        <div className="text-sm text-slate-700">{appointment.email}</div>
                                        <div className="text-xs text-slate-500">{appointment.phone}</div>
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
                                            {appointment.service?.name || "General Consultation"}
                                        </span>
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <Badge
                                            className={
                                                appointment.status === "CONFIRMED"
                                                    ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none shadow-none"
                                                    : appointment.status === "CANCELLED"
                                                        ? "bg-red-100 text-red-700 hover:bg-red-200 border-none shadow-none"
                                                        : "bg-amber-100 text-amber-700 hover:bg-amber-200 border-none shadow-none"
                                            }
                                        >
                                            {appointment.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right pr-6 py-4">
                                        <div className="flex justify-end gap-2">
                                            {appointment.status === "PENDING" && (
                                                <>
                                                    <form action={async () => {
                                                        "use server"
                                                        await updateAppointmentStatus(appointment.id, "CONFIRMED")
                                                    }}>
                                                        <Button size="icon" variant="ghost" className="h-8 w-8 text-emerald-600 hover:bg-emerald-50 rounded-full" title="Confirm">
                                                            <CheckCircle className="size-4" />
                                                        </Button>
                                                    </form>
                                                    <form action={async () => {
                                                        "use server"
                                                        await updateAppointmentStatus(appointment.id, "CANCELLED")
                                                    }}>
                                                        <Button size="icon" variant="ghost" className="h-8 w-8 text-rose-500 hover:bg-rose-50 rounded-full" title="Cancel">
                                                            <XCircle className="size-4" />
                                                        </Button>
                                                    </form>
                                                </>
                                            )}
                                            <form action={async () => {
                                                "use server"
                                                await deleteAppointment(appointment.id)
                                            }}>
                                                <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full" title="Delete">
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
