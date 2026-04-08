import React from 'react';
import { Layout, Menu, Space, Button, Avatar, Badge } from 'antd';
import { 
  DownOutlined, 
  BellOutlined,
  QuestionCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Bot, Sparkles } from 'lucide-react';

const { Header } = Layout;

export const TopHeader: React.FC = () => {
  return (
    <Header 
      style={{ background: '#ffffff', padding: '0 24px', borderBottom: '1px solid #f0f0f0' }}
      className="flex items-center justify-between h-14 relative z-[100] shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
    >
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-100 group-hover:scale-105 transition-all duration-300">
            <Bot size={20} className="text-white" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[17px] font-bold text-[#1a1a1a] tracking-tight group-hover:text-blue-600 transition-colors">丰财小精灵</span>
            <span className="text-[10px] text-blue-500 font-bold tracking-widest uppercase opacity-70 flex items-center gap-1">
              <Sparkles size={10} /> AI FINANCIAL AGENT
            </span>
          </div>
        </div>
        
        <Menu
          mode="horizontal"
          theme="light"
          defaultSelectedKeys={['1']}
          className="border-none h-14 flex items-center bg-transparent"
          style={{ lineHeight: '56px', background: 'transparent' }}
          items={[
            { 
              key: '1', 
              label: (
                <span className="px-3 font-medium text-[14px] hover:text-blue-600 transition-colors">
                  精灵首页
                </span>
              ) 
            },
            { 
              key: '2', 
              label: (
                <span className="px-3 font-medium text-[14px] text-gray-400 cursor-not-allowed">
                  数据中心
                </span>
              ) 
            },
          ]}
        />
      </div>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-6 text-gray-500 text-[13px] font-medium">
          <Space className="cursor-pointer hover:text-blue-600 transition-colors group">
            工具库
            <DownOutlined className="text-[10px] opacity-40 group-hover:opacity-100 transition-opacity" />
          </Space>
          <span className="cursor-pointer hover:text-blue-600 transition-colors">权限管理</span>
          <Space className="cursor-pointer hover:text-blue-600 transition-colors group">
            下载中心
            <DownOutlined className="text-[10px] opacity-40 group-hover:opacity-100 transition-opacity" />
          </Space>
        </div>
        
        <div className="w-px h-6 bg-gray-100" />

        <Space size={20} className="text-gray-400">
          <Badge dot offset={[-2, 2]} color="#ff4d4f">
            <BellOutlined className="text-xl cursor-pointer hover:text-blue-600 transition-colors" />
          </Badge>
          <QuestionCircleOutlined className="text-xl cursor-pointer hover:text-blue-600 transition-colors" />
          <div className="flex items-center gap-2.5 cursor-pointer group pl-2">
            <div className="relative">
              <Avatar size={32} icon={<UserOutlined />} className="bg-gray-50 text-gray-400 group-hover:border-blue-400 border-2 border-transparent transition-all" />
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] font-bold text-gray-700 leading-none group-hover:text-blue-600 transition-colors">管理员</span>
              <span className="text-[10px] text-gray-400 leading-none mt-1">在线</span>
            </div>
            <DownOutlined className="text-[10px] opacity-30 group-hover:opacity-100 transition-opacity" />
          </div>
        </Space>
      </div>
    </Header>
  );
};
