import { FinancialReportData, SingleCustomerReportData, Scenario } from './types';

export const MOCK_FINANCIAL_REPORT: FinancialReportData = {
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

export const MOCK_SINGLE_CUSTOMER_REPORT: SingleCustomerReportData = {
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
      { label: '含税收入净额', value: '212.70万', change: '-61.10%', iconType: 'revenue' },
      { label: '毛利额', value: '-26.19万', change: '-209.32%', iconType: 'profit' },
      { label: '毛利率', value: '-13.05%', change: '-17.70%', iconType: 'business' }
    ],
    summary: "业务贡献大幅缩减，成本占收入比达到113.05%。"
  },
  waterfallData: [
    { label: '上月利润', value: 23.96, type: 'total' },
    { label: '收入下降', value: -35.20, type: 'change' },
    { label: '折扣变动', value: -12.45, type: 'change' },
    { label: '运输成本', value: -8.12, type: 'change' },
    { label: '分摊费用', value: 5.62, type: 'change' },
    { label: '本月利润', value: -26.19, type: 'total' },
  ],
  waterfallAnalysis: {
    revenue: { title: '收入变动', content: '含税收入净额同比下降61.10%' },
    cost: { title: '成本变动', content: '成本占收入比达到113.05%' }
  },
  lossAnalysis: {
    topAccounts: [
      { id: '1064695566-01', margin: '-15.42万', marginChange: '-180.2%', rate: '-12.5%', rateChange: '-15.2%' },
      { id: '1064695566-02', margin: '-10.77万', marginChange: '-150.5%', rate: '-14.2%', rateChange: '-18.5%' },
    ],
    topProducts: [
      { id: '1064695566-01', revenue: '快递业务', product: '标快', discount: '55%', cost: '12.4', margin: '10.2', marginRate: '-2.2', marginRatePercent: '-17.7%' },
      { id: '1064695566-01', revenue: '快运业务', product: '重货', discount: '60%', cost: '8.5', margin: '9.2', marginRate: '-0.7', marginRatePercent: '-8.2%' },
    ],
    pvmAnalysis: {
      title: 'PVM分析',
      metrics: [{ label: '价格影响', value: '-12.4万' }],
      findings: ['折扣率下调是主因']
    }
  },
  detailedStrategies: {
    cost: [{ title: '成本优化', id: 'C01', reason: '运输成本高', suggestion: '优化路由' }],
    revenue: [{ title: '收入提升', id: 'R01', reason: '折扣过大', suggestion: '收紧折扣' }]
  },
  expertAdvice: {
    situation: "严重亏损，需立即干预。",
    directions: [{ title: '短期对策', content: '调整一口价' }],
    actions: { owner: '销售部', plan: ['本周完成调价'] },
    risk: "高风险"
  }
};

export const SCENARIOS: Scenario[] = [
  { id: '1', title: '单客户收益诊断', description: '深度下钻单一客户的利润构成与亏损根因', icon: 'UserOutlined', status: 'active' },
  { id: '2', title: '网点收益诊断', description: '分析特定网点的经营效率与盈亏平衡点', icon: 'ShopOutlined', status: 'active' },
  { id: '3', title: '多客户经营数据', description: '全量客户经营概览与异常波动识别', icon: 'TeamOutlined', status: 'active' },
  { id: '4', title: '场地收益诊断', description: '评估中转场、仓库等固定场地的产出效能', icon: 'EnvironmentOutlined', status: 'active' },
];
