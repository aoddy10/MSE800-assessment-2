import { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Button } from "../../components/ui/button";
import { Table } from "../../components/ui/table";
import { Modal } from "../../components/ui/modal";
import { getUsers, toggleUserSuspended } from "../../services/user.services";
import { UserAvatar } from "../../components/UserAvatar";
import moment from "moment";

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
                    {
                        key: "avatar",
                        label: "Avatar",
                        render: (user) => (
                            <UserAvatar
                                profileImageUrl={user.profile_image_url}
                                firstName={user.first_name}
                                lastName={user.last_name}
                                size="lg"
                            />
                        ),
                    },
                    { key: "first_name", label: "First Name" },
                    { key: "last_name", label: "Last Name" },
                    { key: "email", label: "Email" },
                    { key: "phone", label: "Phone" },
                    { key: "role", label: "Role" },
                    {
                        key: "last_login",
                        label: "Last login",
                        render: (user) =>
                            user.last_login
                                ? moment(user.last_login).format(
                                      "DD/MM/yyyy H:mm"
                                  )
                                : null,
                    },
                    {
                        key: "status",
                        label: "Status",
                        render: (user) => (
                            <div className="flex gap-2">
                                <Button
                                    variant="destructive"
                                    onClick={() => handleToggleSuspended(user)}
                                    className={`${
                                        user.is_suspended
                                            ? "bg-red-400"
                                            : "bg-blue-200"
                                    }`}
                                >
                                    {user.is_suspended
                                        ? "Suspend"
                                        : "Unsuspend"}
                                </Button>
                            </div>
                        ),
                    },
                ]}
            />

            {/* Confirm toggle suspended Modal */}
            {showConfirmToggleSuspended && (
                <Modal
                    title="Confirm Toggle Suspended"
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
