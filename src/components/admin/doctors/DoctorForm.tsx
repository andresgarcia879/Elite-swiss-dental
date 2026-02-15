"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { createDoctor, updateDoctor } from "@/actions/doctors";

type Specialty = {
    id: string;
    name: string;
};

type Doctor = {
    id: string;
    fullName: string;
    title: string;
    specialtyId: string;
    education: string;
    experience: number;
    bio: string;
    imageUrl: string;
    isActive: boolean;
    services?: { id: string }[];
};

function SubmitButton({ isEditing }: { isEditing: boolean }) {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Saving..." : isEditing ? "Update Doctor" : "Create Doctor"}
        </Button>
    );
}

interface Treatment {
    id: string;
    name: string;
}

import { useState, ChangeEvent } from "react";

// ... existing code ...

export default function DoctorForm({ specialties, treatments, doctor }: { specialties: Specialty[], treatments: Treatment[], doctor?: Doctor }) {
    const isEditing = !!doctor;
    const action = isEditing ? updateDoctor.bind(null, doctor.id) : createDoctor;
    const doctorTreatmentIds = doctor?.services?.map(s => s.id) || [];

    const [imageUrl, setImageUrl] = useState(doctor?.imageUrl || "");
    const [previewUrl, setPreviewUrl] = useState(doctor?.imageUrl || "");

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setImageUrl(result);
                setPreviewUrl(result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <form action={async (formData) => {
            await action(formData)
        }} className="space-y-6 max-w-2xl bg-white p-8 rounded-lg border">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" name="fullName" defaultValue={doctor?.fullName} required placeholder="Dr. Hans Müller" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="title">Title/Role</Label>
                    <Input id="title" name="title" defaultValue={doctor?.title} required placeholder="Senior Implantologist" />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="specialtyId">Specialty</Label>
                <Select name="specialtyId" defaultValue={doctor?.specialtyId} required>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a specialty" />
                    </SelectTrigger>
                    <SelectContent>
                        {specialties.map((s) => (
                            <SelectItem key={s.id} value={s.id}>
                                {s.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-4">
                <Label>Treatments Performed</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 border rounded-md max-h-60 overflow-y-auto">
                    {treatments.map((treatment) => (
                        <div key={treatment.id} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id={`treatment-${treatment.id}`}
                                name="treatmentIds"
                                value={treatment.id}
                                defaultChecked={doctorTreatmentIds.includes(treatment.id)}
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <label
                                htmlFor={`treatment-${treatment.id}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {treatment.name}
                            </label>
                        </div>
                    ))}
                </div>
                <p className="text-xs text-muted-foreground">Select all treatments this doctor is qualified to perform.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="education">Education</Label>
                    <Input id="education" name="education" defaultValue={doctor?.education} required placeholder="DDS, University of Zurich" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="experience">Experience (Years)</Label>
                    <Input id="experience" name="experience" type="number" defaultValue={doctor?.experience} required min="0" />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="bio">Biography</Label>
                <Textarea id="bio" name="bio" defaultValue={doctor?.bio} required className="h-32" placeholder="Dr. Müller is a renowned expert in..." />
            </div>

            <div className="space-y-4">
                <Label htmlFor="imageUpload">Profile Image</Label>

                {/* Hidden input to store the actual value (URL or Base64) */}
                <input type="hidden" name="imageUrl" value={imageUrl} />

                <div className="flex items-start gap-4">
                    {previewUrl && (
                        <div className="relative w-32 h-32 rounded-lg overflow-hidden border">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={previewUrl}
                                alt="Preview"
                                className="w-full h-full object-cover"
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    setPreviewUrl("");
                                    setImageUrl("");
                                }}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </button>
                        </div>
                    )}

                    <div className="flex-1 space-y-2">
                        <Input
                            id="imageUpload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="cursor-pointer"
                        />
                        <p className="text-xs text-muted-foreground">
                            Upload a photo from your computer (max 2MB recommended).
                        </p>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-2 text-muted-foreground">
                                    Or enter URL
                                </span>
                            </div>
                        </div>

                        <Input
                            value={imageUrl}
                            onChange={(e) => {
                                setImageUrl(e.target.value);
                                setPreviewUrl(e.target.value);
                            }}
                            placeholder="https://example.com/photo.jpg"
                        />
                    </div>
                </div>
            </div>

            <div className="flex items-center space-x-2">
                <Switch id="isActive" name="isActive" defaultChecked={doctor?.isActive ?? true} />
                <Label htmlFor="isActive">Active Profile (Visible on website)</Label>
            </div>

            <div className="pt-4">
                <SubmitButton isEditing={isEditing} />
            </div>
        </form>
    );
}
