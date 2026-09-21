export type ActionType = 
  | 'navigate' 
  | 'click' 
  | 'type' 
  | 'scroll' 
  | 'wait' 
  | 'screenshot' 
  | 'extract'
  | 'solve_captcha'
  | 'hover';

export type StepStatus = 'pending' | 'running' | 'completed' | 'failed' | 'skipped';

export interface AgentStep {
  id: string;
  order: number;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  status: StepStatus;
  actionType: ActionType;
  target?: string;
  selector?: string;
  inputData?: string;
  coordinates?: { x: number; y: number };
  timestamp?: string;
  screenshotUrl?: string;
  codeSnippet?: string;
  reasoning?: string;
  extractedData?: Record<string, unknown> | string;
}

export interface AutomationPreset {
  id: string;
  name: string;
  nameAr: string;
  category: string;
  description: string;
  descriptionAr: string;
  targetUrl: string;
  prompt: string;
  steps: Omit<AgentStep, 'id' | 'status' | 'order'>[];
}

export interface AgentSettings {
  apiKey: string;
  model: 'gemini-2.5-flash' | 'gemini-2.5-pro' | 'gemini-2.0-flash';
  visionResolution: 'high' | 'medium' | 'low';
  executionDelay: number;
  saveCookies: boolean;
  headless: boolean;
  stealthMode: boolean;
  allowedOrigins: string[];
}

export interface ConsoleLogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'action' | 'ai';
  message: string;
  details?: unknown;
}
