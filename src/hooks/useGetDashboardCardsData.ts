import React, { useState } from "react";

import { IncomeExpensesChart } from '../components/charts/IncomeExpensesChart';
import { MonthlyProfitChart } from '../components/charts/MonthlyProfitChart';
import { ExpenseBreakdownChart } from '../components/charts/ExpenseBreakdownChart';
import { CashFlowProjectionChart } from '../components/charts/CashFlowProjectionChart';
import TransactionTable from "../components/transactions/TransactionTable";
import { FinancialSummary } from "../types/transaction";
import { mockDataService } from "../services/mockDataService";

export const useGetDashboardCardsData = () => {
    const [financialSummary, setFinancialSummary] = useState<FinancialSummary>(mockDataService.getFinancialSummary());

    const [cardsList, setCardList] = useState([{
      _id: '1',
      title: 'Income vs Expenses',
      description: 'Monthly financial overview for the past year',
      content: React.createElement(IncomeExpensesChart, { data: mockDataService.getMonthlyFinancials() })
    }, {
      _id: '2',
      title: 'Monthly Profit',
      description: 'Net income over the past year',
      content: React.createElement(MonthlyProfitChart, { data: mockDataService.getMonthlyFinancials() })
    }, {
      _id: '3',
      title: 'Expense Breakdown',
      description: 'Distribution of expenses by category',
      content: React.createElement(ExpenseBreakdownChart, { data: mockDataService.getExpenseBreakdown() })},
    {
      _id: '4',
      title: 'Cash Flow Projections',
      description: 'Estimated financial performance for the next 6 months',
      content: React.createElement(CashFlowProjectionChart, { data: mockDataService.getCashFlowProjections() })
    }, {
      _id: '5',
      title: 'Recent Transactions',
      description: 'Your most recent financial activities',
      content: React.createElement(TransactionTable, { transactions: mockDataService.getRecentTransactions(), showClient: true })
    }])

  return { cardsList, setCardList, financialSummary, setFinancialSummary };
}