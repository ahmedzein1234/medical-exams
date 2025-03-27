'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/lib/supabase/auth-context'
import { createClient } from '@/lib/supabase/client'

interface Stats {
  totalExams: number
  completedExams: number
  averageScore: number
}

interface RecentExam {
  id: string
  title: string
  type: string
  lastAttempted: string
  score: number
}

export default function DashboardPage() {
  const { user } = useAuth()
  const [stats, setStats] = useState<Stats>({
    totalExams: 0,
    completedExams: 0,
    averageScore: 0,
  })
  const [recentExams, setRecentExams] = useState<RecentExam[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDashboardData() {
      if (!user) return

      const supabase = createClient()
      
      // Fetch user stats
      const { data: statsData, error: statsError } = await supabase
        .from('user_progress')
        .select('exam_id, is_correct')
        .eq('user_id', user.id)

      if (statsData) {
        const uniqueExams = new Set(statsData.map(d => d.exam_id))
        const correctAnswers = statsData.filter(d => d.is_correct).length
        
        setStats({
          totalExams: uniqueExams.size,
          completedExams: uniqueExams.size,
          averageScore: statsData.length > 0 
            ? (correctAnswers / statsData.length) * 100 
            : 0
        })
      }

      // Fetch recent exams
      const { data: examsData, error: examsError } = await supabase
        .from('exams')
        .select(\`
          id,
          title,
          type,
          user_progress (
            created_at,
            is_correct
          )
        \`)
        .eq('user_progress.user_id', user.id)
        .order('user_progress.created_at', { ascending: false })
        .limit(5)

      if (examsData) {
        setRecentExams(
          examsData.map(exam => ({
            id: exam.id,
            title: exam.title,
            type: exam.type,
            lastAttempted: exam.user_progress[0]?.created_at || '',
            score: exam.user_progress.filter(p => p.is_correct).length / exam.user_progress.length * 100
          }))
        )
      }

      setLoading(false)
    }

    fetchDashboardData()
  }, [user])

  if (loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-neutral-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Welcome back, {user?.full_name}
          </h2>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0">
          <Link
            href="/exams"
            className="ml-3 inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-700"
          >
            Start New Exam
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-neutral-500">Total Exams Taken</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-neutral-900">{stats.totalExams}</dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-neutral-500">Completed Exams</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-neutral-900">{stats.completedExams}</dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-neutral-500">Average Score</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-neutral-900">{stats.averageScore.toFixed(1)}%</dd>
        </div>
      </div>

      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-base font-semibold leading-6 text-neutral-900">Recent Exams</h3>
        </div>
        <div className="border-t border-neutral-200">
          <ul role="list" className="divide-y divide-neutral-200">
            {recentExams.map((exam) => (
              <li key={exam.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-primary-600 truncate">{exam.title}</p>
                    <p className="text-sm text-neutral-500">{exam.type}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-sm text-neutral-900">{exam.score.toFixed(1)}%</p>
                    <p className="text-sm text-neutral-500">
                      {new Date(exam.lastAttempted).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </li>
            ))}
            {recentExams.length === 0 && (
              <li className="px-4 py-4 sm:px-6 text-center text-neutral-500">
                No exams taken yet
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}