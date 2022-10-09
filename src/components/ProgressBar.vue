<template>
    <div>
        <progress
            class="progress is-success"
            :value="currentStatus"
            :max="finishedAt"
        >
            {{ currentStatus }}%
        </progress>
    </div>
</template>

<script>
export default {
    props: ["currentStatus", "finishedAt"],
};
</script>

<style>
</style>