import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LandingPage from "./pages/landingpage/LandingPage";
//import HomePage from "./pages/HomePage";
import HomePage from "./pages/homepage/home";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import MainLayout from "./layouts/MainLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import CityPage from "./pages/CityPage";



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
                        <Route path="/dashboard" element={<DashboardPage />} />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
