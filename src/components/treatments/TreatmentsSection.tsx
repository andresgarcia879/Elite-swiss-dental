"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TreatmentsFilter } from "./TreatmentsFilter";
import { TreatmentCard } from "./TreatmentCard";
import { TreatmentPanel } from "./TreatmentPanel";

interface Service {
    id: string;
    name: string;
    description?: string | null;
    benefits: string[];
    duration: number;
    price: number | null;
    specialty: { name: string };
}

interface TreatmentsSectionProps {
    treatments: Service[];
}

export function TreatmentsSection({ treatments }: TreatmentsSectionProps) {
    // Extract unique categories
    const categories = ["All", ...Array.from(new Set(treatments.map((t) => t.specialty.name)))];
    const [activeCategory, setActiveCategory] = React.useState("All");
    const [selectedTreatment, setSelectedTreatment] = React.useState<Service | null>(null);

    // Filter treatments based on active category
    const filteredTreatments = activeCategory === "All"
        ? treatments
        : treatments.filter((t) => t.specialty.name === activeCategory);

    return (
        <section className="py-12 md:py-24 max-w-7xl mx-auto px-6">
            <TreatmentsFilter
                categories={categories}
                activeCategory={activeCategory}
                onSelectCategory={setActiveCategory}
            />

            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
                <AnimatePresence mode="popLayout">
                    {filteredTreatments.map((treatment, index) => (
                        <TreatmentCard
                            key={treatment.id}
                            id={treatment.id}
                            index={index}
                            title={treatment.name}
                            description={treatment.description || undefined}
                            onClick={() => setSelectedTreatment(treatment)}
                        />
                    ))}
                </AnimatePresence>
            </motion.div>

            <TreatmentPanel
                treatment={selectedTreatment}
                onClose={() => setSelectedTreatment(null)}
            />
        </section>
    );
}
