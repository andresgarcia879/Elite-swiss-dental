import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import "../globals.css";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session?.user) {
        redirect("/login");
    }

    return (
        <html lang="en">
            <body className="flex h-screen bg-slate-50">
                <AdminSidebar />
                <main className="flex-1 overflow-y-auto p-8">
                    {children}
                </main>
            </body>
        </html>
    );
}
