import { useState, useEffect, useContext } from "react";
import { Input } from "../../../components/ui/input";
import apiClient from "../../../api/axios";
import { Button } from "../../../components/ui/button";
import { Modal } from "../../../components/ui/modal";
import AuthContext from "../../../context/AuthContext";
import { getCities } from "../../../services/city.services";
import {
    createLocation,
    getLocationGallery,
    updateLocation,
} from "../../..//services/location.services";
import {
    createUploadImage,
    deleteUploadImage,
} from "../../../services/upload-image.services";

const LocationForm = ({ location, onClose, onRefresh }) => {
    const { token, authUserInfo } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        title: "",
        user: authUserInfo.id,
        city: "",
        type: "restaurant",
        description: "",
        contact_email: "",
        contact_phone: "",
        open_hour_detail: "",
        location_url: "",
        menu_url: "",
        price_per_person: "",
        is_active: true,
        cover_image_url: "", // Store the uploaded image URL
    });
    const [image, setImage] = useState(null);
    const [gallery, setGallery] = useState([]);
    const [cities, setCities] = useState([]); // Stores fetched cities

    // Fetch Cities from API
    const fetchCities = async () => {
        try {
            const newCities = await getCities();
            setCities(newCities);
        } catch (error) {
            console.error("Failed to fetch cities");
        }
    };

    // Fetch Gallery Images for Location
    const fetchGallery = async () => {
        if (!location) return;
        try {
            const response = await getLocationGallery(location.id);
            setGallery(response.data);
        } catch (error) {
            console.error("Failed to fetch gallery");
        }
    };

    // Load Data on Component Mount
    useEffect(() => {
        fetchCities(); // Load city data
        if (location) {
            setFormData({ ...location });
            fetchGallery();
        }
    }, [location]);

    // Handle Input Change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle Cover Image Upload
    const handleUploadCoverImage = async () => {
        if (!image) return;

        try {
            const result = await createUploadImage(image, token);
            console.log(result.image_url);
            setFormData({
                ...formData,
                cover_image_url: result.image_url, // Store the uploaded image URL
            });
        } catch (error) {
            console.error("Failed to upload cover image");
        }
    };

    // Handle Cover Image Delete
    const handleRemoveCoverImage = async () => {
        if (!formData.cover_image_url) return;

        try {
            await deleteUploadImage(formData.cover_image_url, token);

            // Update the UI state
            setFormData({ ...formData, cover_image_url: null });
        } catch (error) {
            console.error("Failed to remove cover image", error);
            alert("Error: Unable to remove cover image.");
        }
    };

    // Handle Form Submission (Create or Update)
    const handleSubmit = async () => {
        try {
            if (location) {
                await updateLocation(location.id, { ...formData }, token);
            } else {
                await createLocation({ ...formData }, token);
            }
            onClose();
            onRefresh();
        } catch (error) {
            console.error("Failed to save location");
        }
    };

    return (
        <Modal
            title={location ? "Edit Location" : "New Location"}
            width="500px"
            onClose={onClose}
        >
            {/* Title Input */}
            <Input
                name="title"
                label="Title"
                value={formData.title}
                onChange={handleChange}
            />

            {/* City Dropdown */}
            <label className="block text-sm font-medium text-gray-700 mt-4">
                City
            </label>
            <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="p-2 border rounded w-full"
            >
                <option value="">Select a City</option>
                {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                        {city.title}
                    </option>
                ))}
            </select>

            {/* Type Dropdown */}
            <label className="block text-sm font-medium text-gray-700 mt-4">
                Type
            </label>
            <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="p-2 border rounded w-full"
            >
                <option value="restaurant">Restaurant</option>
                <option value="activity">Activity</option>
            </select>

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

            {/* Contact Email and Phone */}
            <Input
                name="contact_email"
                label="Contact Email"
                value={formData.contact_email}
                onChange={handleChange}
            />
            <Input
                name="contact_phone"
                label="Contact Phone"
                value={formData.contact_phone}
                onChange={handleChange}
            />

            {/* Price Per Person (Number) */}
            <Input
                type="number"
                name="price_per_person"
                label="Price Per Person"
                value={formData.price_per_person}
                onChange={handleChange}
            />

            {/* Cover Image Display */}
            <div className="mt-4">
                <h3 className="text-lg font-bold">Cover Image</h3>
                {formData.cover_image_url ? (
                    <div className="relative border rounded-lg p-2 w-64">
                        <img
                            src={formData.cover_image_url}
                            alt="Cover"
                            className="rounded-lg w-full object-cover"
                        />
                        <button
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                            onClick={handleRemoveCoverImage}
                        >
                            ❌
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col">
                        <label className="text-gray-700">
                            Upload Cover Image
                        </label>
                        <input
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                        <Button
                            onClick={handleUploadCoverImage}
                            className="mt-2"
                        >
                            Upload
                        </Button>
                    </div>
                )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-4">
                <Button onClick={handleSubmit}>
                    {location ? "Save Changes" : "Create Location"}
                </Button>
            </div>
        </Modal>
    );
};

export default LocationForm;
