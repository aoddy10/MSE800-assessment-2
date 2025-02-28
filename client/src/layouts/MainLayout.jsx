import { Outlet } from "react-router-dom";
import NavigationMain from "../components/Navigation-main";
import FooterWhite from "../components/FooterWhite";

const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar */}
            <NavigationMain />

            {/* Page Content */}
            <div className="flex-grow p-0 bg-none">
                <Outlet /> {/* Renders the current page */}
            </div>

            {/* Footer */}
            <FooterWhite />
        </div>
    );
};

export default MainLayout;
