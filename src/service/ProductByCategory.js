import axios from "axios";

export default class ProductByCategory {
    url;

    constructor(categoryId) {
        this.url = '/products/category/' + categoryId
    }

    getAll() {
        return axios.get(this.url);
    }
}