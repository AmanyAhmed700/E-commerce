import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// ترجمات المشروع
const resources = {
  en: {
    translation: {
      men: "Men",
      women: "Women",
      kids: "Kids",
      cart: "Cart",
      login: "Login",
      register: "Register",
      logout: "Logout",
      total: "Total",
      paymentSuccessful: "Payment Successful!",
      paymentFailed: "Payment Failed ❌",
      thankYou: "Thank you for your purchase.",
      payNow: "Pay Now",
      // أضف باقي النصوص هنا حسب التطبيق
    }
  },
  ar: {
    translation: {
      men: "رجالي",
      women: "نسائي",
      kids: "أطفال",
      cart: "السلة",
      login: "تسجيل الدخول",
      register: "تسجيل",
      logout: "تسجيل الخروج",
      total: "الإجمالي",
      paymentSuccessful: "تم الدفع بنجاح!",
      paymentFailed: "فشل الدفع ❌",
      thankYou: "شكراً لشرائك.",
      payNow: "ادفع الآن",
      // أضف باقي النصوص هنا حسب التطبيق
    }
  }
};

i18n
  .use(LanguageDetector) // يكتشف لغة المتصفح تلقائياً
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // react يحمي من XSS
    },
  });

export default i18n;
