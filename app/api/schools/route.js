import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || "school_management";

async function getConnection() {
  try {
    console.log('🔌 Attempting MongoDB connection...');
    console.log('📊 Database:', MONGODB_DB);
    console.log('🔗 URI:', MONGODB_URI ? 'Connected' : 'Not found');
    
    const client = await MongoClient.connect(MONGODB_URI);
    console.log('✅ MongoDB connected successfully!');
    
    const db = client.db(MONGODB_DB);
    console.log('📁 Using database:', db.databaseName);
    
    return { client, db };
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    throw error;
  }
}

async function createCollectionIfNotExists(db) {
  try {
    console.log('📋 Checking if schools collection exists...');
    const collections = await db.listCollections({ name: 'schools' }).toArray();
    
    if (collections.length === 0) {
      console.log('📝 Creating schools collection...');
      await db.createCollection('schools');
      console.log('✅ Schools collection created successfully!');
    } else {
      console.log('✅ Schools collection already exists');
    }
  } catch (error) {
    console.error('❌ Error with collection setup:', error);
    throw error;
  }
}

export async function GET() {
  let client;
  try {
    console.log('📥 GET request received - fetching schools...');
    const { client: mongoClient, db } = await getConnection();
    client = mongoClient;
    
    await createCollectionIfNotExists(db);
    
    const schools = await db.collection('schools').find({}).sort({ createdAt: -1 }).toArray();
    console.log(`✅ Successfully fetched ${schools.length} schools`);
    
    return NextResponse.json(schools);
  } catch (error) {
    console.error('❌ Error fetching schools:', error);
    return NextResponse.json({ error: 'Failed to fetch schools' }, { status: 500 });
  } finally {
    if (client) {
      await client.close();
      console.log('🔌 MongoDB connection closed');
    }
  }
}

export async function POST(request) {
  let client;
  try {
    console.log('📤 POST request received - adding new school...');
    
    const formData = await request.formData();
    const schoolData = {
      id: formData.get('id'),
      name: formData.get('name'),
      address: formData.get('address'),
      city: formData.get('city'),
      state: formData.get('state'),
      contact: formData.get('contact'),
      email_id: formData.get('email_id'),
      createdAt: new Date()
    };

    // Handle image as base64
    const imageFile = formData.get('image');
    if (imageFile && imageFile.size > 0) {
      console.log('🖼️ Processing image upload...');
      
      // Convert image to base64
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64String = `data:${imageFile.type};base64,${buffer.toString('base64')}`;
      
      schoolData.image = base64String;
      console.log('✅ Image converted to base64 successfully');
    } else {
      console.log('⚠️ No image provided, skipping image processing');
      schoolData.image = '';
    }

    console.log('📝 School data prepared:', {
      id: schoolData.id,
      name: schoolData.name,
      city: schoolData.city,
      hasImage: !!schoolData.image
    });

    const { client: mongoClient, db } = await getConnection();
    client = mongoClient;
    
    await createCollectionIfNotExists(db);
    
    const result = await db.collection('schools').insertOne(schoolData);
    console.log('✅ School added successfully with ID:', result.insertedId);
    
    return NextResponse.json({ 
      success: true, 
      message: 'School added successfully',
      schoolId: result.insertedId 
    });
    
  } catch (error) {
    console.error('❌ Error adding school:', error);
    return NextResponse.json({ 
      error: 'Failed to add school',
      details: error.message 
    }, { status: 500 });
  } finally {
    if (client) {
      await client.close();
      console.log('🔌 MongoDB connection closed');
    }
  }
}
