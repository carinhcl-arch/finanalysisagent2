import React, { useState } from 'react';
import { Layout, Button, Input, Avatar, Badge, Typography, Space, Spin, Divider } from 'antd';
import { AnalysisFlow } from './components/AnalysisFlow';
import { 
  RobotOutlined, 
  SendOutlined, 
  ThunderboltOutlined, 
  HistoryOutlined, 
  ArrowRightOutlined, 
  ArrowLeftOutlined, 
  CloseOutlined, 
  ClockCircleOutlined, 
  BulbOutlined, 
  NodeIndexOutlined, 
  DownOutlined, 
  UpOutlined, 
  PlusCircleOutlined, 
  FileTextOutlined, 
  AppstoreOutlined, 
  DatabaseOutlined, 
  CheckCircleOutlined, 
  MoreOutlined 
} from '@ant-design/icons';
import { Bot, Sparkles, BrainCircuit, Terminal } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Markdown from 'react-markdown';
import { FinancialReport } from './components/FinancialReport';
import { AnalysisPlanConfirmation } from './components/AnalysisPlanConfirmation';
import { MindMap } from './components/MindMap';
import { SingleCustomerReport } from './components/SingleCustomerReport';
import { NegativeMarginReport } from './components/NegativeMarginReport';
import { GoogleGenAI } from "@google/genai";
import { 
  Metric, 
  ChatMessage, 
  Scenario, 
  Report, 
  AnalysisStep, 
  AnalysisPlan, 
  FinancialReportData,
  SingleCustomerReportData,
  NegativeMarginReportData
} from './types';
import { Sidebar } from './components/Sidebar';
import { HomePortal } from './components/HomePortal';
import { ReportCard } from './components/ReportCard';
import { SmartPicker } from './components/SmartPicker';

import { TopHeader } from './components/TopHeader';

const { Content } = Layout;
const { Text, Title } = Typography;

const MOCK_FINANCIAL_REPORT: FinancialReportData = {
  summary: "本月多客户收益表现呈现两极分化。核心大客户保持稳定利润贡献，但中小客户（SME）群体受运输成本上涨影响，毛利率普遍下滑。建议针对亏损Top 10客户启动专项成本优化方案。",
  stats: [
    { label: "总客户数", value: "1,248", trend: "up", trendValue: "12" },
    { label: "盈利客户", value: "848", trend: "down", trendValue: "5" },
    { label: "亏损客户", value: "400", trend: "up", trendValue: "18" },
    { label: "平均毛利率", value: "14.2%", trend: "down", trendValue: "1.5%" }
  ],
  bubbleData: [
    { name: "客户A", revenue: 500, margin: 25, size: 80, category: "高价值" },
    { name: "客户B", revenue: 450, margin: 22, size: 70, category: "高价值" },
    { name: "客户C", revenue: 300, margin: -5, size: 50, category: "亏损" },
    { name: "客户D", revenue: 280, margin: -8, size: 45, category: "亏损" },
    { name: "客户E", revenue: 600, margin: 18, size: 90, category: "高价值" },
    { name: "客户F", revenue: 150, margin: 5, size: 30, category: "潜力" },
    { name: "客户G", revenue: 120, margin: -12, size: 25, category: "亏损" }
  ],
  customerList: [
    { id: "1", name: "某电子科技公司", revenue: "125.4万", cost: "135.2万", margin: "-7.8%", status: "loss" },
    { id: "2", name: "某国际贸易集团", revenue: "98.2万", cost: "105.5万", margin: "-7.4%", status: "loss" },
    { id: "3", name: "某连锁商超", revenue: "85.6万", cost: "92.1万", margin: "-7.6%", status: "loss" },
    { id: "4", name: "某服饰品牌", revenue: "72.1万", cost: "78.5万", margin: "-8.9%", status: "loss" },
    { id: "5", name: "某生鲜电商", revenue: "65.4万", cost: "72.8万", margin: "-11.3%", status: "loss" }
  ]
};

const MOCK_SINGLE_CUSTOMER_REPORT: SingleCustomerReportData = {
  customerId: "1064695566",
  reportDate: "2026年02月",
  diagnosis: {
    status: "严重亏损",
    summary: "客户整体经营状态为“严重亏损”，毛利额为-26.19万元，毛利率为-13.05%。本月出现三个主要问题现象：利润大幅下滑、业务贡献缩减、成本控制失效。",
    mainReasons: [
      "客户毛利额大幅下滑：同比下降50.16万元，降幅达209.32%，由盈利23.96万元转为亏损26.19万元",
      "业务贡献大幅缩减：产品折扣率从62.40%下调至56.47%，含税收入净额同比下降61.10%",
      "成本控制失效：成本占收入比达到113.05%，环比上升17.70个百分点"
    ],
    metrics: [
      { label: "含税收入净额", value: "212.70万", change: "-61.10%" },
      { label: "毛利额", value: "-26.19万", change: "-209.32%" },
      { label: "毛利率", value: "-13.05%", change: "-17.70个百分点" },
      { label: "票数", value: "171,782票", change: "-62.40%" }
    ]
  },
  strategies: [
    "针对本月亏损较大的结算账号，需重点关注：渠道配置指标模型(111029)，优化个别账号的代理商配置",
    "一口价报价异常模型(013201)，调整个别结算账号的一口价报价策略"
  ],
  businessAnalysis: {
    metrics: [
      { label: "业务指标", value: "1,319,195.77KG", subValue: "7.68KG/票", change: "-62.40%", iconType: 'business' },
      { label: "利润成本", value: "-26.19万元", subValue: "-13.05%", change: "-17.70个百分点", iconType: 'profit' },
      { label: "收入分析", value: "212.70万元", subValue: "11.68元/票", change: "-61.10%", iconType: 'revenue' }
    ],
    summary: "客户经营状况极度恶化：业务量骤降（票数下降62.40%）导致收入大幅萎缩，同时成本控制失效（成本占收入比达113.05%），造成毛利从盈转亏。尽管单票不含税收入有所提升（+3.46%），但无法弥补业务量大幅下降带来的规模效应损失。"
  },
  waterfallData: [
    { label: "2026年01月", value: 23.96, type: 'base' },
    { label: "业务量影响", value: -14.95, type: 'change' },
    { label: "折扣率", value: 7.85, type: 'change' },
    { label: "单公斤自营成本", value: -20.16, type: 'change' },
    { label: "2026年02月", value: -26.19, type: 'total' }
  ],
  waterfallAnalysis: {
    revenue: { title: "收入端分析", content: "折扣率改善：折扣率下调导致毛利贡献增加+7.85万元。折前影响：折前单价降低导致毛利减少-0.34万元。提报：当月通过运营调整的含税收入净额为212.70万元。" },
    cost: { title: "成本端分析", content: "采购成本端主要问题：1. 运输成本：导致毛利减少-20.16万元，为主要成本驱动因素。2. 转运站成本：导致毛利减少-3.47万元。自营成本端主要问题：1. 运输成本：导致毛利减少-19.33万元，为第二大成本驱动因素。2. 收派成本：导致毛利减少-3.67万元。3. 运输成本：导致毛利减少-1.80万元。核心结论：运输成本（采购+自营合计-21.96万元）和运输成本（采购+自营合计-22.80万元）是毛利下降的核心驱动因素，合计占毛利下降总额的89.40%。" }
  },
  lossAnalysis: {
    topAccounts: [
      { id: "3580143939", margin: "-287,330.69", marginChange: "-201.56%", rate: "-19.49%", rateChange: "-25.51个百分点" },
      { id: "3580143611", margin: "-14,524.31", marginChange: "+66.98%", rate: "-18.38%", rateChange: "+0.88个百分点" },
      { id: "3580144208", margin: "-3,311.65", marginChange: "-463.46%", rate: "-11.53%", rateChange: "-9.81个百分点" }
    ],
    topProducts: [
      { id: "3580143939", revenue: "电商", product: "电商标快", discount: "56.47%", cost: "2.77元", margin: "1.96元", marginRate: "-295,479.76", marginRatePercent: "-47.13%" },
      { id: "3580143611", revenue: "仓储服务", product: "仓储收入", discount: "100.00%", cost: "-", margin: "-", marginRate: "-14,671.43", marginRatePercent: "-18.49%" },
      { id: "3580144221", revenue: "电商", product: "电商特快", discount: "58.27%", cost: "3.37元", margin: "2.17元", marginRate: "-4,516.41", marginRatePercent: "-23.61%" }
    ],
    pvmAnalysis: {
      title: "流向/重量段/增值服务/PVM分析",
      metrics: [
        { label: "产品不含税收入", value: "8.50万元" },
        { label: "收入同比占比", value: "13.55%" },
        { label: "毛利额", value: "-3.54万元", color: 'red' },
        { label: "毛利率", value: "-41.66%", color: 'red' }
      ],
      findings: [
        "电商标快产品在山西-山东流向出现严重亏损",
        "产品折扣率异常：电商标快折扣率56.47%-58.27%，低于客户整体折扣率65.63%",
        "成本收入倒挂：单公斤不含税收入2.77-3.37元，低于单公斤自营成本3.72元"
      ]
    }
  },
  detailedStrategies: {
    cost: [
      { title: "渠道配置指标不符(模型编码: 111029)", id: "3580143939、3580140792", reason: "2个结算账号存在代理商配置不当情况，导致成本分摊异常，涉及票数2票", suggestion: "复核3580143939、3580140792账号的代理商配置标准，确保一月内完成适配，避免资源错配导致的成本增加" }
    ],
    revenue: [
      { title: "一口价报价异常行为(模型编码: 013201)", id: "3580145590、3580145538、3580140792、3580143939、3580144208 (共6个账号)", reason: "6个结算账号存在折扣和一口价冲突，为一二三级对冲，同一折扣门槛最大值，同一折扣门槛最大值，推算价格相同的报价行为。衡量价值偏离度为5.4元", suggestion: "针对电商标快产品，提价建议：针对山西-山东流向一口价，提价10%-15%；重量段优化：对0-1kg重量段提价0.5-1.0元，提升小票盈利能力；产品组合优化：在亏损严重的电商板块推广顺丰特快等高价值产品替代电商标快" }
    ]
  },
  expertAdvice: {
    situation: "经营现状简评：受宏观环境影响，电商标快产品产量严重下滑，需立即采取行动优化产品结构。当前客户对电商标快产品依赖度过高且单票利润极低，需要立即执行流向控制和产品结构升级。",
    directions: [
      { title: "立即行动(本周)", content: "针对账号3580143939的电商标快产品，调整山西-山东流向一口价，提价10%（约0.28元/公斤），预计减少亏损1.5万元" },
      { title: "短期行动(本月)", content: "统一3580143939、3580140792账号的代理商配置标准，优化路线和网点成本控制，预计降低采购成本3%-5%" },
      { title: "中期行动(下月)", content: "在山西地区推广“顺丰特快”替代部分低毛利电商标快业务，优化产品结构，提升整体毛利率至8%以上" }
    ],
    actions: {
      owner: "地区销售+财务分析团队",
      plan: [
        "本周内完成电商标快提价方案审批",
        "本月内完成代理商配置标准统一",
        "下月内完成产品结构调整效果复核"
      ]
    },
    risk: "风险提示：若提价导致业务量进一步下滑，需重新评估客户价值。考虑到当前市场竞争，提价需谨慎平衡客户粘性。"
  }
};

// Mock Data
const SCENARIOS: Scenario[] = [
  { id: '3', title: '多客户收益诊断', description: '多客户经营数据概览展示，一键触达影响客户毛利率根因，明确给与改善建议', icon: '📍', status: 'active' },
  { id: '1', title: '单客户收益诊断', description: '客户经营数据全展示，一键触达影响客户毛利率根因，明确给与改善建议', icon: '👤', status: 'active' },
  { id: '2', title: '网点收益诊断', description: '网点经营数据全展示，一键定位价值缺口，智能推送优化空间', icon: '🏢', status: 'active' },
  { id: '4', title: '场地收益诊断', description: '场地经营数据全展示，一键定位经营态势，智能推送优化空间', icon: '🏟️', status: 'active' },
];

const METRICS: Metric[] = [
  { id: 'm1', name: '管报收入', category: '收入', description: '管理报表口径下的总收入', isOfficial: true },
  { id: 'm2', name: '经营成本', category: '成本', description: '实际经营过程中产生的各项成本', isOfficial: true },
  { id: 'm3', name: '销售成本', category: '成本', description: '销售环节产生的直接成本', isOfficial: true },
  { id: 'm4', name: '管理成本', category: '成本', description: '后台管理分摊成本', isOfficial: true },
  { id: 'm5', name: '综合总成本', category: '成本', description: '全口径成本汇总', isOfficial: true },
  { id: 'm6', name: '净利润', category: '利润', description: '收入减去所有成本后的净额', isOfficial: true },
];

const MOCK_CHART_DATA = [
  { name: '1月', 收入: 4000, 成本: 2400 },
  { name: '2月', 收入: 3000, 成本: 1398 },
  { name: '3月', 收入: 2000, 成本: 9800 },
  { name: '4月', 收入: 2780, 成本: 3908 },
  { name: '5月', 收入: 1890, 成本: 4800 },
  { name: '6月', 收入: 2390, 成本: 3800 },
];

const INITIAL_ANALYSIS_FLOW: AnalysisStep[] = [
  { id: 'start', title: '分析启动', description: '对选定客户进行深度专项分析', status: 'pending' },
  { id: 'task', title: '任务分发', description: '并行执行数据提取、AI总览、深度分析、报告生成', status: 'pending' },
  { id: 'data', title: '数据提取', description: '从客户分产品利润表提取核心指标', status: 'pending' },
  { id: 'ai', title: 'AI总览', description: '按问题严重度输出结论、归因诊断、经营概览与改进建议', status: 'pending' },
  { id: 'profit', title: '利润分析', description: '瀑布图分解 + 负毛利客户多维下钻', status: 'pending' },
  { id: 'strategy', title: '策略生成', description: '整合收入端和成本端策略，基于分析输出改进意见', status: 'pending' },
  { id: 'output', title: '报告输出', description: '整合所有模块结果，生成完整诊断报告', status: 'pending' },
];

const MOCK_NEGATIVE_MARGIN_REPORT: NegativeMarginReportData = {
  title: '负毛利客户收益诊断报告',
  customers: [
    MOCK_SINGLE_CUSTOMER_REPORT,
    {
      ...MOCK_SINGLE_CUSTOMER_REPORT,
      customerId: '1064695577',
      diagnosis: {
        ...MOCK_SINGLE_CUSTOMER_REPORT.diagnosis,
        status: '中度亏损',
        summary: '客户1064695577本月毛利额为-12.45万元，毛利率为-5.8%。主要受单价下滑及人工成本上升影响。'
      }
    },
    {
      ...MOCK_SINGLE_CUSTOMER_REPORT,
      customerId: '1064695588',
      diagnosis: {
        ...MOCK_SINGLE_CUSTOMER_REPORT.diagnosis,
        status: '轻度预警',
        summary: '客户1064695588毛利率降至-1.2%，处于盈亏平衡点边缘。需关注其折扣率变动。'
      }
    }
  ]
};

export default function App() {
  const [activeScenario, setActiveScenario] = useState<Scenario | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(['m1', 'm2', 'm3', 'm4']);
  const [activeReport, setActiveReport] = useState<Report | null>(null);
  const [activeFinancialReport, setActiveFinancialReport] = useState<FinancialReportData | null>(null);
  const [activeSingleCustomerReport, setActiveSingleCustomerReport] = useState<SingleCustomerReportData | null>(null);
  const [activeNegativeMarginReport, setActiveNegativeMarginReport] = useState<NegativeMarginReportData | null>(null);
  const [selectedNegativeCustomerId, setSelectedNegativeCustomerId] = useState<string | null>(null);
  const [isChatCollapsed, setIsChatCollapsed] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isThoughtExpanded, setIsThoughtExpanded] = useState(true);

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const handleNewChat = () => {
    setActiveScenario(null);
    setMessages([]);
    setInputValue('');
    setActiveFinancialReport(null);
    setActiveSingleCustomerReport(null);
    setActiveNegativeMarginReport(null);
    setIsSidebarCollapsed(false);
    setIsChatCollapsed(false);
  };

  const handleScenarioClick = (scenario: Scenario) => {
    let prompt = '';
    switch (scenario.id) {
      case '1':
        prompt = '请帮我进行单客户收益诊断。我想分析特定大客户的经营数据，找出影响毛利率的核心原因，并获取具体的改善建议。';
        break;
      case '2':
        prompt = '请帮我进行网点收益诊断。我想查看网点的经营数据，定位价值缺口，并了解如何优化网点经营效率。';
        break;
      case '3':
        prompt = '请帮我进行多客户收益诊断。我想对全量客户的经营状况进行概览分析，识别影响整体毛利率的关键因素。';
        break;
      case '4':
        prompt = '请帮我进行场地收益诊断。我想分析场地的经营态势，识别效率瓶颈并获取智能推送的优化空间。';
        break;
      default:
        prompt = `请帮我进行${scenario.title}，分析当前的经营状况并给出优化建议。`;
    }
    setInputValue(prompt);
    
    // Optional: Scroll to top to show the input box
    const portal = document.querySelector('.overflow-y-auto');
    if (portal) {
      portal.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleMultiCustomerDiagnosis = async () => {
    setIsSidebarCollapsed(true);
    const aiMsgId = Date.now().toString();
    const initialFlow: AnalysisStep[] = INITIAL_ANALYSIS_FLOW.map(s => ({ ...s, status: 'pending', progress: 0 }));
    
    const initialAiMsg: ChatMessage = {
      id: aiMsgId,
      role: 'assistant',
      content: '正在为您进行**多客户收益诊断**...',
      thoughtChain: [],
      isThinkingTextStreaming: true,
      thinkingText: '',
      analysisFlow: initialFlow,
      type: 'deliverable'
    };
    setMessages(prev => [...prev, initialAiMsg]);
    setIsThinking(true);

    const thoughts = [
      '[数据抓取中...] 正在提取全量客户经营明细数据',
      '[逻辑建模中...] 构建多客户收益诊断模型，涵盖收入、成本、毛利维度',
      '[逻辑建模中...] 计算各客户毛利率贡献度，识别利润偏离度异常的TopN客户',
      '[生成对比视图...] 正在生成价值分布矩阵与亏损客户清单'
    ];

    for (let i = 0; i < thoughts.length; i++) {
      await new Promise(r => setTimeout(r, 600));
      setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, thoughtChain: [...(m.thoughtChain || []), thoughts[i]] } : m));
    }

    // Simulate Granular Analysis Flow
    const steps: AnalysisStep[] = [...initialFlow];
    for (let i = 0; i < steps.length; i++) {
      // Set current step to processing
      steps[i] = { ...steps[i], status: 'processing', progress: 0 };
      setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, analysisFlow: [...steps] } : m));

      for (let p = 0; p <= 100; p += 25) {
        await new Promise(r => setTimeout(r, 120));
        steps[i] = { ...steps[i], progress: p };
        setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, analysisFlow: [...steps] } : m));
      }

      steps[i] = { ...steps[i], status: 'completed', progress: 100 };
      setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, analysisFlow: [...steps] } : m));
      await new Promise(r => setTimeout(r, 150));
    }

    const fullThinkingContent = `已为您完成**多客户收益诊断**。
    
核心发现：
1. **整体利润承压**：总利润环比下降**2.1%**，主要受亏损客群扩大影响。
2. **结构性亏损显著**：32%的客户处于亏损状态，累计负毛利超**850万元**。
3. **成本驱动因素**：单票成本异常是导致SME客群毛利下滑的核心原因。

详细诊断报告已生成，请在右侧查看。

已为您完成整体诊断。分析显示部分客户存在亏损/毛利异常，是否需要针对这些亏损客户进行深度归因分析？`;

    let currentThinkingText = '';
    const chars = fullThinkingContent.split('');
    for (let i = 0; i < chars.length; i++) {
      await new Promise(r => setTimeout(r, 5));
      currentThinkingText += chars[i];
      setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, thinkingText: currentThinkingText } : m));
    }

    setMessages(prev => prev.map(m => m.id === aiMsgId ? { 
      ...m, 
      isThinkingTextStreaming: false, 
      financialReport: MOCK_FINANCIAL_REPORT,
      type: 'deliverable',
      suggestions: ['是否要对负毛利的5家客户进行单客户分析诊断？']
    } : m));
    
    setActiveFinancialReport(MOCK_FINANCIAL_REPORT);
    setIsThinking(false);
  };

  const handleSend = async (text: string = inputValue) => {
    const finalInput = text || inputValue;
    if (!finalInput.trim()) return;
    
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: finalInput };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsThinking(true);

    // Intent Recognition for Natural Language
    if (finalInput.includes('多客户收益诊断') || finalInput.includes('多客户经营数据')) {
      const scenario = SCENARIOS.find(s => s.id === '3');
      if (scenario) setActiveScenario(scenario);
      handleMultiCustomerDiagnosis();
      return;
    }

    if (finalInput.includes('单客户收益诊断')) {
      const scenario = SCENARIOS.find(s => s.id === '1');
      if (scenario) setActiveScenario(scenario);
    } else if (finalInput.includes('网点收益诊断')) {
      const scenario = SCENARIOS.find(s => s.id === '2');
      if (scenario) setActiveScenario(scenario);
    } else if (finalInput.includes('场地收益诊断')) {
      const scenario = SCENARIOS.find(s => s.id === '4');
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

    // Handle "Yes" for drill-down
    if (finalInput === '是' || finalInput.toLowerCase() === 'yes' || finalInput.includes('深度归因')) {
      const drillDownPlan: AnalysisPlan = {
        title: "单客户收益诊断思路",
        steps: [
          "单票收入构成：拆解折扣、附加费、基础运费",
          "变动成本拆解：路由成本、油耗分摊、人工成本",
          "分摊费用分析：管理费、场地摊销等固定成本",
          "输出具体个案的改进建议"
        ]
      };
      const aiMsgId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, {
        id: aiMsgId,
        role: 'assistant',
        content: '好的，正在为您准备亏损客户专项诊断。我将按照以下思路进行深度归因：',
        plan: drillDownPlan,
        type: 'plan'
      }]);
      setIsThinking(false);
      return;
    }

    // Default mock response for other inputs
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
    
    // 1. Add User Message
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: '按照这个思路产出报告'
    };
    
    // 2. Add Assistant Initial Response
    const reportMsgId = (Date.now() + 1).toString();
    const initialFlow: AnalysisStep[] = (isSingleCustomer || isNegativeMargin)
      ? [
          { id: '1', title: '多维指标提取', description: '提取收入、成本、毛利等核心指标', status: 'pending', progress: 0 },
          { id: '2', title: '利润驱动分析', description: '业务量、折扣、单价对利润的影响', status: 'pending', progress: 0 },
          { id: '3', title: '损益下钻', description: '下钻至结算账号与产品维度', status: 'pending', progress: 0 },
          { id: '4', title: '策略生成', description: '输出专家级经营改进建议', status: 'pending', progress: 0 }
        ]
      : INITIAL_ANALYSIS_FLOW.map(s => ({ ...s, status: 'pending', progress: 0 }));

    const initialReportMsg: ChatMessage = {
      id: reportMsgId,
      role: 'assistant',
      content: isSingleCustomer 
        ? '收到你的需求。正在根据上面的思路产出 **TCL客户** 的损坏理赔诊断报告'
        : (isNegativeMargin 
            ? '收到你的需求。正在根据上面的思路产出 **负毛利客户收益诊断报告**'
            : '收到你的需求。正在根据上面的思路产出 **多客户收益诊断概览报告**'),
      isStreaming: false,
      isThinkingTextStreaming: true,
      thinkingText: '',
      analysisFlow: initialFlow,
      type: 'deliverable'
    };
    
    setMessages(prev => [...prev, userMsg, initialReportMsg]);
    setIsThoughtExpanded(true);

    // 3. Simulate Granular Analysis Flow
    const steps: AnalysisStep[] = [...initialFlow];
    for (let i = 0; i < steps.length; i++) {
      // Set current step to processing
      steps[i] = { ...steps[i], status: 'processing', progress: 0 };
      setMessages(prev => prev.map(m => m.id === reportMsgId ? { ...m, analysisFlow: [...steps] } : m));

      // Simulate progress within the step
      for (let p = 0; p <= 100; p += 20) {
        await new Promise(r => setTimeout(r, 150));
        steps[i] = { ...steps[i], progress: p };
        setMessages(prev => prev.map(m => m.id === reportMsgId ? { ...m, analysisFlow: [...steps] } : m));
      }

      // Mark as completed
      steps[i] = { ...steps[i], status: 'completed', progress: 100 };
      setMessages(prev => prev.map(m => m.id === reportMsgId ? { ...m, analysisFlow: [...steps] } : m));
      await new Promise(r => setTimeout(r, 200));
    }

    const fullThinkingContent = (isSingleCustomer || isNegativeMargin)
      ? "本报告旨在对2026年3月16日至3月23日期间的中国A股市场进行一次全面而深入的剖析，为寻求稳健回报的中等风险投资者提供决策支持。在过去的一周，A股市场在经历了年初的显著上涨后，进入了一个震荡整理阶段，三大指数整体表现疲弱。这一市场动态的背后，是宏观经济“开门红”数据与市场短期情绪博弈的..."
      : "正在对全量客户进行深度经营诊断。通过对收入、成本、毛利的多维对冲，我们识别出深莞区整体毛利水平稳健，但存在3个显著负毛利客户。目前正在进行最后的报告汇总与策略生成...";

    let currentThinkingText = "";
    const words = fullThinkingContent.split("");
    for (let i = 0; i < words.length; i++) {
      currentThinkingText += words[i];
      setMessages(prev => prev.map(m => m.id === reportMsgId ? { ...m, thinkingText: currentThinkingText } : m));
      await new Promise(resolve => setTimeout(resolve, 5));
    }

    setMessages(prev => prev.map(m => m.id === reportMsgId ? { 
      ...m, 
      isThinkingTextStreaming: false,
      financialReport: !isSingleCustomer && !isNegativeMargin ? MOCK_FINANCIAL_REPORT : undefined,
      singleCustomerReport: isSingleCustomer ? MOCK_SINGLE_CUSTOMER_REPORT : undefined,
      negativeMarginReport: isNegativeMargin ? MOCK_NEGATIVE_MARGIN_REPORT : undefined,
    } : m));

    if (isSingleCustomer) {
      setActiveSingleCustomerReport(MOCK_SINGLE_CUSTOMER_REPORT);
      setIsSidebarCollapsed(true);
    } else if (isNegativeMargin) {
      setActiveNegativeMarginReport(MOCK_NEGATIVE_MARGIN_REPORT);
      setSelectedNegativeCustomerId(MOCK_NEGATIVE_MARGIN_REPORT.customers[0].customerId);
      setIsSidebarCollapsed(true);
      setActiveFinancialReport(null);
      setActiveSingleCustomerReport(null);
    } else {
      setActiveFinancialReport(MOCK_FINANCIAL_REPORT);
      setIsSidebarCollapsed(true);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setIsChatCollapsed(false);
    if (suggestion.includes('5家客户')) {
      const userMsg: ChatMessage = {
        id: Date.now().toString(),
        role: 'user',
        content: suggestion
      };
      
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '针对这5家负毛利客户，我建议采用以下专项诊断思路：',
        analysisFlow: [
          { id: '1', title: '多维指标提取', description: '提取5家客户的收入、成本、毛利等核心指标', status: 'completed' },
          { id: '2', title: '利润驱动分析', description: '分析业务量、折扣、单价对各客户利润的影响', status: 'completed' },
          { id: '3', title: '损益下钻', description: '下钻至各客户的结算账号与产品维度', status: 'completed' },
          { id: '4', title: '策略生成', description: '输出针对性经营改进建议', status: 'completed' }
        ],
        plan: {
          title: '负毛利客户专项诊断分析思路',
          steps: [
            '多维经营指标提取 (5家客户收入、成本、毛利)',
            '利润驱动因素瀑布分析 (业务量、折扣、单价)',
            '负毛利结算账号/产品多维下钻',
            '成本与收入端优化策略生成',
            '专家级经营改进建议输出'
          ]
        },
        type: 'plan'
      };
      
      setMessages(prev => [...prev, userMsg, assistantMsg]);
      return;
    }
    if (suggestion.includes('单客户分析')) {
      const userMsg: ChatMessage = {
        id: Date.now().toString(),
        role: 'user',
        content: suggestion
      };
      
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '针对负毛利客户的单客户诊断分析，我建议采用以下分析思路：',
        analysisFlow: [
          { id: '1', title: '多维指标提取', description: '提取收入、成本、毛利等核心指标', status: 'completed' },
          { id: '2', title: '利润驱动分析', description: '业务量、折扣、单价对利润的影响', status: 'completed' },
          { id: '3', title: '损益下钻', description: '下钻至结算账号与产品维度', status: 'completed' },
          { id: '4', title: '策略生成', description: '输出专家级经营改进建议', status: 'completed' }
        ],
        plan: {
          title: '单客户深度诊断分析思路',
          steps: [
            '多维经营指标提取 (收入、成本、毛利)',
            '利润驱动因素瀑布分析 (业务量、折扣、单价)',
            '负毛利结算账号/产品下钻',
            '成本与收入端优化策略生成',
            '专家级经营改进建议输出'
          ]
        },
        type: 'plan'
      };
      
      setMessages(prev => [...prev, userMsg, assistantMsg]);
    }
  };

  const handleMagicEnhance = () => {
    setIsEnhancing(true);
    setTimeout(() => {
      setInputValue('作为资深分析师，请对本周深莞区收入进行深度诊断，请按以下逻辑输出一份精炼报告：- 逆向归因：如果收入未达标，请定位导致80%缺口的核心业务或客户；如果达标，请识别超出预期的关键驱动因素。- 动态对比：不仅看本周，请对比上周及本月趋势，判断问题是偶发还是趋势。- 策略推演：“如果”要立刻改善下周收入，基于数据，应优先调整哪个杠杆（如价格、特定渠道补贴、重点客户拜访）并预估其潜在影响。- 风险预警：基于本周数据，指出一个最值得关注的潜在风险信号。');
      setIsEnhancing(false);
    }, 1500);
  };

  return (
    <Layout className="h-screen overflow-hidden bg-white">
      <TopHeader />
      <Layout>
        <Sidebar 
          onNewChat={handleNewChat} 
          collapsed={isSidebarCollapsed} 
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
        <Content className="relative flex flex-col h-full bg-white">
          <AnimatePresence mode="wait">
            {!activeScenario && messages.length === 0 ? (
              <HomePortal 
                key="portal"
                inputValue={inputValue}
                setInputValue={setInputValue}
                isEnhancing={isEnhancing}
                onMagicEnhance={handleMagicEnhance}
                onSend={handleSend}
                scenarios={SCENARIOS}
                onScenarioClick={handleScenarioClick}
              />
            ) : (
              <div key="chat" className="flex-1 overflow-hidden flex flex-col">
                  <div className={`split-screen-container flex-1 overflow-hidden transition-all duration-500 ease-in-out ${isChatCollapsed ? 'chat-collapsed' : ''} ${!(activeReport || activeFinancialReport || activeSingleCustomerReport || activeNegativeMarginReport) ? 'justify-center' : ''}`}>
                    {/* Left Chat Panel */}
                    <div className={`chat-panel relative transition-all duration-500 ease-in-out ${isChatCollapsed ? 'w-20' : (activeReport || activeFinancialReport || activeSingleCustomerReport || activeNegativeMarginReport) ? 'w-[380px]' : 'w-full max-w-[900px]'}`}>
                    {/* Chat header (inside panel to collapse with it) */}
                    <div className={`px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white z-10 transition-opacity duration-300 ${isChatCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                      <Space align="center">
                        <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                          {activeScenario?.icon || <Bot size={20} />}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-800">{activeScenario?.title || '数据洞察'}</div>
                          <div className="text-[10px] text-blue-500 font-bold tracking-wider opacity-70 uppercase">AI Financial Service</div>
                        </div>
                      </Space>
                      <Button 
                        type="text" 
                        icon={<CloseOutlined />} 
                        onClick={handleNewChat}
                        className="text-gray-400 hover:text-red-500"
                      />
                    </div>

                    {/* Collapse Toggle Button */}
                    <Button 
                      icon={isChatCollapsed ? <ArrowRightOutlined /> : <ArrowLeftOutlined />}
                      onClick={() => setIsChatCollapsed(!isChatCollapsed)}
                      className="absolute -right-4 top-1/2 -translate-y-1/2 z-50 w-8 h-8 rounded-full shadow-md border-gray-100 bg-white flex items-center justify-center p-0"
                    />
                    
                    <div className={`flex-1 overflow-y-auto p-8 scroll-smooth h-full ${isChatCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                      {messages.map((m, i) => (
                        <div key={i} className={`flex gap-4 mb-8 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          {m.role === 'assistant' && (
                            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-100">
                              <Bot size={20} className="text-white" />
                            </div>
                          )}
                          <div className={`max-w-[85%] ${m.role === 'user' ? 'order-1' : 'order-2'}`}>
                            {m.role === 'user' ? (
                              <div className="bg-white border border-gray-100 text-gray-800 p-4 rounded-2xl rounded-tr-none shadow-sm">
                                <Text className="text-gray-800 font-medium">{m.content}</Text>
                              </div>
                            ) : (
                              <div className="flex flex-col gap-4">
                                {/* Assistant Content Bubble */}
                                {m.content && (
                                  <div className="chat-bubble-ai">
                                    <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
                                      <Markdown>{m.content}</Markdown>
                                      {m.isStreaming && !m.content && <Spin size="small" />}
                                    </div>

                                    {/* Design Optimized Loading Hint for Negative Margin Report */}
                                    {m.type === 'deliverable' && m.content.includes('负毛利') && !m.negativeMarginReport && (
                                      <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-4 p-4 bg-amber-50/80 border border-amber-100 rounded-2xl flex gap-3 items-start shadow-sm"
                                      >
                                        <div className="w-8 h-8 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                                          <ClockCircleOutlined className="text-amber-600 text-lg animate-pulse" />
                                        </div>
                                        <div className="flex-1">
                                          <div className="text-xs font-bold text-amber-900 mb-1 flex items-center gap-2">
                                            深度诊断分析说明
                                            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                                          </div>
                                          <div className="text-[11px] text-amber-800/80 leading-relaxed">
                                            由于涉及多维数据下钻与 AI 建模，单个负毛利客户的报告加载约需 <span className="font-bold text-amber-900">4 分钟</span>。
                                            分析客户越多，耗时将相应延长。请您耐心等候，或稍后在缓存中直接查看结果。
                                          </div>
                                        </div>
                                      </motion.div>
                                    )}
                                  </div>
                                )}

                                {/* Analysis Plan Confirmation */}
                                {m.plan && (
                                  <AnalysisPlanConfirmation 
                                    plan={m.plan} 
                                    onConfirm={handleConfirmPlan} 
                                    analysisFlow={m.analysisFlow}
                                  />
                                )}

                                {/* Thinking Process */}
                                {(m.thoughtChain || m.analysisFlow) && m.type !== 'plan' && (
                                  <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                                    <div 
                                      className="px-4 py-3 bg-gray-50/50 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                                      onClick={() => setIsThoughtExpanded(!isThoughtExpanded)}
                                    >
                                      <Space align="center" size={12}>
                                        <div className="flex items-center gap-2.5">
                                          <div className="w-5 h-5 bg-blue-50 rounded-md flex items-center justify-center">
                                            <BrainCircuit size={12} className="text-blue-500" />
                                          </div>
                                          <Text className="text-xs font-bold text-gray-700">
                                            {m.isThinkingTextStreaming ? '深度思考中...' : '深度思考结论'}
                                          </Text>
                                        </div>
                                        {isThoughtExpanded ? <UpOutlined className="text-xs text-gray-400" /> : <DownOutlined className="text-xs text-gray-400" />}
                                      </Space>
                                      <div className="flex items-center gap-3">
                                        <Text className="text-[10px] text-gray-400">全屏</Text>
                                        <Text className="text-[10px] text-gray-400">收起</Text>
                                      </div>
                                    </div>
                                    
                                    <AnimatePresence>
                                      {isThoughtExpanded && (
                                        <motion.div
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{ height: 'auto', opacity: 1 }}
                                          exit={{ height: 0, opacity: 0 }}
                                          className="px-4 pb-4 border-t border-gray-100"
                                        >
                                          <div className="flex flex-col gap-6">
                                            {/* Mind Map Section */}
                                            <div className="pt-4 overflow-x-auto">
                                              <div className="flex items-center gap-2 mb-3">
                                                <div className="w-1 h-3 bg-blue-500 rounded-full" />
                                                <Text className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">分析思维导图</Text>
                                              </div>
                                              <MindMap steps={m.analysisFlow || INITIAL_ANALYSIS_FLOW.map(s => ({ ...s, status: 'completed' }))} />
                                            </div>

                                            {/* Thinking Text Section (Styled Box) */}
                                            {m.thinkingText && (
                                              <motion.div 
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="p-5 bg-gray-50 border border-gray-100 rounded-xl"
                                              >
                                                <div className="flex items-center gap-2 mb-3">
                                                  <Text className="text-sm font-bold text-gray-800">诊断分析中</Text>
                                                </div>
                                                <div className="prose prose-sm max-w-none text-gray-500 leading-relaxed max-h-[150px] overflow-y-auto custom-scrollbar">
                                                  <Markdown>{m.thinkingText}</Markdown>
                                                  {m.isThinkingTextStreaming && <span className="inline-block w-1 h-4 bg-blue-500 ml-1 animate-pulse align-middle" />}
                                                </div>
                                              </motion.div>
                                            )}
                                          </div>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                )}

                                {/* Deliverable Card */}
                                {m.type === 'deliverable' && (m.report || m.financialReport || m.singleCustomerReport || m.negativeMarginReport) && (
                                  <div className="flex flex-col gap-3">
                                    {m.negativeMarginReport ? (
                                      <div className="flex flex-col gap-2">
                                        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1 px-1 flex items-center gap-2">
                                          <div className="w-1 h-3 bg-red-500 rounded-full" />
                                          诊断报告集 ({m.negativeMarginReport.customers.length})
                                        </div>
                                        <div className="grid grid-cols-1 gap-2">
                                          {m.negativeMarginReport.customers.map((customer, idx) => (
                                            <div 
                                              key={idx}
                                              className={`p-3 bg-white border rounded-xl flex items-center gap-3 cursor-pointer transition-all shadow-sm group ${
                                                selectedNegativeCustomerId === customer.customerId && activeNegativeMarginReport 
                                                  ? 'border-blue-500 ring-2 ring-blue-50' 
                                                  : 'border-gray-100 hover:border-blue-200'
                                              }`}
                                              onClick={() => {
                                                setActiveNegativeMarginReport(m.negativeMarginReport!);
                                                setSelectedNegativeCustomerId(customer.customerId);
                                                setIsSidebarCollapsed(true);
                                              }}
                                            >
                                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-colors ${
                                                selectedNegativeCustomerId === customer.customerId && activeNegativeMarginReport
                                                  ? 'bg-blue-600 text-white'
                                                  : 'bg-red-50 text-red-500 group-hover:bg-red-500 group-hover:text-white'
                                              }`}>
                                                {customer.customerId.substring(0, 1)}
                                              </div>
                                              <div className="flex-1">
                                                <div className="text-xs font-bold text-gray-800">{customer.customerId} 诊断报告</div>
                                                <div className="text-[9px] text-gray-400">{customer.diagnosis.status}</div>
                                              </div>
                                              <FileTextOutlined className={`text-xs transition-colors ${
                                                selectedNegativeCustomerId === customer.customerId && activeNegativeMarginReport
                                                  ? 'text-blue-600'
                                                  : 'text-gray-300 group-hover:text-blue-600'
                                              }`} />
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    ) : (
                                      <div 
                                        className="deliverable-card group"
                                        onClick={() => {
                                          if (m.report) setActiveReport(m.report);
                                          if (m.financialReport) {
                                            setActiveFinancialReport(m.financialReport);
                                            setActiveSingleCustomerReport(null);
                                            setActiveNegativeMarginReport(null);
                                          }
                                          if (m.singleCustomerReport) {
                                            setActiveSingleCustomerReport(m.singleCustomerReport);
                                            setActiveFinancialReport(null);
                                            setActiveNegativeMarginReport(null);
                                          }
                                          setIsSidebarCollapsed(true);
                                        }}
                                      >
                                        <div className="w-10 h-10 bg-orange-100 rounded flex items-center justify-center text-orange-600 font-bold group-hover:bg-orange-600 group-hover:text-white transition-colors">
                                          {m.report ? 'P' : 'R'}
                                        </div>
                                        <div className="flex-1">
                                          <div className="text-sm font-bold">
                                            {m.report?.title || (m.financialReport ? '多客户收益诊断概览报告' : '单客户诊断分析报告')}
                                          </div>
                                          <div className="text-xs text-gray-400">点击查看完整报告</div>
                                        </div>
                                        <ArrowRightOutlined className="text-gray-300 group-hover:text-blue-600 transition-colors" />
                                      </div>
                                    )}
                                  </div>
                                )}

                                {/* Suggestions */}
                                {m.suggestions && (
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    {m.suggestions.map((s, i) => (
                                      <Button 
                                        key={i} 
                                        size="small" 
                                        className="rounded-full border-blue-200 text-blue-600 hover:bg-blue-50"
                                        onClick={() => handleSuggestionClick(s)}
                                      >
                                        {s}
                                      </Button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      
                      {isThinking && (
                        <div className="flex gap-4 mb-8">
                          <Avatar icon={<RobotOutlined />} className="bg-blue-600 shrink-0" />
                          <div className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-3">
                            <Spin size="small" />
                            <Text type="secondary">正在分析需求...</Text>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bottom Input Area */}
                    <div className="p-4 bg-white border-t border-border">
                      <div className="max-w-2xl mx-auto flex gap-2">
                        <Input 
                          size="large" 
                          placeholder="继续下钻询问..." 
                          className="bg-white"
                          value={inputValue}
                          onChange={e => setInputValue(e.target.value)}
                          onPressEnter={() => handleSend()}
                          suffix={
                            <Button 
                              type="primary" 
                              shape="circle" 
                              icon={<SendOutlined />} 
                              onClick={() => handleSend()}
                            />
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Report Panel */}
                  <AnimatePresence>
                    {(activeReport || activeFinancialReport || activeSingleCustomerReport || activeNegativeMarginReport) && (
                      <motion.div 
                        initial={{ x: 300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 300, opacity: 0 }}
                        className="report-panel"
                      >
                        {activeReport && <ReportCard report={activeReport} onClose={() => setActiveReport(null)} />}
                        {activeFinancialReport && (
                          <div className="h-full flex flex-col bg-white">
                            <div className="p-4 border-b flex justify-between items-center bg-white sticky top-0 z-10">
                              <Title level={5} className="m-0">多客户收益诊断报告</Title>
                              <Button type="text" icon={<CloseOutlined />} onClick={() => {
                                setActiveFinancialReport(null);
                                setIsSidebarCollapsed(false);
                              }} />
                            </div>
                            <div className="flex-1 overflow-y-auto">
                              <FinancialReport data={activeFinancialReport} />
                            </div>
                          </div>
                        )}
                        {activeSingleCustomerReport && (
                          <div className="h-full flex flex-col bg-white">
                            <div className="p-4 border-b flex justify-between items-center bg-white sticky top-0 z-10">
                              <Title level={5} className="m-0">单客户收益诊断报告</Title>
                              <Button type="text" icon={<CloseOutlined />} onClick={() => {
                                setActiveSingleCustomerReport(null);
                                setIsSidebarCollapsed(false);
                              }} />
                            </div>
                            <div className="flex-1 overflow-y-auto">
                              <SingleCustomerReport data={activeSingleCustomerReport} />
                            </div>
                          </div>
                        )}
                        {activeNegativeMarginReport && (
                          <div className="h-full flex flex-col bg-white">
                            <div className="p-4 border-b flex justify-between items-center bg-white sticky top-0 z-10">
                              <Title level={5} className="m-0">负毛利客户收益诊断报告 ({selectedNegativeCustomerId})</Title>
                              <Button type="text" icon={<CloseOutlined />} onClick={() => {
                                setActiveNegativeMarginReport(null);
                                setIsSidebarCollapsed(false);
                              }} />
                            </div>
                            <div className="flex-1 overflow-y-auto">
                              <NegativeMarginReport 
                                data={activeNegativeMarginReport} 
                                selectedCustomerId={selectedNegativeCustomerId || undefined}
                              />
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </AnimatePresence>
        </Content>
      </Layout>

      <SmartPicker
        open={showPicker}
        onCancel={() => setShowPicker(false)}
        metrics={METRICS}
        selectedMetrics={selectedMetrics}
        setSelectedMetrics={setSelectedMetrics}
      />
    </Layout>
  );
}
