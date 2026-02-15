"use server";

import prisma from "@/lib/db";
import { startOfDay, endOfDay, addMinutes, format, isBefore } from "date-fns";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function getBookingData() {
    console.log("getBookingData called");
    console.log("Prisma instance:", !!prisma);
    if (!prisma) throw new Error("Prisma is undefined");
    console.log("Prisma specialty:", !!prisma.specialty);

    const specialties = await prisma.specialty.findMany({
        include: {
            services: true,
            doctors: {
                where: { isActive: true },
                select: { id: true, fullName: true, imageUrl: true, title: true }
            }
        }
    });

    const doctors = await prisma.doctor.findMany({
        where: { isActive: true },
        include: {
            specialty: {
                include: { services: true }
            }
        }
    });

    const serializedSpecialties = JSON.parse(JSON.stringify(specialties));
    const serializedDoctors = JSON.parse(JSON.stringify(doctors));
    return { specialties: serializedSpecialties, doctors: serializedDoctors };
}

export async function getAvailableSlots(doctorId: string, date: Date) {
    // 1. Define working hours (e.g., 09:00 to 17:00)
    const startHour = 9;
    const endHour = 17;
    const slotDuration = 60; // minutes

    const slots = [];
    let currentTime = startOfDay(date);
    currentTime.setHours(startHour, 0, 0, 0);

    const endTime = startOfDay(date);
    endTime.setHours(endHour, 0, 0, 0);

    // 2. Fetch existing appointments for the doctor on this date
    const dayStart = startOfDay(date);
    const dayEnd = endOfDay(date);

    const appointments = await prisma.appointment.findMany({
        where: {
            doctorId: doctorId,
            preferredDate: {
                gte: dayStart,
                lte: dayEnd
            },
            status: {
                not: "CANCELLED"
            }
        }
    });

    // 3. Generate slots and check collisions
    while (isBefore(currentTime, endTime)) {
        const slotEnd = addMinutes(currentTime, slotDuration);

        const isOccupied = appointments.some(appt => {
            const apptStart = new Date(appt.preferredDate);
            // Simple collision: if appointment starts at same time
            // In a real app, check ranges. Here assuming fixed 60m slots aligned.
            return apptStart.getTime() === currentTime.getTime();
        });

        if (!isOccupied) {
            slots.push(format(currentTime, "HH:mm"));
        }

        currentTime = slotEnd;
    }

    return slots;
}

export async function createBooking(data: any) {
    const { fullName, email, phone, doctorId, serviceId, date, time, notes, withPayment, locale } = data;

    // Combine date and time
    const [hours, minutes] = time.split(':').map(Number);
    const preferredDate = new Date(date);
    preferredDate.setHours(hours, minutes, 0, 0);

    try {
        const appointment = await prisma.appointment.create({
            data: {
                fullName,
                email,
                phone,
                doctorId,
                serviceId,
                preferredDate,
                notes,
                status: "PENDING"
            },
            include: {
                service: true
            }
        });

        // If simple booking without payment, return immediately
        if (!withPayment) {
            return { success: true, appointment };
        }

        // Create Stripe Checkout Session
        console.log("Checking Stripe Key:", process.env.STRIPE_SECRET_KEY ? "Present" : "Missing");

        if (!process.env.STRIPE_SECRET_KEY) {
            console.error("Stripe secret key missing in action");
            return { success: true, appointment }; // Fallback to normal flow if no stripe
        }

        const origin = (await headers()).get("origin") || "http://localhost:3000";
        const baseUrl = `${origin}/${locale}`;
        console.log("Origin:", origin, "BaseURL:", baseUrl);

        const checkoutSession = await stripe.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["card"],
            success_url: `${baseUrl}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${baseUrl}/booking/cancel`,
            customer_email: email,
            client_reference_id: appointment.id,
            line_items: [
                {
                    price_data: {
                        currency: "chf",
                        product_data: {
                            name: appointment.service?.name || "Dental Appointment",
                            description: `Appointment with Dr. ${doctorId} on ${format(preferredDate, "PPP p")}`,
                        },
                        unit_amount: Math.round(Number(appointment.service?.price || 0) * 100), // Stripe expects cents
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                appointmentId: appointment.id,
            },
        });

        console.log("Checkout Session Created:", checkoutSession.url);

        return { success: true, appointment, checkoutUrl: checkoutSession.url };
    } catch (error) {
        console.error("Booking failed:", error);
        return { success: false, error: "Failed to create appointment" };
    }
}
