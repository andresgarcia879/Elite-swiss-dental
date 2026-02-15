import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function BookingCancelPage() {
    const t = await getTranslations("Booking");

    return (
        <div className="min-h-screen pt-32 pb-20 bg-slate-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 text-red-600">
                    <XCircle className="size-10" />
                </div>
                <h1 className="text-3xl font-serif font-bold text-slate-900 mb-4">Payment Cancelled</h1>
                <p className="text-slate-500 mb-8">
                    Your payment was cancelled and no appointment has been booked. You can try again or contact us if you need assistance.
                </p>
                <div className="space-y-3">
                    <Button asChild className="w-full bg-slate-900 text-white hover:bg-slate-800">
                        <Link href="/booking">Try Again</Link>
                    </Button>
                    <Button asChild variant="ghost" className="w-full">
                        <Link href="/">Return to Home</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
