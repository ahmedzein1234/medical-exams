export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name: string
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      exams: {
        Row: {
          id: string
          title: string
          description: string
          type: 'mcq' | 'essay' | 'mixed'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          type: 'mcq' | 'essay' | 'mixed'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          type?: 'mcq' | 'essay' | 'mixed'
          created_at?: string
          updated_at?: string
        }
      }
      questions: {
        Row: {
          id: string
          exam_id: string
          content: string
          type: 'mcq' | 'essay'
          options: Json | null
          correct_answer: string
          explanation: string | null
          difficulty: 'easy' | 'medium' | 'hard'
          tags: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          exam_id: string
          content: string
          type: 'mcq' | 'essay'
          options?: Json | null
          correct_answer: string
          explanation?: string | null
          difficulty: 'easy' | 'medium' | 'hard'
          tags: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          exam_id?: string
          content?: string
          type?: 'mcq' | 'essay'
          options?: Json | null
          correct_answer?: string
          explanation?: string | null
          difficulty?: 'easy' | 'medium' | 'hard'
          tags?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      user_progress: {
        Row: {
          id: string
          user_id: string
          question_id: string
          exam_id: string
          is_correct: boolean
          time_taken: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          question_id: string
          exam_id: string
          is_correct: boolean
          time_taken: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          question_id?: string
          exam_id?: string
          is_correct?: boolean
          time_taken?: number
          created_at?: string
          updated_at?: string
        }
      }
      user_subscriptions: {
        Row: {
          id: string
          user_id: string
          plan_id: string
          status: 'active' | 'cancelled' | 'expired'
          start_date: string
          end_date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          plan_id: string
          status: 'active' | 'cancelled' | 'expired'
          start_date: string
          end_date: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          plan_id?: string
          status?: 'active' | 'cancelled' | 'expired'
          start_date?: string
          end_date?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}