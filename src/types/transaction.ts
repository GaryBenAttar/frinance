export interface Transaction {
    _id: string;
    description: string;
    date: string;
    amount: number;
    type: 'income' | 'expense';
    category: string;
    client?: any; // Will contain client reference data
    project?: any; // Will contain project reference data
    invoice?: string;
    expense?: string;
    status: 'completed' | 'pending' | 'failed';
    createdAt: string;
    updatedAt: string;
  }
  
  export interface MonthlyFinancial {
    month: string;
    income: number;
    expenses: number;
    profit: number;
  }
  
  export interface CategoryBreakdown {
    category: string;
    amount: number;
    percentage: number;
  }
  
  export interface FinancialSummary {
    totalIncome: number;
    totalExpenses: number;
    netIncome: number;
    incomeChange: number;
    expenseChange: number;
    netChange: number;
  }
  
  export interface ClientStatistics {
    totalClients: number;
    activeClients: number;
    totalRevenue: number;
    outstandingBalance: number;
  }