import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, type FormEvent } from "react";
import { SiteShell } from "@/components/SiteShell";
import { site, services, web3formsAccessKey } from "@/lib/site";

const title = "Contact — AKANARA";
const description =
  "Tell us about your property or product. Project enquiries, budgets and timelines — we reply within one working day.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const field =
  "w-full border-b border-border bg-transparent py-4 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-ember";

// Turns the form fields into a single, readable enquiry — used for the WhatsApp
// hand-off (and the fallback when no email key is configured yet).
function buildEnquiry(data: FormData) {
  const get = (k: string) => ((data.get(k) as string) ?? "").trim();
  const lines: string[] = ["New enquiry via akanara.com", ""];

  lines.push(`Name: ${get("name")}`);
  const company = get("company");
  if (company) lines.push(`Company / property: ${company}`);
  lines.push(`Email: ${get("email")}`);

  const budget = get("budget");
  if (budget) lines.push(`Budget: ${budget}`);
  const service = get("service");
  if (service) lines.push(`Service: ${service}`);
  const timeline = get("timeline");
  if (timeline) lines.push(`Timeline: ${timeline}`);

  const message = get("message");
  if (message) lines.push("", message);

  return { name: get("name"), body: lines.join("\n") };
}

type Status = "idle" | "sending" | "success" | "error";

function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [note, setNote] = useState("");

  const openWhatsApp = (data: FormData) => {
    const { body } = buildEnquiry(data);
    window.open(
      `${site.whatsapp}?text=${encodeURIComponent(body)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  // Primary: deliver the enquiry to our inbox via Web3Forms. If no key is
  // configured yet, hand off to WhatsApp so the form is never a dead end.
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if (!web3formsAccessKey) {
      openWhatsApp(data);
      setStatus("success");
      setNote("WhatsApp is opening with your details — just hit send and we'll reply within one working day.");
      return;
    }

    setStatus("sending");
    setNote("");

    const name = (data.get("name") as string) || "the website";
    data.append("access_key", web3formsAccessKey);
    data.append("subject", `New enquiry from ${name} — akanara.com`);
    data.append("from_name", "AKANARA website");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      const json = (await res.json()) as { success?: boolean; message?: string };
      if (json.success) {
        setStatus("success");
        setNote("Thank you — your enquiry is on its way. We'll reply within one working day.");
        form.reset();
      } else {
        setStatus("error");
        setNote(json.message || "Something went wrong. Please try WhatsApp or email us directly.");
      }
    } catch {
      setStatus("error");
      setNote("Network hiccup — please try WhatsApp below, or email us directly.");
    }
  };

  // Secondary: quick WhatsApp hand-off, pre-filled with whatever's entered.
  const handleWhatsApp = () => {
    const form = formRef.current;
    if (!form) return;
    openWhatsApp(new FormData(form));
  };

  const sending = status === "sending";

  return (
    <SiteShell>
      <section className="mx-auto grid max-w-[110rem] gap-16 px-6 pb-32 pt-40 md:grid-cols-[1fr_1.2fr] md:px-12 md:pt-56">
        <div>
          <p className="label-mono">Contact</p>
          <h1 className="text-display mt-6 text-6xl md:text-7xl">
            Tell us
            <br />
            about it.
          </h1>
          <div className="mt-12 flex flex-col gap-3 text-sm">
            <a href={`mailto:${site.email}`} className="hover:text-ember" data-cursor="Email">
              {site.email}
            </a>
            <a href={site.whatsapp} className="hover:text-ember" data-cursor="Chat">
              WhatsApp {site.phone}
            </a>
            <p className="text-muted-foreground">{site.address}</p>
          </div>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <input
              required
              name="name"
              autoComplete="name"
              placeholder="Name"
              className={field}
            />
            <input
              name="company"
              autoComplete="organization"
              placeholder="Company / property"
              className={field}
            />
          </div>
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Email"
            className={field}
          />
          <div className="grid gap-6 sm:grid-cols-2">
            <select name="budget" className={field} defaultValue="">
              <option value="" disabled>
                Budget range
              </option>
              <option>Under $10k</option>
              <option>$10k – $30k</option>
              <option>$30k – $75k</option>
              <option>$75k+</option>
            </select>
            <select name="service" className={field} defaultValue="">
              <option value="" disabled>
                Service
              </option>
              {services.map((s) => (
                <option key={s.no}>{s.title}</option>
              ))}
            </select>
          </div>
          <select name="timeline" className={field} defaultValue="">
            <option value="" disabled>
              Timeline
            </option>
            <option>As soon as possible</option>
            <option>1 – 3 months</option>
            <option>3 – 6 months</option>
            <option>Exploring</option>
          </select>
          <textarea
            name="message"
            rows={5}
            placeholder="What are you building?"
            className={`${field} resize-none`}
          />

          {/* Honeypot — hidden from people, catches bots (Web3Forms). */}
          <input
            type="checkbox"
            name="botcheck"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
            style={{ display: "none" }}
          />

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              type="submit"
              disabled={sending}
              data-cursor="Send"
              className="rounded-full bg-ember px-8 py-4 label-mono text-primary-foreground transition-colors hover:bg-ember-soft disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sending ? "Sending…" : "Send enquiry"}
            </button>
            <button
              type="button"
              onClick={handleWhatsApp}
              data-cursor="Chat"
              className="rounded-full border border-border px-8 py-4 label-mono transition-colors hover:border-ember hover:text-ember"
            >
              WhatsApp instead
            </button>
          </div>

          {note && (
            <p
              className={`label-mono ${status === "error" ? "text-red-400" : "text-ember"}`}
              role="status"
              aria-live="polite"
            >
              {note}
            </p>
          )}
          {status === "idle" && (
            <p className="text-xs text-muted-foreground">
              We reply within one working day. Prefer to chat? Use WhatsApp.
            </p>
          )}
        </form>
      </section>
    </SiteShell>
  );
}
