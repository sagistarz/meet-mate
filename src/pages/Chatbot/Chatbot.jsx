import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";

export default function App() {
  const [messages, setMessages] = useState([{ text: "Hi! Apa yang ingin Anda tanyakan tentang Meet Mate?", isUser: false }]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const answerData = {
    "meeting room":
      "Meeting room adalah ruang khusus yang dirancang untuk mengakomodasi pertemuan atau konferensi. Ruang ini biasanya dilengkapi dengan meja, kursi, dan peralatan audio-visual seperti proyektor, mikrofon, dan sistem suara. Beberapa meeting room juga memiliki fitur tambahan seperti papan tulis, flip chart, dan layanan makanan ringan. Meeting room menyediakan lingkungan yang profesional dan nyaman untuk melakukan bisnis dan kolaborasi. Ini memungkinkan peserta untuk fokus pada agenda dan memfasilitasi interaksi yang efektif. Meeting room dapat digunakan untuk berbagai tujuan, termasuk presentasi, pelatihan, brainstorming, dan negosiasi.",
    "meet mate": "Hai! Meet Mate adalah penyedia layanan meeting room yang bisa kamu gunakan kapan saja. Kami menyediakan 4 ruangan dengan kapasitas yang berbeda-beda sehingga kamu bisa menyesuaikan keinginan kamu ^^",
    "ruangan tersedia": "Small Room : Rp150.000, Medium Room : Rp240.000, Large Room : Rp345.0000, VIP Room : Rp500.000",
    "harga ruangan": "Small Room : Rp150.000, Medium Room : Rp240.000, Large Room : Rp345.0000, VIP Room : Rp500.000",
    "list ruangan": "Small Room, Medium Room, Large Room, VIP Room.",
    kapasitas: "Small Room : 10 orang, Medium Room : 20 orang, Large Room : 30 orang, VIP Room : 50 orang",
    "cara pesan": "Hai! untuk pemesanan, Anda bisa memilih ruangan nya terlebih dahulu ya. Pemilihan ruangan bisa dilakukan melalui 'homepage' atau Anda bisa langsung ke bagian 'order'.",
    open: "Meet Mate open pukul 09.00 - 22.00 ya mate :)",
    "buka jam berapa": "Meet Mate open pukul 09.00 - 22.00 ya mate :)",
    "waktu buka": "Meet Mate open pukul 09.00 - 22.00 ya :)",
    "lihat reservasi": "Anda bisa melihat reservasi pada bagian 'order' ya. Anda bisa mencari menggunakan email yang telah Anda daftarkan :)",
    "lihat order": "Anda bisa melihat reservasi pada bagian 'order' ya. Anda bisa mencari menggunakan email yang telah Anda daftarkan :)",
    chatmate: "Chatmate adalah AI yang disediakan oleh Meet Mate untuk membantu kamu menjelajahi Meet Mate :)",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);

    let newMessages = [...messages];
    newMessages.push({ text: question, isUser: true });
    setMessages(newMessages);

    try {
      let foundAnswer = null;
      const questionWords = question.toLowerCase().split(" ");

      Object.keys(answerData).forEach((keyword) => {
        const keywordWords = keyword.toLowerCase().split(" ");
        const keywordFound = keywordWords.every((word) => questionWords.includes(word));
        if (keywordFound) {
          foundAnswer = answerData[keyword];
        }
      });

      if (foundAnswer) {
        newMessages.push({ text: foundAnswer, isUser: false });
        setMessages(newMessages);
      } else {
        const response = await axios.post("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyAL1sCvl_q3JvLeuwdTFhtHhCUIK0_Myq8", {
          contents: [{ parts: [{ text: question }] }],
        });
        newMessages.push({
          text: response.data.candidates[0].content.parts[0].text,
          isUser: false,
        });
        setMessages(newMessages);
      }
    } catch (error) {
      console.log(error);
    }

    setQuestion("");
    setLoading(false);
  };
  return (
    <div>
      <Navbar />
      <div className=" ">
        <div className="pt-4 ml-6 ">
          <Link to="/homepage">
            <section className="flex flex-row">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24px" height="24px">
                <path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path>
              </svg>
              <p>Back</p>
            </section>
          </Link>
        </div>

        <div className="flex flex-col justify-center items-center h-screen bg-white">
          <div className="rounded-lg w-3/4 h-3/4 flex flex-col ">
            <h1 className="text-2xl font-bold text-center my-2">ChatMate</h1>
            <div className="flex-1 overflow-y-auto p-4">
              {messages.map((message, index) => (
                <div key={index} className={`${message.isUser ? "justify-end" : "justify-start"} flex mb-2`}>
                  <div className={`${message.isUser ? "bg-gray-700 text-white  " : "bg-[#248D9A] text-white"} px-4 py-2 rounded-lg max-w-md`}>
                    <ReactMarkdown>{message.text}</ReactMarkdown>
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="p-4">
              <div className="flex">
                <input type="text" className="flex-1 border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500" placeholder="Type your question here..." value={question} onChange={(e) => setQuestion(e.target.value)} />
                <button type="submit" className="ml-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#3C7CB8] hover:bg-blue-900 " disabled={loading}>
                  {loading ? "Sending..." : "Send"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
