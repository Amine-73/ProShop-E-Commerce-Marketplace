# ProShop-E-Commerce-Marketplace
<img width="1901" height="687" alt="image" src="https://github.com/user-attachments/assets/3167f587-47b8-47ba-b736-caee976d4edf" />

A full-stack marketplace built with the MERN (MongoDB, Express, React, Node.js) stack. This project focuses on complex state management, secure payment flows, and scalable architecture.

## 🚀 Key Features
- **Product Catalog:** Advanced search, filtering by category, and product ratings.
- **Persistent Shopping Cart:** Items remain in the cart even after page refresh (Redux + LocalStorage).
- **Secure Checkout:** Full integration with the **Stripe API** for credit card processing.
- **Admin Dashboard:** Specialized routes to manage users, edit products, and track order status.
- **Authentication:** Secure JWT (JSON Web Tokens) with custom middleware for User and Admin roles.

## 🛠️ Tech Stack
- **Frontend:** React, Redux Toolkit, Material UI.
- **Backend:** Node.js, Express.
- **Database:** MongoDB via Mongoose.
- **Payments:** Stripe API.
- **Image Hosting:** Cloudinary / Firebase Storage.

## 📅 Development Roadmap (1hr/day Progress)
- [x] Repository setup and README documentation.
- [x] Backend server initialization & MongoDB connection.
- [x] Product Schema & API Endpoints.
- [x] Frontend Catalog UI & Redux store setup.
- [x] Shopping Cart logic & LocalStorage sync.
- [x] Stripe Payment integration.
- [ ] Admin Dashboard and Role-based access.


## Jan 4, 2026 - Progress
- **Hero Section**: Implemented a responsive Hero component with a background image, dark overlay for text readability, and call-to-action buttons.
- **Product Grid**: Created the initial `SectionProducts` component using MUI `Grid` and `Card`.
- **Data Mocking**: Set up `products.js` with dummy data to test the UI layout.
- **Navbar Refinement**: Improved accessibility and styling of the Header icons and search bar.

## 🚀 Recent Updates (Jan 7, 2026)
Successfully transitioned the project from a static landing page to a functional multi-page e-commerce application.

### Key Features Implemented:
* **Dynamic Routing:** Implemented Next.js App Router logic (`/product/[id]`) to handle individual product views.
* **Professional Product UI:** Designed a high-end "Amazon-style" product detail page with:
    * Image-first responsive layout (Optimized for Desktop/Mobile).
    * Dynamic pricing display (Split dollar/cents formatting).
    * Quantity Selector logic based on real-time stock availability.
* **State Integration:** Added React `useState` hooks to manage local product quantity before adding to cart.
* **Data Expansion:** Expanded the product catalog to 6 high-quality tech items with optimized image paths.
* **SSR Optimization:** Implemented custom mounting logic to handle Hydration Mismatches, ensuring a seamless transition between Server-Side Rendering (SSR) and Client-Side interactivity.

## 🚀 Features Added Today (Jan 9, 2026)
- **Shopping Cart & Checkout**: Fully functional front-end logic for managing cart items and a 3-step checkout process.
- **Product Search**: Real-time filtering of products via a dedicated search bar and dynamic results page.
- **Image Optimization**: Integrated Next.js `<Image />` component with `object-fit: cover` for faster loading and better UI.
- **Responsive Auth UI**: Amazon-style Login and Registration forms built with Material UI v6.
- **State Management**: Redux Toolkit for global cart state and RTK Query for efficient, cached data fetching from the backend.

🚀 Refactor & Bug Fixes (Jan 21, 2026)
-**API Integration**: Successfully linked the frontend to the backend using RTK Query, replacing static mock data with real database fetches.
-**Architecture Fix**: Reorganized ReduxProvider and ThemeProvider hierarchy to resolve context access issues across the App Router.
-**Cart Logic**: Refactored cart quantity management and price calculations into a dedicated Redux Slice with localStorage persistence.
-**Hydration Fix**: Solved React hydration errors in the navigation bar using the useEffect mounting pattern.

## 🛠️ Tech Stack Updates
- **Framework**: Next.js 15 (App Router)
- **UI Library**: Material UI (MUI) v6
- **Icons**: Lucide React / MUI Icons

## ⚙️ Getting Started
1. **Clone the repo:** `git clone ...`
2. **Setup Backend:** - `cd backend && npm install`
   - Create `.env` and add `MONGO_URI`
   - `npm run dev`
3. **Setup Frontend:**
   - `cd client && npm install`
   - `npm run dev`
