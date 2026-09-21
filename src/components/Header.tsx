"use client";

import React from "react";
import { 
  Code2, 
  Settings, 
  Globe, 
  Cpu, 
  Layers
} from "lucide-react";

interface HeaderProps {
  lang: "en" | "ar";
  onToggleLang: () => void;
  onOpenSettings: () => void;
  onOpenExport: () => void;
  onOpenTemplates: () => void;
  isRunning: boolean;
  activeModel: string;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onToggleLang,
  onOpenSettings,
  onOpenExport,
  onOpenTemplates,
  isRunning,
  activeModel
}) => {
  const isAr = lang === "ar";

  return (
    <header className="w-full bg-[#0B0D0F] border-b border-[#1F242C] px-4 py-3 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-[#E05520]/40 bg-[#161A20] flex items-center justify-center shadow-lg shadow-[#E05520]/10">
            {/* Aperture Ring Icon or Logo */}
            <div className="w-6 h-6 rounded-full border-2 border-[#E05520] relative flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#E05520] animate-pulse"></div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white font-sans">
                one<span className="text-[#E05520]">Shot</span>
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#E05520]/15 text-[#FB8656] border border-[#E05520]/30 tracking-wide uppercase">
                AI Agent
              </span>
            </div>
            <p className="text-[11px] text-[#8892A2] hidden sm:block">
              {isAr ? "أتمتة المتصفح والمهام بالذكاء الاصطناعي" : "Autonomous Browser Agent & Task Automation"}
            </p>
          </div>
        </div>

        {/* System Status Indicators */}
        <div className="hidden md:flex items-center gap-3 bg-[#13161B] px-3 py-1.5 rounded-lg border border-[#232832] text-xs">
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${isRunning ? "bg-[#E05520] animate-ping" : "bg-emerald-500"}`}></span>
            <span className="text-[#A1AAB8]">{isRunning ? (isAr ? "جارٍ التنفيذ..." : "Executing...") : (isAr ? "جاهز" : "Agent Ready")}</span>
          </div>
          <div className="h-3 w-px bg-[#262D38]"></div>
          <div className="flex items-center gap-1.5 text-[#8892A2]">
            <Cpu className="w-3.5 h-3.5 text-[#FB8656]" />
            <span className="text-white font-mono text-[11px]">{activeModel}</span>
          </div>
          <div className="h-3 w-px bg-[#262D38]"></div>
          <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
            <span>Dev: 172.20.10.2:3000</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Templates/Presets Button */}
          <button
            onClick={onOpenTemplates}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#C4CBD6] bg-[#161A21] hover:bg-[#1E232E] border border-[#262E3B] transition-colors"
            title={isAr ? "القوالب الجاهزة" : "Presets"}
          >
            <Layers className="w-3.5 h-3.5 text-[#FB8656]" />
            <span className="hidden sm:inline">{isAr ? "نماذج جاهزة" : "Presets"}</span>
          </button>

          {/* Export Code Button */}
          <button
            onClick={onOpenExport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#C4CBD6] bg-[#161A21] hover:bg-[#1E232E] border border-[#262E3B] transition-colors"
            title={isAr ? "تصدير كود Playwright" : "Export Playwright Script"}
          >
            <Code2 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">{isAr ? "تصدير الكود" : "Export Code"}</span>
          </button>

          {/* Language Toggle */}
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#A1AAB8] hover:text-white bg-[#161A21] hover:bg-[#1E232E] border border-[#262E3B] transition-colors"
            title={isAr ? "Switch to English" : "التبديل إلى العربية"}
          >
            <Globe className="w-3.5 h-3.5 text-[#FB8656]" />
            <span>{isAr ? "EN" : "عربي"}</span>
          </button>

          {/* Settings Button */}
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-lg text-[#A1AAB8] hover:text-white bg-[#161A21] hover:bg-[#1E232E] border border-[#262E3B] transition-colors"
            title={isAr ? "الإعدادات ومفتاح Gemini" : "Settings & API Keys"}
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
