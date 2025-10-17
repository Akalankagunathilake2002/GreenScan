// frontend/src/pages/PaybackList.jsx
import { useEffect, useMemo, useState } from "react";
import Sidebar from "../Dashboards/adminSlidebar";
import Header from "../Header/header";
import Fotter from "../Fotter/fotter";

/** ===== Config ===== */
const BASE_URL = "http://localhost:5002";
const LIST_URL = `${BASE_URL}/paybacks`;

/** ===== Small UI atoms (same vibe as dashboard) ===== */
function LoadingSpinner({ label = "Loading…" }) {
  return (
    <div className="flex items-center gap-3 text-gray-600">
      <span
        className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent"
        aria-hidden="true"
      />
      <span className="text-sm md:text-base">{label}</span>
    </div>
  );
}

function ErrorMessage({ message }) {
  if (!message) return null;
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700 shadow-sm">
      {message}
    </div>
  );
}

function EmptyState({ title = "No payback requests found.", hint }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-md">
      <div className="mb-2 text-lg font-semibold text-gray-800">{title}</div>
      {hint ? <p className="text-gray-500">{hint}</p> : null}
    </div>
  );
}

/** ===== Table (open/closed via columns) ===== */
const columns = Object.freeze([
  { key: "_idx", label: "#" },
  { key: "quantity", label: "Quantity (kg)" },
  { key: "wasteType", label: "Waste Type" },
  { key: "bankname", label: "Bank" },
  { key: "branch", label: "Branch" },
  { key: "branchCode", label: "Branch Code" },
  { key: "accountNumber", label: "Account Number" },
  { key: "_id", label: "_id" },
  { key: "__status", label: "Status" }, 
]);

function PaidBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 text-xs font-semibold">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
      Paid
    </span>
  );
}

function DataTable({ rows }) {
  const prepared = useMemo(
    () => rows.map((r, i) => ({ _idx: i + 1, ...r })),
    [rows]
  );

  return (
    <section className="rounded-2xl border border-gray-100 bg-white shadow-md">
      <div className="overflow-x-auto rounded-2xl">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((c) => (
                <th
                  key={c.key}
                  className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b border-gray-200"
                >
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {prepared.map((row) => (
              <tr
                key={row._id ?? row._idx}
                className="odd:bg-white even:bg-gray-50 hover:bg-emerald-50/60 transition-colors"
              >
                {columns.map((c) => (
                  <td
                    key={c.key}
                    className="whitespace-nowrap px-4 py-3 text-sm text-gray-800 border-b border-gray-100"
                  >
                    {c.key === "__status" ? <PaidBadge /> : row[c.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}


export default function PaybackList() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [collapsed, setCollapsed] = useState(false); 

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(LIST_URL);
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.message || `Request failed (${res.status})`);
        }
        const data = await res.json();
        if (mounted) setRows(Array.isArray(data.paybacks) ? data.paybacks : []);
      } catch (e) {
        if (mounted) setErr(e.message);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-sky-50 flex flex-col">
      {/* Top header (same as dashboard) */}
      <Header />

      <main className="flex-1 w-full">
        <div className="flex h-full">
          {/* Sidebar (same component & prop shape as AdminDashboard) */}
          <Sidebar
            collapsed={collapsed}
            onToggle={() => setCollapsed((v) => !v)}
          />

          {/* Content */}
          <div className="flex-1 px-6 py-8">
            {/* Title block with same typography/spacing */}
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              ♻️ View Recycle Payback Requests
            </h1>
            <p className="text-gray-600 mb-6">
              Monitor and review all user payback submissions in one place.
            </p>

            {/* Alerts */}
            {err && (
              <div className="mb-4">
                <ErrorMessage message={err} />
              </div>
            )}

            {/* Data */}
            {loading ? (
              <LoadingSpinner />
            ) : rows.length === 0 ? (
              <EmptyState hint="Once users submit payback forms, they’ll appear here." />
            ) : (
              <DataTable rows={rows} />
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Fotter />
    </div>
  );
}
