<script>
import Spinner from "../components/Spinner.vue";
import NewMessageSender from "../components/NewMessageSender.vue";
import MessagesDialog from "../components/MessagesDialog.vue";

export default {
    name: "Chatroom",
    components: { Spinner, NewMessageSender, MessagesDialog },
    setup() {},
};
</script>

<template>
    <div class="chatroom">
        <MessagesDialog />
        <NewMessageSender />
    </div>
</template>

<style scoped>
.chatroom {
    display: grid;
    place-content: center;
    margin: auto;
    box-shadow: 0px 0px 5px 0.5px rgba(0, 0, 0, 0.15);
    border-radius: 5px;
    padding: 20px;
    background: white;
    height: 90%;
}

@media (max-width: 767px) {
    .chatroom {
        padding: 10px;
    }
}
</style>
