export interface ClientContact {
    _id?: string;
    name: string;
    role: string;
    email: string;
    phone?: string;
  }
  
  export interface ClientAddress {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  }
  
  export interface Client {
    _id: string;
    name: string;
    companyName?: string;
    email: string;
    phone?: string;
    address?: ClientAddress;
    website?: string;
    industry?: string;
    notes?: string;
    status: 'active' | 'inactive' | 'prospect';
    contacts?: ClientContact[];
    paymentTerms?: string;
    tags?: string[];
    totalRevenue: number;
    outstandingBalance: number;
    projects?: Project[];
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Project {
    _id: string;
    name: string;
    description?: string;
    client: string; // Reference to client
    status: 'active' | 'completed' | 'on-hold';
    startDate: string;
    endDate?: string;
    value: number;
    hourlyRate?: number;
    estimatedHours?: number;
    createdAt: string;
    updatedAt: string;
  }