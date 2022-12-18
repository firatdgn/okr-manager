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
            <h1 class="title has-text-centered">Register</h1>
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
                    <div class="buttons">
                        <button class="button is-danger" @click="cancel">
                            Cancel
                        </button>
                        <button class="button is-link" @click="register">
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import Form from "../helpers/form";
export default {
    setup(props, ctx) {
        let username = ref("");
        let password = ref("");
        function register() {
            let form = new Form("users/sign-up", {
                username: username.value,
                password: password.value,
            });
            form.post().then((response) => {
                if (
                    response.status === 201 &&
                    response.data.status === "success"
                ) {
                    alert(response.data.message);
                    ctx.emit("registered");
                }
            });
        }
        function cancel() {
            ctx.emit("cancel");
        }

        return {
            username,
            password,
            register,
            cancel,
        };
    },
};
</script>

<style>
.is-fullheight {
    height: 100%;
}
</style>