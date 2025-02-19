import React, { useEffect, useState } from "react";

function ActivitySection() {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        // Fetch activity logs
        const fetchLogs = async () => {
            //     try {
            //         const response = await apiClient.get("/logs/recent", {
            //             headers: { Authorization: `Token ${token}` },
            //         });
            //         setLogs(response.data);
            //     } catch (error) {
            //         console.error("Failed to fetch logs");
            //     }
        };

        fetchLogs();
    }, []);

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
