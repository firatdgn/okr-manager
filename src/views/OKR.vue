<template>
    <Quarter
        @increaseCurrentQuarter="increaseCurrentQuarter"
        @decreaseCurrentQuarter="decreaseCurrentQuarter"
        :start-date="currentOkr.startDate"
        :end-date="currentOkr.finishDate"
        :quarter="currentOkr.quarter"
    ></Quarter>
    <Objective
        v-for="(objective, index) of currentOkr.objectives"
        :key="objective.id"
        :order="index + 1"
        :objective="objective"
        :bhagId="currentBhag"
        :quarterId="currentOkr.id"
        @deleteObjective="deleteObjective"
        @resetBhags="resetBhags"
    ></Objective>
    <CreateNewButton
        v-if="showCreateNewButton"
        @createNew="toggleNewOkr"
        text="Objective"
    ></CreateNewButton>
    <CreateNewTarget
        v-else
        @cancel="toggleNewOkr"
        @store="storeNewOkr"
        type="objective"
        target-type="objective"
        :number="currentOkr.objectives.length + 1"
    ></CreateNewTarget>
</template>

<script>
import Quarter from "../components/Quarter.vue";
import Objective from "../components/Objective.vue";
import CreateNewButton from "../components/CreateNewButton.vue";
import { ref } from "@vue/reactivity";
import CreateNewTarget from "../components/CreateNewTarget.vue";
import { isInRange } from "../helpers/generic";
import { computed } from "@vue/runtime-core";
import Form from "../helpers/form";
export default {
    components: { Quarter, Objective, CreateNewButton, CreateNewTarget },
    setup() {
        let okrs;
        let currentOkrIndex;
        let currentBhag;
        let bhags = ref(JSON.parse(sessionStorage.getItem("okr")));
        function resetBhags() {
            bhags.value = JSON.parse(sessionStorage.getItem("okr"));
            let oldCurrentOkrIndex = currentOkrIndex;
            setOkrs();
            currentOkrIndex = oldCurrentOkrIndex;
            currentOkr.value = okrs.value[currentOkrIndex.value];
        }
        function setOkrs() {
            for (let bhag of bhags.value) {
                currentOkrIndex = ref(0);
                for (let quarter of bhag.quarters) {
                    if (
                        isInRange(
                            Date.now(),
                            new Date(quarter.startDate).getTime(),
                            new Date(quarter.finishDate).getTime()
                        )
                    ) {
                        okrs = computed(() => bhag.quarters);
                        currentBhag = bhag.id;
                        break;
                    }
                    currentOkrIndex.value++;
                }
                if (okrs) {
                    break;
                }
            }
        }
        setOkrs();
        if (!okrs) {
            currentBhag = bhags.value[0].id;
            okrs = computed(() => bhags.value[0].quarters);
            currentOkrIndex.value = 0;
        }
        let currentOkr = ref(okrs.value[currentOkrIndex.value]);
        let showCreateNewButton = ref(true);
        function increaseCurrentQuarter() {
            if (okrs.value.length - 1 === currentOkrIndex.value) {
                currentOkrIndex.value = 0;
            } else {
                currentOkrIndex.value++;
            }
            currentOkr.value = okrs.value[currentOkrIndex.value];
        }
        function decreaseCurrentQuarter() {
            if (currentOkrIndex.value === 0) {
                currentOkrIndex.value = okrs.value.length - 1;
            } else {
                currentOkrIndex.value--;
            }
            currentOkr.value = okrs.value[currentOkrIndex.value];
        }
        function toggleNewOkr() {
            showCreateNewButton.value = !showCreateNewButton.value;
        }
        function storeNewOkr(newOkr) {
            toggleNewOkr();
            new Form(
                `bhags/${currentBhag}/quarters/${currentOkr.value.id}/objectives`,
                {
                    objectiveContent: newOkr.value,
                }
            )
                .post()
                .then((response) =>
                    Form.getBhags().then((response) => resetBhags())
                );
        }
        function deleteObjective(deletedObjective) {
            if (confirm("Do you really want to delete this Objective?")) {
                new Form(
                    `bhags/${currentBhag}/quarters/${currentOkr.value.id}/objectives/${deletedObjective.value.id}`
                )
                    .delete()
                    .then((response) =>
                        Form.getBhags().then((response) => resetBhags())
                    );
            }
        }
        return {
            okrs,
            currentOkr,
            showCreateNewButton,
            increaseCurrentQuarter,
            decreaseCurrentQuarter,
            toggleNewOkr,
            storeNewOkr,
            deleteObjective,
            currentBhag,
            resetBhags,
        };
    },
};
</script>

<style>
</style>