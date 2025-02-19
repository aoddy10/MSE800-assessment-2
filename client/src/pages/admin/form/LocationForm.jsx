import { useState, useEffect, useContext } from "react";
import apiClient from "../../api/axios";
import AuthContext from "../../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";

const LocationForm = ({ location, onClose, onRefresh }) => {
    const { token } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        title: "",
        city: "",
        type: "restaurant",
        description: "",
        price_per_person: "",
        is_active: true,
    });
    const [image, setImage] = useState(null);
    const [gallery, setGallery] = useState([]);

    useEffect(() => {
        if (location) {
            setFormData({ ...location });
            fetchGallery();
        }
    }, [location]);

    const fetchGallery = async () => {
        try {
            const response = await apiClient.get(
                `/locations/${location.id}/gallery/`
            );
            setGallery(response.data);
        } catch (error) {
            console.error("Failed to fetch gallery");
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = async () => {
        if (!image) return;

        const formData = new FormData();
        formData.append("image", image);

        try {
            const response = await apiClient.post("/upload-image/", formData, {
                headers: {
                    Authorization: `Token ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            setGallery([...gallery, response.data]);
        } catch (error) {
            console.error("Failed to upload image");
        }
    };

    const handleImageDelete = async (imageId) => {
        try {
            await apiClient.delete(`/upload-image/${imageId}/delete/`, {
                headers: { Authorization: `Token ${token}` },
            });
            setGallery(gallery.filter((img) => img.id !== imageId));
        } catch (error) {
            console.error("Failed to delete image");
        }
    };

    const handleSubmit = async () => {
        try {
            if (location) {
                await apiClient.put(
                    `/locations/${location.id}/update/`,
                    formData,
                    {
                        headers: { Authorization: `Token ${token}` },
                    }
                );
            } else {
                await apiClient.post("/locations/create/", formData, {
                    headers: { Authorization: `Token ${token}` },
                });
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
            onClose={onClose}
        >
            <Input
                name="title"
                label="Title"
                value={formData.title}
                onChange={handleChange}
            />
            <Input
                name="city"
                label="City"
                value={formData.city}
                onChange={handleChange}
            />
            <Input
                name="type"
                label="Type"
                value={formData.type}
                onChange={handleChange}
            />
            <Input
                name="description"
                label="Description"
                value={formData.description}
                onChange={handleChange}
            />
            <Input
                name="price_per_person"
                label="Price Per Person"
                value={formData.price_per_person}
                onChange={handleChange}
            />

            <label>Upload Image</label>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            <Button onClick={handleImageUpload}>Upload</Button>

            <div className="mt-4">
                <h3 className="text-lg font-bold">Gallery</h3>
                <div className="grid grid-cols-3 gap-2">
                    {gallery.map((img) => (
                        <div key={img.id} className="relative">
                            <img
                                src={img.image_url}
                                alt="Location"
                                className="rounded-lg w-full"
                            />
                            <button
                                className="absolute top-0 right-0 bg-red-500 text-white p-1"
                                onClick={() => handleImageDelete(img.id)}
                            >
                                X
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-end mt-4">
                <Button onClick={handleSubmit}>
                    {location ? "Save Changes" : "Create Location"}
                </Button>
            </div>
        </Modal>
    );
};

export default LocationForm;
