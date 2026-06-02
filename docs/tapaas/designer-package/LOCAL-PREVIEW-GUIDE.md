# Local preview guide

## TLDR

Use this guide to open the ZIP package in Kiro, run the app locally, run Storybook locally and capture useful error details if something fails.

## 1. Unzip the package

Unzip the clean package into a normal local folder, for example:

```text
Documents/TaPaaS Kiro local preview/tapaas-kiro-trial
```

Do not unzip it inside another copy of the repo unless Leo asks you to.

## 2. Open the folder in Kiro

Open Kiro, then open the unzipped folder.

Ask Kiro:

```text
Inspect this TaPaaS Kiro trial package. Read START-HERE-DESIGNERS.md, LOCAL-PREVIEW-GUIDE.md, docs/tapaas/designer-package/README.md and the TaPaaS transaction rules under docs/tapaas before suggesting changes. Do not edit files yet. Report the package purpose, local preview steps and any caveats I should keep in mind.
```

## 3. Install dependencies

In Kiro's terminal, run:

```bash
npm install
```

If the install is slow or cache-related, try:

```bash
npm install --cache ./.npm-cache
```

## 4. Run the app locally

In the terminal, run:

```bash
npm run dev
```

Open the local URL printed in the terminal. It is usually:

[http://localhost:5173/](http://localhost:5173/)

If the terminal prints a different port, use that exact URL.

## 5. Run Storybook locally

In a separate terminal, run:

```bash
npm run storybook
```

Open the local Storybook URL printed in the terminal. It is usually:

[http://localhost:6006/](http://localhost:6006/)

If Storybook prints a different port, use that exact URL.

## 6. Stop a local server

Click into the terminal that is running the server and press:

```text
Control + C
```

Use this for both the app server and the Storybook server.

## Troubleshooting

| Problem | What to try | What to capture if it still fails |
|---|---|---|
| Port already in use | Use the alternate local URL printed by the terminal, or stop the old server with Control + C. | The full terminal message showing the port. |
| `npm install` fails | Run `npm install --cache ./.npm-cache`. If it still fails, do not delete random files. | The first error block and the last 30 lines of terminal output. |
| App opens as a blank page | Refresh the browser. Confirm the terminal still shows the dev server running. | Browser URL, visible error text and terminal output. |
| Storybook story is missing | Confirm Storybook finished loading. Search for the story ID from [06-storybook-review-guide.md](06-storybook-review-guide.md). | Storybook URL, missing story ID and any terminal error. |
| Tests fail | Do not patch blindly. Ask Kiro to explain which test failed and which file it relates to. | Command used, failed test name and the relevant error lines. |
| Kiro suggests publishing to GitHub | Stop. Designers can use local preview without GitHub publishing access. | The exact Kiro suggestion and why it was needed. |

## Local review checklist

Before sending feedback, confirm:

- the app or Storybook opened locally
- the transaction source mode is clear
- the TaPaaS rules were used
- no customer-facing page contains designer annotations or owner-confirmation notes
- caveats remain visible outside the customer journey
- no production, accessibility compliance, privacy/legal, GEL, TaPaaS, policy or governance approval claim appears
