"use client";

import React, { useActionState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createBooking } from "@/actions/booking";

export default function ContactPage() {
    const [state, formAction] = useActionState(createBooking, null);

    return (
        <main className="min-h-screen bg-background">
            <Header />
            <section className="pt-40 pb-20 px-6 max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="font-serif text-5xl text-foreground mb-4">Book Your Consultation</h1>
                    <p className="text-muted-foreground text-lg mb-8">
                        Take the first step towards your perfect smile. Fill out the form below and we will contact you shortly.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-3xl mx-auto mb-12">
                        <div className="bg-slate-50 dark:bg-card p-6 rounded-2xl border border-border/50">
                            <h3 className="font-serif text-xl mb-2">Visit Us</h3>
                            <p className="text-muted-foreground">Bahnhofstrasse 12<br />8001 Zurich<br />Switzerland</p>
                        </div>
                        <div className="bg-slate-50 dark:bg-card p-6 rounded-2xl border border-border/50">
                            <h3 className="font-serif text-xl mb-2">Contact</h3>
                            <p className="text-muted-foreground">+41 44 123 45 67<br />info@eliteswissdental.ch</p>
                        </div>
                        <div className="bg-slate-50 dark:bg-card p-6 rounded-2xl border border-border/50">
                            <h3 className="font-serif text-xl mb-2">Hours</h3>
                            <p className="text-muted-foreground">Mon-Fri: 08:00 - 19:00<br />Sat: 09:00 - 14:00<br />Sun: Closed</p>
                        </div>
                    </div>
                </div>

                <div className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-sm">
                    <form action={formAction} className="flex flex-col gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium">Full Name</label>
                                <Input name="name" placeholder="John Doe" required />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium">Email Address</label>
                                <Input name="email" type="email" placeholder="john@example.com" required />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium">Phone Number</label>
                                <Input name="phone" placeholder="+41 79 000 00 00" required />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium">Service Interest</label>
                                <Input name="service" placeholder="e.g. Veneers, Implants" />
                            </div>
                        </div>

                        <Button size="lg" className="w-full text-lg mt-4 h-12">Request Appointment</Button>
                    </form>
                </div>
            </section>
            <Footer />
        </main>
    );
}
