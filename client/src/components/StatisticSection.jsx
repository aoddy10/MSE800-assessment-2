import { getLocations } from "../services/location.services";
import AuthContext from "../context/AuthContext";
import { getUsers } from "../services/user.services";
import React, { useContext, useEffect, useState } from "react";
import { getSystemLogs } from "../services/systemlog.services";
import {
    UsersIcon,
    BuildingOfficeIcon,
    ChartPieIcon,
} from "@heroicons/react/24/solid";

const StatisticCard = ({ title, value, icon }) => {
    return (
        <div className=" w-full flex flex-col gap-2 min-w-72 shadow-md rounded-lg bg-white h-40 p-4 justify-between">
            <h3 className="text-lg font-bold text-[#232323]">{title}</h3>
            <div className="flex justify-between w-full">
                <p className="text-4xl font-bold w-full text-[#31AAB7]">
                    {icon}
                </p>
                <p className="text-4xl font-bold text-right w-full text-[#31AAB7]">
                    {value}
                </p>
            </div>
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
                <div className=" w-1/3">
                    <StatisticCard
                        title="Total Users"
                        value={data.countUsers}
                        icon={
                            <UsersIcon className="h-10 w-10 text-[#31AAB7]" />
                        }
                    />
                </div>
            )}
            <div className=" w-1/3">
                <StatisticCard
                    title="Total Locations"
                    value={data.countLocations}
                    icon={
                        <BuildingOfficeIcon className="h-10 w-10 text-[#31AAB7]" />
                    }
                />
            </div>
            {authUserInfo.role && authUserInfo.role === "admin" && (
                <div className=" w-1/3">
                    <StatisticCard
                        title="Total Activities"
                        value={data.countActivities}
                        icon={
                            <ChartPieIcon className="h-10 w-10 text-[#31AAB7]" />
                        }
                    />
                </div>
            )}
        </div>
    );
};

export default StatisticSection;
