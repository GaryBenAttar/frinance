// Types for client data
export interface ClientContact {
    id: string;
    name: string;
    role: string;
    email: string;
    phone?: string;
  }
  
  export interface ClientProject {
    id: string;
    name: string;
    status: 'active' | 'completed' | 'on-hold';
    startDate: string;
    endDate?: string;
    value: number;
  }
  
  export interface Client {
    id: string;
    name: string;
    companyName?: string;
    email: string;
    phone?: string;
    address?: {
      street?: string;
      city?: string;
      state?: string;
      zip?: string;
      country?: string;
    };
    website?: string;
    industry?: string;
    notes?: string;
    status: 'active' | 'inactive' | 'prospect';
    dateAdded: string;
    contacts?: ClientContact[];
    projects?: ClientProject[];
    totalRevenue: number;
    outstandingBalance: number;
    paymentTerms?: string;
    tags?: string[];
  }
  
  // Helper function to generate random dates within a range
  const randomDate = (start: Date, end: Date) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];
  };
  
  // Generate mock clients
  const generateClients = (count: number): Client[] => {
    const industries = ['Technology', 'Healthcare', 'Education', 'Finance', 'Marketing', 'E-commerce', 'Manufacturing', 'Retail'];
    const statuses: ('active' | 'inactive' | 'prospect')[] = ['active', 'inactive', 'prospect'];
    const projectStatuses: ('active' | 'completed' | 'on-hold')[] = ['active', 'completed', 'on-hold'];
    const roles = ['CEO', 'CTO', 'Marketing Director', 'Project Manager', 'Finance Manager', 'HR Director'];
    const tags = ['VIP', 'Recurring', 'Referral', 'Potential Growth', 'Enterprise', 'Startup', 'International'];
    
    // Start and end dates for random generation
    const startDate = new Date(2020, 0, 1);
    const endDate = new Date();
    
    return Array.from({ length: count }, (_, i) => {
      // Create a consistent but random revenue amount
      const baseRevenue = 10000 + Math.floor(Math.random() * 90000);
      const totalRevenue = Math.round(baseRevenue / 100) * 100;
      
      // Outstanding balance is a fraction of the revenue
      const outstandingBalance = Math.round((Math.random() * 0.3) * totalRevenue);
      
      // Randomly select status with weighted probability
      const statusIndex = Math.random() < 0.6 ? 0 : (Math.random() < 0.8 ? 1 : 2);
      const status = statuses[statusIndex];
      
      // Randomly generate 1-3 contacts
      const contactCount = Math.floor(Math.random() * 3) + 1;
      const contacts: ClientContact[] = Array.from({ length: contactCount }, (_, j) => ({
        id: `contact-${i}-${j}`,
        name: `Contact ${j + 1}`,
        role: roles[Math.floor(Math.random() * roles.length)],
        email: `contact${j + 1}@company${i}.com`,
        phone: Math.random() > 0.3 ? `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}` : undefined,
      }));
      
      // Randomly generate 1-4 projects
      const projectCount = Math.floor(Math.random() * 4) + 1;
      const projects: ClientProject[] = Array.from({ length: projectCount }, (_, j) => {
        const projectStartDate = randomDate(startDate, endDate);
        const isCompleted = Math.random() < 0.6;
        
        return {
          id: `project-${i}-${j}`,
          name: `Project ${j + 1}`,
          status: projectStatuses[Math.floor(Math.random() * projectStatuses.length)],
          startDate: projectStartDate,
          endDate: isCompleted ? randomDate(new Date(projectStartDate), endDate) : undefined,
          value: Math.round(Math.random() * 20000) + 5000,
        };
      });
      
      // Randomly select 0-3 tags
      const tagCount = Math.floor(Math.random() * 4);
      const selectedTags: string[] = [];
      for (let j = 0; j < tagCount; j++) {
        const tag = tags[Math.floor(Math.random() * tags.length)];
        if (!selectedTags.includes(tag)) {
          selectedTags.push(tag);
        }
      }
      
      return {
        id: `client-${i}`,
        name: `Client ${i + 1}`,
        companyName: Math.random() > 0.3 ? `Company ${i + 1}` : undefined,
        email: `client${i + 1}@example.com`,
        phone: Math.random() > 0.2 ? `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}` : undefined,
        address: Math.random() > 0.3 ? {
          street: `${Math.floor(Math.random() * 9000) + 1000} Main St`,
          city: `City ${i + 1}`,
          state: `State ${i % 50 + 1}`,
          zip: `${Math.floor(Math.random() * 90000) + 10000}`,
          country: 'United States',
        } : undefined,
        website: Math.random() > 0.4 ? `https://company${i + 1}.com` : undefined,
        industry: Math.random() > 0.2 ? industries[Math.floor(Math.random() * industries.length)] : undefined,
        notes: Math.random() > 0.6 ? `Some notes about client ${i + 1}. This client has specific preferences and requirements.` : undefined,
        status,
        dateAdded: randomDate(startDate, endDate),
        contacts,
        projects,
        totalRevenue,
        outstandingBalance,
        paymentTerms: Math.random() > 0.3 ? ['Net 15', 'Net 30', 'Net 45', 'Net 60'][Math.floor(Math.random() * 4)] : undefined,
        tags: selectedTags,
      };
    });
  };
  
  // Mock client service
  export const mockClientService = {
    getAllClients: () => generateClients(20),
    getClientById: (id: string) => {
      const allClients = generateClients(20);
      return allClients.find(client => client.id === id);
    },
    searchClients: (query: string) => {
      const allClients = generateClients(20);
      const lowerQuery = query.toLowerCase();
      return allClients.filter(client => 
        client.name.toLowerCase().includes(lowerQuery) || 
        (client.companyName && client.companyName.toLowerCase().includes(lowerQuery)) ||
        client.email.toLowerCase().includes(lowerQuery)
      );
    },
    filterClientsByStatus: (status: 'active' | 'inactive' | 'prospect') => {
      const allClients = generateClients(20);
      return allClients.filter(client => client.status === status);
    }
  };