// src/components/About.jsx
import React from "react";
import Header from "../Header/header";
import Footer from "../Fotter/fotter";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-emerald-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow py-12 px-6 lg:px-16">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg border border-emerald-100 p-8">
          {/* Title */}
          <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-4">
            About <span className="text-emerald-600">SmartWaste</span>
          </h1>
          <p className="text-gray-600 text-center max-w-3xl mx-auto">
            SmartWaste helps cities reduce costs, cut emissions, and keep streets clean.
            We combine IoT sensors, data-driven routing, and citizen engagement to
            collect the right waste, at the right time, with the fewest resources.
          </p>

          {/* Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <div className="rounded-xl border border-emerald-100 p-6">
              <h3 className="text-lg font-bold text-gray-900">📡 Sensor Monitoring</h3>
              <p className="mt-2 text-gray-600">
                Real-time fill level, temperature, and tilt alerts to prevent overflow and fires.
              </p>
            </div>
            <div className="rounded-xl border border-emerald-100 p-6">
              <h3 className="text-lg font-bold text-gray-900">🗺️ Route Optimization</h3>
              <p className="mt-2 text-gray-600">
                Dynamic routes minimize distance, time, and CO₂ per pickup round.
              </p>
            </div>
            <div className="rounded-xl border border-emerald-100 p-6">
              <h3 className="text-lg font-bold text-gray-900">📱 Citizen App</h3>
              <p className="mt-2 text-gray-600">
                Pickup reminders, sorting tips, and reward programs to boost recycling.
              </p>
            </div>
          </div>

          {/* Mission / Vision */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-6">
              <h2 className="text-xl font-bold text-gray-900">Our Mission</h2>
              <p className="mt-2 text-gray-700">
                Build cleaner, safer, and more efficient cities through data-driven waste
                collection and responsible resource recovery.
              </p>
            </div>
            <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-6">
              <h2 className="text-xl font-bold text-gray-900">Our Vision</h2>
              <p className="mt-2 text-gray-700">
                Zero overflow, zero unnecessary trips, maximum material recovery—standard for every city.
              </p>
            </div>
          </section>

          {/* Impact Stats */}
          <section className="mt-10">
            <h2 className="text-xl font-bold text-gray-900">Impact at a Glance</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
              <Stat label="Collection Cost ↓" value="15–30%" />
              <Stat label="Overflow Incidents ↓" value="50%+" />
              <Stat label="Recycling Rate ↑" value="10–20%" />
              <Stat label="CO₂ per Route ↓" value="25%+" />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              *Illustrative pilot ranges; actual results vary by city size and baseline operations.
            </p>
          </section>

          {/* What We Value */}
          <section className="mt-10">
            <h2 className="text-xl font-bold text-gray-900">What We Value</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              <ValueCard title="Reliability" text="Systems that work in real streets, not just slides." />
              <ValueCard title="Sustainability" text="Every decision aims to reduce waste and emissions." />
              <ValueCard title="Partnership" text="We co-create with municipalities and communities." />
            </div>
          </section>

          {/* Timeline */}
          <section className="mt-10">
            <h2 className="text-xl font-bold text-gray-900">Our Journey</h2>
            <ol className="mt-4 relative border-s border-emerald-100">
              {[
                { year: "2023", text: "Concept & early prototypes." },
                { year: "2024", text: "Pilots with municipal partners." },
                { year: "2025", text: "Scaling to multi-city deployments." },
              ].map((step, i) => (
                <li key={i} className="mb-8 ms-6">
                  <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white text-xs font-bold">
                    {i + 1}
                  </span>
                  <h4 className="text-sm font-semibold text-gray-900">{step.year}</h4>
                  <p className="text-gray-600">{step.text}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Team */}
          <section className="mt-10">
            <h2 className="text-xl font-bold text-gray-900">Leadership</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
              {[
                { name: "Project Owner", role: "Urban Services" },
                { name: "Tech Lead", role: "IoT & Cloud" },
                { name: "Operations Lead", role: "Municipal Partnerships" },
              ].map((p, idx) => (
                <div key={idx} className="rounded-xl border border-emerald-100 p-6">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-emerald-400 to-lime-400" />
                  <h5 className="mt-4 text-lg font-semibold text-gray-900">{p.name}</h5>
                  <p className="text-sm text-gray-600">{p.role}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="mt-10">
            <div className="rounded-xl bg-gradient-to-br from-emerald-600 to-lime-600 p-6 text-white">
              <h3 className="text-xl font-bold">Ready to make waste collection smarter?</h3>
              <p className="mt-1 opacity-90">
                Talk to our team about pilots, integrations, and funding options.
              </p>
              <a
                href="/contact"
                className="inline-block mt-4 bg-white text-emerald-700 font-semibold px-4 py-2 rounded-lg shadow hover:shadow-md"
              >
                Contact Us
              </a>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

/* --- Small reusable atoms to keep code clean --- */
function Stat({ label, value }) {
  return (
    <div className="rounded-lg border border-emerald-100 p-4 text-center">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-extrabold text-gray-900">{value}</p>
    </div>
  );
}

function ValueCard({ title, text }) {
  return (
    <div className="rounded-xl border border-emerald-100 p-6">
      <h4 className="text-lg font-bold text-gray-900">{title}</h4>
      <p className="mt-2 text-gray-600">{text}</p>
    </div>
  );
}
