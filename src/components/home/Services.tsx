"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Diamond, Activity, Infinity as InfinityIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const services = [
    {
        icon: <Diamond className="size-8" />,
        title: "Cosmetic Dentistry",
        description: "Veneers, whitening, and smile makeovers designed for natural beauty using ultra-thin porcelain.",
        link: "#",
        color: "bg-blue-50 text-primary group-hover:bg-primary group-hover:text-white"
    },
    {
        icon: <Activity className="size-8" />,
        title: "Implantology",
        description: "State-of-the-art Swiss implants for lasting function and aesthetics, restoring your confidence completely.",
        link: "#",
        color: "bg-blue-50 text-primary group-hover:bg-primary group-hover:text-white"
    },
    {
        icon: <InfinityIcon className="size-8" />,
        title: "Orthodontics",
        description: "Invisible alignment solutions including Invisalign for discreet correction suitable for adults and teens.",
        link: "#",
        color: "bg-blue-50 text-primary group-hover:bg-primary group-hover:text-white"
    }
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
} as const;

export const Services = () => {
    return (
        <section className="py-24 px-6 relative overflow-hidden bg-background">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col items-center text-center gap-4 mb-20">
                    <h2 className="font-serif text-4xl lg:text-5xl text-foreground">Curated Treatments</h2>
                    <p className="text-muted-foreground max-w-2xl text-lg font-light">
                        We combine Swiss precision with artistic excellence to craft your perfect smile through our bespoke dental services.
                    </p>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 px-4"
                >
                    {services.map((service, index) => (
                        <motion.div variants={item} key={index} className="group relative">
                            <div className={cn("absolute inset-0 bg-white rounded-[2.5rem] transition-transform opacity-50 shadow-sm", index % 2 === 0 ? "rotate-2 group-hover:rotate-3" : "-rotate-1 group-hover:-rotate-2")}></div>
                            <div className="relative bg-white/80 backdrop-blur-md border border-white/60 p-8 rounded-[2.5rem] shadow-lg hover:shadow-xl transition-all duration-500 h-full flex flex-col gap-6 group-hover:-translate-y-2 dark:bg-card/50 dark:border-white/10">
                                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-2 transition-colors duration-300", service.color)}>
                                    {service.icon}
                                </div>
                                <div>
                                    <h3 className="font-serif text-2xl text-foreground mb-3">{service.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed mb-6">
                                        {service.description}
                                    </p>
                                    <Link href={service.link} className="inline-flex items-center text-sm font-bold text-primary hover:text-primary/80 tracking-wide uppercase transition-colors">
                                        Learn More <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
