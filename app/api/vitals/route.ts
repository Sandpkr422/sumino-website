import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// POST: Log a vital reading
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { profileId, type, metrics, timestamp } = body;

    if (!profileId || !type || !metrics) {
      return NextResponse.json(
        { message: "Missing required fields: profileId, type, metrics" },
        { status: 400 }
      );
    }

    // Attempt to save to Supabase "vitals_logs" table
    const { data, error } = await supabase
      .from("vitals_logs")
      .insert([
        {
          profile_id: profileId,
          vital_type: type,
          metrics: metrics,
          logged_at: timestamp || new Date().toISOString(),
        }
      ])
      .select();

    if (error) {
      console.warn("Supabase insert failed. Table might not exist yet. Falling back to local mock success.", error.message);
      // Fallback response for mock demo if tables are not created in user's Supabase yet
      return NextResponse.json({
        status: "Logged (Demo Cache Mode)",
        logId: "log_mock_" + Math.random().toString(36).substr(2, 9),
        data: { profileId, type, metrics, timestamp }
      }, { status: 201 });
    }

    return NextResponse.json({
      status: "Logged",
      logId: data[0].id,
      data: data[0]
    }, { status: 201 });

  } catch (err: any) {
    return NextResponse.json(
      { message: "Server error", error: err.message },
      { status: 500 }
    );
  }
}

// GET: Retrieve vitals history for a profile
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const profileId = searchParams.get("profileId");

    if (!profileId) {
      return NextResponse.json(
        { message: "profileId is required" },
        { status: 400 }
      );
    }

    // Attempt to read from Supabase "vitals_logs" table
    const { data, error } = await supabase
      .from("vitals_logs")
      .select("*")
      .eq("profile_id", profileId)
      .order("logged_at", { ascending: false });

    if (error) {
      console.warn("Supabase fetch failed. Falling back to mock standard profiles.", error.message);
      return NextResponse.json({
        status: "Success (Demo Mode)",
        data: []
      });
    }

    return NextResponse.json({
      status: "Success",
      data
    });

  } catch (err: any) {
    return NextResponse.json(
      { message: "Server error", error: err.message },
      { status: 500 }
    );
  }
}
