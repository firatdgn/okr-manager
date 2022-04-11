<template>
    <Quarter
        @increaseCurrentQuarter="increaseCurrentQuarter"
        @decreaseCurrentQuarter="decreaseCurrentQuarter"
        :start-date="currentOkr.startDate"
        :end-date="currentOkr.endDate"
        :quarter="currentOkr.quarter"
    ></Quarter>
    <Objective></Objective>
</template>

<script>
import Quarter from "../components/Quarter.vue";
import Objective from "../components/Objective.vue";
import { ref } from "@vue/reactivity";
export default {
    components: { Quarter, Objective },
    setup() {
        let currentOkrIndex = 0;
        let okrs = ref([
            {
                quarter: "Q1",
                startDate: "2022-01-01",
                endDate: "2022-04-30",
                objectives: [
                    { index: 1, content: "lorem ipsum", keyResults: [] },
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

        return {
            okrs,
            currentOkr,
            increaseCurrentQuarter,
            decreaseCurrentQuarter,
        };
    },
};
</script>

<style>
.objective:not(:first-child) {
    margin-top: 2em;
}
</style>