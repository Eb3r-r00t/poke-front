import axios from "axios";

export default class SelectDataService {
    url;

    constructor(url) {
        this.url = url;
    }

    getAll() {
        return axios.get(this.url);
    }

    getFormattedData() {
        return this.getAll().then((response) => {
            return this.formatData(response.data);
        });
    }

    formatData(data) {
        return data.map((item) => {
            return {
                value: item.id.toString(),
                label: item.name
            }
        });
    }
}