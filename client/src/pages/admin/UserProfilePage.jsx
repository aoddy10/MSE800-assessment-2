import { UserAvatar } from "../../components/UserAvatar";
import AuthContext from "../../context/AuthContext";
import React, { useContext } from "react";
import { useState } from "react";
import UserProfileForm from "./form/UserProfileForm";
import { getMe } from "../../services/auth.service.s";
import { Button } from "../../components/ui/button";

function UserProfilePage() {
    const { token, authUserInfo, setAuthUserInfo } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);

    const fetchMe = async () => {
        try {
            const newUser = await getMe(token);
            setAuthUserInfo(newUser);
        } catch (error) {}
    };

    const handleEdit = () => {
        setShowModal(true);
    };

    return (
        <div className="p-6">
            <div className="flex flex-col gap-3">
                <h1 className="text-2xl font-bold">User Profile</h1>

                <UserAvatar
                    profileImageUrl={authUserInfo.profile_image_url}
                    firstName={authUserInfo.first_name}
                    lastName={authUserInfo.last_name}
                    size="xl"
                />
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-baseline">
                        <div className=" text-gray-400 w-32">First Name:</div>
                        <div>{authUserInfo.first_name}</div>
                    </div>
                    <div className="flex gap-2 items-baseline">
                        <div className=" text-gray-400 w-32">Last Name:</div>
                        <div>{authUserInfo.last_name}</div>
                    </div>
                    <div className="flex gap-2 items-baseline">
                        <div className=" text-gray-400 w-32">Email :</div>
                        <div>{authUserInfo.email}</div>
                    </div>
                    <div className="flex gap-2 items-baseline">
                        <div className=" text-gray-400 w-32">Phone:</div>
                        <div>{authUserInfo.phone}</div>
                    </div>
                </div>

                <div>
                    <Button onClick={handleEdit}>Edit</Button>
                </div>
            </div>

            {/* User Form Modal */}
            {showModal && (
                <UserProfileForm
                    user={authUserInfo}
                    onClose={() => setShowModal(false)}
                    onRefresh={fetchMe}
                />
            )}
        </div>
    );
}

export default UserProfilePage;
