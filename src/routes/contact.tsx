import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
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

function ContactPage() {
  const [sent, setSent] = useState(false);

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

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="flex flex-col gap-6"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <input required name="name" placeholder="Name" className={field} />
            <input name="company" placeholder="Company / property" className={field} />
          </div>
          <input required type="email" name="email" placeholder="Email" className={field} />
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
              Send enquiry
            </button>
            <a
              href={site.whatsapp}
              data-cursor="Chat"
              className="rounded-full border border-border px-8 py-4 label-mono transition-colors hover:border-ember hover:text-ember"
            >
              WhatsApp instead
            </a>
            {sent && (
              <p className="label-mono text-ember">
                Thank you — we'll reply within one working day.
              </p>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            This form is a front-end demo — messages are not delivered yet. Connect a backend
            to receive enquiries by email.
          </p>
        </form>
      </section>
    </SiteShell>
  );
}
