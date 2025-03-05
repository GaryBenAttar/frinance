import React, { JSX } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui'
import { ArrowDown, ArrowUp, DollarSign } from 'lucide-react'

interface FinancialCardsProps {
    financialSummary: {
        totalIncome: number;
        totalExpenses: number;
        netIncome: number;
        incomeChange: number;
        expenseChange: number;
        netChange: number;
    };
    cardsList: {
        _id: string;
        title: string;
        description: string;
        content: JSX.Element;
    }[];
    }
    
const FinancialCards: React.FC<FinancialCardsProps> = ({financialSummary, cardsList}) => {
  return (
    <>
        {/* Financial summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
        <CardContent className="pt-6">
            <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500">Total Income</p>
                <p className="text-2xl font-bold text-gray-900">
                ${financialSummary.totalIncome.toLocaleString()}
                </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-primary-600" />
            </div>
            </div>
            <div className="mt-2 flex items-center">
            <span className={`text-sm ${
                financialSummary.incomeChange >= 0 ? 'text-success-600' : 'text-danger-600'
            }`}>
                {financialSummary.incomeChange >= 0 ? (
                <ArrowUp className="inline h-3 w-3 mr-1" />
                ) : (
                <ArrowDown className="inline h-3 w-3 mr-1" />
                )}
                {Math.abs(financialSummary.incomeChange)}%
            </span>
            <span className="text-sm text-gray-500 ml-1">from last month</span>
            </div>
        </CardContent>
        </Card>
        
        <Card>
        <CardContent className="pt-6">
            <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500">Total Expenses</p>
                <p className="text-2xl font-bold text-gray-900">
                ${financialSummary.totalExpenses.toLocaleString()}
                </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-danger-100 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-danger-600" />
            </div>
            </div>
            <div className="mt-2 flex items-center">
            <span className={`text-sm ${
                financialSummary.expenseChange <= 0 ? 'text-success-600' : 'text-danger-600'
            }`}>
                {financialSummary.expenseChange <= 0 ? (
                <ArrowDown className="inline h-3 w-3 mr-1" />
                ) : (
                <ArrowUp className="inline h-3 w-3 mr-1" />
                )}
                {Math.abs(financialSummary.expenseChange)}%
            </span>
            <span className="text-sm text-gray-500 ml-1">from last month</span>
            </div>
        </CardContent>
        </Card>
        
        <Card>
        <CardContent className="pt-6">
            <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500">Net Income</p>
                <p className="text-2xl font-bold text-gray-900">
                ${financialSummary.netIncome.toLocaleString()}
                </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-success-100 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-success-600" />
            </div>
            </div>
            <div className="mt-2 flex items-center">
            <span className={`text-sm ${
                financialSummary.netChange >= 0 ? 'text-success-600' : 'text-danger-600'
            }`}>
                {financialSummary.netChange >= 0 ? (
                <ArrowUp className="inline h-3 w-3 mr-1" />
                ) : (
                <ArrowDown className="inline h-3 w-3 mr-1" />
                )}
                {Math.abs(financialSummary.netChange)}%
            </span>
            <span className="text-sm text-gray-500 ml-1">from last month</span>
            </div>
        </CardContent>
        </Card>
    </div>

    {/* Two-column charts */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cardsList.map(card => {
        return (
        <Card key={card.title}>
        <CardHeader>
            <CardTitle>{card.title}</CardTitle>
            <CardDescription>{card.description}</CardDescription>
        </CardHeader>
        <CardContent>
            {card.content}
        </CardContent>
        </Card>
        )})}
    </div>
  </>
  )
}

export default FinancialCards