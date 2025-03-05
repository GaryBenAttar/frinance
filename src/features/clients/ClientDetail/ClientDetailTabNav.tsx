import React from 'react'

interface ClientDetailTabNavProps {
    activeTab: string;
    setActiveTab: React.Dispatch<React.SetStateAction<string>>
}

const ClientDetailTabNav: React.FC<ClientDetailTabNavProps> = ({activeTab, setActiveTab}) => {
  
  
  return (
    <>
    <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
            <button
                className={`pb-4 px-1 ${
                    activeTab === 'overview'
                    ? 'border-b-2 border-primary-600 text-primary-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } font-medium text-sm`}
                onClick={() => setActiveTab('overview')}
                >
                Overview
            </button>
            <button
                className={`pb-4 px-1 ${
                    activeTab === 'projects'
                    ? 'border-b-2 border-primary-600 text-primary-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } font-medium text-sm`}
                onClick={() => setActiveTab('projects')}
                >
                Projects
            </button>
            <button
                className={`pb-4 px-1 ${
                    activeTab === 'invoices'
                    ? 'border-b-2 border-primary-600 text-primary-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } font-medium text-sm`}
                onClick={() => setActiveTab('invoices')}
                >
                Invoices
            </button>
            <button
                className={`pb-4 px-1 ${
                    activeTab === 'notes'
                    ? 'border-b-2 border-primary-600 text-primary-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } font-medium text-sm`}
                onClick={() => setActiveTab('notes')}
                >
                Notes
            </button>
        </nav>
    </div>
    </>

  )
}

export default ClientDetailTabNav