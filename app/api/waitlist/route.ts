import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { supabase } from "@/lib/supabaseClient";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, mobile, city, familySize, category } = body;

    // Server-side validations
    if (!name || !name.trim()) {
      return NextResponse.json({ message: "Name is required." }, { status: 400 });
    }
    if (!email || !email.trim() || !email.includes("@")) {
      return NextResponse.json({ message: "A valid email is required." }, { status: 400 });
    }
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobile || !mobileRegex.test(mobile)) {
      return NextResponse.json({ message: "A valid 10-digit Indian mobile number is required." }, { status: 400 });
    }
    if (!city) {
      return NextResponse.json({ message: "City selection is required." }, { status: 400 });
    }

    const newEntry = {
      id: `wl_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      mobile: mobile.trim(),
      city: city,
      familySize: familySize,
      category: category,
      timestamp: new Date().toISOString(),
    };

    // Check if Supabase is configured (and does not contain placeholder strings)
    const isSupabaseConfigured =
      process.env.SUPABASE_URL &&
      process.env.SUPABASE_ANON_KEY &&
      !process.env.SUPABASE_URL.includes("your-project-id");

    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase
          .from("waitlist")
          .insert([
            {
              name: newEntry.name,
              email: newEntry.email,
              mobile: newEntry.mobile,
              city: newEntry.city,
              family_size: newEntry.familySize,
              category: newEntry.category,
            },
          ]);

        if (error) {
          console.error(
            "Supabase insert error, failing back to local file storage:",
            error.message
          );
        } else {
          // Success: Data inserted directly into Supabase database table
          return NextResponse.json(
            { success: true, database: "supabase", entry: newEntry },
            { status: 201 }
          );
        }
      } catch (dbErr) {
        console.error(
          "Supabase write connection failed. Falling back to file storage.",
          dbErr
        );
      }
    }

    // Fallback: File-based Local JSON Database
    const dataDir = path.join(process.cwd(), "data");
    await fs.mkdir(dataDir, { recursive: true });

    const filePath = path.join(dataDir, "waitlist.json");
    let existingData = [];

    try {
      const fileContents = await fs.readFile(filePath, "utf-8");
      existingData = JSON.parse(fileContents);
    } catch (err) {
      // File does not exist, initialize empty array
    }

    existingData.push(newEntry);
    await fs.writeFile(filePath, JSON.stringify(existingData, null, 2), "utf-8");

    return NextResponse.json(
      { success: true, database: "local_json", entry: newEntry },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error occurred. Failed to submit waitlist form." },
      { status: 500 }
    );
  }
}
