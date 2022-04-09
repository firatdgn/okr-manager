<template>
    <menu>
        <router-link to="/">Go to Home</router-link>
    </menu>
    <router-view></router-view>
</template>

<script>
import Menu from "./components/Menu.vue";
export default {
    name: "App",
    components: { Menu },
};
</script>
