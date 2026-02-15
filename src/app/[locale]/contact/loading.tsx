import { Skeleton } from "@/components/ui/skeleton";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Loading() {
    return (
        <main className="min-h-screen bg-[#FDFCFB]">
            <Header />
            <div className="pt-32 pb-20 container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                    {/* Left Column Skeleton */}
                    <div className="lg:col-span-5 space-y-12">
                        <div className="space-y-4">
                            <Skeleton className="h-4 w-20 bg-slate-200" />
                            <Skeleton className="h-16 w-3/4 bg-slate-200" />
                            <Skeleton className="h-4 w-full bg-slate-100" />
                            <Skeleton className="h-4 w-2/3 bg-slate-100" />
                        </div>

                        <div className="space-y-8">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex gap-6 items-start">
                                    <Skeleton className="w-12 h-12 rounded-full bg-slate-200" />
                                    <div className="space-y-2 flex-1 pt-2">
                                        <Skeleton className="h-6 w-1/3 bg-slate-200" />
                                        <Skeleton className="h-4 w-1/2 bg-slate-100" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column Skeleton (Booking Wizard) */}
                    <div className="lg:col-span-7">
                        <div className="w-full h-[600px] bg-white/50 backdrop-blur-sm rounded-[2.5rem] border border-slate-100 p-8">
                            <Skeleton className="w-full h-full rounded-2xl bg-slate-50" />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
