import api from './api';

export const dashboardService = {
  getFinancialSummary: async () => {
    const response = await api.get('/dashboard/financial-summary');
    return response.data.data;
  },
  
  getMonthlyFinancials: async () => {
    const response = await api.get('/dashboard/monthly-financials');
    return response.data.data;
  },
  
  getExpenseBreakdown: async () => {
    const response = await api.get('/dashboard/expense-breakdown');
    return response.data.data;
  },
  
  getRecentTransactions: async (limit = 10) => {
    const response = await api.get(`/dashboard/recent-transactions?limit=${limit}`);
    return response.data.data;
  },
  
  getCashFlowProjections: async () => {
    const response = await api.get('/dashboard/cash-flow-projections');
    return response.data.data;
  },
  
  getClientStatistics: async () => {
    const response = await api.get('/dashboard/client-statistics');
    return response.data.data;
  }
};