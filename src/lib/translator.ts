import { translate } from 'google-translate-api-x';

interface TranslationResult {
    de: string;
    fr: string;
    it: string;
}

export async function translateText(text: string): Promise<TranslationResult> {
    if (!text) return { de: "", fr: "", it: "" };

    try {
        // Run translations in parallel for speed
        const [resDe, resFr, resIt] = await Promise.all([
            translate(text, { to: 'de' }),
            translate(text, { to: 'fr' }),
            translate(text, { to: 'it' })
        ]);

        return {
            de: resDe.text,
            fr: resFr.text,
            it: resIt.text,
        };
    } catch (error) {
        console.error("Translation error:", error);
        // Fallback or empty on error
        return { de: "", fr: "", it: "" };
    }
}

export async function translateList(items: string[]): Promise<{ de: string[], fr: string[], it: string[] }> {
    if (!items || items.length === 0) return { de: [], fr: [], it: [] };

    try {
        // We can translate item by item or join them. Joining is usually better for context but 
        // for benefits list, item by item might suffice or be safer to parse back.
        // Let's do item by item to be safe, but in parallel.

        // This might hit rate limits if too many items. 
        // Strategy: Join with " | " separator, translate, split.
        const joinedText = items.join(" | ");

        const [resDe, resFr, resIt] = await Promise.all([
            translate(joinedText, { to: 'de' }),
            translate(joinedText, { to: 'fr' }),
            translate(joinedText, { to: 'it' })
        ]);

        return {
            de: resDe.text.split("|").map(s => s.trim()),
            fr: resFr.text.split("|").map(s => s.trim()),
            it: resIt.text.split("|").map(s => s.trim()),
        };

    } catch (error) {
        console.error("List translation error:", error);
        return { de: [], fr: [], it: [] };
    }
}
