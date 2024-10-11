<script>
import { ref } from "vue";
import getUser from "../composables/getUser";
import { getTimestamp } from "../firebase/config";

import useCollection from "../composables/collection";

export default {
    setup() {
        const message = ref("");
        const user = getUser();
        const { errorMsg, addDoc } = useCollection("messages");
        const handelSendMessage = async () => {
            if (message.value.trim() === "") return;

            const chatMsg = {
                message: message.value,
                time: Date.now(),
                name: user.value.displayName,
                createdAt: getTimestamp(),
            };

            await addDoc(chatMsg);

            if (!errorMsg.value) {
                message.value = "";
            }
        };

        return { message, handelSendMessage, errorMsg };
    },
};
</script>

<template>
    <form class="stack">
        <textarea
            @keydown.enter.prevent="handelSendMessage"
            placeholder="Enter your message"
            v-model="message"
        >
        </textarea>
        <button
            @click.prevent="handelSendMessage"
            class="send-message"
            type="submit"
        >
            send
        </button>
    </form>
    <div class="error-msg" v-if="errorMsg">{{ errorMsg }}</div>
</template>

<style scoped>
.stack {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
    margin-top: 10px;
}

textarea {
    /* width: 500px; */
    flex-grow: 1;
    resize: none;
    border-radius: 5px;
    border: 1px solid #ddd;
    padding: 6px 10px 0px;
    height: 35px;
}

.send-message {
    width: 100px;
    height: 35px;
    padding: 2px 10px;
    font-size: 16px;
    border: 1px solid #9b999a;
    cursor: pointer;
    color: #4e4a44;
    transition: 0.35s all ease;
    border-radius: 4px;
}

.send-message:hover {
    background-color: #f5903e;
    color: white;
    border-color: rgb(255, 193, 193);
}

.error-msg {
    color: rgb(234, 68, 68);
}
</style>
