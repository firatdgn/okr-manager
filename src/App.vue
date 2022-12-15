<template>
    <div v-if="isLoggedIn && !isRegistering" class="columns">
        <div class="column is-2 p-5">
            <Menu>
                <li v-for="menuItem of menuItems" :key="menuItem.name">
                    <router-link :to="menuItem.path" class="p-4">
                        <span class="icon">
                            <i :class="menuItem.icon"></i>
                        </span>
                        {{ menuItem.name }}
                    </router-link>
                </li>
            </Menu>
        </div>
        <div class="column is-10 p-5 content">
            <router-view></router-view>
        </div>
    </div>
    <Login
        @loggedIn="isLoggedIn = true"
        @registering="isRegistering = true"
        v-else-if="!isRegistering"
    ></Login>
    <Register
        v-if="isRegistering"
        @registered="isRegistering = false"
        @cancel="isRegistering = false"
    ></Register>
</template>

<script>
import Menu from "./views/Menu.vue";
import Login from "./views/Login.vue";
import { ref } from "vue";
import { routes } from "./router/index.js";
import Register from "./views/Register.vue";

//TODO: support PWA in future

export default {
    name: "App",
    components: { Menu, Login, Register },
    setup() {
        const menuItems = ref(routes);
        const isLoggedIn = ref(false);
        const isRegistering = ref(false);
        return {
            menuItems,
            isLoggedIn,
            isRegistering,
        };
    },
};
</script>
