# Inventra - AI-Driven Inventory Optimization & Forecasting

Inventra is a small web application and experimental toolkit for retail inventory forecasting and optimization. It combines a TypeScript + React (Vite) frontend with data science artifacts (Jupyter notebook and CSV dataset) to explore, train, and visualize demand forecasts for store inventory.

This repository contains the frontend UI for generating forecasts, a sample dataset, and an exploratory notebook demonstrating the data analysis and model experiments.

## Key features
- Interactive forecast UI built with Vite + React + TypeScript.
- Modular UI components for selecting items, entering parameters, and viewing prediction results.
- Example dataset: `model/retail_store_inventory.csv` for prototyping and EDA.
- Jupyter notebook with exploratory data analysis and model experiments: `model/nventory_forecasting_eda_prediction.ipynb`.

## Quick preview
- Open the app locally and use the Forecast form to enter parameters and get predicted demand.

## Prerequisites
- Node.js (v16+) or Bun (if you prefer). This project uses Vite and common front-end toolchains.
- Git (to clone the repo)

> Note: There is a `bun.lockb` in the repo — Bun is supported but using npm/yarn/pnpm is fine.

## Install (recommended: PowerShell on Windows)

Using npm:

```powershell
# install dependencies
npm install

# start dev server
npm run dev
```

Using Bun (if installed):

```powershell
# install dependencies with bun
bun install

# run dev server (if script exists)
bun run dev
```

The dev server is a Vite app and typically runs at http://localhost:5173/ — open that URL in your browser.

## Available scripts
- `dev` / `start` — start Vite dev server
- `build` — build production bundle
- `preview` — preview the production build locally
- See `package.json` for the exact scripts included in this repo.

## Project structure (high level)

- `src/` — application source
	- `App.tsx`, `main.tsx` — app entry
	- `components/` — React components and UI primitives
		- `ForecastForm.tsx`, `PredictionResult.tsx`, `StepByStepForm.tsx`, `ImageSelector.tsx` — main app components
		- `ui/` — shared design/system components (buttons, inputs, toasts, charts, etc.)
	- `hooks/` — custom React hooks
	- `lib/` — small utilities (e.g., `utils.ts`)
	- `pages/` — page components (Landing, Model, NotFound)

- `model/` — data science artifacts
	- `nventory_forecasting_eda_prediction.ipynb` — Jupyter notebook for EDA and modeling experiments
	- `retail_store_inventory.csv` — example dataset for testing and prototyping

- `public/` — static assets
- `index.html`, `vite.config.ts`, `tsconfig.json` — project tooling

## Data & model notes
- The included dataset (`model/retail_store_inventory.csv`) is intended for demonstration and local experimentation only. It may contain sample retail inventory and sales history used by the notebook.
- The Jupyter notebook shows exploratory analysis, feature engineering ideas, and proof-of-concept forecasting models. It is not production-grade model training code. Use it as a starting point for building and validating models.

Quick pointers to extend the model:
- Load `model/retail_store_inventory.csv` in the notebook, run the cells to reproduce EDA, then experiment with different forecasting models (ARIMA, Prophet, XGBoost, LSTM, or transformer-based models).
- Save model artifacts and wrap them in an API (Flask/FastAPI) if you want to serve predictions to this frontend.

## How to use the app (developer workflow)
1. Install dependencies and run the dev server.
2. Open http://localhost:5173/ in your browser.
3. Use the Forecast UI to select items / date ranges and request predictions.
4. If you add a model API, update the frontend to call your API endpoint and display results in `PredictionResult.tsx`.

## Contributing
- Issues and PRs are welcome. Small incremental changes are easiest to review:
	- Improve UI polish or accessibility
	- Add types and unit tests for critical components
	- Add a small backend service to host model inference

When opening a PR, include a clear description of the change, the motivation, and a screenshot (if UI related).

## Tests & quality gates
- This repo currently focuses on UI and EDA artifacts. If you add tests, prefer React Testing Library / Vitest for components and include a minimal CI job to run lint and tests.

## Deployment
- Build the static bundle with `npm run build` and serve the `dist` folder using any static host (Netlify, Vercel, GitHub Pages, Azure Static Web Apps, etc.).
- If you add a model API, deploy it as a separate service (serverless function, Docker container, or managed web app) and point the frontend at the production inference endpoint.

- Add or change the license as needed. If this is for a personal or company project, include an appropriate `LICENSE` file in the repo.
---


