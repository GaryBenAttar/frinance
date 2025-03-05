import { useState } from 'react';

import { useGetDashboardCardsData } from '../../hooks/useGetDashboardCardsData';
import TransactionModal from './TransactionModal';
import FinancialCards from './FinancialCards';
import DashboardHeader from './DashboardHeader';

const Dashboard = () => {  
  const { cardsList, financialSummary } = useGetDashboardCardsData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <div className="space-y-6">
      <DashboardHeader setIsModalOpen={setIsModalOpen} />
      <FinancialCards financialSummary={financialSummary} cardsList={cardsList} />
      <TransactionModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default Dashboard;