import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";

import Home from "./pages/Home";
import Zingerr from "./pages/Zingerr";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Support from "./pages/Support";
import RefundPolicy from "./pages/RefundPolicy";
import DeleteAccount from "./pages/DeleteAccount";
import AdminProducts from "./pages/AdminProducts";
import AdminCategories from "./pages/AdminCategories";
import AdminOffers from "./pages/AdminOffers";
import AdminProfiles from "./pages/AdminProfiles";
import AdminOrders from "./pages/AdminOrders";
import AdminOrderDetails from "./pages/AdminOrderDetails";
import DeliveryOrders from "./pages/DeliveryOrders";
import Login from "./components/Login";

const siteChromePaths = new Set([
  "/products/zingerr",
  "/privacy",
  "/terms",
  "/refund-policy",
  "/support",
  "/delete-account",
]);

export default function App() {
  const { pathname } = useLocation();
  const showSiteChrome = siteChromePaths.has(pathname);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-app-bg text-app-body flex flex-col">
        {showSiteChrome && <Navbar variant="zingerr" />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/zingerr" element={<Zingerr />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/support" element={<Support />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/delete-account" element={<DeleteAccount />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/categories" element={<AdminCategories />} />
          <Route path="/admin/offers" element={<AdminOffers />} />
          <Route path="/admin/profiles" element={<AdminProfiles />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/orders/:id" element={<AdminOrderDetails />} />
          <Route path="/delivery/orders" element={<DeliveryOrders />} />
        </Routes>

        {showSiteChrome && <Footer variant="zingerr" />}
      </div>
    </AuthProvider>
  );
}