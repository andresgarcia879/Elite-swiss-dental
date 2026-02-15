"use server";

import { AppointmentStatus } from "@prisma/client";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateAppointmentStatus(id: string, status: AppointmentStatus) {
    try {
        await prisma.appointment.update({
            where: { id },
            data: { status },
        });
        revalidatePath("/admin/appointments");
        return { success: true };
    } catch (error) {
        return { error: "Failed to update appointment status" };
    }
}

export async function deleteAppointment(id: string) {
    try {
        await prisma.appointment.delete({
            where: { id },
        });
        revalidatePath("/admin/appointments");
        return { success: true };
    } catch (error) {
        return { error: "Failed to delete appointment" };
    }
}
