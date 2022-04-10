import { createWebHistory, createRouter } from "vue-router";
import OKR from "/src/views/OKR.vue";
import BHAG from "/src/views/BHAG.vue";
import CRF from "/src/views/CRF.vue";

export const routes = [
    {
        path: "/",
        name: "OKR",
        icon: "fa-solid fa-list-check",
        component: OKR,
    },
    {
        path: "/bhag",
        name: "BHAG",
        icon: "fa-solid fa-award",
        component: BHAG,
    },
    {
        path: "/crf",
        name: "CRF",
        icon: "fa-solid fa-comments",
        component: CRF,
    },
];

export const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: "is-active",
    routes,
});
