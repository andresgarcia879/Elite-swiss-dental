"use server";

import { Locale } from "@prisma/client";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const settingSchema = z.object({
    key: z.string().min(1),
    locale: z.nativeEnum(Locale),
    value: z.string().min(1),
});

export async function updateSetting(formData: FormData) {
    const key = formData.get("key") as string;
    const locale = formData.get("locale") as Locale;
    const value = formData.get("value") as string;

    const validated = settingSchema.safeParse({ key, locale, value });

    if (!validated.success) {
        return { error: "Invalid data" };
    }

    try {
        // Find existing or create
        const existing = await prisma.languageContent.findFirst({
            where: {
                key: validated.data.key,
                locale: validated.data.locale,
            },
        });

        if (existing) {
            await prisma.languageContent.update({
                where: { id: existing.id },
                data: { value: validated.data.value },
            });
        } else {
            await prisma.languageContent.create({
                data: {
                    key: validated.data.key,
                    locale: validated.data.locale,
                    value: validated.data.value,
                },
            });
        }
    } catch (error) {
        return { error: "Failed to update setting" };
    }

    revalidatePath("/admin/settings");
    return { success: true };
}
