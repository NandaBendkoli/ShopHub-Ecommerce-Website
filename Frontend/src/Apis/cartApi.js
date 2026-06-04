import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8900/Ecommerce-website/web/v1",
    withCredentials: true,
})

export const addToCart = (cartData) => {
    return api.post("/cart/addToCart", cartData,
        {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
}

export const getCartItems = () => {
    return api.get("/cart/getCartItems",
        {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
}

export const removeFromCart = (data) => {
    return api.post(
        "/cart/removeFromCart",
        data,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
};