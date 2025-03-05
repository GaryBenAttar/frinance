import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  Button,
  Input,
  Select,
} from '../../../components/ui';
import { ArrowLeft, Save, Plus, Trash } from 'lucide-react';
import { mockClientService, Client } from '../../../services/mockClientService';

// Initial empty client template
const emptyClient: Partial<Client> = {
  name: '',
  companyName: '',
  email: '',
  phone: '',
  address: {
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  },
  website: '',
  industry: '',
  notes: '',
  status: 'active',
  contacts: [],
  paymentTerms: 'Net 30',
  tags: [],
};

const ClientForm = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const navigate = useNavigate();
  const isEditMode = clientId !== 'new';
  
  const [client, setClient] = useState<Partial<Client>>(emptyClient);
  const [availableTags] = useState(['VIP', 'Recurring', 'Referral', 'Potential Growth', 'Enterprise', 'Startup', 'International']);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load client data if in edit mode
  useEffect(() => {
    if (isEditMode && clientId) {
      const clientData = mockClientService.getClientById(clientId);
      if (clientData) {
        setClient(clientData);
      } else {
        navigate('/clients');
      }
    }
  }, [clientId, isEditMode, navigate]);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Handle nested fields (address)
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setClient(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof Client],
          [child]: value,
        }
      }));
    } else {
      setClient(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle tag toggling
  const handleTagToggle = (tag: string) => {
    setClient(prev => {
      const currentTags = prev.tags || [];
      if (currentTags.includes(tag)) {
        return { ...prev, tags: currentTags.filter(t => t !== tag) };
      } else {
        return { ...prev, tags: [...currentTags, tag] };
      }
    });
  };

  // Add new contact
  const addContact = () => {
    setClient(prev => ({
      ...prev,
      contacts: [
        ...(prev.contacts || []),
        {
          id: `temp-${Date.now()}`,
          name: '',
          role: '',
          email: '',
          phone: '',
        }
      ]
    }));
  };

  // Update contact
  const updateContact = (index: number, field: string, value: string) => {
    setClient(prev => {
      const contacts = [...(prev.contacts || [])];
      contacts[index] = { ...contacts[index], [field]: value };
      return { ...prev, contacts };
    });
  };

  // Remove contact
  const removeContact = (index: number) => {
    setClient(prev => {
      const contacts = [...(prev.contacts || [])];
      contacts.splice(index, 1);
      return { ...prev, contacts };
    });
  };

  // Validate the form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!client.name?.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!client.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(client.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Validate contacts if any
    if (client.contacts?.length) {
      client.contacts.forEach((contact, index) => {
        if (!contact.name?.trim()) {
          newErrors[`contact.${index}.name`] = 'Contact name is required';
        }
        if (!contact.email?.trim()) {
          newErrors[`contact.${index}.email`] = 'Contact email is required';
        } else if (!/\S+@\S+\.\S+/.test(contact.email)) {
          newErrors[`contact.${index}.email`] = 'Contact email is invalid';
        }
      });
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, this would submit to an API
      // For now, just navigate back to the client list
      navigate('/clients');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate(isEditMode ? `/clients/${clientId}` : '/clients')}
            className="mr-2"
          >
            <ArrowLeft size={16} />
          </Button>
          <h1 className="text-2xl font-semibold text-gray-800">
            {isEditMode ? 'Edit Client' : 'New Client'}
          </h1>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={() => navigate(isEditMode ? `/clients/${clientId}` : '/clients')}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            leftIcon={<Save size={16} />}
            onClick={handleSubmit}
          >
            {isEditMode ? 'Update Client' : 'Create Client'}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information Card */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input 
                label="Name" 
                name="name"
                value={client.name || ''}
                onChange={handleChange}
                error={errors.name}
                required
              />
              <Input 
                label="Company Name" 
                name="companyName"
                value={client.companyName || ''}
                onChange={handleChange}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input 
                label="Email" 
                name="email"
                type="email"
                value={client.email || ''}
                onChange={handleChange}
                error={errors.email}
                required
              />
              <Input 
                label="Phone" 
                name="phone"
                value={client.phone || ''}
                onChange={handleChange}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input 
                label="Website" 
                name="website"
                value={client.website || ''}
                onChange={handleChange}
                placeholder="https://example.com"
              />
              <Input 
                label="Industry" 
                name="industry"
                value={client.industry || ''}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <Select
                label="Status"
                name="status"
                value={client.status || 'active'}
                onChange={handleChange}
                options={[
                  { value: 'active', label: 'Active' },
                  { value: 'inactive', label: 'Inactive' },
                  { value: 'prospect', label: 'Prospect' }
                ]}
              />
            </div>
            
            <div>
              <Select
                label="Payment Terms"
                name="paymentTerms"
                value={client.paymentTerms || 'Net 30'}
                onChange={handleChange}
                options={[
                  { value: 'Net 15', label: 'Net 15' },
                  { value: 'Net 30', label: 'Net 30' },
                  { value: 'Net 45', label: 'Net 45' },
                  { value: 'Net 60', label: 'Net 60' }
                ]}
              />
            </div>
          </CardContent>
        </Card>

        {/* Address Card */}
        <Card>
          <CardHeader>
            <CardTitle>Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Input 
              label="Street Address" 
              name="address.street"
              value={client.address?.street || ''}
              onChange={handleChange}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input 
                label="City" 
                name="address.city"
                value={client.address?.city || ''}
                onChange={handleChange}
              />
              <Input 
                label="State/Province" 
                name="address.state"
                value={client.address?.state || ''}
                onChange={handleChange}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input 
                label="Postal/Zip Code" 
                name="address.zip"
                value={client.address?.zip || ''}
                onChange={handleChange}
              />
              <Input 
                label="Country" 
                name="address.country"
                value={client.address?.country || ''}
                onChange={handleChange}
              />
            </div>
          </CardContent>
        </Card>

        {/* Contacts Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Contacts</CardTitle>
            <Button 
              type="button"
              variant="outline" 
              size="sm"
              leftIcon={<Plus size={16} />}
              onClick={addContact}
            >
              Add Contact
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {client.contacts && client.contacts.length > 0 ? (
              client.contacts.map((contact, index) => (
                <div key={contact.id || index} className="p-4 border border-gray-200 rounded-md">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Contact {index + 1}</h3>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeContact(index)}
                    >
                      <Trash size={16} className="text-danger-600" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Name"
                      value={contact.name || ''}
                      onChange={(e) => updateContact(index, 'name', e.target.value)}
                      error={errors[`contact.${index}.name`]}
                    />
                    <Input
                      label="Role"
                      value={contact.role || ''}
                      onChange={(e) => updateContact(index, 'role', e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <Input
                      label="Email"
                      type="email"
                      value={contact.email || ''}
                      onChange={(e) => updateContact(index, 'email', e.target.value)}
                      error={errors[`contact.${index}.email`]}
                    />
                    <Input
                      label="Phone"
                      value={contact.phone || ''}
                      onChange={(e) => updateContact(index, 'phone', e.target.value)}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500">No contacts added yet.</p>
                <Button 
                  type="button"
                  variant="outline" 
                  className="mt-2"
                  onClick={addContact}
                >
                  Add Contact
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tags Card */}
        <Card>
          <CardHeader>
            <CardTitle>Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {availableTags.map(tag => (
                <button
                  key={tag}
                  type="button"
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    client.tags?.includes(tag)
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => handleTagToggle(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notes Card */}
        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              name="notes"
              value={client.notes || ''}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              placeholder="Add any additional notes about this client..."
            />
          </CardContent>
        </Card>

        {/* Form Buttons */}
        <div className="flex justify-end space-x-2">
          <Button 
            variant="outline" 
            onClick={() => navigate(isEditMode ? `/clients/${clientId}` : '/clients')}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            leftIcon={<Save size={16} />}
          >
            {isEditMode ? 'Update Client' : 'Create Client'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ClientForm;