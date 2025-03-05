import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  Button,
  Input,
  Select,
} from '../../../components/ui';
import { 
  Search, 
  Plus, 
  Filter, 
  ArrowUpDown, 
  MoreVertical,
  Mail,
  Phone,
  Briefcase
} from 'lucide-react';
import { Client } from '../../../types/client';
import { useGetClientsList } from '../../../hooks/useGetClientsList';

const ClientList = () => {
  // Component state and functions remain the same, but use real data
  const navigate = useNavigate();
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [clientStats, setClientStats] = useState({
    totalClients: 0,
    activeClients: 0,
    totalRevenue: 0,
    outstandingBalance: 0
  });
  const { clients, isLoading } = useGetClientsList(setClientStats, setFilteredClients);

 

  // Handle search and filtering
  useEffect(() => {
    let result = [...clients];
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        client => 
          client.name.toLowerCase().includes(query) ||
          (client.companyName && client.companyName.toLowerCase().includes(query)) ||
          client.email.toLowerCase().includes(query)
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(client => client.status === statusFilter);
    }
    
    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'company':
          const companyA = a.companyName || '';
          const companyB = b.companyName || '';
          comparison = companyA.localeCompare(companyB);
          break;
        case 'revenue':
          comparison = a.totalRevenue - b.totalRevenue;
          break;
        case 'outstanding':
          comparison = a.outstandingBalance - b.outstandingBalance;
          break;
        case 'dateAdded':
          comparison = new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime();
          break;
        default:
          comparison = a.name.localeCompare(b.name);
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    
    setFilteredClients(result);
  }, [clients, searchQuery, statusFilter, sortField, sortDirection]);

  // Handle sorting
  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Handle client selection
  const handleSelectClient = (clientId: string) => {
    navigate(`/clients/${clientId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Clients</h1>
          <p className="text-gray-500 mt-1">Manage your client relationships</p>
        </div>
        <Button 
          onClick={() => navigate('/clients/new')}
          leftIcon={<Plus size={16} />}
        >
          Add Client
        </Button>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <Input 
          placeholder="Search clients..."
          className="md:max-w-xs"
          leftIcon={<Search size={16} className="text-gray-400" />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex gap-2">
          <Select 
            options={[
              { value: 'all', label: 'All Statuses' },
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
              { value: 'prospect', label: 'Prospect' }
            ]}
            className="w-40"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          />
          <Button 
            variant="outline" 
            leftIcon={<Filter size={16} />}
          >
            More Filters
          </Button>
        </div>
      </div>

      {/* Client Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Clients</p>
                <p className="text-xl font-bold text-gray-900">{clients.length}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-primary-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Clients</p>
                <p className="text-xl font-bold text-gray-900">
                  {clients.filter(c => c.status === 'active').length}
                </p>
              </div>
              <div className="h-10 w-10 rounded-full bg-success-100 flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-success-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <p className="text-xl font-bold text-gray-900">
                  ${clients.reduce((sum, client) => sum + client.totalRevenue, 0).toLocaleString()}
                </p>
              </div>
              <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-primary-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Outstanding</p>
                <p className="text-xl font-bold text-gray-900">
                  ${clients.reduce((sum, client) => sum + client.outstandingBalance, 0).toLocaleString()}
                </p>
              </div>
              <div className="h-10 w-10 rounded-full bg-warning-100 flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-warning-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Client list */}
      <Card>
        <CardHeader>
          <CardTitle>Client List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th 
                    className="px-4 py-3 text-left font-medium text-gray-500 cursor-pointer"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center">
                      Name
                      {sortField === 'name' && (
                        <ArrowUpDown size={14} className="ml-1" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-4 py-3 text-left font-medium text-gray-500 cursor-pointer"
                    onClick={() => handleSort('company')}
                  >
                    <div className="flex items-center">
                      Company
                      {sortField === 'company' && (
                        <ArrowUpDown size={14} className="ml-1" />
                      )}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Contact</th>
                  <th 
                    className="px-4 py-3 text-left font-medium text-gray-500 cursor-pointer"
                    onClick={() => handleSort('revenue')}
                  >
                    <div className="flex items-center">
                      Revenue
                      {sortField === 'revenue' && (
                        <ArrowUpDown size={14} className="ml-1" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-4 py-3 text-left font-medium text-gray-500 cursor-pointer"
                    onClick={() => handleSort('outstanding')}
                  >
                    <div className="flex items-center">
                      Outstanding
                      {sortField === 'outstanding' && (
                        <ArrowUpDown size={14} className="ml-1" />
                      )}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Status</th>
                  <th className="px-4 py-3 text-right font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map(client => (
                  <tr 
                    key={client.id} 
                    className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleSelectClient(client.id)}
                  >
                    <td className="px-4 py-4 font-medium text-gray-900">{client.name}</td>
                    <td className="px-4 py-4 text-gray-700">{client.companyName || '-'}</td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <Mail size={14} className="text-gray-400 mr-1" />
                          <span className="text-gray-700">{client.email}</span>
                        </div>
                        {client.phone && (
                          <div className="flex items-center mt-1">
                            <Phone size={14} className="text-gray-400 mr-1" />
                            <span className="text-gray-700">{client.phone}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-gray-700">${client.totalRevenue.toLocaleString()}</td>
                    <td className="px-4 py-4 text-gray-700">${client.outstandingBalance.toLocaleString()}</td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          client.status === 'active'
                            ? 'bg-success-100 text-success-800'
                            : client.status === 'inactive'
                            ? 'bg-gray-100 text-gray-800'
                            : 'bg-warning-100 text-warning-800'
                        }`}
                      >
                        {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Add action menu logic here
                        }}
                      >
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
                
                {filteredClients.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                      No clients found. Try adjusting your search or filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientList;