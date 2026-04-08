import React from 'react';
import { Layout, Menu, Button, Avatar, Typography, Badge } from 'antd';
import {
  FileTextOutlined,
  AppstoreOutlined,
  ThunderboltOutlined,
  PlusOutlined,
  DatabaseOutlined,
  CheckCircleOutlined,
  MoreOutlined,
  MessageOutlined,
  DownOutlined,
  SwapOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';

const { Sider } = Layout;
const { Title, Text } = Typography;

interface SidebarProps {
  onNewChat: () => void;
  collapsed?: boolean;
  onToggle?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onNewChat, collapsed = false, onToggle }) => {
  return (
    <Sider 
      width={260} 
      collapsedWidth={80}
      collapsed={collapsed}
      theme="light" 
      className="border-r border-gray-100 h-screen overflow-hidden bg-white relative z-50 shadow-[4px_0_24px_rgba(0,0,0,0.01)]"
    >
      <div className="flex-1 overflow-y-auto flex flex-col">
        <div className={`p-6 flex items-center justify-between mb-2 bg-white ${collapsed ? 'flex-col gap-6 px-0' : ''}`}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg overflow-hidden shadow-md shadow-blue-100 shrink-0">
              <img 
                src="https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611731.jpg" 
                alt="Logo" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {!collapsed && <Title level={4} className="m-0! text-[#1a1a1a] font-bold! text-base! tracking-tight whitespace-nowrap">AI 财务分析</Title>}
          </div>
          <Button 
            type="text" 
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} 
            onClick={onToggle}
            className={`text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all ${collapsed ? 'text-lg' : ''}`}
          />
        </div>
        
        <div className={`px-4 mb-6 ${collapsed ? 'px-2' : ''}`}>
          <Button 
            type="primary" 
            block 
            icon={<PlusOutlined />} 
            onClick={onNewChat}
            className={`sidebar-new-chat-btn shadow-md shadow-blue-100 h-10! rounded-xl! ${collapsed ? 'w-10 p-0 flex items-center justify-center mx-auto' : ''}`}
          >
            {!collapsed && "新对话"}
          </Button>
        </div>

        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          inlineCollapsed={collapsed}
          className="border-none px-2 space-y-1"
          items={[
            { key: '1', icon: <FileTextOutlined className="text-lg" />, label: <span className="font-medium">我的报告</span> },
            { 
              key: '2', 
              icon: <AppstoreOutlined className="text-lg" />, 
              label: <span className="font-medium">更多</span>,
              expandIcon: <DownOutlined className="text-[10px] opacity-50" />,
              children: [
                { key: '2-1', label: '子项 1' },
              ]
            },
            { key: '3', icon: <ThunderboltOutlined className="text-lg" />, label: <span className="font-medium">技能库</span> },
            { key: '4', icon: <DatabaseOutlined className="text-lg" />, label: <span className="font-medium">数据源管理</span> },
            { key: '5', icon: <CheckCircleOutlined className="text-lg" />, label: <span className="font-medium">场景管理</span> },
          ]}
        />

        {!collapsed && (
          <>
            <div className="px-6 py-4 mt-4 border-t border-gray-50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Text type="secondary" className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">缓存加载</Text>
                  <Badge count={1} size="small" offset={[0, 0]} className="scale-75" />
                </div>
                <Button type="text" size="small" icon={<MoreOutlined className="text-gray-300" />} className="h-6 w-6 flex items-center justify-center" />
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between group cursor-pointer py-2.5 px-3 bg-blue-50/30 rounded-xl border border-blue-100/50">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <ThunderboltOutlined className="text-blue-500 text-sm animate-pulse" />
                    <div className="flex flex-col">
                      <Text ellipsis className="text-[12px] text-blue-600 font-bold">负毛利5家客户诊断</Text>
                      <Text className="text-[10px] text-blue-400">正在深度建模 (45%)...</Text>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-8 mt-4 border-t border-gray-50">
              <div className="flex items-center justify-between mb-4">
                <Text type="secondary" className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">历史对话</Text>
                <Button type="text" size="small" icon={<MoreOutlined className="text-gray-300" />} className="h-6 w-6 flex items-center justify-center" />
              </div>
              <div className="flex flex-col gap-1.5">
                {[
                  '深莞区1月收入分析',
                  '客户收益诊断报告',
                  '网点经营效率评估',
                  '年度财务预算测算',
                  '成本下钻明细查询'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between group cursor-pointer py-2.5 px-3 hover:bg-blue-50/50 rounded-xl transition-all duration-200">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <MessageOutlined className="text-gray-300 text-sm group-hover:text-blue-400 transition-colors" />
                      <Text ellipsis className="text-[13px] text-gray-600 group-hover:text-blue-600 font-medium transition-colors">{item}</Text>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="p-4 border-t border-gray-50 bg-white">
        <Button 
          type="text" 
          block 
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} 
          onClick={onToggle}
          className="text-gray-400 hover:text-blue-600 flex items-center justify-center h-10 rounded-xl hover:bg-blue-50/50 transition-all"
        >
          {!collapsed && <span className="ml-2 font-medium text-[13px]">收起导航栏</span>}
        </Button>
      </div>
    </Sider>
  );
};
