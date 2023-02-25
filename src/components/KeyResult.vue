<template>
    <div
        class="is-flex is-justify-content-space-between is-align-items-baseline key-result"
    >
        <div
            class="box is-flex-grow-3 is-flex is-justify-content-space-between"
        >
            <div
                class="key-result-number is-flex is-justify-content-center is-align-items-center"
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
                <input
                    class="input mt-3"
                    type="text"
                    v-if="keyResult.isEditing"
                    v-model="keyResult.finishedAt"
                    @keydown.enter="toggleEditKeyResult"
                    @keydown.esc="toggleEditKeyResult"
                />
                <span v-else
                    >{{ keyResult.content }} - {{ keyResult.finishedAt }}
                    <ProgressBar
                        :currentStatus="keyResultCurrentStatus"
                        :finishedAt="keyResult.finishedAt"
                    ></ProgressBar
                ></span>
            </div>
            <div
                class="key-result-actions is-flex is-justify-content-center is-align-items-center pr-3"
            >
                <span
                    class="icon is-medium is-clickable"
                    @click="toggleEditKeyResult"
                    v-if="!hideActions"
                >
                    <i class="fa-solid fa-lg fa-pen"></i>
                </span>
                <span
                    class="icon is-medium is-clickable"
                    v-if="keyResult.isEditing && !hideActions"
                    @click="toggleEditKeyResult($event, true)"
                >
                    <i class="fa-solid fa-lg fa-xmark"></i>
                </span>
                <span
                    class="icon is-medium is-clickable"
                    v-else-if="!hideActions"
                    @click="deleteKeyResult"
                >
                    <i class="fa-solid fa-lg fa-trash"></i>
                </span>
                <span
                    class="icon is-medium"
                    v-if="displayCrfs"
                    @click="toggleCrfs"
                >
                    <i
                        class="fa-solid fa-lg"
                        :class="{
                            'fa-angle-up': showCrfs,
                            'fa-angle-down': !showCrfs,
                        }"
                    ></i>
                </span>
            </div>
        </div>
    </div>
    <div class="is-flex is-flex-wrap-wrap crfs" v-if="showCrfs">
        <CRF
            v-for="(crf, index) of keyResult.crfs"
            v-bind:key="crf.id"
            :crf="crf"
            :order="index + 1"
            @deleteCrf="deleteCrf"
        ></CRF>
        <CreateNewButton
            class="create-new-button"
            v-if="showCreateNewButton"
            @createNew="toggleNewCrf"
            text="CRF"
        ></CreateNewButton>
        <CreateNewTarget
            class="create-new-target"
            v-else-if="!showCreateNewButton"
            @cancel="toggleNewCrf"
            @store="storeNewCrf"
            type="crf"
            targetType="crf"
            :number="keyResult.crfs.length + 1"
        ></CreateNewTarget>
    </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import CRF from "./CRF.vue";
import CreateNewButton from "./CreateNewButton.vue";
import CreateNewTarget from "./CreateNewTarget.vue";
import ProgressBar from "./ProgressBar.vue";
import Form from "../helpers/form";
import { findById } from "../helpers/generic";
export default {
    props: [
        "bhagId",
        "quarterId",
        "objectiveId",
        "keyResult",
        "order",
        "displayCrfs",
        "hideActions",
    ],
    components: {
        CRF,
        CreateNewButton,
        CreateNewTarget,
        ProgressBar,
    },
    setup(props, context) {
        let keyResult = ref(props.keyResult);
        function deleteKeyResult() {
            context.emit("deleteKeyResult", keyResult);
        }
        let oldContent = keyResult.value.content;
        function toggleEditKeyResult(e, isValueSame = false) {
            if (e.keyCode === 27 || isValueSame) {
                keyResult.value.content = oldContent;
                keyResult.value.isEditing = !keyResult.value.isEditing;
            } else {
                new Form(
                    `bhags/${props.bhagId}/quarters/${props.quarterId}/objectives/${props.objectiveId}/key-results/${keyResult.value.id}`,
                    {
                        keyResultContent: keyResult.value.content,
                        keyResultRequiredStatus: keyResult.value.finishedAt,
                    }
                )
                    .put()
                    .then((response) => {
                        oldContent = keyResult.value.content;
                        keyResult.value.isEditing = !keyResult.value.isEditing;
                    });
            }
        }
        let showCrfs = ref(false);
        function toggleCrfs() {
            showCrfs.value = !showCrfs.value;
        }
        function deleteCrf(deletedCrf) {
            if (confirm("Do you really want to delete this CRF")) {
                keyResult.value.crfs = keyResult.value.crfs.filter(
                    (elem) => deletedCrf.value.id !== elem.id
                );
            }
        }
        let showCreateNewButton = ref(true);
        function toggleNewCrf() {
            showCreateNewButton.value = !showCreateNewButton.value;
        }
        function storeNewCrf(newCrf) {
            toggleNewCrf();
            new Form(
                `bhags/${props.bhagId}/quarters/${props.quarterId}/objectives/${props.objectiveId}/key-results/${keyResult.value.id}/crfs`,
                {
                    crfDate: newCrf.value.date,
                    currentStatus: newCrf.value.currentStatus,
                }
            )
                .post()
                .then(() => {
                    Form.getBhags().then((response) => {
                        keyResult.value.crfs = resetCrfs(response.data);
                    });
                });
        }
        let keyResultCurrentStatus = computed(() => {
            if (keyResult.value.crfs && keyResult.value.crfs.length > 0) {
                if (
                    keyResult.value.crfs[keyResult.value.crfs.length - 1]
                        .currentStatus >= 0
                ) {
                    return keyResult.value.crfs[keyResult.value.crfs.length - 1]
                        .currentStatus;
                }
                return keyResult.value.crfs[keyResult.value.crfs.length - 1]
                    .value.currentStatus;
            } else if (keyResult.value.currentStatus > 0) {
                //TODO: check this condition when pinia is implemented
                return keyResult.value.currentStatus;
            }
            return 0;
        });
        function resetCrfs(bhags) {
            let tempBhag = findById(props.bhagId, bhags);
            let tempQuarter = findById(props.quarterId, tempBhag.quarters);
            let tempObjective = findById(
                props.objectiveId,
                tempQuarter.objectives
            );
            let tempKeyResults = findById(
                keyResult.value.id,
                tempObjective.keyResults
            );
            return tempKeyResults.crfs;
        }
        return {
            keyResult,
            deleteKeyResult,
            toggleEditKeyResult,
            showCrfs,
            toggleCrfs,
            deleteCrf,
            showCreateNewButton,
            toggleNewCrf,
            storeNewCrf,
            keyResultCurrentStatus,
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
.crfs {
    margin-bottom: 3%;
}
.create-new-button {
    margin-top: 1%;
    width: 40%;
    margin-left: 7.7%;
}
.create-new-button:nth-child(odd) {
    margin-left: 7.7%;
}
.create-new-target:nth-child(odd) {
    margin-left: 7.7%;
    margin-right: -13%;
}
.create-new-target {
    width: 40%;
    margin-left: 7.7%;
}
</style>
<style>
.create-new-target .target-number {
    font-size: 13px !important;
}
.create-new-target .box {
    margin-left: 2.7%;
}
</style>