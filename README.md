# 🧠 DocuMind AI

### AI-Powered Document Intelligence Platform

DocuMind AI is a full-stack AI application that combines **Conversational AI** with **Document Intelligence**. Users can upload documents, search information semantically, compare files, generate summaries, and interact with an AI assistant powered by **Ollama**, **LangChain**, and **FAISS**.

---

## 🚀 Features

### 🤖 AI Assistant

* General AI Chat
* Coding Assistance
* Knowledge-Based Q&A
* Intelligent Conversations

### 📄 Multi-Document Intelligence

* Chat with uploaded documents
* Semantic document search
* Multi-document analysis
* Cross-document comparison
* Document summarization

### 📂 Supported File Types

* PDF
* DOCX
* TXT
* CSV
* XLSX
* Markdown (.md)

### 🔍 RAG Pipeline

* Text Extraction
* Document Chunking
* Embedding Generation
* FAISS Vector Search
* Context Retrieval
* AI-Powered Response Generation

### 🔐 User Management

* JWT Authentication
* Secure User Accounts
* Chat History
* Document Management

### ⚡ Local AI

* Ollama Integration
* llama3.2
* nomic-embed-text
* No OpenAI API required
* Fully local inference

---

## 🏗️ System Architecture

```text
Upload Document
       │
       ▼
Text Extraction
       │
       ▼
Chunking
       │
       ▼
Embeddings (nomic-embed-text)
       │
       ▼
FAISS Vector Store
       │
       ▼
Similarity Search
       │
       ▼
Retrieved Context
       │
       ▼
Ollama (llama3.2)
       │
       ▼
AI Response
```

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Axios
* React Router

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

### AI & RAG

* Ollama
* LangChain
* FAISS
* nomic-embed-text
* llama3.2

### Database

* MongoDB

---

## 📸 Core Functionalities

### Document Upload

Upload multiple documents and automatically index them for semantic retrieval.

### AI Chat

Ask questions related to uploaded documents or general knowledge questions.

### Semantic Search

Find information based on meaning instead of exact keyword matches.

### Document Comparison

Compare content across multiple uploaded documents.

### Summarization

Generate concise summaries of lengthy documents.

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/SumitKumar-2004/DocuMind-AI.git
cd DocuMind-AI
```

### Backend Setup

```bash
cd Backend
npm install
```

### Frontend Setup

```bash
cd Frontend
npm install
```

### Environment Variables

Create `.env` file:

```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

### Start Backend

```bash
npm run dev
```

### Start Frontend

```bash
npm run dev
```

### Run Ollama

```bash
ollama serve
```

### Pull Required Models

```bash
ollama pull llama3.2
ollama pull nomic-embed-text
```

---

## 📁 Project Structure

```text
DocuMind-AI
│
├── Frontend
│   ├── src
│   ├── components
│   ├── pages
│   └── services
│
├── Backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   ├── utils
│   └── vectorstore
│
└── README.md
```

---

## 🎯 Future Enhancements

* Google Authentication
* Email Verification
* Password Reset via OTP
* User Profile & Avatar
* OCR for Images
* Dark / Light Mode
* Advanced Document Analytics
* Multi-Agent AI Workflows
* Cloud Deployment

---

## 👨‍💻 Developer

**Sumit Kumar**

MCA (Generative AI) Student
SRM Institute of Science and Technology

---

## 📄 License

This project is developed for educational and portfolio purposes.
