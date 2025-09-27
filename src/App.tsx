import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import DashboardPage from "./pages/dashboardPage";
import AbsensiPage from "./pages/absensiPage";
import AbsensiDetailPage from "./pages/absensiDetailPage";
import MonitoringPage from "./pages/monitoringPage";

export default function App() {
return (
<Router>
<Navbar />
<main className="min-h-screen bg-[#2a2a2a] text-white">
<Routes>
<Route path="/" element={<DashboardPage />} />
<Route path="/absensi" element={<AbsensiPage />} />
<Route path="/absensi/:id" element={<AbsensiDetailPage/>}/>
<Route path="/monitoring" element={<MonitoringPage />} />
</Routes>
</main>
</Router>
);
}