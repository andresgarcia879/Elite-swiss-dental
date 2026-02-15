"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Service {
    id: string;
    name: string;
    description?: string | null;
    benefits: string[];
    duration: number;
    price: number | null;
    specialty?: { name: string };
}

interface TreatmentPanelProps {
    treatment: Service | null;
    onClose: () => void;
}

export function TreatmentPanel({ treatment, onClose }: TreatmentPanelProps) {
    if (!treatment) return null;

    // Separate benefits logic - ensure it's an array
    const benefitsList = Array.isArray(treatment.benefits)
        ? treatment.benefits
        : typeof treatment.benefits === 'string'
            ? (treatment.benefits as string).split(',').map((s: string) => s.trim())
            : [];

    return (
        <AnimatePresence>
            {treatment && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
                    />

                    {/* Panel */}
                    <motion.div
                        key="panel"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 right-0 w-full md:w-[600px] bg-white dark:bg-slate-950 shadow-2xl z-50 overflow-y-auto border-l border-slate-100 dark:border-slate-800"
                    >
                        <div className="p-8 md:p-12 min-h-full flex flex-col relative">
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
                            >
                                <X className="w-6 h-6 text-slate-400 hover:text-slate-900 dark:hover:text-white" />
                            </button>

                            <div className="mt-8 mb-8">
                                <span className="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 rounded-full text-xs font-medium uppercase tracking-wider mb-6">
                                    {treatment.specialty?.name || "General Dentistry"}
                                </span>
                                <h2 className="font-serif text-4xl md:text-5xl text-slate-900 dark:text-white mb-6 leading-tight">
                                    {treatment.name}
                                </h2>
                                <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400 border-y border-slate-100 dark:border-slate-800 py-4">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        <span>{treatment.duration} min</span>
                                    </div>
                                    {treatment.price && (
                                        <div className="font-medium text-slate-900 dark:text-white">
                                            CHF {Number(treatment.price).toFixed(0)}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="prose prose-slate dark:prose-invert max-w-none mb-10">
                                <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                                    {treatment.description || "Detailed description coming soon."}
                                </p>
                            </div>

                            {benefitsList.length > 0 && (
                                <div className="mb-12">
                                    <h3 className="font-serif text-xl mb-4 text-slate-900 dark:text-white">Key Benefits</h3>
                                    <ul className="space-y-3">
                                        {benefitsList.map((benefit, i) => (
                                            <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                                                <div className="mt-1 w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                                                    <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                                                </div>
                                                <span>{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="mt-auto">
                                <Button asChild className="w-full h-14 text-lg bg-slate-900 hover:bg-slate-800 text-white rounded-none flex items-center justify-between px-8 group">
                                    <Link href="/booking">
                                        <span>Book Consultation</span>
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </Button>
                                <p className="text-center text-xs text-slate-400 mt-4">
                                    Secure online booking • Free cancellation up to 24h
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
