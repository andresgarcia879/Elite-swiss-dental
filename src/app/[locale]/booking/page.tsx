import BookingWizard from "@/components/booking/BookingWizard";
import { getTranslations } from "next-intl/server";
import { getBookingData } from "@/actions/booking";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Booking" });

    return {
        title: t("meta_title"),
        description: t("meta_description"),
    };
}

export default async function BookingPage() {
    const { doctors, specialties } = await getBookingData();

    return (
        <div className="min-h-screen pt-32 pb-20 bg-slate-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">
                        Book Your Appointment
                    </h1>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Select your preferred specialist or treatment and find a time that works for you.
                    </p>
                </div>
                <BookingWizard initialDoctors={doctors} initialSpecialties={specialties} />
            </div>
        </div>
    );
}
