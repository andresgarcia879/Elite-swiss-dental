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
            <SheetContent side="right" className="w-full sm:w-[400px] border-l-0 p-0 z-[100] bg-white">
                <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                <SheetDescription className="sr-only">Main Navigation</SheetDescription>

                <div className="flex flex-col h-full w-full bg-white text-slate-900">
                    {/* Header inside Menu */}
                    <div className="flex items-center justify-between p-6 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                            <div className="size-10 text-primary flex items-center justify-center bg-primary/10 rounded-full">
                                <Activity className="size-6" />
                            </div>
                            <span className="font-serif font-bold text-xl text-slate-900 tracking-tight">Elite Swiss</span>
                        </div>
                        <div className="flex items-center justify-center size-10 rounded-full hover:bg-slate-100 transition-colors cursor-pointer" onClick={() => setOpen(false)}>
                            <X className="size-5 text-slate-500" />
                        </div>
                    </div>

                    {/* Links */}
                    <div className="flex-1 flex flex-col px-8 py-8 overflow-y-auto">
                        <nav className="flex flex-col gap-2">
                            {navLinks && navLinks.length > 0 ? navLinks.map((item, index) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className="group flex items-center justify-between py-4 border-b border-slate-50 last:border-0"
                                >
                                    <span className="text-2xl font-serif font-medium text-slate-800 transition-colors group-hover:text-primary">
                                        {item.name}
                                    </span>
                                    <span className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:border-primary group-hover:text-primary bg-slate-50 group-hover:bg-primary/5 transition-all">
                                        <ArrowRightIcon className="w-4 h-4" />
                                    </span>
                                </Link>
                            )) : (
                                <p className="text-center text-slate-500 py-4">No menu items found.</p>
                            )}
                        </nav>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-8 bg-slate-50 border-t border-slate-100 space-y-6 mt-auto">
                        <Link href="/contact" onClick={() => setOpen(false)} className="block w-full">
                            <Button className="w-full rounded-full h-14 text-lg font-bold shadow-md shadow-primary/20 hover:shadow-primary/30 transition-all bg-primary text-white">
                                {t('book')}
                            </Button>
                        </Link>

                        <div className="flex items-center justify-between pt-2">
                            <div className="text-sm text-slate-500 font-medium">
                                <p>Bahnhofstrasse 10</p>
                                <p>Zurich, Switzerland</p>
                            </div>
                            <div className="scale-90 origin-right">
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
