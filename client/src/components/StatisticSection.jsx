import { getLocations } from "../services/location.services";
import AuthContext from "../context/AuthContext";
import { getUsers } from "../services/user.services";
import React, { useContext, useEffect, useState } from "react";
import { getSystemLogs } from "../services/systemlog.services";

const StatisticCard = ({ title, value }) => {
    return (
        <div className="flex flex-col gap-2 min-w-72 shadow-md rounded-lg bg-gray-50 h-40 p-4 justify-between">
            <h3 className=" text-secondary">{title}</h3>
            <p className="text-4xl text-right font-bold">{value}</p>
        </div>
    );
};

const StatisticSection = () => {
    const { token, authUserInfo } = useContext(AuthContext);
    const [data, setData] = useState({
        countUsers: 0,
        countLocations: 0,
        countActivities: 0,
    });

    useEffect(() => {
        if (authUserInfo.role && authUserInfo.role === "admin") {
            fetchTotalUsers();
            fetchTotalLocations();
            fetchSystemLogs();
        } else {
            fetchTotalLocations(authUserInfo.id);
        }
    }, []);

    // fetch total user
    const fetchTotalUsers = async () => {
        const response = await getUsers(token);
        setData((prev) => ({ ...prev, countUsers: response.length || 0 }));
    };

    // fetch total location
    const fetchTotalLocations = async (userId = null) => {
        const response = await getLocations({
            userId: userId,
        });
        setData((prev) => ({ ...prev, countLocations: response.length || 0 }));
    };

    // fetch system logs for last 7 days
    const fetchSystemLogs = async () => {
        const response = await getSystemLogs(token, { date_range: "week" });
        setData((prev) => ({ ...prev, countActivities: response.length || 0 }));
    };

    return (
        <div className="flex gap-4">
            {authUserInfo.role && authUserInfo.role === "admin" && (
                <StatisticCard title="Total Users" value={data.countUsers} />
            )}
            <StatisticCard
                title="Total Locations"
                value={data.countLocations}
            />
            {authUserInfo.role && authUserInfo.role === "admin" && (
                <StatisticCard
                    title="Total Activities"
                    value={data.countActivities}
                />
            )}
        </div>
    );
};

export default StatisticSection;
