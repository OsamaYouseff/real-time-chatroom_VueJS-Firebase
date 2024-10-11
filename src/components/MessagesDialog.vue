<script>
import getCollection from "../composables/getCollection";
import Spinner from "./Spinner.vue";
import { formatDistanceToNow } from "date-fns";
import { computed, onUpdated, ref } from "vue";
import getUser from "../composables/getUser";

export default {
    components: { Spinner },
    setup() {
        const { documents, errorMsg, getDocs } = getCollection("messages");
        const user = getUser();
        getDocs();

        const formattedMessages = computed(() => {
            if (documents.value) {
                return documents.value.map((doc) => {
                    return {
                        ...doc,
                        createdAt: formatDistanceToNow(doc.createdAt.toDate()),
                    };
                });
            }
        });

        const messages = ref(null);

        //// auto scroll to bottom
        onUpdated(() => {
            messages.value.scrollTop = messages.value.scrollHeight;
        });

        return { documents, errorMsg, formattedMessages, user, messages };
    },
};
</script>
<template>
    <div class="dialog">
        <span v-if="errorMsg">{{ errorMsg }}</span>
        <div
            v-if="!documents.length"
            style="
                text-align: center;
                height: 100%;
                display: grid;
                place-content: center;
            "
        >
            <spinner />
        </div>
        <div class="messages-container" ref="messages" v-else>
            <div v-for="doc in formattedMessages" :key="doc.id">
                <div
                    class="message"
                    :class="{ me: doc.name === user.displayName }"
                >
                    <span class="sender">{{
                        doc.name.length > 10
                            ? doc.name.slice(0, 7) + "..."
                            : doc.name
                    }}</span>
                    <span class="content">{{ doc.message }}</span>
                    <div class="time">
                        {{ doc.createdAt }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.dialog {
    background: linear-gradient(180deg, #f0e6f2, #fafdde);
    width: 80vw;
    max-width: 1100px;
    height: 100%;
    min-height: 400px;
    padding: 10px 5px;
    border: 1px solid #ddd;
    border-radius: 5px;
}

.messages-container {
    max-height: 70vh;
    overflow-y: auto;
}

.message {
    padding: 0px 10px;
    border-radius: 5px;
    margin-bottom: 15px;
    font-size: 14px;
    display: flex;
    align-items: flex-end;
    gap: 5px;
    direction: rtl;
}

.message.me {
    direction: ltr;
}

.message .sender {
    display: inline-block;
    min-width: 50px;
    font-size: 12px;
    font-weight: bold;
}
.message.me .sender {
    /* background: -webkit-linear-gradient(45deg, #060074, #00ad65 80%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent; */
    display: none;
}
.message .content {
    padding: 0px 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
    background: white;
    width: fit-content;
    font-size: 14px;
    direction: ltr;
}

.message.me .content {
    background: linear-gradient(0, #f0e6f2, #fafdde);
    border-color: rgb(223, 105, 129);
    color: rgb(147, 19, 189);
}

.time {
    font-size: 11px;
}

@media (max-width: 500px) {
    .dialog {
        min-width: 90vw;
        max-width: 100% !important;
        padding: 10px 0px;
    }
    .message .sender {
        font-size: 10px;
    }
    .message .content {
        font-size: 12px;
    }
    .time {
        font-size: 9px;
    }
}
</style>
