// Mock data service to simulate API responses

// Types
export interface Transaction {
    id: string;
    date: string;
    description: string;
    category: string;
    amount: number;
    type: 'income' | 'expense';
    status: 'completed' | 'pending' | 'failed';
    client?: string;
  }
  
  export interface MonthlyFinancials {
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
  
  // Generate random transactions
  const generateTransactions = (count: number): Transaction[] => {
    const types: ('income' | 'expense')[] = ['income', 'expense'];
    const statuses: ('completed' | 'pending' | 'failed')[] = ['completed', 'pending', 'failed'];
    const incomeCategories = ['Client Payment', 'Consulting', 'Contract Work', 'Project Completion', 'Retainer'];
    const expenseCategories = ['Software', 'Office Supplies', 'Utilities', 'Marketing', 'Subscriptions', 'Travel'];
    const clients = ['ABC Corp', 'XYZ Inc', 'Acme Ltd', 'Tech Solutions', 'Global Services'];
  
    return Array.from({ length: count }, (_, i) => {
      const type = types[Math.floor(Math.random() * types.length)];
      const isIncome = type === 'income';
      
      // Create date within the last 30 days
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 30));
      
      return {
        id: `tr-${i}`,
        date: date.toISOString().split('T')[0],
        description: isIncome 
          ? `${incomeCategories[Math.floor(Math.random() * incomeCategories.length)]}` 
          : `${expenseCategories[Math.floor(Math.random() * expenseCategories.length)]}`,
        category: isIncome 
          ? incomeCategories[Math.floor(Math.random() * incomeCategories.length)]
          : expenseCategories[Math.floor(Math.random() * expenseCategories.length)],
        amount: Math.round(Math.random() * (isIncome ? 5000 : 1000) * 100) / 100,
        type,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        client: isIncome ? clients[Math.floor(Math.random() * clients.length)] : undefined,
      };
    });
  };
  
  // Generate monthly data for the past 12 months
  const generateMonthlyData = (): MonthlyFinancials[] => {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    
    // Get current month index
    const currentMonthIndex = new Date().getMonth();
    
    // Create data for the past 12 months
    return Array.from({ length: 12 }, (_, i) => {
      // Calculate the month index, wrapping around for previous year if needed
      const monthIndex = (currentMonthIndex - 11 + i + 12) % 12;
      
      // Generate some random but consistent data
      const baseIncome = 10000 + Math.sin(i * 0.5) * 2000;
      const income = Math.round(baseIncome * (1 + Math.random() * 0.2));
      const expenses = Math.round(income * (0.5 + Math.random() * 0.2));
      const profit = income - expenses;
      
      return {
        month: months[monthIndex],
        income,
        expenses,
        profit,
      };
    });
  };
  
  // Generate expense breakdown by category
  const generateExpenseBreakdown = (): CategoryBreakdown[] => {
    const categories = [
      { name: 'Software', base: 25 },
      { name: 'Marketing', base: 20 },
      { name: 'Office', base: 15 },
      { name: 'Travel', base: 10 },
      { name: 'Utilities', base: 8 },
      { name: 'Other', base: 22 },
    ];
    
    // Calculate random but sensible percentages
    let remaining = 100;
    const result: CategoryBreakdown[] = [];
    
    categories.forEach((category, index) => {
      // Last category gets whatever is left
      if (index === categories.length - 1) {
        result.push({
          category: category.name,
          percentage: remaining,
          amount: Math.round((remaining / 100) * 5000),
        });
        return;
      }
      
      // Calculate a random percentage based on the base value
      const variance = category.base * 0.3; // 30% variance
      const percentage = Math.round(
        Math.max(1, Math.min(remaining - 1, category.base + (Math.random() * variance * 2 - variance)))
      );
      
      result.push({
        category: category.name,
        percentage,
        amount: Math.round((percentage / 100) * 5000),
      });
      
      remaining -= percentage;
    });
    
    return result;
  };
  
  // Calculate financial summaries
  const calculateFinancialSummary = (transactions: Transaction[]) => {
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
      
    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
      
    const netIncome = totalIncome - totalExpenses;
    
    // Calculate month-over-month changes (mock data)
    const incomeChange = (Math.random() * 10 - 3).toFixed(1);
    const expenseChange = (Math.random() * 6 - 3).toFixed(1);
    const netChange = (Math.random() * 15 - 3).toFixed(1);
    
    return {
      totalIncome,
      totalExpenses,
      netIncome,
      incomeChange: parseFloat(incomeChange),
      expenseChange: parseFloat(expenseChange),
      netChange: parseFloat(netChange),
    };
  };
  
  // Mock cash flow projections
  const generateCashFlowProjections = (): MonthlyFinancials[] => {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'
    ];
    
    // Get current month index
    const currentMonthIndex = new Date().getMonth();
    
    // Create projections for the next 6 months
    return Array.from({ length: 6 }, (_, i) => {
      // Calculate the month index
      const monthIndex = (currentMonthIndex + i) % 12;
      
      // Base values with some growth trend
      const baseIncome = 12000 * (1 + i * 0.03); // 3% growth per month
      const income = Math.round(baseIncome * (1 + Math.random() * 0.1 - 0.05)); // ±5% variance
      const expenses = Math.round(baseIncome * (0.6 + Math.random() * 0.1 - 0.05)); // 60% of income ±5%
      const profit = income - expenses;
      
      return {
        month: months[monthIndex],
        income,
        expenses,
        profit,
      };
    });
  };
  
  // Export mock data and services
  export const mockDataService = {
    getRecentTransactions: () => generateTransactions(10),
    getAllTransactions: () => generateTransactions(50),
    getMonthlyFinancials: () => generateMonthlyData(),
    getExpenseBreakdown: () => generateExpenseBreakdown(),
    getFinancialSummary: () => {
      const transactions = generateTransactions(100);
      return calculateFinancialSummary(transactions);
    },
    getCashFlowProjections: () => generateCashFlowProjections(),
  };