"use client";

import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, MapPin, Mail, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

const Footer = () => {
    const t = useTranslations("Footer");

    return (
        <footer className="bg-slate-900 text-white pt-24 pb-12 rounded-t-[3rem] mt-10 relative overflow-hidden">
            {/* Background patterns */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="flex flex-col gap-6">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="size-8 text-primary flex items-center justify-center bg-white/10 rounded-full">
                                <span className="font-serif font-bold text-xl">E</span>
                            </div>
                            <h2 className="text-xl font-serif font-bold">Elite Swiss Dental</h2>
                        </Link>
                        <p className="text-slate-400 leading-relaxed text-sm">
                            {t("brand_description")}
                        </p>
                        <div className="flex gap-4 mt-2">
                            <Link href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary/20 flex items-center justify-center transition-colors">
                                <Instagram className="size-5 text-slate-300" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary/20 flex items-center justify-center transition-colors">
                                <Facebook className="size-5 text-slate-300" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary/20 flex items-center justify-center transition-colors">
                                <Linkedin className="size-5 text-slate-300" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col gap-6">
                        <h3 className="font-serif text-lg font-semibold text-white">{t("columns.treatments")}</h3>
                        <div className="flex flex-col gap-4">
                            <Link href="#" className="text-slate-400 hover:text-primary transition-colors text-sm">{t("treatments_list.cosmetic")}</Link>
                            <Link href="#" className="text-slate-400 hover:text-primary transition-colors text-sm">{t("treatments_list.implant")}</Link>
                            <Link href="#" className="text-slate-400 hover:text-primary transition-colors text-sm">{t("treatments_list.ortho")}</Link>
                            <Link href="#" className="text-slate-400 hover:text-primary transition-colors text-sm">{t("treatments_list.general")}</Link>
                            <Link href="#" className="text-slate-400 hover:text-primary transition-colors text-sm">{t("treatments_list.pediatric")}</Link>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-col gap-6">
                        <h3 className="font-serif text-lg font-semibold text-white">{t("columns.contact")}</h3>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-start gap-3 text-slate-400 text-sm">
                                <MapPin className="size-5 text-primary shrink-0" />
                                <span>Bahnhofstrasse 10<br />8001 Zurich, Switzerland</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-400 text-sm">
                                <Phone className="size-5 text-primary shrink-0" />
                                <span>+41 44 123 45 67</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-400 text-sm">
                                <Mail className="size-5 text-primary shrink-0" />
                                <span>contact@eliteswissdental.ch</span>
                            </div>
                        </div>
                    </div>

                    {/* Working Hours */}
                    <div className="flex flex-col gap-6">
                        <h3 className="font-serif text-lg font-semibold text-white">{t("columns.hours")}</h3>
                        <div className="flex flex-col gap-4 text-sm text-slate-400">
                            <div className="flex justify-between border-b border-white/5 pb-2">
                                <span>{t("days.mon_fri")}</span>
                                <span className="text-white">08:00 - 20:00</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-2">
                                <span>{t("days.sat")}</span>
                                <span className="text-white">09:00 - 18:00</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-2">
                                <span>{t("days.sun")}</span>
                                <span className="text-primary font-medium">{t("emergency")}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                    <p>&copy; {new Date().getFullYear()} {t("rights")}</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-white transition-colors">{t("links.privacy")}</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">{t("links.terms")}</Link>
                        <Link href="/imprint" className="hover:text-white transition-colors">{t("links.imprint")}</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
