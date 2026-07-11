# 🏗️ DocuMind-AI: Full Project Structure & Architecture

## 📋 Project Overview

**DocuMind-AI** is an AI-powered document intelligence platform that enables users to upload documents and interact with them through conversational AI. It leverages Retrieval-Augmented Generation (RAG), vector embeddings, and local LLM inference to provide semantic search, document analysis, and intelligent Q&A capabilities.

### Core Technologies:
- **Frontend:** React.js + Vite + Tailwind CSS
- **Backend:** Node.js + Express.js
- **Database:** MongoDB + Mongoose
- **AI/ML:** Ollama (llama3.2), LangChain, FAISS (vector store), nomic-embed-text
- **File Processing:** PDF, DOCX, CSV, TXT, Markdown
- **Authentication:** JWT-based

---

## 📁 Complete Project Structure

```
DocuMind-AI/
├── Backend/
│   ├── controllers/              # Request handlers
│   │   ├── authController.js    # User login/registration
│   │   ├── chatController.js    # Chat history management
│   │   ├── pdfController.js     # Document upload/delete/view
│   │   └── userController.js    # User profile operations
│   │
│   ├── models/                  # MongoDB schemas
│   │   ├── User.js              # User data & passwords
│   │   ├── PDF.js               # Document metadata & extracted text
│   │   └── Chat.js              # Chat history records
│   │
│   ├── routes/                  # API endpoints
│   │   ├── authRoutes.js        # /api/auth/*
│   │   ├── pdfRoutes.js         # /api/pdf/*
│   │   ├── chatRoutes.js        # /api/chat/*
│   │   └── userRoutes.js        # /api/user/*
│   │
│   ├── middleware/              # Express middleware
│   │   └── authMiddleware.js    # JWT verification
│   │
│   ├── services/                # Business logic
│   │   └── userService.js       # User-related operations
│   │
│   ├── utils/                   # Helper functions
│   │   ├── ragService.js        # RAG pipeline & vector store
│   │   │   ├── addPDFToVectorStore()       # Index documents in FAISS
│   │   │   ├── queryVectorStore()          # Semantic search & LLM response
│   │   │   └── removePDFFromVectorStore()  # Delete & rebuild indexes
│   │   │
│   │   └── fileExtractor.js     # Multi-format text extraction
│   │       ├── PDF parsing (pdf-parse)
│   │       ├── DOCX parsing (mammoth)
│   │       └── CSV/TXT parsing (csv-parser, fs)
│   │
│   ├── uploads/                 # User-uploaded files (runtime)
│   ├── vectorstore/             # FAISS vector indexes (runtime)
│   ├── server.js                # Express app setup & routing
│   ├── package.json
│   └── .env.example
│
├── Frontend/
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── Navbar.jsx              # App navigation bar
│   │   │   ├── LandingNavbar.jsx       # Landing page navigation
│   │   │   ├── ChatBox.jsx             # Chat interface
│   │   │   ├── PDFUpload.jsx           # File upload form
│   │   │   ├── PDFList.jsx             # Uploaded documents list
│   │   │   ├── Avatar.jsx              # User profile avatar
│   │   │   ├── ThemeToggle.jsx         # Light/dark mode
│   │   │   └── layout/                 # Layout components
│   │   │
│   │   ├── pages/                # Page-level components
│   │   │   ├── Landing.jsx        # Home page
│   │   │   ├── Dashboard.jsx      # Main app dashboard
│   │   │   ├── Chat.jsx           # Chat interface page
│   │   │   ├── Documents.jsx      # Document management
│   │   │   ├── History.jsx        # Chat history
│   │   │   ├── Login.jsx          # User login
│   │   │   ├── Register.jsx       # User registration
│   │   │   ├── Settings.jsx       # User settings
│   │   │   └── settings/          # Settings sub-pages
│   │   │
│   │   ├── services/             # API communication
│   │   │   ├── api.js            # Axios instance & HTTP requests
│   │   │   └── userService.js    # User-related API calls
│   │   │
│   │   ├── context/              # State management
│   │   │   └── ThemeContext.jsx  # Light/dark theme state
│   │   │
│   │   ├── hooks/                # Custom React hooks
│   │   ├── assets/               # Images, icons, static files
│   │   ├── App.jsx               # Root component & routing
│   │   ├── main.jsx              # Entry point
│   │   └── index.css             # Global styles
│   │
│   ├── vite.config.js            # Vite bundler config
│   ├── tailwind.config.js        # Tailwind CSS setup
│   ├── postcss.config.js         # PostCSS plugins
│   ├── vercel.json               # Vercel deployment config
│   ├── index.html                # HTML template
│   ├── package.json
│   └── .gitignore
│
├── README.md
├── ARCHITECTURE.md               # This file
├── TODO.md
└── package-lock.json (root level)
```

---

## 🏛️ System Architecture

### **High-Level Flow**

```
┌─────────────────────────────────────────────────────────────────────┐
│                       FRONTEND (React + Vite)                        │
├─────────────────────────────────────────────────────────────────────┤
│  Landing → Login/Register → Dashboard → Documents → Chat/History    │
│  • File Upload Component                                              │
│  • Chat Interface                                                     │
│  • Document Management                                                │
│  • Theme Management                                                   │
└────────────────────────────────┬────────────────────────────────────┘
                                  │ AXIOS HTTP REQUESTS
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    BACKEND API (Node + Express)                      │
├─────────────────────────────────────────────────────────────────────┤
│  ┌──────────┬──────────┬──────────┬──────────┐                       │
│  │ Auth API │ PDF API  │ Chat API │ User API │                       │
│  └─────────┬┴──────────┴──────────┴─────────┬┘                       │
│            │ (JWT Authentication)           │                        │
│            ▼                                 ▼                        │
│  ┌──────────────────┐          ┌──────────────────┐                  │
│  │ MongoDB Database │          │ File System      │                  │
│  │ • User           │          │ • uploads/       │                  │
│  │ • PDF metadata   │          │ • vectorstore/   │                  │
│  │ • Chat history   │          │                  │                  │
│  └──────────────────┘          └──────────────────┘                  │
│            ▲                                 ▲                        │
│            └─────────────┬────────────────────┘                       │
│                          │ (RAG Pipeline)                             │
│  ┌────────────────────────────────────────────────────┐              │
│  │         RAG SERVICE (ragService.js)                │              │
│  ├────────────────────────────────────────────────────┤              │
│  │ 1. addPDFToVectorStore()                           │              │
│  │    - Extract text (fileExtractor.js)               │              │
│  │    - Chunk text (RecursiveCharacterTextSplitter)   │              │
│  │    - Generate embeddings (nomic-embed-text)        │              │
│  │    - Store in FAISS                                │              │
│  │                                                    │              │
│  │ 2. queryVectorStore()                              │              │
│  │    - Search similar chunks (FAISS)                 │              │
│  │    - Generate prompt with context                  │              │
│  │    - Call LLM (llama3.2 via Ollama)               │              │
│  │    - Return answer + source docs                   │              │
│  │                                                    │              │
│  │ 3. removePDFFromVectorStore()                       │              │
│  │    - Remove PDF chunks                             │              │
│  │    - Rebuild FAISS index                           │              │
│  └────────────────────────────────────────────────────┘              │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    AI/ML SERVICES (Local)                            │
├─────────────────────────────────────────────────────────────────────┤
│  ┌──────────────────┐                 ┌──────────────────┐           │
│  │  OLLAMA Server   │                 │  FAISS Vector    │           │
│  │  (http://127.0.0.1:11434)          │  Store (Local)   │           │
│  │                  │                 │                  │           │
│  │ • llama3.2       │                 │ User-specific    │           │
│  │ • nomic-embed    │                 │ indexes          │           │
│  │   text           │                 │ per user/        │           │
│  │                  │                 │ vectorstore_dir  │           │
│  └──────────────────┘                 └──────────────────┘           │
│                                                                       │
│  Data Flow:                                                          │
│  PDF → Extract Text → Chunk → Embedding → FAISS Store              │
│  Query → Embedding → Search FAISS → Retrieved Context → LLM Response│
└─────────────────────────────────────────────────────────────────────┘
```

---

## 📡 API Endpoints

### **Authentication Routes** (`/api/auth`)
```
POST   /register          # Create user account
POST   /login             # Authenticate user (returns JWT)
POST   /logout            # Clear session
```

### **PDF/Document Routes** (`/api/pdf`)
```
POST   /upload            # Upload documents (multi-file)
GET    /list              # Get user's uploaded documents
GET    /view/:id          # View document content
GET    /download/:id      # Download document
DELETE /:id               # Delete document & remove from FAISS
```

### **Chat Routes** (`/api/chat`)
```
POST   /query             # Ask question about documents
GET    /history           # Get chat history
```

### **User Routes** (`/api/user`)
```
GET    /profile           # Get user profile
PUT    /profile           # Update user profile
```

---

## 🔄 Data Models (MongoDB Schemas)

### **User Model**
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed with bcryptjs),
  avatar: String (optional),
  createdAt: Date,
  updatedAt: Date
}
```

### **PDF Model**
```javascript
{
  _id: ObjectId,
  userId: ObjectId (reference),
  fileName: String,
  originalName: String,
  filePath: String,
  extractedText: String (full text content),
  fileSize: Number (bytes),
  pageCount: Number,
  uploadedAt: Date
}
```

### **Chat Model**
```javascript
{
  _id: ObjectId,
  userId: ObjectId (reference),
  question: String,
  answer: String,
  sourcePDFs: [String] (document names),
  timestamp: Date
}
```

---

## 🔐 Authentication Flow

```
1. User Registration/Login
   ↓
2. Backend generates JWT token
   ↓
3. Frontend stores token in localStorage
   ↓
4. Every API request includes: Authorization: Bearer <token>
   ↓
5. authMiddleware.js verifies token
   ↓
6. If valid → proceed; If invalid → return 401 Unauthorized
```

---

## 📚 RAG (Retrieval-Augmented Generation) Pipeline

### **INDEXING PHASE:**
```
1. User uploads PDF/DOCX/CSV/TXT
   ↓
2. fileExtractor.js extracts text
   ↓
3. RecursiveCharacterTextSplitter chunks text
   (1000 chars per chunk, 200 char overlap)
   ↓
4. OllamaEmbeddings (nomic-embed-text) generates
   vector embeddings for each chunk
   ↓
5. FaissStore stores chunks + embeddings
   (user_${userId}/ directory)
```

### **QUERYING PHASE:**
```
1. User asks question in chat
   ↓
2. Question converted to embedding
   ↓
3. FAISS similarity search retrieves top-K chunks
   (K=8 for general queries, K=20 for analysis)
   ↓
4. Retrieved chunks formatted as context
   ↓
5. Prompt = Context + Question + Instructions
   ↓
6. ChatOllama (llama3.2) generates response
   ↓
7. Response returned with source document names
```

### **DELETION PHASE:**
```
1. User deletes a document
   ↓
2. PDF record deleted from MongoDB
   ↓
3. FAISS index rebuilt without that document's chunks
   (recreate with remaining documents' text)
```

---

## 🎯 Key Features Implementation

### **Multi-Format File Support**
- **PDF**: `pdf-parse` library
- **DOCX**: `mammoth` library
- **CSV**: `csv-parser` library
- **TXT/Markdown**: Native Node.js `fs` module

### **Vector Storage & Search**
- **Library**: FAISS (Facebook AI Similarity Search)
- **Storage**: Local filesystem (`Backend/vectorstore/`)
- **User Isolation**: Separate index per user (`user_${userId}`)
- **Search**: Similarity search with configurable top-K results

### **Local LLM Inference**
- **Model**: llama3.2 via Ollama
- **Embeddings**: nomic-embed-text
- **No API costs**: All inference runs locally
- **Connection**: HTTP to `127.0.0.1:11434`

### **Chat Features**
- Document-aware Q&A
- Multi-document comparison
- Chat history persistence
- Source document attribution

---

## 🚀 Runtime Architecture

### **Development Stack**
```
Frontend: Vite dev server (hot reload) → http://localhost:3000
Backend: Express + nodemon → http://localhost:5000
Database: MongoDB (local or cloud)
AI Server: Ollama → http://localhost:11434
```

### **Deployment**
- **Frontend**: Deployed on Vercel (https://documind-ai-gamma-two.vercel.app)
- **Backend**: Can be deployed on any Node.js hosting (Heroku, AWS, DigitalOcean, etc.)
- **Database**: MongoDB Atlas (cloud) or self-hosted
- **AI Server**: Ollama runs on the backend server machine

---

## 📊 Data Flow Examples

### **File Upload Flow**
```
User selects file
    ↓
Frontend: PDFUpload.jsx (axios POST to /api/pdf/upload)
    ↓
Backend: authMiddleware validates JWT
    ↓
Backend: pdfController.uploadPDFs()
    ↓
1. Multer saves file to Backend/uploads/
2. fileExtractor extracts text
3. PDF record created in MongoDB
4. ragService.addPDFToVectorStore() indexes document
    ↓
Response: { success: true, files: [...] }
    ↓
Frontend: Updates document list
```

### **Chat Query Flow**
```
User types question in ChatBox.jsx
    ↓
Frontend: axios POST to /api/chat/query
    ↓
Backend: authMiddleware validates JWT
    ↓
Backend: chatController receives question
    ↓
1. ragService.queryVectorStore(userId, question)
   - Loads user's FAISS index
   - Searches similar chunks
   - Builds context
2. Calls LLM (llama3.2) with context + question
3. Receives AI response
4. Extracts source document names
    ↓
Response: { answer: "...", sourcePDFs: [...] }
    ↓
Frontend: Displays answer with sources
    ↓
Backend: Chat record saved to MongoDB
```

---

## 🔧 Configuration Files

### **Frontend**
- `vite.config.js` - Bundler configuration
- `tailwind.config.js` - CSS framework setup
- `postcss.config.js` - Post-processing CSS

### **Backend**
- `.env` - Environment variables (MONGODB_URI, JWT_SECRET, PORT)
- `package.json` - Dependencies

### **Deployment**
- `Frontend/vercel.json` - Vercel deployment config

---

## 📈 Scalability Considerations

1. **Vector Store**: FAISS indices stored per user (isolates data, allows parallelization)
2. **Database**: MongoDB with indexes on `userId` and `uploadedAt`
3. **File Storage**: Filesystem-based (can migrate to S3/cloud storage)
4. **LLM**: Local Ollama (can be containerized/scaled with Docker)
5. **JWT**: Stateless authentication (no session store needed)

---

## 🛠️ Technology Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend Framework** | React 18 | UI library |
| **Frontend Bundler** | Vite | Fast build tool |
| **Styling** | Tailwind CSS | Utility-first CSS |
| **Animation** | Framer Motion | Smooth animations |
| **HTTP Client** | Axios | API requests |
| **Routing** | React Router v6 | Page navigation |
| **Markdown Rendering** | React Markdown | Display formatted text |
| **Backend Runtime** | Node.js | JavaScript server |
| **Web Framework** | Express.js | HTTP server |
| **Database** | MongoDB + Mongoose | Document storage |
| **Authentication** | JWT + bcryptjs | Secure login |
| **File Upload** | Multer | Multi-file handling |
| **PDF Processing** | pdf-parse | Extract PDF text |
| **DOCX Processing** | Mammoth | Extract Word text |
| **CSV Processing** | csv-parser | Parse CSV files |
| **Vector Search** | FAISS | Similarity search |
| **Text Splitting** | LangChain | Chunk documents |
| **LLM Framework** | LangChain | AI orchestration |
| **Embeddings** | OllamaEmbeddings | Text→Vector |
| **LLM** | Ollama (llama3.2) | Local AI inference |
| **Deployment** | Vercel (Frontend) | Cloud hosting |

---

## 📝 Summary

DocuMind-AI is a **full-stack RAG application** with clear separation of concerns:
- **Frontend** handles UI/UX and user interactions
- **Backend** manages API, authentication, and file processing
- **RAG Service** orchestrates document indexing and semantic search
- **Vector Store** (FAISS) enables similarity-based document retrieval
- **LLM** (Ollama) generates contextual answers

All components communicate through REST APIs with JWT authentication, enabling a secure, scalable system for intelligent document analysis.
