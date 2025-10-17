import React, { useEffect, useState } from "react";
import Header from "../Header/header";
import Fotter from "../Fotter/fotter";
import UserSidebar from "../Dashboards/UserSideBar";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { validatePaymentForm } from "../../utils/formValidators";
import { createPayment } from "../../services/FEpaymentService";

export default function MakePayment() {
  const navigate = useNavigate();
  const location = useLocation();
  const requestDetails = location.state || {};
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ method: "visa", cardName: "", cardNumber: "", expiry: "", cvv: "" });

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formatted = value;

    if (name === "cardNumber") {
        formatted = value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
    }

    if (name === "expiry") {
        formatted = value
        .replace(/\D/g, "")
        .replace(/^(\d{2})(\d{0,2})$/, (_, m, y) => (y ? `${m}/${y}` : m));
    }

    if (name === "cvv") {
        formatted = value.replace(/\D/g, "").slice(0, 4);
    }

    setForm((prev) => ({ ...prev, [name]: formatted }));
    };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const { valid, errors } = validatePaymentForm(form);
    if (!valid) {
      toast.warning(Object.values(errors)[0]);
      return;
    }

    try {
        const payload = { user: user?._id || user?.id, requestId: requestDetails?._id || requestDetails?.id, method: form.method, amount: requestDetails?.fee || 0 };
        try {
            const response = await createPayment(payload);
            console.log("Payment response:", response);

            toast.success("✅ Payment successful!");

            navigate("/payment-success", {
                state: {
                ...payload,
                transactionId: response?.transactionId,
                paymentId: response?._id,
                status: response?.status,
                },
            });
        } catch (err) {
        console.error("Payment failed:", err);
        toast.error("❌ Payment failed. Please try again.");
        }

    } catch (err) {
      console.error("Payment failed:", err);
      toast.error("❌ Payment failed. Please try again.");
    }
  };

  const inputClass = "w-full border border-gray-500 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-green-500 focus:border-green-600 outline-none";
  const btnClass = (selected) => `p-3 border rounded ${selected ? "border-green-600 bg-green-50 border-2" : "border-gray-500"}`;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-emerald-100 via-teal-50 to-cyan-100">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <UserSidebar />
        <main className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-green-50/50 to-blue-50/50">
          <div className="max-w-4xl mx-auto">
            <div className="mb-4">
              <h1 className="text-xl font-bold text-gray-800">💳 Payment</h1>
              <p className="text-xs text-gray-600">Complete your secure payment</p>
            </div>

            <div className="grid md:grid-cols-3 gap-3">
              {/* Order Summary */}
              <div className="md:col-span-1">
                <div className="bg-white rounded-lg p-4 border border-gray-600 shadow-md">
                  <h2 className="font-semibold text-sm text-gray-800 mb-3">Order Summary</h2>
                  <div className="space-y-2 text-xs mb-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Request ID</span>
                      <span className="font-medium text-xs bg-gray-100 px-2 py-1 rounded border border-gray-400">
                        #{requestDetails?._id?.slice(-8).toUpperCase() || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Waste Type</span>
                      <span className="font-semibold text-gray-800">{requestDetails?.wasteType || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Quantity</span>
                      <span className="font-semibold text-gray-800">{requestDetails?.quantity || 0} kg</span>
                    </div>
                  </div>
                  <div className="border-t border-gray-400 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-sm">Total</span>
                      <span className="text-lg font-bold text-green-700">Rs. {requestDetails?.fee || 0}</span>
                    </div>
                  </div>
                  <div className="mt-3 bg-green-50 rounded p-2 text-xs text-green-800 border border-green-300 flex items-center gap-2">
                    🔒 <span>SSL encrypted payment</span>
                  </div>
                </div>
              </div>

              {/* Payment Form */}
              <div className="md:col-span-2">
                <div className="bg-white rounded-lg p-4 border border-gray-600 shadow-md">
                  <h2 className="font-semibold text-sm text-gray-800 mb-3">Payment Details</h2>
                  <form onSubmit={handleSubmit} className="space-y-3">
                    {/* Payment Method */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-800 mb-1.5">Payment Method</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button type="button" onClick={() => setForm(prev => ({ ...prev, method: "visa" }))} className={btnClass(form.method === "visa")}>
                          <div className="text-center font-bold text-sm text-blue-700">VISA</div>
                        </button>
                        <button type="button" onClick={() => setForm(prev => ({ ...prev, method: "master" }))} className={btnClass(form.method === "master")}>
                          <div className="text-center font-bold text-sm text-orange-600">MasterCard</div>
                        </button>
                      </div>
                    </div>

                    {/* Card Name */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-800 mb-1">Cardholder Name</label>
                      <input type="text" name="cardName" value={form.cardName} onChange={handleChange} placeholder="Amali Perera" className={inputClass} required />
                    </div>
                    
                    {/* Card Number */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-800 mb-1">Card Number</label>
                      <input type="text" name="cardNumber" value={form.cardNumber} onChange={handleChange} placeholder="1234 5678 9012 3456" maxLength="19" className={inputClass} required />
                    </div>
                    
                    {/* Expiry & CVV */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-800 mb-1">Expiry Date</label>
                        <input type="text" name="expiry" value={form.expiry} onChange={handleChange} placeholder="MM/YY" maxLength="5" className={inputClass} required />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-800 mb-1">CVV</label>
                        <input type="password" name="cvv" value={form.cvv} onChange={handleChange} placeholder="123" maxLength="4" className={inputClass} required />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="w-full py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold text-sm rounded hover:from-green-700 hover:to-teal-700 transition shadow-sm border border-gray-700">
                      Pay Rs. {requestDetails?.fee || 0}
                    </button>

                    {/* Security Notice */}
                    <p className="text-xs text-center text-gray-500 pt-1">Your payment information is encrypted and secure</p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Fotter />
    </div>
  );
}