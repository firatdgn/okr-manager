<template>
    <div
        class="
            is-flex is-justify-content-space-between is-align-items-baseline
            quarter
        "
    >
        <div
            class="box is-flex-grow-3 is-flex is-justify-content-space-between"
        >
            <div
                class="
                    quarter-number
                    is-flex is-justify-content-center is-align-items-center
                "
            >
                Q - {{ order }}
            </div>
            <div class="quarter-content is-flex-grow-3">
                <input
                    class="input"
                    type="text"
                    :ref="(el) => el && el.focus()"
                    v-if="quarter.isEditing"
                    v-model="quarter.content"
                    @keydown.enter="toggleEditQuarter"
                    @keydown.esc="toggleEditQuarter"
                />
                <span v-else>{{ quarter.content }}</span>
            </div>
            <div
                class="
                    quarter-actions
                    is-flex is-justify-content-center is-align-items-center
                    pr-3
                "
            >
                <span
                    class="icon is-medium is-clickable"
                    @click="toggleEditQuarter"
                >
                    <i class="fa-solid fa-lg fa-pen"></i>
                </span>
                <span
                    class="icon is-medium is-clickable"
                    v-if="quarter.isEditing"
                    @click="toggleEditQuarter($event, true)"
                >
                    <i class="fa-solid fa-lg fa-xmark"></i>
                </span>
                <span
                    class="icon is-medium is-clickable"
                    v-else
                    @click="deleteQuarter"
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
    props: ["quarter", "order"],
    setup(props, context) {
        let quarter = ref(props.quarter);
        function deleteQuarter() {
            context.emit("deleteQuarter", quarter);
        }
        let oldContent = quarter.value.content;
        function toggleEditQuarter(e, isValueSame = false) {
            if (e.keyCode === 27 || isValueSame) {
                quarter.value.content = oldContent;
            } else {
                oldContent = quarter.value.content;
            }
            quarter.value.isEditing = !quarter.value.isEditing;
        }
        return {
            quarter,
            deleteQuarter,
            toggleEditQuarter,
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
.quarter-number {
    border-right: solid 1px #f7f8fa;
    padding: 1.25em;
    color: #623eda;
    width: 10%;
    text-align: center;
}
.quarter-content {
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
