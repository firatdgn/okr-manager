import { defineStore } from "pinia";
import { ref } from "vue";

export const useOkrStore = defineStore("okr", () => {
    let bhags = ref([
        {
            id: 1,
            content: "Lorem ipsum",
            quarters: [
                {
                    quarter: "Q1",
                    startDate: "2022-01-01",
                    endDate: "2022-04-30",
                    objectives: [
                        {
                            id: 1,
                            content: "lorem ipsum",
                            keyResults: [
                                {
                                    id: 1,
                                    content: "lorem ipsum",
                                    finishedAt: 100,
                                    crfs: [
                                        {
                                            date: "2022-01-01",
                                            currentStatus: 89,
                                        },
                                    ],
                                },
                                {
                                    id: 2,
                                    content: "lorem ipsum",
                                    finishedAt: 100,
                                    crfs: [],
                                },
                            ],
                        },
                        {
                            id: 2,
                            content: "lorem ipsum",
                            keyResults: [],
                        },
                    ],
                },
                {
                    quarter: "Q2",
                    startDate: "2022-04-01",
                    endDate: "2022-02-30",
                    objectives: [],
                },
            ],
        },
        {
            id: 2,
            content: "Lorem ipsum",
            quarters: [
                {
                    quarter: "Q1",
                    startDate: "2022-01-01",
                    endDate: "2022-04-30",
                    objectives: [
                        {
                            id: 1,
                            content: "lorem ipsum",
                            keyResults: [
                                {
                                    id: 1,
                                    content: "lorem ipsum",
                                    finishedAt: 100,
                                    crfs: [
                                        {
                                            date: "2022-01-01",
                                            currentStatus: 89,
                                        },
                                    ],
                                },
                                {
                                    id: 2,
                                    content: "lorem ipsum",
                                    finishedAt: 100,
                                    crfs: [],
                                },
                            ],
                        },
                        {
                            id: 2,
                            content: "lorem ipsum",
                            keyResults: [],
                        },
                    ],
                },
                {
                    quarter: "Q2",
                    startDate: "2022-04-01",
                    endDate: "2022-07-30",
                    objectives: [],
                },
            ],
        },
        {
            id: 3,
            content: "Lorem ipsum",
            quarters: [
                {
                    quarter: "Q1",
                    startDate: "2022-01-01",
                    endDate: "2022-04-30",
                    objectives: [
                        {
                            id: 1,
                            content: "lorem ipsum",
                            keyResults: [
                                {
                                    id: 1,
                                    content: "lorem ipsum",
                                    finishedAt: 100,
                                    crfs: [
                                        {
                                            date: "2022-01-01",
                                            currentStatus: 89,
                                        },
                                    ],
                                },
                                {
                                    id: 2,
                                    content: "lorem ipsum",
                                    finishedAt: 100,
                                    crfs: [],
                                },
                            ],
                        },
                        {
                            id: 2,
                            content: "lorem ipsum",
                            keyResults: [],
                        },
                    ],
                },
                {
                    quarter: "Q2",
                    startDate: "2022-04-01",
                    endDate: "2022-07-30",
                    objectives: [],
                },
            ],
        },
    ]);
    return { bhags };
});
