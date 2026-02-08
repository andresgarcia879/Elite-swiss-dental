"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { GraduationCap, Users, Star, Clock, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const memberIds = ["weber", "rossi", "bianchi", "meier", "fischer"];
const categories = ["all", "implantology", "cosmetic", "orthodontics", "periodontics"];

export const TeamShowcase = () => {
    const t = useTranslations("Team");
    const [filter, setFilter] = useState("all");
    const [selectedMember, setSelectedMember] = useState<string | null>(null);

    const filteredMembers = memberIds.filter(id => {
        if (filter === "all") return true;
        return t(`members.${id}.category`) === filter;
    });

    return (
        <section className="py-20 px-6 max-w-7xl mx-auto">
            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-20">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={cn(
                            "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border border-transparent",
                            filter === cat
                                ? "bg-primary text-white shadow-lg shadow-primary/20"
                                : "bg-white dark:bg-card text-muted-foreground hover:bg-slate-50 border-input"
                        )}
                    >
                        {t(`filters.${cat}`)}
                    </button>
                ))}
            </div>

            {/* Scattered Grid Layout */}
            <div className="relative min-h-[600px] w-full flex items-center justify-center">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center w-full">
                    <AnimatePresence mode="popLayout">
                        {filteredMembers.map((id, index) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.4 }}
                                key={id}
                                className={cn(
                                    "relative group cursor-pointer",
                                    // Center item larger on large screens to mimic "solar system" center if implied, 
                                    // but simplified to grid for robustness.
                                    // Adding some varied sizes for "scattered" feel:
                                    index === 0 ? "lg:col-span-1 lg:row-span-1" : ""
                                )}
                                onClick={() => setSelectedMember(id)}
                            >
                                <div className={cn(
                                    "relative rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl",
                                    id === "weber" ? "w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 z-10" : "w-32 h-32 md:w-40 md:h-40"
                                )}>
                                    <Image
                                        src={t(`members.${id}.image`)}
                                        alt={t(`members.${id}.name`)}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white dark:bg-card px-4 py-1.5 rounded-full shadow-lg border border-border/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-20">
                                    <p className="font-serif text-sm font-bold text-foreground">{t(`members.${id}.name`)}</p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Detailed Side Sheet */}
            <Sheet open={!!selectedMember} onOpenChange={(open) => !open && setSelectedMember(null)}>
                <SheetContent side="right" className="w-full sm:w-[500px] overflow-y-auto p-0 border-l border-border/50 shadow-2xl">
                    {selectedMember && (
                        <div className="flex flex-col h-full bg-background">
                            <div className="relative h-80 w-full shrink-0">
                                <Image
                                    src={t(`members.${selectedMember}.image`)}
                                    alt={t(`members.${selectedMember}.name`)}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-90"></div>
                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="inline-block px-3 py-1 bg-primary/90 text-white text-xs font-bold uppercase tracking-wider rounded-md mb-2 backdrop-blur-sm">
                                        {t(`filters.${t(`members.${selectedMember}.category`)}`)}
                                    </div>
                                    <SheetTitle className="font-serif text-3xl md:text-4xl text-foreground mb-1">
                                        {t(`members.${selectedMember}.name`)}
                                    </SheetTitle>
                                    <p className="text-white/80 font-medium">{t(`members.${selectedMember}.role`)}</p>
                                </div>
                            </div>

                            <div className="px-6 py-8 flex-1 space-y-8">
                                {/* Stats */}
                                <div className="grid grid-cols-3 gap-4 border-b border-border/50 pb-8">
                                    <div className="text-center">
                                        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">{t("profile.experience")}</p>
                                        <p className="font-bold text-xl text-foreground">{t(`members.${selectedMember}.stats.years`)}</p>
                                    </div>
                                    <div className="text-center border-l border-border/50">
                                        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">{t("profile.patients")}</p>
                                        <p className="font-bold text-xl text-foreground">{t(`members.${selectedMember}.stats.patients`)}</p>
                                    </div>
                                    <div className="text-center border-l border-border/50">
                                        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">{t("profile.rating")}</p>
                                        <div className="flex items-center justify-center gap-1 font-bold text-xl text-foreground">
                                            {t(`members.${selectedMember}.stats.rating`)} <Star className="size-4 text-amber-400 fill-amber-400" />
                                        </div>
                                    </div>
                                </div>

                                {/* Bio */}
                                <div>
                                    <h4 className="flex items-center gap-2 font-serif text-xl mb-4 text-foreground">
                                        <Users className="size-5 text-primary" /> {t("profile.biography")}
                                    </h4>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {t(`members.${selectedMember}.bio`)}
                                    </p>
                                </div>

                                {/* Education */}
                                <div>
                                    <h4 className="flex items-center gap-2 font-serif text-xl mb-4 text-foreground">
                                        <GraduationCap className="size-5 text-primary" /> {t("profile.education")}
                                    </h4>
                                    <div className="bg-slate-50 dark:bg-card p-4 rounded-xl border border-border/50">
                                        <p className="text-sm font-medium text-foreground">{t(`members.${selectedMember}.education`)}</p>
                                    </div>
                                </div>

                                <Button className="w-full h-14 text-lg rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all font-bold" onClick={() => window.location.href = '/contact'}>
                                    <Calendar className="mr-2 size-5" />
                                    {t("profile.book")}
                                </Button>
                            </div>
                        </div>
                    )}
                </SheetContent>
            </Sheet>
        </section>
    );
};
