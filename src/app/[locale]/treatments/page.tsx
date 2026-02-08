"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Services } from "@/components/home/Services";

export default function TreatmentsPage() {
    return (
        <main className="min-h-screen bg-background">
            <Header />
            <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto text-center">
                <h1 className="font-serif text-5xl md:text-6xl text-foreground mb-6">World-Class Treatments</h1>
                <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                    Comprehensive dental solutions tailored to your unique needs, performed with Swiss precision and artistic excellence.
                </p>
            </section>

            <section className="px-6 pb-24 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {/* Cosmetic Dentistry */}
                    <div className="bg-card border border-border/50 rounded-3xl p-8 hover:shadow-lg transition-all duration-300">
                        <div className="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center mb-6">
                            <span className="text-2xl">✨</span>
                        </div>
                        <h3 className="font-serif text-3xl text-foreground mb-4">Cosmetic Dentistry</h3>
                        <p className="text-muted-foreground mb-6">Transform your smile with our aesthetic treatments designed for natural-looking results.</p>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-foreground/80">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5"></span>
                                <span><strong>Porcelain Veneers:</strong> Custom-made shells for a flawless smile.</span>
                            </li>
                            <li className="flex items-start gap-3 text-foreground/80">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5"></span>
                                <span><strong>Professional Whitening:</strong> Brighten your teeth safely and effectively.</span>
                            </li>
                            <li className="flex items-start gap-3 text-foreground/80">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5"></span>
                                <span><strong>Smile Makeover:</strong> A comprehensive plan to redesign your smile.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Implantology */}
                    <div className="bg-card border border-border/50 rounded-3xl p-8 hover:shadow-lg transition-all duration-300">
                        <div className="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center mb-6">
                            <span className="text-2xl">🦷</span>
                        </div>
                        <h3 className="font-serif text-3xl text-foreground mb-4">Implantology</h3>
                        <p className="text-muted-foreground mb-6">Restore function and confidence with state-of-the-art dental implants.</p>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-foreground/80">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5"></span>
                                <span><strong>Single Tooth Implants:</strong> The gold standard for replacing missing teeth.</span>
                            </li>
                            <li className="flex items-start gap-3 text-foreground/80">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5"></span>
                                <span><strong>All-on-4®:</strong> Full arch restoration for immediate function.</span>
                            </li>
                            <li className="flex items-start gap-3 text-foreground/80">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5"></span>
                                <span><strong>Bone Regeneration:</strong> Advanced procedures to build a solid foundation.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Orthodontics */}
                    <div className="bg-card border border-border/50 rounded-3xl p-8 hover:shadow-lg transition-all duration-300">
                        <div className="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center mb-6">
                            <span className="text-2xl">🔄</span>
                        </div>
                        <h3 className="font-serif text-3xl text-foreground mb-4">Orthodontics</h3>
                        <p className="text-muted-foreground mb-6">Align your teeth discreetly with modern orthodontic solutions.</p>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-foreground/80">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5"></span>
                                <span><strong>Invisalign®:</strong> Clear aligners for invisible teeth straightening.</span>
                            </li>
                            <li className="flex items-start gap-3 text-foreground/80">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5"></span>
                                <span><strong>Ceramic Braces:</strong> Aesthetic brackets that blend with your teeth.</span>
                            </li>
                        </ul>
                    </div>

                    {/* General & Preventive */}
                    <div className="bg-card border border-border/50 rounded-3xl p-8 hover:shadow-lg transition-all duration-300">
                        <div className="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center mb-6">
                            <span className="text-2xl">🛡️</span>
                        </div>
                        <h3 className="font-serif text-3xl text-foreground mb-4">General Care</h3>
                        <p className="text-muted-foreground mb-6">Maintain optimal oral health with our preventive services.</p>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-foreground/80">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5"></span>
                                <span><strong>Dental Hygiene:</strong> Thorough cleaning to prevent gum disease.</span>
                            </li>
                            <li className="flex items-start gap-3 text-foreground/80">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5"></span>
                                <span><strong>Root Canal Therapy:</strong> Pain-free treatment to save infected teeth.</span>
                            </li>
                            <li className="flex items-start gap-3 text-foreground/80">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5"></span>
                                <span><strong>Emergency Care:</strong> Immediate attention for urgent dental needs.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="py-20 px-6 bg-slate-50 dark:bg-slate-900/50">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="font-serif text-3xl text-foreground mb-6">Advanced Technology</h2>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                        Our clinic is equipped with the latest 3D imaging, laser dentistry, and digital impression systems to ensure the most accurate diagnoses and comfortable treatments available today.
                    </p>
                </div>
            </section>

            <Footer />
        </main>
    );
}
