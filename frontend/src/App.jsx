import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";
import ReactMarkdown from "react-markdown";
import Header from "./components/Header";
const API = import.meta.env.VITE_API_URL;

function App() {
  const [question, setQuestion] = useState("");
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([]);
  const [analysis, setAnalysis] = useState("");
const [analyzing, setAnalyzing] = useState(false);
const chatEndRef = useRef(null);

  const uploadPDF = async () => {
    if (!file) {
      alert("Please select a PDF first.");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      setUploadStatus("Uploading...");

      const res = await axios.post(`${API}/api/upload`, formData);

      setUploadStatus(
        `✅ ${res.data.originalName} uploaded successfully`
      );
    } catch (err) {
      console.error(err);
      setUploadStatus("❌ Upload failed");
    }
  };

 const analyzeDocument = async () => {
  try {
    setAnalyzing(true);

    const res = await axios.post(`${API}/api/analyze`);

    setAnalysis(res.data.analysis);

  } catch (err) {
    setAnalysis(
      err.response?.data?.message ||
      "Analysis failed."
    );
  } finally {
    setAnalyzing(false);
  }
};

  const askAI = async () => {
    if (!question.trim()) return;

    const userQuestion = question;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userQuestion,
      },
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const res = await axios.post(`${API}/api/chat`, {
  message: userQuestion,
});

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: res.data.reply,
        },
      ]);

    } catch (err) {

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            err.response?.data?.message ||
            "Something went wrong.",
        },
      ]);

    } finally {
      setLoading(false);
    }
  };

    useEffect(() => {
  chatEndRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages]);

  return (
    <div className="container">

      <Header />

      <div className="dashboard">

      <div className="card">

        <h2>Upload PDF</h2>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button onClick={uploadPDF}>
          Upload
        </button>

        <button
  onClick={analyzeDocument}
  style={{ marginLeft: "10px" }}
>
  {analyzing ? "Analyzing..." : "Analyze"}
</button>

        <p>{uploadStatus}</p>

            </div>
            </div>

      <div className="card">

        <h2>📄 Document Analysis</h2>

        {analysis ? (
          <ReactMarkdown>
            {analysis}
          </ReactMarkdown>
        ) : (
          <p>Upload a PDF and click Analyze.</p>
        )}

      </div>

      <div className="card">

        <h2>Conversation</h2>

        <div className="response">

          {messages.length === 0 && (
            <p>No conversation yet.</p>
          )}

          {messages.map((msg, index) => (

            <div
  key={index}
  className={`message ${msg.role}`}
>

  <div className="bubble">

    <ReactMarkdown>
      {msg.content}
    </ReactMarkdown>

  </div>

</div>

          ))}

          {loading && (
            <p>
              🤖 Thinking...
            </p>
          )}
          <div ref={chatEndRef}></div>
        </div>

        <textarea
  placeholder="Ask something about your uploaded document..."
  value={question}
  onChange={(e) => setQuestion(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      askAI();
    }
  }}
/>

       <button
  onClick={askAI}
  disabled={loading}
>
  {loading ? "Thinking..." : "Send"}
</button>

      </div>

    </div>
  );
}

export default App;