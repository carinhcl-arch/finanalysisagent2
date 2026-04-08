import React from 'react';
import { Modal, Button, Input, Menu, Tag, Badge, Typography, Space } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { Metric } from '../types';

const { Text } = Typography;

interface SmartPickerProps {
  open: boolean;
  onCancel: () => void;
  metrics: Metric[];
  selectedMetrics: string[];
  setSelectedMetrics: React.Dispatch<React.SetStateAction<string[]>>;
}

export const SmartPicker: React.FC<SmartPickerProps> = ({
  open,
  onCancel,
  metrics,
  selectedMetrics,
  setSelectedMetrics
}) => {
  return (
    <Modal
      title="选择指标"
      open={open}
      onCancel={onCancel}
      width={800}
      footer={[
        <Button key="cancel" onClick={onCancel}>取消</Button>,
        <Button key="ok" type="primary" onClick={onCancel}>确定</Button>
      ]}
    >
      <div className="flex gap-6 h-[500px]">
        <div className="w-1/2 border-r pr-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <Text strong>可选指标</Text>
            <Badge count="仅展示我有权限的指标" className="text-xs" />
          </div>
          <Input prefix={<SearchOutlined />} placeholder="请输入指标名称" className="mb-4" />
          
          <Menu
            mode="horizontal"
            defaultSelectedKeys={['1']}
            className="mb-4"
            items={[
              { key: '1', label: '激活经营' },
              { key: '2', label: '收入' },
              { key: '3', label: '成本' },
              { key: '4', label: '利润' },
            ]}
          />

          <div className="flex flex-col gap-2">
            {metrics.map(item => (
              <div key={item.id} className="py-2 border-b border-gray-100 last:border-none">
                <div className="flex items-center gap-2 w-full">
                  <Input type="checkbox" checked={selectedMetrics.includes(item.id)} onChange={() => {
                    setSelectedMetrics(prev => prev.includes(item.id) ? prev.filter(id => id !== item.id) : [...prev, item.id]);
                  }} />
                  <div className="flex-1">
                    <Text>{item.name}</Text>
                    <Space className="ml-2">
                      <Tag color="blue" className="text-[10px] px-1 m-0!">月</Tag>
                      <Tag color="orange" className="text-[10px] px-1 m-0!">敏</Tag>
                      <Tag color="gold" className="text-[10px] px-1 m-0!">官</Tag>
                    </Space>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/2 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <Text strong>已选指标 ({selectedMetrics.length})</Text>
            <Button type="link" size="small" danger onClick={() => setSelectedMetrics([])}>清空</Button>
          </div>
          <div className="flex flex-col gap-2">
            {metrics.filter(m => selectedMetrics.includes(m.id)).map(item => (
              <div key={item.id} className="bg-gray-50 mb-2 rounded px-3 py-2">
                <div className="flex justify-between items-center w-full">
                  <Space>
                    <MenuOutlined className="text-gray-400" />
                    <Text>{item.name}</Text>
                  </Space>
                  <Button type="text" icon={<PlusOutlined className="rotate-45" />} onClick={() => setSelectedMetrics(prev => prev.filter(id => id !== item.id))} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

function MenuOutlined(props: any) {
  return (
    <svg viewBox="64 64 896 896" focusable="false" data-icon="menu" width="1em" height="1em" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z"></path>
    </svg>
  );
}
