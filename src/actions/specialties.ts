"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const specialtySchema = z.object({
    name: z.string().min(1, "Name is required"),
});

export async function createSpecialty(formData: FormData) {
    const name = formData.get("name") as string;

    // Validate
    const validated = specialtySchema.safeParse({ name });
    if (!validated.success) {
        return { error: "Invalid data" };
    }

    try {
        await prisma.specialty.create({
            data: {
                name: validated.data.name,
            },
        });
    } catch (error) {
        return { error: "Failed to create specialty" };
    }

    revalidatePath("/admin/specialties");
    return { success: true };
}

export async function deleteSpecialty(id: string) {
    try {
        await prisma.specialty.delete({
            where: { id },
        });
    } catch (error) {
        return { error: "Failed to delete specialty" };
    }

    revalidatePath("/admin/specialties");
    return { success: true };
}
