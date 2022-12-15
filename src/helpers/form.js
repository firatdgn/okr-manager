import axios from "axios";
export default class Form {
    constructor(targetEndpoint, elements) {
        this.targetEndpoint = targetEndpoint;
        this.elements = elements;
    }
    set elements(elements) {
        if (typeof elements !== "object") {
            alert("Form elements must be object");
            return;
        }
        this._data = elements;
    }
    post() {
        return axios
            .post(this.targetEndpoint, this._data, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .catch((error) => {
                alert(error.response.data.message);
                throw error;
            });
    }
}
