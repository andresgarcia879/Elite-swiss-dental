import prisma from "@/lib/db";
import { format } from "date-fns";

async function getMessages() {
    return await prisma.contactMessage.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });
}

export default async function MessagesPage() {
    const messages = await getMessages();

    return (
        <div className="space-y-8 max-w-5xl">
            <div>
                <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white">Messages</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-2">Inquiries from the contact form.</p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                {messages.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="mx-auto h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                            <span className="text-xl">📭</span>
                        </div>
                        <h3 className="text-lg font-medium text-slate-900 dark:text-white">No messages yet</h3>
                        <p className="text-slate-500 mt-1">New inquiries will appear here.</p>
                    </div>
                ) : (
                    <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                        {messages.map((msg) => (
                            <li key={msg.id} className="p-6 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                <div className="flex flex-col md:flex-row gap-6 md:items-start">
                                    <div className="min-w-[180px]">
                                        <p className="font-serif font-bold text-slate-900 dark:text-white text-lg">{msg.name}</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{msg.email}</p>
                                        <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">
                                            {format(msg.createdAt, "MMM d, yyyy • h:mm a")}
                                        </p>
                                    </div>
                                    <div className="flex-1 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-100 dark:border-slate-800">
                                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                                            {msg.message}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
