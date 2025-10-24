import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/lib/dbConnect";
import Lead from "@/models/Lead";

// Define payload types (simplified)
interface FacebookChange {
  field: string;
  value: {
    ad_id: string;
    form_id: string;
    leadgen_id: string;
    created_time: number;
    page_id: string;
  };
}

interface FacebookWebhookPayload {
  object: string;
  entry: {
    id: string;
    time: number;
    changes: FacebookChange[];
  }[];
}

// 🔹 STEP 1: Facebook Webhook Verification
export async function GET(req: NextRequest): Promise<NextResponse> {
  const url = new URL(req.url);

  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");

  // Facebook sends these params during verification
  const VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN;

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("✅ Facebook webhook verified successfully");
    return new NextResponse(challenge ?? "", { status: 200 });
  } else {
    console.warn("❌ Facebook webhook verification failed");
    return new NextResponse("Verification failed", { status: 403 });
  }
}

// 🔹 STEP 2: Handle Facebook Lead Event
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body: FacebookWebhookPayload = await req.json();

    console.log("✅ Facebook Webhook Received:", JSON.stringify(body, null, 2));

    if (!body.entry?.length) {
      return NextResponse.json({ message: "No entries found" }, { status: 400 });
    }

    // Connect to database
    await connectDb();

    // Loop through each lead event
    for (const entry of body.entry) {
      for (const change of entry.changes) {
        const { leadgen_id } = change.value;

        try {
          // Fetch lead data from Facebook Graph API
          const accessToken = process.env.FB_ACCESS_TOKEN;
          if (!accessToken) {
            console.error("❌ Facebook access token not configured");
            continue;
          }

          const leadDataResponse = await fetch(
            `https://graph.facebook.com/v18.0/${leadgen_id}?access_token=${accessToken}`
          );

          if (!leadDataResponse.ok) {
            console.error("❌ Failed to fetch lead data from Facebook:", leadDataResponse.statusText);
            continue;
          }

          const leadData = await leadDataResponse.json();
          console.log("📋 Facebook Lead Data:", leadData);

          // Extract lead information from Facebook response
          const fieldData = leadData.field_data || [];
          const userData: Record<string, string> = {};
          
          fieldData.forEach((field: { name: string; values?: string[] }) => {
            userData[field.name] = field.values?.[0] || '';
          });

          // Map Facebook data to our Lead model
          const leadInfo = {
            name: userData.full_name || userData.first_name + ' ' + userData.last_name || '',
            email: userData.email || '',
            contact: userData.phone_number || userData.phone || '',
            source: 'facebook' as const,
          };

          // Validate required fields
          if (!leadInfo.name || !leadInfo.email || !leadInfo.contact) {
            console.error("❌ Missing required fields for Facebook lead:", leadInfo);
            continue;
          }

          // Check if lead already exists (email is unique)
          const existingLead = await Lead.findOne({ email: leadInfo.email });
          if (existingLead) {
            console.log("⚠️ Facebook lead already exists with email:", leadInfo.email);
            continue;
          }

          // Save lead to database
          const newLead = new Lead(leadInfo);
          const savedLead = await newLead.save();

          console.log("✅ Facebook lead saved successfully:", savedLead);

        } catch (leadError) {
          console.error("❌ Error processing individual Facebook lead:", leadError);
          // Continue processing other leads even if one fails
        }
      }
    }

    return NextResponse.json({ success: true, message: "Facebook leads processed" });
  } catch (error: unknown) {
    console.error("❌ Error in Facebook webhook:", error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return NextResponse.json(
      { error: "Failed to process Facebook lead", details: errorMessage },
      { status: 500 }
    );
  }
}
