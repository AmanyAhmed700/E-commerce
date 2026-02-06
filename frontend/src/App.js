import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProductDetails from "./pages/ProductDetails";
import { CartProvider } from "./context/CartContext";
// index.js أو App.js
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-medium-image-zoom/dist/styles.css";
import SearchPage from "./pages/SearchPage";
import "./index.css"; // لو حطينا CSS إضافي (snippets أدناه)

 // استدعاء صحيح
import Men from "./pages/Men";
import Women from "./pages/Women";
import Kids from "./pages/Kids";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";

import AdminPanel from "./pages/admin/AdminPanel";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserList from "./components/UserList";
import AddProductForm from "./components/AddProductForm";
import ProductsAdmin from "./pages/admin/ProductsAdmin";
import Navbar from './components/Navbar';
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";
import Checkout from "./pages/Checkout";

// داخل <Routes>


function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Navbar />

            {/* المحتوى ياخد المساحة المتبقية */}
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                 <Route path="/search" element={<SearchPage />} />
                 
  <Route path="/men" element={<Men />} />
  <Route path="/women" element={<Women />} />
  <Route path="/kids" element={<Kids />} />
  <Route path="/product/:id" element={<ProductDetails />} />
  <Route element={<ProtectedRoute role="admin" />}>
  <Route path="/admin/products" element={<ProductsAdmin />} />
</Route>

                <Route element={<ProtectedRoute role="admin" />}>
                  <Route path="/admin" element={<AdminPanel />}>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="users" element={<UserList />} />
                    <Route path="add-product" element={<AddProductForm />} />
                  </Route>
                </Route>
              </Routes>
            </div>

            <Footer /> {/* هيفضل تحت دايمًا */}
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
