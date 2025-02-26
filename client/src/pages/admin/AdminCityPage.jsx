import { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Button } from "../../components/ui/button";
import { Table } from "../../components/ui/table";
import { Modal } from "../../components/ui/modal";
import { getCities } from "../../services/city.services";
import CityForm from "./form/CityForm";

const AdminCityPage = () => {
    const { token } = useContext(AuthContext);
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchCities();
    }, []);

    const fetchCities = async () => {
        try {
            const newCities = await getCities();
            setCities(newCities);
        } catch (error) {
            console.error("Failed to fetch cities", error);
        }
    };

    const handleEdit = (city) => {
        setSelectedCity(city);
        setShowModal(true);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Manage Cities</h1>
            </div>

            <Table
                data={cities}
                columns={[
                    { key: "title", label: "Title" },
                    { key: "description", label: "Description" },
                    { key: "rating", label: "Rating" },
                    { key: "is_active", label: "Status" },
                    {
                        key: "actions",
                        label: "Actions",
                        render: (city) => (
                            <div className="flex gap-2">
                                <Button
                                    variant="edit"
                                    onClick={() => handleEdit(city)}>
                                    Edit
                                </Button>
                            </div>
                        ),
                    },
                ]}
            />

            {/* City Form Modal */}
            {showModal && (
                <CityForm
                    city={selectedCity}
                    onClose={() => setShowModal(false)}
                    onRefresh={fetchCities}
                />
            )}
        </div>
    );
};

export default AdminCityPage;
