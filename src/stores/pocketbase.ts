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
            console.log(pb.authStore.isValid);
            console.log(pb.authStore.token);
            console.log(pb.authStore.model);
            currentUser.value = pb.authStore.model
        } catch (error) {
            console.log(error);
        }
    }

    const doLogout = async () => {
        pb.authStore.clear();
        currentUser.value = null
    }

    return { pb, doLogin, doLogout, currentUser }
})