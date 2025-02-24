import { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Button } from "../../components/ui/button";
import { Table } from "../../components/ui/table";
import { Modal } from "../../components/ui/modal";
import { getUsers, toggleUserSuspended } from "../../services/user.services";

const AdminUserPage = () => {
    const { token } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showConfirmToggleSuspended, setShowConfirmToggleSuspended] =
        useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const newUsers = await getUsers(token);
            setUsers(newUsers);
        } catch (error) {
            console.error("Failed to fetch locations", error);
        }
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleToggleSuspended = (user) => {
        setSelectedUser(user);
        setShowConfirmToggleSuspended(true);
    };

    const confirmToggleSuspended = async () => {
        try {
            // TODO: Code still not working as get unauthorize from backend, but it can test by postman.
            await toggleUserSuspended(token, selectedUser.id);
            setShowConfirmToggleSuspended(false);
            fetchUsers(); // Refresh list after deletion
        } catch (error) {
            console.error("Failed to toggle suspended user", error);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Manage Users</h1>
            </div>

            <Table
                data={users}
                columns={[
                    { key: "first_name", label: "First Name" },
                    { key: "last_name", label: "Last Name" },
                    { key: "email", label: "Email" },
                    { key: "phone", label: "Phone" },
                    { key: "role", label: "Role" },
                    { key: "is_suspended", label: "Suspended" },
                    { key: "last_login", label: "Last login" },
                    {
                        key: "actions",
                        label: "Actions",
                        render: (user) => (
                            <div className="flex gap-2">
                                <Button onClick={() => handleEdit(user)}>
                                    Edit
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={() => handleToggleSuspended(user)}
                                >
                                    Suspend
                                </Button>
                            </div>
                        ),
                    },
                ]}
            />

            {/* Confirm toggle suspended Modal */}
            {showConfirmToggleSuspended && (
                <Modal
                    title="Confirm Delete"
                    onClose={() => setShowConfirmToggleSuspended(false)}
                    onConfirm={confirmToggleSuspended}
                >
                    "Do you sure you want to toggle suspended user
                    {selectedUser?.title}"?
                </Modal>
            )}
        </div>
    );
};

export default AdminUserPage;
