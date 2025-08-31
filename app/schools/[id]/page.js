'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'

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
      if (response.ok) {
        const schools = await response.json()
        const foundSchool = schools.find(s => s._id === schoolId)
        
        if (foundSchool) {
          setSchool(foundSchool)
        } else {
          setError('School not found')
        }
      } else {
        setError('Failed to fetch school details')
      }
    } catch (error) {
      setError('An error occurred while fetching school details')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error || !school) {
    return (
      <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-md p-6 text-center">
            <div className="text-red-400 text-6xl mb-4">⚠️</div>
            <h3 className="text-lg font-medium text-red-800 mb-2">
              {error || 'School not found'}
            </h3>
            <p className="text-red-600 mb-4">
              The school you're looking for could not be found.
            </p>
            <button
              onClick={() => router.push('/showSchools')}
              className="btn-primary"
            >
              Back to Schools
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.push('/showSchools')}
            className="inline-flex items-center text-primary hover:text-secondary mb-4 transition-colors duration-200"
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
            Complete School Information
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Image */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-64 sm:h-80 bg-gray-200">
                {school.image ? (
                  <Image
                    src={`/schoolImages/${school.image}`}
                    alt={school.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <span className="text-6xl">🏫</span>
                  </div>
                )}
              </div>
              
              {/* Quick Info Cards */}
              <div className="p-4 space-y-3">
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-500 text-xl mr-3">📍</span>
                  <div>
                    <p className="text-sm text-blue-600 font-medium">Location</p>
                    <p className="text-blue-800">{school.city}, {school.state}</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-green-500 text-xl mr-3">📞</span>
                  <div>
                    <p className="text-sm text-green-600 font-medium">Contact</p>
                    <p className="text-green-800">{school.contact}</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-purple-500 text-xl mr-3">✉️</span>
                  <div>
                    <p className="text-sm text-purple-600 font-medium">Email</p>
                    <p className="text-purple-800 break-all">{school.email_id}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-4">
                School Details
              </h2>
              
              <div className="space-y-6">
                {/* School Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">
                    School Name
                  </label>
                  <p className="text-lg text-gray-900 font-medium">
                    {school.name}
                  </p>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">
                    Complete Address
                  </label>
                  <p className="text-lg text-gray-900">
                    {school.address}
                  </p>
                </div>

                {/* City & State */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-2">
                      City
                    </label>
                    <p className="text-lg text-gray-900">
                      {school.city}
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-2">
                      State
                    </label>
                    <p className="text-lg text-gray-900">
                      {school.state}
                    </p>
                  </div>
                </div>

                {/* Contact & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-2">
                      Contact Number
                    </label>
                    <p className="text-lg text-gray-900">
                      {school.contact}
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-2">
                      Email Address
                    </label>
                    <p className="text-lg text-gray-900 break-all">
                      {school.email_id}
                    </p>
                  </div>
                </div>

                {/* Created Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">
                    Added to System
                  </label>
                  <p className="text-lg text-gray-900">
                    {school.createdAt ? new Date(school.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    }) : 'Date not available'}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => router.push('/showSchools')}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200 text-center"
                >
                  Back to Schools
                </button>
                
                <button
                  onClick={() => router.push('/')}
                  className="flex-1 btn-primary"
                >
                  Add Another School
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
