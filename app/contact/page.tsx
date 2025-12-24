"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // TODO: Connect to API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="pt-40 pb-20 md:pt-52 md:pb-28">
        <div className="max-w-[600px] mx-auto px-6">
          {submitted ? (
            <div className="py-12 text-center">
              <h3 className="text-2xl font-bold mb-4">
                Thank you.
              </h3>
              <p className="text-gray-600">
                We'll be in touch soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name Row */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] font-bold tracking-[0.15em] uppercase text-gray-500 mb-4">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    required
                    className="w-full border-b-2 border-gray-200 bg-transparent py-3 text-lg focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold tracking-[0.15em] uppercase text-gray-500 mb-4">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="w-full border-b-2 border-gray-200 bg-transparent py-3 text-lg focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-[11px] font-bold tracking-[0.15em] uppercase text-gray-500 mb-4">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="w-full border-b-2 border-gray-200 bg-transparent py-3 text-lg focus:outline-none focus:border-black transition-colors"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-[11px] font-bold tracking-[0.15em] uppercase text-gray-500 mb-4">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={4}
                  required
                  className="w-full border-b-2 border-gray-200 bg-transparent py-3 text-lg focus:outline-none focus:border-black transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-block border-2 border-black px-10 py-4 text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-black hover:text-white transition-colors disabled:opacity-50"
                >
                  {submitting ? "Sending..." : "Submit"}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
