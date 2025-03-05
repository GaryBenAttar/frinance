import React from 'react'
import { Button } from '../../components/ui'
import { Calendar, Plus } from 'lucide-react';

interface DashboardHeaderProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({setIsModalOpen}) => {
  return (
    <div className="flex justify-between items-center">
        <div>
            <h1 className="text-2xl font-semibold text-gray-800">Financial Dashboard</h1>
            <p className="text-gray-500 mt-1">Overview of your financial situation</p>
        </div>
        <div className="flex space-x-2">
            <Button 
                variant="outline"
                leftIcon={<Calendar size={16} />}
            >
                This Month
            </Button>
            <Button 
                onClick={() => setIsModalOpen(true)}
                leftIcon={<Plus size={16} />}
                >
                Add Transaction
            </Button>
        </div>
    </div>
  )
}

export default DashboardHeader