import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LandingPage from "./pages/landingpage/LandingPage";

// layouts
import MainLayout from "./layouts/MainLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";

// pages
import HomePage from "./pages/homepage/HomePage";
import CityPage from "./pages/CityPage";
import AdminUserPage from "./pages/admin/AdminUserPage";
import AdminCityPage from "./pages/admin/AdminCityPage";
import AdminLocationPage from "./pages/admin/AdminLocationPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import MaoriPage from "./pages/MaoriPage";

// auth pages
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPassword from "./pages/auth/ForgotPassword";
import CreateNewPassword from "./pages/auth/CreateNewPassword";

import LocationPage from "./pages/LocationPage";
import NotFoundPage from "./pages/NotFoundPage";
import UserProfilePage from "./pages/admin/UserProfilePage";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Public Layout */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                    />
                    <Route
                        path="/reset-password/:resetToken"
                        element={<CreateNewPassword />}
                    />

                    <Route element={<MainLayout />}>
                        <Route path="/city/:id" element={<CityPage />} />
                        <Route path="/explore" element={<HomePage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/maori" element={<MaoriPage />} />
                        <Route
                            path="/location/:id"
                            element={<LocationPage />}
                        />
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
                        <Route
                            path="/admin/profile"
                            element={<UserProfilePage />}
                        />
                    </Route>

                    {/* 404 Page (Must be at the bottom) */}
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
