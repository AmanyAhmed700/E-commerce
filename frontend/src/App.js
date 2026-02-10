import React from "react";
// 1. استبدال BrowserRouter بـ HashRouter
import { HashRouter as Router, Routes, Route } from "react-router-dom"; 
import { AuthProvider } from "./context/AuthContext";
import ProductDetails from "./pages/ProductDetails";
import { CartProvider } from "./context/CartContext";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-medium-image-zoom/dist/styles.css";
import SearchPage from "./pages/SearchPage";
import "./index.css"; 

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

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          {/* استخدام overflow-x-hidden على الحاوية الرئيسية ضروري جداً 
             لمنع الـ scroll العرضي في الموبايل الناتج عن السايدبار
          */}
          <div className="flex flex-col min-h-screen w-full overflow-x-hidden bg-gray-50">
            <Navbar />

            {/* إضافة w-full هنا تضمن أن المسارات تأخذ كامل العرض المتاح 
               flex-grow تجعل الفوتر دائماً في الأسفل
            */}
            <main className="flex-grow w-full flex flex-col">
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
                
                {/* حماية مسارات الإدارة */}
                <Route element={<ProtectedRoute role="admin" />}>
                  <Route path="/admin/products" element={<ProductsAdmin />} />
                  <Route path="/admin" element={<AdminPanel />}>
                    {/* ملاحظة: تأكدي أن AdminPanel يحتوي على <Outlet /> 
                       داخل Div يملك كلاس flex-1 لتجنب تآكل المحتوى
                    */}
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="users" element={<UserList />} />
                    <Route path="add-product" element={<AddProductForm />} />
                  </Route>
                </Route>
              </Routes>
            </main>

            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;