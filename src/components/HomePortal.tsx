import React from 'react';
import * as antd from 'antd';
import { Typography, Input, Space, Button, Card } from 'antd';
import { 
  BarChartOutlined, 
  AppstoreOutlined, 
  MessageOutlined, 
  ThunderboltOutlined, 
  SendOutlined, 
  LockOutlined, 
  ArrowRightOutlined,
  DeleteOutlined,
  EnvironmentOutlined,
  ExpandOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import { motion } from 'motion/react';
import { Scenario } from '../types';

const { Title, Paragraph, Text } = Typography;

interface HomePortalProps {
  inputValue: string;
  setInputValue: (val: string) => void;
  isEnhancing: boolean;
  onMagicEnhance: () => void;
  onSend: (text?: string) => void;
  scenarios: Scenario[];
  onScenarioClick: (scenario: Scenario) => void;
}

export const HomePortal: React.FC<HomePortalProps> = ({
  inputValue,
  setInputValue,
  isEnhancing,
  onMagicEnhance,
  onSend,
  scenarios,
  onScenarioClick
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col items-center justify-start overflow-y-auto bg-white relative"
    >
      <div className="relative z-10 w-full max-w-[1440px] px-12 pt-32 pb-20">
        {/* Hero Section */}
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Title className="text-[56px]! font-bold! mb-6 tracking-tight text-[#1a1a1a]">
              洞察数字背后的<span className="text-blue-600">经营真相</span>
            </Title>
            <Paragraph className="text-2xl text-gray-500 font-normal max-w-4xl mx-auto">
              您好，我是您的财务分析助手，全面支持您从数据到决策。
            </Paragraph>
          </motion.div>
        </div>

        {/* Main Input Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="max-w-6xl mx-auto mb-24 relative z-20"
        >
          <div className="glass-input-card rounded-[32px] p-2 bg-white border border-gray-200 shadow-2xl shadow-blue-500/5">
            <div className="px-10 pt-10 pb-4">
              <Text className="text-gray-400 text-sm mb-6 block font-bold uppercase tracking-widest">请选择您的主题场景或直接提问</Text>
              <Input.TextArea
                autoSize={{ minRows: 4, maxRows: 12 }}
                variant="borderless"
                placeholder="例如：分析深莞区1月份的收入波动原因，并给出改进建议..."
                className="text-2xl! text-gray-800 font-normal p-0 placeholder:text-gray-200 leading-relaxed bg-white"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between px-6 pb-6 pt-2">
              <div className="flex gap-3">
                <Button 
                  type="text" 
                  icon={<EnvironmentOutlined className="text-blue-500" />}
                  className="bg-blue-50/50 hover:bg-blue-100! rounded-full text-blue-600 font-semibold px-5 h-9 border border-blue-100/50"
                  onClick={() => {}}
                >
                  数据洞察
                </Button>
                <Button 
                  type="text" 
                  icon={<ExpandOutlined className="text-gray-400" />}
                  className="hover:bg-gray-100! rounded-full text-gray-600 font-medium px-5 h-9"
                >
                  智能搭建
                </Button>
                <Button 
                  type="text" 
                  icon={<QuestionCircleOutlined className="text-gray-400" />}
                  className="hover:bg-gray-100! rounded-full text-gray-600 font-medium px-5 h-9"
                >
                  智能问数
                </Button>
              </div>
              <div className="flex gap-3 items-center">
                <Button 
                  type="text"
                  icon={<DeleteOutlined className="text-gray-400" />} 
                  className="rounded-xl hover:bg-gray-100! text-gray-500 font-medium px-5 h-9"
                  onClick={() => setInputValue('')}
                >
                  清空
                </Button>
                <Button
                  type="primary"
                  size="large"
                  icon={<SendOutlined />}
                  className="bg-blue-600 hover:bg-blue-700! shadow-lg shadow-blue-200 h-11 px-8 rounded-2xl flex items-center justify-center font-bold"
                  onClick={() => onSend()}
                >
                  发送
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Featured Scenarios */}
        <div className="mt-12 w-full">
          <div className="flex items-center justify-between mb-10 px-2">
            <Title level={3} className="m-0! font-bold! text-[#1a1a1a] tracking-tight">主题场景</Title>
            <Button type="link" className="text-blue-600 font-medium">查看全部</Button>
          </div>
          
          <div className="relative group/scroll">
            <div className="flex overflow-x-auto pb-8 gap-6 relative snap-x snap-mandatory no-scrollbar -mx-4 px-4 scroll-smooth">
              {scenarios.map((s, idx) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  onClick={() => s.status === 'active' && onScenarioClick(s)}
                  className={`
                    p-6 rounded-[24px] border transition-all cursor-pointer group relative overflow-hidden h-[200px] flex flex-col min-w-[320px] snap-start
                    ${s.status === 'building' 
                      ? 'scenario-card-locked grayscale cursor-not-allowed' 
                      : 'bg-white border-white hover:shadow-xl hover:-translate-y-1'}
                  `}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-3xl">{s.icon}</div>
                    <Title level={5} className="m-0! text-[#1a1a1a] font-bold! text-xl! tracking-tight">{s.title}</Title>
                  </div>
                  <Paragraph className="text-gray-500/80 text-sm leading-relaxed line-clamp-3 m-0 flex-1">
                    {s.description || '描述'}
                  </Paragraph>
                  
                  {s.status === 'building' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 backdrop-blur-[1px] rounded-[20px]">
                      <LockOutlined className="text-gray-400 text-xl mb-2" />
                      <span className="text-gray-400 text-xs">建设中...</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
            {/* Gradient Fade */}
            <div className="absolute top-0 right-0 bottom-8 w-20 bg-gradient-to-l from-[#fcfdfe] to-transparent pointer-events-none z-10 opacity-100 group-hover/scroll:opacity-0 transition-opacity duration-300" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
