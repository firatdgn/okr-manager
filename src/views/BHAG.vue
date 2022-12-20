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
        target-type="bhag"
        :number="bhags.length + 1"
    ></CreateNewTarget>
</template>

<script>
import { ref } from "@vue/reactivity";
import BHAG from "../components/BHAG.vue";
import CreateNewTarget from "../components/CreateNewTarget.vue";
import CreateNewButton from "../components/CreateNewButton.vue";
import Form from "../helpers/form";
export default {
    components: {
        BHAG,
        CreateNewTarget,
        CreateNewButton,
    },
    setup() {
        const bhags = ref(JSON.parse(sessionStorage.getItem("okr")));
        function resetBhags() {
            bhags.value = JSON.parse(sessionStorage.getItem("okr"));
        }
        function deleteBhag(deletedBhag) {
            if (confirm("Do you really want to delete this BHAG?")) {
                new Form(`bhags/${deletedBhag.value.id}`).delete().then(() => {
                    Form.getBhags().then((response) => resetBhags());
                });
            }
        }

        let showCreateNewButton = ref(true);
        function toggleNewBhag() {
            showCreateNewButton.value = !showCreateNewButton.value;
        }
        function storeNewBhag(newBhag) {
            toggleNewBhag();
            new Form("bhags", {
                bhagContent: newBhag.value,
            })
                .post()
                .then(() => {
                    Form.getBhags().then((response) => resetBhags());
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
