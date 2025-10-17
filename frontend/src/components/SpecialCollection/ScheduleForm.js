import React, { useEffect, useState } from "react";
import Header from "../Header/header";
import Fotter from "../Fotter/fotter";
import UserSidebar from "../Dashboards/UserSideBar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { validateCollectionForm } from "../../utils/formValidators";
import { createRequest } from "../../services/FEscheduleService";
import { calculateFeeAndValidate, COLOMBO_AREAS } from "../../utils/helpers";
import { getAllSlots } from "../../services/FEslotService";
import RequestConfirmationModal from "./RequestConfirmationModal";
import SlotCalendar from "./SlotCalendar";
import { toLocalYMD } from "../../utils/helpers";

export default function ScheduleForm() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    name: "", address: "", area: "", userType: "resident", wasteType: "Bulky Waste", quantity: 1, preferredDate: "",
    slotId: "", fee: "", user: "",
  });
  const [slots, setSlots] = useState([]); // all slots
  const [filteredSlots, setFilteredSlots] = useState([]); // slots for selected date
  const [showConfirm, setShowConfirm] = useState(false);
  const [requestDetails, setRequestDetails] = useState(null);

  // Load user info from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed);
      setForm((prev) => ({ ...prev, name: parsed.name || "" }));
    }
  }, []);

  // Fetch all slots 
  useEffect(() => {
    console.log("Fetching all slots...");
    getAllSlots()
      .then((allSlots) => {
        console.log("All slots fetched:", allSlots);
        // filter available slots
        const available = allSlots.filter((s) => s.isAvailable === true);
        setSlots(available);
        console.log("Available slots:", available);
      })
      .catch((err) => console.error("Error loading slots:", err));
  }, []);

  // When a date is selected on the calendar
  const handleDateSelect = (selectedDate) => {
    const normalizedDate = toLocalYMD(selectedDate);
    console.log("User selected (normalized):", normalizedDate);

    setForm((prev) => ({ ...prev, preferredDate: normalizedDate }));

    const sameDaySlots = slots.filter(
      (s) => toLocalYMD(s.date) === normalizedDate && s.isAvailable === true
    );

    setFilteredSlots(sameDaySlots);
    console.log("Filtered slots for", normalizedDate, sameDaySlots);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("User not found, please log in.");

    const { fee } = calculateFeeAndValidate(form);
    const payload = { ...form, fee, user: user._id || user.id };

    const { valid, errors } = validateCollectionForm(payload);
    if (!valid) {
      toast.warning(Object.values(errors)[0]);
      return;
    }

    try {
      const response = await createRequest(payload);
      console.log("Created request response:", response);

      if (response.success === false) {
        toast.warning(response.message);

        setTimeout(() => navigate("/user-collection-requests"), 1500);
        return;
      }

      const selectedSlot = filteredSlots.find((s) => s._id == form.slotId);
      setRequestDetails({ ...payload, slot: selectedSlot });
      setShowConfirm(true);
      toast.success("Special collection request submitted!");
    } catch (err) {
      console.error("Error creating request:", err);
      toast.error("Failed to submit request. Please try again.");
    }


  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-teal-200 via-blue-50 to-emerald-100">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <UserSidebar />
        <main className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-green-50/50 to-blue-50/50">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-3">Special Collection Request</h1>
            <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md space-y-3 border border-gray-600">
              <div>
                <label className="block text-xs font-semibold text-gray-800 mb-1">Full Name</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Enter your full name" required className="w-full border border-gray-500 rounded py-2 px-3 text-sm focus:ring-1 focus:ring-green-500 focus:border-green-600" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-800 mb-1">Address</label>
                <input name="address" value={form.address} onChange={handleChange} placeholder="Street, City" required className="w-full border border-gray-500 rounded py-2 px-3 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-600" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-800 mb-1">User Type</label>
                  <select name="userType" value={form.userType} onChange={handleChange} className="w-full border border-gray-500 rounded py-2 px-3 text-sm focus:ring-1 focus:ring-green-500 focus:border-green-600">
                    <option value="resident">Resident</option><option value="business">Business</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-800 mb-1">Waste Type</label>
                  <select name="wasteType" value={form.wasteType} onChange={handleChange} required className="w-full border border-gray-500 rounded py-2 px-3 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-600">
                    <option value="Bulky Waste">Bulky Waste</option><option value="E-waste">E-waste</option><option value="Garden Waste">Garden Waste</option><option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-800 mb-1">Area (within Colombo)</label>
                  <select name="area" value={form.area} onChange={handleChange} required className="w-full border border-gray-500 rounded py-2 px-3 text-sm focus:ring-1 focus:ring-green-500 focus:border-green-600">
                    <option value="">-- Select Area --</option>
                    {COLOMBO_AREAS.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-800 mb-1">Waste Quantity (kg)</label>
                  <input type="number" name="quantity" min="1" value={form.quantity} onChange={handleChange} placeholder="Enter weight in kg" required className="w-full border border-gray-500 rounded py-2 px-3 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-600" />
                </div>
              </div>
              <div className="border border-gray-500 rounded p-3 bg-gradient-to-br from-green-50 to-blue-50">
                <label className="block text-xs font-semibold text-gray-800 mb-2">Select Pickup Date</label>
                <SlotCalendar availableSlots={slots} onDateSelect={handleDateSelect} />
              </div>
              {form.preferredDate && (
                <div>
                  <label className="block text-xs font-semibold text-gray-800 mb-1">Available Slots</label>
                  <select name="slotId" value={form.slotId} onChange={handleChange} required className="w-full border border-gray-500 rounded py-2 px-3 text-sm focus:ring-1 focus:ring-teal-500 focus:border-teal-600">
                    {filteredSlots.length ? (
                      <>
                        <option value="">-- Select Slot --</option>
                        {filteredSlots.map(s => <option key={s._id} value={s._id}>{s.startTime} - {s.endTime}</option>)}
                      </>
                    ) : <option value="">No slots available</option>}
                  </select>
                </div>
              )}
              <button type="submit" className="w-full py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold rounded hover:from-green-700 hover:to-teal-700 transition shadow-sm border border-gray-700">Submit Request</button>
            </form>
          </div>
          <RequestConfirmationModal
            visible={showConfirm}
            details={requestDetails}
            onClose={() => setShowConfirm(false)}
            onMakePayment={() => navigate("/make-payment", { state: requestDetails })}
            onViewRequests={() => navigate("/user-collection-requests")}
          />
        </main>
      </div>
      <Fotter />
    </div>
  );
}