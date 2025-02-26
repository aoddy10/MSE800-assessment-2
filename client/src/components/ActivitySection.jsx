import AuthContext from "../context/AuthContext";
import { getSystemLogs } from "../services/systemlog.services";
import React, { useContext, useEffect, useState } from "react";
import moment from "moment";

import { BellIcon } from "@heroicons/react/24/solid";

function ActivitySection() {
    const { token } = useContext(AuthContext);
    const [logs, setLogs] = useState([]);

    // Fetch dashboard stats
    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await getSystemLogs(token, {
                    sort_order: "desc",
                    date_range: "week",
                });

                setLogs(response);
            } catch (error) {
                console.error("Failed to fetch logs");
            }
        };

        fetchLogs();
    }, [token]);

    return (
        <div className="flex-grow flex flex-col">
            <h2 className="text-lg font-semibold flex items-center">
                <BellIcon className="h-5 w-5 mr-2" />
                Recent Activity
            </h2>
            <div className="mt-4 space-y-4 overflow-y-auto overflow-x-clip flex flex-col ">
                {logs.length > 0 ? (
                    logs.map((log, index) => (
                        <div
                            key={index}
                            className="flex flex-col text-sm py-1 bg-[#fafafa] p-2 rounded max-w-full"
                        >
                            <div className="flex justify-between items-center">
                                <div className="text-gray-400 text-[10px]">
                                    {moment(log.created_at).format(
                                        "D MMM yyyy"
                                    )}
                                </div>
                                <div
                                    className={`${
                                        log.module === "User"
                                            ? "bg-blue-200"
                                            : log.module === "Location"
                                            ? "bg-red-200"
                                            : log.module === "UploadedImage"
                                            ? "bg-green-200"
                                            : log.module === "Review" &&
                                              "bg-orange-200"
                                    } px-2 rounded text-xs font-thin`}
                                >
                                    {log.module}
                                </div>
                            </div>

                            {log.user && (
                                <div className="max-w-full">
                                    <p className="text-xs font-[600] text-[#232323]">
                                        {log.user.first_name}{" "}
                                        {log.user.last_name}
                                    </p>
                                </div>
                            )}
                            <p className=" text-xs font-thin opacity-80 max-w-full text-text/70">
                                {log.description}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-sm">
                        No recent activities.
                    </p>
                )}
            </div>
        </div>
    );
}

export default ActivitySection;
