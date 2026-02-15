"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TreatmentMosaicItem } from "./TreatmentMosaicItem";

interface Service {
    id: string;
    name: string;
    description?: string | null;
    benefits: string[];
    duration: number;
    price: number | null;
    specialty: { name: string };
}

interface TreatmentsMosaicLayoutProps {
    treatments: Service[];
    onSelect: (treatment: Service) => void;
}

export function TreatmentsMosaicLayout({ treatments, onSelect }: TreatmentsMosaicLayoutProps) {
    return (
        <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-[minmax(280px,auto)]"
        >
            <AnimatePresence mode="popLayout">
                {treatments.map((treatment, index) => {
                    // Algorithmic layout generation
                    // Create a repeating pattern of spans: 1, 1, 2, 1, 2, 1, 1...
                    // This is pseudo-random but deterministic based on index
                    const pattern = [1, 1, 2, 1, 2, 1, 1, 2];
                    const span = pattern[index % pattern.length];

                    // Shape variation
                    const shape = index % 4;

                    return (
                        <TreatmentMosaicItem
                            key={treatment.id}
                            id={treatment.id}
                            index={index}
                            title={treatment.name}
                            description={treatment.description || undefined}
                            specialty={treatment.specialty.name}
                            onClick={() => onSelect(treatment)}
                            span={span}
                            shape={shape}
                        />
                    );
                })}
            </AnimatePresence>
        </motion.div>
    );
}
