<template>
    <div
        class="
            is-flex is-justify-content-space-between is-align-items-baseline
            objective
        "
    >
        <div
            class="box is-flex-grow-3 is-flex is-justify-content-space-between"
        >
            <div
                class="
                    objective-number
                    is-flex is-justify-content-center is-align-items-center
                "
            >
                O - 1
            </div>
            <div class="objective-content is-flex-grow-3">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error
                sint qui ullam ratione beatae corporis. Quod nostrum harum
                eveniet magni voluptatibus minima eligendi suscipit id deserunt
                reprehenderit sapiente, maiores modi.
            </div>
            <div
                class="
                    objective-actions
                    is-flex is-justify-content-center is-align-items-center
                    pr-3
                "
            >
                <span class="icon is-medium">
                    <i class="fa-solid fa-lg fa-pen"></i>
                </span>
                <span class="icon is-medium">
                    <i class="fa-solid fa-lg fa-trash"></i>
                </span>
                <span class="icon is-medium">
                    <i class="fa-solid fa-lg fa-angle-up"></i>
                </span>
            </div>
        </div>
    </div>
    <div class="key-results">
        <KeyResult></KeyResult>
        <KeyResult></KeyResult>
    </div>
</template>

<script>
import KeyResult from "./KeyResult.vue";
export default {
    components: { KeyResult },
};
</script>

<style scoped>
.box {
    margin-left: 2.7%;
    margin-right: 2.7%;
    padding: 0;
    font-weight: 600;
    font-size: 18px;
}
.objective-number {
    border-right: solid 1px #f7f8fa;
    padding: 1.25em;
    color: #ff8a00;
    width: 10%;
    text-align: center;
}
.objective-content {
    padding: 1.25em;
}
.fa-pen {
    color: #4d74ff;
}
.fa-trash {
    color: #ff4d4d;
}
.fa-angle-up {
    color: rgba(0, 0, 0, 0.3);
}
.key-results {
    padding-top: 2em;
    padding-bottom: 2em;
    padding-left: 2em;
    background-color: rgba(196, 196, 196, 0.1);
    margin-left: 2.7%;
    margin-right: 2.7%;
}
.key-results div:not(:last-child) {
    margin-bottom: 2em;
}
</style>