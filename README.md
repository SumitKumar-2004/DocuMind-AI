# 🧠 DocuMind AI

**AI-Powered Document Intelligence Platform**

A full-stack application that combines conversational AI with advanced document intelligence. Upload documents, perform semantic searches, and get intelligent insights powered by local LLMs via Ollama.

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Tech Stack](https://img.shields.io/badge/Stack-MERN-green.svg)]()

---

## ✨ Key Features

### 🤖 Intelligent AI Assistant
- Chat with uploaded documents
- Semantic document search
- Multi-document analysis & comparison
- Automatic document summarization
- General knowledge Q&A

### 📄 Multi-Format Support
- **Documents**: PDF, DOCX, TXT, Markdown
- **Data**: CSV, XLSX
- **Indexing**: Automatic text extraction & embedding

### 🔍 Advanced RAG Pipeline
- Text extraction & chunking
- Embedding generation (nomic-embed-text)
- FAISS vector search
- Intelligent context retrieval
- AI-powered response generation

### 🔐 Secure & Private
- JWT-based authentication
- Local AI inference (no API dependencies)
- Secure user sessions
- Chat history & document management

---

## 🏛️ Architecture

```
Upload Document → Text Extraction → Chunking → Embeddings
     ↓
FAISS Vector Store → Similarity Search → Retrieved Context
     ↓
Ollama (llama3.2) → AI Response Generation
```

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | React.js, Tailwind CSS, Axios, React Router |
| **Backend** | Node.js, Express.js, MongoDB, Mongoose |
| **AI/ML** | Ollama, LangChain, FAISS, nomic-embed-text, llama3.2 |
| **Database** | MongoDB |

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB
- Ollama

### Installation

1. **Clone Repository**
   ```bash
   git clone https://github.com/SumitKumar-2004/DocuMind-AI.git
   cd DocuMind-AI
   ```

2. **Backend Setup**
   ```bash
   cd Backend
   npm install
   ```
   
   Create `.env`:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```
   
   Start server:
   ```bash
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd Frontend
   npm install
   ```
   
   Start application:
   ```bash
   npm run dev
   ```

4. **Ollama Setup**
   
   Install [Ollama](https://ollama.ai) and pull required models:
   ```bash
   ollama serve
   ```
   
   In another terminal:
   ```bash
   ollama pull llama3.2
   ollama pull nomic-embed-text
   ```

---

## 📁 Project Structure

```
DocuMind-AI/
├── Frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── services/
├── Backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── vectorstore/
└── README.md
```

---

## 🎯 Core Features

| Feature | Description |
|---------|-------------|
| **Document Chat** | Ask questions about uploaded documents with AI-powered answers |
| **Semantic Search** | Find information by meaning, not just keywords |
| **Document Comparison** | Compare content across multiple documents |
| **Summarization** | Generate concise summaries of lengthy documents |
| **Multi-Document Q&A** | Query information across all indexed documents |

---

## 📊 Future Roadmap

- [ ] Google OAuth authentication
- [ ] Email verification & password reset
- [ ] User profiles with avatars
- [ ] OCR for image documents
- [ ] Dark/Light theme support
- [ ] Advanced document analytics
- [ ] Multi-agent AI workflows
- [ ] Cloud deployment options

---

## 📝 License

This project is created for educational and portfolio purposes.

---

## 👤 Author

**Sumit Kumar**  
MCA (Generative AI) - SRM Institute of Science and Technology

---

## 🔗 Links

- [Report Issues](https://github.com/SumitKumar-2004/DocuMind-AI/issues)
- [View Repository](https://github.com/SumitKumar-2004/DocuMind-AI)
