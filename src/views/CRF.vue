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
        :displayCrfs="true"
        :hideActions="true"
        @deleteObjective="deleteObjective"
    ></Objective>
</template>

<script>
import Quarter from "../components/Quarter.vue";
import Objective from "../components/Objective.vue";
import CreateNewButton from "../components/CreateNewButton.vue";
import { ref } from "@vue/reactivity";
import CreateNewTarget from "../components/CreateNewTarget.vue";
import { isInRange } from "../helpers/generic";
export default {
    components: { Quarter, Objective, CreateNewButton, CreateNewTarget },
    setup() {
        let bhags = ref(JSON.parse(sessionStorage.getItem("okr")));
        let okrs;
        let currentOkrIndex;
        for (let bhag of bhags) {
            currentOkrIndex = 0;
            for (let quarter of bhag.quarters) {
                if (
                    isInRange(
                        Date.now(),
                        new Date(quarter.startDate).getTime(),
                        new Date(quarter.finishDate).getTime()
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
            okrs = ref(bhags[0].quarters);
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
            deleteObjective,
        };
    },
};
</script>

<style>
.key-result:not(:last-child) {
    margin-bottom: 2%;
}
</style>