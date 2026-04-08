import React, { useState } from 'react';
import { Layout, ConfigProvider } from 'antd';
import { GoogleGenAI } from "@google/genai";
import { AnimatePresence } from 'motion/react';

// Components
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { HomePortal } from './components/HomePortal';
import { ChatPanel } from './components/ChatPanel';
import { ReportPanel } from './components/ReportPanel';

// Constants & Types
import { 
  MOCK_FINANCIAL_REPORT, 
  MOCK_SINGLE_CUSTOMER_REPORT, 
  SCENARIOS 
} from './constants';
import { 
  ChatMessage, 
  Scenario, 
  Report, 
  AnalysisStep, 
  AnalysisPlan, 
  FinancialReportData,
  SingleCustomerReportData,
  NegativeMarginReportData
} from './types';

const { Content } = Layout;

const INITIAL_ANALYSIS_FLOW: AnalysisStep[] = [
  { id: '1', title: '多维指标提取', description: '提取收入、成本、毛利等核心指标', status: 'completed', progress: 100 },
  { id: '2', title: '异常波动识别', description: '识别毛利环比下降超过20%的异常点', status: 'completed', progress: 100 },
  { id: '3', title: '成本动因下钻', description: '拆解路由成本、油耗及分摊费用', status: 'completed', progress: 100 },
  { id: '4', title: '生成诊断建议', description: '基于AI模型产出针对性优化策略', status: 'completed', progress: 100 },
];

const App: React.FC = () => {
  // UI State
  const [activeScenario, setActiveScenario] = useState<Scenario | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isChatCollapsed, setIsChatCollapsed] = useState(false);
  const [isThoughtExpanded, setIsThoughtExpanded] = useState(true);
  
  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  
  // Report State
  const [activeReport, setActiveReport] = useState<Report | null>(null);
  const [activeFinancialReport, setActiveFinancialReport] = useState<FinancialReportData | null>(null);
  const [activeSingleCustomerReport, setActiveSingleCustomerReport] = useState<SingleCustomerReportData | null>(null);
  const [activeNegativeMarginReport, setActiveNegativeMarginReport] = useState<NegativeMarginReportData | null>(null);
  const [selectedNegativeCustomerId, setSelectedNegativeCustomerId] = useState<string | null>(null);

  const ai = new GoogleGenAI({ apiKey: (import.meta as any).env?.VITE_GEMINI_API_KEY || (process as any).env?.GEMINI_API_KEY || '' });

  const handleNewChat = () => {
    setActiveScenario(null);
    setMessages([]);
    setInputValue('');
    setActiveFinancialReport(null);
    setActiveSingleCustomerReport(null);
    setActiveNegativeMarginReport(null);
    setIsChatCollapsed(false);
    setIsSidebarCollapsed(false);
  };

  const handleMultiCustomerDiagnosis = async () => {
    setIsSidebarCollapsed(true);
    const aiMsgId = Date.now().toString();
    const initialFlow: AnalysisStep[] = INITIAL_ANALYSIS_FLOW.map(s => ({ ...s, status: 'pending', progress: 0 }));
    
    const initialAiMsg: ChatMessage = { 
      id: aiMsgId, 
      role: 'assistant', 
      content: '', 
      isThinkingTextStreaming: true,
      analysisFlow: initialFlow,
      thinkingText: ''
    };
    
    setMessages(prev => [...prev, initialAiMsg]);
    setIsThinking(true);

    // Simulate thinking process
    const thinkingSteps = [
      "正在连接财务中台数据库...",
      "正在提取2026年2月全量客户经营数据...",
      "识别到本月毛利异常波动客户共计400家...",
      "正在按行业、产品线进行聚类分析...",
      "正在计算成本分摊动因..."
    ];

    let fullThinkingText = "";
    for (const step of thinkingSteps) {
      fullThinkingText += `> ${step}\n\n`;
      setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, thinkingText: fullThinkingText } : m));
      await new Promise(r => setTimeout(r, 800));
    }

    setMessages(prev => prev.map(m => m.id === aiMsgId ? { 
      ...m, 
      isThinkingTextStreaming: false,
      content: "诊断完成。根据大数据分析，本月多客户经营状况呈现以下特征：\n\n1. **整体毛利承压**：平均毛利率下降1.5个百分点。\n2. **亏损面扩大**：亏损客户数增加18%。\n3. **核心原因**：受燃油费上涨及中小客户折扣率失控影响。\n\n我已为您生成了详细的《多客户经营诊断概览报告》，请点击下方查看。",
      type: 'deliverable',
      financialReport: MOCK_FINANCIAL_REPORT
    } : m));
    
    setIsThinking(false);
  };

  const handleSend = async (text: string = inputValue) => {
    const finalInput = text || inputValue;
    if (!finalInput.trim()) return;
    
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: finalInput };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsThinking(true);

    // Intent Recognition
    if (finalInput.includes('多客户收益诊断') || finalInput.includes('多客户经营数据')) {
      const scenario = SCENARIOS.find(s => s.id === '3');
      if (scenario) setActiveScenario(scenario);
      handleMultiCustomerDiagnosis();
      return;
    }

    if (finalInput.includes('单客户收益诊断')) {
      const scenario = SCENARIOS.find(s => s.id === '1');
      if (scenario) setActiveScenario(scenario);
    }

    if (finalInput.includes('上海') || finalInput.includes('分析')) {
      const plan: AnalysisPlan = {
        title: "建议分析方案：上海区客户经营情况诊断",
        steps: [
          "上海区盈利地图：识别各网点/片区的利润贡献分布",
          "客户贡献度排名：Top 20 核心客户价值分析",
          "亏损客户聚类：按行业、产品线识别亏损共性原因",
          "生成《上海区客户收益诊断概览报告》"
        ]
      };

      const aiMsgId = (Date.now() + 1).toString();
      const planMsg: ChatMessage = {
        id: aiMsgId,
        role: 'assistant',
        content: '识别到您的分析意图：**上海区客户整体经营情况**。我建议按照以下思路进行深度诊断：',
        plan: plan,
        type: 'plan'
      };
      setMessages(prev => [...prev, planMsg]);
      setIsThinking(false);
      return;
    }

    // Default AI Response
    const aiMsgId = (Date.now() + 1).toString();
    const initialAiMsg: ChatMessage = { id: aiMsgId, role: 'assistant', content: '', isStreaming: true };
    setMessages(prev => [...prev, initialAiMsg]);
    
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: finalInput,
        config: { systemInstruction: "你是一位资深的财务分析AI专家。请以专业、严谨的口吻回答用户。关键数据指标需加粗展示。" }
      });
      setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, content: response.text || '', isStreaming: false } : m));
    } catch (e) {
      setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, content: '抱歉，分析过程中出现了点问题。', isStreaming: false } : m));
    }
    setIsThinking(false);
  };

  const handleConfirmPlan = async () => {
    const lastMsg = messages[messages.length - 1];
    const isSingleCustomer = lastMsg.plan?.title.includes('单客户');
    const isNegativeMargin = lastMsg.content.includes('5家客户') || lastMsg.plan?.title.includes('负毛利');
    
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: '按照这个思路产出报告' };
    setMessages(prev => [...prev, userMsg]);
    
    const reportMsgId = (Date.now() + 1).toString();
    const initialFlow: AnalysisStep[] = INITIAL_ANALYSIS_FLOW.map(s => ({ ...s, status: 'pending', progress: 0 }));
    
    setMessages(prev => [...prev, { 
      id: reportMsgId, 
      role: 'assistant', 
      content: '', 
      isThinkingTextStreaming: true,
      analysisFlow: initialFlow,
      thinkingText: ''
    }]);
    setIsThinking(true);

    // Simulate thinking
    const steps = ["正在提取明细数据...", "正在进行多维归因...", "正在生成诊断结论..."];
    let thinking = "";
    for (const s of steps) {
      thinking += `> ${s}\n\n`;
      setMessages(prev => prev.map(m => m.id === reportMsgId ? { ...m, thinkingText: thinking } : m));
      await new Promise(r => setTimeout(r, 600));
    }

    setMessages(prev => prev.map(m => m.id === reportMsgId ? { 
      ...m, 
      isThinkingTextStreaming: false,
      content: isSingleCustomer 
        ? "已为您生成该客户的深度诊断报告。分析显示，该客户亏损主要源于**产品折扣率过高**及**路由分摊成本异常**。建议调优报价策略。"
        : "已为您完成负毛利客户专项诊断。识别到5家核心亏损客户，主要共性原因为**燃油附加费未足额传导**。建议启动价格联动机制。",
      type: 'deliverable',
      singleCustomerReport: isSingleCustomer ? MOCK_SINGLE_CUSTOMER_REPORT : undefined,
      negativeMarginReport: isNegativeMargin ? {
        title: "负毛利客户专项诊断报告",
        summary: "识别到5家核心亏损客户，主要共性原因为燃油附加费未足额传导。",
        customers: [
          { ...MOCK_SINGLE_CUSTOMER_REPORT, customerId: "1064695566" },
          { ...MOCK_SINGLE_CUSTOMER_REPORT, customerId: "1064695567" },
          { ...MOCK_SINGLE_CUSTOMER_REPORT, customerId: "1064695568" },
          { ...MOCK_SINGLE_CUSTOMER_REPORT, customerId: "1064695569" },
          { ...MOCK_SINGLE_CUSTOMER_REPORT, customerId: "1064695570" },
        ]
      } : undefined
    } : m));
    setIsThinking(false);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#2563eb',
          borderRadius: 12,
          fontFamily: 'Inter, system-ui, sans-serif',
        },
        components: {
          Button: {
            fontWeight: 500,
            boxShadow: 'none',
          },
          Card: {
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          }
        }
      }}
    >
      <Layout className="h-screen bg-[#f8fbff] overflow-hidden flex flex-row">
        <Sidebar 
          onNewChat={handleNewChat} 
          collapsed={isSidebarCollapsed} 
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
        />
        
        <Layout className="flex-1 flex flex-col bg-transparent relative overflow-hidden">
          <TopHeader />
          
          <Content className="flex-1 flex flex-col relative overflow-hidden">
            <AnimatePresence mode="wait">
              {messages.length === 0 ? (
                <HomePortal 
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                  isEnhancing={false}
                  onMagicEnhance={() => {}}
                  onSend={handleSend}
                  scenarios={SCENARIOS} 
                  onScenarioClick={(s) => {
                    setActiveScenario(s);
                    handleSend(s.title);
                  }} 
                />
              ) : (
                <div key="chat" className="flex-1 overflow-hidden flex flex-col">
                  <div className={`split-screen-container flex-1 overflow-hidden transition-all duration-500 ease-in-out ${isChatCollapsed ? 'chat-collapsed' : ''} ${!(activeReport || activeFinancialReport || activeSingleCustomerReport || activeNegativeMarginReport) ? 'justify-center' : ''}`}>
                    <ChatPanel 
                      messages={messages}
                      inputValue={inputValue}
                      setInputValue={setInputValue}
                      onSend={handleSend}
                      isThinking={isThinking}
                      isChatCollapsed={isChatCollapsed}
                      onToggleCollapse={() => setIsChatCollapsed(!isChatCollapsed)}
                      isThoughtExpanded={isThoughtExpanded}
                      setIsThoughtExpanded={setIsThoughtExpanded}
                      onConfirmPlan={handleConfirmPlan}
                      activeScenario={activeScenario}
                    />
                    
                    <ReportPanel 
                      activeReport={activeReport}
                      setActiveReport={setActiveReport}
                      activeFinancialReport={activeFinancialReport}
                      setActiveFinancialReport={setActiveFinancialReport}
                      activeSingleCustomerReport={activeSingleCustomerReport}
                      setActiveSingleCustomerReport={setActiveSingleCustomerReport}
                      activeNegativeMarginReport={activeNegativeMarginReport}
                      setActiveNegativeMarginReport={setActiveNegativeMarginReport}
                      selectedNegativeCustomerId={selectedNegativeCustomerId}
                      onCloseReport={() => setIsSidebarCollapsed(false)}
                    />
                  </div>
                </div>
              )}
            </AnimatePresence>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
