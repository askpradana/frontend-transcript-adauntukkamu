import posthog from "posthog-js";
import type { App } from 'vue'

// Initialize PostHog
posthog.init(
    import.meta.env.VITE_POSTHOG_SECRET,
    {
        api_host: 'https://us.i.posthog.com',
    }
);

export const posthogPlugin = {
    install: (app: App) => {
        app.config.globalProperties.$posthog = posthog;
    }
};

export { posthog };