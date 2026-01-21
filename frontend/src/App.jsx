import { useState } from "react";

/* ---------- CONFIG ---------- */
const POPULAR_SKILLS = ["Python", "C", "Java", "C++", "C#", "JavaScript", "Visual Basic", "SQL", "Delphi", "R", "Perl", "Fortran", "Rust", "MATLAB", "PHP", "Go", "Scratch", "Ada", "Assembly", "Kotlin", "COBOL", "Swift", "Prolog", "SAS", "Dart", "Ruby", "Julia", "Objective-C", "Lua", "Lisp","html","css"];

const SUGGESTED_SKILLS = {
  "Web Development": ["TypeScript", "Next.js", "REST APIs"],
  "AI": ["Pandas", "TensorFlow", "Data Visualization"],
  "Data Science": ["Statistics", "Power BI", "SQL"],
  "Electronics": ["Embedded C", "IoT", "PCB Design"]
};

/* ---------- HELPERS ---------- */
const getConfidence = (score) => {
  if (score >= 80) return "High Confidence";
  if (score >= 60) return "Medium Confidence";
  return "Exploratory";
};

/* ---------- COLOR HELPERS (Psychology Based) ---------- */
const getScoreColor = (score) => {
  if (score >= 80) return "text-[#059669]"; // Emerald-600 (Success/Growth)
  if (score >= 60) return "text-[#d97706]"; // Amber-600 (Caution/Potential)
  return "text-[#64748b]"; // Slate-500 (Neutral)
};

const getProgressBarGradient = (score) => {
  if (score >= 80) return "from-[#10b981] to-[#059669]"; // Emerald Gradient
  if (score >= 60) return "from-[#fcd34d] to-[#f59e0b]"; // Amber Gradient
  return "from-[#94a3b8] to-[#64748b]"; // Slate Gradient
};

function App() {
  const [skills, setSkills] = useState("");
  const [interest, setInterest] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [language, setLanguage] = useState("EN");
  const [judgeMode, setJudgeMode] = useState(false);
  const [saved, setSaved] = useState(
    JSON.parse(localStorage.getItem("savedInternships")) || []
  );

  const addSkill = (skill) => {
    if (skills.toLowerCase().includes(skill.toLowerCase())) return;
    setSkills((prev) => (prev ? `${prev}, ${skill}` : skill));
  };

  const saveInternship = (item) => {
    if (saved.find((s) => s.role === item.role)) return;
    const updated = [...saved, item];
    setSaved(updated);
    localStorage.setItem("savedInternships", JSON.stringify(updated));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResults([]);

    try {
      const response = await fetch("http://localhost:3000/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skills: skills.split(",").map((s) => s.trim()).filter(Boolean),
          interest
        })
      });


      const data = await response.json();
      if (!response.ok) setError(data.error || "Matching failed.");
      else {
        const sorted = [...data].sort((a, b) => b.score - a.score);
        setResults(sorted);
      }
      console.log(results)
    } catch {
      setError("Backend not running.");
    }

    setLoading(false);
  };

  return (
    // Background: Slate-50 (#f8fafc) - Clean, professional, undistracted
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] font-sans selection:bg-[#c7d2fe] selection:text-[#3730a3]">

      {/* NAVBAR */}
      {/* Background: White with extremely subtle Slate-200 border */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md border-b border-[#e2e8f0] z-50 transition-all duration-300">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {/* Logo: Indigo to Violet Gradient - signals Creativity & Intelligence */}
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#4f46e5] to-[#7c3aed] flex items-center justify-center text-white font-bold shadow-lg shadow-[#c7d2fe]">
              S
            </div>
            <h1 className="font-extrabold text-[#0f172a] text-xl tracking-tight">
              SkillMatch<span className="text-[#4f46e5]">.</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative group">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="text-xs font-semibold bg-[#f1f5f9] text-[#475569] border border-[#cbd5e1] rounded-full px-4 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#6366f1] appearance-none cursor-pointer hover:bg-[#e2e8f0] transition-colors"
              >
                <option value="EN">English</option>
                <option value="HI">Hindi</option>
                <option value="ES">Spanish</option>
              </select>
            </div>
            <button
              onClick={() => setJudgeMode(!judgeMode)}
              className={`text-xs font-bold px-4 py-1.5 rounded-full transition-all duration-300 border
                ${judgeMode 
                  ? "bg-[#0f172a] text-white border-[#0f172a] shadow-md" 
                  : "bg-white text-[#64748b] border-[#cbd5e1] hover:text-[#4f46e5] hover:border-[#4f46e5]"}`}
            >
              {judgeMode ? "Judge Mode Active" : "Judge Mode"}
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 pt-32 pb-20">

        {/* HERO */}
        <div className="text-center mb-12 animate-fade-in-up">
          {/* Badge: Indigo-50 with Indigo-600 text - Trustworthy & Calm */}
          <span className="inline-block px-4 py-1.5 mb-5 rounded-full bg-[#e0e7ff] text-[#4338ca] text-[11px] font-bold uppercase tracking-widest border border-[#c7d2fe]">
            Bias-Free Hiring Protocol
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-[#0f172a] leading-tight tracking-tight">
            Merit Over <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4f46e5] to-[#9333ea]">Reputation</span>
          </h2>
          <p className="text-[#64748b] text-lg max-w-xl mx-auto leading-relaxed">
            We ignore the college name. We match global internships based purely on your raw technical capability.
          </p>
        </div>

        {/* FORM Card */}
        {/* White card, subtle large shadow for depth/elevation */}
        <div className="bg-white p-8 rounded-2xl shadow-xl shadow-[#64748b]/10 border border-[#e2e8f0] relative overflow-hidden">
          {/* Decorator Line: Indigo to Cyan - Modern Tech Gradient */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#4f46e5] via-[#8b5cf6] to-[#06b6d4]"></div>

          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">

            <div>
              <label className="text-xs font-bold text-[#64748b] uppercase tracking-wider mb-2 block">
                Your Arsenal (Skills)
              </label>
              <div className="relative group">
                {/* Input: Clean border, focus ring is Indigo (Focus) */}
                <input
                  className="w-full bg-[#f8fafc] border border-[#cbd5e1] text-[#0f172a] px-4 py-4 rounded-xl focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all outline-none font-medium placeholder-[#94a3b8]"
                  placeholder="e.g. React, Node.js, Python"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  required
                />
                {skills && (
                  <div className="absolute right-4 top-4 text-xs font-bold text-[#4f46e5] bg-[#e0e7ff] px-2 py-1 rounded">
                    {skills.split(",").filter(Boolean).length} detected
                  </div>
                )}
              </div>

              {/* Skill Chips: Neutral Slate hover to Indigo */}
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="text-xs font-semibold text-[#94a3b8] py-1.5">Quick Add:</span>
                {POPULAR_SKILLS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => addSkill(s)}
                    className="text-xs font-semibold bg-white text-[#475569] border border-[#e2e8f0] px-3 py-1.5 rounded-lg hover:bg-[#eff6ff] hover:text-[#4f46e5] hover:border-[#c7d2fe] transition-all transform active:scale-95 shadow-sm"
                  >
                    + {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#64748b] uppercase tracking-wider mb-2 block">
                Preferred Domain
              </label>
              <div className="relative">
                <select
                  className="w-full bg-[#f8fafc] border border-[#cbd5e1] text-[#0f172a] px-4 py-4 rounded-xl focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all outline-none font-medium appearance-none cursor-pointer"
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  required
                >
                  <option value="">Select your battlefield...</option>
                  <option value="Web Development">Web Development</option>
                  <option value="AI">Artificial Intelligence</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Electronics">Electronics & Hardware</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-[#64748b]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>

            {/* Submit Button: Strong Gradient (Indigo to Violet) - Eye Catching but Pro */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg shadow-[#6366f1]/30 transition-all transform active:scale-[0.99]
                ${loading 
                  ? "bg-[#cbd5e1] text-white cursor-not-allowed shadow-none" 
                  : "bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] text-white hover:to-[#6d28d9] hover:shadow-xl hover:shadow-[#6366f1]/40"
                }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Analyzing Profile...
                </span>
              ) : "Find Matches"}
            </button>
          </form>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mt-6 p-4 bg-[#fef2f2] border border-[#fecaca] rounded-xl text-[#b91c1c] font-semibold flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-[#ef4444] animate-pulse"></div>
             {error}
          </div>
        )}

        {/* RESULTS */}
        {results.length > 0 && (
          <div className="mt-16 space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-[#e2e8f0]">
               <h3 className="text-2xl font-bold text-[#0f172a]">Top Matches</h3>
               <span className="text-xs font-bold text-[#64748b] uppercase tracking-wider bg-[#f1f5f9] px-3 py-1 rounded-full">{results.length} results found</span>
            </div>

            {results.map((item, i) => (
              <div 
                key={i} 
                className="bg-white p-6 md:p-7 rounded-2xl border border-[#e2e8f0] shadow-sm hover:shadow-xl hover:shadow-[#64748b]/10 hover:border-[#c7d2fe] transition-all duration-300 group"
              >

                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#0f172a] group-hover:text-[#4f46e5] transition-colors">{item.role}</h3>
                    {/* Confidence: Dynamic Color based on score */}
                    <p className={`text-xs font-bold uppercase tracking-wide mt-1 ${getScoreColor(item.score)}`}>
                      {getConfidence(item.score)} Match
                    </p>
                  </div>
                  
                  {/* Score Box: Clean White with subtle colored border */}
                  <div className="flex items-center gap-3 bg-[#f8fafc] px-4 py-2 rounded-xl border border-[#e2e8f0]">
                    <div className="text-right">
                      <span className="block text-[10px] font-bold text-[#64748b] uppercase">Fit Score</span>
                      <span className={`block text-xl font-black leading-none ${getScoreColor(item.score)}`}>
                        {item.score}%
                      </span>
                    </div>
                    {/* Dynamic Ring Color */}
                    <div className={`w-8 h-8 rounded-full border-4 border-[#e2e8f0] border-t-current animate-spin-slow ${getScoreColor(item.score)}`}></div>
                  </div>
                </div>

                {/* Progress Bar: Dynamic Gradient */}
                <div className="h-2.5 bg-[#f1f5f9] rounded-full mt-4 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r rounded-full transition-all duration-1000 ease-out ${getProgressBarGradient(item.score)}`}
                    style={{ width: `${item.score}%` }}
                  ></div>
                </div>

                {/* Explainability Tags: Light Cyan/Blue for tech feel */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {skills.split(",").map((s, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-bold bg-[#ecfeff] text-[#0e7490] border border-[#cffafe] px-2.5 py-1 rounded-md flex items-center gap-1"
                    >
                      <span className="text-[#06b6d4]">✓</span> {s.trim()}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-[#475569] mt-4 leading-relaxed bg-[#f8fafc] p-4 rounded-lg border border-[#f1f5f9]">
                  {item.reason}
                </p>

                {/* Ethical Badge: Teal (Transparency) */}
                <div className="mt-4 flex items-center gap-2">
                   <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#f0fdfa] text-[#0f766e] text-[10px] font-bold uppercase border border-[#ccfbf1]">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                      Blind Hiring Protocol
                   </span>
                </div>

                {/* Career Path (Upsell) */}
                <div className="mt-5 pt-5 border-t border-[#f1f5f9]">
                  <p className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider mb-2">
                    Boost your match score
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {SUGGESTED_SKILLS[interest]?.map((s) => (
                      <span key={s} className="text-xs font-medium text-[#c026d3] bg-[#fdf4ff] px-2 py-1 rounded border border-[#fae8ff] hover:border-[#f0abfc] cursor-help">
                        + {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Judge Mode Display */}
                {judgeMode && (
                  <div className="mt-4 text-xs font-mono bg-[#1e293b] text-[#cbd5e1] p-3 rounded-lg border border-[#334155] shadow-inner">
                     Algorithm_Weight: Skill_Overlap(0.7) + Domain_Relevance(0.3)
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-4 mt-6">
                  <button className="flex-1 bg-[#0f172a] text-white py-3 rounded-lg font-bold text-sm hover:bg-[#334155] transition-all shadow-lg shadow-[#0f172a]/20">
                    Apply Now
                  </button>
                  <button
                    onClick={() => saveInternship(item)}
                    className="px-6 py-3 border border-[#cbd5e1] text-[#475569] rounded-lg font-bold text-sm hover:bg-[#f8fafc] hover:text-[#0f172a] hover:border-[#94a3b8] transition-colors"
                  >
                    Save
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}

export default App;