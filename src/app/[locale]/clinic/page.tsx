"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ClinicSection from "@/components/clinic/ClinicSection";

export default function ClinicPage() {
    return (
        <main className="min-h-screen bg-background">
            <Header />
            <ClinicSection />
            <Footer />
        </main>
    );
}
