# FAQ Management System

This project is a full-stack FAQ management system built using Node.js, React, Tailwind CSS, TypeScript, Express, Prisma, and PostgreSQL. The system allows users to create, manage, and retrieve FAQs with multi-language support, caching, and an admin panel.

## **Project Structure**

- 📂 `faq-backend/` - Contains the backend code (Node.js, Express, Prisma, PostgreSQL)
- 📂 `faq-frontend/` - Contains the frontend code (React, Tailwind CSS, TypeScript)

---

## **Installation Steps**

### **Backend Setup**

1. 🛠️ Clone the repository:

   ```bash
   git clone https://github.com/waliaharsh74/Multilangual-Faq
   cd faq-backend
   ```

2. 📦 Install dependencies:

   ```bash
   npm install
   ```

3. ⚙️ Set up the `.env` file with the following variables:

   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/faqdb
   PORT=5000
   CACHE_REDIS_URL=redis://localhost:6379
   GOOGLE_TRANSLATE_API_KEY=your_api_key
   ```

4. 🔄 Run database migrations:

   ```bash
   npx prisma migrate dev
   ```

5. 🚀 Start the backend server:

   ```bash
   npm run dev
   ```

### **Frontend Setup**

1. 📂 Navigate to the frontend folder:

   ```bash
   cd ../faq-frontend
   ```

2. 📦 Install dependencies:

   ```bash
   npm install
   ```

3. ⚙️ Set up the `.env` file with the backend API URL:

   ```env
   REACT_APP_API_URL=http://localhost:5000/api/v1
   ```

4. 🚀 Start the frontend server:

   ```bash
   npm start
   ```

---

## **API Usage Examples**

### **1. 🌍 Fetch Available Languages**

```bash
curl http://localhost:5000/api/languages
```

### **2. 📥 Insert Supported Languages into Database**

```bash
curl -X POST http://localhost:5000/api/languages
```

### **3. 📄 Fetch FAQs (Default Language - English)**

```bash
curl http://localhost:5000/api/get-faqs/
```

### **4. 🌏 Fetch FAQs in a Specific Language (e.g., Hindi)**

```bash
curl http://localhost:5000/api/get-faqs/?lang=hi
```

### **5. ✍️ Create a New FAQ**

```bash
curl -X POST http://localhost:5000/api/create-faq \
     -H "Content-Type: application/json" \
     -d '{ "userInput": { "languageCode": "en", "question": "What is this?", "answer": "This is a FAQ system." } }'
```

### **6. ❌ Delete an FAQ**

```bash
curl -X DELETE http://localhost:5000/api/delete-faq/{id}
```

---

## **Technologies Used**

- 🖥️ **Backend:** Node.js, Express.js, Prisma, PostgreSQL, Redis
- 💻 **Frontend:** React, Tailwind CSS, TypeScript
- ⚡ **Caching:** Redis
- 🌍 **Translation:** Google Translate API

---

## **Contributing**

1. 🍴 Fork the repository.
2. 🌿 Create a new branch: `git checkout -b feature-branch`.
3. 📝 Commit changes: `git commit -m "feat: add new feature"`.
4. 🔼 Push to the branch: `git push origin feature-branch`.
5. 🔄 Open a pull request.

---

## **License**

This project is licensed under the MIT License.
