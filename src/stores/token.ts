import { defineStore } from "pinia"
import { ref, computed } from 'vue'

export const useTokenStore = defineStore('token', () => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL;

    const tokenValue = ref(null);
    const errorValue = ref(null);

    const tokenLeft = computed(() => tokenValue.value);
    const errorStatus = computed(() => errorValue.value);

    const checkTokenLeft = async (recordID: string) => {
        try {
            const response = await fetch(`${baseUrl}/token-check`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    recordID: recordID
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const tokenData = await response.json();
            tokenValue.value = tokenData;
            errorValue.value = null;
        } catch (error) {
            errorValue.value = error || 'An error occurred';
        }
    }

    return { tokenLeft, errorStatus, checkTokenLeft };
});
