import axiosInstance from "../api/axios";

// upload image
export const createUploadImage = async (image, token) => {
    const formData = new FormData();
    formData.append("image", image);
    const response = await axiosInstance.post("/upload-image/", formData, {
        headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

// delete upload image
export const deleteUploadImage = async (image_url, token) => {
    const response = await axiosInstance.delete("/upload-image/delete/", {
        headers: { Authorization: `Token ${token}` },
        data: { image_url },
    });
    return response.data;
};
