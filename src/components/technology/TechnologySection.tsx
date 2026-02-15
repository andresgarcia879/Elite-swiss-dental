"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
    Scan,
    Monitor,
    Printer,
    Cpu,
    Syringe,
    ShieldCheck
} from "lucide-react";

export default function TechnologySection() {
    const t = useTranslations("TechnologyPage");

    const technologies = [
        {
            id: "cbct",
            icon: Scan,
            translationKey: "cbct"
        },
        {
            id: "scanner",
            icon: Monitor,
            translationKey: "scanner"
        },
        {
            id: "cadcam",
            icon: Printer,
            translationKey: "cadcam"
        },
        {
            id: "guided",
            icon: Cpu,
            translationKey: "guided"
        },
        {
            id: "smile",
            icon: Syringe, // Using Syringe as placeholder for aesthetic/injection, or maybe Sparkles/Smile
            translationKey: "smile"
        },
        {
            id: "sterilization",
            icon: ShieldCheck,
            translationKey: "sterilization"
        }
    ];

    return (
        <section className="relative py-32 bg-slate-50 overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/60 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100/60 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Hero / Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-24 max-w-4xl mx-auto"
                >
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="h-[1px] w-12 bg-blue-500/50" />
                        <span className="text-blue-600 uppercase tracking-[0.2em] text-sm font-medium">Swiss Precision</span>
                        <div className="h-[1px] w-12 bg-blue-500/50" />
                    </div>
                    <h1 className="font-serif text-5xl md:text-6xl text-slate-900 mb-8 leading-tight">
                        {t("hero.title")}
                    </h1>
                    <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-light">
                        {t("hero.subtitle")}
                    </p>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {technologies.map((tech, index) => (
                        <motion.div
                            key={tech.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative"
                        >
                            {/* Card Container */}
                            <div className="relative h-full bg-white border border-slate-200 p-8 shadow-sm hover:shadow-xl transition-all duration-500 group-hover:-translate-y-2 group-hover:border-blue-500/30 overflow-hidden
                                [clip-path:polygon(0%_0%,100%_0%,100%_calc(100%-_20px),calc(100%-_20px)_100%,0%_100%)]">

                                {/* Hover Glow Effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Icon */}
                                <div className="relative z-10 mb-6">
                                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 group-hover:text-blue-700 group-hover:bg-blue-100 group-hover:border-blue-200 transition-all duration-300">
                                        <tech.icon className="w-7 h-7" strokeWidth={1.5} />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="relative z-10">
                                    <h3 className="text-xl font-serif text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">
                                        {t(`grid.${tech.translationKey}.title`)}
                                    </h3>
                                    <p className="text-slate-600 text-sm leading-relaxed group-hover:text-slate-700 transition-colors">
                                        {t(`grid.${tech.translationKey}.description`)}
                                    </p>
                                </div>

                                {/* Decorative Lines */}
                                <div className="absolute top-0 right-0 w-20 h-[1px] bg-gradient-to-l from-slate-200 to-transparent" />
                                <div className="absolute bottom-0 left-0 w-20 h-[1px] bg-gradient-to-r from-slate-200 to-transparent" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
