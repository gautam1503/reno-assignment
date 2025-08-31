'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

export default function AddSchool() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    setMessage('')
    
    try {
      const formData = new FormData()
      
      // Append all form fields
      Object.keys(data).forEach(key => {
        if (key === 'image' && data[key][0]) {
          formData.append('image', data[key][0])
        } else if (key !== 'image') {
          formData.append(key, data[key])
        }
      })

      const response = await fetch('/api/schools', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        setMessage('School added successfully!')
        reset()
        // Redirect to show schools page after 2 seconds
        setTimeout(() => {
          router.push('/showSchools')
        }, 2000)
      } else {
        const errorData = await response.json()
        setMessage(errorData.error || 'Failed to add school')
      }
    } catch (error) {
      setMessage('An error occurred while adding the school')
      console.error('Error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
            Add New School
          </h1>
          
          {message && (
            <div className={`mb-4 p-3 sm:p-4 rounded-md text-sm sm:text-base ${
              message.includes('successfully') 
                ? 'bg-green-50 text-green-800 border border-green-200' 
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
            {/* School Name */}
            <div>
              <label className="form-label text-sm sm:text-base">School Name *</label>
              <input
                type="text"
                {...register('name', { 
                  required: 'School name is required',
                  minLength: { value: 2, message: 'Name must be at least 2 characters' }
                })}
                className={`form-input text-sm sm:text-base ${errors.name ? 'border-red-500' : ''}`}
                placeholder="Enter school name"
              />
              {errors.name && (
                <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="form-label text-sm sm:text-base">Address *</label>
              <textarea
                {...register('address', { 
                  required: 'Address is required',
                  minLength: { value: 10, message: 'Address must be at least 10 characters' }
                })}
                rows="3"
                className={`form-input text-sm sm:text-base ${errors.address ? 'border-red-500' : ''}`}
                placeholder="Enter school address"
              />
              {errors.address && (
                <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.address.message}</p>
              )}
            </div>

            {/* City and State Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* City */}
              <div>
                <label className="form-label text-sm sm:text-base">City *</label>
                <input
                  type="text"
                  {...register('city', { 
                    required: 'City is required',
                    minLength: { value: 2, message: 'City must be at least 2 characters' }
                  })}
                  className={`form-input text-sm sm:text-base ${errors.city ? 'border-red-500' : ''}`}
                  placeholder="Enter city name"
                />
                {errors.city && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.city.message}</p>
                )}
              </div>

              {/* State */}
              <div>
                <label className="form-label text-sm sm:text-base">State *</label>
                <input
                  type="text"
                  {...register('state', { 
                    required: 'State is required',
                    minLength: { value: 2, message: 'State must be at least 2 characters' }
                  })}
                  className={`form-input text-sm sm:text-base ${errors.state ? 'border-red-500' : ''}`}
                  placeholder="Enter state name"
                />
                {errors.state && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.state.message}</p>
                )}
              </div>
            </div>

            {/* Contact and Email Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Contact Number */}
              <div>
                <label className="form-label text-sm sm:text-base">Contact Number *</label>
                <input
                  type="tel"
                  {...register('contact', { 
                    required: 'Contact number is required',
                    pattern: { 
                      value: /^[0-9]{10,15}$/, 
                      message: 'Please enter a valid contact number (10-15 digits)' 
                    }
                  })}
                  className={`form-input text-sm sm:text-base ${errors.contact ? 'border-red-500' : ''}`}
                  placeholder="Enter contact number"
                />
                {errors.contact && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.contact.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="form-label text-sm sm:text-base">Email ID *</label>
                <input
                  type="email"
                  {...register('email_id', { 
                    required: 'Email is required',
                    pattern: { 
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
                      message: 'Please enter a valid email address' 
                    }
                  })}
                  className={`form-input text-sm sm:text-base ${errors.email_id ? 'border-red-500' : ''}`}
                  placeholder="Enter email address"
                />
                {errors.email_id && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.email_id.message}</p>
                )}
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="form-label text-sm sm:text-base">School Image *</label>
              <input
                type="file"
                accept="image/*"
                {...register('image', { 
                  required: 'School image is required',
                  validate: (value) => {
                    if (value && value[0]) {
                      const file = value[0]
                      const maxSize = 5 * 1024 * 1024 // 5MB
                      if (file.size > maxSize) {
                        return 'Image size should be less than 5MB'
                      }
                      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
                      if (!validTypes.includes(file.type)) {
                        return 'Please upload a valid image file (JPEG, PNG, or WebP)'
                      }
                    }
                    return true
                  }
                })}
                className={`form-input text-sm sm:text-base ${errors.image ? 'border-red-500' : ''}`}
              />
              {errors.image && (
                <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.image.message}</p>
              )}
              <p className="mt-1 text-xs sm:text-sm text-gray-500">
                Accepted formats: JPEG, PNG, WebP. Max size: 5MB
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
              <button
                type="button"
                onClick={() => reset()}
                className="w-full sm:w-auto px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200 text-sm sm:text-base"
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto btn-primary disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {isSubmitting ? 'Adding School...' : 'Add School'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
