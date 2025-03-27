'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/lib/supabase/auth-context'

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Exams', href: '/exams' },
  { name: 'Progress', href: '/progress' },
  { name: 'Community', href: '/community' },
]

export function Navigation() {
  const pathname = usePathname()
  const { user, signOut } = useAuth()

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-heading font-bold text-primary-600">
                Medical Exams
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-700'
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="ml-3 relative flex items-center gap-4">
              <Link
                href="/profile"
                className="text-neutral-500 hover:text-neutral-700"
              >
                {user?.full_name}
              </Link>
              <button
                onClick={() => signOut()}
                className="text-sm text-neutral-500 hover:text-neutral-700"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}