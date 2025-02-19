import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LandingPage from "./pages/landingpage/LandingPage";
//import HomePage from "./pages/HomePage";
import HomePage from "./pages/homepage/home";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./layouts/MainLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import CityPage from "./pages/CityPage";
import AdminUserPage from "./pages/admin/AdminUserPage";
import AdminCityPage from "./pages/admin/AdminCityPage";
import AdminLocationPage from "./pages/admin/AdminLocationPage";
import NotFoundPage from "./pages/NotFoundPage";

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

                    {/* 404 Page (Must be at the bottom) */}
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
