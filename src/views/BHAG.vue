<template>
    <BHAG
        v-for="(bhag, key) of bhags"
        :bhag="bhag"
        :key="bhag.id"
        :order="key + 1"
        @deleteBhag="deleteBhag"
    ></BHAG>
    <CreateNewButton
        v-if="showCreateNewButton"
        @createNew="toggleNewBhag"
        text="BHAG"
    ></CreateNewButton>
    <CreateNewTarget
        v-else
        @cancel="toggleNewBhag"
        @store="storeNewBhag"
        type="bhag"
        :number="bhags.length + 1"
    ></CreateNewTarget>
</template>

<script>
import { ref } from "@vue/reactivity";
import BHAG from "../components/BHAG.vue";
import CreateNewTarget from "../components/CreateNewTarget.vue";
import CreateNewButton from "../components/CreateNewButton.vue";
export default {
    components: {
        BHAG,
        CreateNewTarget,
        CreateNewButton,
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

        let showCreateNewButton = ref(true);
        function toggleNewBhag() {
            showCreateNewButton.value = !showCreateNewButton.value;
        }
        function storeNewBhag(newBhag) {
            toggleNewBhag();
            bhags.value.push({
                //TODO: add here id which comes from db
                id: bhags.value.length,
                content: newBhag,
                quarters: [],
            });
        }
        return {
            bhags,
            deleteBhag,
            showCreateNewButton,
            toggleNewBhag,
            storeNewBhag,
        };
    },
};
</script>

<style>
</style>
