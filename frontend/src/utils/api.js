import axios from "axios";

const api = axios.create({
  // تأكدي من وجود https:// في البداية ليعرف المتصفح أنه عنوان خارجي
  baseURL: "https://e-commerce-production-24e0.up.railway.app/api", 
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;