import { createFileRoute, Link } from '@tanstack/react-router'
import { useAuth } from '../lib/authContext'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  const { state } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Navigation */}
      <nav className="bg-surface shadow-sm border-b border-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-primary">AuthFlow</span>
            </div>
            
            {state.isAuthenticated && state.user && (
              <div className="flex items-center space-x-4">
                <span className="text-secondary">Welcome, {state.user.username}!</span>
                <Link
                  to="/profile"
                  className="text-primary hover:text-primary-hover font-medium"
                >
                  Profile
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-6">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
            </svg>
          </div>
          
          <h1 className="text-4xl font-bold text-primary mb-4">
            Secure Authentication Made Simple
          </h1>
          <p className="text-xl text-secondary mb-8 max-w-2xl mx-auto">
            Experience seamless authentication with FreeAPI. Modern, secure, and developer-friendly user management.
          </p>

          {state.isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <span className="ml-3 text-secondary">Checking authentication...</span>
            </div>
          ) : state.isAuthenticated ? (
            <div className="space-y-8">
              <div className="bg-success-light border border-success rounded-lg p-6 max-w-md mx-auto">
                <div className="flex items-center justify-center text-success mb-4">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-success mb-2">Welcome Back!</h2>
                <p className="text-success">You're successfully authenticated and ready to explore.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <Link
                  to="/profile"
                  className="bg-surface p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-accent"
                >
                  <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-2">My Profile</h3>
                  <p className="text-secondary text-sm">View and manage your account settings</p>
                </Link>

                <div className="bg-surface p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-accent">
                  <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Dashboard</h3>
                  <p className="text-secondary text-sm">View your activity and statistics</p>
                </div>

                <div className="bg-surface p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-accent">
                  <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Documentation</h3>
                  <p className="text-secondary text-sm">Learn about API integration</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <Link
                  to="/login"
                  className="bg-gradient-primary text-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Sign In</h3>
                  <p className="text-primary-lighter">Access your existing account</p>
                </Link>

                <Link
                  to="/register"
                  className="bg-surface border-2 border-secondary text-primary p-8 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 hover:border-secondary-hover"
                >
                  <div className="w-16 h-16 bg-primary-light rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Create Account</h3>
                  <p className="text-secondary">Start your journey today</p>
                </Link>
              </div>

              <div className="bg-surface/80 backdrop-blur rounded-2xl p-8 max-w-4xl mx-auto border border-accent">
                <h3 className="text-2xl font-bold text-primary mb-6 text-center">Why Choose AuthFlow?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 mx-auto">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                      </svg>
                    </div>
                    <h4 className="font-semibold text-primary mb-2">Secure</h4>
                    <p className="text-secondary text-sm">Enterprise-grade security with JWT tokens</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 mx-auto">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z"/>
                      </svg>
                    </div>
                    <h4 className="font-semibold text-primary mb-2">Fast</h4>
                    <p className="text-secondary text-sm">Lightning quick authentication flows</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 mx-auto">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                      </svg>
                    </div>
                    <h4 className="font-semibold text-primary mb-2">Simple</h4>
                    <p className="text-secondary text-sm">Clean, intuitive user interface</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-surface border-t border-accent mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-secondary">
            <p>Built with ❤️ using FreeAPI and React</p>
            <p className="mt-2 text-sm">© 2024 AuthFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
