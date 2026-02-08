"use client";

import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
    {
        name: "Isabelle Dubois",
        location: "Zurich, CH",
        text: "The attention to detail is unmatched. Truly a luxury experience from the moment you walk in. My veneers look incredibly natural.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAw0Kz2q8EOpkCOAs2lf14PoprfYLZkYxc8SFdCN5ILoVGuUDZOSbPX9yzXeHwxyScqHKjqZTBy2rCPF2KsTb7zutpos9kMAPHop5NT1UQYjWSD7KuaH7GpwojIrsJ0Snvf7fGqj2auPHWFyxWWE5AdWpolnN6MjFotdXScKObihvHmx3VWb88vFHAP39jslhz0g4yTzeznvrNBGSSf4t4_w7mutRDt8pwXQEB76X5RVO-4SVRA6lBhsHDQK37--6BdeXP5yvcPKjYD"
    },
    {
        name: "Mark Weber",
        location: "Geneva, CH",
        text: "I felt completely at ease. The anxiety-free dentistry option changed my life. The results are better than I imagined.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBK5ongQMhI69u3XtwtwouMZR016QeTD9o6ph2bKMBM0jLDi8S0M5YaG6vUhlKKC0aJB2QPvtR3zFVZ5FlkFClZdMCvoLWDqZSleqSpi62EakB1W4CQsMwvJABbzCSGzNIEd5Nrsiifqxr5zz1dEEfRGJWlbOPmu6IXrlHoQXipDdIKsF_ctDOYq4kEj9kQmDGYS7BKndyuL8eSmqX0rLUkbGzZ8mdo3ERTOBERFsVN_xLcXyxqoOHpPDA7qXIhcofymxqAmx4Jx-Kj"
    },
    {
        name: "Sarah Jenkins",
        location: "Basel, CH",
        text: "Professional, clean, and incredibly modern. The 3D imaging technology they used to explain my treatment was impressive.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-BHXsDnsvMn270cI_UywNmdH5ZzYxK0-za50Yxe4BZegMwct5db0bg2fDYOjXpRByAeFQ61UBByQUj0jj-fnn_Qq0cvDGctwUIKZEmyAwdUeF8SkVKI2kmtlH3jPK9kAMbmQr4_EAeIB3XtZPh1-vrWBi3AHggjj-qPnCknvhGUY-qXvyHJdwA3tVKWp2EfsHnxsB1qlEuDd9Z6mVG3C4fmHwJMH0l1sEOWUX_wmtMgIVT-iR99ksi5btxwGT8rV50BJzVa9xOq99"
    }
];

export const Testimonials = () => {
    return (
        <section className="py-24 px-6 relative bg-secondary/30">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <h2 className="font-serif text-4xl lg:text-5xl text-foreground mb-4">Patient Stories</h2>
                        <p className="text-muted-foreground max-w-lg text-lg font-light">
                            Real experiences from patients who entrusted us with their smiles.
                        </p>
                    </div>
                </div>

                <Carousel className="w-full">
                    <CarouselContent className="-ml-4">
                        {testimonials.map((t, i) => (
                            <CarouselItem key={i} className="pl-4 md:basis-1/2 lg:basis-1/3">
                                <div className="bg-card p-8 rounded-3xl shadow-sm border border-border hover:shadow-md transition-shadow h-full flex flex-col justify-between">
                                    <div>
                                        <div className="flex gap-1 text-gold mb-6">
                                            {[...Array(5)].map((_, i) => <Star key={i} className="size-4 fill-current" />)}
                                        </div>
                                        <p className="text-foreground/80 font-medium leading-relaxed mb-8 italic">"{t.text}"</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full overflow-hidden relative">
                                            <Image src={t.image} alt={t.name} fill className="object-cover" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-foreground">{t.name}</h4>
                                            <span className="text-sm text-muted-foreground">{t.location}</span>
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="flex justify-end gap-2 mt-8 md:absolute md:-top-24 md:right-0">
                        <CarouselPrevious className="relative static translate-y-0" />
                        <CarouselNext className="relative static translate-y-0" />
                    </div>
                </Carousel>
            </div>
        </section>
    );
};
