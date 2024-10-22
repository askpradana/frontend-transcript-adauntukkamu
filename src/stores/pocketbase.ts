import { defineStore } from "pinia"
import PocketBase from 'pocketbase';
import { ref, computed } from 'vue'

export const usePocketbaseStore = defineStore('pocketbase', () => {
    const baseUrl = import.meta.env.VITE_POCKETBASE_URL
    console.log('PocketBase URL:', baseUrl)
    const pb = new PocketBase(baseUrl)

    const currentUser = computed(() => pb.authStore.model)

    const doLogin = async () => {
        try {
            const authData = await pb.collection('users').authWithOAuth2({ provider: 'google' });
            const data = {
                "name": authData.meta!.name,
            };
            await pb.collection('users').update(pb.authStore.model!.id, data);
        } catch (error) {
            if (error instanceof Error) {
                console.error("Failed to update username:", error.message);
            } else {
                console.error("An unknown error occurred:", error);
            }
        }
    }

    const doLogout = async () => {
        pb.authStore.clear();
    }

    return { pb, doLogin, doLogout, currentUser }
})
