import { useState, useEffect, useContext } from "react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Modal } from "../../../components/ui/modal";
import AuthContext from "../../../context/AuthContext";
import { createCity, updateCity } from "../../../services/city.services";
import {
    createUploadImage,
    deleteUploadImage,
} from "../../../services/upload-image.services";

const CityForm = ({ city, onClose, onRefresh }) => {
    const { token } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image_url: "",
        rating: "",
        is_active: true,
    });
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (city) {
            setFormData({
                title: city.title,
                description: city.description,
                image_url: city.image_url,
                rating: city.rating,
                is_active: city.is_active,
            });
        }
    }, [city]);

    // Handle Input Change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Validate Required Fields
    const validateForm = () => {
        const newErrors = {};
        if (!formData.title) newErrors.title = "Title is required";
        if (!formData.description) newErrors.title = "Description is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle Form Submission (Create or Update)
    const handleSubmit = async () => {
        if (!validateForm()) return; // Stop if validation fails

        try {
            if (city) {
                await updateCity(city.id, { ...formData }, token);
            } else {
                // TODO: Remove create function if it does not need.
                await createCity({ ...formData }, token);
            }
            onClose();
            onRefresh();
        } catch (error) {
            // set errors to for the reponse error
            setErrors(error.response.data);

            console.error("Failed to save location", error.response.data);
        }
    };

    // Handle Image Upload
    const handleUploadImage = async () => {
        if (!image) return;

        try {
            const result = await createUploadImage(image, token);
            setFormData({
                ...formData,
                image_url: result.image_url, // Store  URL
            });
        } catch (error) {
            console.error("Failed to upload cover image");
        }
    };

    // Handle Image Delete
    const handleRemoveImage = async () => {
        if (!formData.image_url) return;

        try {
            await deleteUploadImage(formData.image_url, token);

            // Update the UI state
            setFormData({ ...formData, image_url: null });
        } catch (error) {
            console.error("Failed to remove image", error);
            alert("Error: Unable to remove image.");
        }
    };

    return (
        <Modal
            title={city ? "Edit City" : "New City"}
            width="500px"
            onClose={onClose}
        >
            {/* Title Input */}
            <Input
                name="title"
                label="Title *"
                value={formData.title}
                onChange={handleChange}
                error={errors.title}
            />

            {/* Description TextArea */}
            <label className="block text-sm font-medium text-gray-700 mt-4">
                Description
            </label>
            <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="p-2 border rounded w-full"
                rows="4"
            />

            {/* Image Display */}
            <div className="mt-4">
                <h3 className="text-lg font-bold">Image</h3>
                {formData.image_url ? (
                    <div className="relative border rounded-lg p-2 w-64">
                        <img
                            src={formData.image_url}
                            alt="city_image"
                            className="rounded-lg w-full object-cover"
                        />
                        <button
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                            onClick={handleRemoveImage}
                        >
                            ❌
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center">
                        <input
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                        <Button onClick={handleUploadImage}
                            variant="upload"
                            className="ml-3">
                            Upload
                        </Button>
                    </div>
                )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-4">
                <button className="px-4 py-2 text-white rounded w-full bg-[#31AAB7] flex justify-center" onClick={handleSubmit}>
                    {city ? "Save Changes" : "Create City"}
                </button>
            </div>
        </Modal>
    );
};

export default CityForm;
