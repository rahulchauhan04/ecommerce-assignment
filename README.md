# E-commerce Platform

Welcome to the E-commerce Platform project! This project is a full-stack application designed to provide a seamless shopping experience. It includes a frontend built with React and Vite, and a backend powered by Express.js. This documentation will guide you through the setup, development, and deployment processes.

---

## Table of Contents

1. [Project Structure](#project-structure)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Running the Application](#running-the-application)
5. [Environment Variables](#environment-variables)
6. [Backend](#backend)
   - [Routes](#routes)
   - [Controllers](#controllers)
   - [Services](#services)
   - [Testing](#testing)
7. [Frontend](#frontend)
   - [Pages](#pages)
   - [Components](#components)
   - [Services](#services-1)
   - [Styling](#styling)
8. [Testing](#testing-1)
9. [Deployment](#deployment)
10. [Contributing](#contributing)
11. [License](#license)

---

## Project Structure

```plaintext
ecommerce-assignment/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── tests/
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
└── README.md
```

---

## Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x) or yarn (>= 1.x)
- Git

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/rahulchauhan04/ecommerce-assignment.git
   cd ecommerce-assignment
   ```

2. Install dependencies for both backend and frontend:

   **Backend:**
   ```bash
   cd backend
   npm install
   ```

   **Frontend:**
   ```bash
   cd ../frontend
   npm install
   ```

---

## Running the Application

1. Start the backend server:

   ```bash
   cd backend
   npm start
   ```

2. Start the frontend development server:

   ```bash
   cd ../frontend
   npm run dev
   ```

3. Open your browser and navigate to [http://localhost:5173](http://localhost:5173).

---

## Environment Variables

Create a `.env` file in both the backend and frontend directories with the following content:

**Backend:**
```env
PORT=5001
```

**Frontend:**
```env
VITE_BASE_URL=http://localhost:5001
```

---

## Backend

The backend is built with Express.js and provides RESTful APIs for cart management, checkout, and admin functionalities.

### Routes

- `/cart`: Handles cart operations.
- `/checkout`: Manages the checkout process.
- `/admin`: Provides admin functionalities like generating discount codes and fetching statistics.

### Controllers

- **`cartController.js`**: Manages cart-related operations.
- **`checkoutController.js`**: Handles the checkout process.
- **`adminController.js`**: Provides admin functionalities.

### Services

- **`discountService.js`**: Manages discount code generation and validation.

### Testing

Tests are written using Jest and Supertest. To run the tests:

```bash
cd backend
npm test
```

---

## Frontend

The frontend is built with React and Vite, and styled using Tailwind CSS.

### Pages

- **`HomePage.jsx`**: Displays the list of products.
- **`CartPage.jsx`**: Shows the items in the cart.
- **`CheckoutPage.jsx`**: Manages the checkout process.
- **`AdminPage.jsx`**: Provides admin functionalities.

### Components

- **`ProductCard.jsx`**: Displays individual product details.
- **`CartItem.jsx`**: Shows individual cart item details.

### Services

- **`cartAPI.js`**: Manages cart-related API calls.
- **`checkoutAPI.js`**: Handles checkout-related API calls.
- **`adminAPI.js`**: Provides admin-related API calls.

### Styling

Tailwind CSS is used for styling. Configuration files include `tailwind.config.js` and `postcss.config.js`.

---

## Testing

Frontend tests are written using Jest. To run the tests:

```bash
cd frontend
npm test
```

---


## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

