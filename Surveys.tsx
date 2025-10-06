
import React, { useState, useEffect } from 'react'
import { useSurveys } from '../hooks/useSurveys'
import { useAuth } from '../hooks/useAuth'
import SurveyCard from '../components/SurveyCard'
import {Search, Filter, SortDesc} from 'lucide-react'

const Surveys: React.FC = () => {
  const { surveys, loading, fetchSurveys } = useSurveys()
  const { isAuthenticated } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortBy, setSortBy] = useState('boost_level') // boost_level, reward_cents, created_at

  const categories = [
    { value: '', label: 'Todas as Categorias' },
    { value: 'tecnologia', label: 'Tecnologia' },
    { value: 'saude', label: 'Saúde' },
    { value: 'educacao', label: 'Educação' },
    { value: 'entretenimento', label: 'Entretenimento' },
    { value: 'negocios', label: 'Negócios' },
    { value: 'lifestyle', label: 'Lifestyle' },
    { value: 'outros', label: 'Outros' }
  ]

  const sortOptions = [
    { value: 'boost_level', label: 'Impulsionadas Primeiro' },
    { value: 'reward_cents', label: 'Maior Recompensa' },
    { value: 'created_at', label: 'Mais Recentes' }
  ]

  // Filter and sort surveys
  const filteredSurveys = surveys
    .filter(survey => {
      const matchesSearch = survey.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           survey.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = !selectedCategory || survey.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'boost_level':
          if (a.boost_level !== b.boost_level) {
            return b.boost_level - a.boost_level
          }
          return b.reward_cents - a.reward_cents
        case 'reward_cents':
          return b.reward_cents - a.reward_cents
        case 'created_at':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        default:
          return 0
      }
    })

  const handleParticipate = (surveyId: string) => {
    // Navigate to survey page
    window.location.href = `/pesquisas/${surveyId}`
  }

  useEffect(() => {
    const filters: any = {}
    if (selectedCategory) {
      filters.category = selectedCategory
    }
    fetchSurveys(filters)
  }, [selectedCategory, fetchSurveys])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Pesquisas Disponíveis
          </h1>
          <p className="text-gray-600">
            Encontre pesquisas interessantes e ganhe dinheiro respondendo
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar pesquisas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="relative">
              <SortDesc className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            {filteredSurveys.length} pesquisa{filteredSurveys.length !== 1 ? 's' : ''} encontrada{filteredSurveys.length !== 1 ? 's' : ''}
          </p>
          
          {!isAuthenticated && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
              <p className="text-blue-700 text-sm">
                <span className="font-medium">Dica:</span> Faça login para participar das pesquisas
              </p>
            </div>
          )}
        </div>

        {/* Surveys Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : filteredSurveys.length === 0 ? (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhuma pesquisa encontrada
            </h3>
            <p className="text-gray-600">
              Tente ajustar os filtros ou buscar por outros termos
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSurveys.map((survey) => (
              <SurveyCard
                key={survey._id}
                survey={survey}
                onParticipate={handleParticipate}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Surveys
