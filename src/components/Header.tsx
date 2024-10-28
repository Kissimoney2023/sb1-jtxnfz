import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  ChefHat, 
  Settings, 
  LogIn, 
  LogOut, 
  Menu, 
  X, 
  Home,
  Users,
  Info,
  Mail
} from 'lucide-react';
import { useRecipeStore } from '../store/recipeStore';
import { useAuthStore } from '../store/authStore';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentRecipe, reset, isAdminMode, toggleAdminMode } = useRecipeStore();
  const { user, signOut } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate('/');
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/community', label: 'Community', icon: Users },
    { path: '/about', label: 'About', icon: Info },
    { path: '/contact', label: 'Contact', icon: Mail },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link 
            to="/"
            onClick={reset}
            className="flex items-center gap-2 text-gray-800 hover:text-blue-600 transition-colors"
          >
            <ChefHat className="w-7 h-7" />
            <span className="text-xl font-bold">Guided Cooking</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.path) 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            {currentRecipe && (
              <div className="hidden lg:block">
                <span className="text-sm text-gray-500">Currently cooking:</span>
                <span className="ml-2 text-sm font-medium text-gray-900">
                  {currentRecipe.name}
                </span>
              </div>
            )}
            
            {user ? (
              <div className="hidden md:flex items-center gap-4">
                <div className="text-sm font-medium text-gray-700">
                  {user.email}
                </div>
                {user.isAdmin && (
                  <button
                    onClick={toggleAdminMode}
                    className={`p-2 rounded-lg transition-colors ${
                      isAdminMode 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                    title="Admin Mode"
                  >
                    <Settings className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="py-2 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium ${
                    isActive(item.path)
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              ))}
              
              {user ? (
                <>
                  <div className="px-4 py-2 text-sm text-gray-500">
                    Signed in as <span className="font-medium">{user.email}</span>
                  </div>
                  {user.isAdmin && (
                    <button
                      onClick={() => {
                        toggleAdminMode();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                    >
                      <Settings className="w-4 h-4" />
                      {isAdminMode ? 'Disable Admin Mode' : 'Enable Admin Mode'}
                    </button>
                  )}
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}