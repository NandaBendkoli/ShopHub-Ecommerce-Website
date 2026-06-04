import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8900/Ecommerce-website/web/v1",
    withCredentials: true,
})

export const registerUser = async (userData) => {
    return api.post("/user/register", userData)

}


export const loginUser = async (userData) => {
    return api.post("/user/login", userData)
}

export const getAllUsers = async (data) => {
    return api.post("/user/getAllUsers", data)
}


export const logoutUser = async () => {

    const token = localStorage.getItem("token");

    return api.post(
        "/user/logout",
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
}

export const userProfile = async () => {

    const token = localStorage.getItem("token");

    return api.post("/user/userProfile",
        {},
        {
            headers: { Authorization: `Bearer ${token}` }

        }
    )

}

export const update = async (data) => {
    const token = localStorage.getItem("token");

    return api.post(
        "/user/update",
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const changePassword = async (data) => {
    const token = localStorage.getItem("token");
    return api.post("/user/changePassword", data,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
}