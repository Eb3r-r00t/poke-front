export default class Products {

    category_id = null;

    constructor(category_id) {
        this.category_id = category_id;
    }

    setCategoryID(id) {
        this.category_id = id;
    }

    getProductByCategory() {
        return `query { products (product_category_id: ${this.category_id}) 
        { 
            id 
            name 
            description 
            is_available
            is_configured
            brand { 
            name 
            } 
        } }`;
    }

    getProductById(id) {
        return `query { product ( id: ${id}) { 
            id 
            name 
            description 
            is_available
            is_configured
            brand {
            id 
            name 
            } 
        } }`;
    }

    createProduct(data) {
        return `mutation { createProduct ( input: { 
            name: "${data.name}"
            product_category: { connect: ${this.category_id} }
            description: "${data.description ? data.description : ''}"
            is_available: ${data.is_available}
            ${data.brand_id ? `brand: { connect: ${data.brand_id} }` : ''}
        } ) { 
            id 
            name 
            description 
            is_available
            is_configured
            brand {
            id 
            name 
            } 
        } }`;
    }

    updateProduct(data) {
        return `mutation { updateProduct ( id: ${data.id} input: { 
            name: "${data.name}"
            product_category: { connect: ${this.category_id} }
            description: "${data.description ? data.description : ''}"
            is_available: ${data.is_available}
            ${data.brand_id ? `brand: { connect: ${data.brand_id} }` : ''}
        } ) { 
            id 
            name 
            description 
            is_available
            is_configured
            brand {
            id 
            name 
            }
        } }`;
    }

    deleteProduct(id) {
        return `mutation { deleteProduct ( id: ${id}) { 
            id 
        } }`;
    }
}