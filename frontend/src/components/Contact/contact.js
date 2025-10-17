// src/components/Contact.jsx
import React from "react";
import Header from "../Header/header";
import Footer from "../Fotter/fotter";

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen bg-emerald-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow py-12 px-6 lg:px-16">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg border border-emerald-100 p-8">
          {/* Title */}
          <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-4">
            Contact <span className="text-emerald-600">SmartWaste</span>
          </h1>
          <p className="text-gray-600 text-center mb-8">
            We’d love to hear from you—whether you’re a municipal partner, service provider, or a resident with feedback.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact Form */}
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                // TODO: plug into your API/Firebase/Email service
                alert("Thanks! We received your message.");
              }}
            >
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your full name"
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Topic
                </label>
                <select
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:outline-none bg-white"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    Choose a topic
                  </option>
                  <option value="pilot">City Pilot / Demo</option>
                  <option value="sensors">Bin Sensors Integration</option>
                  <option value="routing">Route Optimization</option>
                  <option value="resident">Resident App / Feedback</option>
                  <option value="billing">PAYT / Billing</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Message
                </label>
                <textarea
                  rows="5"
                  placeholder="Tell us about your city, current challenges, or what you’d like to achieve…"
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-emerald-700 transition"
              >
                Send Message
              </button>
            </form>

            {/* Contact Info / FAQ */}
            <div className="flex flex-col justify-center space-y-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900">📍 Our Office</h2>
                <p className="text-gray-600">Urban Services Hub, Colombo, Sri Lanka</p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900">📞 Call Us</h2>
                <p className="text-gray-600">+94 11 222 3344</p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900">✉️ Email Us</h2>
                <p className="text-gray-600">support@smartwaste.city</p>
              </div>

              <div className="pt-4">
                <h3 className="text-md font-bold text-gray-900">🔎 Quick FAQ</h3>
                <ul className="mt-2 list-disc list-inside text-gray-600 space-y-1">
                  <li>
                    <span className="font-medium text-gray-800">PAYT Support:</span> Yes, billing is PAYT-ready.
                  </li>
                  <li>
                    <span className="font-medium text-gray-800">Sensors:</span> Works with LoRaWAN / 4G devices.
                  </li>
                  <li>
                    <span className="font-medium text-gray-800">Resident App:</span> iOS/Android with push notifications.
                  </li>
                </ul>
              </div>

              <div className="flex space-x-4 mt-2">
                <a href="#" className="text-emerald-600 hover:text-emerald-800 text-xl">
                  <i className="fab fa-facebook" aria-hidden="true"></i>
                  <span className="sr-only">Facebook</span>
                </a>
                <a href="#" className="text-emerald-600 hover:text-emerald-800 text-xl">
                  <i className="fab fa-instagram" aria-hidden="true"></i>
                  <span className="sr-only">Instagram</span>
                </a>
                <a href="#" className="text-emerald-600 hover:text-emerald-800 text-xl">
                  <i className="fab fa-twitter" aria-hidden="true"></i>
                  <span className="sr-only">Twitter</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
