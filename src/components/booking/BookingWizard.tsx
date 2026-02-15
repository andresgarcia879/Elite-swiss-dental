"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getBookingData, getAvailableSlots, createBooking } from "@/actions/booking";
import { Loader2, CheckCircle2, AlertCircle, Calendar as CalendarIcon, User, Stethoscope, ChevronRight, ChevronLeft, Clock } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

// Types matching server response
type Doctor = {
    id: string;
    fullName: string;
    title: string;
    imageUrl: string;
    specialty: { id: string; name: string; services: Service[] };
};

type Service = {
    id: string;
    name: string;
    duration: number;
    price: number;
    specialtyId: string;
};

type Specialty = {
    id: string;
    name: string;
    services: Service[];
};

interface BookingWizardProps {
    initialDoctors: Doctor[];
    initialSpecialties: Specialty[];
}

export default function BookingWizard({ initialDoctors, initialSpecialties }: BookingWizardProps) {
    const t = useTranslations("Booking");

    // Steps: 1. Mode Selection (Doctor vs Service), 2. Selection, 3. Date/Time, 4. Details, 5. Success
    const [step, setStep] = useState(1);
    const [path, setPath] = useState<"doctor" | "treatment" | null>(null);

    // Data
    const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
    const [specialties, setSpecialties] = useState<Specialty[]>(initialSpecialties);
    const [loading, setLoading] = useState(false);

    // Selections
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | null>(null);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [timeSlot, setTimeSlot] = useState<string | null>(null);
    const [availableSlots, setAvailableSlots] = useState<string[]>([]);
    const [slotsLoading, setSlotsLoading] = useState(false);

    // Form Details
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        notes: ""
    });

    const [submissionStatus, setSubmissionStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");


    // Fetch slots when doctor & date selected
    useEffect(() => {
        if (selectedDoctor && date) {
            setSlotsLoading(true);
            getAvailableSlots(selectedDoctor.id, date).then(slots => {
                setAvailableSlots(slots);
                setSlotsLoading(false);
            });
        }
    }, [selectedDoctor, date]);

    // Handlers
    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);

    const handleSubmit = async () => {
        setSubmissionStatus("submitting");
        const result = await createBooking({
            ...formData,
            doctorId: selectedDoctor!.id,
            serviceId: selectedService!.id,
            date: date!,
            time: timeSlot!
        });

        if (result.success) {
            setSubmissionStatus("success");
            setStep(5);
        } else {
            setSubmissionStatus("error");
        }
    };

    // --- RENDER STEPS ---

    // Step 1: Choose Path
    const renderStep1 = () => (
        <div className="space-y-6">
            <h2 className="font-serif text-3xl text-slate-900 mb-2">How would you like to start?</h2>
            <p className="text-slate-500 mb-8">Choose your preferred way to book an appointment.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                    onClick={() => { setPath("doctor"); handleNext(); }}
                    className="group p-8 rounded-2xl border border-slate-200 bg-white hover:border-blue-200 hover:bg-blue-50/50 transition-all text-left shadow-sm hover:shadow-md"
                >
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-900 mb-4 group-hover:scale-110 transition-transform">
                        <User className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-xl text-slate-900 mb-2">Select a Specialist</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">Choose a specific doctor you would like to see.</p>
                </button>

                <button
                    onClick={() => { setPath("treatment"); handleNext(); }}
                    className="group p-8 rounded-2xl border border-slate-200 bg-white hover:border-blue-200 hover:bg-blue-50/50 transition-all text-left shadow-sm hover:shadow-md"
                >
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-900 mb-4 group-hover:scale-110 transition-transform">
                        <Stethoscope className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-xl text-slate-900 mb-2">Select a Treatment</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">Browse our services and find the right treatment.</p>
                </button>
            </div>
        </div>
    );

    // Step 2: Selection
    const renderSelectionStep = () => {
        if (path === "doctor") {
            // 2a. Select Doctor -> Select Service
            if (!selectedDoctor) {
                return (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-serif text-slate-900">Choose a Specialist</h3>
                            <Button variant="ghost" onClick={handleBack} className="text-slate-500 hover:text-slate-900">Back</Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {doctors.map(doc => (
                                <div
                                    key={doc.id}
                                    onClick={() => setSelectedDoctor(doc)}
                                    className="cursor-pointer bg-white p-4 rounded-xl border hover:border-blue-500 hover:shadow-md transition-all flex items-center gap-4"
                                >
                                    <div className="relative w-16 h-16 rounded-full overflow-hidden bg-slate-100">
                                        {doc.imageUrl ? (
                                            <Image src={doc.imageUrl} alt={doc.fullName} fill className="object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                                                <User className="w-8 h-8" />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900">{doc.fullName}</p>
                                        <p className="text-xs text-slate-500">{doc.title}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            } else {
                // Doctor selected, select service
                const doctorServices = selectedDoctor.specialty.services || [];

                return (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-serif text-slate-900">Select Treatment</h3>
                            <Button variant="ghost" onClick={() => setSelectedDoctor(null)}>Change Doctor</Button>
                        </div>
                        <p className="text-slate-500">Showing treatments performed by {selectedDoctor.fullName} ({selectedDoctor.specialty.name})</p>

                        {doctorServices.length === 0 ? (
                            <p className="text-amber-600 bg-amber-50 p-4 rounded-lg border border-amber-200">
                                This specialist has no specific treatments listed. Please select a different doctor or view all treatments.
                            </p>
                        ) : (
                            <div className="grid grid-cols-1 gap-3">
                                {doctorServices.map(service => (
                                    <div
                                        key={service.id}
                                        onClick={() => {
                                            setSelectedService(service);
                                            handleNext();
                                        }}
                                        className="cursor-pointer p-4 rounded-xl border bg-white hover:bg-slate-50 transition-all flex justify-between items-center"
                                    >
                                        <span className="font-medium text-slate-900">{service.name}</span>
                                        <div className="text-slate-500 text-sm">
                                            {service.duration} mins • CHF {service.price}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            }
        } else {
            // 2b. Select Treatment -> Select Doctor
            if (!selectedService) {
                return (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-serif text-slate-900">Select Treatment</h3>
                            <Button variant="ghost" onClick={handleBack} className="text-slate-500 hover:text-slate-900">Back</Button>
                        </div>
                        {specialties.map(spec => (
                            <div key={spec.id} className="space-y-3">
                                <h4 className="font-bold text-slate-400 text-sm uppercase tracking-wider">{spec.name}</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {spec.services.map(service => (
                                        <div
                                            key={service.id}
                                            onClick={() => setSelectedService(service)}
                                            className="cursor-pointer p-4 rounded-xl border bg-white hover:bg-slate-50 transition-all"
                                        >
                                            <div className="font-medium text-slate-900">{service.name}</div>
                                            <div className="text-xs text-slate-500 mt-1">{service.duration} mins</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                );
            } else {
                // Service selected, select doctor
                const validDoctors = doctors.filter(d => d.specialty.id === selectedService.specialtyId);
                return (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-serif text-slate-900">Choose a Specialist</h3>
                            <Button variant="ghost" onClick={() => setSelectedService(null)}>Change Service</Button>
                        </div>
                        <p className="text-slate-500">Specialists available for {selectedService.name}:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {validDoctors.map(doc => (
                                <div
                                    key={doc.id}
                                    onClick={() => { setSelectedDoctor(doc); handleNext(); }}
                                    className="cursor-pointer bg-white p-4 rounded-xl border hover:border-blue-500 hover:shadow-md transition-all flex items-center gap-4"
                                >
                                    <div className="relative w-16 h-16 rounded-full overflow-hidden bg-slate-100">
                                        {doc.imageUrl ? ( // Ensure Image is used correctly
                                            <Image src={doc.imageUrl} alt={doc.fullName} fill className="object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                                                <User className="w-8 h-8" />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900">{doc.fullName}</p>
                                        <p className="text-xs text-slate-500">{doc.title}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {validDoctors.length === 0 && (
                            <p className="text-red-500">No doctors found for this service. This shouldn't happen.</p>
                        )}
                    </div>
                );
            }
        }
    };

    // Step 3: Date & Time
    const renderStep3 = () => (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="font-serif text-3xl text-slate-900 mb-1">Select Date & Time</h2>
                    <p className="text-sm text-slate-500">with {selectedDoctor?.fullName}</p>
                </div>
                <Button variant="ghost" onClick={handleBack} className="text-slate-500 hover:text-slate-900">Back</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Calendar */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(date) => date < new Date() || date.getDay() === 0}
                        className="rounded-md mx-auto"
                    />
                </div>

                {/* Time Slots */}
                <div>
                    <h3 className="font-medium text-slate-900 mb-4 flex items-center gap-2">
                        <Clock className="w-4 h-4" /> Available Slots
                    </h3>
                    <div className="grid grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-2">
                        {!date ? (
                            <p className="text-sm text-slate-400 col-span-2 text-center py-8">Please select a date first</p>
                        ) : slotsLoading ? (
                            <div className="col-span-2 flex justify-center py-8">
                                <Loader2 className="w-6 h-6 animate-spin text-blue-900" />
                            </div>
                        ) : availableSlots.length === 0 ? (
                            <p className="text-sm text-slate-400 col-span-2 text-center py-8">No slots available on this date</p>
                        ) : (
                            availableSlots.map(slot => (
                                <button
                                    key={slot}
                                    onClick={() => setTimeSlot(slot)}
                                    className={cn(
                                        "p-3 rounded-lg text-sm border transition-all",
                                        timeSlot === slot
                                            ? "bg-blue-900 text-white border-blue-900 shadow-md"
                                            : "bg-white text-slate-600 border-slate-200 hover:border-blue-300"
                                    )}
                                >
                                    {slot}
                                </button>
                            ))
                        )}
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <Button
                    onClick={handleNext}
                    disabled={!date || !timeSlot}
                    className="bg-blue-900 hover:bg-blue-800 text-white rounded-full px-8"
                >
                    Continue
                </Button>
            </div>
        </div>
    );

    // Step 4: Details
    const renderStep4 = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="font-serif text-3xl text-slate-900">Your Details</h2>
                <Button variant="ghost" onClick={handleBack} className="text-slate-500 hover:text-slate-900">Back</Button>
            </div>

            <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100 mb-6 space-y-2">
                <div className="flex items-center gap-2 text-sm text-blue-900 font-medium">
                    <CalendarIcon className="w-4 h-4" />
                    <span>{date ? format(date, "PPP") : ""} at {timeSlot}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                    <User className="w-4 h-4" />
                    <span>{selectedDoctor?.fullName}</span>
                </div>
                {selectedService && (
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Stethoscope className="w-4 h-4" />
                        <span>{selectedService.name}</span>
                    </div>
                )}
            </div>

            <div className="grid gap-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                            id="fullName"
                            placeholder="John Doe"
                            className="bg-white"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            className="bg-white"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                        id="phone"
                        type="tel"
                        placeholder="+41 79 123 45 67"
                        className="bg-white"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="notes">Notes (Optional)</Label>
                    <Textarea
                        id="notes"
                        placeholder="Any specific concerns or questions?"
                        className="bg-white min-h-[100px]"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    />
                </div>
            </div>

            <Button
                onClick={handleSubmit}
                disabled={!formData.fullName || !formData.email || !formData.phone || submissionStatus === "submitting"}
                className="w-full bg-blue-900 hover:bg-blue-800 text-white rounded-full py-6 text-lg shadow-lg relative"
            >
                {submissionStatus === "submitting" ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                    "Confirm Booking"
                )}
            </Button>
        </div>
    );

    // Step 5: Success
    const renderStep5 = () => (
        <div className="text-center py-16 space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="font-serif text-3xl text-slate-900">Booking Confirmed!</h2>
            <p className="text-slate-500 max-w-md mx-auto leading-relaxed">
                Thank you, {formData.fullName}. Your appointment has been successfully scheduled. We have sent a confirmation email to {formData.email}.
            </p>
            <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="mt-8"
            >
                Book Another Appointment
            </Button>
        </div>
    );

    if (loading) {
        return (
            <div className="min-h-[600px] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-slate-300" />
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full bg-slate-50/50 backdrop-blur-xl border border-white/50 rounded-[2.5rem] shadow-2xl p-8 md:p-12 relative overflow-hidden"
        >
            {/* Progress Bar */}
            {step < 5 && (
                <div className="absolute top-0 left-0 w-full h-1 bg-slate-100">
                    <motion.div
                        className="h-full bg-blue-900"
                        initial={{ width: "0%" }}
                        animate={{ width: `${(step / 4) * 100}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
            )}

            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="h-full"
                >
                    {step === 1 && renderStep1()}
                    {step === 2 && renderSelectionStep()}
                    {step === 3 && renderStep3()}
                    {step === 4 && renderStep4()}
                    {step === 5 && renderStep5()}
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
}
