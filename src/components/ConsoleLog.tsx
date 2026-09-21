"use client";

import React, { useRef, useEffect } from "react";
import { Terminal, Trash2, Sparkles, CheckCircle, AlertTriangle } from "lucide-react";
import { ConsoleLogEntry } from "@/types/agent";

interface ConsoleLogProps {
  logs: ConsoleLogEntry[];
  onClear: () => void;
  lang: "en" | "ar";
}

export const ConsoleLog: React.FC<ConsoleLogProps> = ({ logs, onClear, lang }) => {
  const isAr = lang === "ar";
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const getLogBadge = (level: ConsoleLogEntry["level"]) => {
    switch (level) {
      case "ai":
        return (
          <span className="flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded bg-[#E05520]/20 text-[#FB8656] font-mono border border-[#E05520]/30">
            <Sparkles className="w-2.5 h-2.5" /> GEMINI AI
          </span>
        );
      case "action":
        return (
          <span className="flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-mono border border-emerald-500/30">
            <CheckCircle className="w-2.5 h-2.5" /> PLAYWRIGHT
          </span>
        );
      case "warn":
        return (
          <span className="flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-400 font-mono border border-amber-500/30">
            <AlertTriangle className="w-2.5 h-2.5" /> WARN
          </span>
        );
      case "error":
        return (
          <span className="flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded bg-rose-500/15 text-rose-400 font-mono border border-rose-500/30">
            ERR
          </span>
        );
      default:
        return (
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-gray-800 text-gray-400 font-mono">
            SYS
          </span>
        );
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0B0D0F] border border-[#232832] rounded-2xl overflow-hidden shadow-xl">
      {/* Header */}
      <div className="bg-[#12151B] border-b border-[#232832] px-3.5 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-[#FB8656]" />
          <span className="text-white text-xs font-bold uppercase tracking-wider font-mono">
            {isAr ? "سجل وحدة التحكم" : "OneShot Live Console"}
          </span>
          <span className="text-[10px] text-gray-500 font-mono">({logs.length})</span>
        </div>

        <button
          onClick={onClear}
          className="p-1 rounded text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          title={isAr ? "مسح السجل" : "Clear Logs"}
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Logs stream */}
      <div className="flex-1 overflow-y-auto p-3 font-mono text-[11px] space-y-2 select-text bg-[#07090B]">
        {logs.map((log) => (
          <div key={log.id} className="flex items-start gap-2 leading-relaxed hover:bg-white/[0.02] p-0.5 rounded">
            <span className="text-gray-500 text-[10px] shrink-0">{log.timestamp}</span>
            <div className="shrink-0">{getLogBadge(log.level)}</div>
            <span className={`break-words ${
              log.level === "error" ? "text-rose-400" :
              log.level === "warn" ? "text-amber-300" :
              log.level === "ai" ? "text-[#FB8656]" :
              log.level === "action" ? "text-emerald-300" :
              "text-gray-300"
            }`}>
              {log.message}
            </span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};
