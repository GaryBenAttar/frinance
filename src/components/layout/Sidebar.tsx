import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Users, 
  FileText, 
  DollarSign, 
  PieChart, 
  MessageSquare, 
  Settings, 
  X, 
  User
} from 'lucide-react';

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const navItems = [
  { name: 'Dashboard', icon: Home, path: '/' },
  { name: 'Clients', icon: Users, path: '/clients' },
  { name: 'Invoices', icon: FileText, path: '/invoices' },
  { name: 'Expenses', icon: DollarSign, path: '/expenses' },
  { name: 'Insights', icon: PieChart, path: '/insights' },
  { name: 'Chatbot', icon: MessageSquare, path: '/chatbot' },
  { name: 'Settings', icon: Settings, path: '/settings' },
];

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={`
          fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform 
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:z-auto
        `}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar header */}
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <span className="text-xl font-semibold text-gray-800">Freenance</span>
            <button 
              onClick={onClose}
              className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none md:hidden"
            >
              <X size={24} />
            </button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors 
                  ${isActive
                    ? 'bg-indigo-50 text-indigo-600' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`
                }
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </NavLink>
            ))}
          </nav>
          
          {/* User info */}
          <div className="p-4 border-t">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                <User size={16} />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">John Doe</p>
                <p className="text-xs text-gray-500">john@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;