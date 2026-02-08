"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const prisma = new PrismaClient();

const BookingSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(10),
    service: z.string().optional(),
    date: z.string().optional(), // Or Date
});

type State = {
    errors?: {
        name?: string[];
        email?: string[];
        phone?: string[];
        service?: string[];
    };
    message?: string;
} | null;

export async function createBooking(prevState: State, formData: FormData) {
    const validatedFields = BookingSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        service: formData.get("service"),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    try {
        await prisma.booking.create({
            data: {
                name: validatedFields.data.name,
                email: validatedFields.data.email,
                phone: validatedFields.data.phone,
                service: validatedFields.data.service,
                date: new Date(), // Just defaulting for now
            },
        });

        // Send email via Postmark here (todo)

        revalidatePath("/");
        return { message: "Booking created successfully!" };
    } catch (error) {
        return { message: "Failed to create booking." };
    }
}
