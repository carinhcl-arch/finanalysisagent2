import React from 'react';
import { Layout, Menu, Space, Button, Avatar, Badge } from 'antd';
import { 
  DownOutlined, 
  ToolOutlined, 
  SafetyCertificateOutlined, 
  DownloadOutlined,
  BellOutlined,
  QuestionCircleOutlined,
  UserOutlined,
  SwapOutlined
} from '@ant-design/icons';

const { Header } = Layout;

export const TopHeader: React.FC = () => {
  return (
    <Header 
      style={{ background: '#ffffff', padding: '0 24px', borderBottom: '1px solid #f0f0f0' }}
      className="flex items-center justify-between h-14 relative z-[100] shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
    >
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-2.5 cursor-pointer group">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-md shadow-blue-100 group-hover:scale-105 transition-transform">
            <SwapOutlined className="text-white text-lg rotate-45" />
          </div>
          <span className="text-lg font-bold text-[#1a1a1a] tracking-tight">智控平台</span>
          <div className="w-px h-4 bg-gray-200 mx-1" />
          <span className="text-xs text-gray-400 font-medium">企业级 AI 助手</span>
        </div>
        
        <Menu
          mode="horizontal"
          theme="light"
          defaultSelectedKeys={['1']}
          className="border-none h-14 flex items-center bg-transparent"
          style={{ lineHeight: '56px', background: 'transparent' }}
          items={[
            { key: '1', label: <span className="px-2">智控首页</span> },
            { key: '2', label: <span className="px-2">...</span> },
          ]}
        />
      </div>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-6 text-gray-500 text-[13px] font-medium">
          <Space className="cursor-pointer hover:text-blue-600 transition-colors">工具<DownOutlined className="text-[10px] opacity-50" /></Space>
          <span className="cursor-pointer hover:text-blue-600 transition-colors">权限中心</span>
          <Space className="cursor-pointer hover:text-blue-600 transition-colors">下载任务<DownOutlined className="text-[10px] opacity-50" /></Space>
        </div>
        
        <div className="w-px h-6 bg-gray-100" />

        <Space size={20} className="text-gray-400">
          <Badge dot offset={[-2, 2]} color="#ff4d4f">
            <BellOutlined className="text-xl cursor-pointer hover:text-blue-600 transition-colors" />
          </Badge>
          <QuestionCircleOutlined className="text-xl cursor-pointer hover:text-blue-600 transition-colors" />
          <div className="flex items-center gap-2 cursor-pointer group">
            <Avatar size={32} icon={<UserOutlined />} className="bg-gray-100 text-gray-400 group-hover:border-blue-200 border border-transparent transition-all" />
            <DownOutlined className="text-[10px] opacity-30 group-hover:opacity-100 transition-opacity" />
          </div>
        </Space>
      </div>
    </Header>
  );
};
