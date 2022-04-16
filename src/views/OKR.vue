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
        :key="index"
        :objective="objective"
    ></Objective>
    <CreateNewButton
        v-if="createNew"
        @create-new="createNewOkr()"
        text="OKR"
    ></CreateNewButton>
    <CreateNewTarget
        v-else
        @cancel="createNewOkr()"
        type="objective"
        :number="currentOkr.objectives.length + 1"
    ></CreateNewTarget>
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
                        index: 1,
                        content: "lorem ipsum",
                        keyResults: [
                            {
                                index: 1,
                                content: "lorem ipsum",
                            },
                            {
                                index: 2,
                                content: "lorem ipsum",
                            },
                        ],
                    },
                    { index: 2, content: "lorem ipsum", keyResults: [] },
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
        let createNew = ref(true);
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
        function createNewOkr() {
            createNew.value = !createNew.value;
        }
        return {
            okrs,
            currentOkr,
            createNew,
            increaseCurrentQuarter,
            decreaseCurrentQuarter,
            createNewOkr,
        };
    },
};
</script>

<style>
.objective:not(:first-child) {
    margin-top: 2em;
}
</style>