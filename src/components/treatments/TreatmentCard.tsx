"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface TreatmentCardProps {
    id: string;
    index: number;
    title: string;
    description?: string;
    onClick: () => void;
}

export function TreatmentCard({
    id,
    index,
    title,
    description,
    onClick,
}: TreatmentCardProps) {
    // Format index as 01, 02, etc.
    const number = (index + 1).toString().padStart(2, "0");

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, rotate: 0.5 }}
            onClick={onClick}
            className="group cursor-pointer relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 h-[320px] flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
            // Use subtle clip-path for architectural feel - asymmetrical corner
            style={{
                clipPath: "polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)",
            }}
        >
            {/* Background Number */}
            <span className="absolute -top-4 -right-4 text-[120px] font-serif font-bold text-slate-50 dark:text-slate-800/50 leading-none select-none -z-0 group-hover:text-slate-100 dark:group-hover:text-slate-800 transition-colors duration-500">
                {number}
            </span>

            <div className="relative z-10">
                <div className="w-12 h-[1px] bg-slate-900 dark:bg-white mb-6 transform origin-left group-hover:scale-x-150 transition-transform duration-500" />
                <h3 className="font-serif text-2xl text-slate-900 dark:text-white mb-3 max-w-[80%]">
                    {title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-3 leading-relaxed max-w-[90%]">
                    {description || "Experience precision dental care with our expert team."}
                </p>
            </div>

            <div className="relative z-10 flex justify-between items-center mt-auto pt-6 border-t border-slate-100 dark:border-slate-800/50">
                <span className="text-xs uppercase tracking-widest text-slate-400 font-medium group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                    View Details
                </span>
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-slate-900 transition-colors duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                </div>
            </div>
        </motion.div>
    );
}
