"use client";

import React from "react";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { MapPin, Clock, Phone, Mail } from "lucide-react";

export default function ClinicPage() {
    return (
        <main className="min-h-screen bg-background">
            <Header />
            <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-12 items-center">
                    <div className="flex-1 space-y-8">
                        <h1 className="font-serif text-5xl text-foreground">Our Zurich Clinic</h1>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Located in the heart of Zurich on the prestigious Bahnhofstrasse, our clinic offers a sanctuary of calm and luxury. Designed with patient comfort in mind, every detail reflects our commitment to excellence.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <MapPin className="size-6 text-primary shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-bold text-foreground">Address</h3>
                                    <p className="text-muted-foreground">Bahnhofstrasse 10<br />8001 Zurich, Switzerland</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Clock className="size-6 text-primary shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-bold text-foreground">Opening Hours</h3>
                                    <p className="text-muted-foreground">Mon - Fri: 08:00 - 20:00<br />Saturday: 09:00 - 18:00</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 relative h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl">
                        <Image
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuArhKFLeaa9xzOXbf4wHzIuOhKqQ4Lnh5rW-m1q4ANyWRljkYmpRoG_RgD6fIxeJ6m080gNJrv9cjVg0GfnNStEaP3HbyqGBK841sml9xtsh2zvewTsxX0le9YcM5njFyJKSVJ3j3k7v7QzQyiatUnr1Rj-iAjS5qZTB-P9iBO_qDaM63kg4QiHfp5119njGqawvzhM06ZiKVVDM0Z7Cy6Lz-sUsTAXCgvGR0LkbgjP5zG3wnJ5ngaK79yz-vV3ddsZmuGBx2_JnMzK"
                            alt="Clinic Interior"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}
