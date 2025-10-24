import { NextRequest, NextResponse } from "next/server";
import Lead from "@/models/Lead";
import { connectDb } from "@/lib/dbConnect";

export async function POST(req: NextRequest) {
  try {
    const { name, contact, email } = await req.json();

    // 1. Data Validation: Check if all required fields are present
    if (!name || !contact || !email) {
      return NextResponse.json(
        { error: "Missing required fields: name, contact, and email are required" },
        { status: 400 }
      );
    }

    // 2. Connect to database
    await connectDb();

    // 3. Check if lead already exists (email is unique)
    const existingLead = await Lead.findOne({ email });
    if (existingLead) {
      return NextResponse.json(
        { error: "Lead already exists with this email" },
        { status: 409 }
      );
    }

    // 4. Create Lead Object:
    const leadData = {
      name,
      contact,
      email,
      source: 'website' as const,
    };

    // 5. Save to DB: Lead data ko database mein save karein
    const newLead = new Lead(leadData);
    const savedLead = await newLead.save();

    console.log("✅ Website lead saved successfully:", savedLead);

    return NextResponse.json(
      { 
        message: 'Lead submitted successfully',
        leadId: savedLead._id,
        success: true 
      },
      { status: 201 }
    );

  } catch (error: unknown) {
    console.error("❌ Error saving website lead:", error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return NextResponse.json(
      { 
        error: "Failed to save lead", 
        details: errorMessage 
      },
      { status: 500 }
    );
  }
}