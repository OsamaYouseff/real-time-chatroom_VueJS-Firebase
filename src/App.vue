<script>
import Navbar from "./components/Navbar.vue";

export default {
    components: { Navbar },
};
</script>

<template>
    <div class="container">
        <Navbar />
        <router-view />
    </div>
</template>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    background: linear-gradient(0, #f0e6f2, #fafdde);
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 10px 30px;
    height: 100vh;
    overflow-x: hidden;
}

@media (max-width: 767px) {
    .container {
        padding: 10px;
    }
}
</style>
