import React from 'react';
import { Typography, Card, Row, Col, Table, Tag, Space, Divider, List } from 'antd';
import { motion } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  LabelList
} from 'recharts';
import { 
  InfoCircleOutlined, 
  BulbOutlined, 
  LineChartOutlined, 
  PieChartOutlined, 
  CheckCircleOutlined,
  WarningOutlined,
  UserOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  RobotOutlined,
  DashboardOutlined,
  GlobalOutlined,
  ThunderboltOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import { SingleCustomerReportData } from '../types';

const { Title, Text, Paragraph } = Typography;

interface Props {
  data: SingleCustomerReportData;
}

export const SingleCustomerReport: React.FC<Props> = ({ data }) => {
  const accountColumns = [
    { title: '结算账号', dataIndex: 'id', key: 'id' },
    { title: '毛利(元)', dataIndex: 'margin', key: 'margin', render: (v: string) => <Text className="text-red-500">{v}</Text> },
    { title: '毛利环比变化率', dataIndex: 'marginChange', key: 'marginChange', render: (v: string) => <Text className="text-red-500">{v}</Text> },
    { title: '毛利率', dataIndex: 'rate', key: 'rate', render: (v: string) => <Text className="text-red-500">{v}</Text> },
    { title: '毛利率环比变化额', dataIndex: 'rateChange', key: 'rateChange', render: (v: string) => <Text className="text-red-500">{v}</Text> },
  ];

  const productColumns = [
    { title: '结算账号', dataIndex: 'id', key: 'id' },
    { title: '收入板块', dataIndex: 'revenue', key: 'revenue' },
    { title: '产品名称', dataIndex: 'product', key: 'product' },
    { title: '折扣率', dataIndex: 'discount', key: 'discount', render: (v: string) => <Text className="text-red-500">{v}</Text> },
    { title: '单公斤不含税收入', dataIndex: 'cost', key: 'cost' },
    { title: '单公斤自营成本', dataIndex: 'margin', key: 'margin' },
    { title: '毛利(元)', dataIndex: 'marginRate', key: 'marginRate', render: (v: string) => <Text className="text-red-500">{v}</Text> },
    { title: '毛利率', dataIndex: 'marginRatePercent', key: 'marginRatePercent', render: (v: string) => <Text className="text-red-500">{v}</Text> },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="p-12 bg-white min-h-full w-full shadow-sm"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-12 border-b pb-8">
        <Title level={1} className="text-center mb-4 text-gray-800 font-bold tracking-tight">
          {data.customerId}客户{data.reportDate}财务分析报告
        </Title>
        <div className="flex justify-center items-center gap-4 text-gray-400 text-xs">
          <Space>
            <InfoCircleOutlined />
            <span>报告生成时间: {new Date().toLocaleString()}</span>
          </Space>
          <Divider orientation="vertical" />
          <Space>
            <RobotOutlined />
            <span>AI 深度诊断引擎 v2.5</span>
          </Space>
        </div>
      </motion.div>

      {/* I. AI Overview */}
      <motion.section variants={itemVariants} className="mb-16">
        <Title level={3} className="flex items-center gap-3 mb-8 text-gray-800">
          <div className="w-1.5 h-8 bg-blue-600 rounded-full" />
          一、AI 总览
        </Title>
        <Card className="bg-[#1a1f2e] text-white rounded-[32px] border-none overflow-hidden relative shadow-2xl p-4">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <RobotOutlined style={{ fontSize: '180px' }} />
          </div>
          <Row gutter={48} align="middle">
            <Col span={10} className="border-r border-white/10 pr-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-bold border border-red-500/30 flex items-center gap-2">
                  <ThunderboltOutlined />
                  诊断状态: {data.diagnosis.status}
                </div>
              </div>
              <Paragraph className="text-gray-300 text-sm leading-relaxed mb-8">
                {data.diagnosis.summary}
              </Paragraph>
              <div className="space-y-4">
                <Text className="text-white/40 text-[10px] uppercase tracking-widest font-bold block mb-2">主要现象</Text>
                {data.diagnosis.mainReasons.map((reason, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm group">
                    <div className="w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-red-500/20 transition-colors">
                      <WarningOutlined className="text-red-500 text-xs" />
                    </div>
                    <span className="text-gray-200">{reason}</span>
                  </div>
                ))}
              </div>
            </Col>
            <Col span={14} className="pl-12">
              <Row gutter={[24, 24]}>
                {data.diagnosis.metrics.map((m, i) => (
                  <Col span={12} key={i}>
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all cursor-default">
                      <div className="text-white/40 text-[10px] uppercase mb-2 font-bold tracking-wider">{m.label}</div>
                      <div className="text-3xl font-bold mb-2 tracking-tight">{m.value}</div>
                      <div className={`text-xs font-bold flex items-center gap-1 ${m.change.includes('-') ? 'text-red-400' : 'text-green-400'}`}>
                        {m.change.includes('-') ? <ArrowDownOutlined /> : <ArrowUpOutlined />}
                        {m.change}
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Card>

        <div className="mt-12">
          <Title level={4} className="mb-6 flex items-center gap-2">
            <BulbOutlined className="text-yellow-500" />
            策略建议
          </Title>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.strategies.map((strategy, i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-start gap-4 hover:border-blue-200 transition-colors">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-lg shadow-blue-100">
                  {i + 1}
                </div>
                <Text className="text-gray-600 text-sm leading-relaxed">{strategy}</Text>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* II. Business Analysis */}
      <motion.section variants={itemVariants} className="mb-16">
        <Title level={3} className="flex items-center gap-3 mb-8 text-gray-800">
          <div className="w-1.5 h-8 bg-blue-600 rounded-full" />
          二、客户概览 / 经营分析
        </Title>
        <Row gutter={24}>
          {data.businessAnalysis.metrics.map((m, i) => (
            <Col span={8} key={i}>
              <Card className="rounded-[24px] border-gray-100 shadow-sm hover:shadow-md transition-all h-full group">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                    m.iconType === 'business' ? 'bg-blue-50 text-blue-600' : 
                    m.iconType === 'profit' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                  }`}>
                    {m.iconType === 'business' && <DashboardOutlined />}
                    {m.iconType === 'profit' && <LineChartOutlined />}
                    {m.iconType === 'revenue' && <PieChartOutlined />}
                  </div>
                  <Text className="font-bold text-gray-800">{m.label}</Text>
                </div>
                <div className="space-y-6">
                  <div className="flex justify-between items-baseline">
                    <Text className="text-gray-400 text-xs font-medium uppercase tracking-wider">当前值</Text>
                    <Text className="text-2xl font-bold tracking-tight">{m.value}</Text>
                  </div>
                  {m.subValue && (
                    <div className="flex justify-between items-baseline">
                      <Text className="text-gray-400 text-xs font-medium uppercase tracking-wider">子项/均值</Text>
                      <Text className="text-sm font-semibold text-gray-600">{m.subValue}</Text>
                    </div>
                  )}
                  {m.change && (
                    <div className="flex justify-between items-baseline">
                      <Text className="text-gray-400 text-xs font-medium uppercase tracking-wider">环比变化</Text>
                      <Text className={`text-xs font-bold flex items-center gap-1 ${m.change.includes('-') ? 'text-red-500' : 'text-green-500'}`}>
                        {m.change.includes('-') ? <ArrowDownOutlined /> : <ArrowUpOutlined />}
                        {m.change}
                      </Text>
                    </div>
                  )}
                </div>
              </Card>
            </Col>
          ))}
        </Row>
        <div className="mt-8 p-6 bg-blue-50/30 rounded-2xl border border-blue-100/50">
          <Text className="text-xs text-blue-800 font-bold block mb-3 uppercase tracking-widest">数据总结</Text>
          <Text className="text-sm text-gray-600 leading-relaxed">{data.businessAnalysis.summary}</Text>
        </div>
      </motion.section>

      {/* III. Waterfall Analysis */}
      <motion.section variants={itemVariants} className="mb-16">
        <Title level={3} className="flex items-center gap-3 mb-8 text-gray-800">
          <div className="w-1.5 h-8 bg-blue-600 rounded-full" />
          三、利润因素分解 - 瀑布分析
        </Title>
        <Card className="rounded-[32px] border-gray-100 shadow-sm p-8 mb-8">
          <div className="flex items-center gap-2 mb-8">
            <BarChartOutlined className="text-blue-600" />
            <Text className="font-bold text-gray-800">利润瀑布可视化分析</Text>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.waterfallData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#f8fafc' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {data.waterfallData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.type === 'total' ? '#3b82f6' : (entry.value > 0 ? '#10b981' : '#ef4444')} />
                  ))}
                  <LabelList dataKey="value" position="top" style={{ fontSize: 11, fontWeight: 'bold', fill: '#64748b' }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center text-gray-400 text-[10px] mt-4 italic">各维度对利润的边际贡献图</div>
        </Card>

        <Row gutter={24}>
          <Col span={12}>
            <div className="p-6 bg-orange-50/30 rounded-2xl border border-orange-100/50 h-full">
              <Text className="font-bold text-orange-800 block mb-3">{data.waterfallAnalysis.revenue.title}</Text>
              <Paragraph className="text-sm text-gray-600 leading-relaxed m-0">
                {data.waterfallAnalysis.revenue.content}
              </Paragraph>
            </div>
          </Col>
          <Col span={12}>
            <div className="p-6 bg-blue-50/30 rounded-2xl border border-blue-100/50 h-full">
              <Text className="font-bold text-blue-800 block mb-3">{data.waterfallAnalysis.cost.title}</Text>
              <Paragraph className="text-sm text-gray-600 leading-relaxed m-0">
                {data.waterfallAnalysis.cost.content}
              </Paragraph>
            </div>
          </Col>
        </Row>
      </motion.section>

      {/* IV. Multi-dimensional Attribution */}
      <motion.section variants={itemVariants} className="mb-16">
        <Title level={3} className="flex items-center gap-3 mb-8 text-gray-800">
          <div className="w-1.5 h-8 bg-blue-600 rounded-full" />
          四、多维归因 - 负毛利下钻分析
        </Title>
        <div className="space-y-12">
          <div>
            <Title level={5} className="mb-6 flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full" />
              TOP 亏损结算账号
            </Title>
            <Table 
              columns={accountColumns} 
              dataSource={data.lossAnalysis.topAccounts} 
              pagination={false} 
              size="middle" 
              className="border rounded-2xl overflow-hidden shadow-sm" 
              rowKey="id"
            />
          </div>
          <div>
            <Title level={5} className="mb-6 flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full" />
              TOP 亏损账号/产品
            </Title>
            <Table 
              columns={productColumns} 
              dataSource={data.lossAnalysis.topProducts} 
              pagination={false} 
              size="middle" 
              className="border rounded-2xl overflow-hidden shadow-sm" 
              rowKey={(record) => `${record.id}-${record.product}`}
            />
          </div>
          <div className="p-8 bg-gray-50 rounded-[32px] border border-gray-100">
            <Title level={5} className="mb-6 flex items-center gap-3">
              <GlobalOutlined className="text-blue-600" />
              {data.lossAnalysis.pvmAnalysis.title}
            </Title>
            <Row gutter={24} className="mb-8">
              {data.lossAnalysis.pvmAnalysis.metrics.map((m, i) => (
                <Col span={6} key={i}>
                  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <div className="text-gray-400 text-[10px] mb-1 font-bold uppercase">{m.label}</div>
                    <div className={`text-lg font-bold ${m.color ? `text-${m.color}-500` : 'text-gray-800'}`}>{m.value}</div>
                  </div>
                </Col>
              ))}
            </Row>
            <div className="space-y-3">
              <Text className="font-bold text-gray-800 block mb-2">主要诊断结论:</Text>
              {data.lossAnalysis.pvmAnalysis.findings.map((f, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* V. Detailed Strategy Suggestions */}
      <motion.section variants={itemVariants} className="mb-16">
        <Title level={3} className="flex items-center gap-3 mb-8 text-gray-800">
          <div className="w-1.5 h-8 bg-blue-600 rounded-full" />
          五、异常归因 / 详细策略建议
        </Title>
        <div className="space-y-8">
          <div className="p-8 bg-white border border-gray-100 rounded-[32px] shadow-sm">
            <Text className="text-lg font-bold text-gray-800 block mb-6">成本优化策略</Text>
            {data.detailedStrategies.cost.map((s, i) => (
              <div key={i} className="mb-8 last:mb-0">
                <div className="flex items-center gap-3 mb-4">
                  <Tag color="blue" className="rounded-lg font-bold">异常 {i + 1}</Tag>
                  <Text className="font-bold text-gray-700">{s.title}</Text>
                </div>
                <div className="grid grid-cols-2 gap-8 pl-4 border-l-2 border-blue-50">
                  <div>
                    <Text className="text-gray-400 text-xs block mb-1">异常说明</Text>
                    <Text className="text-sm text-gray-600">{s.reason}</Text>
                  </div>
                  <div>
                    <Text className="text-gray-400 text-xs block mb-1">优化建议</Text>
                    <Text className="text-sm text-blue-600 font-medium">{s.suggestion}</Text>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-8 bg-white border border-gray-100 rounded-[32px] shadow-sm">
            <Text className="text-lg font-bold text-gray-800 block mb-6">收入优化策略</Text>
            {data.detailedStrategies.revenue.map((s, i) => (
              <div key={i} className="mb-8 last:mb-0">
                <div className="flex items-center gap-3 mb-4">
                  <Tag color="orange" className="rounded-lg font-bold">异常 {i + 1}</Tag>
                  <Text className="font-bold text-gray-700">{s.title}</Text>
                </div>
                <div className="grid grid-cols-2 gap-8 pl-4 border-l-2 border-orange-50">
                  <div>
                    <Text className="text-gray-400 text-xs block mb-1">异常说明</Text>
                    <Text className="text-sm text-gray-600">{s.reason}</Text>
                  </div>
                  <div>
                    <Text className="text-gray-400 text-xs block mb-1">优化建议</Text>
                    <Text className="text-sm text-orange-600 font-medium">{s.suggestion}</Text>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* VI. Expert Advice */}
      <motion.section variants={itemVariants} className="mb-12">
        <Title level={3} className="flex items-center gap-3 mb-8 text-gray-800">
          <div className="w-1.5 h-8 bg-blue-600 rounded-full" />
          六、专家建议 / 经营现状与改善方向
        </Title>
        <div className="space-y-8">
          <div className="bg-gray-50 p-8 rounded-[32px] border border-gray-100">
            <Text className="font-bold text-gray-800 block mb-4 text-lg">经营现状简评</Text>
            <Text className="text-gray-600 text-sm leading-relaxed block">{data.expertAdvice.situation}</Text>
          </div>
          
          <Title level={5} className="mb-4">优化改善方向</Title>
          <Row gutter={24}>
            {data.expertAdvice.directions.map((d, i) => (
              <Col span={8} key={i}>
                <div className="h-full p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-blue-200 transition-all">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                    <Text className="font-bold text-blue-600">{d.title}</Text>
                  </div>
                  <Text className="text-gray-500 text-xs leading-relaxed">{d.content}</Text>
                </div>
              </Col>
            ))}
          </Row>

          <div className="bg-blue-600 p-10 rounded-[40px] text-white shadow-2xl shadow-blue-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-10">
              <CheckCircleOutlined style={{ fontSize: '140px' }} />
            </div>
            <Title level={4} className="text-white mb-8">后续行动建议</Title>
            <div className="flex items-center gap-3 mb-8">
              <div className="px-4 py-1.5 bg-white/20 rounded-full text-xs font-bold backdrop-blur-md border border-white/30">
                责任主体: {data.expertAdvice.actions.owner}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              {data.expertAdvice.actions.plan.map((item, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-white/40 transition-all">
                    <CheckCircleOutlined className="text-white text-xs" />
                  </div>
                  <Text className="text-white/90 text-sm font-medium">{item}</Text>
                </div>
              ))}
            </div>
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="flex items-start gap-3">
                <WarningOutlined className="text-yellow-400 mt-1" />
                <div>
                  <Text className="text-yellow-400 text-xs font-bold block mb-1 uppercase tracking-widest">风险提示</Text>
                  <Text className="text-white/70 text-xs">{data.expertAdvice.risk}</Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};
