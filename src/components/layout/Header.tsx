"use client";

import React, { useState, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Menu, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { MobileMenu } from "@/components/layout/MobileMenu";

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
                    <MobileMenu navLinks={navLinks} />
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
