<template>
    <div
        class="
            is-flex
            is-justify-content-center
            is-align-items-center
            is-fullheight
        "
    >
        <div class="box" style="width: 40%">
            <div class="field">
                <label class="label">Username</label>
                <div class="control">
                    <input class="input" type="text" v-model="username" />
                </div>
            </div>
            <div class="field">
                <label class="label">Password</label>
                <div class="control">
                    <input class="input" type="password" v-model="password" />
                </div>
            </div>
            <div class="field is-flex is-justify-content-end">
                <div class="control">
                    <button class="button is-success" @click="login">
                        Login
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
    setup(props, ctx) {
        let username = ref("");
        let password = ref("");
        function login() {
            ctx.emit("loggedIn");
        }

        return {
            username,
            password,
            login,
        };
    },
};
</script>

<style>
.is-fullheight {
    height: 100%;
}
</style>