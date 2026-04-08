import React from 'react';
import { Typography, Empty } from 'antd';
import { motion, AnimatePresence } from 'motion/react';
import { NegativeMarginReportData } from '../types';
import { SingleCustomerReport } from './SingleCustomerReport';

const { Title, Text } = Typography;

interface Props {
  data: NegativeMarginReportData;
  selectedCustomerId?: string;
}

export const NegativeMarginReport: React.FC<Props> = ({ data, selectedCustomerId }) => {
  const selectedCustomer = data.customers.find(c => c.customerId === selectedCustomerId) || data.customers[0];

  return (
    <div className="min-h-full bg-gray-50">
      <AnimatePresence mode="wait">
        {selectedCustomer ? (
          <motion.div
            key={selectedCustomer.customerId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="p-8"
          >
            <SingleCustomerReport data={selectedCustomer} />
          </motion.div>
        ) : (
          <div className="flex items-center justify-center h-full py-20">
            <Empty 
              image={Empty.PRESENTED_IMAGE_SIMPLE} 
              description="请选择一个客户查看诊断报告" 
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
