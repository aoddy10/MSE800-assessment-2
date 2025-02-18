import { Outlet, Link } from "react-router-dom";
import NavigationMain from "../components/Navigation-main";

const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar */}
            <NavigationMain />

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
