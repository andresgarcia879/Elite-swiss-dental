"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { redirect } from "next/navigation";

const treatmentSchema = z.object({
    name: z.string().min(1, "Name is required"),
    duration: z.coerce.number().min(1, "Duration must be at least 1 minute"),
    price: z.coerce.number().min(0, "Price must be non-negative"),
    specialtyId: z.string().min(1, "Specialty is required"),
    description: z.string().optional(),
    benefits: z.string().optional(),
    // Localized fields
    name_de: z.string().optional(),
    name_fr: z.string().optional(),
    name_it: z.string().optional(),
    description_de: z.string().optional(),
    description_fr: z.string().optional(),
    description_it: z.string().optional(),
    benefits_de: z.string().optional(),
    benefits_fr: z.string().optional(),
    benefits_it: z.string().optional(),
});

export async function createTreatment(formData: FormData) {
    const rawData = {
        name: formData.get("name"),
        duration: formData.get("duration"),
        price: formData.get("price"),
        specialtyId: formData.get("specialtyId"),
        description: formData.get("description"),
        benefits: formData.get("benefits"),
        name_de: formData.get("name_de"),
        name_fr: formData.get("name_fr"),
        name_it: formData.get("name_it"),
        description_de: formData.get("description_de"),
        description_fr: formData.get("description_fr"),
        description_it: formData.get("description_it"),
        benefits_de: formData.get("benefits_de"),
        benefits_fr: formData.get("benefits_fr"),
        benefits_it: formData.get("benefits_it"),
    };

    const result = treatmentSchema.safeParse(rawData);

    if (!result.success) {
        return { success: false, errors: result.error.flatten().fieldErrors };
    }

    try {
        await prisma.service.create({
            data: {
                name: result.data.name,
                duration: result.data.duration,
                price: result.data.price,
                specialtyId: result.data.specialtyId,
                description: result.data.description,
                benefits: result.data.benefits ? result.data.benefits.split(',').map(b => b.trim()).filter(b => b) : [],

                name_de: result.data.name_de,
                name_fr: result.data.name_fr,
                name_it: result.data.name_it,
                description_de: result.data.description_de,
                description_fr: result.data.description_fr,
                description_it: result.data.description_it,
                benefits_de: result.data.benefits_de ? result.data.benefits_de.split(',').map(b => b.trim()).filter(b => b) : [],
                benefits_fr: result.data.benefits_fr ? result.data.benefits_fr.split(',').map(b => b.trim()).filter(b => b) : [],
                benefits_it: result.data.benefits_it ? result.data.benefits_it.split(',').map(b => b.trim()).filter(b => b) : [],
            },
        });
    } catch (error) {
        return { success: false, message: "Failed to create treatment" };
    }

    revalidatePath("/admin/treatments");
    redirect("/admin/treatments");
}

export async function updateTreatment(id: string, formData: FormData) {
    const rawData = {
        name: formData.get("name"),
        duration: formData.get("duration"),
        price: formData.get("price"),
        specialtyId: formData.get("specialtyId"),
        description: formData.get("description"),
        benefits: formData.get("benefits"),
        name_de: formData.get("name_de"),
        name_fr: formData.get("name_fr"),
        name_it: formData.get("name_it"),
        description_de: formData.get("description_de"),
        description_fr: formData.get("description_fr"),
        description_it: formData.get("description_it"),
        benefits_de: formData.get("benefits_de"),
        benefits_fr: formData.get("benefits_fr"),
        benefits_it: formData.get("benefits_it"),
    };

    const result = treatmentSchema.safeParse(rawData);

    if (!result.success) {
        return { success: false, errors: result.error.flatten().fieldErrors };
    }

    try {
        await prisma.service.update({
            where: { id },
            data: {
                name: result.data.name,
                duration: result.data.duration,
                price: result.data.price,
                specialtyId: result.data.specialtyId,
                description: result.data.description,
                benefits: result.data.benefits ? result.data.benefits.split(',').map(b => b.trim()).filter(b => b) : [],

                name_de: result.data.name_de,
                name_fr: result.data.name_fr,
                name_it: result.data.name_it,
                description_de: result.data.description_de,
                description_fr: result.data.description_fr,
                description_it: result.data.description_it,
                benefits_de: result.data.benefits_de ? result.data.benefits_de.split(',').map(b => b.trim()).filter(b => b) : [],
                benefits_fr: result.data.benefits_fr ? result.data.benefits_fr.split(',').map(b => b.trim()).filter(b => b) : [],
                benefits_it: result.data.benefits_it ? result.data.benefits_it.split(',').map(b => b.trim()).filter(b => b) : [],
            },
        });
    } catch (error) {
        return { success: false, message: "Failed to update treatment" };
    }

    revalidatePath("/admin/treatments");
    redirect("/admin/treatments");
}

export async function deleteTreatment(id: string) {
    try {
        await prisma.service.delete({
            where: { id },
        });
        revalidatePath("/admin/treatments");
        return { success: true };
    } catch (error) {
        return { success: false, message: "Failed to delete treatment" };
    }
}

import { translateText, translateList } from "@/lib/translator";

export async function translateTreatmentContent(
    name: string,
    description: string,
    benefits: string
) {
    try {
        const [translatedNames, translatedDescriptions, translatedBenefits] = await Promise.all([
            translateText(name),
            translateText(description),
            translateList(benefits.split(',').map(b => b.trim()).filter(b => b))
        ]);

        return {
            success: true,
            data: {
                de: {
                    name: translatedNames.de,
                    description: translatedDescriptions.de,
                    benefits: translatedBenefits.de.join(', ')
                },
                fr: {
                    name: translatedNames.fr,
                    description: translatedDescriptions.fr,
                    benefits: translatedBenefits.fr.join(', ')
                },
                it: {
                    name: translatedNames.it,
                    description: translatedDescriptions.it,
                    benefits: translatedBenefits.it.join(', ')
                }
            }
        };
    } catch (error) {
        console.error("Translation action error:", error);
        return { success: false, message: "Translation failed" };
    }
}
