import React from 'react'
import { Button } from '../../../components/ui'
import {  ArrowLeft, Edit, FileText, Tag } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Client } from '../../../types/client'

interface ClientDetailHeaderProps {
    client:Client
    statusIcon:React.ReactNode
}



const ClientDetailHeader:React.FC<ClientDetailHeaderProps> = ({client, statusIcon}) => {
    const navigate = useNavigate();

  return (
    <>
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/clients')}
          className="mr-2"
          >
          <ArrowLeft size={16} />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">{client.name}</h1>
          {client.companyName && (
              <p className="text-gray-500">{client.companyName}</p>
            )}
        </div>
      </div>
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          leftIcon={<Edit size={16} />}
          onClick={() => navigate(`/clients/edit/${client._id}`)}
          >
          Edit
        </Button>
        <Button 
          variant="default"
          leftIcon={<FileText size={16} />}
          >
          New Invoice
        </Button>
      </div>
    </div>
    <div className="flex flex-wrap gap-2 items-center">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            client.status === 'active'
              ? 'bg-success-100 text-success-800'
              : client.status === 'inactive'
              ? 'bg-gray-100 text-gray-800'
              : 'bg-warning-100 text-warning-800'
          }`}
        >
          {statusIcon}
          <span className="ml-1">{client.status.charAt(0).toUpperCase() + client.status.slice(1)}</span>
        </span>
        
        {client.tags && client.tags.map(tag => (
          <span
            key={tag}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
          >
            <Tag size={14} className="mr-1" />
            {tag}
          </span>
        ))}
      </div>
    </>
  )
}

export default ClientDetailHeader