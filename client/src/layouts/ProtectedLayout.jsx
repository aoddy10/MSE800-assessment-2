import { Outlet, Link, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import useLogout from "../hooks/useLogout";

const ProtectedLayout = () => {
    const { token, isLoading } = useContext(AuthContext);
    const logout = useLogout(); // Use the custom logout hook

    // Show loading state while checking token
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                Loading...
            </div>
        );
    }

    // Redirect to login if no valid token
    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar */}
            <nav className="bg-blue-900 text-white p-4 flex justify-between">
                <h1 className="text-xl font-bold">Dashboard</h1>
                <div>
                    <Link to="/dashboard" className="mr-4">
                        Dashboard
                    </Link>
                    <button
                        className="bg-red-500 px-3 py-1 rounded"
                        onClick={logout}
                    >
                        Logout
                    </button>
                </div>
            </nav>

            {/* Page Content */}
            <div className="flex-grow p-6">
                <Outlet />
            </div>

            {/* Footer */}
            <footer className="bg-blue-800 text-white text-center p-4">
                © 2024 MyApp. Dashboard.
            </footer>
        </div>
    );
};

export default ProtectedLayout;
