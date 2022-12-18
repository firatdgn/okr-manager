import axios from "axios";
export default class Form {
    constructor(targetEndpoint, elements = {}) {
        this.targetEndpoint = targetEndpoint;
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
}
