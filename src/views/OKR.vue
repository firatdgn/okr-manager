<template>
    <Quarter></Quarter>
    <Objective></Objective>
</template>

<script>
import Quarter from "../components/Quarter.vue";
import Objective from "../components/Objective.vue";
export default {
    components: { Quarter, Objective },
};
</script>

<style>
.objective:not(:first-child) {
    margin-top: 2em;
}
</style>