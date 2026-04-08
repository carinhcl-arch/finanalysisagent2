import React from 'react';
import { Avatar, Typography, Space, Spin, Input, Button } from 'antd';
import { RobotOutlined, SendOutlined, UserOutlined } from '@ant-design/icons';
import Markdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';
import { ChatMessage, Scenario, AnalysisPlan } from '../types';
import { ThoughtProcess } from './ThoughtProcess';
import { AnalysisPlanConfirmation } from './AnalysisPlanConfirmation';

const { Text } = Typography;

interface ChatPanelProps {
  messages: ChatMessage[];
  inputValue: string;
  setInputValue: (val: string) => void;
  onSend: (text?: string) => void;
  isThinking: boolean;
  isChatCollapsed: boolean;
  onToggleCollapse: () => void;
  isThoughtExpanded: boolean;
  setIsThoughtExpanded: (val: boolean) => void;
  onConfirmPlan: () => void;
  activeScenario: Scenario | null;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({
  messages,
  inputValue,
  setInputValue,
  onSend,
  isThinking,
  isChatCollapsed,
  onToggleCollapse,
  isThoughtExpanded,
  setIsThoughtExpanded,
  onConfirmPlan,
  activeScenario
}) => {
  return (
    <div className={`chat-panel relative transition-all duration-500 ease-in-out ${isChatCollapsed ? 'w-20' : 'flex-1 max-w-[900px]'}`}>
      {/* Chat header */}
      <div className={`px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white z-10 transition-opacity duration-300 ${isChatCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <Space align="center">
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
            <RobotOutlined className="text-blue-600 text-lg" />
          </div>
          <div>
            <Text className="font-bold text-gray-800 block leading-none mb-1">AI 财务助手</Text>
            <Space size={4}>
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <Text className="text-[10px] text-gray-400">在线 · 随时为您分析</Text>
            </Space>
          </div>
        </Space>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-4 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <Avatar 
                  icon={m.role === 'user' ? <UserOutlined /> : <RobotOutlined />} 
                  className={m.role === 'user' ? 'bg-blue-600 shadow-sm' : 'bg-white border border-gray-100 shadow-sm text-blue-600'}
                  size={36}
                />
                <div className={`flex flex-col gap-2 ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                  {/* Thinking Section */}
                  {m.role === 'assistant' && (m.isThinkingTextStreaming || m.thinkingText) && (
                    <ThoughtProcess 
                      isExpanded={isThoughtExpanded}
                      onToggle={() => setIsThoughtExpanded(!isThoughtExpanded)}
                      isStreaming={m.isThinkingTextStreaming || false}
                      thinkingText={m.thinkingText}
                      analysisFlow={m.analysisFlow}
                    />
                  )}

                  {/* Message Content */}
                  {m.content && (
                    <div className={`px-5 py-3.5 rounded-2xl shadow-sm ${
                      m.role === 'user' 
                        ? 'bg-blue-600 text-white rounded-tr-none' 
                        : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none'
                    }`}>
                      <div className={`prose prose-sm max-w-none ${m.role === 'user' ? 'prose-invert' : 'text-gray-800'}`}>
                        <Markdown>{m.content}</Markdown>
                        {m.isStreaming && <span className="inline-block w-1.5 h-4 bg-blue-400 ml-1 animate-pulse align-middle" />}
                      </div>
                    </div>
                  )}

                  {/* Plan Confirmation */}
                  {m.type === 'plan' && m.plan && (
                    <AnalysisPlanConfirmation 
                      plan={m.plan} 
                      onConfirm={onConfirmPlan}
                    />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isThinking && !messages.some(m => m.isStreaming || m.isThinkingTextStreaming) && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm flex items-center gap-3">
              <Spin size="small" />
              <Text className="text-xs text-gray-400">正在思考中...</Text>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className={`p-6 bg-white border-t border-gray-100 transition-opacity duration-300 ${isChatCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="relative group">
          <Input.TextArea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onPressEnter={(e) => {
              if (!e.shiftKey) {
                e.preventDefault();
                onSend();
              }
            }}
            placeholder={activeScenario ? `针对 ${activeScenario.title} 提问...` : "请输入您的财务分析需求，例如：分析上海区亏损客户原因"}
            autoSize={{ minRows: 1, maxRows: 4 }}
            className="pr-24 py-4 pl-6 rounded-2xl border-gray-200 hover:border-blue-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all text-sm shadow-sm resize-none"
          />
          <div className="absolute right-3 bottom-3 flex items-center gap-2">
            <Button 
              type="primary" 
              icon={<SendOutlined />} 
              onClick={() => onSend()}
              disabled={!inputValue.trim()}
              className="h-10 w-10 flex items-center justify-center rounded-xl shadow-md shadow-blue-100"
            />
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between px-2">
          <Space size={16}>
            <Text className="text-[10px] text-gray-400 flex items-center gap-1.5 cursor-pointer hover:text-blue-500 transition-colors">
              <div className="w-1 h-1 rounded-full bg-gray-300" />
              支持 Excel/PDF 上传
            </Text>
            <Text className="text-[10px] text-gray-400 flex items-center gap-1.5 cursor-pointer hover:text-blue-500 transition-colors">
              <div className="w-1 h-1 rounded-full bg-gray-300" />
              Gemini 2.0 Pro 强力驱动
            </Text>
          </Space>
        </div>
      </div>
    </div>
  );
};
