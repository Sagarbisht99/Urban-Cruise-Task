import mongoose from "mongoose";
import Lead from "@/models/Lead";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const leads = await Lead.find();
    console.log(leads)
    return NextResponse.json(leads);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}