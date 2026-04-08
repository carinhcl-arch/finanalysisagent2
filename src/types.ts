export interface Metric {
  id: string;
  name: string;
  category: '收入' | '成本' | '利润' | '品质' | '资产' | '人资';
  description: string;
  isSensitive?: boolean;
  isOfficial?: boolean;
}

export interface Report {
  id: string;
  title: string;
  date: string;
  summary: string;
  metrics: {
    label: string;
    value: string;
    yoy: string;
    qoq: string;
    trend: 'up' | 'down';
  }[];
  chartData: any[];
}

export interface AnalysisStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'processing' | 'completed';
  progress?: number;
  children?: AnalysisStep[];
}

export interface AnalysisPlan {
  title: string;
  steps: string[];
}

export interface FinancialReportData {
  summary: string;
  stats: {
    label: string;
    value: string;
    trend: 'up' | 'down';
    trendValue: string;
  }[];
  bubbleData: {
    name: string;
    revenue: number;
    margin: number;
    size: number;
    category: string;
  }[];
  customerList: {
    id: string;
    name: string;
    revenue: string;
    cost: string;
    margin: string;
    status: 'loss' | 'warning' | 'normal' | 'success';
  }[];
}

export interface SingleCustomerReportData {
  customerId: string;
  reportDate: string;
  diagnosis: {
    status: string;
    summary: string;
    mainReasons: string[];
    metrics: { label: string; value: string; change: string }[];
  };
  strategies: string[];
  businessAnalysis: {
    metrics: { label: string; value: string; subValue?: string; change?: string; iconType: 'business' | 'profit' | 'revenue' }[];
    summary: string;
  };
  waterfallData: { label: string; value: number; type: 'base' | 'change' | 'total' }[];
  waterfallAnalysis: {
    revenue: { title: string; content: string };
    cost: { title: string; content: string };
  };
  lossAnalysis: {
    topAccounts: { id: string; margin: string; marginChange: string; rate: string; rateChange: string }[];
    topProducts: { id: string; revenue: string; product: string; discount: string; cost: string; margin: string; marginRate: string; marginRatePercent: string }[];
    pvmAnalysis: {
      title: string;
      metrics: { label: string; value: string; color?: string }[];
      findings: string[];
    };
  };
  detailedStrategies: {
    cost: { title: string; id: string; reason: string; suggestion: string }[];
    revenue: { title: string; id: string; reason: string; suggestion: string }[];
  };
  expertAdvice: {
    situation: string;
    directions: { title: string; content: string }[];
    actions: { owner: string; plan: string[] };
    risk: string;
  };
}

export interface NegativeMarginReportData {
  title: string;
  customers: SingleCustomerReportData[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  thoughtChain?: string[];
  analysisFlow?: AnalysisStep[];
  report?: Report;
  financialReport?: FinancialReportData;
  singleCustomerReport?: SingleCustomerReportData;
  negativeMarginReport?: NegativeMarginReportData;
  plan?: AnalysisPlan;
  type?: 'text' | 'report' | 'picker' | 'deliverable' | 'plan';
  isStreaming?: boolean;
  suggestions?: string[];
  thinkingText?: string;
  isThinkingTextStreaming?: boolean;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  icon: string;
  status?: 'building' | 'active';
}
