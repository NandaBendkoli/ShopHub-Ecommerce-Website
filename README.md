# 🛒 ShopHub - Ecommerce Website

ShopHub is a modern full-stack eCommerce platform built using the MERN Stack. It provides users with a seamless online shopping experience, including product browsing, cart management, secure authentication, order management, and an intuitive admin dashboard.

## 🚀 Live Demo

🔗 Live Website: https://your-live-link.com

## 📂 GitHub Repository

🔗 Repository: https://github.com/NandaBendkoli/ShopHub-Ecommerce-Website

---

## ✨ Features

### 👤 User Features

- User Registration & Login
- JWT Authentication
- Browse Products
- Product Search & Filtering
- Product Details Page
- Add to Cart
- Update Cart Quantity
- Wishlist Functionality
- Checkout Process
- Order Placement
- Order History
- User Profile Management

### 🛠️ Admin Features

- Admin Dashboard
- Product Management (CRUD)
- Category Management
- Order Management
- User Management
- Sales Overview

---

## 🏗️ Tech Stack

### Frontend

- React.js
- React Router
- Redux Toolkit / Context API
- Axios
- Tailwind CSS / Bootstrap

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose

### Authentication

- JWT (JSON Web Token)
- bcrypt.js

### Other Tools

- Cloudinary (Image Upload)
- Multer
- dotenv
- Nodemon

---

## 📸 Screenshots

### Home Page

![Home Page](./screenshots/home.png)

### Product Page

![Product Page](./screenshots/product.png)

### Cart Page

![Cart Page](./screenshots/cart.png)

### Admin Dashboard

![Admin Dashboard](./screenshots/admin-dashboard.png)

---

## 📁 Project Structure

```bash
ShopHub-Ecommerce-Website/
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── redux/
│   └── services/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── models/
│   ├── config/
│   └── utils/
│
├── screenshots/
├── .env
├── package.json
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/NandaBendkoli/ShopHub-Ecommerce-Website.git
```

### Navigate to Project

```bash
cd ShopHub-Ecommerce-Website
```

### Install Backend Dependencies

```bash
cd backend
npm install
```

### Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file inside the backend folder and add:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

---

## ▶️ Run Project

### Backend

```bash
cd backend
npm run dev
```

### Frontend

```bash
cd frontend
npm start
```

---

## 📦 API Endpoints

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/profile
```

### Products

```http
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

### Orders

```http
POST /api/orders
GET  /api/orders/my-orders
```

### Users

```http
GET /api/users
PUT /api/users/:id
```

---

## 🎯 Future Improvements

- Payment Gateway Integration (Stripe/Razorpay)
- Product Reviews & Ratings
- Coupon System
- Multi-Vendor Support
- Real-Time Notifications
- Advanced Analytics Dashboard

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature-name
```

3. Commit changes

```bash
git commit -m "Added new feature"
```

4. Push to branch

```bash
git push origin feature-name
```

5. Create a Pull Request

---

## 👨‍💻 Author

**Nanda Bendkoli**

- GitHub: https://github.com/NandaBendkoli
- LinkedIn: Add Your LinkedIn Profile

---

## ⭐ Support

If you found this project helpful, please give it a ⭐ on GitHub.

---

## 📄 License

This project is licensed under the MIT License.
