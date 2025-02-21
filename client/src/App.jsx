import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LandingPage from "./pages/landingpage/LandingPage";
//import HomePage from "./pages/HomePage";
import HomePage from "./pages/homepage/home";
import LoginPage from "./pages/auth/LoginPage";
import MainLayout from "./layouts/MainLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import CityPage from "./pages/CityPage";
import AdminUserPage from "./pages/admin/AdminUserPage";
import AdminCityPage from "./pages/admin/AdminCityPage";
import AdminLocationPage from "./pages/admin/AdminLocationPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import MaoriPage from "./pages/MaoriPage";



function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Public Layout */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                   

                    <Route element={<MainLayout />}>
                        <Route path="/city/:id" element={<CityPage />} />
                        <Route path="/explore" element={<HomePage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/maori" element={<MaoriPage />} />
                    </Route>

                    {/* Protected Layout */}
                    <Route element={<ProtectedLayout />}>
                        <Route
                            path="/admin/users"
                            element={<AdminUserPage />}
                        />
                        <Route
                            path="/admin/cities"
                            element={<AdminCityPage />}
                        />
                        <Route
                            path="/admin/locations"
                            element={<AdminLocationPage />}
                        />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
