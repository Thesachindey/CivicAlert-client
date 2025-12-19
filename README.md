# 🏙️ CivicAlert - Public Infrastructure Issue Reporting System

**CivicAlert** is a full-stack digital platform designed to bridge the gap between citizens and municipal authorities. It enables users to report real-world public infrastructure issues (like broken streetlights, potholes, and garbage overflow) and track their resolution in real-time.

## 🔗 Live Links

| Type | Link |
| --- | --- |
| **🚀 Live Site** | [CivicAlert](https://civicalert-ts.netlify.app/) |
| **💻 Client Repo** | [GitHub: civicalert-client](https://github.com/Thesachindey/civicalert-client) |
| **🖥️ Server Repo** | [GitHub: CivicAlert-server](https://github.com/Thesachindey/CivicAlert-server) |

---

## 🚀 Key Features

### 🌍 General & UI/UX

* **Interactive Dashboard:** Role-based dashboards for Citizens, Staff, and Admins.
* **Responsive Design:** Fully optimized for Mobile, Tablet, and Desktop using **Tailwind CSS v4** & **DaisyUI v5**.
* **Animations:** Smooth transitions using **Framer Motion**, Lottie files, and Confetti effects for success states.
* **Real-time Feedback:** Toast notifications and SweetAlert2 for user actions.

### 👤 Citizen Role

* **Report Issues:** Submit issues with title, description, category, and image.
* **Upvote System:** Upvote important community issues to increase priority.
* **Timeline Tracking:** View the lifecycle of an issue (Pending → In Progress → Resolved).
* **Subscription Model:** **Stripe** integration for Premium membership (Verified Badge & Unlimited Reporting).
* **Search & Filter:** Find issues by category, status, or keyword.

### 👷 Staff Role

* **Task Management:** View issues specifically assigned to the staff member.
* **Status Updates:** Change issue status (e.g., "In Progress" to "Resolved").
* **Workload Stats:** Visual charts showing resolved vs. pending tasks.

### 🛡️ Admin Role

* **Platform Overview:** Comprehensive statistics using **Recharts**.
* **User Management:** Block/Unblock users and manage roles.
* **Staff Management:** Create and manage staff accounts.
* **Issue Assignment:** Assign reported issues to specific staff members.
* **Payment History:** Track all subscription and boosting transactions.

---

## 🛠️ Tech Stack

### Frontend

* **Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
* **Language:** JavaScript (ES6+)
* **Styling:** [Tailwind CSS 4](https://tailwindcss.com/) + [DaisyUI 5](https://daisyui.com/)
* **Routing:** React Router v7

### State Management & Data Fetching

* **TanStack Query (React Query):** For efficient server-state management, caching, and auto-refetching.
* **Axios:** For HTTP requests.

### Form Handling & Authentication

* **React Hook Form:** For efficient form validation.
* **Firebase Auth:** Secure login (Email/Password & Google Social Login).

### Features & Integrations

* **Stripe:** Secure payment gateway integration.
* **Recharts:** For data visualization in dashboards.
* **Swiper / React Responsive Carousel:** For banner and testimonial sliders.

---

## 📦 Dependencies

The project utilizes the following key libraries:

| Library | Usage |
| --- | --- |
| `@tanstack/react-query` | Data fetching and caching |
| `firebase` | Authentication and backend services |
| `react-router` | Navigation and routing |
| `react-hook-form` | Form handling |
| `@stripe/react-stripe-js` | Payment processing |
| `framer-motion` | Complex animations |
| `recharts` | Charts and graphs |
| `sweetalert2` | Beautiful popup alerts |
| `react-hot-toast` | Toast notifications |
| `lottie-player` | JSON-based animations |

---

## 🔑 Access Credentials

Use these credentials to test the different roles in the application:

| Role | Email | Password |
| --- | --- | --- |
| **Admin** | `admin@gmail.com` | `CivicAlert@2` |
| **Staff** | `staff1@gmail.com` | `CivicAlert@2` |
| **Citizen** | `user2@gmail.com` | `CivicAlert@2` |

---

## 💻 Local Installation Guide

Follow these steps to run the project locally:

1. **Clone the repository:**
```bash
git clone https://github.com/Thesachindey/civicalert-client.git
cd civicalert-client

```


2. **Install dependencies:**
```bash
npm install

```


3. **Set up Environment Variables:**
Create a `.env.local` file in the root directory and add your keys:
```env
VITE_APIKEY=your_firebase_api_key
VITE_AUTHDOMAIN=your_firebase_auth_domain
VITE_PROJECTID=your_firebase_project_id
VITE_STORAGEBUCKET=your_firebase_storage_bucket
VITE_MESSAGINGSENDERID=your_firebase_messaging_sender_id
VITE_APPID=your_firebase_app_id
VITE_PAYMENT_GATEWAY_PK=your_stripe_publishable_key
VITE_API_URL=http://localhost:3000

```


4. **Run the development server:**
```bash
npm run dev

```


5. Open [http://localhost:5173](https://www.google.com/search?q=http://localhost:5173) in your browser.

---

## 📜 License

This project is open-source and available under the [MIT License](https://www.google.com/search?q=LICENSE).

