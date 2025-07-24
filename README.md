# 💼 Investment Tracker

**Investment Tracker** is a web application built with **Angular 18**, **Tailwind CSS**, and integrated with **AWS services** like Lambda, API Gateway, and S3. Its main goal is to provide a modern, responsive, and reliable interface to track investment portfolios — including real-time visualizations and performance dashboards.

---

## 🚀 Tech Stack

- **Angular 18** (using Standalone Components)
- **Tailwind CSS** for styling
- **Chart.js** for data visualization
- **AWS Lambda (Python)** for backend logic
- **AWS API Gateway** for RESTful endpoints
- **AWS S3** for static web hosting
- **GitHub Actions** for automated CI/CD

---

## 📦 Core Features

### 🔐 Login

- Responsive login screen with form validation
- Simulated authentication and navigation to the dashboard

### 📊 Dashboard

- Displays key investment metrics:
  - Total Invested
  - Current Value
  - Total and Monthly Returns
- `Doughnut` chart showing portfolio allocation
- Detailed investment table
- Refresh button simulating live data updates

### 📈 AWS Integration (Lambda + API Gateway)

- `GET /portfolio-summary`: fetches portfolio summary
- `GET /investments`: retrieves investment list
- `GET /asset-allocation`: returns portfolio allocation by asset type

Endpoints are backed by **AWS Lambda Functions** (written in Python) and exposed via **API Gateway**. These are consumed by Angular through `HttpClient` in `InvestmentService`.

### ⚙️ GitHub Actions CI/CD

Every commit pushed to the `main` branch:

1. Triggers a production build
2. Syncs the generated files to an AWS S3 bucket
3. Automatically updates the live application

Workflow is defined in [`deploy.yml`](./.github/workflows/deploy.yml).

---

## 🧱 Project Architecture

### 🗂 Folder Structure

- `core/models/`: investment and summary interfaces
- `core/services/`: API service layer
- `shared/components/`: reusable components (Header, Chart)
- `pages/login/`: login screen
- `pages/dashboard/`: main portfolio dashboard

### 🧩 Standalone Components (Angular 18)

The application is fully structured with Angular Standalone Components, featuring:

- `bootstrapApplication` entry point
- Routing with `provideRouter`
- API communication via `provideHttpClient`
- Modular and clean imports without NgModules

---

## 📊 Visual Highlights

- Dynamic `doughnut` chart using Chart.js
- Responsive and styled investment table
- Skeleton loading and animation via Tailwind classes

---

## 📁 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/your-username/investment-tracker.git
cd investment-tracker

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
```

---

## 🌐 AWS S3 Deployment (CI/CD)

CI/CD is handled through a GitHub Actions workflow:

- Checks out repository
- Installs dependencies
- Builds Angular app
- Deploys to AWS S3 using `aws s3 sync`

No manual steps needed after pushing to `main`.

---

## 📝 Notes

- Backend data is mocked through AWS Lambda using Python
- This project demonstrates best practices in frontend architecture and AWS integration
- Custom color palette and typography give the app a financial & professional identity

---

## 👨‍💻 Author

**Ricardo Rocker**  
Senior Angular Developer  
[ricardo.santos.rocker@gmail.com](mailto:ricardo.santos.rocker@gmail.com)
https://www.linkedin.com/in/ricardo-s-rocker/
