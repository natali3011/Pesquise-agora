
import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useEarnings } from '../hooks/useEarnings'
import {Search, PlusCircle, User, Coins, LogOut} from 'lucide-react'

const Header: React.FC = () => {
  const { user, isAuthenticated, signIn, signOut } = useAuth()
  const { totalBalance } = useEarnings()

  return (
    <header className="bg-white shadow-sm border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Search className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">PesquisaPay</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/pesquisas" 
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Pesquisas
            </Link>
            <Link 
              to="/marketplace" 
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Marketplace
            </Link>
            {isAuthenticated && (
              <Link 
                to="/criar-pesquisa" 
                className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Criar Pesquisa</span>
              </Link>
            )}
          </nav>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Balance */}
                <div className="flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full">
                  <Coins className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">
                    R$ {(totalBalance / 100).toFixed(2)}
                  </span>
                </div>

                {/* User Menu */}
                <div className="flex items-center space-x-2">
                  <Link
                    to="/perfil"
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <span className="hidden sm:block">{user?.userName}</span>
                  </Link>
                  
                  <button
                    onClick={signOut}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    title="Sair"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <button
                onClick={signIn}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Entrar
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
