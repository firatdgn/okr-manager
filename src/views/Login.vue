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
            <h1 class="title has-text-centered">Login</h1>
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
                        <button class="button is-link" @click="register">
                            Register
                        </button>
                        <button class="button is-success" @click="login">
                            Login
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
            ctx.emit("registering");
        }
        function login() {
            let form = new Form("http://localhost:8888/users/sign-in", {
                username: username.value,
                password: password.value,
            });
            form.post().then((response) => {
                if (
                    response.status === 200 &&
                    response.data.status === "success"
                ) {
                    sessionStorage.setItem("accessToken", response.data.data);
                    ctx.emit("loggedIn");
                }
            });
        }

        return {
            username,
            password,
            login,
            register,
        };
    },
};
</script>

<style>
.is-fullheight {
    height: 100%;
}
</style>