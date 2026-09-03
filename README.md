# NestGuard Pest Control Services

NestGuard is an enterprise-grade, full-stack service management platform. Built as a comprehensive software engineering portfolio project, this application demonstrates modern web architecture, secure authentication, and complex relational database management. 

Instead of a standard e-commerce template, this platform engineers a real-world **Two-Way Quotation & Booking System**, backed by strict PostgreSQL security policies and seamless server-side rendering.

## Key Features

* **Dynamic Booking & Quotation Pipeline:** Replaces standard checkout flows with a lead-generation "$0 Free Estimate" architecture, allowing admins to process, price, and approve dynamic service quotes.
* **Server-Rendered Admin Dashboard:** A protected administrative portal featuring real-time KPI aggregations (Completion Rate, Average Order Value, Revenue Growth) calculated securely on the server.
* **Interactive Business Analytics:** Utilizes custom client-side SVG charting (Recharts) to visualize time-series revenue trends and demographic distributions.
* **Complex Relational Database:** Engineered using PostgreSQL, featuring robust table joins across `orders`, `profiles`, and `services` to maintain high data integrity.
* **Issue Reporting & Feedback:** Integrated user feedback and issue reporting pipeline, allowing authenticated users to log service issues directly to the administrative database.
* **Enterprise-Grade Security:** Enforces strict Row-Level Security (RLS) in Supabase and Role-Based Access Control (RBAC) via JWTs. All database mutations are handled via Next.js Server Actions, eliminating vulnerable client-side API fetching.

## Tech Stack & Architecture

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | Next.js 15 (App Router), React, Tailwind CSS | Modular UI, Server Components, Custom 5-color enterprise design system. |
| **Backend** | Next.js Server Actions, TypeScript | API-less architecture for secure data mutations and strict type-safety on database joins. |
| **Database & Auth** | Supabase, PostgreSQL | Relational data modeling, encrypted session management, and Row-Level Security. |
| **Data Visualization** | Recharts, Lucide React | Interactive client-side charting and lightweight SVG iconography. |
| **Deployment** | Vercel | Edge network hosting and continuous CI/CD pipeline integration. |

## Platform Previews

| Customer Booking Flow | Admin Analytics Dashboard |
| :---: | :---: |
| ![Booking Flow Placeholder](assets/images/BookingFlow.png) | ![Admin Dashboard Placeholder](assets/images/AdminDashboard.png) |

## Getting Started

To get a local copy up and running for development or evaluation, follow these steps.

### Prerequisites
* Node.js (v18.17 or higher)
* npm, yarn, or pnpm
* A Supabase Account

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/reiidj/nestguard-pest.git](https://github.com/reiidj/nestguard-pest.git)
   cd nestguard-pest
