import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  CardDescription,
  Button,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Modal
} from '../../../components/ui';
import { 
  ArrowLeft, 
  Edit, 
  Phone, 
  Mail, 
  Globe, 
  MapPin, 
  Calendar,
  MoreHorizontal,
  Tag,
  FileText,
  Briefcase,
  Clock,
  DollarSign,
  CheckCircle,
  AlertCircle,
  PauseCircle,
  Plus
} from 'lucide-react';
import { format } from 'date-fns';
import { useGetClientHook } from '../../../hooks/useGetClientHook';
import ClientDetailHeader from './ClientDetailHeader';
import ClientDetailTabNav from './ClientDetailTabNav';

const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-5 w-5 text-success-600" />;
      case 'inactive':
        return <AlertCircle className="h-5 w-5 text-gray-400" />;
      case 'prospect':
        return <Clock className="h-5 w-5 text-warning-600" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-success-600" />;
      case 'on-hold':
        return <PauseCircle className="h-5 w-5 text-warning-600" />;
      default:
        return null;
    }
  };

const ClientDetail = () => {
  const {client} = useGetClientHook();
  const navigate = useNavigate();
  
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  

  if (!client) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading client details...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ClientDetailHeader client={client} statusIcon={getStatusIcon(client.status)}/>

      <ClientDetailTabNav activeTab={activeTab} setActiveTab={setActiveTab}/>

      {/* Tab content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <>
            {/* Client information section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Contact information */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a href={`mailto:${client.email}`} className="text-primary-600 hover:underline">
                        {client.email}
                      </a>
                    </div>
                  </div>
                  
                  {client.phone && (
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <a href={`tel:${client.phone}`} className="text-gray-700">
                          {client.phone}
                        </a>
                      </div>
                    </div>
                  )}
                  
                  {client.website && (
                    <div className="flex items-start">
                      <Globe className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                      <div>
                        <p className="font-medium">Website</p>
                        <a 
                          href={client.website.startsWith('http') ? client.website : `https://${client.website}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:underline"
                        >
                          {client.website}
                        </a>
                      </div>
                    </div>
                  )}
                  
                  {client.address && (Object.values(client.address).some(val => val)) && (
                    <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-gray-700">
                        {client.address.street && <span>{client.address.street}<br /></span>}
                        {client.address.city && <span>{client.address.city}, </span>}
                        {client.address.state && <span>{client.address.state} </span>}
                        {client.address.zip && <span>{client.address.zip}<br /></span>}
                        {client.address.country && <span>{client.address.country}</span>}
                      </p>
                    </div>
                  </div>
                )}
                
                {client.createdAt && (
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium">Client Since</p>
                      <p className="text-gray-700">
                        {format(new Date(client.createdAt), 'MMMM d, yyyy')}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Financial summary */}
            <Card>
              <CardHeader>
                <CardTitle>Financial Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <DollarSign className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">Total Revenue</p>
                    <p className="text-lg font-semibold text-gray-900">
                      ${client.totalRevenue.toLocaleString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <DollarSign className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">Outstanding Balance</p>
                    <p className="text-lg font-semibold text-gray-900">
                      ${client.outstandingBalance.toLocaleString()}
                    </p>
                  </div>
                </div>
                
                {client.paymentTerms && (
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium">Payment Terms</p>
                      <p className="text-gray-700">{client.paymentTerms}</p>
                    </div>
                  </div>
                )}
                
                {client.industry && (
                  <div className="flex items-start">
                    <Briefcase className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium">Industry</p>
                      <p className="text-gray-700">{client.industry}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Contacts */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Contacts</CardTitle>
                <Button variant="ghost" size="sm">
                  <Plus size={16} />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {client.contacts && client.contacts.length > 0 ? (
                  client.contacts.map((contact) => (
                    <div key={contact._id} className="pb-4 border-b border-gray-100 last:border-0">
                      <div className="flex justify-between">
                        <p className="font-medium">{contact.name}</p>
                        <button className="text-gray-400 hover:text-gray-500">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                      <p className="text-sm text-gray-500">{contact.role}</p>
                      <div className="mt-2 flex items-center text-sm">
                        <Mail className="h-4 w-4 text-gray-400 mr-1" />
                        <a href={`mailto:${contact.email}`} className="text-primary-600 hover:underline">
                          {contact.email}
                        </a>
                      </div>
                      {contact.phone && (
                        <div className="mt-1 flex items-center text-sm">
                          <Phone className="h-4 w-4 text-gray-400 mr-1" />
                          <a href={`tel:${contact.phone}`} className="text-gray-700">
                            {contact.phone}
                          </a>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No contacts added yet.</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Notes section if present */}
          {client.notes && (
            <Card>
              <CardHeader>
                <CardTitle>Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{client.notes}</p>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {activeTab === 'projects' && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Projects</CardTitle>
              <CardDescription>All projects for this client</CardDescription>
            </div>
            <Button leftIcon={<Plus size={16} />}>
              Add Project
            </Button>
          </CardHeader>
          <CardContent>
            {client.projects && client.projects.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {client.projects.map((project) => (
                    <TableRow key={project._id}>
                      <TableCell className="font-medium">{project.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {getStatusIcon(project.status)}
                          <span className="ml-1 capitalize">{project.status}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {format(new Date(project.startDate), 'MMM d, yyyy')}
                      </TableCell>
                      <TableCell>
                        {project.endDate 
                          ? format(new Date(project.endDate), 'MMM d, yyyy')
                          : '—'
                        }
                      </TableCell>
                      <TableCell className="text-right">
                        ${project.value.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500">No projects found for this client.</p>
                <Button 
                  variant="outline" 
                  className="mt-2"
                  leftIcon={<Plus size={16} />}
                >
                  Create Project
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {activeTab === 'invoices' && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Invoices</CardTitle>
              <CardDescription>All invoices for this client</CardDescription>
            </div>
            <Button leftIcon={<Plus size={16} />}>
              Create Invoice
            </Button>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6">
              <p className="text-gray-500">Invoice management will be implemented in the next phase.</p>
              <Button 
                variant="outline" 
                className="mt-2"
                leftIcon={<Plus size={16} />}
              >
                Create Invoice
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'notes' && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Notes & Activity</CardTitle>
              <CardDescription>Keep track of important client information</CardDescription>
            </div>
            <Button variant="outline">Add Note</Button>
          </CardHeader>
          <CardContent>
            {client.notes ? (
              <div className="p-4 bg-gray-50 rounded-md">
                <h3 className="font-medium text-gray-900 mb-2">Client Notes</h3>
                <p className="text-gray-700">{client.notes}</p>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500">No notes found for this client.</p>
                <Button 
                  variant="outline" 
                  className="mt-2"
                >
                  Add Note
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>

    {/* Delete confirmation modal */}
    <Modal
      isOpen={isDeleteModalOpen}
      onClose={() => setIsDeleteModalOpen(false)}
      title="Delete Client"
      description="Are you sure you want to delete this client? This action cannot be undone."
    >
      <div className="mt-4 flex justify-end space-x-2">
        <Button 
          variant="outline" 
          onClick={() => setIsDeleteModalOpen(false)}
        >
          Cancel
        </Button>
        <Button 
          variant="destructive"
          onClick={() => {
            // Delete logic would go here
            setIsDeleteModalOpen(false);
            navigate('/clients');
          }}
        >
          Delete
        </Button>
      </div>
    </Modal>
  </div>
);
};

export default ClientDetail;