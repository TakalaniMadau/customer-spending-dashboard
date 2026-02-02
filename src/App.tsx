import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import AppLayout from "./components/layout/AppLayout";
import DashboardPage from "./routes/dashboard/DashboardPage";

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
