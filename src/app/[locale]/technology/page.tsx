"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function TechnologyPage() {
    return (
        <main className="min-h-screen bg-background">
            <Header />
            <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto text-center">
                <h1 className="font-serif text-5xl text-foreground mb-8">Cutting-Edge Technology</h1>
                <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
                    We invest in the most advanced dental technologies to ensure precise diagnostics, minimally invasive treatments, and exceptional results.
                </p>
            </section>
            <Footer />
        </main>
    );
}
