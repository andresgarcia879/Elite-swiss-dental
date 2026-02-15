import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, MessageSquare, Activity } from "lucide-react";
import prisma from "@/lib/db";

export const dynamic = "force-dynamic";

async function getDashboardData() {
    const [
        totalAppointments,
        activeDoctors,
        newMessages,
        revenueData,
        recentAppointments,
        recentActivity
    ] = await Promise.all([
        prisma.appointment.count(),
        prisma.doctor.count({ where: { isActive: true } }),
        prisma.contactMessage.count(), // Currently just total messages
        prisma.appointment.findMany({
            where: { status: { in: ["CONFIRMED", "COMPLETED"] } },
            include: { service: true }
        }),
        prisma.appointment.findMany({
            take: 5,
            orderBy: { createdAt: "desc" },
            include: { service: true }
        }),
        prisma.appointment.findMany({ // Using appointments as activity for now
            take: 5,
            orderBy: { updatedAt: "desc" },
            include: { service: true }
        })
    ]);

    const totalRevenue = revenueData.reduce((acc, appt) => {
        return acc + (Number(appt.service?.price) || 0);
    }, 0);

    return {
        totalAppointments,
        activeDoctors,
        newMessages,
        totalRevenue,
        recentAppointments,
        recentActivity
    };
}

export default async function AdminDashboard() {
    const data = await getDashboardData();

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-serif font-bold text-slate-900">Dashboard</h2>
                <p className="text-slate-500 mt-2">Welcome back to the clinic management portal.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Total Appointments" value={data.totalAppointments.toString()} icon={Calendar} trend="All time" />
                <StatCard title="Active Doctors" value={data.activeDoctors.toString()} icon={Users} trend="Currently active" />
                <StatCard title="Total Messages" value={data.newMessages.toString()} icon={MessageSquare} trend="Inbox count" />
                <StatCard title="Total Revenue" value={`CHF ${data.totalRevenue.toLocaleString()}`} icon={Activity} trend="Confirmed bookings" />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Appointments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {data.recentAppointments.length === 0 ? (
                            <p className="text-sm text-slate-500">No recent appointments to show.</p>
                        ) : (
                            <ul className="space-y-4">
                                {data.recentAppointments.map((appt) => (
                                    <li key={appt.id} className="flex justify-between items-center border-b pb-2 last:border-0">
                                        <div>
                                            <p className="font-medium text-slate-900">{appt.fullName}</p>
                                            <p className="text-sm text-slate-500">{appt.service?.name}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-slate-900">
                                                {new Date(appt.preferredDate).toLocaleDateString()}
                                            </p>
                                            <span className={`text-xs px-2 py-1 rounded-full ${appt.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' :
                                                appt.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-red-100 text-red-700'
                                                }`}>
                                                {appt.status}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {data.recentActivity.length === 0 ? (
                            <p className="text-sm text-slate-500">No checking activity.</p>
                        ) : (
                            <ul className="space-y-4">
                                {data.recentActivity.map((appt) => (
                                    <li key={appt.id} className="text-sm">
                                        <span className="font-medium">{appt.fullName}</span> appointment updated to <span className="font-bold">{appt.status}</span>.
                                        <p className="text-xs text-slate-400">{new Date(appt.updatedAt).toLocaleString()}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon: Icon, trend }: { title: string, value: string, icon: any, trend: string }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">
                    {title}
                </CardTitle>
                <Icon className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-slate-900">{value}</div>
                <p className="text-xs text-slate-500 mt-1">
                    {trend}
                </p>
            </CardContent>
        </Card>
    );
}
