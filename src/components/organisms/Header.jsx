import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { AuthContext } from "@/App";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
const Header = ({ onMobileMenuToggle }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { logout } = useContext(AuthContext);
  const { user } = useSelector((state) => state.user);
  
  const handleSearch = (query) => {
    console.log('Search query:', query);
    // Implement search functionality
  };
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white border-b border-gray-200 px-4 py-3 lg:px-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMobileMenuToggle}
            className="lg:hidden"
          >
            <ApperIcon name="Menu" className="w-5 h-5" />
          </Button>
          
          <div className="hidden sm:block">
            <SearchBar
              placeholder="Search deals, contacts, tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onSearch={handleSearch}
              className="w-96"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button size="sm" variant="ghost" className="relative">
            <ApperIcon name="Bell" className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
          
          <Button size="sm" variant="ghost">
            <ApperIcon name="Settings" className="w-5 h-5" />
          </Button>
<div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <ApperIcon name="User" className="w-4 h-4 text-white" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900">{user?.firstName || 'User'}</p>
            </div>
          </div>
          
<Button size="sm" variant="ghost" onClick={logout}>
            <ApperIcon name="LogOut" className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div className="sm:hidden mt-3">
        <SearchBar
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onSearch={handleSearch}
        />
      </div>
    </motion.header>
  );
};

export default Header;