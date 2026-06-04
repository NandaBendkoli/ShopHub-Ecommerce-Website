import axios from "axios";

const api = axios.create({
    baseURL: "https://shophub-ecommerce-website-8rnp.onrender.com/Ecommerce-website/web/v1",
    withCredentials: true,
});

export const addProduct = (productData) => {
    return api.post("/product/createProduct", productData);
}

export const getProducts = (productData) => {
    return api.post("/product/getProducts", productData);
}

export const updateProduct = (productData) => {
    return api.post("/product/updateProduct", productData);
}


export const getProductById = (productId) => {
    return api.post("/product/getProductById", {
        productId: productId,
    });
};

