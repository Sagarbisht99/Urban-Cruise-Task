import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/lib/dbConnect";
import Lead from "@/models/Lead";

interface UserColumnData {
  columnId: string;
  stringValue?: string;
}

interface GoogleLeadPayload {
  leadId: string;
  apiVersion: string;
  formId: string;
  userColumnData?: UserColumnData[];
}

// ✅ Step 1: Webhook verification
export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const challenge = searchParams.get("challenge");

  if (challenge) {
    return new NextResponse(challenge, { status: 200 });
  }

  return new NextResponse("No challenge found", { status: 400 });
}

// ✅ Step 2: Handle lead data (POST)
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body: GoogleLeadPayload = await req.json();

    console.log("✅ New Lead Received:", body);

    // Extract user data safely
    const userData: Record<string, string | undefined> = {};
    body.userColumnData?.forEach((col) => {
      userData[col.columnId] = col.stringValue;
    });

    // Connect to database
    await connectDb();

    // Create lead object matching the Lead model schema
    const leadData = {
      name: userData.FULL_NAME || "",
      email: userData.EMAIL || "",
      contact: userData.PHONE_NUMBER || "",
      source: "google" as const,
    };

    // Validate required fields
    if (!leadData.name || !leadData.email || !leadData.contact) {
      console.error("❌ Missing required fields:", leadData);
      return NextResponse.json(
        { error: "Missing required fields: name, email, or contact" },
        { status: 400 }
      );
    }

    // Check if lead already exists (email is unique)
    const existingLead = await Lead.findOne({ email: leadData.email });
    if (existingLead) {
      console.log("⚠️ Lead already exists with email:", leadData.email);
      return NextResponse.json(
        { error: "Lead already exists with this email" },
        { status: 409 }
      );
    }

    // Save lead to database
    const newLead = new Lead(leadData);
    const savedLead = await newLead.save();

    console.log("✅ Lead saved successfully to database:", savedLead);

    return NextResponse.json({ 
      success: true, 
      leadId: savedLead._id,
      message: "Lead saved successfully" 
    }, { status: 201 });

  } catch (error: unknown) {
    console.error("❌ Error processing lead:", error);
    
    // Handle specific MongoDB errors
    if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
      return NextResponse.json(
        { error: "Lead already exists with this email" },
        { status: 409 }
      );
    }

    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

    return NextResponse.json(
      { 
        error: "Failed to process lead", 
        details: errorMessage 
      },
      { status: 500 }
    );
  }
}
