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
import { Bot, Sparkles, Zap, ShieldCheck } from 'lucide-react';
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
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none" />
      <div className="absolute top-20 left-10 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 right-10 w-96 h-96 bg-indigo-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1440px] px-12 pt-24 pb-20">
        {/* Hero Section */}
        <div className="flex flex-col items-center mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-[28px] flex items-center justify-center shadow-2xl shadow-blue-200 mb-8"
          >
            <Bot size={40} className="text-white" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold tracking-widest uppercase rounded-full border border-blue-100 flex items-center gap-1.5">
                <Sparkles size={10} /> Next-Gen AI Assistant
              </span>
            </div>
            <Title className="text-[64px]! font-bold! mb-6 tracking-tight text-[#1a1a1a] leading-[1.1]">
              您好，我是<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">丰财小精灵</span>
            </Title>
            <Paragraph className="text-2xl text-gray-500 font-normal max-w-3xl mx-auto leading-relaxed">
              您的专业财务分析助手，全面支持您从数据洞察到经营决策。
            </Paragraph>
          </motion.div>
        </div>

        {/* Main Input Area */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-5xl mx-auto mb-20 relative z-20"
        >
          <div className="glass-input-card rounded-[32px] p-2 bg-white border border-gray-200 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)]">
            <div className="px-10 pt-10 pb-4">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <Text className="text-gray-400 text-[11px] font-bold uppercase tracking-[0.2em]">请选择您的主题场景或直接提问</Text>
              </div>
              <Input.TextArea
                autoSize={{ minRows: 3, maxRows: 10 }}
                variant="borderless"
                placeholder="例如：分析深莞区1月份的收入波动原因，并给出改进建议..."
                className="text-[22px]! text-gray-800 font-medium p-0 placeholder:text-gray-200 leading-relaxed bg-white"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between px-6 pb-6 pt-2">
              <div className="flex gap-2">
                <Button 
                  type="text" 
                  icon={<Zap size={14} className="text-blue-500" />}
                  className="bg-blue-50/50 hover:bg-blue-100! rounded-xl text-blue-600 font-bold px-4 h-9 border border-blue-100/50 flex items-center gap-1.5"
                  onClick={() => {}}
                >
                  数据洞察
                </Button>
                <Button 
                  type="text" 
                  icon={<AppstoreOutlined className="text-gray-400" />}
                  className="hover:bg-gray-100! rounded-xl text-gray-600 font-semibold px-4 h-9 flex items-center gap-1.5"
                >
                  智能搭建
                </Button>
                <Button 
                  type="text" 
                  icon={<QuestionCircleOutlined className="text-gray-400" />}
                  className="hover:bg-gray-100! rounded-xl text-gray-600 font-semibold px-4 h-9 flex items-center gap-1.5"
                >
                  智能问数
                </Button>
              </div>
              <div className="flex gap-3 items-center">
                <Button 
                  type="text"
                  icon={<DeleteOutlined className="text-gray-400" />} 
                  className="rounded-xl hover:bg-gray-100! text-gray-500 font-semibold px-4 h-9"
                  onClick={() => setInputValue('')}
                >
                  清空
                </Button>
                <Button
                  type="primary"
                  size="large"
                  icon={<SendOutlined />}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90! border-none shadow-xl shadow-blue-200 h-11 px-8 rounded-2xl flex items-center justify-center font-bold"
                  onClick={() => onSend()}
                >
                  开启对话
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Featured Scenarios */}
        <div className="mt-12 w-full">
          <div className="flex items-center justify-between mb-8 px-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                <ShieldCheck size={18} className="text-blue-600" />
              </div>
              <Title level={3} className="m-0! font-bold! text-[#1a1a1a] tracking-tight">核心分析场景</Title>
            </div>
            <Button type="link" className="text-blue-600 font-bold">查看全部场景</Button>
          </div>
          
          <div className="relative group/scroll">
            <div className="flex overflow-x-auto pb-8 gap-6 relative snap-x snap-mandatory no-scrollbar -mx-4 px-4 scroll-smooth">
              {scenarios.map((s, idx) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  onClick={() => s.status === 'active' && onScenarioClick(s)}
                  className={`
                    p-8 rounded-[32px] border transition-all cursor-pointer group relative overflow-hidden h-[220px] flex flex-col min-w-[360px] snap-start
                    ${s.status === 'building' 
                      ? 'bg-gray-50 border-gray-100 grayscale cursor-not-allowed opacity-60' 
                      : 'bg-white border-gray-100 hover:border-blue-200 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.06)] hover:-translate-y-1'}
                  `}
                >
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                      {s.icon}
                    </div>
                    <Title level={5} className="m-0! text-[#1a1a1a] font-bold! text-[18px]! tracking-tight">{s.title}</Title>
                  </div>
                  <Paragraph className="text-gray-500 text-sm leading-relaxed line-clamp-3 m-0 flex-1 font-medium">
                    {s.description || '描述'}
                  </Paragraph>
                  
                  <div className="mt-4 flex items-center text-blue-600 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    立即进入 <ArrowRightOutlined className="ml-1.5 text-[10px]" />
                  </div>

                  {s.status === 'building' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 backdrop-blur-[1px] rounded-[32px]">
                      <LockOutlined className="text-gray-400 text-xl mb-2" />
                      <span className="text-gray-400 text-[11px] font-bold uppercase tracking-widest">建设中</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
            {/* Gradient Fade */}
            <div className="absolute top-0 right-0 bottom-8 w-24 bg-gradient-to-l from-white to-transparent pointer-events-none z-10 opacity-100 group-hover/scroll:opacity-0 transition-opacity duration-300" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
