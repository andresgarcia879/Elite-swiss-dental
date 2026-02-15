"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TreatmentsFilterProps {
    categories: string[];
    activeCategory: string;
    onSelectCategory: (category: string) => void;
}

export function TreatmentsFilter({
    categories,
    activeCategory,
    onSelectCategory,
}: TreatmentsFilterProps) {
    return (
        <div className="flex justify-center mb-16">
            <div className="inline-flex bg-slate-100 dark:bg-slate-800 p-1 rounded-full relative">
                {categories.map((category) => {
                    const isActive = activeCategory === category;
                    return (
                        <button
                            key={category}
                            onClick={() => onSelectCategory(category)}
                            className={cn(
                                "relative px-6 py-2 rounded-full text-sm font-medium transition-colors z-10",
                                isActive
                                    ? "text-slate-900 dark:text-white"
                                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                            )}
                        >
                            {category}
                            {isActive && (
                                <motion.div
                                    layoutId="activeFilter"
                                    className="absolute inset-0 bg-white dark:bg-slate-700 rounded-full shadow-sm -z-10"
                                    transition={{
                                        type: "spring",
                                        stiffness: 500,
                                        damping: 30,
                                    }}
                                />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
