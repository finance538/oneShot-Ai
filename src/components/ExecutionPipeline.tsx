"use client";

import React, { useState } from "react";
import { 
  CheckCircle2, 
  CircleDot, 
  Clock, 
  AlertCircle, 
  Code, 
  ChevronDown, 
  ChevronUp, 
  MousePointer, 
  Globe, 
  Type, 
  Scroll, 
  Camera, 
  Database,
  Play
} from "lucide-react";
import { AgentStep, ActionType } from "@/types/agent";

interface ExecutionPipelineProps {
  steps: AgentStep[];
  activeStepIndex: number;
  lang: "en" | "ar";
  onSelectStep?: (index: number) => void;
}

const getActionIcon = (action: ActionType) => {
  switch (action) {
    case "navigate": return <Globe className="w-3.5 h-3.5 text-sky-400" />;
    case "click": return <MousePointer className="w-3.5 h-3.5 text-[#FB8656]" />;
    case "type": return <Type className="w-3.5 h-3.5 text-emerald-400" />;
    case "scroll": return <Scroll className="w-3.5 h-3.5 text-purple-400" />;
    case "screenshot": return <Camera className="w-3.5 h-3.5 text-pink-400" />;
    case "extract": return <Database className="w-3.5 h-3.5 text-amber-400" />;
    default: return <Play className="w-3.5 h-3.5 text-gray-400" />;
  }
};

export const ExecutionPipeline: React.FC<ExecutionPipelineProps> = ({
  steps,
  activeStepIndex,
  lang,
  onSelectStep
}) => {
  const isAr = lang === "ar";
  const [expandedCodeIdx, setExpandedCodeIdx] = useState<number | null>(null);

  const toggleCode = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedCodeIdx(expandedCodeIdx === idx ? null : idx);
  };

  return (
    <div className="flex flex-col h-full bg-[#0F1216] border border-[#232832] rounded-2xl overflow-hidden shadow-xl">
      {/* Header */}
      <div className="bg-[#14181E] border-b border-[#232832] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#E05520] animate-pulse"></div>
          <h3 className="text-white text-xs font-bold uppercase tracking-wider">
            {isAr ? "مسار التنفيذ الآلي" : "Execution Pipeline"}
          </h3>
        </div>
        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#1A1F27] text-[#FB8656] border border-[#E05520]/20">
          {steps.filter(s => s.status === "completed").length} / {steps.length} {isAr ? "مكتمل" : "Steps"}
        </span>
      </div>

      {/* Steps List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
        {steps.map((step, idx) => {
          const isActive = idx === activeStepIndex;
          const isCompleted = step.status === "completed";
          const isFailed = step.status === "failed";

          return (
            <div
              key={step.id}
              onClick={() => onSelectStep && onSelectStep(idx)}
              className={`rounded-xl border p-3 cursor-pointer transition-all duration-200 ${
                isActive
                  ? "bg-[#181D26] border-[#E05520] shadow-md shadow-[#E05520]/10"
                  : isCompleted
                  ? "bg-[#12161D] border-[#1F2530] opacity-90"
                  : "bg-[#101318] border-[#1C212A] opacity-60 hover:opacity-80"
              }`}
            >
              {/* Step Title Row */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  {/* Status Indicator */}
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : isActive ? (
                    <div className="relative w-4 h-4 shrink-0 flex items-center justify-center">
                      <span className="absolute w-3.5 h-3.5 rounded-full bg-[#E05520] animate-ping opacity-75"></span>
                      <CircleDot className="w-4 h-4 text-[#FB8656] relative z-10" />
                    </div>
                  ) : isFailed ? (
                    <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  ) : (
                    <Clock className="w-4 h-4 text-gray-500 shrink-0" />
                  )}

                  {/* Title */}
                  <div className="truncate">
                    <p className={`text-xs font-semibold truncate ${isActive ? "text-white" : "text-[#D1D5DB]"}`}>
                      {isAr ? step.titleAr : step.title}
                    </p>
                  </div>
                </div>

                {/* Action Type Badge */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-md bg-[#1B212C] border border-[#27303E] font-mono text-[#A1AAB8]">
                    {getActionIcon(step.actionType)}
                    <span className="capitalize">{step.actionType}</span>
                  </span>
                </div>
              </div>

              {/* Description & Reasoning */}
              <p className="text-[11px] text-[#8892A2] mt-1.5 leading-relaxed pl-6">
                {isAr ? step.descriptionAr : step.description}
              </p>

              {/* Target / Selector tag */}
              {step.selector && (
                <div className="mt-2 pl-6 flex items-center gap-1.5">
                  <span className="text-[10px] font-mono text-[#FB8656] bg-[#E05520]/10 px-2 py-0.5 rounded border border-[#E05520]/20 truncate">
                    {step.selector}
                  </span>
                  {step.coordinates && (
                    <span className="text-[10px] font-mono text-gray-400 bg-gray-800/40 px-1.5 py-0.5 rounded">
                      [{step.coordinates.x}, {step.coordinates.y}]
                    </span>
                  )}
                </div>
              )}

              {/* Code Snippet Collapsible */}
              {step.codeSnippet && (
                <div className="mt-2 pl-6">
                  <button
                    onClick={(e) => toggleCode(idx, e)}
                    className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-white transition-colors"
                  >
                    <Code className="w-3 h-3 text-[#FB8656]" />
                    <span>{expandedCodeIdx === idx ? (isAr ? "إخفاء كود الخطوة" : "Hide Playwright") : (isAr ? "عرض كود الخطوة" : "View Playwright")}</span>
                    {expandedCodeIdx === idx ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>

                  {expandedCodeIdx === idx && (
                    <pre className="mt-2 p-2 bg-[#0B0D0F] border border-[#262D38] rounded-lg text-[10px] font-mono text-[#FB8656] overflow-x-auto">
                      <code>{step.codeSnippet}</code>
                    </pre>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
