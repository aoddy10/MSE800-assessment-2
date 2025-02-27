import { useState, useEffect, useContext } from "react";
import LocationForm from "./form/LocationForm";
import AuthContext from "../../context/AuthContext";
import { Button } from "../../components/ui/button";
import { Table } from "../../components/ui/table";
import { Modal } from "../../components/ui/modal";
import {
    getLocations,
    getLocationByUserId,
    deleteLocation,
} from "../../services/location.services";

const AdminLocationPage = () => {
    const { token, authUserInfo } = useContext(AuthContext);
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);

    useEffect(() => {
        // check if auth user's role is admin, fetch all location
        // and fetch location by user id if role is business
        if (token && authUserInfo.role === "admin") {
            fetchLocations();
        } else if (token && authUserInfo.role === "business") {
            fetchLocationsByUserId(authUserInfo.id);
        }
    }, [token, authUserInfo]);

    const fetchLocations = async () => {
        try {
            const newLocations = await getLocations();
            setLocations(newLocations);
        } catch (error) {
            console.error("Failed to fetch locations", error);
        }
    };

    // fetch location by user id
    const fetchLocationsByUserId = async (userId) => {
        try {
            const newLocations = await getLocationByUserId(userId);
            setLocations(newLocations);
        } catch (error) {
            console.error("Failed to fetch locations", error);
        }
    };

    const handleCreate = () => {
        setSelectedLocation(null);
        setShowModal(true);
    };

    const handleEdit = (location) => {
        setSelectedLocation(location);
        setShowModal(true);
    };

    const handleDelete = (location) => {
        setSelectedLocation(location);
        setShowConfirmDelete(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteLocation(selectedLocation.id, token);
            setShowConfirmDelete(false);
            fetchLocations(); // Refresh list after deletion
        } catch (error) {
            console.error("Failed to delete location", error);
        }
    };

    return (
        <div className="p-6 rounded-xl">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Manage Locations</h1>
                <button
                    onClick={handleCreate}
                    className="px-4 py-2 rounded text-[#31AAB7] font-semibold transition hover:bg-[#f9f9fb]"
                >
                    + Add Location
                </button>
            </div>

            <Table
                data={locations}
                columns={[
                    { key: "title", label: "Title" },
                    {
                        key: "image",
                        label: "Image",
                        render: (location) =>
                            location.cover_image_url ? (
                                <img
                                    src={location.cover_image_url}
                                    alt={location.title}
                                    className="h-20 w-32 object-cover rounded-md"
                                />
                            ) : (
                                <div className="h-20 w-32 rounded-md bg-gray-300 flex justify-center items-center">
                                    No Image
                                </div>
                            ),
                    },
                    { key: "type", label: "Type" },
                    { key: "city", label: "City" },
                    { key: "avg_rating", label: "Rating" },
                    { key: "price_per_person", label: "Price" },
                    {
                        key: "actions",
                        label: "Actions",
                        render: (location) => (
                            <div className="flex gap-4">
                                <Button
                                    variant="edit"
                                    onClick={() => handleEdit(location)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={() => handleDelete(location)}
                                >
                                    Delete
                                </Button>
                            </div>
                        ),
                    },
                ]}
            />

            {/* Location Form Modal */}
            {showModal && (
                <LocationForm
                    location={selectedLocation}
                    onClose={() => setShowModal(false)}
                    onRefresh={fetchLocations}
                />
            )}

            {/* Confirm Delete Modal */}
            {showConfirmDelete && (
                <Modal
                    title="Confirm Delete"
                    onClose={() => setShowConfirmDelete(false)}
                    onConfirm={confirmDelete}
                >
                    Are you sure you want to delete "{selectedLocation?.title}"?
                </Modal>
            )}
        </div>
    );
};

export default AdminLocationPage;
