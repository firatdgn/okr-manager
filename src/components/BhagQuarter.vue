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
                <div class="is-flex" v-if="quarter.isEditing">
                    <input
                        class="input"
                        type="date"
                        @keydown.enter="toggleEditQuarter"
                        @keydown.esc="toggleEditQuarter"
                        v-model="quarter.startDate"
                    />
                    <input
                        class="input"
                        type="date"
                        @keydown.enter="toggleEditQuarter"
                        @keydown.esc="toggleEditQuarter"
                        v-model="quarter.finishDate"
                    />
                </div>
                <span v-else>{{ quarterContent }}</span>
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
import { computed } from "@vue/runtime-core";
import moment from "moment";
import Form from "../helpers/form";
export default {
    props: ["quarter", "order", "bhagId"],
    setup(props, context) {
        let quarter = ref(props.quarter);
        const quarterContent = computed(() => {
            let startDate = moment(quarter.value.startDate).format(
                "DD.MM.YYYY"
            );
            let finishDate = moment(quarter.value.finishDate).format(
                "DD.MM.YYYY"
            );
            return `${startDate} - ${finishDate}`;
        });
        function deleteQuarter() {
            context.emit("deleteQuarter", quarter);
        }
        let oldQuarter = quarter.value.content;
        function toggleEditQuarter(e, isValueSame = false) {
            if (e.keyCode === 27 || isValueSame) {
                quarter.value.content = oldQuarter;
            } else {
                oldQuarter = quarter.value;
                const form = new Form(
                    `bhags/${props.bhagId}/quarters/${quarter.value.id}`,
                    {
                        startedAt: moment(quarter.value.startDate).format(
                            "YY-MM-DD HH:mm:ss"
                        ),
                        finishedAt: moment(quarter.value.finishDate).format(
                            "YY-MM-DD HH:mm:ss"
                        ),
                    }
                )
                    .put()
                    .then((response) => {
                        oldContent = quarter.value;
                    })
                    .catch((err) => {
                        quarter.value = oldContent;
                    });
            }
            quarter.value.isEditing = !quarter.value.isEditing;
        }
        return {
            quarter,
            deleteQuarter,
            toggleEditQuarter,
            quarterContent,
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
