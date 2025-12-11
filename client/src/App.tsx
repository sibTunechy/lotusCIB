import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import ManagementPage from "./pages/ManagementPage";
import OnboardingPage from "./pages/OnboardingPage";
import AuditPage from "./pages/AuditPage";
import ApprovalPage from "./pages/ApprovalPage";

function App() {
    return (
        <Routes>
            {/* Login route without Navbar */}
            {/* All other routes with Navbar */}
            <Route
                path="/*"
                element={
                    <div className="min-h-screen bg-gray-100">
                        <div className="p-6">
                            <Routes>
                                <Route path="/" element={<LoginPage />} />
                                <Route path="/dashboard" element={<DashboardPage />} />
                                <Route path="/onboarding" element={<OnboardingPage />} />
                                <Route path="/management" element={<ManagementPage />} />
                                <Route path="/approval" element={<ApprovalPage />} />
                                <Route path="/audit" element={<AuditPage />} />
                            </Routes>
                        </div>
                    </div>
                }
            />
        </Routes>
    );
}

export default App;