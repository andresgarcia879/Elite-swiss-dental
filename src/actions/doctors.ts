"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const doctorSchema = z.object({
    fullName: z.string().min(1, "Name is required"),
    title: z.string().min(1, "Title is required"),
    specialtyId: z.string().min(1, "Specialty is required"),
    education: z.string().min(1, "Education is required"),
    experience: z.coerce.number().min(0, "Experience must be a positive number"),
    bio: z.string().min(1, "Bio is required"),
    // Relaxed validation to allow both HTTP URLs and Base64 Data URIs
    imageUrl: z.string().min(1, "Image is required"),
    isActive: z.coerce.boolean(),
    treatmentIds: z.array(z.string()).optional(),
});

export async function createDoctor(formData: FormData) {
    const rawData = {
        fullName: formData.get("fullName"),
        title: formData.get("title"),
        specialtyId: formData.get("specialtyId"),
        education: formData.get("education"),
        experience: formData.get("experience"),
        bio: formData.get("bio"),
        imageUrl: formData.get("imageUrl"),
        isActive: formData.get("isActive") === "on",
        treatmentIds: formData.getAll("treatmentIds"),
    };

    const validated = doctorSchema.safeParse(rawData);

    if (!validated.success) {
        return { error: "Invalid data", details: validated.error.flatten() };
    }

    const { treatmentIds, ...doctorData } = validated.data;

    try {
        await prisma.doctor.create({
            data: {
                ...doctorData,
                services: {
                    connect: treatmentIds?.map((id) => ({ id })) || [],
                },
            },
        });
    } catch (error) {
        return { error: "Failed to create doctor" };
    }

    revalidatePath("/admin/doctors");
    redirect("/admin/doctors");
}

export async function updateDoctor(id: string, formData: FormData) {
    const rawData = {
        fullName: formData.get("fullName"),
        title: formData.get("title"),
        specialtyId: formData.get("specialtyId"),
        education: formData.get("education"),
        experience: formData.get("experience"),
        bio: formData.get("bio"),
        imageUrl: formData.get("imageUrl"),
        isActive: formData.get("isActive") === "on",
        treatmentIds: formData.getAll("treatmentIds"),
    };

    const validated = doctorSchema.safeParse(rawData);

    if (!validated.success) {
        return { error: "Invalid data", details: validated.error.flatten() };
    }

    const { treatmentIds, ...doctorData } = validated.data;

    try {
        await prisma.doctor.update({
            where: { id },
            data: {
                ...doctorData,
                services: {
                    set: treatmentIds?.map((id) => ({ id })) || [],
                },
            },
        });
    } catch (error) {
        return { error: "Failed to update doctor" };
    }

    revalidatePath("/admin/doctors");
    redirect("/admin/doctors");
}

export async function deleteDoctor(id: string) {
    try {
        await prisma.doctor.delete({
            where: { id },
        });
    } catch (error) {
        return { error: "Failed to delete doctor" };
    }
    revalidatePath("/admin/doctors");
    return { success: true };
}
