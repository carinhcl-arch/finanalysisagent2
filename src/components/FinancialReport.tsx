import React from 'react';
import { Typography, Card, Row, Col, Table, Tag, Space } from 'antd';
import { motion } from 'motion/react';
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  ZAxis, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { 
  UserOutlined, 
  RiseOutlined, 
  FallOutlined, 
  WalletOutlined, 
  BarChartOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import { FinancialReportData } from '../types';

const { Title, Text, Paragraph } = Typography;

interface Props {
  data: FinancialReportData;
}

export const FinancialReport: React.FC<Props> = ({ data }) => {
  const columns = [
    {
      title: '客户名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <Text className="text-blue-600 cursor-pointer hover:underline">{text}</Text>,
    },
    {
      title: '主档案ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '收入',
      dataIndex: 'revenue',
      key: 'revenue',
      align: 'right' as const,
    },
    {
      title: '成本',
      dataIndex: 'cost',
      key: 'cost',
      align: 'right' as const,
    },
    {
      title: '毛利率',
      dataIndex: 'margin',
      key: 'margin',
      align: 'right' as const,
      render: (margin: string) => {
        const isNegative = margin.startsWith('-');
        return <Text className={isNegative ? 'text-red-500' : 'text-green-500'}>{margin}</Text>;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colors: Record<string, string> = {
          'loss': 'red',
          'warning': 'orange',
          'normal': 'blue',
          'success': 'green',
        };
        const labels: Record<string, string> = {
          'loss': '亏损',
          'warning': '预警',
          'normal': '正常',
          'success': '优异',
        };
        return <Tag color={colors[status] || 'default'}>{labels[status] || status}</Tag>;
      },
    },
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
      className="p-6 bg-[#f8fafc] min-h-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Summary */}
      <motion.div variants={itemVariants}>
        <Card className="mb-6 border-none shadow-sm bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-2xl">
          <div className="flex items-start gap-4">
            <div className="bg-white/20 p-2 rounded-lg">
              <BarChartOutlined className="text-2xl" />
            </div>
            <div>
              <Title level={4} className="text-white! mb-2">AI总览：经营状况诊断</Title>
              <Paragraph className="text-blue-50 mb-0 leading-relaxed">
                {data.summary}
              </Paragraph>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]} className="mb-6">
        {data.stats.map((stat, idx) => (
          <Col span={6} key={idx}>
            <motion.div variants={itemVariants}>
              <Card className="rounded-2xl shadow-sm border-none h-full">
              <div className="flex justify-between items-start mb-2">
                <Text className="text-gray-400 text-xs uppercase tracking-wider">{stat.label}</Text>
                <div className="text-blue-500 bg-blue-50 p-1.5 rounded-lg">
                  <BarChartOutlined />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <Title level={3} className="m-0">{stat.value}</Title>
                <div className={`flex items-center text-xs font-bold ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.trend === 'up' ? <RiseOutlined /> : <FallOutlined />}
                  <span className="ml-1">{stat.trendValue}</span>
                </div>
              </div>
            </Card>
            </motion.div>
          </Col>
        ))}
      </Row>

      {/* Bubble Chart Section */}
      <motion.div variants={itemVariants}>
        <Card className="mb-6 rounded-2xl shadow-sm border-none">
        <Title level={5} className="mb-6">价值分布矩阵 (Margin vs Revenue)</Title>
        <div className="h-[400px] w-full relative">
          {/* Quadrant Labels */}
          <div className="absolute top-4 right-4 text-[10px] text-gray-400 font-bold uppercase">明星客户 (High Margin, High Revenue)</div>
          <div className="absolute top-4 left-4 text-[10px] text-gray-400 font-bold uppercase">高能长尾 (High Margin, Low Revenue)</div>
          <div className="absolute bottom-4 left-4 text-[10px] text-gray-400 font-bold uppercase">低效存量 (Low Margin, Low Revenue)</div>
          <div className="absolute bottom-4 right-4 text-[10px] text-gray-400 font-bold uppercase">规模陷阱 (Low Margin, High Revenue)</div>
          
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <XAxis 
                type="number" 
                dataKey="revenue" 
                name="Revenue" 
                unit="w" 
                label={{ value: '收入 (REVENUE)', position: 'bottom', offset: 0, fontSize: 10 }}
                axisLine={{ stroke: '#e2e8f0' }}
                tick={{ fontSize: 10, fill: '#94a3b8' }}
              />
              <YAxis 
                type="number" 
                dataKey="margin" 
                name="Margin" 
                unit="%" 
                label={{ value: '毛利率 (MARGIN)', angle: -90, position: 'left', fontSize: 10 }}
                axisLine={{ stroke: '#e2e8f0' }}
                tick={{ fontSize: 10, fill: '#94a3b8' }}
              />
              <ZAxis type="number" dataKey="size" range={[100, 1000]} name="Size" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="Customers" data={data.bubbleData}>
                {data.bubbleData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.margin > 0 ? (entry.revenue > 300 ? '#10b981' : '#3b82f6') : (entry.revenue > 300 ? '#f59e0b' : '#ef4444')} 
                    fillOpacity={0.6}
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </Card>
      </motion.div>

      {/* Customer List Table */}
      <motion.div variants={itemVariants}>
        <Card className="rounded-2xl shadow-sm border-none overflow-hidden">
          <Title level={5} className="mb-4">负毛利客户清单 (需重点关注并制定招引计划)</Title>
          <Table 
            columns={columns} 
            dataSource={data.customerList} 
            pagination={false}
            size="middle"
            className="custom-table"
            rowKey="id"
          />
        </Card>
      </motion.div>
    </motion.div>
  );
};
