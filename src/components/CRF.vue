<template>
    <div
        class="is-flex is-justify-content-space-between is-align-items-baseline crf"
    >
        <div
            class="box is-flex-grow-3 is-flex is-justify-content-space-between"
        >
            <div
                class="crf-number is-flex is-justify-content-center is-align-items-center"
            >
                CRF - {{ order }}
            </div>
            <div class="key-result-content is-flex-grow-3 is-flex">
                <template v-if="isEditing">
                    <input
                        class="input is-align-self-center"
                        type="date"
                        placeholder="Date"
                        v-model="currentCrf.date"
                    />
                    <input
                        class="input is-align-self-center"
                        type="text"
                        placeholder="Current"
                        v-model="currentCrf.currentStatus"
                        @keydown.enter="toggleEditing"
                        @keydown.esc="toggleEditing"
                    />
                </template>
                <span class="pl-3 is-align-self-center" v-else
                    >{{ formattedDate }} - {{ currentCrf.currentStatus }}</span
                >
            </div>
            <div
                class="key-result-actions is-flex is-justify-content-center is-align-items-center pr-3"
            >
                <span
                    class="icon is-medium is-clickable"
                    @click="toggleEditing"
                >
                    <i class="fa-solid fa-lg fa-pen"></i>
                </span>
                <span
                    class="icon is-medium is-clickable"
                    v-if="isEditing"
                    @click="toggleEditing($event, true)"
                >
                    <i class="fa-solid fa-lg fa-xmark"></i>
                </span>
                <span
                    class="icon is-medium is-clickable"
                    @click="deleteCrf"
                    v-else
                >
                    <i class="fa-solid fa-lg fa-trash"></i>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import moment from "moment";
import { computed } from "@vue/runtime-core";
import Form from "../helpers/form";
export default {
    props: [
        "crf",
        "order",
        "bhagId",
        "quarterId",
        "objectiveId",
        "keyResultId",
    ],
    setup(props, context) {
        let currentCrf = ref(props.crf);
        let isEditing = ref(false);
        let oldContent = {
            currentStatus: currentCrf.value.currentStatus,
            date: currentCrf.value.date,
        };
        function toggleEditing(e, isValueSame = false) {
            if (e.keyCode === 27 || isValueSame) {
                currentCrf.value.currentStatus = oldContent.currentStatus;
                currentCrf.value.date = oldContent.date;
            } else {
                new Form(
                    `bhags/${props.bhagId}/quarters/${props.quarterId}/objectives/${props.objectiveId}/key-results/${props.keyResultId}/crfs/${currentCrf.value.id}`,
                    {
                        crfDate: moment(currentCrf.value.date).format(
                            "YYYY-MM-DD"
                        ),
                        currentStatus: currentCrf.value.currentStatus,
                    }
                )
                    .put()
                    .then((response) => {
                        oldContent.currentStatus =
                            currentCrf.value.currentStatus;
                        oldContent.date = currentCrf.value.date;
                    });
            }
            isEditing.value = !isEditing.value;
        }
        let formattedDate = computed(() =>
            moment(currentCrf.value.date).format("DD.MM.YYYY")
        );
        function deleteCrf() {
            context.emit("deleteCrf", currentCrf);
        }
        return {
            currentCrf,
            isEditing,
            toggleEditing,
            formattedDate,
            deleteCrf,
        };
    },
};
</script>

<style scoped>
.crf {
    width: 48%;
}
.box {
    margin-left: 15.7%;
    margin-bottom: 3%;
    margin-top: 3%;
    padding: 0;
    font-weight: 600;
    font-size: 13px;
    height: 65%;
}
.crf-number {
    border-right: solid 1px #f7f8fa;
    padding: 1.25em;
    color: #4d74ff;
    width: 20%;
    height: 100%;
    text-align: center;
}
.input {
    margin-left: 1%;
    margin-right: 1%;
    height: 50%;
}
.fa-pen {
    color: #4d74ff;
}
.fa-trash,
.fa-xmark {
    color: #ff4d4d;
}
</style>
