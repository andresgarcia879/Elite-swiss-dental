import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TeamShowcase from "@/components/team/TeamShowcase";
import { getTranslations } from "next-intl/server";
import prisma from "@/lib/db";

async function getTeamData() {
    const doctors = await prisma.doctor.findMany({
        where: { isActive: true },
        include: { specialty: true },
        orderBy: { experience: 'desc' }
    });

    const specialties = await prisma.specialty.findMany({
        orderBy: { name: 'asc' }
    });

    return { doctors, specialties };
}

export default async function TeamPage() {
    const t = await getTranslations("Team");
    const { doctors, specialties } = await getTeamData();

    return (
        <main className="min-h-screen bg-background">
            <Header />
            <section className="pt-40 pb-10 px-6 max-w-7xl mx-auto text-center">
                <h1 className="font-serif text-5xl md:text-6xl text-foreground mb-6">{t("title")}</h1>
                <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                    {t("subtitle")}
                </p>
            </section>

            <TeamShowcase doctors={doctors} specialties={specialties} />

            <Footer />
        </main>
    );
}
