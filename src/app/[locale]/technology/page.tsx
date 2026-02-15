"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TechnologySection from "@/components/technology/TechnologySection";

import { useTranslations } from "next-intl";

export default function TechnologyPage() {
    return (
        <main className="min-h-screen bg-slate-950">
            <Header />
            <TechnologySection />
            <Footer />
        </main>
    );
}
