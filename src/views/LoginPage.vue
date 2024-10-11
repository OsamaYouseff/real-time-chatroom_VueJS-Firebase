<script>
import { ref } from "vue";
import login from "../composables/login";
import { useRouter } from "vue-router";
import { projectAuth } from "../firebase/config";
export default {
    setup() {
        const { loginUser, errorMsg } = login();
        const router = useRouter();
        ///refs
        const email = ref("");
        const password = ref("");

        const handelLogin = async () => {
            await loginUser(email.value, password.value);

            if (errorMsg.value === null) {
                // console.log("user logged in successfully");

                router.push({ name: "Chatroom" });
            }
        };

        return { email, password, handelLogin, errorMsg };
    },
};
</script>

<template lang="">
    <div class="wrapper">
        <h1>Login Form</h1>
        <form class="auth-form" @submit.prevent="handelLogin">
            <input required type="email" placeholder="email" v-model="email" />
            <input
                required
                type="password"
                placeholder="password"
                v-model="password"
            />
            <div class="error">{{ errorMsg }}</div>

            <button class="btn" type="submit">Login</button>
            <div style="margin-top: 10px">
                Doesn't have an account?
                <router-link :to="{ name: 'RegisterPage' }">
                    Register
                </router-link>
            </div>
        </form>
    </div>
</template>

<style>
.wrapper {
    display: grid;
    place-items: center;
    height: 85vh;
}
h1 {
    color: #5f5f5f;
    max-width: fit-content;
}

.auth-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 550px;
    max-width: 100%;
    height: 400px;
    margin: auto;
    padding: 20px;
    border-radius: 7px;
    background: white;
    box-shadow: 2px 2px 2px 0.5px #cbcbcb;
}
input {
    width: 310px;
    flex-flow: 1;
    height: 35px;
    margin: 10px;
    padding: 4px 10px;
    font-size: 16px;
    border: 1px solid #c1a9a9;
    border-radius: 4px;
    transition: 0.35s all ease;
}

.btn {
    width: 310px;
    height: 35px;
    margin: 10px;
    padding: 2px 10px;
    font-size: 16px;
    border: 1px solid #9b999a;
    cursor: pointer;
    color: #4e4446;
    transition: 0.35s all ease;
    border-radius: 4px;
    margin-top: 10px;
    font-weight: 500;
}

.btn:hover {
    background-color: #f5903e;
    color: white;
    border-color: rgb(125, 125, 125);
}
a {
    color: #fd4469;
    font-weight: 500;
    text-align: start;
    padding: 10px 0px;
}

li > a {
    width: 310px;
}
.error {
    color: red;
    font-weight: 500;
    text-align: start;
    width: 310px;
    padding: 10px 0px;
}

@media (max-width: 767px) {
    .auth-form {
        max-width: 350px;
    }
}
</style>
