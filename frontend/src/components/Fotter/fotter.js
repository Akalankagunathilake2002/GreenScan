

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-green-50 to-white border-t border-green-200 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-4 text-sm text-gray-700">

        {/* Brand Info */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-9 w-9 rounded-full bg-gradient-to-r from-green-600 to-emerald-500 grid place-items-center text-white font-bold text-lg">
              GS
            </div>
            <h4 className="text-lg font-extrabold text-gray-900">GreenScan</h4>
          </div>
          <p className="text-gray-600 text-sm leading-6">
            Empowering sustainable waste management through AI, analytics, and community collaboration.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="font-semibold text-gray-900 mb-3">Quick Links</h5>
          <ul className="space-y-2">
            <li><a href="/about" className="hover:text-green-600">About Us</a></li>
            <li><a href="/impact" className="hover:text-green-600">Impact</a></li>
            <li><a href="/reports" className="hover:text-green-600">Reports</a></li>
            <li><a href="/contact" className="hover:text-green-600">Contact</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h5 className="font-semibold text-gray-900 mb-3">Support</h5>
          <ul className="space-y-2">
            <li><a href="/help" className="hover:text-green-600">Help Center</a></li>
            <li><a href="/privacy" className="hover:text-green-600">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-green-600">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h5 className="font-semibold text-gray-900 mb-3">Stay Updated</h5>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-2"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-green-600 to-emerald-500 text-white font-semibold px-4 py-2 rounded-lg hover:from-green-700 hover:to-emerald-600"
            >
              Subscribe
            </button>
          </form>
          <div className="flex gap-4 mt-4 text-gray-500">
            <a href="#" aria-label="Facebook" className="hover:text-green-600 transition">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12A10 10 0 1 0 11.6 21.9V14.9H9v-3h2.6v-2.3c0-2.6 1.5-4.1 3.8-4.1 1.1 0 2.2.2 2.2.2v2.4H16c-1.2 0-1.6.8-1.6 1.5v2.2h2.7l-.4 3h-2.3v7A10 10 0 0 0 22 12Z" /></svg>
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-green-600 transition">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2z" /></svg>
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-green-600 transition">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0H5C2.3 0 0 2.3 0 5v14c0 2.7 2.3 5 5 5h14c2.7 0 5-2.3 5-5V5c0-2.7-2.3-5-5-5zM8 19H5v-9h3v9zm-1.5-10.3c-1 0-1.8-.8-1.8-1.7s.8-1.8 1.8-1.8 1.8.8 1.8 1.8-.8 1.7-1.8 1.7zm13.5 10.3h-3v-4.8c0-1.1-.4-1.9-1.5-1.9s-1.7.9-1.7 2V19h-3v-9h3v1.2c.4-.8 1.4-1.5 2.7-1.5 2.1 0 3.5 1.3 3.5 4V19z" /></svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-green-100 text-center text-gray-500 py-4 text-xs">
        © {new Date().getFullYear()} GreenScan • Empowering Sustainable Waste Management ♻️
      </div>
    </footer>
  );
}
