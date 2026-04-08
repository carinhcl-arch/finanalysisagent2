import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AnalysisStep } from '../types';
import { Progress, Typography, Space } from 'antd';
import { 
  PlayCircleOutlined, 
  ShareAltOutlined, 
  DatabaseOutlined, 
  RobotOutlined, 
  LineChartOutlined, 
  BulbOutlined, 
  FileDoneOutlined,
  LoadingOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';

const { Text } = Typography;

interface MindMapProps {
  steps: AnalysisStep[];
  mode?: 'preview' | 'live';
}

const Node = ({ step, color, index, mode = 'live' }: { step: AnalysisStep; color: string; index: number; mode?: 'preview' | 'live' }) => {
  const isPending = step.status === 'pending';
  const isProcessing = step.status === 'processing';
  const isCompleted = step.status === 'completed';
  const isPreview = mode === 'preview';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ 
        opacity: (isPending && !isPreview) ? 0.5 : 1, 
        scale: 1, 
        borderColor: isProcessing ? color : (isCompleted || isPreview ? color : '#e2e8f0'),
        filter: (isPending && !isPreview) ? 'grayscale(100%)' : 'grayscale(0%)',
        boxShadow: isProcessing ? `0 0 15px ${color}33` : '0 1px 2px 0 rgb(0 0 0 / 0.05)'
      }}
      transition={{ 
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
        borderColor: { duration: 0.5 },
        filter: { duration: 0.5 },
        boxShadow: { duration: 1, repeat: isProcessing ? Infinity : 0, repeatType: 'reverse' }
      }}
      className={`p-3 rounded-xl border-2 bg-white flex flex-col gap-2 min-w-[150px] max-w-[190px] relative z-10`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-[13px]" style={{ color: (isPending && !isPreview) ? '#94a3b8' : color }}>
          {isProcessing ? <LoadingOutlined /> : (
            step.title.includes('启动') ? <PlayCircleOutlined /> :
            step.title.includes('分发') ? <ShareAltOutlined /> :
            step.title.includes('提取') ? <DatabaseOutlined /> :
            step.title.includes('总览') ? <RobotOutlined /> :
            step.title.includes('分析') ? <LineChartOutlined /> :
            step.title.includes('生成') ? <BulbOutlined /> :
            step.title.includes('输出') ? <FileDoneOutlined /> : <PlayCircleOutlined />
          )}
          {step.title}
        </div>
        {(isCompleted || isPreview) && <FileDoneOutlined className="text-green-500 text-xs" />}
      </div>
      
      <div className="text-[10px] text-gray-500 leading-tight h-8 overflow-hidden">
        {step.description}
      </div>

      {!isPending && !isPreview && (
        <div className="mt-1">
          <Progress 
            percent={isCompleted ? 100 : (step.progress || 0)} 
            size="small" 
            strokeColor={color}
            railColor="#f1f5f9"
            showInfo={false}
            className="m-0"
          />
          <div className="flex justify-between items-center mt-1">
            <span className="text-[9px] text-gray-400">
              {isCompleted ? '已完成' : '处理中...'}
            </span>
            <span className="text-[9px] font-bold" style={{ color }}>
              {isCompleted ? '100%' : `${step.progress || 0}%`}
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export const MindMap: React.FC<MindMapProps> = ({ steps, mode = 'live' }) => {
  // Define the layout based on the image provided
  const root = steps.find(s => s.title.includes('启动'));
  const branch = steps.find(s => s.title.includes('分发'));
  const leaves = steps.filter(s => !s.title.includes('启动') && !s.title.includes('分发') && !s.title.includes('输出'));
  const end = steps.find(s => s.title.includes('输出'));

  const isAnyProcessing = steps.some(s => s.status === 'processing');
  const allCompleted = steps.every(s => s.status === 'completed');
  const isPreview = mode === 'preview';

  return (
    <div className="flex flex-col gap-6">
      {/* Global Progress Hint */}
      <AnimatePresence mode="wait">
        {!isPreview && (isAnyProcessing || !allCompleted) && (
          <motion.div
            key="progress-hint"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center justify-between bg-blue-50/50 border border-blue-100 rounded-xl px-4 py-3"
          >
            <Space size={12}>
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <ClockCircleOutlined className="text-blue-600" />
              </div>
              <div>
                <div className="text-xs font-bold text-blue-800">深度诊断分析进行中</div>
                <div className="text-[10px] text-blue-600/70 leading-relaxed">
                  由于涉及多维数据下钻与 AI 建模，单个负毛利客户约需 4 分钟。
                  总耗时将随客户数量增加，请耐心等候或稍后通过缓存查看。
                </div>
              </div>
            </Space>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-[10px] font-bold text-blue-800">总体进度</div>
                <div className="text-xs font-black text-blue-600">
                  {Math.round((steps.filter(s => s.status === 'completed').length / steps.length) * 100)}%
                </div>
              </div>
              <Progress 
                type="circle" 
                percent={Math.round((steps.filter(s => s.status === 'completed').length / steps.length) * 100)} 
                size={32} 
                strokeWidth={12}
                strokeColor="#3b82f6"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`p-8 ${isPreview ? 'bg-transparent' : 'bg-white/50'} rounded-2xl overflow-x-auto ${isPreview ? '' : 'border border-gray-100'}`}>
        <div className="flex items-center gap-12 min-w-max relative py-4">
          {/* SVG Connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            {/* Root to Branch */}
            <line x1="170" y1="50%" x2="230" y2="50%" stroke="#e2e8f0" strokeWidth="2" strokeDasharray={(allCompleted || isPreview) ? "0" : "4 4"} />
            
            {/* Branch to Leaves */}
            <path d="M 400 50% C 440 50%, 440 20%, 480 20%" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray={(allCompleted || isPreview) ? "0" : "4 4"} />
            <path d="M 400 50% C 440 50%, 440 40%, 480 40%" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray={(allCompleted || isPreview) ? "0" : "4 4"} />
            <path d="M 400 50% C 440 50%, 440 60%, 480 60%" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray={(allCompleted || isPreview) ? "0" : "4 4"} />
            <path d="M 400 50% C 440 50%, 440 80%, 480 80%" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray={(allCompleted || isPreview) ? "0" : "4 4"} />

            {/* Leaves to End */}
            <path d="M 670 20% C 710 20%, 710 50%, 750 50%" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray={(allCompleted || isPreview) ? "0" : "4 4"} />
            <path d="M 670 40% C 710 40%, 710 50%, 750 50%" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray={(allCompleted || isPreview) ? "0" : "4 4"} />
            <path d="M 670 60% C 710 60%, 710 50%, 750 50%" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray={(allCompleted || isPreview) ? "0" : "4 4"} />
            <path d="M 670 80% C 710 80%, 710 50%, 750 50%" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray={(allCompleted || isPreview) ? "0" : "4 4"} />
          </svg>

          {/* Root */}
          {root && <Node key={root.id} step={root} color="#3b82f6" index={0} mode={mode} />}

          {/* Branch */}
          {branch && <Node key={branch.id} step={branch} color="#8b5cf6" index={1} mode={mode} />}

          {/* Leaves Column */}
          <div className="flex flex-col gap-6">
            {leaves.map((leaf, i) => (
              <Node key={leaf.id} step={leaf} color="#f59e0b" index={i + 2} mode={mode} />
            ))}
          </div>

          {/* End */}
          {end && <Node key={end.id} step={end} color="#10b981" index={leaves.length + 2} mode={mode} />}
        </div>
      </div>
    </div>
  );
};
