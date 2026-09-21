"use client";

import React, { useState, useEffect } from "react";
import { 
  Play, 
  Square, 
  RotateCcw, 
  FastForward, 
  Sparkles, 
  Globe 
} from "lucide-react";

import { Header } from "@/components/Header";
import { BrowserViewport } from "@/components/BrowserViewport";
import { ExecutionPipeline } from "@/components/ExecutionPipeline";
import { ConsoleLog } from "@/components/ConsoleLog";
import { ScriptExportModal } from "@/components/ScriptExportModal";
import { SettingsModal } from "@/components/SettingsModal";
import { PresetsModal } from "@/components/PresetsModal";

import { AUTOMATION_PRESETS } from "@/lib/templates";
import { AgentStep, AgentSettings, ConsoleLogEntry, AutomationPreset } from "@/types/agent";

export default function HomePage() {
  const [lang, setLang] = useState<"en" | "ar">("ar");
  const isAr = lang === "ar";

  // Configuration & Modals State
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPresetsOpen, setIsPresetsOpen] = useState(false);

  const [settings, setSettings] = useState<AgentSettings>({
    apiKey: "",
    model: "gemini-2.5-flash",
    visionResolution: "high",
    executionDelay: 1200,
    saveCookies: true,
    headless: false,
    stealthMode: true,
    allowedOrigins: ["172.20.10.2", "localhost"],
  });

  // Target input state
  const [targetUrl, setTargetUrl] = useState("https://1shotcam.com/cameras/flagship");
  const [goalPrompt, setGoalPrompt] = useState(
    "افحص توفر معدات التصوير السينمائي 8K في متجر OneShot واستخرج الأسعار والمواصفات مع لقطة توثيقية."
  );

  // Execution steps state
  const defaultPreset = AUTOMATION_PRESETS[0];
  const [steps, setSteps] = useState<AgentStep[]>(
    defaultPreset.steps.map((s, idx) => ({
      ...s,
      id: `step-${idx + 1}`,
      order: idx + 1,
      status: "pending" as const,
    }))
  );

  // Execution state
  const [isRunning, setIsRunning] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  // Console Logs
  const [logs, setLogs] = useState<ConsoleLogEntry[]>([
    {
      id: "log-1",
      timestamp: "04:50:12",
      level: "info",
      message: "OneShot AI Platform initialized. Chromium driver attached.",
    },
    {
      id: "log-2",
      timestamp: "04:50:14",
      level: "ai",
      message: "Grounded Computer Use & Vision engine configured with Gemini 2.5 Flash.",
    },
    {
      id: "log-3",
      timestamp: "04:50:15",
      level: "info",
      message: "Allowed dev origins verified: [172.20.10.2, localhost:3000].",
    },
  ]);

  const addLog = (level: ConsoleLogEntry["level"], message: string) => {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [
      ...prev,
      {
        id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
        timestamp: time,
        level,
        message,
      },
    ]);
  };

  // Switch preset
  const handleSelectPreset = (preset: AutomationPreset) => {
    setTargetUrl(preset.targetUrl);
    setGoalPrompt(isAr ? preset.descriptionAr : preset.description);
    const newSteps: AgentStep[] = preset.steps.map((s, idx) => ({
      ...s,
      id: `step-${idx + 1}`,
      order: idx + 1,
      status: "pending" as const,
    }));
    setSteps(newSteps);
    setActiveStepIndex(0);
    setIsRunning(false);
    addLog("ai", `Loaded preset: ${preset.name}`);
  };

  // Run execution simulation
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning) {
      if (activeStepIndex < steps.length) {
        const currentStep = steps[activeStepIndex];

        // Mark current as running
        setSteps((prev) =>
          prev.map((s, i) =>
            i === activeStepIndex ? { ...s, status: "running" } : s
          )
        );

        addLog("ai", `[Step ${activeStepIndex + 1}/${steps.length}] Planning action: ${currentStep.title}`);

        timer = setTimeout(() => {
          // Simulate Playwright action execution
          addLog("action", `Executed ${currentStep.actionType.toUpperCase()}: ${currentStep.codeSnippet || currentStep.title}`);

          // Mark current as completed
          setSteps((prev) =>
            prev.map((s, i) =>
              i === activeStepIndex ? { ...s, status: "completed" } : s
            )
          );

          if (activeStepIndex + 1 < steps.length) {
            setActiveStepIndex((prev) => prev + 1);
          } else {
            setIsRunning(false);
            addLog("ai", "🎉 OneShot Agent finished all workflow steps with 100% success verification.");
          }
        }, settings.executionDelay);
      }
    }

    return () => clearTimeout(timer);
  }, [isRunning, activeStepIndex, steps, settings.executionDelay]);

  // Actions
  const handleStart = () => {
    if (steps.every((s) => s.status === "completed")) {
      handleReset();
    }
    setIsRunning(true);
    addLog("info", `Starting autonomous execution for target: ${targetUrl}`);
  };

  const handlePause = () => {
    setIsRunning(false);
    addLog("warn", "Execution paused by operator.");
  };

  const handleReset = () => {
    setIsRunning(false);
    setActiveStepIndex(0);
    setSteps((prev) => prev.map((s) => ({ ...s, status: "pending" })));
    addLog("info", "Reset workflow pipeline to initial state.");
  };

  const handleStepForward = () => {
    if (activeStepIndex < steps.length) {
      const currentStep = steps[activeStepIndex];
      addLog("action", `Manual single-step: ${currentStep.title}`);
      setSteps((prev) =>
        prev.map((s, i) =>
          i === activeStepIndex ? { ...s, status: "completed" } : s
        )
      );
      if (activeStepIndex + 1 < steps.length) {
        setActiveStepIndex((prev) => prev + 1);
      } else {
        setIsRunning(false);
      }
    }
  };

  return (
    <div className={`min-h-screen flex flex-col bg-[#0B0D0F] text-[#F3F4F6] ${isAr ? "font-arabic" : "font-sans"}`} dir={isAr ? "rtl" : "ltr"}>
      {/* Top Navigation */}
      <Header
        lang={lang}
        onToggleLang={() => setLang(lang === "ar" ? "en" : "ar")}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        onOpenTemplates={() => setIsPresetsOpen(true)}
        isRunning={isRunning}
        activeModel={settings.model}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 flex flex-col gap-5">
        {/* Goal Prompt & Target Bar */}
        <section className="bg-[#12161D] border border-[#232832] rounded-2xl p-4 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#E05520]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

          <div className="flex flex-col md:flex-row gap-3 items-stretch relative z-10">
            {/* Target URL */}
            <div className="flex-1 flex items-center bg-[#090B0E] border border-[#262D38] rounded-xl px-3.5 py-2.5 gap-2">
              <Globe className="w-4 h-4 text-[#FB8656] shrink-0" />
              <input
                type="text"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full bg-transparent text-xs text-white placeholder-gray-500 focus:outline-none font-mono"
              />
            </div>

            {/* Goal Prompt */}
            <div className="flex-[2] flex items-center bg-[#090B0E] border border-[#262D38] rounded-xl px-3.5 py-2.5 gap-2">
              <Sparkles className="w-4 h-4 text-[#FB8656] shrink-0" />
              <input
                type="text"
                value={goalPrompt}
                onChange={(e) => setGoalPrompt(e.target.value)}
                placeholder={isAr ? "ما هو هدفك الذي تريد من الوكيل تنفيذه؟" : "What task should the AI agent execute?"}
                className="w-full bg-transparent text-xs text-white placeholder-gray-500 focus:outline-none"
              />
            </div>

            {/* Execution Controls */}
            <div className="flex items-center gap-2 shrink-0">
              {!isRunning ? (
                <button
                  onClick={handleStart}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E05520] hover:bg-[#FB8656] text-white font-semibold text-xs transition-all shadow-lg shadow-[#E05520]/25"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isAr ? "تشغيل الوكيل" : "Start Agent"}</span>
                </button>
              ) : (
                <button
                  onClick={handlePause}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs transition-all"
                >
                  <Square className="w-3.5 h-3.5 fill-current" />
                  <span>{isAr ? "إيقاف مؤقت" : "Pause"}</span>
                </button>
              )}

              <button
                onClick={handleStepForward}
                disabled={isRunning || activeStepIndex >= steps.length}
                className="p-2.5 rounded-xl bg-[#171B23] hover:bg-[#202632] border border-[#262D38] text-[#A1AAB8] hover:text-white transition-colors disabled:opacity-40"
                title={isAr ? "خطوة واحدة للأمام" : "Step Forward"}
              >
                <FastForward className="w-4 h-4" />
              </button>

              <button
                onClick={handleReset}
                className="p-2.5 rounded-xl bg-[#171B23] hover:bg-[#202632] border border-[#262D38] text-[#A1AAB8] hover:text-white transition-colors"
                title={isAr ? "إعادة الضبط" : "Reset"}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Presets Pills */}
          <div className="mt-3 pt-3 border-t border-[#1C212A] flex flex-wrap items-center gap-2 text-[11px]">
            <span className="text-gray-400 font-medium">{isAr ? "أمثلة وسيناريوهات سريعة:" : "Quick Scenarios:"}</span>
            {AUTOMATION_PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => handleSelectPreset(p)}
                className="px-2.5 py-1 rounded-lg bg-[#181D26] hover:bg-[#202735] text-gray-300 hover:text-white border border-[#262F3D] transition-colors"
              >
                {isAr ? p.nameAr : p.name}
              </button>
            ))}
          </div>
        </section>

        {/* Primary Workspace: Viewport & Pipeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 items-stretch">
          {/* Left / Center: Interactive Simulated Browser (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col min-h-[480px]">
            <BrowserViewport
              url={targetUrl}
              activeStep={steps[activeStepIndex]}
              isRunning={isRunning}
              lang={lang}
            />
          </div>

          {/* Right: Execution Pipeline (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col min-h-[480px]">
            <ExecutionPipeline
              steps={steps}
              activeStepIndex={activeStepIndex}
              lang={lang}
              onSelectStep={(idx) => setActiveStepIndex(idx)}
            />
          </div>
        </div>

        {/* Bottom Panel: Live Console Log */}
        <section className="h-56">
          <ConsoleLog
            logs={logs}
            onClear={() => setLogs([])}
            lang={lang}
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#0B0D0F] border-t border-[#1C212A] py-3 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="font-mono text-[11px] text-gray-400">
            OneShot AI System • Computer Use + Playwright Engine • 1shotcam.com
          </span>
          <span className="text-[11px] text-[#FB8656]">
            {isAr ? "مرخص ومجهز لشبكتك: 172.20.10.2" : "Network Configured: 172.20.10.2"}
          </span>
        </div>
      </footer>

      {/* Modals */}
      <ScriptExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        steps={steps}
        targetUrl={targetUrl}
        lang={lang}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSave={(newSettings) => {
          setSettings(newSettings);
          addLog("info", `Updated agent settings. Model: ${newSettings.model}`);
        }}
        lang={lang}
      />

      <PresetsModal
        isOpen={isPresetsOpen}
        onClose={() => setIsPresetsOpen(false)}
        onSelectPreset={handleSelectPreset}
        lang={lang}
      />
    </div>
  );
}
