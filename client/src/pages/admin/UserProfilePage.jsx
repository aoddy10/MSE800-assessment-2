import AuthContext from "../../context/AuthContext";
import React, { useContext } from "react";

function UserProfilePage() {
    const { authUserInfo } = useContext(AuthContext);

    return (
        <div className="p-6">
            <div className="flex flex-col gap-3">
                <h1 className="text-2xl font-bold">User Profile</h1>
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
        </div>
    );
}

export default UserProfilePage;
