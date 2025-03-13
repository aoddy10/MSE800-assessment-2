import React, { useEffect, useState } from "react";
import "../../styles/HeroSection.css";
import heroPic1 from "../../assets/about3.jpg";
import { useNavigate } from "react-router-dom";
import { gethActiveUsers } from "../../services/user.services";
import { UserAvatar } from "../../components/UserAvatar";

const HeroSection = () => {
    const navigate = useNavigate();
    const [activeUsers, setActiveUsers] = useState([]);

    useEffect(() => {
        const loadUsers = async () => {
            const users = await gethActiveUsers();
            setActiveUsers(users);
        };
        loadUsers();
    }, []);

    // Extract first 4 users for avatars, remaining count for "+X"
    const displayedUsers = activeUsers.slice(0, 4);
    const remainingUsers = activeUsers.length - displayedUsers.length;

    const handleClick = () => {
        navigate(`/explore`);
    };

    return (
        <div className="hero-content1">
            <div className="boxing">
                <div className="landing-text-content !w-fit">
                    <h2 className="animate-fade-in-up">
                        Welcome to kiwi explorer
                    </h2>
                    <p className="animate-fade-in-up">
                        Your Gateway to Authentic New Zealand. We <br />
                        specialize in crafting immersive journeys that go beyond{" "}
                        <br />
                        the tourist trail. Discover the breathtaking beauty{" "}
                        <br />
                        of Aotearoa, from rugged coastlines to lush rainforests,{" "}
                        <br />
                        with our expert local guides.
                    </p>

                    {/* Active Users Section */}

                    <div className="flex items-center justify-start gap-2 mt-4">
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

                    <button
                        onClick={handleClick}
                        className="landing-exploreBtn"
                    >
                        Explore Now
                    </button>
                </div>

                <div className="location-gallery animate-fade-in-up">
                    <img
                        src={heroPic1}
                        alt="NZ"
                        className="w-full h-full object-cover rounded-md"
                    />
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
