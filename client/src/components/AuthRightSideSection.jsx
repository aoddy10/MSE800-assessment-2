import React from "react";

import cornerImage from "../assets/corner-png.png";
import cornerImage2 from "../assets/corner-png2.png";

import activeUsers from "../assets/activeUsers.png";
import backgroundImage from "../assets/startup-banner.jpg";

function AuthRightSideSection() {
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
                    <div className="flex items-center justify-start">
                        <img src={activeUsers} alt="activeUsers" />
                        <p>Active users</p>
                    </div>
                    <p className=" text-sm font-thin">
                        Kiwi Explorer helps you discover New Zealand’s best
                        destinations, from stunning landscapes to hidden gems.
                        Get travel insights, tips, and reviews to make your
                        adventure unforgettable!
                    </p>
                    <button className=" w-max px-4 py-2 text-white text-sm  border-none rounded-md cursor-pointer hover:bg-white/90 bg-white text-primary">
                        Explore Now
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AuthRightSideSection;
