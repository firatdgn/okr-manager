<template>
    <div
        class="
            is-flex is-justify-content-space-between is-align-items-baseline
            bhag
        "
    >
        <div
            class="box is-flex-grow-3 is-flex is-justify-content-space-between"
        >
            <div
                class="
                    bhag-number
                    is-flex is-justify-content-center is-align-items-center
                "
            >
                BHAG - {{ order }}
            </div>
            <div class="bhag-content is-flex-grow-3">
                <input
                    class="input"
                    type="text"
                    v-if="bhag.isEditing"
                    v-model="bhag.content"
                    :ref="(el) => el && el.focus()"
                    @keydown.enter="toggleEditBhag"
                    @keydown.esc="toggleEditBhag"
                />
                <span v-else>{{ bhag.content }}</span>
            </div>
            <div
                class="
                    bhag-actions
                    is-flex is-justify-content-center is-align-items-center
                    pr-3
                "
            >
                <span
                    class="icon is-medium is-clickable"
                    @click="toggleEditBhag"
                >
                    <i class="fa-solid fa-lg fa-pen"></i>
                </span>
                <span
                    class="icon is-medium is-clickable"
                    v-if="bhag.isEditing"
                    @click="toggleEditBhag($event, true)"
                >
                    <i class="fa-solid fa-lg fa-xmark"></i>
                </span>
                <span
                    class="icon is-medium is-clickable"
                    v-else
                    @click="deleteBhag"
                >
                    <i class="fa-solid fa-lg fa-trash"></i>
                </span>
                <span class="icon is-medium" @click="toggleQuarters">
                    <i
                        class="fa-solid fa-lg"
                        :class="{
                            'fa-angle-up': showQuarters,
                            'fa-angle-down': !showQuarters,
                        }"
                    ></i>
                </span>
            </div>
        </div>
    </div>
    <div class="quarters" v-if="showQuarters">
        <BhagQuarter
            v-for="(quarter, i) of bhag.quarters"
            :order="i + 1"
            :key="quarter.id"
            :quarter="quarter"
            @deleteQuarter="deleteQuarter"
        ></BhagQuarter>
        <CreateNewButton
            v-if="showCreateNewButton"
            @createNew="toggleNewQuarter"
            text="Quarter"
        ></CreateNewButton>
        <CreateNewTarget
            v-else
            @cancel="toggleNewQuarter"
            @store="storeNewQuarter"
            type="quarter"
            :number="bhag.quarters.length + 1"
            targetType="quarter"
        ></CreateNewTarget>
    </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import CreateNewButton from "./CreateNewButton.vue";
import CreateNewTarget from "./CreateNewTarget.vue";
import BhagQuarter from "./BhagQuarter.vue";
import Form from "../helpers/form";
export default {
    props: ["order", "bhag"],
    setup(props, context) {
        let bhag = ref(props.bhag);
        let oldContent = bhag.value.content;
        function toggleEditBhag(e, isValueSame = false) {
            if (e.keyCode === 27 || isValueSame) {
                bhag.value.content = oldContent;
            } else {
                const form = new Form(`bhags/${bhag.value.id}`, {
                    bhagContent: bhag.value.content,
                })
                    .put()
                    .then((response) => {
                        oldContent = bhag.value.content;
                    })
                    .catch((err) => {
                        bhag.value.content = oldContent;
                    });
            }
            bhag.value.isEditing = !bhag.value.isEditing;
        }
        function deleteBhag() {
            context.emit("deleteBhag", bhag);
        }
        let showQuarters = ref(false);
        function toggleQuarters() {
            showQuarters.value = !showQuarters.value;
        }
        let showCreateNewButton = ref(true);
        function toggleNewQuarter() {
            showCreateNewButton.value = !showCreateNewButton.value;
        }
        function storeNewQuarter(quarterContent) {
            if (quarterContent.value.startDate > quarterContent.value.endDate) {
                alert(`Start Date can't be bigger than End Date.`);
                return;
            }
            if (
                !quarterContent.value.startDate ||
                !quarterContent.value.endDate
            ) {
                alert(`One of the given date is invalid.`);
                return;
            }
            toggleNewQuarter();
            new Form(`bhags/${bhag.value.id}/quarters`, {
                startedAt: quarterContent.value.startDate,
                finishedAt: quarterContent.value.endDate,
            })
                .post()
                .then((response) => {
                    Form.getBhags();
                });
        }
        function deleteQuarter(deletedQuarter) {
            if (confirm("Do you really want to delete this quarter?")) {
                bhag.value.quarters = bhag.value.quarters.filter(
                    (elem) => deletedQuarter.value.id !== elem.id
                );
            }
        }

        return {
            bhag,
            toggleEditBhag,
            deleteBhag,
            showQuarters,
            toggleQuarters,
            showCreateNewButton,
            toggleNewQuarter,
            storeNewQuarter,
            deleteQuarter,
        };
    },
    components: { CreateNewButton, CreateNewTarget, BhagQuarter },
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
.bhag-number {
    border-right: solid 1px #f7f8fa;
    padding: 1.25em;
    color: #da3e3e;
    width: 10%;
    text-align: center;
}
.bhag-content {
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
.quarters {
    padding-top: 2em;
    padding-bottom: 2em;
    padding-left: 2em;
    background-color: rgba(196, 196, 196, 0.1);
    margin-left: 2.7%;
    margin-right: 2.7%;
}
.quarters div:not(:last-child) {
    margin-bottom: 2em;
}
</style>