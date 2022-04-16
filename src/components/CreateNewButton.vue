<template>
    <div class="create-button is-clickable" @click="$emit('createNew')">
        Create New {{ text }}
    </div>
</template>

<script>
export default {
    props: ["text"],
};
</script>

<style scoped>
.create-button {
    display: flex;
    justify-content: center;
    align-content: center;
    border: 1px dashed rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    color: rgba(0, 0, 0, 0.3);
    margin-top: 2.7%;
    margin-left: 2.7%;
    margin-right: 2.7%;
    padding: 1.5%;
    font-weight: 600;
    font-size: 18px;
}
</style>