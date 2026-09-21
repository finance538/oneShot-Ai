"use client";

import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  RotateCw, 
  ArrowLeft, 
  ArrowRight, 
  Camera, 
  Sparkles
} from "lucide-react";
import { AgentStep } from "@/types/agent";

interface BrowserViewportProps {
  url: string;
  activeStep?: AgentStep;
  isRunning: boolean;
  lang: "en" | "ar";
}

export const BrowserViewport: React.FC<BrowserViewportProps> = ({
  url,
  activeStep,
  isRunning,
  lang,
}) => {
  const isAr = lang === "ar";
  const [cursorPos, setCursorPos] = useState({ x: 450, y: 220 });
  const [isClicking, setIsClicking] = useState(false);

  // Update cursor position when activeStep changes
  useEffect(() => {
    if (activeStep?.coordinates) {
      setCursorPos(activeStep.coordinates);
      if (activeStep.actionType === "click" || activeStep.actionType === "type") {
        setIsClicking(true);
        const timer = setTimeout(() => setIsClicking(false), 900);
        return () => clearTimeout(timer);
      }
    }
  }, [activeStep]);

  return (
    <div className="flex flex-col h-full rounded-2xl bg-[#0F1216] border border-[#232832] overflow-hidden shadow-2xl relative">
      {/* Chrome Window Header */}
      <div className="bg-[#14181E] border-b border-[#232832] px-3.5 py-2.5 flex items-center justify-between gap-3">
        {/* Window controls */}
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#EF4444]/80 border border-[#DC2626]"></span>
          <span className="w-3 h-3 rounded-full bg-[#F59E0B]/80 border border-[#D97706]"></span>
          <span className="w-3 h-3 rounded-full bg-[#10B981]/80 border border-[#059669]"></span>
        </div>

        {/* Navigation buttons & URL Bar */}
        <div className="flex items-center gap-2 flex-1 max-w-2xl">
          <div className="flex items-center gap-1 text-[#6B7280]">
            <button className="p-1 hover:text-white rounded transition-colors"><ArrowLeft className="w-3.5 h-3.5" /></button>
            <button className="p-1 hover:text-white rounded transition-colors"><ArrowRight className="w-3.5 h-3.5" /></button>
            <button className={`p-1 hover:text-white rounded transition-colors ${isRunning ? "animate-spin text-[#FB8656]" : ""}`}>
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Omnibox / URL Field */}
          <div className="flex-1 bg-[#0A0C0E] border border-[#262D38] rounded-lg px-3 py-1.5 flex items-center gap-2 text-xs text-[#A1AAB8]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="font-mono text-[11px] truncate text-white">{url || "https://1shotcam.com"}</span>
            <span className="text-[10px] text-emerald-500/80 ml-auto font-mono shrink-0 hidden sm:inline">200 OK</span>
          </div>
        </div>

        {/* Resolution Badge & Screenshot Button */}
        <div className="flex items-center gap-2 text-[11px] text-[#8892A2]">
          <span className="hidden lg:inline font-mono text-[10px] px-2 py-0.5 rounded bg-[#1C212A] text-[#9BA3AF]">
            1280 × 800
          </span>
          <button 
            className="p-1.5 rounded hover:bg-[#202632] text-[#A1AAB8] hover:text-white transition-colors"
            title={isAr ? "التقاط لقطة شاشة" : "Capture Snapshot"}
          >
            <Camera className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Simulated Browser Web Canvas */}
      <div className="relative flex-1 bg-[#12151A] overflow-hidden select-none min-h-[440px] flex flex-col justify-between">
        {/* Computer Use Radar Scan line when active */}
        {isRunning && (
          <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#FB8656] to-transparent shadow-lg shadow-[#E05520]/80 z-30 animate-radar pointer-events-none" />
        )}

        {/* Simulated Website UI Content */}
        <div className="p-6 flex-1 flex flex-col justify-between relative">
          {/* Top Banner of simulated target site */}
          <div className="bg-[#171B22]/90 backdrop-blur border border-[#2A313E] rounded-xl p-4 mb-4 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#E05520] flex items-center justify-center font-bold text-white text-xs">
                1S
              </div>
              <div>
                <h3 className="text-white text-sm font-bold flex items-center gap-1.5">
                  1ShotCam Pro Series
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#E05520]/20 text-[#FB8656] border border-[#E05520]/30 font-normal">
                    Verified Store
                  </span>
                </h3>
                <p className="text-[11px] text-[#8892A2]">Cinema Camera Systems & Precision Optic Tools</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="text-[#A1AAB8] hidden md:inline">Cart (0)</span>
              <button className="px-3 py-1.5 bg-[#E05520] hover:bg-[#FB8656] text-white rounded-lg font-medium text-xs shadow-md transition-colors">
                {isAr ? "تسجيل الدخول" : "Sign In"}
              </button>
            </div>
          </div>

          {/* Target Content Simulator */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-auto">
            {/* Product Card 1 */}
            <div className={`relative bg-[#171B22] border rounded-xl p-4 transition-all duration-300 ${activeStep?.actionType === "click" && activeStep?.selector?.includes("pro") ? "border-[#E05520] ring-2 ring-[#E05520]/40 shadow-xl" : "border-[#262D38]"}`}>
              <div className="h-28 rounded-lg bg-gradient-to-br from-[#242A35] to-[#12161C] flex items-center justify-center border border-[#2D3543] relative overflow-hidden mb-3">
                <div className="w-14 h-14 rounded-full border-2 border-[#E05520]/60 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-[#E05520]/20"></div>
                </div>
                <span className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded bg-[#E05520] text-white">8K RAW</span>
              </div>
              <h4 className="text-white font-semibold text-xs mb-1">OneShot Alpha Cinema 8K</h4>
              <p className="text-[#8892A2] text-[11px] mb-2">Full Frame Global Shutter & Dual Native ISO</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm font-bold text-white font-mono">$4,890.00</span>
                <span className="text-[10px] text-emerald-400 font-medium">In Stock</span>
              </div>
            </div>

            {/* Product Card 2 */}
            <div className="bg-[#171B22] border border-[#262D38] rounded-xl p-4 opacity-75">
              <div className="h-28 rounded-lg bg-gradient-to-br from-[#242A35] to-[#12161C] flex items-center justify-center border border-[#2D3543] mb-3">
                <div className="w-12 h-12 rounded-full border border-gray-600"></div>
              </div>
              <h4 className="text-white font-semibold text-xs mb-1">OneShot Anamorphic 50mm</h4>
              <p className="text-[#8892A2] text-[11px] mb-2">T2.1 1.8x Cine Prime Lens System</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm font-bold text-white font-mono">$1,950.00</span>
                <span className="text-[10px] text-emerald-400 font-medium">In Stock</span>
              </div>
            </div>

            {/* Product Card 3 */}
            <div className="bg-[#171B22] border border-[#262D38] rounded-xl p-4 opacity-75">
              <div className="h-28 rounded-lg bg-gradient-to-br from-[#242A35] to-[#12161C] flex items-center justify-center border border-[#2D3543] mb-3">
                <div className="w-12 h-12 rounded-full border border-gray-600"></div>
              </div>
              <h4 className="text-white font-semibold text-xs mb-1">OneShot Gimbal Stabilizer Pro</h4>
              <p className="text-[#8892A2] text-[11px] mb-2">Carbon Fiber 3-Axis Motorized Rig</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm font-bold text-white font-mono">$820.00</span>
                <span className="text-[10px] text-amber-400 font-medium">Low Stock</span>
              </div>
            </div>
          </div>

          {/* Bottom Action Status Overlay */}
          <div className="mt-4 bg-[#0A0C0F]/90 border border-[#222731] rounded-xl p-3 flex items-center justify-between backdrop-blur-md">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FB8656] animate-pulse" />
              <div className="text-xs">
                <span className="text-[#8892A2]">{isAr ? "الإجراء المنفذ حالياً: " : "Active Grounded Action: "}</span>
                <span className="font-semibold text-white">
                  {activeStep ? (isAr ? activeStep.titleAr : activeStep.title) : (isAr ? "جاهز للتوجيه" : "Idle / Standing by")}
                </span>
              </div>
            </div>

            {activeStep?.selector && (
              <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono bg-[#161B22] px-2.5 py-1 rounded border border-[#28303E] text-[#FB8656]">
                <span>locator:</span>
                <span className="text-white">{activeStep.selector}</span>
              </div>
            )}
          </div>
        </div>

        {/* AI Virtual Cursor / Pointer Simulation */}
        <div 
          className="absolute pointer-events-none transition-all duration-700 ease-out z-40"
          style={{ 
            left: `${cursorPos.x}px`, 
            top: `${cursorPos.y}px`,
            transform: "translate(-2px, -2px)"
          }}
        >
          <div className="relative">
            {/* Custom Mouse Cursor SVG */}
            <svg 
              className="w-6 h-6 text-[#E05520] filter drop-shadow-[0_2px_8px_rgba(224,85,32,0.8)]"
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M4.5 3.5l14 7-6.5 1.5-3.5 6.5-4-15z" />
            </svg>

            {/* Click ripple animation */}
            {isClicking && (
              <span className="absolute -top-3 -left-3 w-12 h-12 rounded-full border-2 border-[#FB8656] animate-ping opacity-80 pointer-events-none"></span>
            )}

            {/* Label Tag attached to cursor */}
            <div className="absolute top-5 left-4 whitespace-nowrap bg-[#0B0D0F]/90 border border-[#E05520]/60 px-2 py-0.5 rounded text-[10px] font-mono text-[#FB8656] shadow-lg">
              OneShot Agent [x:{cursorPos.x}, y:{cursorPos.y}]
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
