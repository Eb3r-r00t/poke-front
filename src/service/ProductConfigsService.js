import axios from "axios";

export default class BrandService {
    config;

    constructor(config) {
        this.config = config;
    }

    get(id) {
        return axios.get("/products/" + id + '/' + this.config);
    }

    create(id, config) {
        return axios.post("/products/" + id + '/' + this.config, config);
    }

    update(id, config) {
        return axios.put("/products/" + id + '/' + this.config, config);
    }
}