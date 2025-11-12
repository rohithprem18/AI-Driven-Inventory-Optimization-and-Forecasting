# 🤖 Inventra - AI-Driven Inventory Optimization & Forecasting

![React](https://img.shields.io/badge/Framework-React%20%2B%20TypeScript-blue?style=flat-square)
![Build](https://img.shields.io/badge/Build-Vite-green?style=flat-square)
![ML](https://img.shields.io/badge/ML-Jupyter%20Notebook-orange?style=flat-square)

> **Inventra** is an intelligent toolkit that blends a modern web frontend with AI-powered forecasting models — helping retailers visualize demand, forecast sales, and optimize inventory like never before. 🧠📈

---

## 🌟 Overview

**Inventra** combines **React + TypeScript (Vite)** for the frontend and a **Python/Jupyter** backend for exploratory data analysis and demand forecasting.

This repository includes:
- 🖥️ Frontend UI for forecast generation  
- 📊 Jupyter notebook with EDA and model experiments  
- 📁 Sample dataset for quick prototyping  

---

## 🚀 Key Features

- ⚡ Interactive forecasting UI built with **Vite + React + TypeScript**
- 📈 Explore demand trends and predictions visually
- 🧩 Modular React components (`ForecastForm`, `PredictionResult`, etc.)
- 🧮 Jupyter Notebook with **EDA + baseline model experiments**
- 🧠 Ready for extension with **Prophet / ARIMA / XGBoost / LSTM**

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React, TypeScript, Vite |
| **Styling** | TailwindCSS / ShadCN UI |
| **Modeling** | Python, Jupyter Notebook |
| **Data** | CSV dataset (`retail_store_inventory.csv`) |
| **Build Tools** | npm / Bun / Vite |
| **Version Control** | Git + GitHub |

---

## ⚡ Quick Preview

### Run Locally

```bash
# Clone the repository
git clone https://github.com/rohithprem18/AI-Driven-Inventory-Optimization-and-Forecasting.git
cd AI-Driven-Inventory-Optimization-and-Forecasting

# Install dependencies
npm install

# Start the development server
npm run dev
````

Then open **[http://localhost:5173](http://localhost:5173)** in your browser 🚀

---

## 🗂️ Project Structure

```
AI-Driven-Inventory-Optimization-and-Forecasting/
│
├── src/
│   ├── components/       # UI and visualization
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utilities and helpers
│   └── pages/            # App pages
│
├── model/
│   ├── retail_store_inventory.csv
│   └── nventory_forecasting_eda_prediction.ipynb
│
├── public/               # Static assets
└── vite.config.ts        # Vite configuration
```

---

## 📊 Data & Model Experiments

* Dataset: `model/retail_store_inventory.csv`
* Notebook: `model/nventory_forecasting_eda_prediction.ipynb`

Inside the notebook:

* Exploratory Data Analysis (EDA)
* Feature engineering
* Model training (ARIMA / Prophet / XGBoost / LSTM)
* Forecast visualization and evaluation

> Extend it by deploying a Flask/FastAPI endpoint and connecting it with the React frontend for live inference.

---

## 🧑‍💻 Developer Workflow

1. Install dependencies
2. Run the dev server
3. Open the app in browser
4. Use the Forecast form to view predicted demand

Optional: Connect backend API in `PredictionResult.tsx` for real-time model results.

---

## 🧩 Available Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start Vite dev server                |
| `npm run build`   | Build production bundle              |
| `npm run preview` | Preview the production build locally |

---

## 🤝 Contributing

Contributions are welcome! 💡
If you’d like to:

* Improve UI/UX or accessibility
* Add a backend inference API
* Extend EDA or ML notebooks
* Write tests using **Vitest / React Testing Library**

Just fork, branch, and open a pull request!

> Small, focused PRs make reviews faster and cleaner 🧹

---


