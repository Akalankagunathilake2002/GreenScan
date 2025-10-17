
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Header from "../Header/header";
// import Fotter from "../Fotter/fotter";
// import Sidebar from "./adminSlidebar";

// // 🧱 Base URL constant (easy to refactor later)
// const API_BASE = "http://localhost:5002/api/waste";

// export default function AdminAddRecord() {
//   const [collapsed, setCollapsed] = useState(false);
//   const [records, setRecords] = useState([]);
//   const [form, setForm] = useState({
//     area: "",
//     wasteType: "",
//     quantity: "",
//     collectionDate: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [message, setMessage] = useState("");

//   // 🔄 Load records on mount
//   useEffect(() => {
//     fetchRecords();
//   }, []);

//   const fetchRecords = async () => {
//     try {
//       const res = await axios.get(API_BASE);
//       setRecords(res.data);
//     } catch (err) {
//       console.error("❌ Error loading records:", err);
//     }
//   };

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   // 🧩 Create or Update
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       if (editingId) {
//         await axios.put(`${API_BASE}/${editingId}`, form);
//         setMessage("✅ Record updated successfully");
//       } else {
//         await axios.post(API_BASE, form);
//         setMessage("✅ Record added successfully");
//       }

//       setForm({ area: "", wasteType: "", quantity: "", collectionDate: "" });
//       setEditingId(null);
//       fetchRecords(); // refresh table
//     } catch (error) {
//       console.error(error);
//       setMessage("⚠️ Error saving record");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✏️ Edit
//   const handleEdit = (record) => {
//     setForm({
//       area: record.area,
//       wasteType: record.wasteType,
//       quantity: record.quantity,
//       collectionDate: record.collectionDate.split("T")[0],
//     });
//     setEditingId(record._id);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   // 🗑️ Delete
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this record?")) return;
//     try {
//       await axios.delete(`${API_BASE}/${id}`);
//       fetchRecords();
//       setMessage("🗑️ Record deleted");
//     } catch (error) {
//       console.error(error);
//       setMessage("⚠️ Failed to delete record");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col">
//       <Header />
//       <main className="flex flex-1">
//         <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

//         <div className="flex-1 p-8">
//           <h1 className="text-3xl font-bold text-gray-800 mb-6">♻ Waste Record Management</h1>

//           {/* --- Add/Edit Form --- */}
//           <form
//             onSubmit={handleSubmit}
//             className="bg-white shadow-md rounded-xl p-6 max-w-xl border border-gray-100"
//           >
//             <h2 className="text-xl font-semibold mb-4">
//               {editingId ? "✏️ Edit Record" : "➕ Add New Record"}
//             </h2>
//             <div className="grid gap-4">
//               <InputField label="Area" name="area" value={form.area} onChange={handleChange} />
//               <InputField
//                 label="Waste Type"
//                 name="wasteType"
//                 value={form.wasteType}
//                 onChange={handleChange}
//               />
//               <InputField
//                 label="Quantity (kg)"
//                 name="quantity"
//                 type="number"
//                 value={form.quantity}
//                 onChange={handleChange}
//               />
//               <InputField
//                 label="Collection Date"
//                 name="collectionDate"
//                 type="date"
//                 value={form.collectionDate}
//                 onChange={handleChange}
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="mt-5 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
//             >
//               {loading ? "Saving..." : editingId ? "Update Record" : "Save Record"}
//             </button>

//             {message && (
//               <p
//                 className={`mt-4 text-sm font-medium ${
//                   message.startsWith("✅") ? "text-green-600" : "text-red-500"
//                 }`}
//               >
//                 {message}
//               </p>
//             )}
//           </form>

//           {/* --- Records Table --- */}
//           <section className="mt-10 bg-white shadow-md rounded-xl p-6 border border-gray-100">
//             <h2 className="text-xl font-semibold mb-4">📋 Existing Waste Records</h2>
//             {records.length === 0 ? (
//               <p className="text-gray-500">No records found.</p>
//             ) : (
//               <div className="overflow-x-auto">
//                 <table className="w-full text-left border border-gray-200">
//                   <thead className="bg-gray-100">
//                     <tr>
//                       <th className="p-2 border">Area</th>
//                       <th className="p-2 border">Type</th>
//                       <th className="p-2 border">Quantity (kg)</th>
//                       <th className="p-2 border">Date</th>
//                       <th className="p-2 border text-center">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {records.map((r) => (
//                       <tr key={r._id} className="border-t hover:bg-gray-50">
//                         <td className="p-2 border">{r.area}</td>
//                         <td className="p-2 border">{r.wasteType}</td>
//                         <td className="p-2 border">{r.quantity}</td>
//                         <td className="p-2 border">
//                           {new Date(r.collectionDate).toISOString().split("T")[0]}
//                         </td>
//                         <td className="p-2 border text-center space-x-2">
//                           <button
//                             onClick={() => handleEdit(r)}
//                             className="text-blue-600 hover:underline"
//                           >
//                             Edit
//                           </button>
//                           <button
//                             onClick={() => handleDelete(r._id)}
//                             className="text-red-600 hover:underline"
//                           >
//                             Delete
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </section>
//         </div>
//       </main>
//       <Fotter />
//     </div>
//   );
// }

// // ♻️ Reusable input field (SRP)
// function InputField({ label, name, type = "text", value, onChange }) {
//   return (
//     <div>
//       <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
//       <input
//         type={type}
//         name={name}
//         value={value}
//         onChange={onChange}
//         className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-green-500 focus:outline-none"
//       />
//     </div>
//   );
// }


// import React, { useState, useEffect } from "react";
// import Header from "../Header/header";
// import Fotter from "../Fotter/fotter";
// import Sidebar from "./adminSlidebar";
// import { fetchWasteRecords, saveWasteRecord, updateWasteRecord, deleteWasteRecord } from "../../services/wasteService";

// //  Constants
// const INITIAL_FORM = { area: "", wasteType: "", quantity: "", collectionDate: "" };

// export default function AdminAddRecord() {
//   const [collapsed, setCollapsed] = useState(false);
//   const [records, setRecords] = useState([]);
//   const [form, setForm] = useState(INITIAL_FORM);
//   const [loading, setLoading] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [message, setMessage] = useState("");

//   // 🔄 Load records on mount
//   useEffect(() => {
//     handleFetchRecords();
//   }, []);

//   // --- API HANDLERS (delegating service logic to wasteService.js) ---
//   const handleFetchRecords = async () => {
//     try {
//       const data = await fetchWasteRecords();
//       setRecords(data);
//     } catch (err) {
//       console.error(" Error loading records:", err);
//     }
//   };

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       if (editingId) {
//         await updateWasteRecord(editingId, form);
//         setMessage("✅ Record updated successfully");
//       } else {
//         await saveWasteRecord(form);
//         setMessage("✅ Record added successfully");
//       }

//       setForm(INITIAL_FORM);
//       setEditingId(null);
//       handleFetchRecords(); // refresh table
//     } catch (error) {
//       console.error(error);
//       setMessage("⚠️ Error saving record");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (record) => {
//     setForm({
//       area: record.area,
//       wasteType: record.wasteType,
//       quantity: record.quantity,
//       collectionDate: record.collectionDate.split("T")[0],
//     });
//     setEditingId(record._id);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this record?")) return;
//     try {
//       await deleteWasteRecord(id);
//       handleFetchRecords();
//       setMessage("🗑️ Record deleted");
//     } catch (error) {
//       console.error(error);
//       setMessage("⚠️ Failed to delete record");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col">
//       <Header />
//       <main className="flex flex-1">
//         <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

//         <div className="flex-1 p-8">
//           <h1 className="text-3xl font-bold text-gray-800 mb-6">
//             ♻ Waste Record Management
//           </h1>

//           {/* --- Add/Edit Form --- */}
//           <RecordForm
//             form={form}
//             editingId={editingId}
//             onSubmit={handleSubmit}
//             onChange={handleChange}
//             loading={loading}
//             message={message}
//           />

//           {/* --- Records Table --- */}
//           <RecordTable
//             records={records}
//             onEdit={handleEdit}
//             onDelete={handleDelete}
//           />
//         </div>
//       </main>
//       <Fotter />
//     </div>
//   );
// }

// // ♻️ --- FORM COMPONENT ---
// function RecordForm({ form, editingId, onSubmit, onChange, loading, message }) {
//   return (
//     <form
//       onSubmit={onSubmit}
//       className="bg-white shadow-md rounded-xl p-6 max-w-xl border border-gray-100"
//     >
//       <h2 className="text-xl font-semibold mb-4">
//         {editingId ? "✏️ Edit Record" : "➕ Add New Record"}
//       </h2>
//       <div className="grid gap-4">
//         <InputField label="Area" name="area" value={form.area} onChange={onChange} />
//         <InputField
//           label="Waste Type"
//           name="wasteType"
//           value={form.wasteType}
//           onChange={onChange}
//         />
//         <InputField
//           label="Quantity (kg)"
//           name="quantity"
//           type="number"
//           value={form.quantity}
//           onChange={onChange}
//         />
//         <InputField
//           label="Collection Date"
//           name="collectionDate"
//           type="date"
//           value={form.collectionDate}
//           onChange={onChange}
//         />
//       </div>

//       <button
//         type="submit"
//         disabled={loading}
//         className="mt-5 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
//       >
//         {loading ? "Saving..." : editingId ? "Update Record" : "Save Record"}
//       </button>

//       {message && (
//         <p
//           className={`mt-4 text-sm font-medium ${
//             message.startsWith("✅") ? "text-green-600" : "text-red-500"
//           }`}
//         >
//           {message}
//         </p>
//       )}
//     </form>
//   );
// }

// // 📋 --- TABLE COMPONENT ---
// function RecordTable({ records, onEdit, onDelete }) {
//   if (records.length === 0)
//     return (
//       <section className="mt-10 bg-white shadow-md rounded-xl p-6 border border-gray-100">
//         <h2 className="text-xl font-semibold mb-4">📋 Existing Waste Records</h2>
//         <p className="text-gray-500">No records found.</p>
//       </section>
//     );

//   return (
//     <section className="mt-10 bg-white shadow-md rounded-xl p-6 border border-gray-100">
//       <h2 className="text-xl font-semibold mb-4">📋 Existing Waste Records</h2>
//       <div className="overflow-x-auto">
//         <table className="w-full text-left border border-gray-200">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-2 border">Area</th>
//               <th className="p-2 border">Type</th>
//               <th className="p-2 border">Quantity (kg)</th>
//               <th className="p-2 border">Date</th>
//               <th className="p-2 border text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {records.map((r) => (
//               <tr key={r._id} className="border-t hover:bg-gray-50">
//                 <td className="p-2 border">{r.area}</td>
//                 <td className="p-2 border">{r.wasteType}</td>
//                 <td className="p-2 border">{r.quantity}</td>
//                 <td className="p-2 border">
//                   {new Date(r.collectionDate).toISOString().split("T")[0]}
//                 </td>
//                 <td className="p-2 border text-center space-x-2">
//                   <button
//                     onClick={() => onEdit(r)}
//                     className="text-blue-600 hover:underline"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => onDelete(r._id)}
//                     className="text-red-600 hover:underline"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </section>
//   );
// }

// // 🧱 --- INPUT FIELD COMPONENT ---
// function InputField({ label, name, type = "text", value, onChange }) {
//   return (
//     <div>
//       <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
//       <input
//         type={type}
//         name={name}
//         value={value}
//         onChange={onChange}
//         className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-green-500 focus:outline-none"
//       />
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import Header from "../Header/header";
import Fotter from "../Fotter/fotter";
import Sidebar from "./adminSlidebar";
import {
  fetchWasteRecords,
  saveWasteRecord,
  updateWasteRecord,
  deleteWasteRecord,
} from "../../services/wasteService";

//  Constants
const INITIAL_FORM = { area: "", wasteType: "", quantity: "", collectionDate: "" };

export default function AdminAddRecord() {
  const [collapsed, setCollapsed] = useState(false);
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  //  Load records on mount
  useEffect(() => {
    handleFetchRecords();
  }, []);

  const handleFetchRecords = async () => {
    try {
      const data = await fetchWasteRecords();
      setRecords(data);
    } catch (err) {
      console.error("Error loading records:", err);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (editingId) {
        await updateWasteRecord(editingId, form);
        setMessage("✅ Record updated successfully");
      } else {
        await saveWasteRecord(form);
        setMessage("✅ Record added successfully");
      }

      setForm(INITIAL_FORM);
      setEditingId(null);
      handleFetchRecords();
    } catch (error) {
      console.error(error);
      setMessage("⚠️ Error saving record");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (record) => {
    setForm({
      area: record.area,
      wasteType: record.wasteType,
      quantity: record.quantity,
      collectionDate: record.collectionDate.split("T")[0],
    });
    setEditingId(record._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      await deleteWasteRecord(id);
      handleFetchRecords();
      setMessage("🗑️ Record deleted");
    } catch (error) {
      console.error(error);
      setMessage("⚠️ Failed to delete record");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex flex-1">
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

        <div className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            ♻ Waste Record Management
          </h1>

          {/* --- Add/Edit Form --- */}
          <RecordForm
            form={form}
            editingId={editingId}
            onSubmit={handleSubmit}
            onChange={handleChange}
            loading={loading}
            message={message}
          />

          {/* --- Records Table --- */}
          <RecordTable
            records={records}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </main>
      <Fotter />
    </div>
  );
}

//  --- FORM COMPONENT ---
function RecordForm({ form, editingId, onSubmit, onChange, loading, message }) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-gray-50 shadow-md rounded-xl p-6 max-w-xxl border border-gray-100"
    >
      <h2 className="text-xl font-semibold mb-4">
        {editingId ? "✏️ Edit Record" : "➕ Add New Record"}
      </h2>
      <div className="grid gap-4">
        <InputField label="Area" name="area" value={form.area} onChange={onChange} />

        {/*  Waste Type Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Waste Type
          </label>
          <select
            name="wasteType"
            value={form.wasteType}
            onChange={onChange}
            className="border border-gray-300 rounded-lg p-2 w-full bg-white focus:ring-2 focus:ring-green-500 focus:outline-none"
          >
            <option value="">Select Type</option>
            <option value="E-Waste">E-Waste</option>
            <option value="Plastic">Plastic</option>
            <option value="Organic">Organic</option>
            <option value="Hazardous">Hazardous</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <InputField
          label="Quantity (kg)"
          name="quantity"
          type="number"
          value={form.quantity}
          onChange={onChange}
        />
        <InputField
          label="Collection Date"
          name="collectionDate"
          type="date"
          value={form.collectionDate}
          onChange={onChange}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-5 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
      >
        {loading ? "Saving..." : editingId ? "Update Record" : "Save Record"}
      </button>

      {message && (
        <p
          className={`mt-4 text-sm font-medium ${
            message.startsWith("✅") ? "text-green-600" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}

// --- TABLE COMPONENT ---
function RecordTable({ records, onEdit, onDelete }) {
  if (records.length === 0)
    return (
      <section className="mt-10 bg-white shadow-md rounded-xl p-6 border border-gray-100">
        <h2 className="text-xl font-semibold mb-4">📋 Existing Waste Records</h2>
        <p className="text-gray-500">No records found.</p>
      </section>
    );

  return (
    <section className="mt-10 bg-white shadow-md rounded-xl p-6 border border-gray-100">
      <h2 className="text-xl font-semibold mb-4">📋 Existing Waste Records</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Area</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Quantity (kg)</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r._id} className="border-t hover:bg-gray-50">
                <td className="p-2 border">{r.area}</td>
                <td className="p-2 border">{r.wasteType}</td>
                <td className="p-2 border">{r.quantity}</td>
                <td className="p-2 border">
                  {new Date(r.collectionDate).toISOString().split("T")[0]}
                </td>
                <td className="p-2 border text-center space-x-2">
                  <button
                    onClick={() => onEdit(r)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(r._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// --- INPUT FIELD COMPONENT ---
function InputField({ label, name, type = "text", value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-green-500 focus:outline-none"
      />
    </div>
  );
}
