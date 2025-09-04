import axios from "axios";
import { toast } from "react-toastify";

// Vite me env variables ka prefix VITE_ hota hai
const baseURL = import.meta.env.VITE_BASE_URL;

async function makeApiCall({
    url,
    method = "GET",
    data,
    noAuth,
    sendConfig,
    isFormData = false,
    headers: customHeaders = {},
    ...config
}) {
    const token = localStorage.getItem("token");

    const headers = {
        ...(token && !noAuth ? { Authorization: `Bearer ${token}` } : {}),
        ...customHeaders,
    };

    if (!isFormData && !headers["Content-Type"]) {
        headers["Content-Type"] = "application/json";
    }

    try {
        const response = await axios({
            method,
            data,
            url: `${baseURL}/${url}`,
            headers,
            ...config,
        });

        return sendConfig ? response : response.data;
    } catch (error) {
        const response = error.response;

        if (
            response?.status === 401 &&
            response?.data?.message ===
            "Unauthorized access — token is missing or invalid."
        ) {
            toast.error("Session expired or invalid. Please log in again.");
            localStorage.clear();

            setTimeout(() => {
                window.location.href = "/login";
            }, 1500);
        }

        if (response?.status === 403) {
            toast.error("You are not authorized to access this page.");
            localStorage.clear();
            window.location.href = "/403";
        }

        throw error;
    }
}

function checkErrorHasMessage(err) {
    return err?.message !== undefined;
}

export { makeApiCall, checkErrorHasMessage };
