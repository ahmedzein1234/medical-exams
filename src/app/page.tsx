import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-primary-50 to-secondary-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-primary-800 mb-6">
            Medical Exam Preparation Platform
          </h1>
          <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
            Your AI-powered companion for medical board and licensing exam preparation. Master MRCP, FRCR, USMLE, PLAB, and FCPS with personalized learning paths.
          </p>
          <div className="space-x-4">
            <Link
              href="/auth/register"
              className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/auth/login"
              className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-medium border border-primary-600 hover:bg-primary-50 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-heading font-semibold text-primary-700 mb-4">
              Comprehensive Question Bank
            </h3>
            <p className="text-neutral-600">
              Access thousands of high-quality questions across multiple medical specialties and exam formats.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-heading font-semibold text-primary-700 mb-4">
              AI-Enhanced Learning
            </h3>
            <p className="text-neutral-600">
              Experience personalized study paths and adaptive quizzes powered by advanced AI technology.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-heading font-semibold text-primary-700 mb-4">
              Performance Analytics
            </h3>
            <p className="text-neutral-600">
              Track your progress with detailed analytics and insights to optimize your study strategy.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}