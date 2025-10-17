// import React, { useState } from "react";
// import Header from "../Header/header";
// import Fotter from "../Fotter/fotter";
// import Sidebar from "./adminSlidebar";
// import axios from "axios";
// import {
//   LineChart,
//   Line,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";
// import { exportToPDF, exportToExcel } from "../../utils/exportUtils"; // 👈 Import here

// export default function AdminAnalytics() {
//   const [params, setParams] = useState({
//     startDate: "",
//     endDate: "",
//     area: "",
//     wasteType: "",
//   });
//   const [chartData, setChartData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [collapsed, setCollapsed] = useState(false);

//   const handleChange = (e) =>
//     setParams({ ...params, [e.target.name]: e.target.value });

//   const generateReport = async () => {
//     setLoading(true);
//     try {
//       const url = `http://localhost:5002/api/reports/generate?startDate=${params.startDate}&endDate=${params.endDate}&area=${params.area}&wasteType=${params.wasteType}`;
//       const res = await axios.get(url);
//       const formatted = Object.entries(res.data.statsByDay).map(
//         ([date, qty]) => ({ date, qty })
//       );
//       setChartData(formatted);
//     } catch (err) {
//       alert("⚠️ Error generating report. Check backend connection.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const exportCSV = async () => {
//     try {
//       const url = `http://localhost:5002/api/reports/export/csv?startDate=${params.startDate}&endDate=${params.endDate}&area=${params.area}&wasteType=${params.wasteType}`;
//       const res = await axios.get(url);
//       window.open("http://localhost:5002" + res.data.downloadLink, "_blank");
//     } catch {
//       alert("⚠️ Export failed. Try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col">
//       <Header />
//       <main className="flex flex-1">
//         <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

//         <div className="flex-1 p-8">
//           <h1 className="text-3xl font-bold text-gray-800 mb-4">
//             ♻ Waste Analytics & Reports
//           </h1>

//           {/* --- Filter Section --- */}
//           <div className="bg-white shadow rounded-xl p-6 mb-8 border border-gray-100">
//             <h2 className="text-xl font-semibold mb-4 text-gray-700">+ New Report</h2>
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//               {["startDate", "endDate", "area", "wasteType"].map((key) => (
//                 <div key={key}>
//                   <label className="block text-sm font-medium text-gray-700 capitalize">
//                     {key === "startDate"
//                       ? "From"
//                       : key === "endDate"
//                       ? "To"
//                       : key === "area"
//                       ? "Area"
//                       : "Waste Type"}
//                   </label>
//                   <input
//                     type={
//                       key === "startDate" || key === "endDate" ? "date" : "text"
//                     }
//                     name={key}
//                     value={params[key]}
//                     onChange={handleChange}
//                     placeholder={
//                       key === "area" ? "District, Town" : key === "wasteType" ? "Plastic..." : ""
//                     }
//                     className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-green-500 focus:outline-none"
//                   />
//                 </div>
//               ))}
//             </div>

//             <button
//               onClick={generateReport}
//               disabled={loading}
//               className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
//             >
//               {loading ? "Generating..." : "Generate Report"}
//             </button>
//           </div>

//           {/* --- Charts & Table --- */}
//           <div className="grid md:grid-cols-3 gap-6">
//             {[
//               { title: "📉 Line Chart", type: "line" },
//               { title: "📊 Bar Chart", type: "bar" },
//               { title: "📋 Data Table", type: "table" },
//             ].map((chart) => (
//               <div key={chart.type} className="bg-white shadow rounded-xl p-6 text-center">
//                 <h3 className="font-semibold mb-4">{chart.title}</h3>
//                 {chart.type === "line" && chartData.length > 0 && (
//                   <ResponsiveContainer width="100%" height={250}>
//                     <LineChart data={chartData}>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="date" />
//                       <YAxis />
//                       <Tooltip />
//                       <Line type="monotone" dataKey="qty" stroke="#16a34a" strokeWidth={2} />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 )}
//                 {chart.type === "bar" && chartData.length > 0 && (
//                   <ResponsiveContainer width="100%" height={250}>
//                     <BarChart data={chartData}>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="date" />
//                       <YAxis />
//                       <Tooltip />
//                       <Bar dataKey="qty" fill="#3b82f6" />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 )}
//                 {chart.type === "table" && (
//                   <table className="w-full text-left border">
//                     <thead className="bg-gray-100">
//                       <tr>
//                         <th className="p-2">Date</th>
//                         <th className="p-2">Quantity (kg)</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {chartData.map((r) => (
//                         <tr key={r.date} className="border-t">
//                           <td className="p-2">{r.date}</td>
//                           <td className="p-2">{r.qty}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 )}
//                 {!chartData.length && <p className="text-gray-400">No data yet</p>}
//               </div>
//             ))}
//           </div>

//           {/* --- Export Buttons --- */}
//           <div className="flex gap-4 mt-8 justify-center">
//             <button
//               onClick={() => exportToPDF(chartData)}
//               className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700"
//             >
//               Export as PDF
//             </button>
//             <button
//               onClick={() => exportToExcel(chartData)}
//               className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
//             >
//               Export as Excel
//             </button>
//             <button
//               onClick={exportCSV}
//               className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
//             >
//               Export as CSV
//             </button>
//           </div>
//         </div>
//       </main>
//       <Fotter />
//     </div>
//   );
// }

// import React, { useState } from "react";
// import Header from "../Header/header";
// import Fotter from "../Fotter/fotter";
// import Sidebar from "./adminSlidebar";
// import axios from "axios";
// import {
//   LineChart,
//   Line,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";
// import { exportToPDF, exportToExcel } from "../../utils/exportUtils";

// export default function AdminAnalytics() {
//   const [params, setParams] = useState({
//     startDate: "",
//     endDate: "",
//     area: "",
//     wasteType: "",
//   });
//   const [chartData, setChartData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [collapsed, setCollapsed] = useState(false);

//   const handleChange = (e) =>
//     setParams({ ...params, [e.target.name]: e.target.value });

//   const generateReport = async () => {
//     setLoading(true);
//     try {
//       const url = `http://localhost:5002/api/reports/generate?startDate=${params.startDate}&endDate=${params.endDate}&area=${params.area}&wasteType=${params.wasteType}`;
//       const res = await axios.get(url);
//       const formatted = Object.entries(res.data.statsByDay).map(
//         ([date, qty]) => ({ date, qty })
//       );
//       setChartData(formatted);
//     } catch (err) {
//       alert("⚠️ Error generating report. Check backend connection.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const exportCSV = async () => {
//     try {
//       const url = `http://localhost:5002/api/reports/export/csv?startDate=${params.startDate}&endDate=${params.endDate}&area=${params.area}&wasteType=${params.wasteType}`;
//       const res = await axios.get(url);
//       window.open("http://localhost:5002" + res.data.downloadLink, "_blank");
//     } catch {
//       alert("⚠️ Export failed. Try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col">
//       <Header />
//       <main className="flex flex-1">
//         <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

//         <div className="flex-1 p-8">
//           <h1 className="text-3xl font-bold text-gray-800 mb-4">
//             ♻ Waste Analytics & Reports
//           </h1>

//           {/* --- Filter Section --- */}
//           <div className="bg-white shadow rounded-xl p-6 mb-8 border border-gray-100">
//             <h2 className="text-xl font-semibold mb-4 text-gray-700">+ New Report</h2>
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//               {/* Start Date */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">From</label>
//                 <input
//                   type="date"
//                   name="startDate"
//                   value={params.startDate}
//                   onChange={handleChange}
//                   className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-green-500 focus:outline-none"
//                 />
//               </div>

//               {/* End Date */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">To</label>
//                 <input
//                   type="date"
//                   name="endDate"
//                   value={params.endDate}
//                   onChange={handleChange}
//                   className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-green-500 focus:outline-none"
//                 />
//               </div>

//               {/* Area */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Area</label>
//                 <input
//                   type="text"
//                   name="area"
//                   value={params.area}
//                   onChange={handleChange}
//                   placeholder="District, Town"
//                   className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-green-500 focus:outline-none"
//                 />
//               </div>

//               {/* Waste Type (Dropdown) */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Waste Type</label>
//                 <select
//                   name="wasteType"
//                   value={params.wasteType}
//                   onChange={handleChange}
//                   className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-green-500 focus:outline-none bg-white"
//                 >
//                   <option value="">Select Type</option>
//                   <option value="E-Waste">E-Waste</option>
//                   <option value="Plastic">Plastic</option>
//                   <option value="Organic">Organic</option>
//                   <option value="Hazardous">Hazardous</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>
//             </div>

//             <button
//               onClick={generateReport}
//               disabled={loading}
//               className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
//             >
//               {loading ? "Generating..." : "Generate Report"}
//             </button>
//           </div>

//           {/* --- Charts & Table --- */}
//           <div className="grid md:grid-cols-3 gap-6">
//             {[
//               { title: "📉 Line Chart", type: "line" },
//               { title: "📊 Bar Chart", type: "bar" },
//               { title: "📋 Data Table", type: "table" },
//             ].map((chart) => (
//               <div key={chart.type} className="bg-white shadow rounded-xl p-6 text-center">
//                 <h3 className="font-semibold mb-4">{chart.title}</h3>
//                 {chart.type === "line" && chartData.length > 0 && (
//                   <ResponsiveContainer width="100%" height={250}>
//                     <LineChart data={chartData}>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="date" />
//                       <YAxis />
//                       <Tooltip />
//                       <Line type="monotone" dataKey="qty" stroke="#16a34a" strokeWidth={2} />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 )}
//                 {chart.type === "bar" && chartData.length > 0 && (
//                   <ResponsiveContainer width="100%" height={250}>
//                     <BarChart data={chartData}>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="date" />
//                       <YAxis />
//                       <Tooltip />
//                       <Bar dataKey="qty" fill="#3b82f6" />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 )}
//                 {chart.type === "table" && (
//                   <table className="w-full text-left border">
//                     <thead className="bg-gray-100">
//                       <tr>
//                         <th className="p-2">Date</th>
//                         <th className="p-2">Quantity (kg)</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {chartData.map((r) => (
//                         <tr key={r.date} className="border-t">
//                           <td className="p-2">{r.date}</td>
//                           <td className="p-2">{r.qty}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 )}
//                 {!chartData.length && <p className="text-gray-400">No data yet</p>}
//               </div>
//             ))}
//           </div>

//           {/* --- Export Buttons --- */}
//           <div className="flex gap-4 mt-8 justify-center">
//             <button
//               onClick={() => exportToPDF(chartData)}
//               className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700"
//             >
//               Export as PDF
//             </button>
//             <button
//               onClick={() => exportToExcel(chartData)}
//               className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
//             >
//               Export as Excel
//             </button>
//             <button
//               onClick={exportCSV}
//               className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
//             >
//               Export as CSV
//             </button>
//           </div>
//         </div>
//       </main>
//       <Fotter />
//     </div>
//   );
// }

import React, { useState } from "react";
import Header from "../Header/header";
import Fotter from "../Fotter/fotter";
import Sidebar from "./adminSlidebar";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { exportToPDF, exportToExcel } from "../../utils/exportUtils";
import { fetchReportData, fetchCSVExport } from "../../services/analyticsService";

// --- FilterForm Component ---
const FilterForm = ({ params, onChange, onGenerate, loading }) => (
  <div className="bg-white shadow rounded-xl p-6 mb-8 border border-gray-100">
    <h2 className="text-xl font-semibold mb-4 text-gray-700">+ New Report</h2>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {[
        { name: "startDate", label: "From", type: "date" },
        { name: "endDate", label: "To", type: "date" },
        { name: "area", label: "Area", type: "text", placeholder: "District, Town" },
      ].map((input) => (
        <div key={input.name}>
          <label className="block text-sm font-medium text-gray-700">{input.label}</label>
          <input
            type={input.type}
            name={input.name}
            value={params[input.name]}
            placeholder={input.placeholder}
            onChange={onChange}
            className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>
      ))}

      <div>
        <label className="block text-sm font-medium text-gray-700">Waste Type</label>
        <select
          name="wasteType"
          value={params.wasteType}
          onChange={onChange}
          className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-green-500 focus:outline-none bg-white"
        >
          <option value="">Select Type</option>
          <option value="E-Waste">E-Waste</option>
          <option value="Plastic">Plastic</option>
          <option value="Organic">Organic</option>
          <option value="Hazardous">Hazardous</option>
          <option value="Other">Other</option>
        </select>
      </div>
    </div>

    <button
      onClick={onGenerate}
      disabled={loading}
      className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
    >
      {loading ? "Generating..." : "Generate Report"}
    </button>
  </div>
);

// --- ChartCard Component ---
const ChartCard = ({ title, type, chartData }) => (
  <div className="bg-white shadow rounded-xl p-6 text-center">
    <h3 className="font-semibold mb-4">{title}</h3>

    {chartData.length > 0 ? (
      <>
        {type === "line" && (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="qty" stroke="#a39716ff" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        )}

        {type === "bar" && (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="qty" fill="#9c65f4ff" />
            </BarChart>
          </ResponsiveContainer>
        )}

        {type === "table" && (
          <table className="w-full text-left border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Date</th>
                <th className="p-2">Quantity (kg)</th>
              </tr>
            </thead>
            <tbody>
              {chartData.map((r) => (
                <tr key={r.date} className="border-t">
                  <td className="p-2">{r.date}</td>
                  <td className="p-2">{r.qty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </>
    ) : (
      <p className="text-gray-400">No data yet</p>
    )}
  </div>
);

export default function AdminAnalytics() {
  const [params, setParams] = useState({ startDate: "", endDate: "", area: "", wasteType: "" });
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const handleChange = (e) => setParams({ ...params, [e.target.name]: e.target.value });

  const handleGenerateReport = async () => {
    setLoading(true);
    try {
      const formatted = await fetchReportData(params);
      setChartData(formatted);
    } catch {
      alert("⚠️ Error generating report. Check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = async () => {
    try {
      await fetchCSVExport(params);
    } catch {
      alert("⚠️ Export failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex flex-1">
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
        <div className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">♻ Waste Analytics & Reports</h1>

          <FilterForm
            params={params}
            onChange={handleChange}
            onGenerate={handleGenerateReport}
            loading={loading}
          />

          <div className="grid md:grid-cols-3 gap-6">
            <ChartCard title="📉 Line Chart" type="line" chartData={chartData} />
            <ChartCard title="📊 Bar Chart" type="bar" chartData={chartData} />
            <ChartCard title="📋 Data Table" type="table" chartData={chartData} />
          </div>

          <div className="flex gap-4 mt-8 justify-center">
            <button
              onClick={() => exportToPDF(chartData)}
              className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700"
            >
              Export as PDF
            </button>
            <button
              onClick={() => exportToExcel(chartData)}
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
            >
              Export as Excel
            </button>
            <button
              onClick={handleExportCSV}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Export as CSV
            </button>
          </div>
        </div>
      </main>
      <Fotter />
    </div>
  );
}
