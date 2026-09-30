# portofolio-dw

Astro + React + TypeScript portfolio, built as a static site for Cloudflare Pages.
Tailwind, GSAP animations, Lenis scrolling, project links, and Gmail contact are
retained. Astro renders the portfolio HTML at build time and hydrates one React
island on page load to preserve the shared animation/scroll lifecycle.

## Local development

Use Node.js 22.12 or newer within Node 22 (see `.node-version`).

```sh
npm ci
npm run dev
```

## Build, preview, and checks

```sh
npm run check
npm test
npm start
```

`npm test` builds the site and checks the generated homepage, assets, and 404.
`npm start` previews the existing build; run `npm run build` first if needed.
The deployable directory is **`dist/`**, not `.next/` or `out/`.

Browser regression checks cover desktop/mobile hydration, navigation, image
loading, fonts, Gmail compose data, no-JavaScript content, and unknown routes:

```sh
npx playwright install chromium
npm run test:browser
```

## Cloudflare Pages: Git integration

1. Push the migration to your Git repository.
2. In Cloudflare, open **Workers & Pages**, create a **Pages** project, and
   connect your Git provider. Choose this repository and your production branch.
   Use the Pages deployment flow, not a Worker.
3. Set these build options:

   | Setting | Value |
   | --- | --- |
   | Framework preset | Astro (or None) |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | Root directory | Repository root |
   | Node version | `22`, supplied by `.node-version` |

   Override any different preset values. No Cloudflare adapter, Wrangler
   configuration, application secrets, or runtime environment variables are
   needed for this static portfolio. Browser tests run locally, not as part of
   the Pages build.
4. Deploy and verify the assigned `*.pages.dev` URL before changing any domain.
   Pushes to the production branch trigger deployments; other branch previews
   depend on your Pages branch settings.

## Before switching traffic

Keep Vercel live while comparing the Cloudflare preview with the existing site:

- Check desktop/mobile layout, fonts, icons, hero and project images.
- Check navigation anchors, page entrance, scrolling, and all section animations.
- Check project/social links and contact: Execute opens Gmail with the entered
  name, email, and message. It does not send email from a backend.
- Check title/description, browser errors, missing requests, and performance.
- Check an unknown path returns the custom 404, not the homepage.

After the preview passes, add your custom domain through the Pages project's
**Custom domains** settings and follow its DNS instructions. Preserve email DNS
records if changing nameservers. A `*.vercel.app` address cannot be transferred;
use `*.pages.dev` or your own domain. Keep the Vercel deployment and previous DNS
values available for rollback until Cloudflare is verified and stable.

## Migration notes

- `src/pages/index.astro` is the page entry; `src/layouts/Layout.astro` owns HTML,
  metadata, font imports, and global CSS. `src/components/Portfolio.tsx` composes
  the existing React components.
- Montserrat and JetBrains Mono are self-hosted through Fontsource. Material
  Symbols still loads from Google's stylesheet in the browser.
- Native images retain their existing containers and crop behavior. Original
  image files are served without Vercel's automatic resizing/optimization;
  large images may warrant a separately tested optimization pass.
- The initial overlay is hidden in static HTML, so it cannot cover the page if
  JavaScript is disabled. Interactive controls/animations still require JS.
- Vercel project demo links refer to separate apps and remain unchanged.
- Server-side features would require revisiting this static architecture.
- Existing React/animation dependencies were retained; check `npm audit` for
  remaining dependency advisories before treating deployment as security-hardened.
