import { defineStore } from "pinia";
import { ref } from "vue";

export const useOkrStore = defineStore("okr", () => {
    let bhags = ref(JSON.parse(sessionStorage.getItem("okr")));
    return { bhags };
});
