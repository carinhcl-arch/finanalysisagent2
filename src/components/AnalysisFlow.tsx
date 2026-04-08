import React from 'react';
import { Typography, Space, Tooltip } from 'antd';
import { motion } from 'motion/react';
import { AnalysisStep } from '../types';
import { CheckCircleFilled, LoadingOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface AnalysisFlowProps {
  steps: AnalysisStep[];
}

const StepNode = ({ step, className = "" }: { step: AnalysisStep, className?: string }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 10, scale: 0.95 }}
    animate={{ 
      opacity: 1, 
      y: 0, 
      scale: step.status === 'processing' ? 1.02 : 1,
      borderColor: step.status === 'processing' ? '#60a5fa' : (step.status === 'completed' ? '#bfdbfe' : '#f3f4f6')
    }}
    transition={{ duration: 0.4 }}
    className={`
      relative p-4 rounded-2xl border bg-white shadow-sm w-48 transition-all duration-500
      ${step.status === 'processing' ? 'ring-4 ring-blue-50 shadow-md' : ''}
      ${step.status === 'completed' ? 'bg-blue-50/30' : ''}
      ${className}
    `}
  >
    <div className="flex items-center justify-between mb-2">
      <Text strong className="text-[11px] tracking-tight">{step.title}</Text>
      {step.status === 'completed' && <CheckCircleFilled className="text-green-500 text-xs" />}
      {step.status === 'processing' && <LoadingOutlined className="text-blue-500 text-xs" />}
    </div>
    <Text className="text-[10px] text-gray-400 leading-tight block">
      {step.description}
    </Text>
    
    {/* Progress bar effect for processing state */}
    {step.status === 'processing' && (
      <motion.div 
        className="absolute bottom-0 left-0 h-0.5 bg-blue-500 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    )}
  </motion.div>
);

const Connector = ({ active, className = "" }: { active?: boolean, className?: string }) => (
  <div className={`h-px bg-gray-100 flex-1 relative ${className}`}>
    <motion.div 
      initial={{ width: 0 }}
      animate={{ width: active ? '100%' : 0 }}
      className="absolute left-0 top-0 h-full bg-blue-400"
      transition={{ duration: 0.8 }}
    />
    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-gray-300 rotate-45" />
  </div>
);

export const AnalysisFlow: React.FC<AnalysisFlowProps> = ({ steps }) => {
  const startStep = steps.find(s => s.id === 'start');
  const taskStep = steps.find(s => s.id === 'task');
  const parallelSteps = steps.filter(s => ['data', 'ai', 'profit', 'strategy'].includes(s.id));
  const outputStep = steps.find(s => s.id === 'output');

  const isTaskActive = startStep?.status === 'completed';
  const isParallelActive = taskStep?.status === 'completed';
  const isOutputActive = parallelSteps.every(s => s.status === 'completed') && parallelSteps.length > 0;

  return (
    <div className="flex items-center gap-4 py-8 px-4 overflow-x-auto min-w-max">
      {/* Start */}
      {startStep && <StepNode key="start" step={startStep} className="bg-blue-50/50 border-blue-100" />}
      
      <Connector active={isTaskActive} className="w-8" />

      {/* Task Distribution */}
      {taskStep && <StepNode key="task" step={taskStep} className="bg-purple-50/50 border-purple-100" />}

      <div className="flex flex-col gap-4 relative px-8">
        {/* Vertical Line for branching */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-[80%] bg-gray-100" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-[80%] bg-gray-100" />

        {parallelSteps.map((step) => (
          <div key={step.id} className="flex items-center relative">
            {/* Branching lines */}
            <div className="absolute -left-8 top-1/2 w-8 h-px bg-gray-100 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: isParallelActive ? '100%' : 0 }}
                className="h-full bg-blue-300"
              />
            </div>
            <div className="absolute -right-8 top-1/2 w-8 h-px bg-gray-100 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: step.status === 'completed' ? '100%' : 0 }}
                className="h-full bg-blue-300"
              />
            </div>
            
            <StepNode step={step} className="hover:border-blue-200" />
          </div>
        ))}
      </div>

      {/* Output */}
      {outputStep && (
        <>
          <Connector active={isOutputActive} className="w-8" />
          <StepNode key="output" step={outputStep} className="bg-green-50/50 border-green-100" />
        </>
      )}
    </div>
  );
};
