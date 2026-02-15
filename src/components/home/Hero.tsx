"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlayCircle, ArrowRight, Star, CheckCircle } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export const Hero = () => {
    const t = useTranslations("Hero");
    const heroRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // Text Animations
            tl.fromTo(
                ".hero-text-element",
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out" }
            );

            // Image Animation (Scale + Fade)
            tl.fromTo(
                imageRef.current,
                { scale: 0.95, opacity: 0, clipPath: "circle(0% at 50% 50%)" },
                {
                    scale: 1,
                    opacity: 1,
                    clipPath: "circle(100% at 50% 50%)",
                    duration: 1.5,
                    ease: "expo.out",
                },
                "-=0.8"
            );

            // Floating Card Animation
            tl.fromTo(
                ".hero-floating-card",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
                "-=1"
            );
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={heroRef}
            className="relative pt-32 pb-32 px-6 lg:px-12 min-h-[95vh] flex flex-col lg:flex-row items-center justify-between max-w-full overflow-hidden bg-gradient-to-b from-slate-50 to-white"
        >
            {/* Wave Separator (Bottom) */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(113%+1.3px)] h-[100px] text-white fill-current">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
                </svg>
            </div>

            {/* Dynamic Backgrounds */}
            <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] opacity-60" />
                <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-gold/5 rounded-full blur-[80px] opacity-60" />
            </div>

            <div className="max-w-[1400px] mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 z-10">

                {/* Left Column: Text Content */}
                <div className="flex-1 flex flex-col gap-6 lg:gap-8 z-10 max-w-2xl" ref={textRef}>
                    {/* Badge */}
                    <div className="hero-text-element inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-white/40 backdrop-blur-md w-fit shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
                        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                            {t("badge")}
                        </span>
                    </div>

                    {/* Headline */}
                    <div className="flex flex-col">
                        <h1 className="hero-text-element font-serif text-4xl md:text-6xl lg:text-[5.5rem] font-medium text-slate-900 leading-[1.05] tracking-tight">
                            {t("title_part1")} <br />
                            {t("title_part2")} <br />
                            <span className="italic text-primary font-serif relative">
                                {t("title_part3")}
                                <svg className="absolute w-full h-3 -bottom-1 left-0 text-gold/30 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                                </svg>
                            </span>
                        </h1>
                    </div>

                    {/* Subtitle */}
                    <p className="hero-text-element text-lg md:text-xl text-slate-600 font-light leading-relaxed max-w-lg">
                        {t("subtitle")}
                    </p>

                    {/* Buttons */}
                    <div className="hero-text-element flex flex-col sm:flex-row gap-4 mt-2">
                        <Button
                            asChild
                            className="h-14 px-8 rounded-full text-base font-semibold gap-2 shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all hover:scale-105 active:scale-95 bg-primary hover:bg-primary/90 text-white"
                            size="lg"
                        >
                            <Link href="/contact">
                                {t("cta_primary")} <ArrowRight className="size-5" />
                            </Link>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            className="h-14 px-8 rounded-full text-base font-medium gap-2 bg-white/60 border-2 border-white hover:bg-white transition-all hover:scale-105 active:scale-95 text-slate-700"
                            size="lg"
                        >
                            <Link href="/clinic">
                                <PlayCircle className="size-5 text-slate-700" /> {t("cta_secondary")}
                            </Link>
                        </Button>
                    </div>

                    {/* Trust Indicators */}
                    <div className="hero-text-element flex items-center gap-6 mt-8 pt-6">
                        <div className="flex -space-x-4">
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className="w-12 h-12 rounded-full border-[3px] border-white shadow-sm overflow-hidden relative"
                                >
                                    <Image
                                        src={`https://images.unsplash.com/photo-${i === 1
                                            ? "1507003211169-0a1dd7228f2d"
                                            : i === 2
                                                ? "1494790108377-be9c29b29330"
                                                : "1534528741775-53994a69daeb"
                                            }?auto=format&fit=crop&w=100&q=80`}
                                        alt="Patient"
                                        fill
                                        sizes="48px"
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                            <div className="w-12 h-12 rounded-full border-[3px] border-white bg-slate-100 flex items-center justify-center text-xs font-bold text-muted-foreground shadow-sm">
                                +2k
                            </div>
                        </div>
                        <div>
                            <div className="flex text-gold text-sm mb-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="size-4 fill-current" />
                                ))}
                            </div>
                            <p className="text-xs text-slate-500 font-semibold tracking-wide">
                                {t("trusted_by")}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Image with Organic Shape */}
                <div className="flex-1 relative w-full h-[500px] lg:h-[750px] flex items-center justify-center lg:justify-end">
                    {/* Background Blob Effect */}
                    <div
                        className="absolute top-[5%] right-[0%] w-[90%] h-[90%] bg-blue-100/50 blur-3xl -z-10 animate-pulse-slow"
                        style={{ borderRadius: "48% 52% 68% 32% / 42% 66% 34% 58%" }}
                    />

                    <div
                        ref={imageRef}
                        className="relative w-full lg:w-[90%] h-full overflow-hidden shadow-2xl border-[6px] border-white"
                        style={{
                            willChange: "transform, opacity",
                            borderRadius: "48% 52% 68% 32% / 42% 66% 34% 58%"
                        }}
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=2068"
                            alt="Elite Dental Clinic - Treatment Room"
                            fill
                            sizes="(max-width: 1024px) 100vw, 90vw"
                            className="object-cover scale-105 hover:scale-100 transition-transform duration-[2s]"
                            priority
                        />

                        {/* Subtle Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/10 to-transparent pointer-events-none" />
                    </div>

                    {/* Floating "Swiss Certified" Card */}
                    <div className="hero-floating-card absolute bottom-24 -left-4 md:-left-8 lg:bottom-32 lg:-left-12 bg-white/90 backdrop-blur-xl border border-white/60 p-5 pr-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex items-center gap-5 z-20 max-w-[320px] hover:scale-105 transition-transform duration-300">
                        <div className="w-14 h-14 rounded-full bg-indigo-50 flex items-center justify-center text-primary shrink-0 shadow-inner">
                            <CheckCircle className="size-7" strokeWidth={2.5} />
                        </div>
                        <div>
                            <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">
                                {t("certified_card.title")}
                            </p>
                            <h4 className="text-base font-bold text-slate-900 leading-tight">
                                {t("certified_card.subtitle")}
                            </h4>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};
