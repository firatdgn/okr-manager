<template>
    <div
        class="
            is-flex is-justify-content-space-between is-align-items-baseline
            key-result
        "
    >
        <div
            class="box is-flex-grow-3 is-flex is-justify-content-space-between"
        >
            <div
                class="
                    key-result-number
                    is-flex is-justify-content-center is-align-items-center
                "
            >
                KR - {{ order }}
            </div>
            <div class="key-result-content is-flex-grow-3">
                <input
                    class="input"
                    type="text"
                    v-if="keyResult.isEditing"
                    v-model="keyResult.content"
                    @keydown.enter="toggleEditKeyResult"
                    @keydown.esc="toggleEditKeyResult"
                />
                <span v-else>{{ keyResult.content }}</span>
            </div>
            <div
                class="
                    key-result-actions
                    is-flex is-justify-content-center is-align-items-center
                    pr-3
                "
            >
                <span
                    class="icon is-medium is-clickable"
                    @click="toggleEditKeyResult"
                >
                    <i class="fa-solid fa-lg fa-pen"></i>
                </span>
                <span
                    class="icon is-medium is-clickable"
                    v-if="keyResult.isEditing"
                    @click="toggleEditKeyResult($event, true)"
                >
                    <i class="fa-solid fa-lg fa-xmark"></i>
                </span>
                <span
                    class="icon is-medium is-clickable"
                    v-else
                    @click="deleteKeyResult"
                >
                    <i class="fa-solid fa-lg fa-trash"></i>
                </span>
                <span class="icon is-medium" v-if="false">
                    <i class="fa-solid fa-lg fa-angle-up"></i>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
    props: ["keyResult", "order"],
    setup(props, context) {
        let keyResult = ref(props.keyResult);
        function deleteKeyResult() {
            context.emit("deleteKeyResult", keyResult);
        }
        let oldContent = keyResult.value.content;
        function toggleEditKeyResult(e, isValueSame = false) {
            if (e.keyCode === 27 || isValueSame) {
                keyResult.value.content = oldContent;
            } else {
                oldContent = keyResult.value.content;
            }
            keyResult.value.isEditing = !keyResult.value.isEditing;
        }
        return {
            keyResult,
            deleteKeyResult,
            toggleEditKeyResult,
        };
    },
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
.key-result-number {
    border-right: solid 1px #f7f8fa;
    padding: 1.25em;
    color: #5ae1c3;
    width: 10%;
    text-align: center;
}
.key-result-content {
    padding: 1.25em;
}
.fa-pen {
    color: #4d74ff;
}
.fa-trash,
.fa-xmark {
    color: #ff4d4d;
}
.fa-angle-up {
    color: rgba(0, 0, 0, 0.3);
}
</style>