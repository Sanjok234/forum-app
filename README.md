# Forum App

A fullstack forum application built with Express (Node.js) for the backend and React (with Tailwind CSS) for the frontend. Users can register, log in, create forums, comment, upvote, and manage their profiles.

---

## Features
- User authentication (register, login, logout)
- Create, edit, and delete forum posts
- Comment and reply on forums
- Upvote forums and comments
- User profile pages
- Protected routes and error handling
- Responsive UI with Tailwind CSS

---

## Project Structure
```
forum-app/
  backend/    # Express API
  frontend/   # React client
```

---

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### 1. Clone the Repository
```sh
git clone https://github.com/yourusername/forum-app.git
cd forum-app
```

### 2. Setup Backend
```sh
cd backend
npm install
# Create a .env file (see .env.example or instructions in code)
npm start
```

### 3. Setup Frontend
```sh
cd ../frontend
npm install
npm start
```

- The backend runs on [http://localhost:5000](http://localhost:5000)
- The frontend runs on [http://localhost:3000](http://localhost:3000)

---

## Environment Variables
Create a `.env` file in `backend/` with:
```
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
JWT_SECRET=your_jwt_secret
PORT=5000
```

---

## Scripts
- `npm start` — Start the server/client
- `npm run dev` — (if available) Start in development mode

---

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## License
[MIT](LICENSE) 