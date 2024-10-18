import { defineStore } from "pinia"
import PocketBase from 'pocketbase';
import { ref } from 'vue'

export const usePocketbaseStore = defineStore('pocketbase', () => {
    const baseUrl = import.meta.env.VITE_POCKETBASE_URL
    const currentUser = ref();
    const pb = new PocketBase(baseUrl)

    const doLogin = async () => {
        try {
            const authData = await pb.collection('users').authWithOAuth2({ provider: 'google' });
            // console.log(pb.authStore.isValid);
            // console.log(pb.authStore.token);
            // console.log(pb.authStore.model);
            // console.log(authData);
            // console.log(authData.meta!.name);
            const data = {
                "name": authData.meta!.name,
            };
            await pb.collection('users').update(pb.authStore.model!.id, data);
            currentUser.value = pb.authStore.model
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
        currentUser.value = null
    }

    return { pb, doLogin, doLogout, currentUser }
})