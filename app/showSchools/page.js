'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function ShowSchools() {
  const [schools, setSchools] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCity, setFilterCity] = useState('')
  const [filterState, setFilterState] = useState('')
  const router = useRouter()

  useEffect(() => {
    fetchSchools()
  }, [])

  const fetchSchools = async () => {
    try {
      const response = await fetch('/api/schools')
      if (response.ok) {
        const data = await response.json()
        setSchools(data)
      } else {
        setError('Failed to fetch schools')
      }
    } catch (error) {
      setError('An error occurred while fetching schools')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleViewDetails = (schoolId) => {
    router.push(`/schools/${schoolId}`)
  }

  // Get unique cities and states for filters
  const cities = [...new Set(schools.map(school => school.city))].sort()
  const states = [...new Set(schools.map(school => school.state))].sort()

  // Filter schools based on search and filters
  const filteredSchools = schools.filter(school => {
    const matchesSearch = school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         school.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         school.city.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCity = !filterCity || school.city === filterCity
    const matchesState = !filterState || school.state === filterState
    
    return matchesSearch && matchesCity && matchesState
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-800">{error}</p>
            <button 
              onClick={fetchSchools}
              className="mt-2 btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
            Browse Schools
          </h1>
          
          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {/* Search */}
              <div className="sm:col-span-2 lg:col-span-1">
                <label className="form-label text-sm sm:text-base">Search Schools</label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, address, or city..."
                  className="form-input text-sm sm:text-base"
                />
              </div>
              
              {/* City Filter */}
              <div>
                <label className="form-label text-sm sm:text-base">Filter by City</label>
                <select
                  value={filterCity}
                  onChange={(e) => setFilterCity(e.target.value)}
                  className="form-input text-sm sm:text-base"
                >
                  <option value="">All Cities</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              
              {/* State Filter */}
              <div>
                <label className="form-label text-sm sm:text-base">Filter by State</label>
                <select
                  value={filterState}
                  onChange={(e) => setFilterState(e.target.value)}
                  className="form-input text-sm sm:text-base"
                >
                  <option value="">All States</option>
                  {states.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Clear Filters Button */}
            <div className="mt-4 flex justify-center sm:justify-end">
              <button
                onClick={() => {
                  setSearchTerm('')
                  setFilterCity('')
                  setFilterState('')
                }}
                className="btn-primary text-sm sm:text-base px-4 sm:px-6"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-center mb-4 sm:mb-6">
            <p className="text-sm sm:text-base text-gray-600">
              Showing {filteredSchools.length} of {schools.length} schools
            </p>
          </div>
        </div>

        {/* Schools Grid */}
        {filteredSchools.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <div className="text-gray-400 text-4xl sm:text-6xl mb-4">🏫</div>
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No schools found</h3>
            <p className="text-sm sm:text-base text-gray-500">
              {searchTerm || filterCity || filterState 
                ? 'Try adjusting your search or filters'
                : 'No schools have been added yet'
              }
            </p>
            {!searchTerm && !filterCity && !filterState && (
              <a href="/" className="btn-primary inline-block mt-4 text-sm sm:text-base">
                Add First School
              </a>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredSchools.map((school) => (
              <div key={school._id} className="card group">
                {/* School Image */}
                <div className="relative h-40 sm:h-48 bg-gray-200 overflow-hidden">
                  {school.image ? (
                    <Image
                      src={`/schoolImages/${school.image}`}
                      alt={school.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <span className="text-3xl sm:text-4xl">🏫</span>
                    </div>
                  )}
                </div>
                
                {/* School Info */}
                <div className="p-3 sm:p-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {school.name}
                  </h3>
                  
                  <div className="space-y-2 text-xs sm:text-sm text-gray-600">
                    <div className="flex items-start">
                      <span className="text-gray-400 mr-2 flex-shrink-0">📍</span>
                      <p className="line-clamp-2">{school.address}</p>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="text-gray-400 mr-2 flex-shrink-0">🏙️</span>
                      <p>{school.city}, {school.state}</p>
                    </div>
                  </div>
                  
                  {/* View Details Button */}
                  <button 
                    onClick={() => handleViewDetails(school._id)}
                    className="w-full mt-3 sm:mt-4 btn-primary text-xs sm:text-sm hover:bg-secondary transition-colors duration-200"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
