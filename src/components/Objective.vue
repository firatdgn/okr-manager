<template>
    <div
        class="is-flex is-justify-content-space-between is-align-items-baseline objective"
    >
        <div
            class="box is-flex-grow-3 is-flex is-justify-content-space-between"
        >
            <div
                class="objective-number is-flex is-justify-content-center is-align-items-center"
            >
                O - {{ order }}
            </div>
            <div class="objective-content is-flex-grow-3">
                <input
                    class="input"
                    type="text"
                    v-if="objective.isEditing"
                    v-model="objective.content"
                    :ref="(el) => el && el.focus()"
                    @keydown.enter="toggleEditObjective"
                    @keydown.esc="toggleEditObjective"
                />
                <span v-else
                    >{{ objective.content
                    }}<ProgressBar
                        :currentStatus="objectiveCurrentStatus"
                        :finishedAt="objectiveFinishedAt"
                    ></ProgressBar
                ></span>
            </div>
            <div
                class="objective-actions is-flex is-justify-content-center is-align-items-center pr-3"
            >
                <span
                    class="icon is-medium is-clickable"
                    @click="toggleEditObjective"
                    v-if="!hideActions"
                >
                    <i class="fa-solid fa-lg fa-pen"></i>
                </span>
                <span
                    class="icon is-medium is-clickable"
                    v-if="objective.isEditing && !hideActions"
                    @click="toggleEditObjective($event, true)"
                >
                    <i class="fa-solid fa-lg fa-xmark"></i>
                </span>
                <span
                    class="icon is-medium is-clickable"
                    v-else-if="!hideActions"
                    @click="deleteObjective"
                >
                    <i class="fa-solid fa-lg fa-trash"></i>
                </span>
                <span class="icon is-medium" @click="toggleKeyResults">
                    <i
                        class="fa-solid fa-lg"
                        :class="{
                            'fa-angle-up': showKeyResults,
                            'fa-angle-down': !showKeyResults,
                        }"
                    ></i>
                </span>
            </div>
        </div>
    </div>
    <div class="key-results" v-if="showKeyResults">
        <KeyResult
            v-for="(keyResult, index) of keyResults"
            :key="keyResult.id"
            :order="index + 1"
            :keyResult="keyResult"
            :displayCrfs="displayCrfs"
            :hideActions="hideActions"
            :bhagId="bhagId"
            :quarterId="quarterId"
            :objectiveId="objective.id"
            @deleteKeyResult="deleteKeyResult"
        ></KeyResult
        ><CreateNewButton
            v-if="showCreateNewButton && !displayCrfs"
            @createNew="toggleNewKeyResult"
            text="Key Result"
        ></CreateNewButton>
        <CreateNewTarget
            v-else-if="!showCreateNewButton && !displayCrfs"
            @cancel="toggleNewKeyResult"
            @store="storeNewKeyResult"
            type="keyResult"
            target-type="keyResult"
            :number="objective.keyResults.length + 1"
        ></CreateNewTarget>
    </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import KeyResult from "./KeyResult.vue";
import CreateNewButton from "./CreateNewButton.vue";
import CreateNewTarget from "./CreateNewTarget.vue";
import ProgressBar from "./ProgressBar.vue";
import Form from "../helpers/form";
import { findById } from "../helpers/generic";
export default {
    components: { KeyResult, CreateNewButton, CreateNewTarget, ProgressBar },
    props: [
        "objective",
        "order",
        "displayCrfs",
        "hideActions",
        "bhagId",
        "quarterId",
    ],
    setup(props, context) {
        // Objective
        let objective = ref(props.objective);
        let keyResults = ref(objective.value.keyResults);
        let showKeyResults = ref(false);
        function toggleKeyResults() {
            showKeyResults.value = !showKeyResults.value;
        }
        function deleteObjective() {
            context.emit("deleteObjective", objective);
        }
        let oldContent = objective.value.content;
        function toggleEditObjective(e, isValueSame = false) {
            if (e.keyCode === 27 || isValueSame) {
                objective.value.content = oldContent;
            } else {
                new Form(
                    `bhags/${props.bhagId}/quarters/${props.quarterId}/objectives/${objective.value.id}`,
                    {
                        objectiveContent: objective.value.content,
                    }
                )
                    .put()
                    .then((response) => {
                        oldContent = objective.value.content;
                        Form.getBhags().then((response) =>
                            context.emit("resetBhags")
                        );
                    })
                    .catch((err) => {
                        objective.value.content = oldContent;
                    });
            }
            objective.value.isEditing = !objective.value.isEditing;
        }
        let showCreateNewButton = ref(true);
        function toggleNewKeyResult() {
            showCreateNewButton.value = !showCreateNewButton.value;
        }
        function storeNewKeyResult(keyResultContent) {
            toggleNewKeyResult();
            new Form(
                `bhags/${props.bhagId}/quarters/${props.quarterId}/objectives/${objective.value.id}/key-results`,
                {
                    keyResultContent: keyResultContent.value.content,
                    keyResultRequiredStatus: keyResultContent.value.finishedAt,
                }
            )
                .post()
                .then((response) =>
                    Form.getBhags().then((response) => {
                        keyResults.value = resetKeyResults(response.data);
                    })
                );
        }
        // Key Result
        function deleteKeyResult(deletedKeyResult) {
            if (confirm("Do you really want to delete this Key Result?")) {
                new Form(
                    `bhags/${props.bhagId}/quarters/${props.quarterId}/objectives/${objective.value.id}/key-results/${deletedKeyResult.value.id}`
                )
                    .delete()
                    .then((response) =>
                        Form.getBhags().then((response) => {
                            keyResults.value = resetKeyResults(response.data);
                        })
                    );
            }
        }
        function resetKeyResults(bhags) {
            let tempBhag = findById(props.bhagId, bhags);
            let tempQuarter = findById(props.quarterId, tempBhag.quarters);
            let tempObjective = findById(
                objective.value.id,
                tempQuarter.objectives
            );
            return tempObjective.keyResults;
        }
        let objectiveCurrentStatus = computed(() => {
            let currentStatus = 0;
            for (let keyResult of objective.value.keyResults) {
                if (keyResult.crfs && keyResult.crfs.length > 0) {
                    currentStatus += parseInt(
                        keyResult.crfs[keyResult.crfs.length - 1]
                            .currentStatus >= 0
                            ? keyResult.crfs[keyResult.crfs.length - 1]
                                  .currentStatus
                            : keyResult.crfs[keyResult.crfs.length - 1].value
                                  .currentStatus
                    );
                } else if (keyResult.currentStatus > 0) {
                    //TODO: check this condition when pinia is implemented
                    currentStatus += keyResult.currentStatus;
                }
            }
            return currentStatus;
        });
        let objectiveFinishedAt = computed(() => {
            return objective.value.keyResults.reduce((finishedAt, elem) => {
                return finishedAt + parseInt(elem.finishedAt);
            }, 0);
        });
        return {
            objective,
            keyResults,
            showKeyResults,
            showCreateNewButton,
            toggleKeyResults,
            deleteObjective,
            toggleEditObjective,
            toggleNewKeyResult,
            storeNewKeyResult,
            deleteKeyResult,
            objectiveCurrentStatus,
            objectiveFinishedAt,
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
.objective-number {
    border-right: solid 1px #f7f8fa;
    padding: 1.25em;
    color: #ff8a00;
    width: 10%;
    text-align: center;
}
.objective-content {
    padding: 1.25em;
    word-break: break-word;
}
.fa-pen {
    color: #4d74ff;
}
.fa-trash,
.fa-xmark {
    color: #ff4d4d;
}
.fa-angle-up,
.fa-angle-down {
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