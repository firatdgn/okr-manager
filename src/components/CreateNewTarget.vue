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
                    target-number
                    is-flex is-justify-content-center is-align-items-center
                "
            >
                {{ type.content }} - {{ number }}
            </div>
            <div class="target-content is-flex-grow-3">
                <input
                    class="input"
                    type="text"
                    ref="newTargetInput"
                    @keypress.enter="save"
                    v-model="newTarget"
                />
            </div>
            <div
                class="
                    is-flex is-justify-content-center is-align-items-center
                    pr-3
                "
            >
                <span class="icon is-medium is-clickable" @click="save">
                    <i class="fa-solid fa-lg fa-check"></i>
                </span>
                <span
                    class="icon is-medium is-clickable"
                    @click="$emit('cancel')"
                >
                    <i class="fa-solid fa-lg fa-xmark"></i>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { onMounted } from "vue";
export default {
    props: ["type", "number"],
    setup(props, context) {
        let types = {
            objective: {
                color: "#ff8a00",
                content: "O",
            },
            keyResult: {
                color: "#5ae1c3",
                content: "KR",
            },
            bhag: {
                color: "#ff0000",
                content: "BHAG",
            },
        };
        let type = ref(types[props.type]);

        let newTarget = ref("");
        let newTargetInput = ref(null);
        function save() {
            context.emit("store", newTarget);
        }
        onMounted(() => {
            newTargetInput.value.focus();
        });

        return {
            type,
            newTarget,
            save,
            newTargetInput,
        };
    },
};
</script>

<style scoped>
.box {
    margin-top: 2.7%;
    margin-left: 2.7%;
    margin-right: 2.7%;
    padding: 0;
    font-weight: 600;
    font-size: 18px;
    --target-number-color: v-bind("type.color");
}
.target-number {
    border-right: solid 1px #f7f8fa;
    padding: 1.25em;
    color: var(--target-number-color);
    width: 10%;
    text-align: center;
}
.target-content {
    padding: 1.25em;
}
.fa-check {
    color: #00d1b2;
}
.fa-xmark {
    color: #ff4d4d;
}
</style>