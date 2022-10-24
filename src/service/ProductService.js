import axios from "axios";

export default class ProductService {
    getProducts() {
        return axios.get("/products");
    }

    getProduct(id) {
        return axios.get("/products/" + id);
    }

    createProduct(brand) {
        return axios.post("/products", brand);
    }

    updateProduct(id, brand) {
        return axios.put("/products/id", brand);
    }

    deleteProduct(id) {
        return axios.delete("/products/" + id);
    }
}
