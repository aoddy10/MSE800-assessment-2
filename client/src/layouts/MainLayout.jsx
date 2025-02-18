import { Outlet, Link } from "react-router-dom";

const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar */}
            <nav className="bg-gray-900 text-white p-4 flex justify-between">
                <h1 className="text-xl font-bold">MyApp</h1>
                <div>
                    <Link to="/home" className="mr-4">
                        Home
                    </Link>
                    <Link to="/login">Login</Link>
                </div>
            </nav>

            {/* Page Content */}
            <div className="flex-grow p-6">
                <Outlet /> {/* Renders the current page */}
            </div>

            {/* Footer */}
            <footer className="bg-gray-800 text-white text-center p-4">
                © 2024 MyApp. All rights reserved.
            </footer>
        </div>
    );
};

export default MainLayout;
