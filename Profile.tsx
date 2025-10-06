
import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useEarnings } from '../hooks/useEarnings'
import EarningsCard from '../components/EarningsCard'
import {User, Settings, History, BarChart3, Award, Calendar} from 'lucide-react'

const Profile: React.FC = () => {
  const { user, isAuthenticated, signIn } = useAuth()
  const { earnings, totalBalance } = useEarnings()
  const [activeTab, setActiveTab] = useState('overview')

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Login Necessário
          </h2>
          <p className="text-gray-600 mb-6">
            Faça login para acessar seu perfil
          </p>
          <button
            onClick={signIn}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Fazer Login
          </button>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
    { id: 'earnings', label: 'Ganhos', icon: Award },
    { id: 'history', label: 'Histórico', icon: History },
    { id: 'settings', label: 'Configurações', icon: Settings }
  ]

  const totalEarnings = earnings.reduce((sum, earning) => sum + earning.amount_cents, 0)
  const completedSurveys = earnings.filter(e => e.source_type === 'survey_response').length
  const memberSince = user?.createdTime ? new Date(user.createdTime).toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric'
  }) : 'Recente'

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                {user?.userName || 'Usuário'}
              </h1>
              <p className="text-gray-600 mb-2">{user?.email}</p>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-1" />
                <span>Membro desde {memberSince}</span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">
                R$ {(totalBalance / 100).toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">Saldo Disponível</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Ganho</p>
                        <p className="text-2xl font-bold text-gray-900">
                          R$ {(totalEarnings / 100).toFixed(2)}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Award className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Pesquisas Respondidas</p>
                        <p className="text-2xl font-bold text-gray-900">{completedSurveys}</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <BarChart3 className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Média por Pesquisa</p>
                        <p className="text-2xl font-bold text-gray-900">
                          R$ {completedSurveys > 0 ? (totalEarnings / completedSurveys / 100).toFixed(2) : '0.00'}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Award className="w-6 h-6 text-yellow-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Atividade Recente
                  </h3>
                  
                  {earnings.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">
                      Nenhuma atividade registrada ainda
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {earnings.slice(0, 5).map((earning) => (
                        <div key={earning._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">
                              {earning.source_type === 'survey_response' ? 'Pesquisa Respondida' : 
                               earning.source_type === 'referral' ? 'Indicação' : 'Bônus'}
                            </p>
                            <p className="text-sm text-gray-500">
                              {new Date(earning.earned_at).toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-green-600">
                              +R$ {(earning.amount_cents / 100).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'earnings' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Detalhes dos Ganhos
                </h3>
                
                <div className="space-y-4">
                  {earnings.map((earning) => (
                    <div key={earning._id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {earning.source_type === 'survey_response' ? 'Resposta de Pesquisa' : 
                             earning.source_type === 'referral' ? 'Indicação de Usuário' : 'Bônus'}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {new Date(earning.earned_at).toLocaleString('pt-BR')}
                          </p>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                            earning.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            earning.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {earning.status === 'confirmed' ? 'Confirmado' :
                             earning.status === 'pending' ? 'Pendente' : 'Pago'}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-green-600">
                            +R$ {(earning.amount_cents / 100).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Histórico de Pesquisas
                </h3>
                <p className="text-gray-500 text-center py-8">
                  Funcionalidade em desenvolvimento
                </p>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Configurações da Conta
                </h3>
                <p className="text-gray-500 text-center py-8">
                  Funcionalidade em desenvolvimento
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <EarningsCard />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
