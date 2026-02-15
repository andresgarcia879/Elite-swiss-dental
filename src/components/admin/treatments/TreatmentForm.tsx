"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Loader2 } from "lucide-react";
import { useState } from "react";
import { translateTreatmentContent } from "@/actions/treatments";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} className="w-full bg-slate-900 text-white hover:bg-slate-800">
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                </>
            ) : (
                "Save Treatment"
            )}
        </Button>
    );
}

interface Specialty {
    id: string;
    name: string;
}

interface TreatmentFormProps {
    action: (formData: FormData) => void;
    specialties: Specialty[];
    initialData?: {
        name: string;
        duration: number;
        price: number;
        specialtyId: string;
        description?: string;
        benefits?: string;
        // Localized
        name_de?: string;
        name_fr?: string;
        name_it?: string;
        description_de?: string;
        description_fr?: string;
        description_it?: string;
        benefits_de?: string;
        benefits_fr?: string;
        benefits_it?: string;
    };
}

export default function TreatmentForm({ action, specialties, initialData }: TreatmentFormProps) {
    const [isTranslating, setIsTranslating] = useState(false);

    // State for controlled inputs to allow auto-fill
    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        description: initialData?.description || "",
        benefits: initialData?.benefits || "",

        name_de: initialData?.name_de || "",
        description_de: initialData?.description_de || "",
        benefits_de: initialData?.benefits_de || "",

        name_fr: initialData?.name_fr || "",
        description_fr: initialData?.description_fr || "",
        benefits_fr: initialData?.benefits_fr || "",

        name_it: initialData?.name_it || "",
        description_it: initialData?.description_it || "",
        benefits_it: initialData?.benefits_it || "",
    });

    const handleAutoTranslate = async () => {
        if (!formData.name) {
            alert("Please enter a name in English first.");
            return;
        }

        // 1. Immediate feedback: Copy English text to all fields
        // This confirms to the user that something is happening
        setFormData(prev => ({
            ...prev,
            name_de: formData.name,
            description_de: formData.description,
            benefits_de: formData.benefits,

            name_fr: formData.name,
            description_fr: formData.description,
            benefits_fr: formData.benefits,

            name_it: formData.name,
            description_it: formData.description,
            benefits_it: formData.benefits,
        }));

        setIsTranslating(true);
        console.log("Requesting translation for:", formData.name);

        try {
            const result = await translateTreatmentContent(
                formData.name,
                formData.description,
                formData.benefits
            );

            console.log("Translation result:", result);

            if (result.success && result.data) {
                setFormData(prev => ({
                    ...prev,
                    name_de: result.data.de.name || prev.name_de, // Fallback to EN if empty
                    description_de: result.data.de.description || prev.description_de,
                    benefits_de: result.data.de.benefits || prev.benefits_de,

                    name_fr: result.data.fr.name || prev.name_fr,
                    description_fr: result.data.fr.description || prev.description_fr,
                    benefits_fr: result.data.fr.benefits || prev.benefits_fr,

                    name_it: result.data.it.name || prev.name_it,
                    description_it: result.data.it.description || prev.description_it,
                    benefits_it: result.data.it.benefits || prev.benefits_it,
                }));
                alert("Translation completed successfully!");
            } else {
                console.error("Translation returned failure:", result);
                alert(`Translation failed: ${result.message || "Unknown error"}`);
            }
        } catch (error) {
            console.error("Translation error:", error);
            alert("An error occurred during translation. Check console for details.");
        } finally {
            setIsTranslating(false);
        }
    };

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <form action={action} className="space-y-8 max-w-2xl">
            {/* Hidden inputs to ensure data is submitted even if Tabs are unmounted */}
            <input type="hidden" name="name" value={formData.name} />
            <input type="hidden" name="description" value={formData.description} />
            <input type="hidden" name="benefits" value={formData.benefits} />

            <input type="hidden" name="name_de" value={formData.name_de} />
            <input type="hidden" name="description_de" value={formData.description_de} />
            <input type="hidden" name="benefits_de" value={formData.benefits_de} />

            <input type="hidden" name="name_fr" value={formData.name_fr} />
            <input type="hidden" name="description_fr" value={formData.description_fr} />
            <input type="hidden" name="benefits_fr" value={formData.benefits_fr} />

            <input type="hidden" name="name_it" value={formData.name_it} />
            <input type="hidden" name="description_it" value={formData.description_it} />
            <input type="hidden" name="benefits_it" value={formData.benefits_it} />

            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input
                        id="duration"
                        name="duration"
                        type="number"
                        defaultValue={initialData?.duration || 60}
                        min="15"
                        step="15"
                        required
                        autoComplete="off"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="price">Price (CHF)</Label>
                    <Input
                        id="price"
                        name="price"
                        type="number"
                        defaultValue={initialData?.price}
                        min="0"
                        step="0.01"
                        required
                        autoComplete="off"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="specialtyId">Specialty</Label>
                <Select name="specialtyId" defaultValue={initialData?.specialtyId} required>
                    <SelectTrigger id="specialtyId">
                        <SelectValue placeholder="Select a specialty" />
                    </SelectTrigger>
                    <SelectContent>
                        {specialties.map((specialty) => (
                            <SelectItem key={specialty.id} value={specialty.id}>
                                {specialty.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex items-center justify-between pt-4">
                <h3 className="font-serif text-lg font-medium">Content & Localization</h3>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAutoTranslate}
                    disabled={isTranslating}
                    className="border-primary/20 hover:bg-primary/5 text-primary"
                >
                    {isTranslating ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Sparkles className="mr-2 h-4 w-4" />
                    )}
                    {isTranslating ? "Translating..." : "Auto-Translate"}
                </Button>
            </div>

            <Tabs defaultValue="en" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-4">
                    <TabsTrigger value="en">English (Master)</TabsTrigger>
                    <TabsTrigger value="de">German</TabsTrigger>
                    <TabsTrigger value="fr">French</TabsTrigger>
                    <TabsTrigger value="it">Italian</TabsTrigger>
                </TabsList>

                {/* English Content */}
                <TabsContent value="en" className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Treatment Name (EN)</Label>
                        <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            placeholder="e.g., Dental Cleaning"
                            required
                            autoComplete="off"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description (EN)</Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={(e) => handleChange("description", e.target.value)}
                            placeholder="Detailed description..."
                            className="h-32"
                            autoComplete="off"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="benefits">Benefits (EN)</Label>
                        <Textarea
                            id="benefits"
                            name="benefits"
                            value={formData.benefits}
                            onChange={(e) => handleChange("benefits", e.target.value)}
                            placeholder="Benefit 1, Benefit 2, Benefit 3"
                            className="h-24"
                            autoComplete="off"
                        />
                        <p className="text-xs text-muted-foreground">Comma-separated list.</p>
                    </div>
                </TabsContent>

                {/* German Content */}
                <TabsContent value="de" className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name_de">Treatment Name (DE)</Label>
                        <Input
                            id="name_de"
                            name="name_de"
                            value={formData.name_de}
                            onChange={(e) => handleChange("name_de", e.target.value)}
                            placeholder="z.B., Zahnreinigung"
                            autoComplete="off"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description_de">Description (DE)</Label>
                        <Textarea
                            id="description_de"
                            name="description_de"
                            value={formData.description_de}
                            onChange={(e) => handleChange("description_de", e.target.value)}
                            className="h-32"
                            autoComplete="off"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="benefits_de">Benefits (DE)</Label>
                        <Textarea
                            id="benefits_de"
                            name="benefits_de"
                            value={formData.benefits_de}
                            onChange={(e) => handleChange("benefits_de", e.target.value)}
                            className="h-24"
                            autoComplete="off"
                        />
                    </div>
                </TabsContent>

                {/* French Content */}
                <TabsContent value="fr" className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name_fr">Treatment Name (FR)</Label>
                        <Input
                            id="name_fr"
                            name="name_fr"
                            value={formData.name_fr}
                            onChange={(e) => handleChange("name_fr", e.target.value)}
                            placeholder="ex., Nettoyage dentaire"
                            autoComplete="off"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description_fr">Description (FR)</Label>
                        <Textarea
                            id="description_fr"
                            name="description_fr"
                            value={formData.description_fr}
                            onChange={(e) => handleChange("description_fr", e.target.value)}
                            className="h-32"
                            autoComplete="off"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="benefits_fr">Benefits (FR)</Label>
                        <Textarea
                            id="benefits_fr"
                            name="benefits_fr"
                            value={formData.benefits_fr}
                            onChange={(e) => handleChange("benefits_fr", e.target.value)}
                            className="h-24"
                            autoComplete="off"
                        />
                    </div>
                </TabsContent>

                {/* Italian Content */}
                <TabsContent value="it" className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name_it">Treatment Name (IT)</Label>
                        <Input
                            id="name_it"
                            name="name_it"
                            value={formData.name_it}
                            onChange={(e) => handleChange("name_it", e.target.value)}
                            placeholder="es., Pulizia dentale"
                            autoComplete="off"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description_it">Description (IT)</Label>
                        <Textarea
                            id="description_it"
                            name="description_it"
                            value={formData.description_it}
                            onChange={(e) => handleChange("description_it", e.target.value)}
                            className="h-32"
                            autoComplete="off"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="benefits_it">Benefits (IT)</Label>
                        <Textarea
                            id="benefits_it"
                            name="benefits_it"
                            value={formData.benefits_it}
                            onChange={(e) => handleChange("benefits_it", e.target.value)}
                            className="h-24"
                            autoComplete="off"
                        />
                    </div>
                </TabsContent>
            </Tabs>

            <SubmitButton />
        </form>
    );
}
