import axios from "axios";

export default class BrandService {
    getProductCategories() {
        return axios.get("/product_categories");
    }

    getProductCategory(id) {
        return axios.get("/product_categories/" + id);
    }

    createProductCategory(brand) {
        return axios.post("/product_categories", brand);
    }

    updateProductCategory(id, brand) {
        return axios.put("/product_categories/id", brand);
    }

    deleteProductCategory(id) {
        return axios.delete("/product_categories/" + id);
    }
}