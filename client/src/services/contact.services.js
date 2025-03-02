import axiosInstance from "../api/axios";

/**
 * Submit contact form to backend
 * @param {Object} contactData - The contact form data
 * @returns {Promise}
 */
export const submitContact = async (contactData) => {
    try {
        const response = await axiosInstance.post(
            "/contact/submit/",
            contactData
        );
        return response.data;
    } catch (error) {
        throw error.response?.data || { error: "Something went wrong!" };
    }
};
