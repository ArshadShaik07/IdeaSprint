import { useState } from "react";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi 👋 I’m SkillBot. Need help with internships?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    const botMsg = {
      from: "bot",
      text: getBotReply(input)
    };

    setMessages(prev => [...prev, userMsg, botMsg]);
    setInput("");
  };

  const getBotReply = (text) => {
    const msg = text.toLowerCase();

    if (msg.includes("score"))
      return "Your match score is based on skill overlap and domain relevance.";
    if (msg.includes("skills"))
      return "Try adding more core skills like HTML, CSS, or SQL to boost matches.";
    if (msg.includes("apply"))
      return "Click ‘Apply Now’ on an internship card to proceed.";
    if (msg.includes("save"))
      return "Saved internships are stored locally in your browser.";
    if (msg.includes("domain"))
      return "Choose the domain you’re most interested in for better results.";

    return "I can help you understand scores, skills, and matches 🙂";
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-[#4f46e5] to-[#7c3aed] text-white font-bold shadow-xl hover:scale-105 transition"
      >
        💬
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-[#e2e8f0] flex flex-col overflow-hidden">
          
          <div className="bg-[#0f172a] text-white px-4 py-3 font-bold text-sm">
            SkillBot Assistant
          </div>

          <div className="flex-1 p-3 space-y-2 overflow-y-auto text-sm">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[85%]
                  ${m.from === "bot"
                    ? "bg-[#f1f5f9] text-[#0f172a]"
                    : "bg-[#4f46e5] text-white ml-auto"}
                `}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className="flex border-t border-[#e2e8f0]">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
              className="flex-1 px-3 py-2 text-sm outline-none"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="px-4 text-sm font-bold text-[#4f46e5]"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
