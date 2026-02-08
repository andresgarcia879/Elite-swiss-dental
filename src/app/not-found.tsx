"use client";

import Link from "next/link";

export default function NotFound() {
    return (
        <div className="h-screen flex flex-col items-center justify-center text-center gap-4 bg-background text-foreground">
            <h1 className="text-4xl font-serif font-bold">404</h1>
            <p className="text-muted-foreground">Page not found</p>
            <Link href="/" className="text-primary hover:underline">
                Return Home
            </Link>
        </div>
    );
}
