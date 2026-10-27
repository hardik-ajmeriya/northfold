"use client";

import { useState } from "react";
import { budgets, offices, projectTypes } from "@/data/studio";

type Errors = Partial<Record<"name" | "email" | "type" | "message", string>>;

/**
 * Sheet NF-601: the enquiry form, laid out as a drawing-request sheet.
 * Static site: nothing is sent; on submit it validates and shows the issued request.
 * To make it live, post the FormData to a form service (Formspree, Basin, a Vercel function) in onSubmit.
 */
export function Contact() {
  const [type, setType] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState<{ ref: string; name: string } | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "").trim();
    const email = String(f.get("email") ?? "").trim();
    const message = String(f.get("message") ?? "").trim();
    const next: Errors = {};
    if (!name) next.name = "Please add your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Please check the email address.";
    if (!type) next.type = "Pick a project type.";
    if (message.length < 10) next.message = "A sentence or two about the project, please.";
    setErrors(next);
    if (Object.keys(next).length) {
      const first = e.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`);
      first?.focus();
      return;
    }
    setSent({ ref: `NF-RQ-${String(Date.now()).slice(-4)}`, name: name.split(" ")[0] });
  };

  const field = "w-full border-0 border-b border-ink/40 bg-transparent px-0 py-2.5 text-[15px] outline-none transition-colors placeholder:text-graphite/60 focus:border-accent";

  return (
    <section id="contact" aria-labelledby="contact-title" className="t-blue relative bg-paper px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[1680px]">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-ink pb-6">
          <h2 id="contact-title" className="leading-[0.9]">
            <span className="label block text-graphite">
              Sheet NF-601 <span className="text-accent">/</span> Contact
            </span>
            <span className="w-narrow mt-3 block text-[clamp(2.6rem,6vw,5.5rem)] font-[850] uppercase">Start</span>
            <span className="w-wide block text-[clamp(1.1rem,2.2vw,2rem)] font-[280] text-accent">with a drawing request</span>
          </h2>
          <p className="label max-w-[38ch] text-graphite">
            Tell us about the site and what you need. A director replies within two working days.
          </p>
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_minmax(280px,28%)] lg:gap-16">
          <div className="relative border border-ink/70 bg-paper p-6 sm:p-10">
            {sent ? (
              <div role="status" className="flex min-h-[420px] flex-col items-start justify-center">
                <div className="-rotate-6 border-2 border-accent px-4 py-3 text-accent">
                  <span className="label block text-[9px]">Northfold · received</span>
                  <span className="w-wide block text-2xl font-bold tracking-[0.12em]">{sent.ref}</span>
                </div>
                <p className="w-wide mt-8 text-2xl font-[300]">Thank you, {sent.name}.</p>
                <p className="mt-3 max-w-[48ch] text-ink/75">
                  Your request is logged. A director will reply within two working days to arrange a first visit.
                </p>
                <button type="button" onClick={() => setSent(null)} className="label mt-8 border border-ink px-3 py-2 hover:bg-ink hover:text-paper">
                  Send another
                </button>
              </div>
            ) : (
              <form noValidate onSubmit={onSubmit} className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
                <Field id="name" label="01 Name" error={errors.name}>
                  <input id="name" name="name" autoComplete="name" className={field} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined} />
                </Field>
                <Field id="email" label="02 Email" error={errors.email}>
                  <input id="email" name="email" type="email" autoComplete="email" className={field} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-err" : undefined} />
                </Field>

                <fieldset className="sm:col-span-2">
                  <legend className="label text-graphite">03 Project type</legend>
                  <input type="hidden" name="type" value={type} />
                  <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4" role="radiogroup" aria-describedby={errors.type ? "type-err" : undefined}>
                    {projectTypes.map((t) => (
                      <label key={t} className={`label flex cursor-pointer items-center gap-2 border px-3 py-3 text-[10px] transition-colors ${type === t ? "border-ink bg-ink text-paper" : "border-ink/30 hover:border-ink"}`}>
                        <input type="radio" name="type-pick" value={t} checked={type === t} onChange={() => setType(t)} className="sr-only" />
                        <span className={`size-2 border ${type === t ? "border-paper bg-accent" : "border-ink/50"}`} aria-hidden="true" />
                        {t}
                      </label>
                    ))}
                  </div>
                  {errors.type && <p id="type-err" className="label mt-2 text-accent">{errors.type}</p>}
                </fieldset>

                <Field id="location" label="04 Site location">
                  <input id="location" name="location" placeholder="Town, country" className={field} />
                </Field>
                <Field id="budget" label="05 Build budget">
                  <select id="budget" name="budget" defaultValue="" className={`${field} cursor-pointer`}>
                    <option value="" disabled>
                      Choose a range
                    </option>
                    {budgets.map((b) => (
                      <option key={b}>{b}</option>
                    ))}
                  </select>
                </Field>
                <div className="sm:col-span-2">
                  <Field id="message" label="06 About the project" error={errors.message}>
                    <textarea id="message" name="message" rows={4} placeholder="The site, what you need, when you would like to start" className={`${field} resize-y`} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-err" : undefined} />
                  </Field>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 sm:col-span-2">
                  <p className="label text-graphite">Issue: Rev 0 · For discussion</p>
                  <button type="submit" className="label group flex items-center gap-3 bg-ink px-5 py-3.5 text-[11px] text-paper transition-colors hover:bg-accent">
                    Issue request
                    <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* studios */}
          <div>
            <p className="label border-b border-ink pb-2">Studios</p>
            {offices.map((o) => (
              <div key={o.city} className="border-b border-rule py-5">
                <p className="w-narrow text-3xl font-[800] uppercase">{o.city}</p>
                <address className="mt-2 text-sm not-italic leading-relaxed text-ink/75">
                  {o.lines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </address>
              </div>
            ))}
            <div className="py-5">
              <p className="label text-graphite">Email</p>
              <a href="mailto:studio@northfold.studio" className="w-wide mt-1 inline-block text-lg underline decoration-ink/30 underline-offset-4 hover:decoration-accent">
                studio@northfold.studio
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="label text-graphite">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} className="label mt-2 text-accent">
          {error}
        </p>
      )}
    </div>
  );
}
