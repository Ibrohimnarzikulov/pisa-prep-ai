import React, { useState } from "react";
import {
  Flame, Zap, Globe, WifiOff, Wifi, ChevronRight, ChevronDown, CheckCircle2, XCircle,
  Download, AlertTriangle, FileText, Type, Home, ClipboardList,
  Users, Sparkles, Clock, HelpCircle, ArrowRight, Bell, Bot, Trophy,
  Target, Search, Lightbulb, BarChart3, TrendingUp, Calendar, Settings,
  Award, Quote, ArrowUp, BookOpen
} from "lucide-react";

/* ---------------------------------------------------------------
   DESIGN TOKENS — restyled to match the requested reference look
--------------------------------------------------------------- */
const C = {
  primary600: "#059669",
  primary500: "#10B981",
  primary700: "#047857",
  primary50: "#ECFDF5",
  primary100: "#D1FAE5",
  amber: "#D97706",
  amberBg: "#FEF3C7",
  purple: "#7C3AED",
  purpleBg: "#EDE9FE",
  blue: "#2563EB",
  blueBg: "#DBEAFE",
  success: "#10B981",
  successBg: "#F0FDF4",
  error: "#DC2626",
  errorBg: "#FEE2E2",
  warning: "#F97316",
  offline: "#64748B",
  bg: "#F9FAFB",
  surface: "#FFFFFF",
  border: "#EEF1F4",
  textPrimary: "#111827",
  textSecondary: "#6B7280",
};

const uiFont = "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif";
const passageFontSerif = "'Merriweather', Georgia, serif";

const SKILLS = [
  { key: "locating", label: "Ma'lumotni topish", short: "Topish" },
  { key: "understanding", label: "Tushunish", short: "Tushunish" },
  { key: "evaluating", label: "Baholash va fikr bildirish", short: "Baholash" },
  { key: "structure", label: "Matn tuzilishini anglash", short: "Tuzilish" },
];

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", sub: "Bosh sahifa", icon: Home },
  { id: "practice-launch", label: "Practice", sub: "Mashqlar", icon: Sparkles },
  { id: "diag-results", label: "My Progress", sub: "Natijalarim", icon: BarChart3 },
  { id: "diag-question", label: "Tests", sub: "PISA uslubida", icon: ClipboardList },
  { id: "practice-summary", label: "Achievements", sub: "Yutuqlarim", icon: Award },
  { id: "teacher", label: "Teacher panel", sub: "O'qituvchi uchun", icon: Users },
];

/* ---------------------------------------------------------------
   SHARED UI ATOMS
--------------------------------------------------------------- */
function Pill({ children, style, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${className}`}
      style={style}
    >
      {children}
    </span>
  );
}

function PrimaryButton({ children, onClick, disabled, full }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold text-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed ${full ? "w-full" : ""}`}
      style={{
        background: disabled ? "#94A3B8" : C.primary600,
        color: "#fff",
        boxShadow: disabled ? "none" : "0 4px 14px rgba(5,150,105,0.25)",
      }}
    >
      {children}
    </button>
  );
}

function Card({ children, className = "", style }) {
  return (
    <div
      className={`rounded-2xl border ${className}`}
      style={{ background: C.surface, borderColor: C.border, boxShadow: "0 1px 2px rgba(16,24,40,0.04)", ...style }}
    >
      {children}
    </div>
  );
}

/* Semi-circular readiness gauge — signature element */
function ReadinessGauge({ percent = 64 }) {
  const cx = 100, cy = 105, r = 88;
  const theta = 180 - (percent / 100) * 180;
  const rad = (theta * Math.PI) / 180;
  const mx = cx + r * Math.cos(rad);
  const my = cy - r * Math.sin(rad);
  const circumference = Math.PI * r;
  const offset = circumference * (1 - percent / 100);

  return (
    <div className="relative w-full flex items-center justify-center" style={{ maxWidth: 220 }}>
      <svg viewBox="0 0 200 120" className="w-full">
        <path
          d={`M ${cx - r},${cy} A ${r},${r} 0 0 1 ${cx + r},${cy}`}
          fill="none"
          stroke="#EEF1F4"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          d={`M ${cx - r},${cy} A ${r},${r} 0 0 1 ${cx + r},${cy}`}
          fill="none"
          stroke={C.primary600}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
        <circle cx={mx} cy={my} r="8" fill="#fff" stroke={C.primary600} strokeWidth="4" />
      </svg>
      <div
        className="absolute rounded-full flex items-center justify-center"
        style={{ width: 46, height: 46, background: C.primary50, top: "42%" }}
      >
        <TrendingUp size={20} color={C.primary600} />
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   SIDEBAR
--------------------------------------------------------------- */
function Sidebar({ screen, setScreen }) {
  return (
    <aside
      className="hidden lg:flex flex-col w-64 shrink-0 border-r px-4 py-5"
      style={{ background: C.surface, borderColor: C.border, fontFamily: uiFont }}
    >
      <div className="flex items-center gap-2.5 px-2 mb-8">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: C.primary600 }}
        >
          <BookOpen size={19} color="#fff" />
        </div>
        <div className="leading-tight">
          <div className="font-bold text-sm" style={{ color: C.textPrimary }}>PISA Prep AI</div>
          <div className="text-xs" style={{ color: C.textSecondary }}>Sizning AI repetitoringiz</div>
        </div>
      </div>

      <nav className="space-y-1 flex-1">
        {NAV_ITEMS.map((item) => {
          const active = screen === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setScreen(item.id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150"
              style={{ background: active ? C.primary50 : "transparent" }}
            >
              <Icon size={18} color={active ? C.primary700 : C.textSecondary} />
              <div className="leading-tight">
                <div className="text-sm font-semibold" style={{ color: active ? C.primary700 : C.textPrimary }}>
                  {item.label}
                </div>
                <div className="text-xs" style={{ color: active ? C.primary600 : C.textSecondary }}>
                  {item.sub}
                </div>
              </div>
            </button>
          );
        })}
        <button
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left"
        >
          <Settings size={18} color={C.textSecondary} />
          <div className="leading-tight">
            <div className="text-sm font-semibold" style={{ color: C.textPrimary }}>Settings</div>
            <div className="text-xs" style={{ color: C.textSecondary }}>Sozlamalar</div>
          </div>
        </button>
      </nav>

      <div
        className="rounded-2xl p-4 text-center mt-4"
        style={{ background: "linear-gradient(160deg, #FFFBEB, #ECFDF5)" }}
      >
        <div
          className="w-11 h-11 rounded-full mx-auto flex items-center justify-center mb-2"
          style={{ background: "#FEF3C7" }}
        >
          <Trophy size={20} color={C.amber} />
        </div>
        <p className="text-xs font-medium mb-3" style={{ color: C.textPrimary }}>
          O'z maqsadingizga bir qadam yaqinroqsiz!
        </p>
        <button
          className="w-full rounded-xl py-2 text-xs font-semibold"
          style={{ background: C.primary600, color: "#fff" }}
        >
          Davom eting!
        </button>
      </div>
    </aside>
  );
}

/* Mobile fallback nav */
function MobileNav({ screen, setScreen }) {
  return (
    <div
      className="flex lg:hidden gap-2 overflow-x-auto px-4 py-3 border-b"
      style={{ background: C.surface, borderColor: C.border }}
    >
      {NAV_ITEMS.map((item) => {
        const active = screen === item.id;
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => setScreen(item.id)}
            className="flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{
              background: active ? C.primary600 : C.bg,
              color: active ? "#fff" : C.textSecondary,
            }}
          >
            <Icon size={13} />
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

/* ---------------------------------------------------------------
   TOP BAR
--------------------------------------------------------------- */
function TopBar({ title, subtitle, isOffline, setIsOffline, lang, setLang }) {
  return (
    <div className="flex items-center justify-between gap-4 mb-6" style={{ fontFamily: uiFont }}>
      <div>
        <h1 className="text-2xl font-bold" style={{ color: C.textPrimary }}>{title}</h1>
        {subtitle && <p className="text-sm mt-0.5" style={{ color: C.textSecondary }}>{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={() => setIsOffline(!isOffline)}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border"
          style={{ borderColor: C.border, color: isOffline ? C.offline : C.primary600 }}
        >
          {isOffline ? <WifiOff size={13} /> : <Wifi size={13} />}
          {isOffline ? "Oflayn" : "Onlayn"}
        </button>
        <button
          onClick={() => setLang(lang === "UZ" ? "RU" : "UZ")}
          className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border"
          style={{ borderColor: C.border, color: C.textSecondary }}
        >
          <Globe size={13} /> {lang}
        </button>
        <button
          className="relative w-9 h-9 rounded-full flex items-center justify-center border"
          style={{ borderColor: C.border }}
        >
          <Bell size={16} color={C.textSecondary} />
          <span
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center"
            style={{ background: C.error, color: "#fff" }}
          >
            2
          </span>
        </button>
        <div className="flex items-center gap-2">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ background: C.purpleBg, color: C.purple }}
          >
            M
          </div>
          <div className="hidden sm:block leading-tight">
            <div className="text-sm font-semibold" style={{ color: C.textPrimary }}>Malika</div>
            <div className="text-xs" style={{ color: C.textSecondary }}>9-sinf</div>
          </div>
          <ChevronDown size={14} color={C.textSecondary} className="hidden sm:block" />
        </div>
      </div>
      {isOffline && (
        <div className="hidden" />
      )}
    </div>
  );
}

/* ---------------------------------------------------------------
   SCREEN: Student Dashboard (matches reference screenshot)
--------------------------------------------------------------- */
function StudentDashboard({ setScreen }) {
  const skills = [
    { label: "Asosiy g'oyani topish", pct: 78, icon: Target, iconBg: C.primary100, iconColor: C.primary700 },
    { label: "Dalil topish", pct: 56, icon: Search, iconBg: C.amberBg, iconColor: C.amber },
    { label: "Xulosa chiqarish", pct: 41, icon: Lightbulb, iconBg: C.errorBg, iconColor: C.error },
    { label: "Grafik / jadvalni tushunish", pct: 72, icon: BarChart3, iconBg: C.blueBg, iconColor: C.blue },
  ];
  const statusFor = (pct) => {
    if (pct >= 70) return { label: "Yaxshi", bg: C.successBg, color: C.success };
    if (pct >= 40) return { label: "O'rtacha", bg: C.amberBg, color: C.amber };
    return { label: "Zaif", bg: C.errorBg, color: C.error };
  };
  const results = [
    { name: "Reading Practice #12", date: "12-may, 2025", score: 80 },
    { name: "Reading Practice #11", date: "10-may, 2025", score: 60 },
    { name: "Reading Practice #10", date: "8-may, 2025", score: 70 },
  ];
  const scoreColor = (s) => (s >= 70 ? C.success : s >= 50 ? C.amber : C.error);

  return (
    <div style={{ fontFamily: uiFont }}>
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: C.textPrimary }}>Salom, Malika! 👋</h1>
          <p className="text-sm mt-0.5" style={{ color: C.textSecondary }}>
            Bugun ham o'qish ko'nikmalaringizni rivojlantiramiz.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button className="relative w-9 h-9 rounded-full flex items-center justify-center border" style={{ borderColor: C.border }}>
            <Bell size={16} color={C.textSecondary} />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center" style={{ background: C.error, color: "#fff" }}>2</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: C.purpleBg, color: C.purple }}>M</div>
            <div className="hidden sm:block leading-tight">
              <div className="text-sm font-semibold" style={{ color: C.textPrimary }}>Malika</div>
              <div className="text-xs" style={{ color: C.textSecondary }}>9-sinf</div>
            </div>
            <ChevronDown size={14} color={C.textSecondary} className="hidden sm:block" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* LEFT / MAIN COLUMN */}
        <div className="lg:col-span-2 space-y-5">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-semibold" style={{ color: C.textPrimary }}>PISA Readiness</span>
              <span
                className="w-4 h-4 rounded-full text-[10px] flex items-center justify-center border"
                style={{ color: C.textSecondary, borderColor: C.border }}
              >
                i
              </span>
            </div>
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
              <div>
                <div className="text-5xl font-bold" style={{ color: C.primary600 }}>64%</div>
                <div className="text-sm mt-1" style={{ color: C.textSecondary }}>Umumiy tayyorgarlik darajasi</div>
                <div className="flex items-center gap-1 mt-3 text-sm font-semibold" style={{ color: C.success }}>
                  <ArrowUp size={14} /> 8% bu hafta
                </div>
                <div className="text-xs mt-2" style={{ color: C.textSecondary }}>Oxirgi test: 12-may, 2025</div>
              </div>
              <div className="text-center">
                <ReadinessGauge percent={64} />
                <div className="text-sm font-medium -mt-2" style={{ color: C.textSecondary }}>Maqsad: 85%</div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold" style={{ color: C.textPrimary }}>Sizning ko'nikmalaringiz</span>
              <span
                className="w-4 h-4 rounded-full text-[10px] flex items-center justify-center border"
                style={{ color: C.textSecondary, borderColor: C.border }}
              >
                i
              </span>
            </div>
            <div className="space-y-4">
              {skills.map((s, i) => {
                const status = statusFor(s.pct);
                const Icon = s.icon;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: s.iconBg }}
                    >
                      <Icon size={16} color={s.iconColor} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium mb-1.5" style={{ color: C.textPrimary }}>{s.label}</div>
                      <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "#F1F5F9" }}>
                        <div className="h-2 rounded-full" style={{ width: `${s.pct}%`, background: s.iconColor }} />
                      </div>
                    </div>
                    <div className="text-sm font-bold w-10 text-right shrink-0" style={{ color: C.textPrimary }}>{s.pct}%</div>
                    <Pill style={{ background: status.bg, color: status.color }} className="shrink-0">{status.label}</Pill>
                  </div>
                );
              })}
            </div>
            <button
              onClick={() => setScreen("diag-results")}
              className="text-sm font-semibold mt-4 flex items-center gap-1"
              style={{ color: C.primary600 }}
            >
              Barcha ko'nikmalar tahlili <ArrowRight size={14} />
            </button>
          </Card>

          <Card className="p-5" style={{ background: C.primary50, borderColor: C.primary100 }}>
            <div className="flex items-start sm:items-center gap-4 flex-col sm:flex-row">
              <div className="flex items-start gap-3 flex-1">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#fff" }}>
                  <Target size={18} color={C.error} />
                </div>
                <div>
                  <div className="text-sm font-semibold flex items-center gap-1" style={{ color: C.textPrimary }}>
                    AI tavsiyasi <Sparkles size={13} color={C.amber} />
                  </div>
                  <p className="text-sm mt-0.5" style={{ color: C.textSecondary }}>
                    Sizning asosiy zaif tomoningiz — "Xulosa chiqarish". Shu ko'nikmani rivojlantirish sizga PISA natijangizni oshirishda eng katta yordam beradi.
                  </p>
                </div>
              </div>
              <PrimaryButton onClick={() => setScreen("practice-launch")}>Tavsiyalarni ko'rish →</PrimaryButton>
            </div>
          </Card>

          <Card className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ background: C.primary50 }}>
              <Quote size={18} color={C.primary600} />
            </div>
            <div>
              <div className="text-sm font-semibold" style={{ color: C.textPrimary }}>
                Kichik qadamlar katta o'zgarishlarga olib keladi.
              </div>
              <div className="text-xs mt-0.5" style={{ color: C.textSecondary }}>
                Bugun o'zingiz uchun eng yaxshi investitsiyani qiling!
              </div>
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-5">
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: C.primary600 }}>
                <Bot size={15} color="#fff" />
              </div>
              <span className="text-sm font-semibold" style={{ color: C.textPrimary }}>AI Tutor</span>
            </div>
            <div className="rounded-xl p-3 text-sm leading-relaxed space-y-2" style={{ background: C.primary50, color: C.textPrimary }}>
              <p>Malika, sizning asosiy zaif tomoningiz <strong>"Xulosa chiqarish"</strong>.</p>
              <p>Men siz uchun maxsus mashqlar tanladim.</p>
              <p>Bugun 10 daqiqalik 5 ta mashq bajaring.</p>
            </div>
            <div className="mt-3">
              <PrimaryButton full onClick={() => setScreen("practice-launch")}>Mashqni boshlash →</PrimaryButton>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <Calendar size={16} color={C.textPrimary} />
              <span className="text-sm font-semibold" style={{ color: C.textPrimary }}>Bugungi progress</span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: C.amberBg }}>
                <Flame size={20} color={C.amber} />
              </div>
              <div>
                <div className="text-lg font-bold" style={{ color: C.textPrimary }}>3 <span className="text-sm font-medium" style={{ color: C.textSecondary }}>kunlik streak</span></div>
              </div>
            </div>
            <div className="text-xs mb-1.5" style={{ color: C.textSecondary }}>Bugun: 7 / 10 daqiqa</div>
            <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "#F1F5F9" }}>
              <div className="h-2 rounded-full" style={{ width: "70%", background: C.primary600 }} />
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <FileText size={16} color={C.textPrimary} />
              <span className="text-sm font-semibold" style={{ color: C.textPrimary }}>Oxirgi natijalar</span>
            </div>
            <div className="space-y-3">
              {results.map((r, i) => (
                <div key={i} className="flex items-center justify-between pb-3 border-b last:border-0 last:pb-0" style={{ borderColor: C.border }}>
                  <div>
                    <div className="text-sm font-medium" style={{ color: C.textPrimary }}>{r.name}</div>
                    <div className="text-xs" style={{ color: C.textSecondary }}>{r.date}</div>
                  </div>
                  <div className="text-sm font-bold" style={{ color: scoreColor(r.score) }}>{r.score}%</div>
                </div>
              ))}
            </div>
            <button className="text-sm font-semibold mt-3 flex items-center gap-1" style={{ color: C.primary600 }}>
              Barchasini ko'rish <ArrowRight size={14} />
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   SCREEN: Diagnostic Question
--------------------------------------------------------------- */
const PASSAGE = `Orol dengizining qurishi Markaziy Osiyodagi eng yirik ekologik falokatlardan biri hisoblanadi. 1960-yillarda dunyodagi to'rtinchi yirik ko'l bo'lgan Orol, paxta dalalarini sug'orish uchun daryolardan suv olinishi natijasida hozirda o'z hajmining 90 foizdan ortig'ini yo'qotdi. Mintaqa aholisi tuproq sho'rlanishi, chang bo'ronlari va iqlim o'zgarishi kabi muammolarga duch kelmoqda. Olimlar hozirda mahalliy ekotizimni tiklash bo'yicha bir necha loyihalar ustida ishlamoqda, jumladan saksovul ekish va "Orolqum" milliy bog'ini barpo etish.`;

function DiagQuestion({ setScreen }) {
  const [selected, setSelected] = useState(null);
  const [fontStep, setFontStep] = useState(1);
  const fontSizes = [15, 17, 19];
  const options = [
    "Paxta yetishtirish uchun daryo suvlaridan ortiqcha foydalanilgani",
    "Mintaqada uzoq davom etgan qurg'oqchilik yuz bergani",
    "Dengiz suvining tabiiy bug'lanishi kuchaygani",
    "Ko'l atrofida sanoat korxonalari ko'payib ketgani",
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-5">
        <div className="flex items-center justify-between mb-3">
          <Pill style={{ background: C.amberBg, color: C.warning }}>Axborot matni</Pill>
          <div className="flex items-center gap-1">
            <button onClick={() => setFontStep(Math.max(0, fontStep - 1))} className="w-7 h-7 rounded-lg border flex items-center justify-center text-xs font-bold" style={{ borderColor: C.border, color: C.textSecondary }}>A-</button>
            <button onClick={() => setFontStep(Math.min(2, fontStep + 1))} className="w-7 h-7 rounded-lg border flex items-center justify-center text-xs font-bold" style={{ borderColor: C.border, color: C.textSecondary }}>A+</button>
            <button className="w-7 h-7 rounded-lg border flex items-center justify-center ml-1" style={{ borderColor: C.border }}>
              <Type size={13} color={C.textSecondary} />
            </button>
          </div>
        </div>
        <h2 className="text-lg font-bold mb-3" style={{ color: C.textPrimary, fontFamily: passageFontSerif }}>
          Orol dengizi: yo'qolgan dengiz tarixi
        </h2>
        <p style={{ color: C.textPrimary, fontFamily: passageFontSerif, fontSize: fontSizes[fontStep], lineHeight: 1.75 }}>
          {PASSAGE}
        </p>
      </Card>

      <Card className="p-5 flex flex-col">
        <div className="flex items-center justify-between text-xs mb-2" style={{ color: C.textSecondary }}>
          <span>Savol 4 / 12</span>
          <span>Qiyinlik: O'rta</span>
        </div>
        <div className="w-full h-1.5 rounded-full overflow-hidden mb-4" style={{ background: "#F1F5F9" }}>
          <div className="h-1.5 rounded-full" style={{ width: "33%", background: C.primary600 }} />
        </div>
        <Pill style={{ background: C.purpleBg, color: C.purple }} className="mb-3 w-fit">Ma'lumotni topish</Pill>
        <p className="text-base font-semibold mb-4" style={{ color: C.textPrimary }}>
          Matnga ko'ra, Orol dengizining qurishiga asosiy sabab nima bo'lgan?
        </p>
        <div className="space-y-2 flex-1">
          {options.map((opt, i) => {
            const active = selected === i;
            return (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className="w-full text-left px-4 py-3 rounded-xl border-2 text-sm transition-all duration-150"
                style={{ borderColor: active ? C.primary600 : C.border, background: active ? C.primary50 : "#fff", color: C.textPrimary }}
              >
                <span className="font-semibold mr-2">{String.fromCharCode(65 + i)}.</span>{opt}
              </button>
            );
          })}
        </div>
        <div className="mt-5">
          <PrimaryButton full disabled={selected === null} onClick={() => setScreen("diag-results")}>
            Keyingi savol <ChevronRight size={16} />
          </PrimaryButton>
        </div>
      </Card>
    </div>
  );
}

/* ---------------------------------------------------------------
   SCREEN: Diagnostic Results
--------------------------------------------------------------- */
function DiagResults({ setScreen }) {
  const skills = [
    { label: "Asosiy g'oyani topish", pct: 78, color: C.primary600 },
    { label: "Dalil topish", pct: 56, color: C.amber },
    { label: "Xulosa chiqarish", pct: 41, color: C.error },
    { label: "Grafik / jadvalni tushunish", pct: 72, color: C.blue },
  ];
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <Pill style={{ background: C.purpleBg, color: C.purple }} className="mb-3">PISA Darajasi: 3-daraja / 6</Pill>
        <h2 className="text-xl font-bold" style={{ color: C.textPrimary }}>Diagnostika yakunlandi</h2>
      </div>

      <Card className="p-6 mb-4">
        <div className="space-y-4">
          {skills.map((s, i) => (
            <div key={i}>
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span style={{ color: C.textPrimary }}>{s.label}</span>
                <span className="font-bold" style={{ color: C.textPrimary }}>{s.pct}%</span>
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "#F1F5F9" }}>
                <div className="h-2 rounded-full" style={{ width: `${s.pct}%`, background: s.color }} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4 mb-6 border-2" style={{ borderColor: "#FECACA", background: C.errorBg }}>
        <div className="flex items-start gap-3">
          <AlertTriangle size={18} color={C.error} className="mt-0.5" />
          <div>
            <div className="text-sm font-semibold" style={{ color: C.textPrimary }}>Eng ko'p e'tibor talab qiladigan yo'nalish</div>
            <div className="text-sm" style={{ color: C.textSecondary }}>Xulosa chiqarish (41/100)</div>
          </div>
        </div>
      </Card>

      <PrimaryButton full onClick={() => setScreen("practice-launch")}>
        Shaxsiy o'quv rejasini boshlash <ArrowRight size={16} />
      </PrimaryButton>
    </div>
  );
}

/* ---------------------------------------------------------------
   SCREEN: Practice Launcher
--------------------------------------------------------------- */
function PracticeLaunch({ setScreen }) {
  return (
    <div className="max-w-xl mx-auto">
      <Card className="p-6 text-center">
        <Pill style={{ background: C.purpleBg, color: C.purple }} className="mb-4">Bugungi fokus: Xulosa chiqarish</Pill>
        <h2 className="text-xl font-bold mb-2" style={{ color: C.textPrimary }}>Kunlik mashg'ulotga tayyormisiz?</h2>
        <p className="text-sm mb-6" style={{ color: C.textSecondary }}>5–8 ta savol, taxminan 15–20 daqiqa</p>
        <div className="flex items-center justify-center gap-2 mb-2">
          {[1, 2, 3].map((n) => (
            <div key={n} className="w-8 h-2 rounded-full" style={{ background: n <= 2 ? C.primary600 : "#E2E8F0" }} />
          ))}
        </div>
        <p className="text-xs mb-6" style={{ color: C.textSecondary }}>Qiyinlik darajasi: O'rta</p>
        <div className="flex items-center justify-center gap-3 mb-6">
          <Pill style={{ background: C.amberBg, color: C.amber }}><Zap size={12} /> +50 XP</Pill>
          <Pill style={{ background: C.amberBg, color: C.amber }}><Flame size={12} /> Streak +1</Pill>
        </div>
        <div className="flex items-center justify-center gap-1.5 text-xs mb-6" style={{ color: C.offline }}>
          <Download size={13} /> 3 ta mashg'ulot qurilmangizga yuklab olingan
        </div>
        <PrimaryButton full onClick={() => setScreen("practice-session")}>Mashg'ulotni boshlash (5–8 savol)</PrimaryButton>
      </Card>
    </div>
  );
}

/* ---------------------------------------------------------------
   SCREEN: Practice Session
--------------------------------------------------------------- */
function PracticeSession({ setScreen }) {
  const [selected, setSelected] = useState(null);
  const [checked, setChecked] = useState(false);
  const correctIndex = 1;
  const options = [
    "Muallif faqat statistik ma'lumotlarga tayanadi",
    "Muallif voqealarni sabab-natija tartibida bayon qiladi",
    "Muallif o'quvchiga savol berish orqali fikrlashga undaydi",
    "Muallif hikoyani teskari xronologik tartibda beradi",
  ];
  return (
    <div className="max-w-3xl mx-auto">
      <Card className="p-6">
        <div className="flex items-center justify-between text-xs mb-3" style={{ color: C.textSecondary }}>
          <span>Savol 3 / 6</span>
          <Pill style={{ background: C.purpleBg, color: C.purple }}>Matn tuzilishini anglash</Pill>
        </div>
        <p className="text-base font-semibold mb-4" style={{ color: C.textPrimary }}>
          Matndagi voqealar qanday tartibda bayon qilingan?
        </p>
        <div className="space-y-2">
          {options.map((opt, i) => {
            const isCorrect = i === correctIndex;
            const isSelected = i === selected;
            let border = C.border, bg = "#fff";
            if (checked && isCorrect) { border = C.success; bg = C.successBg; }
            else if (checked && isSelected && !isCorrect) { border = C.error; bg = C.errorBg; }
            else if (!checked && isSelected) { border = C.primary600; bg = C.primary50; }
            return (
              <button
                key={i}
                disabled={checked}
                onClick={() => setSelected(i)}
                className="w-full text-left px-4 py-3 rounded-xl border-2 text-sm flex items-center justify-between transition-all duration-150"
                style={{ borderColor: border, background: bg, color: C.textPrimary }}
              >
                <span><span className="font-semibold mr-2">{String.fromCharCode(65 + i)}.</span>{opt}</span>
                {checked && isCorrect && <CheckCircle2 size={16} color={C.success} />}
                {checked && isSelected && !isCorrect && <XCircle size={16} color={C.error} />}
              </button>
            );
          })}
        </div>
        {checked && (
          <div className="mt-4 p-4 rounded-xl text-sm" style={{ background: selected === correctIndex ? C.successBg : C.amberBg, color: C.textPrimary }}>
            <span className="font-semibold">Tushuntirish: </span>
            Matnda avval hozirgi holat, so'ng sabablar va oxirida yechim loyihalari tartibida beriladi — bu sabab-natija tuzilishi.
          </div>
        )}
        <div className="mt-5">
          {!checked ? (
            <PrimaryButton full disabled={selected === null} onClick={() => setChecked(true)}>Tekshirish</PrimaryButton>
          ) : (
            <PrimaryButton full onClick={() => setScreen("practice-summary")}>Davom etish <ArrowRight size={16} /></PrimaryButton>
          )}
        </div>
      </Card>
    </div>
  );
}

/* ---------------------------------------------------------------
   SCREEN: Practice Summary
--------------------------------------------------------------- */
function PracticeSummary({ setScreen }) {
  return (
    <div className="max-w-lg mx-auto text-center">
      <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-4" style={{ background: C.successBg }}>
        <CheckCircle2 size={32} color={C.success} />
      </div>
      <h2 className="text-xl font-bold mb-1" style={{ color: C.textPrimary }}>7/8 to'g'ri javob</h2>
      <p className="text-sm mb-6" style={{ color: C.textSecondary }}>Aniqlik: 87%</p>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <Card className="p-4">
          <Zap size={18} color={C.amber} className="mx-auto mb-1" />
          <div className="text-sm font-bold" style={{ color: C.textPrimary }}>+60 XP</div>
          <div className="text-xs" style={{ color: C.textSecondary }}>qo'shildi</div>
        </Card>
        <Card className="p-4">
          <Flame size={18} color={C.amber} className="mx-auto mb-1" />
          <div className="text-sm font-bold" style={{ color: C.textPrimary }}>4 kunlik</div>
          <div className="text-xs" style={{ color: C.textSecondary }}>streak</div>
        </Card>
      </div>
      <Card className="p-4 mb-6 text-left">
        <div className="text-xs font-semibold mb-1" style={{ color: C.textSecondary }}>Ko'nikma o'sishi</div>
        <div className="text-sm font-semibold" style={{ color: C.textPrimary }}>
          Xulosa chiqarish: 38% → 44% <span style={{ color: C.success }}>(+6%)</span>
        </div>
      </Card>
      <div className="flex gap-3">
        <button onClick={() => setScreen("dashboard")} className="flex-1 rounded-xl px-4 py-3 text-sm font-semibold border" style={{ borderColor: C.border, color: C.textPrimary }}>
          Bosh sahifaga qaytish
        </button>
        <div className="flex-1">
          <PrimaryButton full onClick={() => setScreen("practice-launch")}>Keyingi dars</PrimaryButton>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   SCREEN: Teacher Dashboard
--------------------------------------------------------------- */
function TeacherDashboard() {
  const students = [
    { name: "Aziza Karimova", active: "Bugun", scores: [78, 82, 65, 71] },
    { name: "Botir Yusupov", active: "2 kun oldin", scores: [55, 61, 28, 44] },
    { name: "Dilnoza Rashidova", active: "Bugun", scores: [88, 91, 76, 80] },
    { name: "Sardor Nazarov", active: "9 kun oldin", scores: [32, 38, 19, 25] },
    { name: "Malika Tosheva", active: "Kecha", scores: [70, 68, 55, 62] },
  ];
  const cellColor = (v) => {
    if (v < 40) return { bg: C.errorBg, text: C.error };
    if (v < 70) return { bg: C.amberBg, text: C.amber };
    return { bg: C.successBg, text: C.success };
  };
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="text-xs" style={{ color: C.textSecondary }}>Jami o'quvchilar</div>
          <div className="text-2xl font-bold" style={{ color: C.textPrimary }}>32</div>
        </Card>
        <Card className="p-4">
          <div className="text-xs" style={{ color: C.textSecondary }}>O'rtacha PISA darajasi</div>
          <div className="text-2xl font-bold" style={{ color: C.textPrimary }}>3.4 / 6</div>
        </Card>
        <Card className="p-4">
          <div className="text-xs" style={{ color: C.textSecondary }}>Faol o'quvchilar (7 kun)</div>
          <div className="text-2xl font-bold" style={{ color: C.success }}>78%</div>
        </Card>
      </div>

      <Card className="p-4 border-2" style={{ borderColor: "#FECACA", background: C.errorBg }}>
        <div className="flex items-start gap-3">
          <AlertTriangle size={18} color={C.error} className="mt-0.5" />
          <div className="flex-1">
            <div className="text-sm font-semibold" style={{ color: C.textPrimary }}>3 nafar o'quvchi xavf ostida</div>
            <div className="text-xs" style={{ color: C.textSecondary }}>Ko'nikma &lt; 30% yoki 7 kundan beri nofaol</div>
          </div>
          <button className="text-xs font-semibold px-3 py-1.5 rounded-lg" style={{ background: C.error, color: "#fff" }}>
            Yordam ko'rsatish
          </button>
        </div>
      </Card>

      <Card className="p-4 overflow-x-auto">
        <div className="text-sm font-semibold mb-3" style={{ color: C.textPrimary }}>Sinf ko'nikmalar issiqlik xaritasi</div>
        <table className="w-full text-sm" style={{ minWidth: 560 }}>
          <thead>
            <tr style={{ color: C.textSecondary }}>
              <th className="text-left font-medium pb-2">O'quvchi</th>
              <th className="text-left font-medium pb-2">Faollik</th>
              {SKILLS.map((s) => <th key={s.key} className="text-center font-medium pb-2 px-1">{s.short}</th>)}
            </tr>
          </thead>
          <tbody>
            {students.map((s, i) => (
              <tr key={i} className="border-t" style={{ borderColor: "#F1F5F9" }}>
                <td className="py-2 font-medium" style={{ color: C.textPrimary }}>{s.name}</td>
                <td className="py-2" style={{ color: C.textSecondary }}>{s.active}</td>
                {s.scores.map((v, j) => {
                  const c = cellColor(v);
                  return (
                    <td key={j} className="py-2 px-1 text-center">
                      <span className="inline-block w-12 py-1 rounded-lg font-semibold text-xs" style={{ background: c.bg, color: c.text }}>{v}%</span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <div className="flex flex-col sm:flex-row gap-3">
        <button className="flex-1 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold border" style={{ borderColor: C.border, color: C.textPrimary }}>
          <FileText size={15} /> Yangi vazifa yuklash
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold" style={{ background: C.primary600, color: "#fff" }}>
          <Download size={15} /> Hisobotni yuklab olish
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   ROOT / SHELL
--------------------------------------------------------------- */
const SCREEN_META = {
  dashboard: null, // dashboard renders its own top bar to match the reference exactly
  "diag-intro": { title: "Diagnostika", subtitle: "Boshlang'ich baholash" },
  "diag-question": { title: "Diagnostika savoli", subtitle: "12 tadan 4-savol" },
  "diag-results": { title: "Diagnostika natijalari", subtitle: "Ko'nikmalar tahlili" },
  "practice-launch": { title: "Kunlik mashg'ulot", subtitle: "Shaxsiylashtirilgan dars" },
  "practice-session": { title: "Mashg'ulot jarayoni", subtitle: "Savol 3 / 6" },
  "practice-summary": { title: "Mashg'ulot yakuni", subtitle: "Natijalaringiz" },
  teacher: { title: "O'qituvchi paneli", subtitle: "Sinf tahlili va monitoring" },
};

export default function App() {
  const [screen, setScreen] = useState("dashboard");
  const [isOffline, setIsOffline] = useState(false);
  const [lang, setLang] = useState("UZ");

  const meta = SCREEN_META[screen];

  const body = {
    dashboard: <StudentDashboard setScreen={setScreen} />,
    "diag-intro": <DiagQuestion setScreen={setScreen} />,
    "diag-question": <DiagQuestion setScreen={setScreen} />,
    "diag-results": <DiagResults setScreen={setScreen} />,
    "practice-launch": <PracticeLaunch setScreen={setScreen} />,
    "practice-session": <PracticeSession setScreen={setScreen} />,
    "practice-summary": <PracticeSummary setScreen={setScreen} />,
    teacher: <TeacherDashboard />,
  }[screen];

  return (
    <div className="min-h-screen flex" style={{ background: C.bg, fontFamily: uiFont }}>
      <Sidebar screen={screen} setScreen={setScreen} />
      <div className="flex-1 min-w-0 flex flex-col">
        <MobileNav screen={screen} setScreen={setScreen} />
        {isOffline && (
          <div className="px-4 sm:px-8 py-2 text-xs font-medium flex items-center gap-2" style={{ background: "#F1F5F9", color: C.offline }}>
            <WifiOff size={13} />
            Internet aloqasi yo'q. Natijalar tarmoqqa ulanganda sinxronlanadi.
          </div>
        )}
        <div className="flex-1 px-4 sm:px-8 py-6">
          {meta && <TopBar title={meta.title} subtitle={meta.subtitle} isOffline={isOffline} setIsOffline={setIsOffline} lang={lang} setLang={setLang} />}
          {body}
        </div>
      </div>
    </div>
  );
}
