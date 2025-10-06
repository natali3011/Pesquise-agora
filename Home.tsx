
import React from 'react'
import { Link } from 'react-router-dom'
import { useSurveys } from '../hooks/useSurveys'
import { useAuth } from '../hooks/useAuth'
import SurveyCard from '../components/SurveyCard'
import {Search, Users, Coins, TrendingUp, ArrowRight, Star, Shield, Clock} from 'lucide-react'

const Home: React.FC = () => {
  const { surveys, loading } = useSurveys()
  const { isAuthenticated, signIn } = useAuth()

  const featuredSurveys = surveys
    .filter(s => s.boost_level > 0)
    .slice(0, 3)

  const handleParticipate = (surveyId: string) => {
    // Navegar para página da pesquisa
    window.location.href = `/pesquisas/${surveyId}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4" />
              <span>Plataforma #1 em Pesquisas Remuneradas</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Ganhe Dinheiro
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                {" "}Respondendo{" "}
              </span>
              Pesquisas
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Participe de pesquisas relevantes, ganhe centavos por cada resposta e ajude empresas a tomarem melhores decisões. 
              Crie suas próprias pesquisas e venda dados valiosos.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!isAuthenticated ? (
                <button
                  onClick={signIn}
                  className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Começar Agora
                </button>
              ) : (
                <Link
                  to="/pesquisas"
                  className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-block"
                >
                  Ver Pesquisas
                </Link>
              )}
              
              <Link
                to="/marketplace"
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-200 font-semibold text-lg"
              >
                Marketplace de Dados
              </Link>
            </div>
          </div>
        </div>

        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">50K+</div>
              <div className="text-gray-600">Usuários Ativos</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">1.2K+</div>
              <div className="text-gray-600">Pesquisas Ativas</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Coins className="w-8 h-8 text-yellow-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">R$ 2.5M</div>
              <div className="text-gray-600">Pagos aos Usuários</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">98%</div>
              <div className="text-gray-600">Satisfação</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Surveys */}
      {featuredSurveys.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Pesquisas em Destaque
              </h2>
              <p className="text-gray-600 text-lg">
                Pesquisas impulsionadas com maiores recompensas
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {featuredSurveys.map((survey) => (
                <SurveyCard
                  key={survey._id}
                  survey={survey}
                  onParticipate={handleParticipate}
                />
              ))}
            </div>

            <div className="text-center">
              <Link
                to="/pesquisas"
                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <span>Ver Todas as Pesquisas</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Como Funciona
            </h2>
            <p className="text-gray-600 text-lg">
              Simples, rápido e seguro
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                1. Encontre Pesquisas
              </h3>
              <p className="text-gray-600">
                Navegue por pesquisas relevantes aos seus interesses e perfil
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                2. Responda Rapidamente
              </h3>
              <p className="text-gray-600">
                Complete pesquisas em poucos minutos e ganhe centavos por cada resposta
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Coins className="w-10 h-10 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                3. Receba Pagamentos
              </h3>
              <p className="text-gray-600">
                Acumule ganhos e solicite saques a partir de R$ 5,00
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Por Que Escolher a PesquisaPay?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Shield className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Seguro e Confiável
              </h3>
              <p className="text-gray-600">
                Seus dados são protegidos e pagamentos garantidos
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <TrendingUp className="w-8 h-8 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Impulsionamento
              </h3>
              <p className="text-gray-600">
                Promova suas pesquisas para alcançar mais pessoas
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Coins className="w-8 h-8 text-yellow-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Marketplace de Dados
              </h3>
              <p className="text-gray-600">
                Venda dados valiosos de suas pesquisas
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Pronto para Começar a Ganhar?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Junte-se a milhares de usuários que já estão ganhando dinheiro com pesquisas
          </p>
          
          {!isAuthenticated ? (
            <button
              onClick={signIn}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors font-semibold text-lg shadow-lg"
            >
              Criar Conta Grátis
            </button>
          ) : (
            <Link
              to="/pesquisas"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors font-semibold text-lg shadow-lg inline-block"
            >
              Explorar Pesquisas
            </Link>
          )}
        </div>
      </section>
    </div>
  )
}

export default Home
