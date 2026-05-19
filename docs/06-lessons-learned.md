# Lessons Learned from the Trial

## What worked well

### 1. The adapter pattern is the key enabler
The `src/gel.ts` adapter file solved the biggest blocker (no registry access) while keeping page code 100% compatible with the real GEL swap later. Zero page changes needed when switching.

### 2. Live site CSS is the best style reference
The live `service.nsw.gov.au` site has all CSS variables inline in the HTML. Fetching the page and extracting `--snsw-*` variables gives you exact production values — more reliable than guessing from screenshots.

### 3. GEL source snapshot has real SVG icon paths
The `@snsw-gel/ui-icons` package in the source snapshot contains all icon SVG `<path>` data inline in `src/index.tsx`. You can extract any icon without needing the private registry.

### 4. The Service NSW logo is publicly accessible
`https://www.service.nsw.gov.au/themes/snsw_theme/images/servicensw-logo.svg` — no auth needed.

### 5. Figma design tokens complement the live site
The Figma extraction gives you the typography scale (exact sizes/weights/line-heights per heading level) and spacing token names. The live site gives you the resolved values.

## What didn't work

### 1. Source-snapshot Vite aliases are too fragile
Attempting to alias `@snsw-gel/*` packages to the source snapshot's `src/` folders requires 19+ aliases, build-time constants (`SNAPSHOT_RELEASE`, `GEL_VERSION`), and external dependencies. One missed transitive dep breaks everything. Not worth it.

### 2. Pill-shaped buttons were wrong
Early assumption was that buttons were pill-shaped (border-radius: 24px). The live site uses `border-radius: 6px`. Always verify against the live site, not screenshots.

### 3. The npm cache can have root-owned files
On some machines, `npm install` fails because the global cache has root-owned files (a known npm bug). Workaround: `npm install --cache ./.npm-cache` uses a local cache.

### 4. Logo images attached in chat are rasterised
Attaching PNG/JPEG images of logos doesn't give you SVG paths. You need either the actual `.svg` file or a URL to fetch it from.

### 5. Header/footer are CMS-driven on the live site
The global header and footer on service.nsw.gov.au are loaded via JavaScript from a React component (`global-header.js`, `global-footer.js`). They're not in the initial HTML. For local preview, you need to build a static approximation.

## Key decisions made

| Decision | Rationale |
|----------|-----------|
| Use local preview adapter | Registry access unavailable; unblocks development |
| Match live site CSS, not Figma | Live site is deployed truth; Figma tokens have unresolved aliases |
| Use `border-radius: 6px` for buttons | Verified from live `.button` class |
| Use `font-weight: 600` for buttons | Verified from live `.button` class |
| Use `font-weight: 500` for labels | Verified from live `label` styles |
| Custom radio/checkbox indicators | Live site hides native inputs and uses 2rem×2rem custom indicators |
| ErrorSummary uses InPageAlert pattern | Verified from GEL source — ErrorSummary wraps InPageAlert |
| No white card around content | Target design shows content directly on white background |
| Focus colour is `#0085b3` not `#2e5299` | Verified from live `--snsw-focus-border` |

## Prompts that work well with Kiro

### For starting a new page
```
Create [page name] using GEL components from ./gel.
Match the Service NSW form styling from the live site CSS variables.
Include ErrorSummary for validation.
Include Continue button and Back link with chevron icon.
```

### For matching a design
```
Here is the target design [image].
Inspect it comprehensively.
Match HEX colours, spacing, and positioning.
Use GEL components where possible.
Use the page shell for header/footer.
```

### For fixing styles
```
Go back and check all form styles and rules from the GEL source and the live site.
Update the preview components to match.
Run npm run build after changes.
```

## Rules that prevent problems

1. **Never import directly from `@snsw-gel/react`** — always go through `./gel`
2. **Never edit the source snapshot or evidence repo**
3. **Never use sudo or request tokens**
4. **Never claim WCAG compliance or production readiness**
5. **Always run `npm run build` after changes**
6. **Always verify against the live site, not assumptions**
7. **Commit working states before attempting risky changes**
