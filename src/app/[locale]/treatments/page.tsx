import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getTranslations } from "next-intl/server";
import prisma from "@/lib/db";
import { TreatmentsSection } from "@/components/treatments/TreatmentsSection";

export const dynamic = "force-dynamic";

async function getTreatments(locale: string) {
    const treatments = await prisma.service.findMany({
        include: {
            specialty: true,
        },
        orderBy: { name: 'asc' },
    });

    // Normalize Decimal to number for client components and handle localization
    return treatments.map(t => {
        let name = t.name;
        let description = t.description;
        let benefits = t.benefits;

        if (locale === 'de') {
            name = t.name_de || t.name;
            description = t.description_de || t.description;
            benefits = t.benefits_de?.length > 0 ? t.benefits_de : t.benefits;
        } else if (locale === 'fr') {
            name = t.name_fr || t.name;
            description = t.description_fr || t.description;
            benefits = t.benefits_fr?.length > 0 ? t.benefits_fr : t.benefits;
        } else if (locale === 'it') {
            name = t.name_it || t.name;
            description = t.description_it || t.description;
            benefits = t.benefits_it?.length > 0 ? t.benefits_it : t.benefits;
        }

        return {
            ...t,
            name,
            description,
            benefits,
            price: t.price ? Number(t.price) : null,
        };
    });
}

interface TreatmentsPageProps {
    params: Promise<{ locale: string }>;
}

export default async function TreatmentsPage({ params }: TreatmentsPageProps) {
    const { locale } = await params;
    const t = await getTranslations("TreatmentsPage");
    const treatments = await getTreatments(locale);

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 overflow-x-hidden selection:bg-slate-900 selection:text-white">
            <Header />

            {/* Architectural Hero */}
            <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto text-center relative z-10">
                <span className="inline-block mb-6 px-4 py-1.5 border border-slate-200 dark:border-slate-800 rounded-full text-xs uppercase tracking-[0.2em] text-slate-500">
                    Excellence in Dentistry
                </span>
                <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-slate-900 dark:text-white mb-8 tracking-tight leading-[0.9]">
                    {t("hero.title")}
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
                    {t("hero.description")}
                </p>

                {/* Decorative Line */}
                <div className="w-px h-24 bg-gradient-to-b from-slate-200 to-transparent mx-auto mt-12 dark:from-slate-800" />
            </section>

            <TreatmentsSection treatments={treatments} />

            <section className="py-32 px-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="font-serif text-3xl md:text-4xl text-slate-900 dark:text-white mb-6">
                        {t("technology.title")}
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-lg font-light">
                        {t("technology.description")}
                    </p>
                </div>
            </section>

            <Footer />
        </main>
    );
}
