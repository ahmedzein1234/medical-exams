import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for database tables
export type User = {
  id: string
  email: string
  full_name: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export type Exam = {
  id: string
  title: string
  description: string
  type: 'MRCP' | 'FRCR' | 'USMLE' | 'PLAB' | 'FCPS'
  created_at: string
  updated_at: string
}

export type Question = {
  id: string
  exam_id: string
  content: string
  type: 'multiple_choice' | 'true_false' | 'essay'
  options?: string[]
  correct_answer: string
  explanation: string
  difficulty: 'easy' | 'medium' | 'hard'
  tags: string[]
  created_at: string
  updated_at: string
}

export type UserProgress = {
  id: string
  user_id: string
  question_id: string
  exam_id: string
  is_correct: boolean
  time_taken: number
  created_at: string
}

export type UserSubscription = {
  id: string
  user_id: string
  plan_id: string
  status: 'active' | 'canceled' | 'expired'
  start_date: string
  end_date: string
  created_at: string
  updated_at: string
}