import axios from "axios";
import { useOkrStore } from "../store/Okr";
export default class Form {
    static apiUrl() {
        return "http://localhost:8888";
    }
    constructor(targetEndpoint, elements = {}) {
        this.targetEndpoint = `${Form.apiUrl()}/${targetEndpoint}`;
        this.elements = elements;
        this.headers = {
            "Content-Type": "application/json",
        };
        if (sessionStorage.getItem("accessToken")) {
            this.headers["Authorization"] = `Bearer ${sessionStorage.getItem(
                "accessToken"
            )}`;
        }
    }
    set elements(elements) {
        if (typeof elements !== "object") {
            alert("Form elements must be object");
            return;
        }
        this._data = elements;
    }
    get() {
        const headers = this.headers;
        return axios
            .get(this.targetEndpoint, {
                headers: headers,
            })
            .catch((error) => {
                alert(error.response.data.message);
                throw error;
            });
    }
    static getBhags() {
        return axios
            .get(`${Form.apiUrl()}/bhags`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionStorage.getItem(
                        "accessToken"
                    )}`,
                },
            })
            .then((response) => {
                if (response.status === 304) {
                    return Form.getBhags();
                }
                sessionStorage.setItem("okr", JSON.stringify(response.data));
                const store = useOkrStore();
                store.$patch({
                    bhags: JSON.parse(sessionStorage.getItem("okr")),
                });
                return response;
            })
            .catch((error) => {
                alert(error.response.data.message);
                throw error;
            });
    }
    post() {
        const headers = this.headers;
        return axios
            .post(this.targetEndpoint, this._data, {
                headers: headers,
            })
            .catch((error) => {
                alert(error.response.data.message);
                throw error;
            });
    }
    put() {
        const headers = this.headers;
        return axios
            .put(this.targetEndpoint, this._data, {
                headers: headers,
            })
            .catch((error) => {
                alert(error.response.data.message);
                throw error;
            });
    }
    delete() {
        const headers = this.headers;
        return axios
            .delete(this.targetEndpoint, {
                headers: headers,
            })
            .catch((error) => {
                alert(error.response.data.message);
                throw error;
            });
    }
}
