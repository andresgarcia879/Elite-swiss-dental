"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { TeamShowcase } from "@/components/team/TeamShowcase";
import { useTranslations } from "next-intl";

export default function TeamPage() {
    const t = useTranslations("Team");

    return (
        <main className="min-h-screen bg-background">
            <Header />
            <section className="pt-40 pb-10 px-6 max-w-7xl mx-auto text-center">
                <h1 className="font-serif text-5xl md:text-6xl text-foreground mb-6">{t("title")}</h1>
                <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                    {t("subtitle")}
                </p>
            </section>

            <TeamShowcase />

            <Footer />
        </main>
    );
}
