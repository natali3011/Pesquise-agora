
import { useState, useEffect, useCallback } from 'react'
import { lumi } from '../lib/lumi'
import { useAuth } from './useAuth'
import toast from 'react-hot-toast'

interface Earning {
  _id: string
  user_id: string
  amount_cents: number
  source_type: string
  source_id: string
  status: string
  earned_at: string
  paid_at?: string
}

export const useEarnings = () => {
  const { user, isAuthenticated } = useAuth()
  const [earnings, setEarnings] = useState<Earning[]>([])
  const [totalBalance, setTotalBalance] = useState(0)
  const [loading, setLoading] = useState(false)

  const fetchEarnings = useCallback(async () => {
    if (!isAuthenticated || !user) return

    setLoading(true)
    try {
      const response = await lumi.entities.user_earnings.list({
        filter: { user_id: user.userId },
        sort: { earned_at: -1 }
      })
      
      const userEarnings = response.list || []
      setEarnings(userEarnings)
      
      // Calcular saldo total (ganhos confirmados não pagos)
      const confirmedEarnings = userEarnings.filter(e => e.status === 'confirmed')
      const balance = confirmedEarnings.reduce((sum, earning) => sum + earning.amount_cents, 0)
      setTotalBalance(balance)
      
    } catch (error: any) {
      console.error('Erro ao buscar ganhos:', error)
      toast.error('Erro ao carregar ganhos')
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated, user])

  const addEarning = async (amount: number, sourceType: string, sourceId: string) => {
    if (!user) return

    try {
      const newEarning = await lumi.entities.user_earnings.create({
        user_id: user.userId,
        amount_cents: amount,
        source_type: sourceType,
        source_id: sourceId,
        status: 'confirmed',
        earned_at: new Date().toISOString()
      })
      
      setEarnings(prev => [newEarning, ...prev])
      setTotalBalance(prev => prev + amount)
      
      toast.success(`Você ganhou R$ ${(amount / 100).toFixed(2)}!`)
      return newEarning
    } catch (error: any) {
      console.error('Erro ao adicionar ganho:', error)
      toast.error('Erro ao processar ganho')
      throw error
    }
  }

  const requestPayout = async (amount: number) => {
    if (amount > totalBalance) {
      toast.error('Saldo insuficiente')
      return
    }

    try {
      // Simular processamento de pagamento
      toast.success(`Solicitação de saque de R$ ${(amount / 100).toFixed(2)} enviada!`)
      
      // Em um sistema real, isso atualizaria o status dos ganhos para 'paid'
      // e criaria uma transação de pagamento
      
    } catch (error: any) {
      console.error('Erro ao solicitar saque:', error)
      toast.error('Erro ao processar saque')
    }
  }

  useEffect(() => {
    fetchEarnings()
  }, [fetchEarnings])

  return {
    earnings,
    totalBalance,
    loading,
    fetchEarnings,
    addEarning,
    requestPayout
  }
}
