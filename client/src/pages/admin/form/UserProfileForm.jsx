import { useState, useEffect, useContext } from "react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Modal } from "../../../components/ui/modal";
import AuthContext from "../../../context/AuthContext";
import { updateUser } from "../../../services/user.services";

import {
    createUploadImage,
    deleteUploadImage,
} from "../../../services/upload-image.services";
import { isValidEmail } from "../../../utils/libs";

const UserProfileForm = ({ user, onClose, onRefresh }) => {
    const { token } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        profile_image_url: "",
    });
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({});

    // Load Data on Component Mount
    useEffect(() => {
        console.log(user);
        setFormData({ ...user });
    }, [user]);

    // Handle Input Change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Validate Required Fields
    const validateForm = () => {
        const newErrors = {};

        if (!formData.first_name)
            newErrors.first_name = "First name is required";
        if (!formData.last_name) newErrors.last_name = "Last name is required";
        if (!formData.email) newErrors.email = "Email is required";

        // Validate email format
        if (!isValidEmail(formData.email)) {
            newErrors.email = "Invalid email format.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle Form Submission (Create or Update)
    const handleSubmit = async () => {
        if (!validateForm()) return; // Stop if validation fails

        try {
            await updateUser(token, user.id, formData);

            onClose();
            onRefresh();
        } catch (error) {
            // set errors to for the response error
            setErrors(error.response.data);

            console.error("Failed to save user", error.response.data);
        }
    };

    // Handle Image Upload
    const handleUploadImage = async () => {
        if (!image) return;

        try {
            const result = await createUploadImage(image, token);
            setFormData({
                ...formData,
                profile_image_url: result.image_url, // Store  URL
            });
        } catch (error) {
            console.error("Failed to upload image");
        }
    };

    // Handle Image Delete
    const handleRemoveImage = async () => {
        if (!formData.profile_image_url) return;

        try {
            await deleteUploadImage(formData.profile_image_url, token);

            // Update the UI state
            setFormData({ ...formData, profile_image_url: null });
        } catch (error) {
            console.error("Failed to remove image", error);
            alert("Error: Unable to remove image.");
        }
    };

    return (
        <Modal
            title={user ? "Edit User Profile" : "New User Profile"}
            width="500px"
            onClose={onClose}
        >
            {/* First ame Input */}
            <Input
                name="first_name"
                label="First name *"
                value={formData.first_name}
                onChange={handleChange}
                error={errors.first_name}
            />

            {/* Last Name Input */}
            <Input
                name="last_name"
                label="Last name *"
                value={formData.last_name}
                onChange={handleChange}
                error={errors.last_name}
            />

            {/* Email Input */}
            <Input
                name="email"
                label="Email *"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
            />

            {/* Phone Input */}
            <Input
                name="phone"
                label="Phone"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
            />

            {/* Image Display */}
            <div className="mt-4">
                <h3 className="text-lg font-bold">Profile Image</h3>
                {formData.profile_image_url ? (
                    <div className="relative border rounded-lg p-2 w-64">
                        <img
                            src={formData.profile_image_url}
                            alt="Cover"
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
                    <div className="flex flex-col">
                        <label className="text-gray-700">Upload Image</label>
                        <input
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                        <Button onClick={handleUploadImage} className="mt-2">
                            Upload
                        </Button>
                    </div>
                )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-4">
                <Button onClick={handleSubmit}>
                    {user ? "Save Changes" : "Create User"}
                </Button>
            </div>
        </Modal>
    );
};

export default UserProfileForm;
