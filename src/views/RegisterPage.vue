<script>
import { ref } from "vue";
import register from "../composables/register";
import { useRouter } from "vue-router";

export default {
    setup() {
        const { registerUser, errorMsg } = register();

        /// refs
        const displayName = ref("");
        const email = ref("");
        const password = ref("");

        const router = useRouter();

        const handelRegister = async () => {
            await registerUser(displayName.value, email.value, password.value);

            if (errorMsg.value === null) {
                // console.log("user registered successfully");

                router.push({ name: "Chatroom" });
            }
        };

        return { displayName, email, password, handelRegister, errorMsg };
    },
};
</script>

<template>
    <div class="wrapper">
        <h1>Register Form</h1>
        <form class="auth-form" @submit.prevent="handelRegister">
            <input
                required
                type="text"
                placeholder="displayName"
                v-model="displayName"
            />
            <input required type="email" placeholder="email" v-model="email" />
            <input
                required
                type="password"
                placeholder="password"
                v-model="password"
            />
            <div class="error">{{ errorMsg }}</div>
            <button class="btn" type="submit">Register</button>
            <div style="margin-top: 10px">
                Already have an account?
                <router-link :to="{ name: 'LoginPage' }"> Login </router-link>
            </div>
        </form>
    </div>
</template>
