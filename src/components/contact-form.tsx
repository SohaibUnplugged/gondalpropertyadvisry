"use client";

import { useState, useSyncExternalStore } from "react";
import { enquiryTypes, site } from "@/lib/site";

const subscribe = () => () => {};

export function ContactForm() {
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);
  return (
    <form
      className="contact-form"
      onSubmit={(event) => {
        event.preventDefault();
        setReady(false);
        const data = new FormData(event.currentTarget);
        const name = String(data.get("name") ?? "").trim();
        const interest = String(data.get("interest") ?? "");
        const message = String(data.get("message") ?? "").trim();
        if (
          name.length < 2 ||
          name.length > 80 ||
          message.length < 10 ||
          message.length > 1000 ||
          !enquiryTypes.includes(interest)
        ) {
          setError(
            "Please enter your name, choose a topic, and add a message of 10–1,000 characters.",
          );
          return;
        }
        setError("");
        setReady(true);
        const text = `Hello Usman, my name is ${name}. I’m interested in ${interest.toLowerCase()}.\n\n${message}`;
        window.open(
          `${site.whatsapp}?text=${encodeURIComponent(text)}`,
          "_blank",
          "noopener,noreferrer",
        );
      }}
    >
      <h3>Start a conversation</h3>
      <p>A little context helps us get straight to what matters.</p>
      <noscript>
        <p>
          Use the <a href={site.whatsapp}>direct WhatsApp link</a> to contact
          Usman. The message builder requires JavaScript.
        </p>
      </noscript>
      <fieldset disabled={!hydrated}>
        <label htmlFor="name">Your name</label>
        <input
          id="name"
          name="name"
          placeholder="Full name"
          autoComplete="name"
          minLength={2}
          maxLength={80}
          required
        />
        <label htmlFor="interest">I’m interested in</label>
        <select id="interest" name="interest" defaultValue="" required>
          <option value="" disabled>
            Select an enquiry
          </option>
          {enquiryTypes.map((topic) => (
            <option key={topic}>{topic}</option>
          ))}
        </select>
        <label htmlFor="message">What do you have in mind?</label>
        <textarea
          id="message"
          name="message"
          rows={3}
          placeholder="Your preferred location, budget, or a question…"
          minLength={10}
          maxLength={1000}
          required
        />
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <button className="button button-copper" type="submit">
          Continue on WhatsApp
        </button>
        <p className="form-note" aria-live="polite">
          {ready
            ? "Your message is ready in WhatsApp. Review it and tap send. If a new tab didn’t open, use the WhatsApp link beside this form."
            : "Opens WhatsApp with your message. Nothing is sent until you tap send there."}
        </p>
      </fieldset>
    </form>
  );
}
