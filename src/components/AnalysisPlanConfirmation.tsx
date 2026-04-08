import React from 'react';
import { Card, Typography, Button, Space, Divider } from 'antd';
import { 
  CheckCircleOutlined, 
  NodeIndexOutlined, 
  ArrowRightOutlined
} from '@ant-design/icons';
import { AnalysisPlan, AnalysisStep } from '../types';
import { MindMap } from './MindMap';
import { motion } from 'motion/react';

const { Title, Text, Paragraph } = Typography;

interface Props {
  plan: AnalysisPlan;
  onConfirm: () => void;
  analysisFlow?: AnalysisStep[];
}

export const AnalysisPlanConfirmation: React.FC<Props> = ({ plan, onConfirm, analysisFlow }) => {

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl"
    >
      <Card 
        className="rounded-2xl border-blue-100 shadow-xl shadow-blue-50/50 overflow-hidden"
        styles={{ body: { padding: 0 } }}
      >
        <div className="bg-white p-6 border-b border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <Space align="center">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <NodeIndexOutlined className="text-xl text-blue-600" />
              </div>
              <div>
                <Title level={5} className="m-0 text-gray-800 font-bold">{plan.title}</Title>
                <Text className="text-blue-600 text-[10px] font-bold uppercase tracking-wider">AI 建议分析路径</Text>
              </div>
            </Space>
          </div>
          
          <Paragraph className="text-gray-500 text-xs m-0 leading-relaxed">
            基于您的分析意图，我已为您规划了以下深度诊断路径。该路径将通过多维数据下钻，精准锁定利润损益点。
          </Paragraph>
        </div>

        <div className="p-6 bg-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-50/50 rounded-xl border border-gray-100 p-4"
          >
            <MindMap mode="preview" steps={analysisFlow || plan.steps.map((s, i) => ({ id: String(i), title: s, description: '', status: 'pending' }))} />
          </motion.div>

          <Divider className="my-6" />

          <div className="flex flex-col gap-4">
            <div className="flex items-center">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 border border-green-100 rounded-full">
                <CheckCircleOutlined className="text-green-500 text-xs" />
                <span className="text-[11px] font-bold text-green-600">逻辑已校验</span>
              </div>
            </div>
            <Button 
              type="primary" 
              size="large"
              icon={<ArrowRightOutlined />}
              onClick={onConfirm}
              className="w-full rounded-xl h-14 bg-blue-600 hover:bg-blue-700 border-none shadow-lg shadow-blue-100 font-bold text-base flex items-center justify-center gap-2"
            >
              确认分析思路并输出报告
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
