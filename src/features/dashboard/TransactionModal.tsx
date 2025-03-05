import React from 'react'
import { Button, Checkbox, Input, Modal, Select } from '../../components/ui'

interface TransactionModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TransactionModal: React.FC<TransactionModalProps> = ({isModalOpen, setIsModalOpen}) => {
  return (
    <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Transaction"
        description="Enter the details of your transaction below."
      >
        <div className="space-y-4">
          <Input label="Transaction Name" placeholder="e.g., Client Payment" />
          <Input label="Amount" placeholder="0.00" type="number" />
          <Select 
            label="Type"
            options={[
              { value: '', label: 'Select a type', disabled: true },
              { value: 'income', label: 'Income' },
              { value: 'expense', label: 'Expense' }
            ]}
          />
          <Select 
            label="Category"
            options={[
              { value: '', label: 'Select a category', disabled: true },
              { value: 'client_payment', label: 'Client Payment' },
              { value: 'consulting', label: 'Consulting' },
              { value: 'contract_work', label: 'Contract Work' },
              { value: 'software', label: 'Software' },
              { value: 'office_supplies', label: 'Office Supplies' },
              { value: 'utilities', label: 'Utilities' },
            ]}
          />
          <Input label="Date" type="date" />
          <Checkbox 
            label="Mark as recurring" 
            description="This will mark the transaction as recurring monthly."
          />
          <div className="flex justify-end space-x-2 pt-4">
            <Button 
              variant="outline" 
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button>
              Add Transaction
            </Button>
          </div>
        </div>
      </Modal>
  )
}

export default TransactionModal