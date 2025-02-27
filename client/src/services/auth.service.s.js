import axiosInstance from "../api/axios";

// get current login user detail
export const getMe = async (token) => {
    try {
        const response = await axiosInstance.get(`/me/`, {
            headers: { Authorization: `Token ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error getMe:", error);
        throw error;
    }
};

// request to reset password
export const forgotPassword = async (email) => {
    try {
        const response = await axiosInstance.post(`/password-reset-request/`, {
            email,
        });
        return response.data;
    } catch (error) {
        console.error("Error forgotPassword:", error);
        throw error;
    }
};

// confirm reset password
export const resetPassword = async (data) => {
    const { resetToken, newPassword } = data;
    console.log("resetToken", resetToken);
    console.log("new password", newPassword);

    try {
        const response = await axiosInstance.post(`/password-reset-confirm/`, {
            reset_token: resetToken,
            new_password: newPassword,
        });
        return response.data;
    } catch (error) {
        console.error("Error resetPassword:", error);
        throw error;
    }
};
