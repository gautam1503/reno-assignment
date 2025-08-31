import './globals.css'

export const metadata = {
  title: 'School Management System',
  description: 'A comprehensive system for managing school information',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between h-auto sm:h-16 py-4 sm:py-0">
              <div className="flex items-center justify-center sm:justify-start mb-4 sm:mb-0">
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">School Management</h1>
              </div>
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <a href="/" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium w-full sm:w-auto text-center">
                  Add School
                </a>
                <a href="/showSchools" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium w-full sm:w-auto text-center">
                  View Schools
                </a>
              </div>
            </div>
          </div>
        </nav>
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  )
}
