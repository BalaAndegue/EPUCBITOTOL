import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
    // Ensure locale is defined, default to 'fr' if undefined
    const safeLocale = locale || 'fr';

    return {
        locale: safeLocale,
        messages: (await import(`./messages/${safeLocale}.json`)).default
    };
});
