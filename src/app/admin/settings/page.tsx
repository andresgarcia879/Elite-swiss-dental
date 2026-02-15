import { Locale } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { updateSetting } from "@/actions/settings";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/db";

async function getSettings() {
    return await prisma.languageContent.findMany();
}

function SettingForm({ locale, label, settingKey, defaultValue }: { locale: string, label: string, settingKey: string, defaultValue: string }) {
    return (
        <form action={async (formData) => {
            "use server"
            await updateSetting(formData)
        }} className="flex gap-4 items-end">
            <div className="space-y-2 w-full">
                <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</Label>
                <input type="hidden" name="key" value={settingKey} />
                <input type="hidden" name="locale" value={locale} />
                <Input
                    name="value"
                    defaultValue={defaultValue}
                    className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus-visible:ring-slate-400"
                />
            </div>
            <Button type="submit" className="bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200">
                Save
            </Button>
        </form>
    );
}

export default async function SettingsPage() {
    const settings = await getSettings();

    const getVal = (key: string, locale: Locale) => {
        return settings.find((s) => s.key === key && s.locale === locale)?.value || "";
    };

    return (
        <div className="space-y-8 max-w-4xl">
            <div>
                <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white">Settings</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-2">Manage clinic details and translations.</p>
            </div>

            <Tabs defaultValue="EN" className="w-full">
                <TabsList className="bg-slate-100 dark:bg-slate-800 p-1 rounded-lg mb-8">
                    <TabsTrigger value="EN" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">English</TabsTrigger>
                    <TabsTrigger value="DE" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">German</TabsTrigger>
                    <TabsTrigger value="FR" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">French</TabsTrigger>
                    <TabsTrigger value="IT" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">Italian</TabsTrigger>
                </TabsList>

                {Object.values(Locale).map((locale) => (
                    <TabsContent key={locale} value={locale} className="space-y-6">
                        <Card className="border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                            <CardHeader className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 pb-4">
                                <CardTitle className="font-serif text-xl text-slate-900 dark:text-white">Contact Information <span className="text-slate-400 text-base font-sans font-normal ml-2">({locale})</span></CardTitle>
                                <CardDescription>Update contact details shown on the website for this language.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 space-y-6">
                                <SettingForm
                                    locale={locale}
                                    label="Clinic Name"
                                    settingKey="clinic_name"
                                    defaultValue={getVal("clinic_name", locale) || "Elite Swiss Dental"}
                                />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <SettingForm
                                        locale={locale}
                                        label="Address Line 1"
                                        settingKey="address_line1"
                                        defaultValue={getVal("address_line1", locale) || "Bahnhofstrasse 10"}
                                    />
                                    <SettingForm
                                        locale={locale}
                                        label="Address Line 2"
                                        settingKey="address_line2"
                                        defaultValue={getVal("address_line2", locale) || "8001 Zurich, Switzerland"}
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <SettingForm
                                        locale={locale}
                                        label="Phone"
                                        settingKey="phone"
                                        defaultValue={getVal("phone", locale) || "+41 44 123 45 67"}
                                    />
                                    <SettingForm
                                        locale={locale}
                                        label="Email"
                                        settingKey="email"
                                        defaultValue={getVal("email", locale) || "info@eliteswiss.ch"}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
}
