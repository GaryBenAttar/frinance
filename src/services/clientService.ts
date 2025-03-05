import api from './api';
import { Client } from '../types/client';

export const clientService = {
  getAllClients: async () => {
    const response = await api.get('/clients');
    return response.data.data;
  },
  
  getClientById: async (id: string) => {
    const response = await api.get(`/clients/${id}`);
    return response.data.data;
  },
  
  createClient: async (client: Omit<Client, '_id' | 'createdAt' | 'updatedAt'>) => {
    const response = await api.post('/clients', client);
    return response.data.data;
  },
  
  updateClient: async (id: string, client: Partial<Client>) => {
    const response = await api.put(`/clients/${id}`, client);
    return response.data.data;
  },
  
  deleteClient: async (id: string) => {
    const response = await api.delete(`/clients/${id}`);
    return response.data;
  },
  
  searchClients: async (query: string) => {
    const response = await api.get(`/clients/search?query=${query}`);
    return response.data.data;
  },
  
  filterClientsByStatus: async (status: 'active' | 'inactive' | 'prospect') => {
    const response = await api.get(`/clients/filter?status=${status}`);
    return response.data.data;
  }
};