import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8900/Ecommerce-website/web/v1",
    withCredentials: true,
})

export const getMyOrders = async (orderData) => {
    return api.post("/order/getMyOrders", orderData,
        {
            headers: {
                "authorization": `Bearer ${localStorage.getItem("token")}`,
            }
        }
    );
};

export const placeOrder = async (orderData) => {
    return api.post("/order/placeOrder", orderData,
        {
            headers: {
                "authorization": `Bearer ${localStorage.getItem("token")}`,
            }
        }
    );
}

export const cancelOrder = async (orderId) => {
    return api.post(
        "/order/cancelOrder",
        {
            orderId,
        }
    );
};

export const updateOrderStatus = async (orderData) => {
    return api.post("/order/updateOrderStatus", orderData,
        {
            headers: {
                "authorization": `Bearer ${localStorage.getItem("token")}`,
            }
        }
    );
}

export const getAllOrders = async () => {
    return api.post("/order/getAllOrders",)
}