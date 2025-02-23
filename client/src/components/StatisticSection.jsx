import { getLocations } from "../services/location.services";
import AuthContext from "../context/AuthContext";
import { getUsers } from "../services/user.services";
import React, { useContext, useEffect, useState } from "react";

const StatisticCard = ({ title, value }) => {
    return (
        <div className="flex flex-col gap-2 flex-grow shadow-md rounded-lg bg-gray-50 h-40 p-4 justify-between">
            <h3 className=" text-secondary">{title}</h3>
            <p className="text-4xl text-right font-bold">{value}</p>
        </div>
    );
};

const StatisticSection = () => {
    const { token } = useContext(AuthContext);
    const [data, setData] = useState({
        countUsers: 0,
        countLocations: 0,
        countActivities: 0,
    });

    useEffect(() => {
        fetchTotalUsers();
        fetchTotalLocations();
    }, []);

    // fetch total user
    const fetchTotalUsers = async () => {
        const response = await getUsers(token);
        setData((prev) => ({ ...prev, countUsers: response.length || 0 }));
    };

    // fetch total location
    const fetchTotalLocations = async () => {
        const response = await getLocations(token);
        setData((prev) => ({ ...prev, countLocations: response.length || 0 }));
    };

    return (
        <div className="flex gap-4">
            <StatisticCard title="Total Users" value={data.countUsers} />
            <StatisticCard
                title="Total Locations"
                value={data.countLocations}
            />
            <StatisticCard
                title="Activities in last 7 Days"
                value={data.countActivities}
            />
        </div>
    );
};

export default StatisticSection;
