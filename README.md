# Mateo’s Taqueria — Responsive Website & Expo Prototype

A front-end-only, design-led prototype based on the supplied Mateo’s Taqueria homepage wireframe, the blue script wordmark, and the supplied restaurant and catering menu artwork.

## What you get

- **Expo + React Native project** with a web-first **Material UI (MUI)** interface (`src/AppPlatform.web.tsx`).
- **Native iOS / Android companion** (`src/AppPlatform.native.tsx`) using React Native primitives, so MUI does not need to run on native.
- **Responsive web pages:** Home, Menu, Catering, Rewards, Locations, About.
- **Interactive, local-only UI:** menu category filters, search, product details, demo add-to-bag, bag quantities, `localStorage` persistence, catering package picker and guest-count estimate, directions and `sms:` / `tel:` contact links.
- **Vercel SPA configuration** (`vercel.json`) to deploy the Expo web export.
- **Zero-install preview** (`preview/index.html`) that works by opening the file on your computer. The companion **Mateos-Taqueria-Preview.html** file is completely self-contained.

## Quick start

Requirements: Node.js **20.19+** or **22+**, npm.

```bash
npm install
npm run web
```

Open the local address printed by Expo, generally `http://localhost:8081`.

For the React Native companion:

```bash
npm run android
# or
npm run ios
```

The MUI implementation is **web-only**, because MUI components require the browser DOM. Native is intentionally implemented with React Native components. Navigation is local React state / SPA browser history; there is no backend or Expo Router dependency.

## Vercel deployment

Build the production web application:

```bash
npm run build
```

Expo exports the single-page web app to `dist/`. The included `vercel.json` configures the build command, `dist/` output directory, and SPA route rewrites.

Deploy by importing the project repository in Vercel or running the Vercel CLI:

```bash
npx vercel
```

Select the project root. The repository already contains the build settings. Once deployed, Vercel supplies the actual web URL. No URL has been provisioned from this deliverable.

If dependency versions are flagged after installing a newer Expo release, use `npx expo install --check` and `npx expo install --fix`, then retest the build.

## Preview without installing anything

Unzip the `Mateos-Taqueria-Preview.zip` file and open `index.html` in Chrome, Safari, Edge, or Firefox. All food imagery and scripts are local to that folder.

Alternatively, open **Mateos-Taqueria-Preview.html**, which embeds all images, CSS, and JavaScript in a single file. The preview is standalone HTML/JavaScript (rather than MUI) so it can run entirely offline. It mirrors the main Expo web navigation and interactions.

## Design specification

| Token | Color | Usage |
|---|---|---|
| Royal blue | `#0069C9` | CTA buttons, accents, links |
| Wordmark sky blue | From owner-supplied logo | Brand name |
| Deep navy | `#092C52` | Headlines, footer, body accents |
| Warm cream | `#FCF9F2` | Hero, page backgrounds |
| Sage green | `#778F62` | Freshness, botanical details |
| Forest green | `#41684E` | Supporting accents |

- **Wordmark** is derived from the owner-supplied “Mateo’s Taqueria” blue script-and-sans logo, without a mascot.
- **Type** is *Barlow Condensed* for bold headlines and *DM Sans* for interface text. Google Fonts are optional; system fallbacks are provided.
- **Photography** has been cropped from the supplied AI-generated reference mockups. Replace with licensed restaurant-owned food photographs before production.
- This UI takes inspiration from the ease-of-ordering patterns of quick-service apps but does not copy any third-party logos or proprietary artwork.

## Content provenance and release checklist

The live website [mateostaqueria.com](https://mateostaqueria.com/) was checked on **November 3, 2026**. It states that Mateo’s Taqueria is *coming soon to Arlington* and that catering is available. It lists **2425 SE Green Oaks Blvd, Suite 103, Arlington, TX 76018** and a testimonial from **Heidi (May 30, 2026)**. The site did not expose a usable HTML full menu at the pages retrieved.

Menu and catering item names and prices in this prototype were entered from the owner-supplied menu images in this design conversation. The catering phone number **(214) 799-7852** comes from the supplied catering artwork, **not** a verified phone listing on the current site. As the provided mockups include AI-generated content, **every menu item, ingredient, photo, price, catering package and phone number must be reviewed by the owner** before production. The design deliberately avoids inventing opening hours, a restaurant opening date, or real rewards balances.

Before public launch:

1. Verify the restaurant's actual hours, contact information, item prices, allergens, portions and images.
2. Replace sample food images with official professional photos.
3. Connect online ordering, payment, loyalty, and catering booking systems when available (not included in this front-end scope).
4. Add a privacy policy and other applicable public-facing disclosures; confirm your actual use of analytics, cookies and forms.
5. Complete mobile, accessibility and responsive testing on real devices.
6. Re-run `npm install`, `npm run check`, and `npm run build` on a machine with network access before deploying.

## Current testing status

- All TypeScript / TSX source files passed a syntax parse with TypeScript.
- The dependency-free preview script passed Node.js syntax checks.
- `node test-preview.cjs` passed basic local component/render and state tests (menu, local cart, catering estimate and image paths).
- **Not yet verified:** full Expo bundling, npm install, native runtime, or an actual Vercel deployment. The execution environment could not reach the npm registry, and its browser automation was blocked by administrator policy.

## Project structure

```text
App.tsx                         # Cross-platform entry point
src/AppPlatform.web.tsx         # React DOM + MUI web experience
src/AppPlatform.native.tsx      # Basic React Native experience
src/data.ts                     # Menu, catering and business data
src/theme.ts                    # MUI theme
src/site.css                    # Responsive web visual system
assets/                         # Original wordmark + demo food images
public/images/                  # Static Expo web image assets
preview/                        # Standalone dependency-free web preview
vercel.json                     # Vercel build + rewrite settings
```

All ordering, checkout, rewards and catering flows are demonstrations. **They do not submit anything to the restaurant.**
