"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BookingWizard from "@/components/booking/BookingWizard";
import { useTranslations } from "next-intl";
import { MapPin, Phone, Clock } from "lucide-react";
import { motion } from "framer-motion";

type Doctor = {
    id: string;
    fullName: string;
    title: string;
    imageUrl: string;
    specialty: { id: string; name: string; services: Service[] };
};

type Service = {
    id: string;
    name: string;
    duration: number;
    price: number;
    specialtyId: string;
};

type Specialty = {
    id: string;
    name: string;
    services: Service[];
};

interface ContactContentProps {
    doctors: Doctor[];
    specialties: Specialty[];
}

export default function ContactContent({ doctors, specialties }: ContactContentProps) {
    const t = useTranslations("ContactPage");

    return (
        <main className="min-h-screen bg-[#FDFCFB] text-slate-900">
            <Header />

            <div className="pt-32 pb-20 min-h-screen container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

                    {/* LEFT COLUMN: Editorial Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-5 space-y-12 lg:sticky lg:top-32 h-fit"
                    >
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-[1px] w-8 bg-blue-900" />
                                <span className="text-blue-900 uppercase tracking-[0.25em] text-xs font-bold">Contact</span>
                            </div>
                            <h1 className="font-serif text-5xl md:text-6xl text-slate-900 leading-[1.1] mb-6">
                                {t("title")}
                            </h1>
                            <p className="text-slate-500 text-lg font-light leading-relaxed whitespace-pre-line">
                                {t("subtitle")}
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="flex gap-6 items-start">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-900 shadow-sm border border-slate-100 flex-shrink-0">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div className="pt-2">
                                    <h3 className="font-serif text-xl text-slate-900 mb-2">{t("info.visit.title")}</h3>
                                    <p className="text-slate-500 font-light leading-relaxed">
                                        Bahnhofstrasse 12,<br />
                                        8001 Zurich,<br />
                                        Switzerland
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-6 items-start">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-900 shadow-sm border border-slate-100 flex-shrink-0">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div className="pt-2">
                                    <h3 className="font-serif text-xl text-slate-900 mb-2">{t("info.contact.title")}</h3>
                                    <p className="text-slate-500 font-light leading-relaxed">
                                        <a href="tel:+41441234567" className="hover:text-blue-900 transition-colors">+41 44 123 45 67</a><br />
                                        <a href="mailto:info@eliteswissdental.ch" className="hover:text-blue-900 transition-colors">info@eliteswissdental.ch</a>
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-6 items-start">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-900 shadow-sm border border-slate-100 flex-shrink-0">
                                    <Clock className="w-5 h-5" />
                                </div>
                                <div className="pt-2">
                                    <h3 className="font-serif text-xl text-slate-900 mb-2">{t("info.hours.title")}</h3>
                                    <p className="text-slate-500 font-light leading-relaxed">
                                        Mon-Fri: 08:00 - 19:00<br />
                                        Sat: 09:00 - 14:00<br />
                                        Sun: Closed
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT COLUMN: Booking Wizard */}
                    <div className="lg:col-span-7">
                        <BookingWizard initialDoctors={doctors} initialSpecialties={specialties} />
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
