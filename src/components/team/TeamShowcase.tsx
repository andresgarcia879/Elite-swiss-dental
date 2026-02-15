"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { X, Calendar, Star, Award, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Doctor {
    id: string;
    fullName: string;
    title: string;
    specialty: {
        name: string;
    };
    education: string;
    experience: number;
    bio: string;
    imageUrl: string;
}

interface Specialty {
    id: string;
    name: string;
}

interface TeamShowcaseProps {
    doctors: Doctor[];
    specialties: Specialty[];
}

const TeamShowcase = ({ doctors, specialties }: TeamShowcaseProps) => {
    const t = useTranslations("Team");
    const [activeMemberId, setActiveMemberId] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState<string>("all");

    // Categories
    const categories = [
        { id: "all", label: t("filters.all") },
        ...specialties.map(s => ({ id: s.name, label: s.name }))
    ];

    // Filter members
    const filteredMembers = doctors.filter(doctor => {
        if (activeCategory === "all") return true;
        return doctor.specialty.name === activeCategory;
    });

    const activeMember = doctors.find(d => d.id === activeMemberId);

    return (
        <section className="relative min-h-screen w-full bg-slate-50 overflow-hidden py-10 md:py-20">

            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.03]"
                    style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            </div>

            <div className="container mx-auto px-4 relative z-10">

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-3 mb-10 md:mb-16">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-6 py-2.5 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${activeCategory === cat.id
                                ? "bg-slate-900 text-white shadow-lg scale-105"
                                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Team Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8 max-w-7xl mx-auto"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredMembers.map((doctor, index) => (
                            <motion.div
                                key={doctor.id}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className={`relative group cursor-pointer ${
                                    // "Scattered" look: vertical offset for even/odd columns
                                    index % 2 === 0 ? "md:translate-y-4" : "md:-translate-y-4"
                                    }`}
                                onClick={() => setActiveMemberId(doctor.id)}
                            >
                                <div className="relative aspect-square rounded-3xl overflow-hidden shadow-lg border-4 border-white group-hover:border-gold/50 transition-all duration-300">
                                    <Image
                                        src={doctor.imageUrl}
                                        alt={doctor.fullName}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                        <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                            <p className="font-bold text-sm">{doctor.fullName}</p>
                                            <p className="text-xs text-slate-200">{doctor.title}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Expanded Card Modal */}
            <AnimatePresence>
                {activeMember && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setActiveMemberId(null)}
                        />

                        <motion.div
                            layoutId={`card-${activeMember.id}`}
                            className="bg-white rounded-[2rem] overflow-hidden shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col md:flex-row relative z-50 transform-gpu"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative w-full md:w-2/5 h-64 md:h-full shrink-0">
                                <Image
                                    src={activeMember.imageUrl}
                                    alt={activeMember.fullName}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute top-4 right-4 md:hidden text-white bg-black/20 backdrop-blur-md rounded-full"
                                    onClick={() => setActiveMemberId(null)}
                                >
                                    <X className="size-6" />
                                </Button>
                            </div>

                            <div className="flex-1 p-6 md:p-10 flex flex-col h-full overflow-y-auto">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wide uppercase mb-3">
                                            {activeMember.specialty.name}
                                        </span>
                                        <h3 className="text-3xl md:text-4xl font-serif font-medium text-slate-900 mb-1">
                                            {activeMember.fullName}
                                        </h3>
                                        <p className="text-lg text-slate-500 font-light">{activeMember.title}</p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="hidden md:flex hover:bg-slate-100 rounded-full -mt-2 -mr-2"
                                        onClick={() => setActiveMemberId(null)}
                                    >
                                        <X className="size-6 text-slate-400" />
                                    </Button>
                                </div>

                                <div className="grid grid-cols-3 gap-4 py-8 border-y border-slate-100 my-8">
                                    <div className="text-center">
                                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-2 text-primary">
                                            <Award className="size-5" />
                                        </div>
                                        <div className="text-xl font-bold text-slate-900">{activeMember.experience}</div>
                                        <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">{t("profile.experience")}</div>
                                    </div>
                                    <div className="text-center border-l border-slate-100">
                                        <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-2 text-green-600">
                                            <Star className="size-5" />
                                        </div>
                                        <div className="text-xl font-bold text-slate-900">5.0</div>
                                        <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">{t("profile.rating")}</div>
                                    </div>
                                    <div className="text-center border-l border-slate-100">
                                        <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center mx-auto mb-2 text-purple-600">
                                            <GraduationCap className="size-5" />
                                        </div>
                                        <div className="text-xl font-bold text-slate-900">2k+</div>
                                        <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">{t("profile.patients")}</div>
                                    </div>
                                </div>

                                <div className="space-y-6 flex-1">
                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">{t("profile.biography")}</h4>
                                        <p className="text-base text-slate-600 leading-relaxed font-light">
                                            {activeMember.bio}
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">{t("profile.education")}</h4>
                                        <p className="text-sm text-slate-700 font-medium">
                                            {activeMember.education}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-slate-100">
                                    <Button className="w-full h-12 md:h-14 text-lg bg-primary hover:bg-primary/90 text-white rounded-xl shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-[0.98]">
                                        <Calendar className="mr-2 size-5" />
                                        {t("profile.book")}
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default TeamShowcase;
