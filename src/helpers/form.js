import axios from "axios";
export default class Form {
    static apiUrl() {
        return "/api";
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
    get(showErrorMessage) {
        const headers = this.headers;
        return axios
            .get(this.targetEndpoint, {
                headers: headers,
            })
            .catch((error) => {
                if (showErrorMessage) {
                    alert(error.response.data.message);
                }
                throw error;
            });
    }
    static getBhags(showErrorMessage = true) {
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
                sessionStorage.setItem("okr", JSON.stringify(response.data));
                return response;
            })
            .catch((error) => {
                if (showErrorMessage) {
                    alert(error.response.data.message);
                }
                throw error;
            });
    }
    post(showErrorMessage = true) {
        const headers = this.headers;
        return axios
            .post(this.targetEndpoint, this._data, {
                headers: headers,
            })
            .catch((error) => {
                if (showErrorMessage) {
                    alert(error.response.data.message);
                }
                throw error;
            });
    }
    put(showErrorMessage = true) {
        const headers = this.headers;
        return axios
            .put(this.targetEndpoint, this._data, {
                headers: headers,
            })
            .catch((error) => {
                if (showErrorMessage) {
                    alert(error.response.data.message);
                }
                throw error;
            });
    }
    delete(showErrorMessage = true) {
        const headers = this.headers;
        return axios
            .delete(this.targetEndpoint, {
                headers: headers,
            })
            .catch((error) => {
                if (showErrorMessage) {
                    alert(error.response.data.message);
                }
                throw error;
            });
    }
}
