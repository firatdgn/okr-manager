<template>
    <Quarter
        @increaseCurrentQuarter="increaseCurrentQuarter"
        @decreaseCurrentQuarter="decreaseCurrentQuarter"
        :start-date="currentOkr.startDate"
        :end-date="currentOkr.endDate"
        :quarter="currentOkr.quarter"
    ></Quarter>
    <Objective
        v-for="(objective, index) of currentOkr.objectives"
        :key="objective.id"
        :order="index + 1"
        :objective="objective"
        @deleteObjective="deleteObjective"
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
import { useOkrStore } from "../store/Okr";
import { isInRange } from "../helpers/generic";
export default {
    components: { Quarter, Objective, CreateNewButton, CreateNewTarget },
    setup() {
        let okrs;
        let currentOkrIndex;
        const store = useOkrStore();
        let bhags = store.bhags;
        for (let bhag of bhags) {
            currentOkrIndex = 0;
            for (let quarter of bhag.quarters) {
                if (
                    isInRange(
                        Date.now(),
                        new Date(quarter.startDate).getTime(),
                        new Date(quarter.endDate).getTime()
                    )
                ) {
                    okrs = ref(bhag.quarters);
                    break;
                }
                currentOkrIndex++;
            }
            if (okrs) {
                break;
            }
        }
        if (!okrs) {
            okrs = ref(store.bhags[0].quarters);
            currentOkrIndex = 0;
        }
        let currentOkr = ref(okrs.value[currentOkrIndex]);
        let showCreateNewButton = ref(true);
        function increaseCurrentQuarter() {
            if (okrs.value.length - 1 === currentOkrIndex) {
                currentOkrIndex = 0;
            } else {
                currentOkrIndex++;
            }
            currentOkr.value = okrs.value[currentOkrIndex];
        }
        function decreaseCurrentQuarter() {
            if (currentOkrIndex === 0) {
                currentOkrIndex = okrs.value.length - 1;
            } else {
                currentOkrIndex--;
            }
            currentOkr.value = okrs.value[currentOkrIndex];
        }
        function toggleNewOkr() {
            showCreateNewButton.value = !showCreateNewButton.value;
        }
        function storeNewOkr(newOkr) {
            toggleNewOkr();
            currentOkr.value.objectives.push({
                //TODO: add here id which comes from db
                id:
                    `${currentOkr.value.quarter.split("Q")[1]}` +
                    (currentOkr.value.objectives.length + 1),
                content: newOkr,
                keyResults: [],
            });
        }
        function deleteObjective(deletedObjective) {
            if (confirm("Do you really want to delete this Objective?")) {
                currentOkr.value.objectives =
                    currentOkr.value.objectives.filter(
                        (elem) => elem.id !== deletedObjective.value.id
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
        };
    },
};
</script>

<style>
</style>