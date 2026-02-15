"use client";

import React from "react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Menu, Activity, X } from "lucide-react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
    navLinks: { name: string; href: string }[];
}

export const MobileMenu = ({ navLinks }: MobileMenuProps) => {
    const t = useTranslations('Header');
    const [open, setOpen] = React.useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-slate-700 hover:text-primary transition-colors">
                    <Menu className="h-7 w-7" strokeWidth={1.5} />
                    <span className="sr-only">Open menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[400px] border-l-0 p-0 overflow-hidden">
                <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                <SheetDescription className="sr-only">Main Navigation</SheetDescription>

                <div className="flex flex-col h-full bg-white/95 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
                    {/* Header inside Menu */}
                    <div className="flex items-center justify-between p-6 border-b border-slate-100/50">
                        <div className="flex items-center gap-2">
                            <div className="size-8 text-primary flex items-center justify-center bg-primary/10 rounded-full">
                                <Activity className="size-5" />
                            </div>
                            <span className="font-serif font-bold text-lg text-slate-900">Elite Swiss</span>
                        </div>
                        {/* Custom Close Button if needed, but SheetContent has one. We'll rely on default or custom styling. */}
                    </div>

                    {/* Links */}
                    <div className="flex-1 flex flex-col justify-center px-8 gap-6 -mt-10">
                        <nav className="flex flex-col gap-6">
                            {navLinks.map((item, index) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className="group flex items-center justify-between border-b border-slate-100 pb-4"
                                >
                                    <span className={cn(
                                        "text-3xl font-serif font-medium text-slate-800 transition-all duration-300 group-hover:text-primary group-hover:translate-x-2",
                                        "opacity-0 animate-in fade-in slide-in-from-bottom-4 fill-mode-forwards"
                                    )} style={{ animationDelay: `${index * 100}ms` }}>
                                        {item.name}
                                    </span>
                                    <span className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center text-slate-300 group-hover:border-primary group-hover:text-primary transition-colors">
                                        <ArrowRightIcon className="w-3 h-3" />
                                    </span>
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-8 bg-slate-50/50 space-y-6">
                        <Link href="/contact" onClick={() => setOpen(false)} className="block w-full">
                            <Button className="w-full rounded-full h-14 text-lg font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
                                {t('book')}
                            </Button>
                        </Link>

                        <div className="flex items-center justify-between pt-2">
                            <div className="text-sm text-slate-500 font-medium">
                                <p>Bahnhofstrasse 10</p>
                                <p>Zurich, Switzerland</p>
                            </div>
                            <div className="flex gap-4 items-center">
                                <LanguageSwitcher />
                            </div>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};

const ArrowRightIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
    </svg>
);
