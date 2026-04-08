import React from 'react';
import { Typography, Space, Divider } from 'antd';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { MindMap } from './MindMap';
import { AnalysisStep } from '../types';

const { Text } = Typography;

interface ThoughtProcessProps {
  isExpanded: boolean;
  onToggle: () => void;
  isStreaming: boolean;
  thinkingText?: string;
  analysisFlow?: AnalysisStep[];
}

export const ThoughtProcess: React.FC<ThoughtProcessProps> = ({
  isExpanded,
  onToggle,
  isStreaming,
  thinkingText,
  analysisFlow
}) => {
  return (
    <div className="mb-4 border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm">
      <div 
        className="px-4 py-3 bg-gray-50/50 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={onToggle}
      >
        <Space align="center" size={12}>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <Text className="text-xs font-bold text-gray-700">
              {isStreaming ? '深度思考中...' : '深度思考结论'}
            </Text>
          </div>
          {isExpanded ? <UpOutlined className="text-xs text-gray-400" /> : <DownOutlined className="text-xs text-gray-400" />}
        </Space>
        <div className="flex items-center gap-3">
          <Text className="text-[10px] text-gray-400">全屏</Text>
          <Text className="text-[10px] text-gray-400">收起</Text>
        </div>
      </div>
      
      <AnimatePresence>
        {isExpanded && (
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
                <MindMap steps={analysisFlow || []} />
              </div>

              {/* Thinking Text Section (Styled Box) */}
              {thinkingText && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-5 bg-gray-50 border border-gray-100 rounded-xl"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Text className="text-sm font-bold text-gray-800">诊断分析中</Text>
                  </div>
                  <div className="prose prose-sm max-w-none text-gray-500 leading-relaxed max-h-[150px] overflow-y-auto custom-scrollbar">
                    <Markdown>{thinkingText}</Markdown>
                    {isStreaming && <span className="inline-block w-1 h-4 bg-blue-500 ml-1 animate-pulse align-middle" />}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
