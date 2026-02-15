"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { useTranslations } from "next-intl";

export const CTA = () => {
    const t = useTranslations("CTA");

    return (
        <section className="py-24 px-6 bg-slate-900 text-white rounded-[3rem] mt-10 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center gap-8">
                <span className="text-primary font-bold tracking-widest uppercase text-sm">
                    {t("badge")}
                </span>
                <h2 className="font-serif text-5xl md:text-7xl leading-tight text-white">
                    {t("title_part1")}<br />{t("title_part2")}
                </h2>
                <p className="text-slate-300 text-lg max-w-xl">
                    {t("description")}
                </p>
                <Button className="mt-4 bg-white hover:bg-slate-100 text-slate-900 text-lg font-bold py-8 px-10 rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 flex items-center gap-3">
                    {t("button")}
                    <Calendar className="size-5 text-primary" />
                </Button>
            </div>
        </section>
    );
};
