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
                    limit: 10,
                    sort_order: "desc",
                });

                setLogs(response);
            } catch (error) {
                console.error("Failed to fetch logs");
            }
        };

        fetchLogs();
    }, [token]);

    return (
        <>
            <h2 className="text-lg font-semibold flex items-center">
                <BellIcon className="h-5 w-5 mr-2" />
                Recent Activity
            </h2>
            <div className="mt-4 space-y-4 overflow-hidden h-fit flex flex-col ">
                {logs.length > 0 ? (
                    logs.map((log, index) => (
                        <div
                            key={index}
                            className="flex flex-col text-sm py-1 bg-[#fafafa] p-2 rounded max-w-full"
                        >
                            <div className="text-gray-400 text-[10px]">
                                {moment(log.created_at).format("D MMM yyyy")}
                            </div>
                            {log.user_id && (
                                <div className="max-w-full">
                                    <p className="text-sm font-[600] text-[#232323]">
                                        {log.user_id.first_name} {log.user_id.last_name}
                                    </p>
                                </div>
                            )}
                            <p className="text-sm opacity-80 max-w-full">{log.description}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-sm">
                        No recent activities.
                    </p>
                )}
            </div>
        </>
    );
}

export default ActivitySection;
