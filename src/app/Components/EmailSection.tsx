"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";

interface formValues {
  email: string;
  subject: string;
  message: string;
}

const EmailSection = () => {
  const [emailSubmitted, setEmailSubmitted] = React.useState(false);
  const [form, setForm] = useState<formValues>({
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const data = form;
    const JSONdata = JSON.stringify(data);
    const endpoint = "/api/send";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };

    const res = await fetch(endpoint, options);
    const resData = await res.json();

    if (resData.status === 200) {
      setEmailSubmitted(true);
    }
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <section id="contact" className="mono-section">
      <h2>
        <span className="text-accent">#</span> Contact
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {/* Info Section */}
        <div>
          <div className="border-2 border-mono-text p-4 bg-mono-bg-alt mb-6">
            <div className="text-mono-text-alt text-sm mb-4">
              {"// contact_info.json"}
            </div>
            <pre className="text-mono-text text-sm overflow-x-auto">
{`{
  "status": "open_to_work",
  "response_time": "< 24 hours",
  "preferred": "email"
}`}
            </pre>
          </div>

          <div className="border-2 border-mono-text p-4 bg-mono-bg-alt">
            <h3 className="text-mono-text font-bold mb-4 uppercase tracking-wide">
              Let&apos;s Connect
            </h3>
            <p className="text-mono-text-alt mb-6">
              I&apos;m currently looking for new opportunities. My inbox is
              always open. Whether you have a question or just want to say hi,
              I&apos;ll try my best to get back to you!
            </p>

            <div className="space-y-2">
              <Link
                href="https://github.com/ayan-sh03/"
                target="_blank"
                className="block text-mono-text-alt hover:text-accent hover:bg-transparent no-underline transition-colors"
              >
                → [GitHub] github.com/ayan-sh03
              </Link>
              <Link
                href="https://www.linkedin.com/in/ayan-sh003/"
                target="_blank"
                className="block text-mono-text-alt hover:text-accent hover:bg-transparent no-underline transition-colors"
              >
                → [LinkedIn] linkedin.com/in/ayan-sh003
              </Link>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="border-2 border-mono-text p-4 bg-mono-bg-alt">
          <div className="text-mono-text-alt text-sm mb-4">
            {"// send_message.sh"}
          </div>

          {emailSubmitted ? (
            <div className="border-2 border-accent p-4 text-center">
              <pre className="text-accent text-sm">
{`┌─────────────────────────────────┐
│                                 │
│   ✓ MESSAGE SENT SUCCESSFULLY   │
│                                 │
│   Thank you for reaching out!   │
│   I'll get back to you soon.    │
│                                 │
└─────────────────────────────────┘`}
              </pre>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChangeInput}
                  id="email"
                  required
                  placeholder="your@email.com"
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChangeInput}
                  id="subject"
                  required
                  placeholder="Hello!"
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="message">Message</label>
                <textarea
                  name="message"
                  id="message"
                  value={form.message}
                  onChange={handleChangeTextArea}
                  placeholder="Your message here..."
                  rows={5}
                  className="w-full"
                />
              </div>

              <button
                type="submit"
                className="w-full border-2 border-accent text-accent hover:bg-accent hover:text-mono-bg"
              >
                [Send Message]
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default EmailSection;
