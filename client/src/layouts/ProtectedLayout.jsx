import { Outlet, Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";

const ProtectedLayout = () => {
    const logout = useLogout(); // Use the custom hook

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
                        onClick={logout}
                        className="bg-red-500 px-3 py-1 rounded"
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
