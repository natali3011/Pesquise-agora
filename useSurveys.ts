
import { useState, useEffect, useCallback } from 'react'
import { lumi } from '../lib/lumi'
import toast from 'react-hot-toast'

interface Survey {
  _id: string
  title: string
  description: string
  creator_id: string
  reward_cents: number
  questions: any[]
  category: string
  status: string
  target_responses: number
  current_responses: number
  boost_level: number
  boost_expires_at?: string
  expires_at: string
  data_sale_price?: number
  is_data_for_sale: boolean
  created_at: string
  updated_at: string
}

export const useSurveys = () => {
  const [surveys, setSurveys] = useState<Survey[]>([])
  const [loading, setLoading] = useState(false)

  const fetchSurveys = useCallback(async (filters?: any) => {
    setLoading(true)
    try {
      const response = await lumi.entities.surveys.list({
        filter: { status: 'active', ...filters },
        sort: { boost_level: -1, created_at: -1 }
      })
      setSurveys(response.list || [])
    } catch (error: any) {
      console.error('Erro ao buscar pesquisas:', error)
      toast.error('Erro ao carregar pesquisas')
    } finally {
      setLoading(false)
    }
  }, [])

  const createSurvey = async (surveyData: Omit<Survey, '_id' | 'created_at' | 'updated_at'>) => {
    try {
      const newSurvey = await lumi.entities.surveys.create({
        ...surveyData,
        current_responses: 0,
        boost_level: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      setSurveys(prev => [newSurvey, ...prev])
      toast.success('Pesquisa criada com sucesso!')
      return newSurvey
    } catch (error: any) {
      console.error('Erro ao criar pesquisa:', error)
      toast.error('Erro ao criar pesquisa')
      throw error
    }
  }

  const updateSurvey = async (surveyId: string, updates: Partial<Survey>) => {
    try {
      const updatedSurvey = await lumi.entities.surveys.update(surveyId, {
        ...updates,
        updated_at: new Date().toISOString()
      })
      setSurveys(prev => prev.map(s => s._id === surveyId ? updatedSurvey : s))
      toast.success('Pesquisa atualizada!')
      return updatedSurvey
    } catch (error: any) {
      console.error('Erro ao atualizar pesquisa:', error)
      toast.error('Erro ao atualizar pesquisa')
      throw error
    }
  }

  const deleteSurvey = async (surveyId: string) => {
    try {
      await lumi.entities.surveys.delete(surveyId)
      setSurveys(prev => prev.filter(s => s._id !== surveyId))
      toast.success('Pesquisa excluída!')
    } catch (error: any) {
      console.error('Erro ao excluir pesquisa:', error)
      toast.error('Erro ao excluir pesquisa')
      throw error
    }
  }

  const boostSurvey = async (surveyId: string, boostLevel: number, durationDays: number) => {
    try {
      const boostExpiresAt = new Date()
      boostExpiresAt.setDate(boostExpiresAt.getDate() + durationDays)
      
      await updateSurvey(surveyId, {
        boost_level: boostLevel,
        boost_expires_at: boostExpiresAt.toISOString()
      })
      toast.success(`Pesquisa impulsionada por ${durationDays} dias!`)
    } catch (error) {
      toast.error('Erro ao impulsionar pesquisa')
    }
  }

  useEffect(() => {
    fetchSurveys()
  }, [fetchSurveys])

  return {
    surveys,
    loading,
    fetchSurveys,
    createSurvey,
    updateSurvey,
    deleteSurvey,
    boostSurvey
  }
}
