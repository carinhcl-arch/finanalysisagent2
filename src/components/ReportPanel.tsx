import React from 'react';
import { Typography, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'motion/react';
import { ReportCard } from './ReportCard';
import { FinancialReport } from './FinancialReport';
import { SingleCustomerReport } from './SingleCustomerReport';
import { NegativeMarginReport } from './NegativeMarginReport';
import { 
  Report, 
  FinancialReportData, 
  SingleCustomerReportData, 
  NegativeMarginReportData 
} from '../types';

const { Title } = Typography;

interface ReportPanelProps {
  activeReport: Report | null;
  setActiveReport: (report: Report | null) => void;
  activeFinancialReport: FinancialReportData | null;
  setActiveFinancialReport: (data: FinancialReportData | null) => void;
  activeSingleCustomerReport: SingleCustomerReportData | null;
  setActiveSingleCustomerReport: (data: SingleCustomerReportData | null) => void;
  activeNegativeMarginReport: NegativeMarginReportData | null;
  setActiveNegativeMarginReport: (data: NegativeMarginReportData | null) => void;
  selectedNegativeCustomerId: string | null;
  onCloseReport: () => void;
}

export const ReportPanel: React.FC<ReportPanelProps> = ({
  activeReport,
  setActiveReport,
  activeFinancialReport,
  setActiveFinancialReport,
  activeSingleCustomerReport,
  setActiveSingleCustomerReport,
  activeNegativeMarginReport,
  setActiveNegativeMarginReport,
  selectedNegativeCustomerId,
  onCloseReport
}) => {
  const isAnyReportActive = !!(activeReport || activeFinancialReport || activeSingleCustomerReport || activeNegativeMarginReport);

  return (
    <AnimatePresence>
      {isAnyReportActive && (
        <motion.div 
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          className="report-panel"
        >
          {activeReport && <ReportCard report={activeReport} onClose={() => setActiveReport(null)} />}
          
          {activeFinancialReport && (
            <div className="h-full flex flex-col bg-white">
              <div className="p-4 border-b flex justify-between items-center bg-white sticky top-0 z-10">
                <Title level={5} className="m-0">多客户收益诊断报告</Title>
                <Button type="text" icon={<CloseOutlined />} onClick={() => {
                  setActiveFinancialReport(null);
                  onCloseReport();
                }} />
              </div>
              <div className="flex-1 overflow-y-auto">
                <FinancialReport data={activeFinancialReport} />
              </div>
            </div>
          )}

          {activeSingleCustomerReport && (
            <div className="h-full flex flex-col bg-white">
              <div className="p-4 border-b flex justify-between items-center bg-white sticky top-0 z-10">
                <Title level={5} className="m-0">单客户收益诊断报告</Title>
                <Button type="text" icon={<CloseOutlined />} onClick={() => {
                  setActiveSingleCustomerReport(null);
                  onCloseReport();
                }} />
              </div>
              <div className="flex-1 overflow-y-auto">
                <SingleCustomerReport data={activeSingleCustomerReport} />
              </div>
            </div>
          )}

          {activeNegativeMarginReport && (
            <div className="h-full flex flex-col bg-white">
              <div className="p-4 border-b flex justify-between items-center bg-white sticky top-0 z-10">
                <Title level={5} className="m-0">负毛利客户收益诊断报告 ({selectedNegativeCustomerId})</Title>
                <Button type="text" icon={<CloseOutlined />} onClick={() => {
                  setActiveNegativeMarginReport(null);
                  onCloseReport();
                }} />
              </div>
              <div className="flex-1 overflow-y-auto">
                <NegativeMarginReport 
                  data={activeNegativeMarginReport} 
                  selectedCustomerId={selectedNegativeCustomerId || undefined} 
                />
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
