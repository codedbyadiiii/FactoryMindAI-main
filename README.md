# 🏭 FactoryMind AI

AI-Powered Industrial Knowledge Assistant built for the ET AI Hackathon 2026.

FactoryMind AI enables engineers and industry professionals to upload industrial documents (PDFs) and interact with them using Generative AI. The platform provides intelligent document summaries, contextual question answering, and industrial knowledge extraction to improve decision-making and reduce information retrieval time.

---

## 🚀 Live Demo

Frontend: https://factory-mind-ai-lac.vercel.app/

Backend API: https://factorymindai-backend.onrender.com

GitHub Repository: https://github.com/Winter7700/FactoryMindAI

---

## ✨ Features

- 📄 Upload Industrial PDF Documents
- 🤖 AI-powered Question Answering
- 📑 Automatic Document Analysis
- 🧠 Context-aware Responses
- 💬 Interactive Chat Interface
- ⚡ Fast Document Processing
- ☁ Cloud Deployment

---

## 🛠 Tech Stack

### Frontend
- React.js
- Vite
- Axios
- React Markdown
- CSS

### Backend
- Node.js
- Express.js
- Multer
- PDF Parse

### AI
- OpenRouter API
- Large Language Model (LLM)

### Deployment
- Vercel
- Render

---

## 📂 Project Structure

FactoryMindAI/
│
├── frontend/
│ ├── src/
│ ├── public/
│ └── package.json
│
├── backend/
│ ├── routes/
│ ├── services/
│ ├── utils/
│ └── server.js
│
└── README.md

---

## ⚙ Workflow

1. User uploads a PDF document.
2. Backend extracts the document text.
3. Extracted text is stored temporarily.
4. User can generate an AI summary.
5. User can ask questions about the uploaded document.
6. AI retrieves relevant context and generates accurate answers.

## 🏗 System Architecture

![FactoryMind AI Architecture](docs/architecture.png)

The system follows a cloud-based architecture where users upload industrial PDF documents through the React frontend hosted on Vercel. The backend, deployed on Render, extracts and processes document content, generates document summaries, and interacts with the OpenRouter LLM to provide contextual answers based on the uploaded document.

## 👥 Team

1: Sanket Holkar
2: Aditya Nalge
3: Aryan Dhondage
4: Aditya Bade

---

## 📜 License

Academic Prototype for ET AI Hackathon 2026.

