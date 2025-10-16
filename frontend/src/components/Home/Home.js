import { useEffect, useState } from "react";
import Header from "../Header/header";
import Fotter from "../Fotter/fotter";
import "./home.css";


export default function HomePage() {
  const slides = [
    "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?auto=format&fit=crop&w=1920&q=80", // recycling bins
    "https://images.unsplash.com/photo-1556767576-cfba7b33a4c2?auto=format&fit=crop&w=1920&q=80", // eco volunteers
    "https://images.unsplash.com/photo-1581092335533-041ce5d5649b?auto=format&fit=crop&w=1920&q=80", // waste sorting tech
    "https://images.unsplash.com/photo-1620318895018-93cf2e91e0e9?auto=format&fit=crop&w=1920&q=80", // waste truck
  ];

  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 4000);
    return () => clearInterval(id);
  }, [slides.length]);

  const features = [
    {
      title: "AI Waste Detection",
      desc: "Analyze waste using AI image recognition to identify recyclable materials instantly.",
      icon: "🤖",
    },
    {
      title: "Smart Collection Tracking",
      desc: "Track garbage trucks and optimize routes with real-time GPS monitoring.",
      icon: "🚛",
    },
    {
      title: "Community Impact",
      desc: "Earn eco-points for recycling and view community impact dashboards.",
      icon: "🌍",
    },
    {
      title: "Waste Reports",
      desc: "Generate and download reports to monitor trends and recycling performance.",
      icon: "📊",
    },
  ];

  const stats = [
    { value: "2.4M+", label: "Kg Waste Collected" },
    { value: "85%", label: "Recycling Efficiency" },
    { value: "120+", label: "Smart Bins Deployed" },
    { value: "30+", label: "Cities Covered" },
  ];

  const news = [
    {
      title: "GreenScan introduces AI waste sorting in Colombo",
      img: "https://images.unsplash.com/photo-1581091012184-5c1b1b5308b8?auto=format&fit=crop&w=800&q=80",
      date: "Sep 2025",
    },
    {
      title: "Community recycling drive collects 10 tons in a week",
      img: "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?auto=format&fit=crop&w=800&q=80",
      date: "Aug 2025",
    },
    {
      title: "Smart bins to be installed across Sri Lanka",
      img: "https://images.unsplash.com/photo-1581578017422-3eec3b6a7e2d?auto=format&fit=crop&w=800&q=80",
      date: "Jul 2025",
    },
  ];

  return (
    <div className="relative font-sans text-gray-900 bg-gradient-to-b from-white via-green-50/50 to-white overflow-x-hidden">
      <Header />

      {/* Gradient blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-tr from-green-300/20 to-emerald-200/20 blur-3xl" />
      <div className="pointer-events-none absolute top-[30%] -right-24 h-72 w-72 rounded-full bg-gradient-to-tr from-lime-300/20 to-green-300/20 blur-3xl" />

      {/* Hero Section */}
      <section className="relative h-[520px] w-full overflow-hidden border-b border-gray-200/70">
        {slides.map((url, i) => (
          <div
            key={url}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${url})` }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/20" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-5 z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight">
            Transforming Waste into <span className="text-lime-300">Opportunity</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base md:text-lg/7 text-white/85 max-w-2xl">
            GreenScan helps cities, companies, and citizens manage waste efficiently with AI insights and community data.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href="#features"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:from-green-700 hover:to-emerald-600"
            >
              Explore Features
            </a>
            <a
              href="#impact"
              className="inline-flex items-center gap-2 rounded-xl bg-white/15 px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-white/30 hover:bg-white/20"
            >
              View Impact
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Smart Waste Management Features</h2>
          <p className="text-sm text-gray-600 mb-10">
            Cutting-edge technology for a cleaner and greener tomorrow.
          </p>

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 hover:shadow-md transition"
              >
                <div className="text-4xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section id="impact" className="py-16 bg-gradient-to-b from-green-50 to-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Our Impact So Far</h2>
          <p className="text-sm text-gray-600 mb-10">
            Together, we’re building a sustainable waste-free future.
          </p>

          <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 hover:-translate-y-1 transition"
              >
                <div className="text-2xl font-extrabold text-green-600">{s.value}</div>
                <div className="text-sm text-gray-600 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section id="news" className="py-16 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
            Latest from GreenScan
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {news.map((n) => (
              <div
                key={n.title}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition"
              >
                <img src={n.img} alt={n.title} className="w-full h-44 object-cover" />
                <div className="p-5">
                  <div className="text-xs text-gray-500 mb-2">{n.date}</div>
                  <h3 className="font-semibold text-lg text-gray-900">{n.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-500 text-white text-center">
        <h2 className="text-3xl font-extrabold mb-2">Join the Green Revolution ♻️</h2>
        <p className="text-sm mb-6">
          Partner with GreenScan and make sustainable waste management a reality in your community.
        </p>
        <a
          href="/register"
          className="inline-block bg-white text-green-700 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition"
        >
          Get Started
        </a>
      </section>

      <Fotter />
    </div>
  );
}
