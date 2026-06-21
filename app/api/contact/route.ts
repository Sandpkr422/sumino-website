import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { supabase } from "@/lib/supabaseClient";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, category, message } = body;

    // Server-side validations
    if (!name || !name.trim()) {
      return NextResponse.json({ message: "Name is required." }, { status: 400 });
    }
    if (!email || !email.trim() || !email.includes("@")) {
      return NextResponse.json({ message: "A valid email is required." }, { status: 400 });
    }
    if (!message || !message.trim()) {
      return NextResponse.json({ message: "Message details are required." }, { status: 400 });
    }

    const newInquiry = {
      id: `inq_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      category: category,
      message: message.trim(),
      timestamp: new Date().toISOString(),
    };

    // Check if Supabase is configured
    const isSupabaseConfigured =
      process.env.SUPABASE_URL &&
      process.env.SUPABASE_ANON_KEY &&
      !process.env.SUPABASE_URL.includes("your-project-id");

    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase
          .from("contacts")
          .insert([
            {
              name: newInquiry.name,
              email: newInquiry.email,
              category: newInquiry.category,
              message: newInquiry.message,
            },
          ]);

        if (error) {
          console.error(
            "Supabase contacts insert error, failing back to local file storage:",
            error.message
          );
        } else {
          // Success: Data inserted directly into Supabase 'contacts' table
          return NextResponse.json(
            { success: true, database: "supabase", inquiry: newInquiry },
            { status: 201 }
          );
        }
      } catch (dbErr) {
        console.error(
          "Supabase write connection for contacts failed. Falling back to file storage.",
          dbErr
        );
      }
    }

    // Fallback: File-based Local JSON Database
    const dataDir = path.join(process.cwd(), "data");
    await fs.mkdir(dataDir, { recursive: true });

    const filePath = path.join(dataDir, "contacts.json");
    let existingInquiries = [];

    try {
      const fileContents = await fs.readFile(filePath, "utf-8");
      existingInquiries = JSON.parse(fileContents);
    } catch (err) {
      // File does not exist, initialize empty array
    }

    existingInquiries.push(newInquiry);
    await fs.writeFile(filePath, JSON.stringify(existingInquiries, null, 2), "utf-8");

    return NextResponse.json(
      { success: true, database: "local_json", inquiry: newInquiry },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error occurred. Failed to submit contact form." },
      { status: 500 }
    );
  }
}
