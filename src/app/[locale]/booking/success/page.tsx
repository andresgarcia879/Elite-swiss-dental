import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function BookingSuccessPage() {
    const t = await getTranslations("Booking");

    return (
        <div className="min-h-screen pt-32 pb-20 bg-slate-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                    <CheckCircle2 className="size-10" />
                </div>
                <h1 className="text-3xl font-serif font-bold text-slate-900 mb-4">Payment Successful!</h1>
                <p className="text-slate-500 mb-8">
                    Your appointment has been confirmed. We have sent a confirmation email with all the details.
                </p>
                <Button asChild className="w-full">
                    <Link href="/">Return to Home</Link>
                </Button>
            </div>
        </div>
    );
}
