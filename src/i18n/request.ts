import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
    // This typically corresponds to the `[locale]` segment
    let locale = await requestLocale;

    // Ensure that a valid locale is used
    if (!locale || !routing.locales.includes(locale as any)) {
        locale = routing.defaultLocale;
    }

    const messages = {
        en: () => import('../messages/en.json'),
        de: () => import('../messages/de.json'),
        fr: () => import('../messages/fr.json'),
        it: () => import('../messages/it.json')
    };

    const messageImport = messages[locale as keyof typeof messages];

    return {
        locale,
        messages: (await messageImport()).default
    };
});
