import { NextResponse } from 'next/server'
import { MongoClient, ObjectId } from 'mongodb'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

// MongoDB configuration
const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_DB = process.env.MONGODB_DB || 'school_management'

// Initialize MongoDB connection
async function getConnection() {
  try {
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not set')
    }
    
    console.log('🔄 Connecting to MongoDB Atlas...')
    console.log('📍 Database:', MONGODB_DB)
    console.log('🌐 URI:', MONGODB_URI.substring(0, 50) + '...')
    
    const client = new MongoClient(MONGODB_URI)
    await client.connect()
    
    console.log('✅ Successfully connected to MongoDB Atlas!')
    console.log('📊 Database:', MONGODB_DB)
    console.log('🔌 Connection established on MongoDB Atlas cloud')
    
    return client
  } catch (error) {
    console.error('❌ MongoDB connection error:', error)
    throw new Error('Failed to connect to MongoDB Atlas')
  }
}

// Create schools collection if it doesn't exist
async function createCollectionIfNotExists(db) {
  try {
    const collections = await db.listCollections().toArray()
    const collectionExists = collections.some(col => col.name === 'schools')
    
    if (!collectionExists) {
      await db.createCollection('schools')
      console.log('📚 Schools collection created successfully')
    } else {
      console.log('📚 Schools collection already exists')
    }
  } catch (error) {
    console.error('Error creating collection:', error)
    throw new Error('Failed to create collection')
  }
}

// GET - Fetch all schools
export async function GET() {
  let client
  try {
    console.log('📡 GET /api/schools - Fetching schools from MongoDB Atlas...')
    client = await getConnection()
    const db = client.db(MONGODB_DB)
    
    await createCollectionIfNotExists(db)
    
    const schools = await db.collection('schools')
      .find({})
      .sort({ createdAt: -1 })
      .toArray()
    
    console.log(`✅ Successfully fetched ${schools.length} schools from MongoDB Atlas`)
    return NextResponse.json(schools)
  } catch (error) {
    console.error('GET error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch schools' },
      { status: 500 }
    )
  } finally {
    if (client) {
      await client.close()
      console.log('🔌 MongoDB connection closed')
    }
  }
}

// POST - Add new school
export async function POST(request) {
  let client
  try {
    console.log('📡 POST /api/schools - Adding new school to MongoDB Atlas...')
    const formData = await request.formData()
    
    // Extract form data
    const name = formData.get('name')
    const address = formData.get('address')
    const city = formData.get('city')
    const state = formData.get('state')
    const contact = formData.get('contact')
    const email_id = formData.get('email_id')
    const imageFile = formData.get('image')
    
    // Validate required fields
    if (!name || !address || !city || !state || !contact || !email_id || !imageFile) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }
    
    // Validate email format
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    if (!emailRegex.test(email_id)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }
    
    // Validate contact number
    const contactRegex = /^[0-9]{10,15}$/
    if (!contactRegex.test(contact)) {
      return NextResponse.json(
        { error: 'Invalid contact number format' },
        { status: 400 }
      )
    }
    
    // Handle image upload
    let imageFileName = ''
    if (imageFile && imageFile.size > 0) {
      try {
        // Create schoolImages directory if it doesn't exist
        const uploadDir = join(process.cwd(), 'public', 'schoolImages')
        await mkdir(uploadDir, { recursive: true })
        
        // Generate unique filename
        const fileExtension = imageFile.name.split('.').pop()
        imageFileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExtension}`
        
        // Save file
        const bytes = await imageFile.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const filePath = join(uploadDir, imageFileName)
        await writeFile(filePath, buffer)
        
        console.log('📸 Image uploaded successfully:', imageFileName)
        
      } catch (error) {
        console.error('Image upload error:', error)
        return NextResponse.json(
          { error: 'Failed to upload image' },
          { status: 500 }
        )
      }
    }
    
    // Save to MongoDB
    client = await getConnection()
    const db = client.db(MONGODB_DB)
    
    await createCollectionIfNotExists(db)
    
    const schoolData = {
      name,
      address,
      city,
      state,
      contact,
      image: imageFileName,
      email_id,
      createdAt: new Date()
    }
    
    console.log('💾 Saving school data to MongoDB Atlas...')
    const result = await db.collection('schools').insertOne(schoolData)
    
    console.log('✅ School added successfully to MongoDB Atlas!')
    console.log('🆔 New school ID:', result.insertedId)
    
    return NextResponse.json({
      message: 'School added successfully',
      id: result.insertedId
    })
    
  } catch (error) {
    console.error('POST error:', error)
    return NextResponse.json(
      { error: 'Failed to add school' },
      { status: 500 }
    )
  } finally {
    if (client) {
      await client.close()
      console.log('🔌 MongoDB connection closed')
    }
  }
}
