# 🚀 Collaborative Code Editor

A real-time collaborative code editor built with the MERN stack that enables multiple users to code together simultaneously, communicate in real time, and execute code seamlessly inside shared rooms.

---

# ✨ Features

* 🔴 Real-time collaborative code editing
* 👥 Multi-user room collaboration
* 💬 Live group chat system
* 🖱️ Real-time cursor synchronization
* 📡 Socket.IO powered instant updates
* 📂 File management system with server-side file storage
* ▶️ Code execution support using Judge0 API
* 🔐 Authentication & authorization
* 👑 Room ownership & permission control
* ⚡ Monaco Editor integration
* 🌐 Responsive modern UI
* 🛠️ Global error handling
* 🔄 Persistent room/file state

---

# 🏗️ Tech Stack

## Frontend

* React.js
* Tailwind CSS
* Socket.IO Client
* Monaco Editor
* Axios
* React Router DOM
* React Hot Toast

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Socket.IO
* JWT Authentication
* bcrypt
* Redis
* Judge0 API
* Resend API

## Tools & Deployment

* Git & GitHub
* Postman
* VS Code


---

# ⚙️ Installation & Setup

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/khushpreet78141/multicollaborative-code-editor.git
cd mutiCollaborative-code-editor
```

---

## 2️⃣ Setup Backend

```bash
cd backend
npm install
```

### Create `.env` File

```env
PORT=3000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
RESEND_API_KEY=your_api_key
```

### Run Backend

```bash
nodemon server.js
```

---

## 3️⃣ Setup Frontend

```bash
cd frontend
npm install
```

### Run Frontend

```bash
npm run dev
```

---

# 🌐 Environment Variables

## Backend `.env`

| Variable   | Description               |
| ---------- | ------------------------- |
| PORT       | Backend server port       |
| MONGO_URI  | MongoDB connection string |
| JWT_SECRET | JWT authentication secret |
| RESEND_API_KEY | for emails    |

---

# 📁 Folder Structure

```bash
multicollaborative-code-editor/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── sockets/
│   ├── utils/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── App.jsx
│
└── README.md
```

---

# ☁️ External Services & Infrastructure

## Judge0 API

Used for secure remote code execution and output generation.

## Resend API

Integrated for sending emails and authentication-related communication.

## Redis

Implemented for caching and efficient real-time socket/session handling.

## Server-Side File Storage

Project files are stored and managed on the backend server for persistent collaborative access.

---

# 🔄 Real-Time Features

## Live Code Synchronization

Any code change made by one user is instantly reflected for all users connected inside the same room.

## Cursor Tracking

Users can see the live cursor positions of collaborators while editing.

## Group Chat

Integrated room-based chat system for communication during collaboration.

## File Synchronization

Files created, updated, or deleted are synchronized in real time.

---

# 🔐 Authentication & Security

* JWT-based authentication
* Protected routes
* Password hashing using bcrypt
* Owner authorization middleware
* Centralized error handling

---

# 🧠 Challenges Solved

* Real-time socket synchronization
* Redis integration for scalable real-time communication
* Cursor movement broadcasting
* Managing collaborative state
* Handling race conditions
* File synchronization between users
* Efficient editor updates without unnecessary rerenders
* Authentication flow management

---

# 🚀 Future Improvements

* 🟢 Video/audio calling
* 🟢 Collaborative whiteboard
* 🟢 Multiple language execution
* 🟢 Docker-based sandbox execution
* 🟢 AI code assistant integration
* 🟢 Version history
* 🟢 Live terminal collaboration
* 🟢 Theme customization

---

# 💻 Learning Outcomes

Through this project, I gained hands-on experience with:

* Full-stack MERN development
* WebSocket communication using Socket.IO
* Real-time architecture design
* Authentication & authorization systems
* State management
* Backend API development
* MongoDB schema design
* Collaborative application workflows
* API integration with Judge0 and Resend
* Redis caching and real-time infrastructure management
* Monaco Editor integration

---

# 🤝 Contributing

Contributions, issues, and feature requests are welcome.

Feel free to fork this repository and submit a pull request.

---


# 👩‍💻 Author

## Khushpreet Kaur

BTech CSE Student | MERN Stack Developer

* GitHub: https://github.com/khushpreet78141
* LinkedIn: https://www.linkedin.com/in/khushpreet-kaur-4413b5361/

---

# ⭐ Support

If you liked this project, consider giving it a ⭐ on GitHub.
