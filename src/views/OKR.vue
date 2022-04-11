<template>
    <Quarter
        @increaseCurrentQuarter="increaseCurrentQuarter"
        @decreaseCurrentQuarter="decreaseCurrentQuarter"
        :start-date="okr[currentQuarterIndex].startDate"
        :end-date="okr[currentQuarterIndex].endDate"
        :quarter="okr[currentQuarterIndex].quarter"
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
        let currentQuarterIndex = ref(0);
        let okr = ref([
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

        function increaseCurrentQuarter() {
            if (okr.value.length - 1 === currentQuarterIndex.value) {
                return (currentQuarterIndex.value = 0);
            }
            currentQuarterIndex.value++;
        }
        function decreaseCurrentQuarter() {
            if (currentQuarterIndex.value === 0) {
                return (currentQuarterIndex.value = okr.value.length - 1);
            }
            currentQuarterIndex.value--;
        }

        return {
            okr,
            currentQuarterIndex,
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