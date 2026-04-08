import React from 'react';
import { Typography, Space, Button, Tag, Divider } from 'antd';
import { HistoryOutlined, PlusOutlined, ThunderboltOutlined, CloseOutlined } from '@ant-design/icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Report } from '../types';

const { Title, Text, Paragraph } = Typography;

interface ReportCardProps {
  report: Report;
  onAddMetric?: () => void;
  onClose?: () => void;
}

export const ReportCard: React.FC<ReportCardProps> = ({ report, onAddMetric, onClose }) => {
  return (
    <div className="bg-white min-h-full p-12 shadow-sm rounded-xl relative">
      {onClose && (
        <Button 
          type="text" 
          icon={<CloseOutlined />} 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-red-500 z-10"
        />
      )}
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-start mb-12">
          <div>
            <Tag color="blue" className="mb-4">财务分析报告</Tag>
            <Title level={1} className="m-0! text-4xl! font-bold! tracking-tight">{report.title}</Title>
            <Text type="secondary" className="block mt-2">生成时间：{report.date} · 分析师：小财 AI</Text>
          </div>
          <Space>
            <Button icon={<HistoryOutlined />}>历史</Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={onAddMetric}>添加指标</Button>
          </Space>
        </div>

        <div className="bg-blue-50/50 p-6 rounded-2xl mb-12 border border-blue-100">
          <div className="flex items-center gap-2 mb-3">
            <ThunderboltOutlined className="text-blue-600" />
            <Text strong className="text-blue-600 uppercase tracking-wider text-xs">核心摘要 / Summary</Text>
          </div>
          <Paragraph className="text-lg leading-relaxed text-gray-700 m-0">
            {report.summary}
          </Paragraph>
        </div>

        <Title level={4} className="mb-6! flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-600 rounded-full" />
          关键指标概览
        </Title>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {report.metrics.map((metric, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-blue-200 transition-colors">
              <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">{metric.label}</div>
              <div className="text-3xl font-bold mb-3 tracking-tight">{metric.value}</div>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <span className="text-gray-400">同比</span>
                  <Text type={metric.trend === 'up' ? 'success' : 'danger'} className="font-bold">
                    {metric.yoy} {metric.trend === 'up' ? '↑' : '↓'}
                  </Text>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-gray-400">环比</span>
                  <Text type="danger" className="font-bold">{metric.qoq} ↓</Text>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Title level={4} className="mb-6! flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-600 rounded-full" />
          趋势分析图表
        </Title>
        <div className="h-[400px] w-full mb-12 bg-gray-50 p-6 rounded-3xl border border-gray-100">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={report.chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dx={-10} />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
              />
              <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: '20px' }} />
              <Line 
                type="monotone" 
                dataKey="收入" 
                stroke="#1677ff" 
                strokeWidth={4} 
                dot={{ r: 4, fill: '#1677ff', strokeWidth: 2, stroke: '#fff' }} 
                activeDot={{ r: 8, strokeWidth: 0 }} 
              />
              <Line 
                type="monotone" 
                dataKey="成本" 
                stroke="#ff4d4f" 
                strokeWidth={4} 
                dot={{ r: 4, fill: '#ff4d4f', strokeWidth: 2, stroke: '#fff' }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <Divider className="my-12" />

        <div className="flex justify-center gap-6">
          <Button size="large" className="px-12! h-14! rounded-2xl!">导出 PDF</Button>
          <Button type="primary" size="large" className="px-12! h-14! rounded-2xl! bg-blue-600 shadow-xl shadow-blue-200">应用至看板</Button>
        </div>
      </div>
    </div>
  );
};
