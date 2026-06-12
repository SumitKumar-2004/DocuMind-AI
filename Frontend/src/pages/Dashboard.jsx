import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import PDFUpload from "../components/PDFUpload.jsx";
import PDFList from "../components/PDFList.jsx";
import { fetchPDFs } from "../services/api.js";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [pdfs, setPDFs] = useState([]);
  const [loadingPDFs, setLoadingPDFs] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [warningMessages, setWarningMessages] = useState([]);

  useEffect(() => {
    loadPDFs();
  }, []);

  const loadPDFs = async () => {
    setLoadingPDFs(true);
    try {
      const res = await fetchPDFs();
      setPDFs(res.data.pdfs || []);
    } catch (err) {
      console.error("Failed to load PDFs:", err);
    } finally {
      setLoadingPDFs(false);
    }
  };

  const handleUploadSuccess = (message, errors) => {
    setSuccessMessage(message);
    setWarningMessages(errors || []);
    loadPDFs(); // Refresh the list
    setTimeout(() => {
      setSuccessMessage("");
      setWarningMessages([]);
    }, 5000);
  };

  const handleDeletePDF = (deletedId) => {
    setPDFs((prev) => prev.filter((pdf) => pdf._id !== deletedId));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {/* Welcome banner */}
        <div className="bg-gradient-to-r from-primary to-blue-700 rounded-xl p-5 sm:p-6 text-white mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-xl font-bold">
                Welcome back, {user.name?.split(" ")[0] || "there"} 👋
              </h1>
              <p className="text-blue-100 text-sm mt-0.5">
                {pdfs.length === 0
                  ? "Upload your first PDF to start chatting"
                  : `${pdfs.length} PDF${pdfs.length > 1 ? "s" : ""} in your knowledge base`}
              </p>
            </div>
            <button
              onClick={() => navigate("/chat")}
              disabled={pdfs.length === 0}
              className="bg-white text-primary px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
            >
              💬 Open Chat
            </button>
          </div>
        </div>

        {/* Success / warning messages */}
        {successMessage && (
          <div className="mb-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-3">
            ✅ {successMessage}
          </div>
        )}
        {warningMessages.map((msg, i) => (
          <div
            key={i}
            className="mb-4 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3"
          >
            ⚠️ {msg}
          </div>
        ))}

        {/* Two-column grid on larger screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload Section */}
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">⬆️</span>
              <h2 className="font-semibold text-slate-800">Upload PDFs</h2>
            </div>
            <PDFUpload onUploadSuccess={handleUploadSuccess} />
          </div>

          {/* PDF List Section */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-lg">📚</span>
                <h2 className="font-semibold text-slate-800">
                  Your PDFs
                </h2>
                {!loadingPDFs && (
                  <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                    {pdfs.length}
                  </span>
                )}
              </div>
              <button
                onClick={loadPDFs}
                className="text-xs text-slate-400 hover:text-primary transition-colors"
              >
                ↻ Refresh
              </button>
            </div>
            <PDFList
              pdfs={pdfs}
              loading={loadingPDFs}
              onDelete={handleDeletePDF}
            />
          </div>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          {[
            {
              icon: "🔍",
              title: "Smart Search",
              desc: "Searches across all uploaded PDFs simultaneously",
            },
            {
              icon: "🤖",
              title: "AI Answers",
              desc: "Powered by GPT-3.5 with source citations",
            },
            {
              icon: "📖",
              title: "Chat History",
              desc: "All conversations are saved automatically",
            },
          ].map(({ icon, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-xl border border-slate-100 p-4 flex gap-3 items-start"
            >
              <span className="text-xl shrink-0">{icon}</span>
              <div>
                <p className="text-sm font-semibold text-slate-800">{title}</p>
                <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
