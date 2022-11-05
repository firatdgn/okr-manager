<template>
    <div v-if="isLoggedIn" class="columns">
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
    <Login @loggedIn="isLoggedIn = true" v-else></Login>
</template>

<script>
import Menu from "./views/Menu.vue";
import Login from "./views/Login.vue";
import { ref } from "vue";
import { routes } from "./router/index.js";

export default {
    name: "App",
    components: { Menu, Login },
    setup() {
        const menuItems = ref(routes);
        let isLoggedIn = ref(false);
        return {
            menuItems,
            isLoggedIn,
        };
    },
};
</script>
