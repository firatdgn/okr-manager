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
export default {
    components: { Quarter, Objective, CreateNewButton, CreateNewTarget },
    setup() {
        let currentOkrIndex = 0;
        let okrs = ref([
            {
                quarter: "Q1",
                startDate: "2022-01-01",
                endDate: "2022-04-30",
                objectives: [
                    {
                        id: 1,
                        content: "lorem ipsum",
                        keyResults: [
                            {
                                id: 1,
                                content: "lorem ipsum",
                                crfs: [
                                    {
                                        date: "2022-01-01",
                                        current: 89,
                                    },
                                ],
                            },
                            {
                                id: 2,
                                content: "lorem ipsum",
                            },
                        ],
                    },
                    { id: 2, content: "lorem ipsum", keyResults: [] },
                ],
            },
            {
                quarter: "Q2",
                startDate: "2022-04-01",
                endDate: "2022-07-30",
                objectives: [],
            },
        ]);
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
.key-result:not(:last-child) {
    margin-bottom: 2%;
}
</style>