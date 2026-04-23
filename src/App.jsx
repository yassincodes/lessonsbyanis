import { useState } from "react";

const PALETTE = {
  purple: { bg: "#EEEDFE", mid: "#7F77DD", dark: "#3C3489", text: "#26215C" },
  teal:   { bg: "#E1F5EE", mid: "#1D9E75", dark: "#0F6E56", text: "#04342C" },
  coral:  { bg: "#FAECE7", mid: "#D85A30", dark: "#993C1D", text: "#4A1B0C" },
  pink:   { bg: "#FBEAF0", mid: "#D4537E", dark: "#993556", text: "#4B1528" },
  blue:   { bg: "#E6F1FB", mid: "#378ADD", dark: "#185FA5", text: "#042C53" },
  amber:  { bg: "#FAEEDA", mid: "#BA7517", dark: "#854F0B", text: "#412402" },
  green:  { bg: "#EAF3DE", mid: "#639922", dark: "#3B6D11", text: "#173404" },
};

const CONFETTI_COLORS = ["#7F77DD","#1D9E75","#D85A30","#D4537E","#378ADD","#BA7517","#639922"];

const LESSONS = [
  {
    id: 1,
    title: "الْمُنْتَجَاتُ التَّقْلِيدِيَّةُ",
    subtitle: "الحرف والصناعات التونسية",
    icon: "🏺",
    color: "purple",
    totalQ: 7,
    locked: false,
  },
  {
    id: 2,
    title: "الأسرة والمنزل",
    subtitle: "قريبًا — درس جديد!",
    icon: "🏠",
    color: "teal",
    totalQ: 0,
    locked: true,
  },
  {
    id: 3,
    title: "الطبيعة والبيئة",
    subtitle: "قريبًا — درس جديد!",
    icon: "🌿",
    color: "green",
    totalQ: 0,
    locked: true,
  },
];

const QUESTIONS = [
  {
    id: 1, type: "mcq", color: "purple", icon: "🎯", title: "اختر الإجابة الصحيحة",
    q: "مَاذَا أَخْرَجَتْ خَوْلَةُ مِنْ مِحْفَظَتِهَا؟",
    hint: "أَخْرَجَتْ خَوْلَةُ مِنْ مِحْفَظَتِهَا...",
    opts: ["شَمْعَدَانًا مِنَ النُّحَاسِ", "عِقْدًا مِنَ الْمَرْجَانِ", "قُفَّةً مِنَ النَّخِيلِ", "أَوَانِيَ فَخَّارِيَّةً"],
    ans: 1, explain: "✨ أَخْرَجَتْ خَوْلَةُ عِقْدًا مِنَ الْمَرْجَانِ — حُلِيٌّ تُونِسِيٌّ جَمِيلٌ!",
  },
  {
    id: 2, type: "truefalse", color: "coral", icon: "⚖️", title: "صواب أم خطأ؟",
    q: "الشَّمْعَدَانُ الَّذِي وَضَعَهُ مَجْدِي مَصْنُوعٌ مِنَ الذَّهَبِ.",
    hint: "وَضَعَ مَجْدِي شَمْعَدَانًا مِنَ...",
    opts: ["✓  صَوَاب", "✗  خَطَأ"],
    ans: 1, explain: "❌ خَطَأ! الشَّمْعَدَانُ مِنَ النُّحَاسِ الْمَنْقُوشِ وليس الذهب.",
  },
  {
    id: 3, type: "match", color: "teal", icon: "🔗", title: "وصِّل المتشابهات",
    q: "وصِّل كلَّ شخص بما قدَّمه في المعرض",
    pairs: [
      { person: "خَوْلَةُ", item: "عِقْدُ مَرْجَانٍ" },
      { person: "مَجْدِي", item: "شَمْعَدَانٌ نُحَاسِيٌّ" },
      { person: "خَالِدٌ وَأَرِيجُ", item: "قُفَّةٌ فَخَّارِيَّةٌ" },
    ],
    explain: "👏 كلٌّ منهم قدَّم منتجًا تقليديًّا تونسيًّا أصيلًا!",
  },
  {
    id: 4, type: "fill", color: "blue", icon: "✍️", title: "أكمل الجملة",
    q: 'قَالَ الْمُعَلِّمُ: «هَذَا ___ مِمَّا أَبْدَعَتْهُ الْأَيَادِي التُّونِسِيَّةُ.»',
    opts: ["كَثِيرٌ", "قَلِيلٌ", "جَمِيلٌ", "ثَمِينٌ"],
    ans: 1, explain: "💬 قَالَ «قَلِيلٌ» — يعني أن الإبداع التونسي أعظم وأوسع من هذا!",
  },
  {
    id: 5, type: "mcq", color: "amber", icon: "📖", title: "معنى الكلمة",
    q: "ما معنى كلمة «فَخَّارِيَّة»؟",
    hint: "أَوَانِيَ فَخَّارِيَّةً — تُصنع يدويًّا",
    opts: ["مَصنوعة من الزُّجاج", "مَصنوعة من الطِّين المَحروق", "مَصنوعة من الخشب", "مَصنوعة من الحَجَر"],
    ans: 1, explain: "🏺 الفَخَّار هو طينٌ مُشكَّلٌ ومَحروقٌ — من أقدم حِرَف البشرية!",
  },
  {
    id: 6, type: "order", color: "pink", icon: "🔢", title: "رتِّب الجملة",
    q: "رتِّب الكلمات لتكوِّن جملة صحيحة",
    words: ["مُعَلِّمُنَا", "سَأَلَنَا", "التَّقْلِيدِيَّةِ", "لِمَعْرِضِ", "أَعَدَدْتُمْ", "مَاذَا"],
    correct: ["سَأَلَنَا", "مُعَلِّمُنَا", "مَاذَا", "أَعَدَدْتُمْ", "لِمَعْرِضِ", "التَّقْلِيدِيَّةِ"],
    explain: "🌟 سَأَلَنَا مُعَلِّمُنَا: مَاذَا أَعَدَدْتُمْ لِمَعْرِضِ التَّقْلِيدِيَّةِ",
  },
  {
    id: 7, type: "mcq", color: "green", icon: "🧠", title: "سؤال التحدي",
    q: "مِمَّ صُنِعَتِ الْقُفَّةُ الَّتِي حَمَلَهَا خَالِدٌ وَأَرِيجُ؟",
    hint: "قُفَّةً مِنْ...",
    opts: ["مِنَ الْقُطْنِ", "مِنَ الصُّوفِ", "مِنْ سَعَفِ النَّخِيلِ", "مِنَ الْجِلْدِ"],
    ans: 2, explain: "🌴 مِنْ سَعَفِ النَّخِيلِ — حِرْفَةٌ تونسيَّةٌ أصيلة جميلة!",
  },
];

function Confetti({ active }) {
  if (!active) return null;
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", borderRadius: 20 }}>
      {Array.from({ length: 20 }, (_, i) => (
        <div key={i} style={{
          position: "absolute", left: `${(i * 37 + 10) % 100}%`, top: "-10px",
          width: 10, height: 10, borderRadius: i % 2 === 0 ? "50%" : 2,
          background: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
          animation: `fall ${1.2 + (i % 5) * 0.2}s ease-in forwards`,
          animationDelay: `${(i % 6) * 0.1}s`,
        }} />
      ))}
    </div>
  );
}

function HomeScreen({ onStart }) {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", direction: "rtl", minHeight: 500 }}>
      <div style={{
        background: "linear-gradient(135deg, #7F77DD 0%, #D4537E 100%)",
        borderRadius: "0 0 32px 32px", padding: "36px 24px 40px", textAlign: "center", marginBottom: 24,
      }}>
        <div style={{ fontSize: 48, marginBottom: 10 }}>🦜</div>
        <div style={{ fontSize: 28, fontWeight: 800, color: "#fff", letterSpacing: 1 }}>دروس أنيس</div>
        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.82)", marginTop: 6 }}>
          منصَّة تعليم اللغة العربية
        </div>
      </div>

      <div style={{ padding: "0 16px 24px" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#888780", marginBottom: 14, letterSpacing: 1 }}>
          الدُّرُوس المتاحة
        </div>

        {LESSONS.map((lesson) => {
          const pal = PALETTE[lesson.color];
          return (
            <div key={lesson.id} onClick={() => !lesson.locked && onStart(lesson)}
              style={{
                background: lesson.locked ? "#F1EFE8" : "#fff",
                border: lesson.locked ? "2px solid #E0DDD8" : `2px solid ${pal.bg}`,
                borderRadius: 20, padding: "18px 20px", marginBottom: 14,
                cursor: lesson.locked ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", gap: 16,
                opacity: lesson.locked ? 0.6 : 1,
                transition: "transform 0.15s, box-shadow 0.15s",
              }}
              onMouseEnter={e => { if (!lesson.locked) e.currentTarget.style.transform = "scale(1.01)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
            >
              <div style={{
                width: 56, height: 56, borderRadius: 16,
                background: lesson.locked ? "#D3D1C7" : pal.bg,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 28, flexShrink: 0,
              }}>
                {lesson.locked ? "🔒" : lesson.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 17, fontWeight: 700, color: lesson.locked ? "#888780" : "#2C2C2A", marginBottom: 3 }}>
                  {lesson.title}
                </div>
                <div style={{ fontSize: 13, color: "#888780" }}>{lesson.subtitle}</div>
                {!lesson.locked && (
                  <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                    {Array.from({ length: lesson.totalQ }, (_, i) => (
                      <div key={i} style={{
                        width: 8, height: 8, borderRadius: "50%",
                        background: pal.mid,
                      }} />
                    ))}
                  </div>
                )}
              </div>
              {!lesson.locked && (
                <div style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: pal.mid, display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18, color: "#fff", flexShrink: 0,
                }}>←</div>
              )}
            </div>
          );
        })}

        <div style={{
          background: "#FAEEDA", borderRadius: 16, padding: "14px 18px",
          display: "flex", alignItems: "center", gap: 12, marginTop: 8,
        }}>
          <span style={{ fontSize: 24 }}>👨‍🏫</span>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#412402" }}>مرحبًا من المعلم أنيس!</div>
            <div style={{ fontSize: 12, color: "#854F0B" }}>تعلَّموا بمتعة وسيأتي الفهمُ بالتدريب</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MCQGame({ q, onResult }) {
  const [selected, setSelected] = useState(null);
  const pal = PALETTE[q.color];
  const pick = (i) => {
    if (selected !== null) return;
    setSelected(i);
    setTimeout(() => onResult(i === q.ans, q.explain), 900);
  };
  return (
    <div>
      <div style={{ background: pal.bg, borderRadius: 16, padding: "16px 18px", marginBottom: 18, textAlign: "right" }}>
        {q.hint && <div style={{ fontSize: 12, color: pal.dark, marginBottom: 5, fontWeight: 500 }}>{q.hint}</div>}
        <div style={{ fontSize: 18, fontWeight: 700, color: pal.text, lineHeight: 1.8 }}>{q.q}</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {q.opts.map((opt, i) => {
          let bg = "#fff", border = "2px solid #E0DDD8", color = "#2C2C2A";
          if (selected !== null) {
            if (i === q.ans) { bg = pal.bg; border = `2px solid ${pal.mid}`; color = pal.text; }
            else if (i === selected) { bg = "#FCEBEB"; border = "2px solid #E24B4A"; color = "#501313"; }
          }
          return (
            <button key={i} onClick={() => pick(i)} disabled={selected !== null} style={{
              background: bg, border, borderRadius: 14, padding: "14px 12px",
              fontSize: 14, color, cursor: selected !== null ? "default" : "pointer",
              textAlign: "right", fontFamily: "inherit", lineHeight: 1.6, fontWeight: 600,
              transition: "all 0.2s",
            }}>{opt}</button>
          );
        })}
      </div>
    </div>
  );
}

function TrueFalseGame({ q, onResult }) {
  const [selected, setSelected] = useState(null);
  const pal = PALETTE[q.color];
  const pick = (i) => {
    if (selected !== null) return;
    setSelected(i);
    setTimeout(() => onResult(i === q.ans, q.explain), 900);
  };
  return (
    <div>
      <div style={{ background: pal.bg, borderRadius: 16, padding: "20px", marginBottom: 24, textAlign: "center" }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: pal.text, lineHeight: 1.8 }}>{q.q}</div>
        {q.hint && <div style={{ fontSize: 13, color: pal.dark, marginTop: 8 }}>{q.hint}</div>}
      </div>
      <div style={{ display: "flex", gap: 14 }}>
        {q.opts.map((opt, i) => {
          const colors = ["#1D9E75", "#E24B4A"];
          let bg = colors[i], txtCol = "#fff";
          if (selected !== null && i !== q.ans) { bg = "#D3D1C7"; txtCol = "#5F5E5A"; }
          return (
            <button key={i} onClick={() => pick(i)} disabled={selected !== null} style={{
              flex: 1, padding: "22px 16px", borderRadius: 18, border: "none",
              background: bg, color: txtCol, fontSize: 18, fontWeight: 700,
              cursor: selected !== null ? "default" : "pointer", fontFamily: "inherit",
              transition: "all 0.25s",
            }}>{opt}</button>
          );
        })}
      </div>
    </div>
  );
}

function MatchGame({ q, onResult }) {
  const pal = PALETTE[q.color];
  const [matched, setMatched] = useState({});
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [shuffledItems] = useState(() => [...q.pairs].sort(() => Math.random() - 0.5).map(p => p.item));

  const pickPerson = (i) => {
    if (matched[i]) return;
    setSelectedPerson(i === selectedPerson ? null : i);
  };
  const pickItem = (item) => {
    if (selectedPerson === null || Object.values(matched).includes(item)) return;
    const newMatched = { ...matched, [selectedPerson]: item };
    setMatched(newMatched);
    setSelectedPerson(null);
    if (Object.keys(newMatched).length === q.pairs.length) {
      const allCorrect = q.pairs.every((p, i) => newMatched[i] === p.item);
      setTimeout(() => onResult(allCorrect, q.explain), 600);
    }
  };
  const isItemUsed = (item) => Object.values(matched).includes(item);

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 14, fontSize: 14, color: "#5F5E5A" }}>
        {selectedPerson !== null ? `اخترت: ${q.pairs[selectedPerson].person} — الآن اختر ما قدَّمه` : "اضغط على شخص ثم على ما قدَّمه"}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {q.pairs.map((pair, i) => (
            <button key={i} onClick={() => pickPerson(i)} disabled={!!matched[i]} style={{
              padding: "16px 12px", borderRadius: 14, fontFamily: "inherit",
              border: selectedPerson === i ? `3px solid ${pal.mid}` : matched[i] ? "2px solid #1D9E75" : "2px solid #D3D1C7",
              background: matched[i] ? "#E1F5EE" : selectedPerson === i ? pal.bg : "#fff",
              color: matched[i] ? "#04342C" : pal.text, fontSize: 15, fontWeight: 700,
              cursor: matched[i] ? "default" : "pointer", transition: "all 0.2s",
              transform: selectedPerson === i ? "scale(1.04)" : "scale(1)",
            }}>
              {pair.person}
              {matched[i] && <div style={{ fontSize: 11, marginTop: 3, color: "#1D9E75" }}>✓</div>}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {shuffledItems.map((item, i) => (
            <button key={i} onClick={() => pickItem(item)} disabled={isItemUsed(item) || selectedPerson === null} style={{
              padding: "16px 12px", borderRadius: 14, fontFamily: "inherit",
              border: isItemUsed(item) ? "2px solid #1D9E75" : selectedPerson !== null ? `2px solid ${pal.mid}` : "2px solid #D3D1C7",
              background: isItemUsed(item) ? "#E1F5EE" : selectedPerson !== null ? pal.bg : "#F1EFE8",
              color: isItemUsed(item) ? "#04342C" : "#2C2C2A", fontSize: 13, fontWeight: 600,
              cursor: (isItemUsed(item) || selectedPerson === null) ? "default" : "pointer", transition: "all 0.2s",
              fontFamily: "inherit",
            }}>{item}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

function FillGame({ q, onResult }) {
  const pal = PALETTE[q.color];
  const [selected, setSelected] = useState(null);
  const pick = (i) => {
    if (selected !== null) return;
    setSelected(i);
    setTimeout(() => onResult(i === q.ans, q.explain), 900);
  };
  return (
    <div>
      <div style={{ background: pal.bg, borderRadius: 16, padding: "20px", marginBottom: 22, textAlign: "right" }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: pal.text, lineHeight: 2 }}>
          {q.q.split("___").map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && (
                <span style={{
                  display: "inline-block", minWidth: 80, borderBottom: `3px solid ${pal.mid}`,
                  margin: "0 6px", textAlign: "center", color: selected !== null ? pal.mid : "transparent", fontSize: 17,
                }}>
                  {selected !== null ? q.opts[selected] : "____"}
                </span>
              )}
            </span>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {q.opts.map((opt, i) => {
          let bg = "#fff", border = "2px solid #E0DDD8", color = "#2C2C2A";
          if (selected !== null) {
            if (i === q.ans) { bg = pal.bg; border = `2px solid ${pal.mid}`; color = pal.text; }
            else if (i === selected) { bg = "#FCEBEB"; border = "2px solid #E24B4A"; color = "#501313"; }
          }
          return (
            <button key={i} onClick={() => pick(i)} disabled={selected !== null} style={{
              padding: "14px", borderRadius: 14, border, background: bg, color,
              fontSize: 15, fontWeight: 600, cursor: selected !== null ? "default" : "pointer",
              fontFamily: "inherit", transition: "all 0.2s",
            }}>{opt}</button>
          );
        })}
      </div>
    </div>
  );
}

function OrderGame({ q, onResult }) {
  const pal = PALETTE[q.color];
  const [shuffled] = useState(() => [...q.words].sort(() => Math.random() - 0.5));
  const [chosen, setChosen] = useState([]);
  const [remaining, setRemaining] = useState(shuffled);
  const [submitted, setSubmitted] = useState(false);

  const add = (word) => {
    if (submitted) return;
    setChosen([...chosen, word]);
    setRemaining(remaining.filter(w => w !== word));
  };
  const remove = (i) => {
    if (submitted) return;
    const word = chosen[i];
    setChosen(chosen.filter((_, idx) => idx !== i));
    setRemaining([...remaining, word]);
  };
  const check = () => {
    setSubmitted(true);
    const isCorrect = chosen.join(" ") === q.correct.join(" ");
    setTimeout(() => onResult(isCorrect, q.explain), 700);
  };

  return (
    <div>
      <div style={{ background: pal.bg, borderRadius: 14, padding: "12px 16px", marginBottom: 16, textAlign: "right" }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: pal.text }}>{q.q}</div>
      </div>
      <div style={{
        minHeight: 54, background: "#F1EFE8", borderRadius: 14, padding: "10px 12px",
        marginBottom: 12, display: "flex", flexWrap: "wrap", gap: 8, flexDirection: "row-reverse",
        border: "2px dashed #D3D1C7", alignContent: "flex-start",
      }}>
        {chosen.length === 0 && <span style={{ color: "#B4B2A9", fontSize: 13 }}>اضغط على الكلمات أدناه...</span>}
        {chosen.map((w, i) => (
          <button key={i} onClick={() => remove(i)} disabled={submitted} style={{
            padding: "7px 13px", borderRadius: 99, background: pal.mid, color: "#fff",
            border: "none", fontSize: 13, fontWeight: 600, cursor: submitted ? "default" : "pointer",
            fontFamily: "inherit",
          }}>{w}</button>
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14, flexDirection: "row-reverse" }}>
        {remaining.map((w, i) => (
          <button key={i} onClick={() => add(w)} style={{
            padding: "7px 13px", borderRadius: 99, background: "#fff",
            border: `2px solid ${pal.mid}`, color: pal.dark, fontSize: 13, fontWeight: 600,
            cursor: "pointer", fontFamily: "inherit",
          }}>{w}</button>
        ))}
      </div>
      {chosen.length === q.words.length && !submitted && (
        <button onClick={check} style={{
          width: "100%", padding: "13px", borderRadius: 14, border: "none",
          background: pal.mid, color: "#fff", fontSize: 15, fontWeight: 700,
          cursor: "pointer", fontFamily: "inherit",
        }}>تحقَّق ✓</button>
      )}
    </div>
  );
}

function FeedbackBanner({ correct, explain, onNext, isLast }) {
  return (
    <div style={{
      background: correct ? "#E1F5EE" : "#FCEBEB",
      border: `2px solid ${correct ? "#1D9E75" : "#E24B4A"}`,
      borderRadius: 16, padding: "14px 18px", marginTop: 16,
    }}>
      <div style={{ fontSize: 20, marginBottom: 5 }}>{correct ? "🎉 ممتاز!" : "💡 إجابة خاطئة!"}</div>
      <div style={{ fontSize: 14, color: correct ? "#085041" : "#791F1F", lineHeight: 1.7, textAlign: "right", marginBottom: 12 }}>{explain}</div>
      <button onClick={onNext} style={{
        width: "100%", padding: "12px", borderRadius: 12, border: "none",
        background: correct ? "#1D9E75" : "#E24B4A", color: "#fff",
        fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
      }}>
        {isLast ? "🏁 انظر نتيجتك!" : "التالي ←"}
      </button>
    </div>
  );
}

function ResultScreen({ score, total, lesson, onHome, onRetry }) {
  const pct = score / total;
  const stars = pct === 1 ? 3 : pct >= 0.7 ? 2 : 1;

  const starMessages = [
    "لقد جمعنا اليوم نقاطًا رائعة!",
    "عمل ممتاز في هذا الدرس!",
    "مثالي! أنت بطل اللغة العربية!",
  ];

  const msg = pct === 1 ? "مثالي تمامًا! 🏆" : pct >= 0.7 ? "أداء رائع! 🎉" : "لا بأس، التدريب يصنع الفارق! 💪";

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", direction: "rtl", padding: "0 0 24px" }}>
      <div style={{
        background: "linear-gradient(135deg, #7F77DD 0%, #D4537E 100%)",
        borderRadius: "0 0 32px 32px", padding: "32px 24px 36px", textAlign: "center", marginBottom: 24,
      }}>
        <div style={{ fontSize: 52, marginBottom: 10 }}>{pct === 1 ? "🏆" : pct >= 0.7 ? "🎉" : "💪"}</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>{msg}</div>
        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", marginTop: 6 }}>{lesson.title}</div>
      </div>

      <div style={{ padding: "0 16px" }}>
        <div style={{
          background: "#EEEDFE", borderRadius: 20, padding: "24px", textAlign: "center", marginBottom: 18,
        }}>
          <div style={{ fontSize: 13, color: "#534AB7", fontWeight: 600, marginBottom: 6 }}>
            لقد جمعنا اليوم
          </div>
          <div style={{ fontSize: 52, fontWeight: 800, color: "#3C3489" }}>
            {score} <span style={{ fontSize: 24 }}>/ {total}</span>
          </div>
          <div style={{ fontSize: 16, color: "#7F77DD", marginTop: 4, fontWeight: 600 }}>
            نقطة ⭐
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 14 }}>
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} style={{
                fontSize: 34, opacity: i < stars ? 1 : 0.18,
                transform: i < stars ? "scale(1.1)" : "scale(0.9)",
                transition: "all 0.3s",
              }}>⭐</div>
            ))}
          </div>
        </div>

        <div style={{
          background: "#FAEEDA", borderRadius: 16, padding: "16px 18px", marginBottom: 18,
          display: "flex", gap: 12, alignItems: "flex-start",
        }}>
          <span style={{ fontSize: 26 }}>👨‍🏫</span>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#412402", marginBottom: 3 }}>
              رسالة المعلم أنيس
            </div>
            <div style={{ fontSize: 13, color: "#854F0B", lineHeight: 1.7 }}>
              {pct === 1
                ? "أحسنتَ! لقد أتقنتَ هذا الدرس بجدارة. استمر هكذا وستصبح بطلًا في اللغة العربية!"
                : pct >= 0.7
                ? "جهد جميل! أنت في الطريق الصحيح. راجع الإجابات الخاطئة وستتحسن أكثر."
                : "لا تيأس! كل تعلُّم يبدأ بخطوة. أعد المحاولة وستجد الفرق بنفسك!"}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={onRetry} style={{
            flex: 1, padding: "14px", borderRadius: 14, border: "2px solid #7F77DD",
            background: "#EEEDFE", color: "#26215C", fontSize: 15, fontWeight: 700,
            cursor: "pointer", fontFamily: "inherit",
          }}>🔄 أعد المحاولة</button>
          <button onClick={onHome} style={{
            flex: 1, padding: "14px", borderRadius: 14, border: "none",
            background: "linear-gradient(135deg, #7F77DD, #D4537E)", color: "#fff",
            fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
          }}>🏠 الرئيسية</button>
        </div>
      </div>
    </div>
  );
}

function GameScreen({ lesson, onFinish, onHome }) {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [key, setKey] = useState(0);

  const q = QUESTIONS[current];
  const pal = PALETTE[q.color];
  const total = QUESTIONS.length;

  const handleResult = (correct, explain) => {
    if (correct) {
      setScore(s => s + 1);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1800);
    }
    setFeedback({ correct, explain });
  };

  const handleNext = () => {
    setFeedback(null);
    if (current + 1 >= total) {
      onFinish(score + (feedback?.correct ? 1 : 0));
    } else {
      setCurrent(c => c + 1);
      setKey(k => k + 1);
    }
  };

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", direction: "rtl", padding: "14px 16px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <button onClick={onHome} style={{
          width: 36, height: 36, borderRadius: "50%", border: "2px solid #D3D1C7",
          background: "#fff", cursor: "pointer", fontSize: 16, display: "flex",
          alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>✕</button>
        <div style={{ flex: 1, height: 12, background: "#F1EFE8", borderRadius: 99, overflow: "hidden" }}>
          <div style={{
            height: "100%", borderRadius: 99,
            background: `linear-gradient(90deg, ${pal.mid}, #D4537E)`,
            width: `${(current / total) * 100}%`, transition: "width 0.5s ease",
          }} />
        </div>
        <div style={{ fontSize: 13, color: "#1D9E75", fontWeight: 700, flexShrink: 0 }}>
          ⭐ {score}
        </div>
      </div>

      <div key={key} style={{
        background: "#fff", borderRadius: 20, padding: "18px",
        border: `2px solid ${pal.bg}`, position: "relative", overflow: "hidden",
        animation: "pop 0.3s ease",
      }}>
        <Confetti active={showConfetti} />
        <div style={{
          display: "flex", alignItems: "center", gap: 10, marginBottom: 16,
          background: pal.bg, borderRadius: 12, padding: "10px 14px",
        }}>
          <span style={{ fontSize: 20 }}>{q.icon}</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: pal.dark }}>{q.title}</span>
          <span style={{
            marginRight: "auto", fontSize: 11, background: pal.mid, color: "#fff",
            borderRadius: 99, padding: "2px 9px", fontWeight: 600,
          }}>{current + 1}/{total}</span>
        </div>

        {(q.type === "mcq" || q.type === "word_meaning") && <MCQGame key={key} q={q} onResult={handleResult} />}
        {q.type === "truefalse" && <TrueFalseGame key={key} q={q} onResult={handleResult} />}
        {q.type === "match" && <MatchGame key={key} q={q} onResult={handleResult} />}
        {q.type === "fill" && <FillGame key={key} q={q} onResult={handleResult} />}
        {q.type === "order" && <OrderGame key={key} q={q} onResult={handleResult} />}

        {feedback && (
          <FeedbackBanner
            correct={feedback.correct}
            explain={feedback.explain}
            onNext={handleNext}
            isLast={current + 1 >= total}
          />
        )}
      </div>
    </div>
  );
}

export default function AnisApp() {
  const [screen, setScreen] = useState("home");
  const [activeLesson, setActiveLesson] = useState(null);
  const [finalScore, setFinalScore] = useState(0);

  const startLesson = (lesson) => {
    setActiveLesson(lesson);
    setScreen("game");
  };

  const finishGame = (score) => {
    setFinalScore(score);
    setScreen("result");
  };

  return (
    <div style={{ maxWidth: 520, margin: "0 auto" }}>
      <style>{`
        @keyframes fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(400px) rotate(360deg); opacity: 0; }
        }
        @keyframes pop {
          0% { transform: scale(0.92); opacity: 0; }
          60% { transform: scale(1.03); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>

      {screen === "home" && <HomeScreen onStart={startLesson} />}
      {screen === "game" && (
        <GameScreen
          lesson={activeLesson}
          onFinish={finishGame}
          onHome={() => setScreen("home")}
        />
      )}
      {screen === "result" && (
        <ResultScreen
          score={finalScore}
          total={QUESTIONS.length}
          lesson={activeLesson}
          onHome={() => setScreen("home")}
          onRetry={() => { setScreen("game"); }}
        />
      )}
    </div>
  );
}