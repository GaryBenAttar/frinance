import { Menu, Bell, User } from 'lucide-react';

type HeaderProps = {
  onMenuButtonClick: () => void;
};

const Header = ({ onMenuButtonClick }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={onMenuButtonClick}
            className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none md:hidden"
          >
            <Menu size={24} />
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-full text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none">
            <Bell size={20} />
          </button>
          <button className="p-2 rounded-full text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none">
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;