import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// Define the SubscriptionData type
interface SubscriptionData {
  firstName: string;
  lastName: string;
  state: string;
  city: string;
  address: string;
  pinCode: string;
  email: string;
  phoneNumber: string;
  petType: string;
  petAge: string;
  petWeight: string;
  vaccinationStatus: string;
  recentIllness: string;
  medicalHistory6Months: string;
  petBloodType: string; // Added field for Pet Blood Type
  certificateLink: string; // Added field for Certificate Link
}

// Handler for POST requests
export async function POST(req: NextRequest) {
  const data: SubscriptionData = await req.json();

  const {
    firstName,
    lastName,
    state,
    city,
    address,
    pinCode,
    email,
    phoneNumber,
    petType,
    petAge,
    petWeight,
    vaccinationStatus,
    recentIllness,
    medicalHistory6Months,
    petBloodType, // Extract petBloodType from the request data
    certificateLink // Extract certificateLink from the request data
  } = data;

  // Validate required fields
  if (
    !firstName ||
    !lastName ||
    !state ||
    !city ||
    !address ||
    !pinCode ||
    !email ||
    !email.includes('@') ||
    !phoneNumber ||
    !petType ||
    !petAge ||
    !petWeight ||
    !vaccinationStatus ||
    !recentIllness ||
    !medicalHistory6Months ||
    !petBloodType || // Ensure petBloodType is also validated
    !certificateLink // Ensure certificateLink is also validated
  ) {
    return NextResponse.json({ message: 'Invalid input. Please fill all the fields correctly.' }, { status: 422 });
  }

  const client = new MongoClient(process.env.MONGODB_URI as string);

  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection('subscribers');

    await collection.insertOne({
      firstName,
      lastName,
      state,
      city,
      address,
      pinCode,
      email,
      phoneNumber,
      petType,
      petAge: parseInt(petAge, 10), // ensure petAge is stored as a number
      petWeight: parseFloat(petWeight), // ensure petWeight is stored as a number
      vaccinationStatus,
      recentIllness,
      medicalHistory6Months,
      petBloodType, // Store petBloodType in the database
      certificateLink // Store certificateLink in the database
    });

    client.close();

    return NextResponse.json({ message: 'Stored successfully!' }, { status: 201 });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    return NextResponse.json({ message: 'Storing subscription failed.' }, { status: 500 });
  }
}
