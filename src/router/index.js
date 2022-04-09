import { createWebHistory, createRouter } from "vue-router";
import OKR from "/src/components/OKR.vue";

const routes = [
    {
        path: "/",
        name: "OKR",
        component: OKR,
    },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});
