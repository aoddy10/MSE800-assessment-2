import axiosInstance from "../api/axios";

/**
 * Fetch system logs from the API with optional filters.
 *
 * @param {string} token - Authentication token for authorization.
 * @param {Object} filters - Filtering options for fetching logs.
 * @param {string} [filters.sort_by] - Sorting order ('asc' or 'desc').
 * @param {number} [filters.user_id] - Filter logs by user ID.
 * @param {number} [filters.limit] - Limit the number of logs returned.
 * @returns {Promise<Object[]>} - Returns a list of system logs from the API.
 * @throws {Error} - Throws an error if fetching logs fails.
 */

export const getSystemLogs = async (token, filter) => {
    // Unpack filter object to extract filtering criteria
    const { sort_order, user_id, limit } = filter;

    // Construct query string dynamically based on available filters
    let queryString = "";
    if (sort_order) {
        queryString += `sort_order=${sort_order}&`; // Append sorting order
    }
    if (user_id) {
        queryString += `user_id=${user_id}&`; // Append user filter
    }
    if (limit) {
        queryString += `limit=${limit}&`; // Append result limit
    }

    try {
        // Send a GET request to fetch system logs with applied filters
        const response = await axiosInstance.get(
            `/system-logs/?${queryString}`, // API endpoint with query params
            {
                headers: { Authorization: `Token ${token}` }, // Include authentication token
            }
        );

        // Return the response data containing system logs
        return response.data;
    } catch (error) {
        // Log the error message to the console if request fails
        console.error("Error fetching logs:", error);

        // Rethrow the error for further handling in calling functions
        throw error;
    }
};
