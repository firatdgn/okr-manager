<template>
    <BHAG
        v-for="(bhag, key) of bhags"
        :bhag="bhag"
        :key="bhag.id"
        :order="key + 1"
        @deleteBhag="deleteBhag"
    ></BHAG>
</template>

<script>
import { ref } from "@vue/reactivity";
import BHAG from "../components/BHAG.vue";
export default {
    components: {
        BHAG,
    },
    setup() {
        let bhags = ref([
            {
                id: 1,
                content: "Lorem ipsum",
                quarters: [
                    {
                        quarter: "Q2",
                        startDate: "2022-04-01",
                        endDate: "2022-07-30",
                    },
                ],
            },
            {
                id: 2,
                content: "Lorem ipsum",
                quarters: [],
            },
            {
                id: 3,
                content: "Lorem ipsum",
                quarters: [],
            },
        ]);
        function deleteBhag(deletedBhag) {
            if (confirm("Do you really want to delete this BHAG?")) {
                bhags.value = bhags.value.filter(
                    (elem) => elem.id !== deletedBhag.value.id
                );
            }
        }
        return {
            bhags,
            deleteBhag,
        };
    },
};
</script>

<style>
</style>
