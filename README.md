
# 🚗 MERN Car Rental App

A full-stack car rental platform built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows users to register, browse and book cars, while providing an admin dashboard to manage cars and bookings.

---

## 🌐 Live Demo

- [https://mern-car-rental-frontend-alpha.vercel.app](https://mern-car-rental-frontend-alpha.vercel.app)


---

## 🛠️ Tech Stack

### 📦 Frontend
- **React.js** – Component-based UI
- **React Router DOM** – Page navigation
- **Axios** – API requests
- **Tailwind CSS** – Utility-first styling
- **Framer Motion** – Animations and transitions
- **Context API** – Global state management

### 🖥️ Backend
- **Node.js** – Backend runtime
- **Express.js** – API framework
- **MongoDB + Mongoose** – NoSQL database with schema modeling
- **JWT (jsonwebtoken)** – Secure authentication
- **bcryptjs** – Password encryption
- **dotenv** – Environment variable configuration
- **CORS** – Cross-origin resource sharing

### ☁️ Other Tools
- **ImageKit.io** – Image upload, storage, and CDN optimization
- **MongoDB Atlas** – Cloud database hosting
- **Vercel** – Frontend and backend deployment

---

## ✨ Features

### 👤 User
- Register & login with JWT authentication
- Browse available cars with images
- Book cars with pickup and return dates
- View personal booking history

### 🛠️ Admin
- Secure admin dashboard with role-based access
- View and manage all car listings
- View and manage all user bookings
- Delete or update car information

---

## 🗂️ Project Structure

```
mern-car-rental-app/
├── frontend/          # React frontend
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── context/
│       └── App.js
├── backend/         # Express backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── configs/
│   └── server.js
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/SagarNegi10/mern-car-rental-app.git
cd mern-car-rental-app
```

### 2️⃣ Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id
```

Run the server:
```bash
npm run server
```

### 3️⃣ Setup Frontend
```bash
cd ../frontend
npm install
npm run dev
```

---

## 👨‍💻 Author

**Sagar Negi**  
GitHub: [@SagarNegi10](https://github.com/SagarNegi10)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
