<template>
    <div
        class="is-flex is-justify-content-space-between is-align-items-baseline"
    >
        <span class="icon is-large"
            ><i class="fa-solid fa-2x fa-angle-left"></i
        ></span>
        <div
            class="box is-flex-grow-3 is-flex is-justify-content-space-between"
        >
            <div class="quarter-period">Q1</div>
            <div class="quarter-dates is-flex-grow-3">
                01.01.2022 - 30.04.2022
            </div>
        </div>
        <span class="icon is-large"
            ><i class="fa-solid fa-2x fa-angle-right"></i
        ></span>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.box {
    padding: 0;
    font-weight: 600;
    font-size: 18px;
}
.quarter-dates {
    padding: 1.25em;
    padding-left: 34%;
    color: #3200d2;
}
.quarter-period {
    border-right: solid 1px #f7f8fa;
    padding: 1.25em;
    color: #3200d2;
    width: 10%;
    text-align: center;
}
</style>