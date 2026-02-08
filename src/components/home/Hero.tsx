"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlayCircle, ArrowRight, Star } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.fromTo(
                ".hero-text-element",
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" }
            )
                .fromTo(
                    imageRef.current,
                    { scale: 0.9, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out" },
                    "-=0.8"
                );
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef} className="relative pt-32 pb-20 px-6 lg:px-12 min-h-screen flex flex-col lg:flex-row items-center justify-center max-w-7xl mx-auto gap-12 lg:gap-20 overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-gold/5 rounded-full blur-3xl" />
            </div>

            <div className="flex-1 flex flex-col gap-8 z-10 lg:pl-10" ref={textRef}>
                <div className="hero-text-element inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-border w-fit shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-gold"></span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Excellence in Zurich</span>
                </div>

                <div className="flex flex-col gap-4">
                    <h1 className="hero-text-element font-serif text-5xl lg:text-7xl font-medium text-foreground leading-[1.1]">
                        Precision. Elegance.<br />
                        <span className="italic text-primary">Your Smile.</span>
                    </h1>
                    <p className="hero-text-element text-lg text-muted-foreground max-w-md font-light leading-relaxed">
                        Experience world-class Swiss dental care where artistry meets medical precision in an atmosphere of absolute tranquility.
                    </p>
                </div>

                <div className="hero-text-element flex flex-col sm:flex-row gap-4 mt-4">
                    <Button className="h-14 px-8 rounded-full text-base gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30" size="lg">
                        Book Your Visit <ArrowRight className="size-4" />
                    </Button>
                    <Button variant="outline" className="h-14 px-8 rounded-full text-base gap-2 bg-white/50 backdrop-blur-sm hover:bg-white/80" size="lg">
                        <PlayCircle className="size-5 text-muted-foreground" /> Clinic Tour
                    </Button>
                </div>

                <div className="hero-text-element flex items-center gap-6 mt-8 pt-8 border-t border-border/60">
                    <div className="flex -space-x-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-slate-200 overflow-hidden">
                                <Image
                                    src={`https://lh3.googleusercontent.com/aida-public/AB6AXuDA7H9vF_Z-bI_nIluexe8zeVRjSJx6e_EXU3Vd1dDK_r8fx6enBUzY4xT9YuLmog69pjzFtzh6BWIziIUSMZAI_gtw5L2AMAa1OCGcei5HSKEt47LXdNNGwusqliWvkrJ3FVf5JdoSHV8vItKYrrkfx8ALgstTO12xq9sOPa2Z8f-SQgvQEloQlp9xZpiNPepKOvtWuZaQmlV6vst6Ur9mKsAmbLd0eSU8kOKdHlPLhdFkJ8Pz33wghJDTNTEU74bHorZTrClXGa84`}
                                    alt="Patient"
                                    width={40}
                                    height={40}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        ))}
                        <div className="w-10 h-10 rounded-full border-2 border-background bg-slate-100 flex items-center justify-center text-xs font-bold text-muted-foreground">+2k</div>
                    </div>
                    <div>
                        <div className="flex text-gold text-sm">
                            {[...Array(5)].map((_, i) => <Star key={i} className="size-4 fill-current" />)}
                        </div>
                        <p className="text-xs text-muted-foreground font-medium">Trusted by Zurich's Elite</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 relative w-full h-[500px] lg:h-[600px] flex items-center justify-center" ref={imageRef}>
                <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl transform rotate-3 hover:rotate-2 transition-transform duration-700">
                    <Image
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuArhKFLeaa9xzOXbf4wHzIuOhKqQ4Lnh5rW-m1q4ANyWRljkYmpRoG_RgD6fIxeJ6m080gNJrv9cjVg0GfnNStEaP3HbyqGBK841sml9xtsh2zvewTsxX0le9YcM5njFyJKSVJ3j3k7v7QzQyiatUnr1Rj-iAjS5qZTB-P9iBO_qDaM63kg4QiHfp5119njGqawvzhM06ZiKVVDM0Z7Cy6Lz-sUsTAXCgvGR0LkbgjP5zG3wnJ5ngaK79yz-vV3ddsZmuGBx2_JnMzK"
                        alt="Dental Clinic Interior"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </div>
        </section>
    );
};
