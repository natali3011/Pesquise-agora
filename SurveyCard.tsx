
import React from 'react'
import {Clock, Users, Coins, TrendingUp, Eye} from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

interface Survey {
  _id: string
  title: string
  description: string
  reward_cents: number
  category: string
  target_responses: number
  current_responses: number
  boost_level: number
  expires_at: string
  created_at: string
}

interface SurveyCardProps {
  survey: Survey
  onParticipate: (surveyId: string) => void
}

const SurveyCard: React.FC<SurveyCardProps> = ({ survey, onParticipate }) => {
  const { isAuthenticated, signIn } = useAuth()

  const handleParticipate = () => {
    if (!isAuthenticated) {
      signIn()
      return
    }
    onParticipate(survey._id)
  }

  const progress = (survey.current_responses / survey.target_responses) * 100
  const daysLeft = Math.max(0, Math.ceil((new Date(survey.expires_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))

  const categoryColors: Record<string, string> = {
    tecnologia: 'bg-blue-100 text-blue-800',
    saude: 'bg-green-100 text-green-800',
    educacao: 'bg-purple-100 text-purple-800',
    entretenimento: 'bg-pink-100 text-pink-800',
    negocios: 'bg-orange-100 text-orange-800',
    lifestyle: 'bg-indigo-100 text-indigo-800',
    outros: 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 overflow-hidden">
      {/* Boost Indicator */}
      {survey.boost_level > 0 && (
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 px-3 py-1">
          <div className="flex items-center justify-center space-x-1">
            <TrendingUp className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-medium">
              Impulsionada • Nível {survey.boost_level}
            </span>
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[survey.category] || categoryColors.outros}`}>
                {survey.category}
              </span>
              {daysLeft <= 3 && (
                <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                  {daysLeft === 0 ? 'Último dia' : `${daysLeft} dias restantes`}
                </span>
              )}
            </div>
            
            <h3 className="font-semibold text-lg text-gray-900 mb-2 leading-tight">
              {survey.title}
            </h3>
            
            <p className="text-gray-600 text-sm line-clamp-2">
              {survey.description}
            </p>
          </div>
        </div>

        {/* Reward */}
        <div className="flex items-center justify-center bg-blue-50 rounded-lg p-3 mb-4">
          <Coins className="w-5 h-5 text-blue-600 mr-2" />
          <span className="text-blue-700 font-bold text-lg">
            R$ {(survey.reward_cents / 100).toFixed(2)}
          </span>
          <span className="text-blue-600 text-sm ml-1">por resposta</span>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600 flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {survey.current_responses} de {survey.target_responses} respostas
            </span>
            <span className="text-sm text-gray-500">{progress.toFixed(0)}%</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center">
          <div className="flex items-center text-gray-500 text-sm">
            <Clock className="w-4 h-4 mr-1" />
            <span>~3-5 min</span>
          </div>

          <button
            onClick={handleParticipate}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            {!isAuthenticated ? 'Entrar para Participar' : 'Participar'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SurveyCard
