import AuthContext from "../context/AuthContext";
import { getSystemLogs } from "../services/systemlog.services";
import React, { useContext, useEffect, useState } from "react";

function ActivitySection() {
    const { token } = useContext(AuthContext);
    const [logs, setLogs] = useState([]);

    // Fetch dashboard stats
    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await getSystemLogs(token);
                setLogs(response.data.slice(0, 10)); // Get latest 10 logs
            } catch (error) {
                console.error("Failed to fetch logs");
            }
        };

        fetchLogs();
    }, [token]);

    return (
        <>
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <ul className="mt-2 space-y-2">
                {logs.length > 0 ? (
                    logs.map((log, index) => (
                        <li
                            key={index}
                            className="text-sm py-1 border-b border-gray-300"
                        >
                            {log.description}
                        </li>
                    ))
                ) : (
                    <p className="text-gray-500 text-sm">
                        No recent activities.
                    </p>
                )}
            </ul>
        </>
    );
}

export default ActivitySection;
