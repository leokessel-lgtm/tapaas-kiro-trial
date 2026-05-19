# Local Preview Pattern (No Registry Access)

## The problem

`@snsw-gel/react` packages are published to a private JFrog registry (`snsw01.jfrog.io`). Without registry access configured, `npm install` will fail for GEL packages.

## The solution: Local preview adapter

Instead of blocking on registry access, use a **local preview adapter** that lets you build and iterate immediately.

### Architecture

```
src/
├── gel.ts                    ← Adapter (single swap point)
├── gel-preview/              ← Local preview components
│   ├── index.tsx             ← All preview components
│   └── styles.css            ← CSS variables from live site
├── tapaas-preview/           ← Trial-only TaPaaS composite components
├── TapaasTransactionSkeleton.tsx
└── layout-preview/           ← Page shell (header/footer)
    ├── ServiceNSWChrome.tsx
    ├── serviceNSWChrome.css
    └── icons.tsx             ← SVG icons from @snsw-gel/ui-icons
```

### How it works

1. **`src/gel.ts`** exports GEL-shaped components from `./gel-preview`
2. **Page components** import only from `./gel` — never from `@snsw-gel/react` directly
3. **When registry access is available**, change `src/gel.ts` to export from `@snsw-gel/react`

### The adapter file (`src/gel.ts`)

```typescript
// Currently exports local preview components
export {
  GlobalStyle,
  Button,
  RadioButtonList,
  ErrorSummary,
  Checkbox,
  InPageAlert,
  Field,
  Input,
  Select,
} from './gel-preview'

// When @snsw-gel/react is available, change to:
// export { GlobalStyle, gel3Themes, Button, ... } from '@snsw-gel/react'
```

### Key rules

- Pages **never** import directly from `@snsw-gel/react`
- Pages **always** import from `./gel`
- Preview components match the real GEL API shape (same props)
- Preview components use CSS variables from the live service.nsw.gov.au site
- The swap to real GEL requires changing only `src/gel.ts`

## Setting up the Vite app

Ask Kiro:

```
Create a minimal Vite React TypeScript app shell:
- index.html (with Public Sans font link)
- src/main.tsx
- src/App.tsx
- vite.config.ts
- tsconfig.json
- package.json with dev/build scripts

Use only public dependencies:
- react, react-dom, vite, @vitejs/plugin-react, typescript

Do not install @snsw-gel/react.
```

## Running locally

```bash
npm install --cache ./.npm-cache   # if global cache has permission issues
npm run dev                        # http://localhost:5173/
npm run build                      # production build
```

## Swapping to real GEL (when registry access is available)

1. Configure `.npmrc`:
   ```
   @snsw-gel:registry=https://snsw01.jfrog.io/artifactory/api/npm/snsw-scope/
   ```
2. Add `"@snsw-gel/react": "3.11.0"` to package.json
3. Change `src/gel.ts` to export from `@snsw-gel/react`
4. Pass `gel3Themes` to `<GlobalStyle themes={gel3Themes}>`
5. Remove `src/gel-preview/` directory
6. Run `npm install && npm run build`

Zero changes needed in page components that import through `./gel`.
