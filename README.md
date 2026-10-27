# Northfold Architects — portfolio demo

A website for a fictional architecture studio. Every house is shown first as a line drawing that draws itself on scroll, then the finished photograph is revealed.

| | |
|---|---|
| Stack | Next.js (static export), TypeScript, Tailwind CSS v4, Framer Motion, Lenis |
| Fonts | Archivo (variable width) + Martian Mono, self-hosted |
| Data | `src/data/*.ts` (projects, retrofit, materials, studio) |

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in /out
npx serve out      # test the real build (smoother than dev mode)
```

## Deploy

Vercel: import the repo, framework "Next.js", no settings needed. Set `NEXT_PUBLIC_SITE_URL` to the live URL.

## Notes

- `tools/trace.py` turns a raster line drawing into the SVG lines used for the draw-on animation (needs `opencv-python`).
- The contact form validates but does not send. Post the form data to Formspree / Basin / a Vercel function in `src/components/studio/Contact.tsx`.
- All people, addresses and projects are fictional.
