import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

const MOCK_REPORTS_TEMPLATES: Record<string, any> = {
  rep_hba1c: {
    id: "rep_hba1c",
    title: "HbA1c / Glycemic Profile (Thyrocare)",
    date: "12-Jun-2026",
    parameters: [
      { name: "Fasting Blood Sugar", value: "138", unit: "mg/dL", normalRange: "70-100", status: "Abnormal" },
      { name: "HbA1c (Glycated Hb)", value: "6.8", unit: "%", normalRange: "< 5.7", status: "Abnormal" },
      { name: "Estimated Average Glucose", value: "148", unit: "mg/dL", normalRange: "90-120", status: "Borderline" }
    ],
    summary: "Glycemic markers are in the diabetic range. Strong indicator of Insulin Resistance. Corresponds with rising blood pressure values. Immediate lifestyle adaptation in carbohydrates and clinical follow-up is recommended.",
    doctorPrep: [
      "Ask doctor: Should we begin Metformin therapy or adjust current dosing?",
      "Ask doctor: Do we need a continuous glucose monitor (CGM) for 14 days?",
      "Discuss: Home fasting levels average 140 mg/dL over past 7 days."
    ]
  },
  rep_lipid: {
    id: "rep_lipid",
    title: "Lipid Profile Panel (Lal PathLabs)",
    date: "08-May-2026",
    parameters: [
      { name: "Total Cholesterol", value: "245", unit: "mg/dL", normalRange: "< 200", status: "Abnormal" },
      { name: "Triglycerides", value: "188", unit: "mg/dL", normalRange: "< 150", status: "Abnormal" },
      { name: "LDL Cholesterol (Bad)", value: "162", unit: "mg/dL", normalRange: "< 100", status: "Abnormal" },
      { name: "HDL Cholesterol (Good)", value: "42", unit: "mg/dL", normalRange: "> 40", status: "Normal" }
    ],
    summary: "Lipid levels are high risk. Raised LDL levels indicate plaque accumulation risk. Cardiovascular index should be optimized via exercise, omega-3 fat intake, and potential low-dose statin therapy.",
    doctorPrep: [
      "Ask doctor: Is statin treatment necessary given active blood pressure trends?",
      "Ask doctor: Can we achieve correction purely through cardio and strict dietary changes?",
      "Discuss: Family history of heart disease (paternal grandfather)."
    ]
  },
  rep_cbc: {
    id: "rep_cbc",
    title: "Complete Blood Count (Max Lab)",
    date: "15-Apr-2026",
    parameters: [
      { name: "Hemoglobin", value: "14.2", unit: "g/dL", normalRange: "12.0-16.0", status: "Normal" },
      { name: "White Blood Cells (WBC)", value: "7,800", unit: "/cumm", normalRange: "4000-11000", status: "Normal" },
      { name: "Platelets Count", value: "2.4", unit: "Lakhs/cumm", normalRange: "1.5-4.5", status: "Normal" }
    ],
    summary: "All hematological indicators are within normal reference ranges. Oxygen carrying capacity is optimal. No active infectious signs detected.",
    doctorPrep: [
      "Discuss: Regular blood count parameters are optimal.",
      "Check: Standard yearly cell structure trends are stable."
    ]
  }
};

// POST: Parse laboratory report
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { templateId, profileId } = body;

    if (!templateId || !profileId) {
      return NextResponse.json(
        { message: "Missing required fields: templateId, profileId" },
        { status: 400 }
      );
    }

    const report = MOCK_REPORTS_TEMPLATES[templateId];

    if (!report) {
      return NextResponse.json(
        { message: "Invalid templateId specified" },
        { status: 404 }
      );
    }

    // Save report parameters metadata to Supabase "lab_reports" table
    const { error } = await supabase
      .from("lab_reports")
      .insert([
        {
          profile_id: profileId,
          provider_name: report.title.split("(")[0].trim(),
          status: "Parsed",
          ocr_data: report.parameters,
          ai_summary: report.summary,
          uploaded_at: new Date().toISOString()
        }
      ]);

    if (error) {
      console.warn("Supabase insert failed for reports. Table may not exist yet. Falling back to local state.", error.message);
    }

    return NextResponse.json({
      status: "Success",
      report
    });

  } catch (err: any) {
    return NextResponse.json(
      { message: "Server error", error: err.message },
      { status: 500 }
    );
  }
}
