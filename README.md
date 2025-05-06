# 🧠 Knowva Backend

The backend API for **Knowva**, a collaborative study app that allows users to join group chats, play quizzes, and track scores with friends in real-time.

Built using **Node.js**, **Express**, and **PostgreSQL**, this backend powers features like authentication, quiz data handling, score tracking, and user interactions.

---

## 🚀 Features

- 🧩 RESTful API for users, quizzes, scores, and study groups
- 💬 Real-time group chat powered by **Socket.io**
- 🧪 Tested with **Jest** and **Supertest**
- 🛡️ Secure routing and error handling
- 🌐 PostgreSQL database integration with seed & setup scripts

---

## 🛠️ Tech Stack

- Node.js
- Express
- PostgreSQL
- Socket.io
- Jest + Supertest

---

## 📂 Project Structure

/db -> Database setup, seed files, connection
/controllers -> Route logic (e.g., users, quizzes, scores)
/models -> SQL queries
/routes -> Express routers
/tests -> Backend tests
/app.js -> Main server app

---

## ⚙️ Setup

### 1. Clone the repo

```bash
git clone https://github.com/NC-Knowva/BE.git
cd BE
```
### 2. Install dependencies
```
npm install
```

### 3. Create and seed database
```
psql < db/setup.sql
psql < db/seed.sql
```
### 4. Start the server
```
npm run dev
```
### 5. Testing
```
npm test
```
- Uses Jest for unit testing

- Uses Supertest for integration testing

## 🔧 Future Improvements

- Add authentication with JWT

- Expand quiz types (e.g. flashcards)

- More robust error handling and validation



