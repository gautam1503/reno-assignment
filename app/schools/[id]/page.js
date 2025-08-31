'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function SchoolDetails() {
  const [school, setSchool] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const params = useParams()
  const router = useRouter()
  const schoolId = params.id

  useEffect(() => {
    if (schoolId) {
      fetchSchoolDetails()
    }
  }, [schoolId])

  const fetchSchoolDetails = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/schools')
      if (!response.ok) {
        throw new Error('Failed to fetch school details')
      }
      const schools = await response.json()
      const foundSchool = schools.find(s => s._id === schoolId)
      
      if (foundSchool) {
        setSchool(foundSchool)
        setError('')
      } else {
        setError('School not found')
      }
    } catch (err) {
      setError('Failed to fetch school details')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading school details...</p>
        </div>
      </div>
    )
  }

  if (error || !school) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {error || 'School Not Found'}
          </h2>
          <p className="text-gray-600 mb-6">
            The school you're looking for doesn't exist or has been removed.
          </p>
          <div className="space-x-4">
            <button
              onClick={() => router.push('/showSchools')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              ← Back to Schools
            </button>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              ➕ Add New School
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with Back button */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/showSchools')}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Schools
          </button>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            {school.name}
          </h1>
          <p className="text-lg text-gray-600">
            Complete school information and details
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Image and Quick Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            {/* School Image */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-64 bg-gray-200">
                {school.image ? (
                  <img
                    src={school.image}
                    alt={school.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <span className="text-gray-400 text-6xl">🏫</span>
                  </div>
                )}
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                📍 Location
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="text-gray-900">{school.address}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">City</p>
                  <p className="text-gray-900">{school.city}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">State</p>
                  <p className="text-gray-900">{school.state}</p>
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                📞 Contact
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-gray-900">{school.contact}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-900 break-all">{school.email_id}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Detailed Information */}
          <div className="lg:col-span-2">
            {/* School Details */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                🏫 School Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">School ID</p>
                  <p className="text-lg font-medium text-gray-900">{school.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">School Name</p>
                  <p className="text-lg font-medium text-gray-900">{school.name}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-sm text-gray-500 mb-1">Full Address</p>
                  <p className="text-lg text-gray-900">{school.address}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">City</p>
                  <p className="text-lg text-gray-900">{school.city}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">State</p>
                  <p className="text-lg text-gray-900">{school.state}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Contact Number</p>
                  <p className="text-lg text-gray-900">{school.contact}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email Address</p>
                  <p className="text-lg text-gray-900 break-all">{school.email_id}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-sm text-gray-500 mb-1">Added On</p>
                  <p className="text-lg text-gray-900">
                    {new Date(school.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                🚀 Quick Actions
              </h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => router.push('/showSchools')}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  ← Back to Schools List
                </button>
                <button
                  onClick={() => router.push('/')}
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
                >
                  ➕ Add Another School
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
