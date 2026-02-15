"use client";

import React, { useState, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Menu, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";

const Header = () => {
    const t = useTranslations('Header');
    const [isScrolled, setIsScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: t('nav.treatments'), href: "/treatments" },
        { name: t('nav.technology'), href: "/technology" },
        { name: t('nav.team'), href: "/team" },
        { name: t('nav.clinic'), href: "/clinic" },
    ];

    return (
        <header className={cn("fixed top-0 left-0 w-full z-50 flex justify-center transition-all duration-300 px-4", isScrolled ? "pt-2" : "pt-4")}>
            <nav
                className={cn(
                    "rounded-full px-6 py-3 flex items-center justify-between w-full max-w-5xl transition-all duration-300",
                    "glass-panel", // Custom utility in globals.css
                    isScrolled ? "shadow-md bg-white/80 dark:bg-black/80" : "hover:shadow-lg"
                )}
            >
                <Link href="/" className="flex items-center gap-3 text-foreground group">
                    <div className="size-8 text-primary flex items-center justify-center bg-primary/10 rounded-full transition-transform group-hover:scale-110">
                        {/* Fallback to Lucide Icon if no Tooth icon available */}
                        <Activity className="size-5" />
                    </div>
                    <h2 className="text-lg font-serif font-bold leading-tight tracking-tight">Elite Swiss Dental</h2>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <LanguageSwitcher />
                    <Link href="/contact">
                        <Button className="rounded-full px-6 font-bold bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all active:scale-95">
                            {t('book')}
                        </Button>
                    </Link>
                </div>

                {/* Mobile Menu */}
                {mounted ? (
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden text-muted-foreground hover:text-primary">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                            <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                            <SheetDescription className="sr-only">Navigation links for mobile devices</SheetDescription>

                            <div className="flex flex-col h-full pt-10">
                                {/* Mobile Branding */}
                                <div className="mb-8 px-2">
                                    <div className="size-10 text-primary flex items-center justify-center bg-primary/10 rounded-full mb-4">
                                        <Activity className="size-6" />
                                    </div>
                                    <h2 className="text-2xl font-serif font-bold text-foreground">Elite Swiss Dental</h2>
                                    <p className="text-sm text-muted-foreground mt-1">Zurich&apos;s Premium Dental Care</p>
                                </div>

                                <nav className="flex flex-col gap-6">
                                    {navLinks.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className="text-2xl font-serif font-medium text-foreground/80 hover:text-primary transition-colors flex items-center justify-between group"
                                        >
                                            {item.name}
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover:bg-primary transition-colors opacity-0 group-hover:opacity-100" />
                                        </Link>
                                    ))}

                                    <div className="pt-6 border-t border-border/50 mt-4 space-y-6">
                                        <LanguageSwitcher />

                                        <Link href="/contact" className="w-full block">
                                            <Button className="w-full rounded-full font-bold h-12 text-base shadow-lg shadow-primary/20">
                                                {t('book')}
                                            </Button>
                                        </Link>
                                    </div>
                                </nav>

                                {/* Footer Info */}
                                <div className="mt-auto pb-8 px-2 text-sm text-muted-foreground">
                                    <p>Bahnhofstrasse 10, Zurich</p>
                                    <p className="mt-1">+41 44 123 45 67</p>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                ) : (
                    <div className="md:hidden p-2">
                        <Menu className="h-6 w-6 text-muted-foreground" />
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
