import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, Menu, X, LogOut, Store, Package, Home } from 'lucide-react';

function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  const user=localStorage.getItem("UserName")
  console.log(user)

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo and Primary Nav */}
          <div className="flex">
            <Link to="/" className="flex items-center">
              <Store className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">MIT Marketplace</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-transparent hover:border-indigo-600"
              >
                <Home className="h-4 w-4 mr-1" />
                Home
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-transparent hover:border-indigo-600"
              >
                <Package className="h-4 w-4 mr-1" />
                Products
              </Link>
              <Link
                to="/orders"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-transparent hover:border-indigo-600"
              >
                <Package className="h-4 w-4 mr-1" />
                Orders
              </Link>
            </div>
          </div>

          {/* Secondary Nav */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            {user ? (
              <>
                <span className="text-sm text-gray-700">Welcome, {user}</span>
                <Link
                  to="/cart"
                  className="p-2 text-gray-700 hover:text-indigo-600 relative"
                >
                  <ShoppingCart className="h-6 w-6" />
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-indigo-600 rounded-full">
                    2
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`sm:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
          >
            Products
          </Link>
          <Link
            to="/orders"
            className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
          >
            Orders
          </Link>
          {user && (
            <>
              <Link
                to="/cart"
                className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
              >
                Cart
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;