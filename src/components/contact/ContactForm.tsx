"use client";

import { useState } from "react";

interface FormState {
  name: string;
  phone: string;
  message: string;
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12 px-6 bg-brand-light/60 rounded-2xl border border-brand-primary/20">
        {/* Checkmark icon */}
        <div className="w-14 h-14 rounded-full bg-brand-secondary/20 flex items-center justify-center mb-5">
          <svg
            className="w-7 h-7 text-brand-secondary"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="font-heading text-2xl font-semibold text-brand-dark mb-2">
          Got it!
        </h3>
        <p className="text-brand-dark/65 text-base leading-relaxed max-w-sm">
          We'll get back to you within 24 hours. Talk soon!
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Name */}
      <div>
        <label
          htmlFor="contact-name"
          className="block text-sm font-medium text-brand-dark mb-1.5"
        >
          Your Name <span className="text-brand-primary">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          required
          autoComplete="name"
          placeholder="Maya Johnson"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="
            w-full rounded-lg border border-brand-dark/20 bg-white
            py-3 px-4 text-brand-dark placeholder:text-brand-dark/35
            focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent
            transition-shadow duration-150
          "
        />
      </div>

      {/* Phone */}
      <div>
        <label
          htmlFor="contact-phone"
          className="block text-sm font-medium text-brand-dark mb-1.5"
        >
          Phone Number <span className="text-brand-primary">*</span>
        </label>
        <input
          id="contact-phone"
          type="tel"
          required
          autoComplete="tel"
          placeholder="(402) 555-0100"
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          className="
            w-full rounded-lg border border-brand-dark/20 bg-white
            py-3 px-4 text-brand-dark placeholder:text-brand-dark/35
            focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent
            transition-shadow duration-150
          "
        />
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="contact-message"
          className="block text-sm font-medium text-brand-dark mb-1.5"
        >
          Message{" "}
          <span className="text-brand-dark/40 font-normal">(optional)</span>
        </label>
        <textarea
          id="contact-message"
          rows={4}
          placeholder="Have a question about a service, or want to let us know something before your appointment?"
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className="
            w-full rounded-lg border border-brand-dark/20 bg-white
            py-3 px-4 text-brand-dark placeholder:text-brand-dark/35
            focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent
            transition-shadow duration-150 resize-none
          "
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="
          w-full rounded-lg bg-brand-primary text-white
          py-3.5 px-6 font-medium text-base
          hover:bg-brand-primary-dark
          focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2
          transition-colors duration-150
        "
      >
        Send Message
      </button>
    </form>
  );
}
