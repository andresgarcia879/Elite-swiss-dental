"use client";

import React, { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleLocaleChange = (newLocale: string) => {
        router.replace(pathname, { locale: newLocale });
    };

    if (!mounted) {
        return (
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                <Globe className="h-5 w-5" />
                <span className="sr-only">Switch language</span>
            </Button>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                    <Globe className="h-5 w-5" />
                    <span className="sr-only">Switch language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleLocaleChange("en")} disabled={locale === "en"}>
                    English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLocaleChange("de")} disabled={locale === "de"}>
                    Deutsch
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLocaleChange("fr")} disabled={locale === "fr"}>
                    Français
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLocaleChange("it")} disabled={locale === "it"}>
                    Italiano
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
