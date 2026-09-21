"use client";

import React from "react";
import { X, Layers, ArrowRight, ArrowLeft, Camera, CreditCard, Database } from "lucide-react";
import { AUTOMATION_PRESETS } from "@/lib/templates";
import { AutomationPreset } from "@/types/agent";

interface PresetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPreset: (preset: AutomationPreset) => void;
  lang: "en" | "ar";
}

export const PresetsModal: React.FC<PresetsModalProps> = ({
  isOpen,
  onClose,
  onSelectPreset,
  lang,
}) => {
  const isAr = lang === "ar";
  if (!isOpen) return null;

  const getPresetIcon = (id: string) => {
    if (id.includes("camera") || id.includes("oneshot")) return <Camera className="w-5 h-5 text-[#FB8656]" />;
    if (id.includes("payment") || id.includes("telr")) return <CreditCard className="w-5 h-5 text-emerald-400" />;
    return <Database className="w-5 h-5 text-purple-400" />;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0F1217] border border-[#232832] w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="bg-[#14181F] border-b border-[#232832] px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Layers className="w-5 h-5 text-[#FB8656]" />
            <div>
              <h3 className="text-white text-sm font-bold">
                {isAr ? "قوالب وأتمتة OneShot الجاهزة" : "OneShot Ready-Made Automation Presets"}
              </h3>
              <p className="text-[11px] text-[#8892A2]">
                {isAr ? "اختر قالباً لبدء تنفيذ سيناريوهات الأتمتة المتقدمة فوراً" : "Select an end-to-end task scenario to initialize the agent pipeline"}
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

        {/* List of Presets */}
        <div className="p-5 space-y-3 max-h-[70vh] overflow-y-auto">
          {AUTOMATION_PRESETS.map((preset) => (
            <div
              key={preset.id}
              onClick={() => {
                onSelectPreset(preset);
                onClose();
              }}
              className="group p-4 rounded-xl bg-[#13171F] hover:bg-[#191F2B] border border-[#212733] hover:border-[#E05520]/60 cursor-pointer transition-all duration-200 shadow-md flex items-start justify-between gap-4"
            >
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#1A202A] border border-[#2B3545] group-hover:scale-105 transition-transform">
                  {getPresetIcon(preset.id)}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-white text-xs font-bold group-hover:text-[#FB8656] transition-colors">
                      {isAr ? preset.nameAr : preset.name}
                    </h4>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#1F2633] text-gray-400 font-mono">
                      {preset.category}
                    </span>
                  </div>

                  <p className="text-[11px] text-[#8892A2] mt-1 leading-relaxed">
                    {isAr ? preset.descriptionAr : preset.description}
                  </p>

                  <div className="mt-2.5 flex items-center gap-2 text-[10px] font-mono text-[#FB8656]">
                    <span className="bg-[#E05520]/10 px-2 py-0.5 rounded border border-[#E05520]/20 truncate max-w-xs">
                      {preset.targetUrl}
                    </span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-400">{preset.steps.length} {isAr ? "خطوات محددة" : "actions"}</span>
                  </div>
                </div>
              </div>

              <div className="shrink-0 pt-1 text-gray-500 group-hover:text-[#FB8656] transition-colors">
                {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
