
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header'
import Home from './pages/Home'
import Surveys from './pages/Surveys'
import Profile from './pages/Profile'

function App() {
  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#ffffff',
            color: '#374151',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
          },
          success: {
            style: {
              border: '1px solid #10b981',
              color: '#047857'
            },
            iconTheme: {
              primary: '#10b981',
              secondary: '#ffffff'
            }
          },
          error: {
            style: {
              border: '1px solid #ef4444',
              color: '#dc2626'
            },
            iconTheme: {
              primary: '#ef4444',
              secondary: '#ffffff'
            }
          }
        }}
      />
      
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pesquisas" element={<Surveys />} />
              <Route path="/perfil" element={<Profile />} />
              <Route path="/marketplace" element={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">
                      Marketplace de Dados
                    </h1>
                    <p className="text-gray-600">
                      Funcionalidade em desenvolvimento
                    </p>
                  </div>
                </div>
              } />
              <Route path="/criar-pesquisa" element={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">
                      Criar Nova Pesquisa
                    </h1>
                    <p className="text-gray-600">
                      Funcionalidade em desenvolvimento
                    </p>
                  </div>
                </div>
              } />
            </Routes>
          </main>
        </div>
      </Router>
    </>
  )
}

export default App
