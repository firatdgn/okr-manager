import { defineStore } from "pinia";
import { ref } from "vue";

export const useOkrStore = defineStore("okr", {
    state: () => {
        return {
            bhags: ref(JSON.parse(sessionStorage.getItem("okr"))),
        };
    },
    actions: {
        resetBhags() {
            this.bhags = ref(JSON.parse(sessionStorage.getItem("okr")));
        },
    },
});
