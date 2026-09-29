import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, type FormEvent } from "react";
import { SiteShell } from "@/components/SiteShell";
import { site, services } from "@/lib/site";

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

// Turns the form fields into a single, readable enquiry message that we send
// either to WhatsApp or to email. Empty optional fields are skipped.
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

function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState<null | "whatsapp" | "email">(null);

  // Primary: open WhatsApp (a new tab) with the enquiry pre-filled.
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { body } = buildEnquiry(new FormData(e.currentTarget));
    window.open(
      `${site.whatsapp}?text=${encodeURIComponent(body)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setSent("whatsapp");
  };

  // Secondary: open the visitor's mail app with the same details pre-filled.
  const handleEmail = () => {
    const form = formRef.current;
    if (!form || !form.reportValidity()) return; // run native required/email checks
    const { name, body } = buildEnquiry(new FormData(form));
    const subject = `New enquiry${name ? ` from ${name}` : ""}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent("email");
  };

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

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              type="submit"
              data-cursor="Send"
              className="rounded-full bg-ember px-8 py-4 label-mono text-primary-foreground transition-colors hover:bg-ember-soft"
            >
              Send via WhatsApp
            </button>
            <button
              type="button"
              onClick={handleEmail}
              data-cursor="Email"
              className="rounded-full border border-border px-8 py-4 label-mono transition-colors hover:border-ember hover:text-ember"
            >
              Email instead
            </button>
          </div>

          {sent === "whatsapp" && (
            <p className="label-mono text-ember">
              WhatsApp is opening in a new tab with your details — just hit send and we'll
              reply within one working day.
            </p>
          )}
          {sent === "email" && (
            <p className="label-mono text-ember">
              Your email app is opening with the details filled in — hit send and we'll be in
              touch within one working day.
            </p>
          )}
          {!sent && (
            <p className="text-xs text-muted-foreground">
              Your details are packaged into a message you send from WhatsApp or your own email
              app — nothing is stored on this site.
            </p>
          )}
        </form>
      </section>
    </SiteShell>
  );
}
