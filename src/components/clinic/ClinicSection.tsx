"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { MapPin, Clock, Navigation, Star, Shield, Zap, Sparkles } from "lucide-react";

export default function ClinicSection() {
    const t = useTranslations("ClinicPage");
    const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2701.796346261543!2d8.53835697669528!3d47.37535997108931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47900a00eb056723%3A0x74e2d83b5275817d!2sBahnhofstrasse%2C%20Z%C3%BCrich!5e0!3m2!1sen!2sch!4v1707920000000!5m2!1sen!2sch";

    const features = [
        { icon: Star, key: "concierge" },
        { icon: Shield, key: "privacy" },
        { icon: Zap, key: "technology" },
    ];

    const galleryImages = [
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2000&auto=format&fit=crop", // Luxury Hallway/Waiting Area
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop", // Clean waiting room (Restored valid one)
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2000&auto=format&fit=crop", // Medical/Dental Detail
        "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=2000&auto=format&fit=crop"  // Dental Chair/Equipment (New valid one)
    ];

    return (
        <div className="bg-[#FDFCFB] text-slate-900 overflow-hidden">

            {/* --- HERO SECTION --- */}
            <section className="relative min-h-[90vh] flex items-center pt-32 pb-20">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 -skew-x-12 origin-top transform translate-x-1/3 -z-10" />

                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-8"
                        >
                            <div className="flex items-center gap-3">
                                <div className="h-[2px] w-12 bg-blue-900" />
                                <span className="text-blue-900 uppercase tracking-[0.3em] text-sm font-bold">Zurich • Bahnhofstrasse</span>
                            </div>
                            <h1 className="font-serif text-6xl lg:text-7xl text-slate-900 leading-[1.1]">
                                {t("hero.title")}
                            </h1>
                            <p className="text-xl text-slate-600 font-light leading-relaxed max-w-lg whitespace-pre-line">
                                {t("hero.subtitle")}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="relative h-[600px] w-full rounded-[2rem] overflow-hidden shadow-2xl"
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2000&auto=format&fit=crop"
                                alt="Swiss Dental Clinic Interior"
                                fill
                                className="object-cover"
                                priority
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- PHILOSOPHY SECTION --- */}
            <section className="py-32 bg-white relative">
                <div className="container mx-auto px-6 max-w-5xl text-center space-y-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <Sparkles className="w-12 h-12 text-blue-900 mx-auto mb-8 opacity-20" />
                        <h2 className="font-serif text-4xl md:text-5xl text-slate-900 mb-8 leading-tight">
                            {t("philosophy.title")}
                        </h2>
                        <p className="text-2xl text-slate-500 font-light leading-relaxed whitespace-pre-line">
                            {t("philosophy.description")}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* --- FEATURES GRID --- */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((item, index) => {
                            const Icon = item.icon;
                            // Organic "undefined" shapes using asymmetric border-radius
                            const shapes = [
                                "40px 100px 40px 100px / 100px 40px 100px 40px", // Shape 1
                                "100px 40px 100px 40px / 40px 100px 40px 100px", // Shape 2
                                "60px 120px 40px 90px / 100px 50px 100px 50px"   // Shape 3
                            ];

                            return (
                                <motion.div
                                    key={item.key}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.8,
                                        delay: index * 0.2,
                                        type: "spring",
                                        stiffness: 50,
                                        damping: 20
                                    }}
                                    style={{ borderRadius: shapes[index % shapes.length] }}
                                    className="bg-white p-12 shadow-md border border-slate-100 hover:shadow-2xl transition-all relative overflow-hidden group"
                                >
                                    {/* Subtle internal gradient blob for depth */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full blur-3xl -z-10 group-hover:bg-blue-100/50 transition-colors" />

                                    <div className="w-16 h-16 bg-[#F5F8FF] rounded-2xl rotate-3 flex items-center justify-center text-blue-900 mb-8 group-hover:rotate-6 transition-transform duration-500">
                                        <Icon className="w-7 h-7" />
                                    </div>
                                    <h3 className="font-serif text-2xl text-slate-900 mb-4">{t(`features.${item.key}.title`)}</h3>
                                    <p className="text-slate-500 leading-relaxed whitespace-pre-line">
                                        {t(`features.${item.key}.description`)}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* --- GALLERY SECTION --- */}
            <section className="py-32 bg-[#FDFCFB]">
                <div className="container mx-auto px-6">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="font-serif text-4xl text-center mb-16"
                    >
                        {t("gallery.title")}
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {galleryImages.map((src, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className={`relative h-[400px] rounded-2xl overflow-hidden shadow-lg ${index % 2 === 0 ? 'md:translate-y-12' : ''}`}
                            >
                                <Image
                                    src={src}
                                    alt="Gallery Image"
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- LOCATION (Separated Map) --- */}
            <section className="py-32 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        {/* Info Column */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-10"
                        >
                            <div>
                                <h2 className="font-serif text-4xl md:text-5xl text-slate-900 mb-6">{t("location.title")}</h2>
                                <p className="text-slate-500 text-lg whitespace-pre-line">
                                    {t("location.description")}
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                                    <div className="flex gap-4">
                                        <MapPin className="text-blue-900 mt-1" />
                                        <div>
                                            <h4 className="font-bold text-slate-900 mb-1">{t("address.title")}</h4>
                                            <p className="text-slate-600 whitespace-pre-line">{t("address.details")}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                                    <div className="flex gap-4">
                                        <Clock className="text-blue-900 mt-1" />
                                        <div>
                                            <h4 className="font-bold text-slate-900 mb-1">{t("hours.title")}</h4>
                                            <p className="text-slate-600 whitespace-pre-line">{t("hours.details")}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <motion.a
                                href="https://maps.google.com"
                                target="_blank"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-flex items-center gap-3 px-8 py-4 bg-blue-900 text-white rounded-full font-medium hover:bg-blue-800 transition-colors shadow-lg"
                            >
                                <Navigation className="w-5 h-5" />
                                <span>Get Directions</span>
                            </motion.a>
                        </motion.div>

                        {/* Map Column */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="h-[600px] w-full bg-slate-100 rounded-[2.5rem] overflow-hidden shadow-2xl relative"
                        >
                            <iframe
                                src={mapUrl}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="grayscale hover:grayscale-0 transition-all duration-700"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

        </div>
    );
}
