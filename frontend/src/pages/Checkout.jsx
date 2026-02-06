import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaCcVisa, FaCcMastercard } from "react-icons/fa";

const CheckoutAnimated = () => {
  const { cart, refreshCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState(false);

  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    name: "",
  });
  const [vodafoneNumber, setVodafoneNumber] = useState("");

  const total = cart.items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const simulateProgress = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setSuccess(true);
          setLoading(false);
          return 100;
        }
        return prev + 5;
      });
    }, 50); // أسرع لتجربة أفضل
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    // التحقق من البيانات
    if (paymentMethod === "card" && (!cardDetails.cardNumber || !cardDetails.expiry || !cardDetails.cvv || !cardDetails.name)) {
      return alert("Please fill all card details");
    }
    if (paymentMethod === "vodafone" && !vodafoneNumber) {
      return alert("Please enter your Vodafone number");
    }

    setLoading(true);

    try {
      const data = paymentMethod === "vodafone" ? { paymentMethod, phone: vodafoneNumber } : { paymentMethod };
      
      // إرسال الطلب أولًا
      await axios.post("http://localhost:5000/api/orders", data, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      // تفريغ العربة بعد نجاح الطلب
      refreshCart();

      // بدء شريط التقدم بعد التأكد من الدفع
      simulateProgress();
    } catch (err) {
      console.error(err);
      alert("Payment failed ❌");
      setLoading(false); // إعادة تمكين الزر
    }
  };

if (success)
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 p-6">
      <div className="bg-white p-10 rounded-2xl shadow-2xl flex flex-col items-center w-full max-w-lg">
        {/* دائرة فيها الصح */}
        <div className="w-24 h-24 rounded-full border-4 border-green-500 flex items-center justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold mb-3">Payment Successful!</h1>
        <p className="text-lg mb-6 text-gray-700">Thank you for your purchase.</p>
        <button
          onClick={() => navigate("/")}
          className="bg-[#8D5F8C] text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  );




  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Checkout</h1>
        <p className="mb-4 font-semibold text-center">Total: {total} EGP</p>

        <form onSubmit={handlePayment} className="space-y-4">
          {/* Payment Method */}
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input type="radio" name="payment" value="card" checked={paymentMethod === "card"} onChange={(e) => setPaymentMethod(e.target.value)} />
              Credit / Debit Card <FaCcVisa className="inline text-blue-500"/> <FaCcMastercard className="inline text-red-600"/>
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="payment" value="cash" checked={paymentMethod === "cash"} onChange={(e) => setPaymentMethod(e.target.value)} />
              Cash on Delivery
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="payment" value="vodafone" checked={paymentMethod === "vodafone"} onChange={(e) => setPaymentMethod(e.target.value)} />
              Vodafone Cash
            </label>
          </div>

          {/* Card Details */}
          {paymentMethod === "card" && (
            <div className="flex flex-col gap-3 mt-2">
              <input type="text" name="cardNumber" value={cardDetails.cardNumber} onChange={handleInputChange} placeholder="Card Number" className="border px-3 py-2 rounded w-full" />
              <div className="flex gap-2">
                <input type="text" name="expiry" value={cardDetails.expiry} onChange={handleInputChange} placeholder="MM/YY" className="border px-3 py-2 rounded w-1/2" />
                <input type="text" name="cvv" value={cardDetails.cvv} onChange={handleInputChange} placeholder="CVV" className="border px-3 py-2 rounded w-1/2" />
              </div>
              <input type="text" name="name" value={cardDetails.name} onChange={handleInputChange} placeholder="Name on Card" className="border px-3 py-2 rounded w-full" />
            </div>
          )}

          {/* Vodafone Number */}
          {paymentMethod === "vodafone" && (
            <input type="text" value={vodafoneNumber} onChange={(e) => setVodafoneNumber(e.target.value)} placeholder="Enter Vodafone Number" className="border px-3 py-2 rounded w-full mt-2" />
          )}

          {/* Progress Bar */}
          {loading && (
            <div className="w-full bg-gray-300 h-2 rounded mt-2">
              <div className="bg-green-500 h-2 rounded transition-all duration-100" style={{ width: `${progress}%` }}></div>
            </div>
          )}

          <button type="submit" disabled={loading} className="w-full bg-[#8D5F8C] text-white px-4 py-2 rounded hover:bg-[#c192c0] transition mt-2">
            {loading ? "Processing Payment..." : "Pay Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutAnimated;
