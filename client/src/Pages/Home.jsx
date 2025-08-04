import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const HomePage = () => {
  const [docCount, setDocCount] = useState(15476);

  return (
    <div className="font-sans text-zinc-900 bg-white">

      {/* HERO SECTION */}
      <section
        className="relative w-full h-[90vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=1950&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-6 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Manage Your Medications Effortlessly
          </h1>
          <p className="text-white text-lg mb-8">
            Upload, track, and share your medical documents securely — all in one place.
          </p>
          <Button variant="default" className="bg-orange-600 text-white">
            Start Now
          </Button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Why Use docuMedi?</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              {
                title: "🔐 Privacy First",
                desc: "All documents are encrypted end-to-end. Your health data stays with you.",
              },
              {
                title: "🧾 Paperless Storage",
                desc: "Digitize your prescriptions, reports, and notes for easy access anytime.",
              },
              {
                title: "👩‍⚕️ Doctor-Ready",
                desc: "Generate shareable links or files for your next appointment or checkup.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-orange-100 p-6 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold mb-3 text-orange-700">{item.title}</h3>
                <p className="text-zinc-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-orange-600 text-white py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-2">{docCount.toLocaleString()}+</h2>
          <p className="text-xl">Medical Documents Stored Safely</p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-zinc-50 py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-10 text-left">
            <div>
              <img
                src="https://cdn-icons-png.flaticon.com/512/1828/1828911.png"
                alt="Upload Icon"
                className="w-12 h-12 mb-4"
              />
              <h4 className="text-lg font-semibold mb-2">1. Upload Documents</h4>
              <p className="text-zinc-600">
                Scan or upload prescriptions, test results, or medical letters.
              </p>
            </div>
            <div>
              <img
                src="https://cdn-icons-png.flaticon.com/512/9068/9068737.png"
                alt="Organize Icon"
                className="w-12 h-12 mb-4"
              />
              <h4 className="text-lg font-semibold mb-2">2. Organize Easily</h4>
              <p className="text-zinc-600">
                Sort by category, tag symptoms, and set medication reminders.
              </p>
            </div>
            <div>
              <img
                src="https://cdn-icons-png.flaticon.com/512/3237/3237472.png"
                alt="Share Icon"
                className="w-12 h-12 mb-4"
              />
              <h4 className="text-lg font-semibold mb-2">3. Share Securely</h4>
              <p className="text-zinc-600">
                Give your doctor instant access without printing or emailing files.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1562243061-204550d8a2c9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Medication"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">Built for Real People</h2>
            <p className="text-zinc-700 mb-4">
              We’re a team of healthcare professionals and developers working to make personal medical management smarter, easier, and safer.
            </p>
            <p className="text-zinc-700">
              Whether it's your daily vitamins or a chronic condition, MedVault helps you take control — confidently and privately.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
