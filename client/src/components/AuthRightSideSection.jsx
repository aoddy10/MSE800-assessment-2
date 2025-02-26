import React, { useEffect, useState } from "react";
import { gethActiveUsers } from "../services/user.services";

import cornerImage from "../assets/corner-png.png";
import cornerImage2 from "../assets/corner-png2.png";

import backgroundImage from "../assets/startup-banner.jpg";
import { UserAvatar } from "./UserAvatar";

function AuthRightSideSection() {
    const [activeUsers, setActiveUsers] = useState([]);

    useEffect(() => {
        const loadUsers = async () => {
            const users = await gethActiveUsers();
            console.log(users);
            setActiveUsers(users);
        };
        loadUsers();
    }, []);

    // Extract first 4 users for avatars, remaining count for "+X"
    const displayedUsers = activeUsers.slice(0, 4);
    const remainingUsers = activeUsers.length - displayedUsers.length;

    return (
        <div
            className="  bg-cover rounded-3xl bg-center w-full h-full"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className=" bg-black/30 relative w-full h-full flex rounded-3xl flex-col justify-end p-10">
                {/* Corner Decoration Images */}
                <img
                    src={cornerImage}
                    alt="corner"
                    className="absolute -top-1 -left-0"
                />
                <img
                    src={cornerImage2}
                    alt="corner2"
                    className="absolute -bottom-1 right-0"
                />
                <div className="text-white flex flex-col gap-4 p-8 w-2/3">
                    <h1 className="text-3xl font-bold">
                        Kiwi Explorer - Discover New Zealand
                    </h1>
                    <h2 className="text-xl font-bold">
                        Unlock the best travel experiences and hidden gems
                        across New Zealand.
                    </h2>

                    {/* Active Users Section */}

                    <div className="flex items-center justify-start gap-2">
                        <div className="flex items-center">
                            {/* Show Avatars */}
                            {displayedUsers.map((user, index) => (
                                <div
                                    key={`avatar-${index}`}
                                    className={`relative ${
                                        index !== 0 ? "-ml-1" : ""
                                    } z-${10 - index}`}
                                >
                                    <UserAvatar
                                        profileImageUrl={user.profile_image_url}
                                        firstName={user.first_name}
                                        lastName={user.last_name}
                                    />
                                </div>
                            ))}

                            {/* Show +X Users Count */}
                            {remainingUsers > 0 && (
                                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 text-white text-sm font-bold border-2 border-white -ml-1 z-0">
                                    +{remainingUsers}
                                </div>
                            )}
                        </div>
                        <div>Active users</div>
                    </div>
                    <p className=" text-sm font-thin">
                        Kiwi Explorer helps you discover New Zealand’s best
                        destinations, from stunning landscapes to hidden gems.
                        Get travel insights, tips, and reviews to make your
                        adventure unforgettable!
                    </p>
                    <button className=" w-max px-4 py-2 text-white text-sm  border-none rounded-md cursor-pointer hover:bg-white/90 bg-white !text-primary">
                        Explore Now
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AuthRightSideSection;
