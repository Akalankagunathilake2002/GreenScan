// src/pages/PaybackForm.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import Header from "../../components/Header/header";
import Fotter from "../../components/Fotter/fotter";
import UserSidebar from "../Dashboards/UserSideBar";

/** ================= CONFIG / RULES (OCP: open for extension via constants) ================= */
const BASE_URL = "http://localhost:5002";                       // change if needed
const CREATE_URL = `${BASE_URL}/paybacks`;
const KG_PER_COUNT = 2;                                         // 2 kg → 1 recycle count
const RATE_RUPEES = 1000;                                       // LKR per recycle count
const CALC_DELAY_MS = 2000;                                     // 2s "calculating" delay
const POST_SUCCESS_DELAY_MS = 2000;                             // 2s after submit before success screen
const LIMITS = Object.freeze({                                  // OCP: tweak rules in one place
  quantityMin: 0.01,
  quantityMax: 100,
  branchCodeMaxLen: 6,
  accountNumberMinLen: 8,
  accountNumberMaxLen: 8,
});

const initial = {
  quantity: "",
  wasteType: "",
  bankname: "",
  branch: "",
  branchCode: "",
  accountNumber: "",
};

/** ================= UTILITIES (SRP: each function has one reason to change) ================= */

// DIP: depend on abstraction (localStorage contract), not a specific auth impl
function resolveUserId() {
  try {
    const fromAuthObj = JSON.parse(localStorage.getItem("authUser") || "null");
    if (fromAuthObj?.id) return String(fromAuthObj.id);
    if (fromAuthObj?._id) return String(fromAuthObj._id);
  } catch {}
  const direct = localStorage.getItem("userId");
  if (direct) return String(direct);
  return "guest";
}

// SRP: pure function that computes rewards from quantity + rules
function computeRewards(quantity) {
  const q = Number(quantity);
  if (!Number.isFinite(q) || q < 0) return { count: 0, amount: 0 };
  const count = q / KG_PER_COUNT;
  return {
    count,
    amount: count * RATE_RUPEES,
  };
}

// SRP: validate the form; returns array of messages
function validateForm(values) {
  const errors = [];

  // quantity
  const q = Number(values.quantity);
  if (!values.quantity && values.quantity !== 0) {
    errors.push("Quantity is required.");
  } else if (!Number.isFinite(q)) {
    errors.push("Quantity must be a valid number.");
  } else if (q < LIMITS.quantityMin) {
    errors.push(`Quantity must be at least ${LIMITS.quantityMin}.`);
  } else if (q > LIMITS.quantityMax) {
    errors.push(`Quantity cannot exceed ${LIMITS.quantityMax}.`);
  }

  // waste type
  if (!values.wasteType) errors.push("Waste type is required.");

  // bank name (basic non-empty)
  if (!values.bankname.trim()) errors.push("Bank name is required.");

  // branch (basic non-empty)
  if (!values.branch.trim()) errors.push("Branch is required.");

  // branch code (alphanumeric, reasonable length)
  if (!values.branchCode.trim()) {
    errors.push("Branch code is required.");
  } else if (!/^[a-zA-Z0-9-]+$/.test(values.branchCode)) {
    errors.push("Branch code can only contain letters, numbers, and hyphens.");
  } else if (values.branchCode.length > LIMITS.branchCodeMaxLen) {
    errors.push(`Branch code cannot exceed ${LIMITS.branchCodeMaxLen} characters.`);
  }

  // account number (digits, typical length constraints)
  if (!values.accountNumber.trim()) {
    errors.push("Account number is required.");
  } else if (!/^\d+$/.test(values.accountNumber)) {
    errors.push("Account number must contain digits only.");
  } else if (
    values.accountNumber.length < LIMITS.accountNumberMinLen ||
    values.accountNumber.length > LIMITS.accountNumberMaxLen
  ) {
    errors.push(
      `Account number length must be between ${LIMITS.accountNumberMinLen} and ${LIMITS.accountNumberMaxLen} digits.`
    );
  }

  return errors;
}

/** ================= COMPONENT ================= */

export default function PaybackForm() {
  // State
  const [form, setForm] = useState(initial);
  const [submitting, setSubmitting] = useState(false);          // network submitting
  const [msg, setMsg] = useState(null);                         // inline form banner

  // Quantity → delayed calculation states
  const [isCalculating, setIsCalculating] = useState(false);    // shows “Wait… calculating”
  const [calcDone, setCalcDone] = useState(false);              // unlocks other fields
  const [recycleCount, setRecycleCount] = useState(0);
  const [estimatedAmount, setEstimatedAmount] = useState(0);
  const calcTimerRef = useRef(null);

  // Post-success UX states
  const [postProcessing, setPostProcessing] = useState(false);  // full screen loader after POST
  const [showSuccess, setShowSuccess] = useState(false);        // success screen after loader

  const userId = useMemo(resolveUserId, []);

  const currency = useMemo(
    () =>
      new Intl.NumberFormat("en-LK", {
        style: "currency",
        currency: "LKR",
        maximumFractionDigits: 2,
      }),
    []
  );

  // Strict numeric-only input handler for quantity (prevents non-numeric typing)
  function onQuantityInput(e) {
    let v = e.target.value;
    // allow digits and a single dot; strip others
    v = v.replace(/[^\d.]/g, "");
    // prevent multiple dots
    const parts = v.split(".");
    if (parts.length > 2) v = parts[0] + "." + parts.slice(1).join("");
    // cap to max if numeric
    if (v && Number(v) > LIMITS.quantityMax) v = String(LIMITS.quantityMax);
    update("quantity", v);
  }

  // SRP: single updater; triggers pricing re-calc only for quantity
  const update = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));

    if (k === "quantity") {
      setCalcDone(false);
      setIsCalculating(!!v);

      if (calcTimerRef.current) clearTimeout(calcTimerRef.current);

      if (v) {
        calcTimerRef.current = setTimeout(() => {
          const { count, amount } = computeRewards(v);
          setRecycleCount(count);
          setEstimatedAmount(amount);
          setIsCalculating(false);
          setCalcDone(true);
        }, CALC_DELAY_MS);
      } else {
        setRecycleCount(0);
        setEstimatedAmount(0);
        setIsCalculating(false);
      }
    }
  };

  // Cleanup timer
  useEffect(() => {
    return () => {
      if (calcTimerRef.current) clearTimeout(calcTimerRef.current);
    };
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    setMsg(null);

    // Validate (SRP: validateForm)
    const errors = validateForm(form);
    if (errors.length) {
      setMsg({ type: "error", text: errors[0] }); // show first error
      return;
    }
    if (!calcDone) {
      setMsg({ type: "error", text: "Please wait until calculation completes." });
      return;
    }

    try {
      setSubmitting(true);

      // Payload (DIP: component doesn't care how server stores user, we send userId we know)
      const payload = {
        ...form,
        quantity: Number(form.quantity),
        userId, // harmless if backend ignores; useful once backend ties to user
        recycleCount,
        amount: Math.round(estimatedAmount * 100) / 100,
      };

      const res = await fetch(CREATE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || `Request failed (${res.status})`);
      }

      // Show a full-screen loader for 2 seconds, then success screen
      setPostProcessing(true);
      setTimeout(() => {
        setPostProcessing(false);
        setShowSuccess(true);
      }, POST_SUCCESS_DELAY_MS);

      // Reset form state after successful POST
      setForm(initial);
      setCalcDone(false);
      setRecycleCount(0);
      setEstimatedAmount(0);
      setMsg(null);
    } catch (err) {
      setMsg({ type: "error", text: err.message });
    } finally {
      setSubmitting(false);
    }
  }

  // Lock non-quantity fields until calculation completed
  const lockOthers = isCalculating || !calcDone;

  /** ================= RENDER ================= */
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-sky-50 flex flex-col">
      <Header />

      <main className="flex-1 w-full">
        <div className="flex h-full">
          {/* Fixed Sidebar */}
          <div className="hidden lg:block">
            <UserSidebar active="recycle-payback" />
          </div>

          {/* Main Content */}
          <div className="flex-1 px-6 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">♻️ Recycle Payback Request</h1>
            <p className="text-gray-600 mb-6">
              Submit your waste details and bank information to request a payback.
            </p>

            {/* Form Card */}
            {!showSuccess && (
              <section
                className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-8"
                style={{ boxShadow: "0 6px 18px rgba(2,6,23,.06)" }}
              >
                <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Quantity */}
                  <div className="md:col-span-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Quantity (kg) <span className="text-gray-500">(max {LIMITS.quantityMax})</span>
                    </label>
                    <input
                      type="text" // enforce numeric manually to avoid browser quirks
                      inputMode="decimal"
                      value={form.quantity}
                      onChange={onQuantityInput}
                      placeholder="e.g., 12.5"
                      required
                      className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 outline-none transition"
                    />

                    {/* Calculation status / results */}
                    <div className="mt-2 text-sm text-gray-700 min-h-[48px]">
                      {isCalculating ? (
                        <div className="flex items-center gap-2 text-amber-600">
                          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
                          <span>Wait… your recycle count is calculating</span>
                        </div>
                      ) : calcDone ? (
                        <div className="space-y-1">
                          <div>
                            <span className="font-semibold">Recycle Count:</span>{" "}
                            {recycleCount.toFixed(2)}
                          </div>
                          <div>
                            <span className="font-semibold">Estimated Amount:</span>{" "}
                            {currency.format(estimatedAmount)}
                          </div>
                          <div className="text-gray-500 text-xs">
                            Rule: {KG_PER_COUNT} kg = 1 recycle count · {currency.format(RATE_RUPEES)} per count
                          </div>
                        </div>
                      ) : (
                        <div className="text-gray-500">Enter quantity to calculate rewards.</div>
                      )}
                    </div>
                  </div>

                  {/* Waste Type */}
                  <div className="md:col-span-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Waste Type
                    </label>
                    <select
                      value={form.wasteType}
                      onChange={(e) => update("wasteType", e.target.value)}
                      required
                      disabled={lockOthers}
                      className={`w-full border border-gray-300 rounded-lg py-2 px-3 bg-white focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 outline-none transition ${
                        lockOthers ? "opacity-60 cursor-not-allowed" : ""
                      }`}
                    >
                      <option value="">Select waste type</option>
                      <option value="Plastic">Plastic</option>
                      <option value="Paper">Paper</option>
                      <option value="Glass">Glass</option>
                      <option value="Metal">Metal</option>
                      <option value="Organic">Organic</option>
                      <option value="E-waste">E-waste</option>
                    </select>
                  </div>

                  {/* Bank Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Bank Name</label>
                    <input
                      type="text"
                      value={form.bankname}
                      onChange={(e) => update("bankname", e.target.value)}
                      placeholder="e.g., Bank of Ceylon"
                      required
                      disabled={lockOthers}
                      className={`w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 outline-none transition ${
                        lockOthers ? "opacity-60 cursor-not-allowed" : ""
                      }`}
                    />
                  </div>

                  {/* Branch */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Branch</label>
                    <input
                      type="text"
                      value={form.branch}
                      onChange={(e) => update("branch", e.target.value)}
                      placeholder="e.g., Colombo Fort"
                      required
                      disabled={lockOthers}
                      className={`w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 outline-none transition ${
                        lockOthers ? "opacity-60 cursor-not-allowed" : ""
                      }`}
                    />
                  </div>

                  {/* Branch Code */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Branch Code</label>
                    <input
                      type="text"
                      value={form.branchCode}
                      onChange={(e) => update("branchCode", e.target.value)}
                      placeholder="e.g., 123-AB"
                      required
                      disabled={lockOthers}
                      className={`w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 outline-none transition ${
                        lockOthers ? "opacity-60 cursor-not-allowed" : ""
                      }`}
                    />
                  </div>

                  {/* Account Number */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Account Number</label>
                    <input
                      type="text"
                      value={form.accountNumber}
                      onChange={(e) => update("accountNumber", e.target.value.replace(/\D/g, ""))} // digits only
                      placeholder="e.g., 0012345678"
                      required
                      disabled={lockOthers}
                      maxLength={LIMITS.accountNumberMaxLen}
                      className={`w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 outline-none transition ${
                        lockOthers ? "opacity-60 cursor-not-allowed" : ""
                      }`}
                    />
                  </div>

                  {/* Alert banner */}
                  {msg && (
                    <div className="md:col-span-2">
                      <div
                        className={`rounded-lg px-4 py-3 text-sm shadow-sm border ${
                          msg.type === "error"
                            ? "bg-red-50 border-red-200 text-red-700"
                            : "bg-emerald-50 border-emerald-200 text-emerald-700"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  )}

                  {/* Submit */}
                  <div className="md:col-span-2 flex items-center justify-end pt-2">
                    <button
                      type="submit"
                      disabled={submitting || lockOthers}
                      className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 font-semibold text-white hover:bg-emerald-700 transition disabled:opacity-60"
                    >
                      {submitting ? "Submitting…" : "Submit Request"}
                    </button>
                  </div>
                </form>
              </section>
            )}

            {/* Success Screen */}
            {showSuccess && (
              <section className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 text-center">
                <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                  <span className="text-2xl">✅</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Transaction Successful</h2>
                <p className="text-gray-600 mt-2">
                  Your recycle payback request was submitted successfully.
                </p>
                <div className="mt-6 text-gray-700">
                  <div>
                    <span className="font-semibold">Estimated Amount:&nbsp;</span>
                    {currency.format(estimatedAmount)}
                  </div>
                </div>
                <button
                  className="mt-6 inline-flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 font-semibold text-white hover:bg-emerald-700 transition"
                  onClick={() => {
                    // let user submit a new one
                    setShowSuccess(false);
                  }}
                >
                  Submit Another Request
                </button>
              </section>
            )}
          </div>
        </div>
      </main>

      <Fotter />

      {/* Full-screen overlay loader shown after successful submit for 2 seconds */}
      {postProcessing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          style={{ backdropFilter: "blur(2px)" }}
        >
          <div className="rounded-2xl bg-white px-6 py-5 shadow-xl text-center">
            <div className="mb-3 inline-block h-6 w-6 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent" />
            <div className="text-gray-800 font-semibold">Processing your transaction…</div>
            <div className="text-gray-500 text-sm mt-1">Please wait a moment</div>
          </div>
        </div>
      )}
    </div>
  );
}
