"use client";

import React from "react";
import { X, Key, Cpu, Zap, Info, Save } from "lucide-react";
import { AgentSettings } from "@/types/agent";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AgentSettings;
  onSave: (newSettings: AgentSettings) => void;
  lang: "en" | "ar";
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSave,
  lang,
}) => {
  const [formData, setFormData] = React.useState<AgentSettings>(settings);
  const [savedSuccess, setSavedSuccess] = React.useState(false);
  const isAr = lang === "ar";

  React.useEffect(() => {
    setFormData(settings);
  }, [settings]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0F1217] border border-[#232832] w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="bg-[#14181F] border-b border-[#232832] px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Cpu className="w-5 h-5 text-[#FB8656]" />
            <div>
              <h3 className="text-white text-sm font-bold">
                {isAr ? "إعدادات وكيل OneShot و Gemini" : "OneShot Agent & Gemini Settings"}
              </h3>
              <p className="text-[11px] text-[#8892A2]">
                {isAr ? "تخصيص نماذج الذكاء الاصطناعي وخيارات التشغيل" : "Configure AI vision models, API access and browser flags"}
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Gemini API Key */}
          <div>
            <label className="block text-xs font-semibold text-gray-200 mb-1.5 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-[#FB8656]" />
              <span>{isAr ? "مفتاح Google AI Studio (Gemini API Key)" : "Google AI Studio API Key"}</span>
            </label>
            <input
              type="password"
              placeholder="AIzaSy..."
              value={formData.apiKey}
              onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
              className="w-full bg-[#090B0E] border border-[#262D38] rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#E05520] font-mono"
            />
            <p className="text-[10px] text-gray-500 mt-1">
              {isAr ? "المفتاح يحفظ محلياً في متصفحك ولا يرسل لأي خادم خارجي." : "Stored locally in your browser session for direct Gemini API access."}
            </p>
          </div>

          {/* Model Selection */}
          <div>
            <label className="block text-xs font-semibold text-gray-200 mb-1.5 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>{isAr ? "نموذج الذكاء الاصطناعي" : "AI Reasoning Model"}</span>
            </label>
            <select
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value as AgentSettings["model"] })}
              className="w-full bg-[#090B0E] border border-[#262D38] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E05520]"
            >
              <option value="gemini-2.5-flash">Gemini 2.5 Flash (Ultra-Fast Vision & Grounding)</option>
              <option value="gemini-2.5-pro">Gemini 2.5 Pro (Deep Computer Use & High Reasoning)</option>
              <option value="gemini-2.0-flash">Gemini 2.0 Flash (Experimental)</option>
            </select>
          </div>

          {/* Vision Resolution */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-200 mb-1.5">
                {isAr ? "دقة تحليل الرؤية البصرية" : "Vision Resolution"}
              </label>
              <select
                value={formData.visionResolution}
                onChange={(e) => setFormData({ ...formData, visionResolution: e.target.value as AgentSettings["visionResolution"] })}
                className="w-full bg-[#090B0E] border border-[#262D38] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E05520]"
              >
                <option value="high">High (Full Frame 1080p)</option>
                <option value="medium">Medium (Balanced 720p)</option>
                <option value="low">Low (Fast 480p)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-200 mb-1.5">
                {isAr ? "سرعة التنفيذ (تأخير بالأجزاء)" : "Execution Delay (ms)"}
              </label>
              <input
                type="number"
                min="100"
                max="3000"
                step="100"
                value={formData.executionDelay}
                onChange={(e) => setFormData({ ...formData, executionDelay: Number(e.target.value) })}
                className="w-full bg-[#090B0E] border border-[#262D38] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E05520] font-mono"
              />
            </div>
          </div>

          {/* Toggles */}
          <div className="space-y-2 pt-2 border-t border-[#1C212A]">
            <label className="flex items-center justify-between p-2.5 rounded-xl bg-[#13171F] border border-[#212733] cursor-pointer">
              <span className="text-xs text-gray-200 font-medium">
                {isAr ? "وضع التخفي ومقاومة كشف البوتات (Stealth)" : "Stealth Mode (Anti-Bot Evasion)"}
              </span>
              <input
                type="checkbox"
                checked={formData.stealthMode}
                onChange={(e) => setFormData({ ...formData, stealthMode: e.target.checked })}
                className="w-4 h-4 accent-[#E05520] rounded"
              />
            </label>

            <label className="flex items-center justify-between p-2.5 rounded-xl bg-[#13171F] border border-[#212733] cursor-pointer">
              <span className="text-xs text-gray-200 font-medium">
                {isAr ? "حفظ ملفات تعريف الارتباط والجلسة" : "Persist Session Cookies"}
              </span>
              <input
                type="checkbox"
                checked={formData.saveCookies}
                onChange={(e) => setFormData({ ...formData, saveCookies: e.target.checked })}
                className="w-4 h-4 accent-[#E05520] rounded"
              />
            </label>
          </div>

          {/* Allowed Dev Origins notice */}
          <div className="bg-[#10141A] border border-[#262E3B] p-3 rounded-xl flex items-start gap-2 text-[11px] text-[#8892A2]">
            <Info className="w-4 h-4 text-[#FB8656] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white">Next.js Dev Origins Configured:</span>
              <p className="font-mono text-[10px] text-emerald-400 mt-0.5">
                allowedDevOrigins: [&quot;172.20.10.2&quot;, &quot;localhost&quot;]
              </p>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-gray-300 hover:text-white bg-[#1A1F29] rounded-xl transition-colors"
            >
              {isAr ? "إلغاء" : "Cancel"}
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-[#E05520] hover:bg-[#FB8656] rounded-xl transition-colors shadow-lg shadow-[#E05520]/20 flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{savedSuccess ? (isAr ? "تم الحفظ!" : "Saved!") : (isAr ? "حفظ التغييرات" : "Save Settings")}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
