<script>
import logout from "../composables/logout";
import getUser from "../composables/getUser";
import { useRouter } from "vue-router";

export default {
    setup() {
        const { logoutUser, errorMsg } = logout();
        const user = getUser();
        const handelLogout = () => {
            logoutUser();

            if (errorMsg.value === null) {
                console.log("user logged out successfully");
            }
        };

        const pathname = window.location.pathname;

        if ((pathname === "/login" || pathname === "/register") && user.value) {
            useRouter().push({ name: "Chatroom" });
        }

        return { logoutUser, errorMsg, handelLogout, user };
    },
};
</script>

<template>
    <header>
        <router-link :to="{ name: 'Chatroom' }">
            <h1>Chatroom</h1>
        </router-link>
        <nav>
            <div v-if="user" class="current-user">
                <p>
                    Hello,
                    <span class="user-name"> {{ user.displayName }} </span>
                </p>
                |
                <span class="user-email">{{ user.email }} </span>
                |
            </div>
            <ul v-if="user">
                <li>
                    <router-link @click="handelLogout" to="">
                        Logout
                    </router-link>
                </li>
            </ul>
            <ul v-else>
                <li>
                    <router-link :to="{ name: 'RegisterPage' }">
                        Register
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'LoginPage' }">Login</router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<style scoped>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 10px auto;
    padding: 0 10px;
}

header h1 {
    color: #ea9292;
    font-size: 28px;
}
header a {
    color: #f5903e;
    text-decoration: none;
    transition: 0.3s all ease;
    border-bottom: 2px solid transparent;
    padding: 0;
}

nav {
    display: flex;
    align-items: center;
    gap: 20px;
}

ul a:hover {
    color: #ea4545;
    border-bottom-color: #e85252;
}
header a header a.router-link-active {
    color: #444;
    font-weight: bold;
}

ul {
    display: flex;
    gap: 14px;
    list-style: none;
}

.current-user {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 10px;
    list-style: none;
    padding: 10px 0px;
    color: #7a7cf7;
    font-size: 15px;
}

.user-name,
.user-email {
    font-weight: bolder;
}

@media (max-width: 767px) {
    header {
        padding: 0 15px;
    }
    .current-user {
        font-size: 14px;
    }
}

@media (max-width: 500px) {
    header {
        flex-direction: column;
    }
    .current-user {
        font-size: 13px;
    }
}
</style>
