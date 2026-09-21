"use client";

import React, { useState } from "react";
import { X, Copy, Check, Download, FileCode2 } from "lucide-react";
import { AgentStep } from "@/types/agent";
import { generatePlaywrightTypeScript, generatePlaywrightPython } from "@/lib/playwrightGenerator";

interface ScriptExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  steps: AgentStep[];
  targetUrl: string;
  lang: "en" | "ar";
}

export const ScriptExportModal: React.FC<ScriptExportModalProps> = ({
  isOpen,
  onClose,
  steps,
  targetUrl,
  lang,
}) => {
  const [tab, setTab] = useState<"ts" | "py">("ts");
  const [copied, setCopied] = useState(false);
  const isAr = lang === "ar";

  if (!isOpen) return null;

  const code = tab === "ts" 
    ? generatePlaywrightTypeScript(steps, targetUrl)
    : generatePlaywrightPython(steps, targetUrl);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename = tab === "ts" ? "oneshot_agent.ts" : "oneshot_agent.py";
    const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0F1217] border border-[#232832] w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-[#14181F] border-b border-[#232832] px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <FileCode2 className="w-5 h-5 text-[#FB8656]" />
            <div>
              <h3 className="text-white text-sm font-bold">
                {isAr ? "تصدير كود Playwright المستخرج" : "Export Generated Playwright Code"}
              </h3>
              <p className="text-[11px] text-[#8892A2]">
                {isAr ? "كود مستقل جاهز للتشغيل مباشرة في سيرفرك أو جهازك" : "Standalone executable script ready to run locally or in CI/CD"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab & Actions Toolbar */}
        <div className="bg-[#11141A] px-5 py-2.5 flex items-center justify-between border-b border-[#1E232C] gap-3">
          <div className="flex items-center gap-1.5 bg-[#0A0C0E] p-1 rounded-lg border border-[#232832]">
            <button
              onClick={() => setTab("ts")}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                tab === "ts" ? "bg-[#E05520] text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              TypeScript (Node.js)
            </button>
            <button
              onClick={() => setTab("py")}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                tab === "py" ? "bg-[#E05520] text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              Python (Playwright)
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#1B212B] hover:bg-[#252C39] text-white border border-[#2D3645] transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-gray-300" />}
              <span>{copied ? (isAr ? "تم النسخ!" : "Copied!") : (isAr ? "نسخ الكود" : "Copy Code")}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#E05520] hover:bg-[#FB8656] text-white transition-colors shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isAr ? "تحميل الملف" : "Download File"}</span>
            </button>
          </div>
        </div>

        {/* Code View */}
        <div className="flex-1 overflow-y-auto p-5 bg-[#090B0E] font-mono text-xs text-gray-200">
          <pre className="overflow-x-auto whitespace-pre leading-relaxed">
            <code>{code}</code>
          </pre>
        </div>

        {/* Footer */}
        <div className="bg-[#14181F] border-t border-[#232832] px-5 py-2.5 flex items-center justify-between text-[11px] text-[#8892A2]">
          <span>OneShot Automation Engine v1.0</span>
          <span>{steps.length} {isAr ? "خطوات مستخرجة" : "Grounded actions included"}</span>
        </div>
      </div>
    </div>
  );
};
