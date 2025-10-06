
import React, { useState } from 'react'
import { useEarnings } from '../hooks/useEarnings'
import {Coins, TrendingUp, Clock, Download} from 'lucide-react'

const EarningsCard: React.FC = () => {
  const { earnings, totalBalance, requestPayout } = useEarnings()
  const [showHistory, setShowHistory] = useState(false)
  const [payoutAmount, setPayoutAmount] = useState('')

  const handlePayout = () => {
    const amount = Math.round(parseFloat(payoutAmount) * 100)
    if (amount > 0 && amount <= totalBalance) {
      requestPayout(amount)
      setPayoutAmount('')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getSourceTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      survey_response: 'Resposta de Pesquisa',
      referral: 'Indicação',
      bonus: 'Bônus'
    }
    return labels[type] || type
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'text-yellow-600 bg-yellow-100',
      confirmed: 'text-green-600 bg-green-100',
      paid: 'text-blue-600 bg-blue-100'
    }
    return colors[status] || 'text-gray-600 bg-gray-100'
  }

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: 'Pendente',
      confirmed: 'Confirmado',
      paid: 'Pago'
    }
    return labels[status] || status
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Coins className="w-6 h-6" />
              <h2 className="text-xl font-bold">Meus Ganhos</h2>
            </div>
            <p className="text-blue-100">Saldo disponível para saque</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">
              R$ {(totalBalance / 100).toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Payout Section */}
        {totalBalance >= 500 && ( // Mínimo R$ 5,00 para saque
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-3 flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Solicitar Saque
            </h3>
            <div className="flex space-x-3">
              <input
                type="number"
                step="0.01"
                min="5.00"
                max={(totalBalance / 100).toFixed(2)}
                value={payoutAmount}
                onChange={(e) => setPayoutAmount(e.target.value)}
                placeholder="Valor (mín. R$ 5,00)"
                className="flex-1 px-3 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={handlePayout}
                disabled={!payoutAmount || parseFloat(payoutAmount) < 5 || parseFloat(payoutAmount) > totalBalance / 100}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Sacar
              </button>
            </div>
            <p className="text-green-600 text-sm mt-2">
              Saques são processados em até 3 dias úteis
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">
              {earnings.filter(e => e.status === 'confirmed').length}
            </div>
            <div className="text-sm text-gray-600">Ganhos Confirmados</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">
              R$ {(earnings.reduce((sum, e) => sum + e.amount_cents, 0) / 100).toFixed(2)}
            </div>
            <div className="text-sm text-gray-600">Total Ganho</div>
          </div>
        </div>

        {/* History Toggle */}
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors mb-4"
        >
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-900">Histórico de Ganhos</span>
            <TrendingUp className={`w-4 h-4 text-gray-500 transition-transform ${showHistory ? 'rotate-180' : ''}`} />
          </div>
        </button>

        {/* History */}
        {showHistory && (
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {earnings.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                Nenhum ganho registrado ainda
              </p>
            ) : (
              earnings.map((earning) => (
                <div key={earning._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">
                      {getSourceTypeLabel(earning.source_type)}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {formatDate(earning.earned_at)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">
                      +R$ {(earning.amount_cents / 100).toFixed(2)}
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(earning.status)}`}>
                      {getStatusLabel(earning.status)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default EarningsCard
