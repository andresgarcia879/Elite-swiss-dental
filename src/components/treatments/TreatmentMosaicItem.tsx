"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface TreatmentMosaicItemProps {
    id: string;
    index: number;
    title: string;
    description?: string;
    specialty: string;
    onClick: () => void;
    span?: number; // 1 or 2
    shape?: number; // 0 to 3
}

export function TreatmentMosaicItem({
    id,
    index,
    title,
    description,
    specialty,
    onClick,
    span = 1,
    shape = 0,
}: TreatmentMosaicItemProps) {
    const number = (index + 1).toString().padStart(2, "0");

    // Define geometric clip-paths
    const shapes = [
        // 0: Slight top-right cut
        "polygon(0% 0%, 85% 0%, 100% 15%, 100% 100%, 0% 100%)",
        // 1: Slight bottom-left cut
        "polygon(0% 0%, 100% 0%, 100% 100%, 15% 100%, 0% 85%)",
        // 2: Hex-ish / Chamfered corners
        "polygon(5% 0%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0% 95%, 0% 5%)",
        // 3: Rectangular with single deep cut
        "polygon(0% 0%, 100% 0%, 100% 80%, 80% 100%, 0% 100%)",
    ];

    const currentShape = shapes[shape % shapes.length];

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{
                scale: 1.02,
                zIndex: 10,
                transition: { duration: 0.3, ease: "easeOut" }
            }}
            onClick={onClick}
            className={cn(
                "group cursor-pointer relative bg-white dark:bg-slate-900 overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-500",
                "min-h-[280px] p-8 flex flex-col justify-between",
                span === 2 ? "md:col-span-2" : "md:col-span-1"
            )}
            style={{
                clipPath: currentShape,
            }}
        >
            {/* Subtle Texture Overlay */}
            <div className="absolute inset-0 bg-slate-50/50 dark:bg-slate-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 flex justify-between items-start">
                <span className="font-mono text-xs text-slate-400 uppercase tracking-widest">
                    {specialty}
                </span>
                <span className="font-serif text-4xl text-slate-100 dark:text-slate-800 font-bold group-hover:text-slate-200 dark:group-hover:text-slate-700 transition-colors duration-500">
                    {number}
                </span>
            </div>

            <div className="relative z-10 mt-auto">
                <h3 className={cn(
                    "font-serif text-slate-900 dark:text-white mb-3 group-hover:translate-x-1 transition-transform duration-300",
                    span === 2 ? "text-3xl md:text-4xl" : "text-2xl"
                )}>
                    {title}
                </h3>
                {description && (
                    <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 mb-6 max-w-[90%] group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                        {description}
                    </p>
                )}

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                        Discover
                    </span>
                    <ArrowUpRight className="w-3 h-3 text-slate-900 dark:text-white" />
                </div>
            </div>
        </motion.div>
    );
}
