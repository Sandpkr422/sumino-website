import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// Mock AI responder matching the guidelines
function getAiResponse(userMsg: string, profileId: string, language: string) {
  const queryNormalized = userMsg.toLowerCase();
  let responseText = "";
  let sourceRef = "";

  if (language === "Hindi") {
    if (queryNormalized.includes("bp") || queryNormalized.includes("बीपी") || queryNormalized.includes("रक्तचाप")) {
      if (profileId === "father") {
        responseText = "राजेश जी का आज का रक्तचाप 142/92 mmHg है। यह स्टेज 1 हाइपरटेंशन (उच्च रक्तचाप) को दर्शाता है। पिछले 3 दिनों में सिस्टोलिक मान थोड़ा ऊपर की ओर बढ़ा है। कृपया सुनिश्चित करें कि वे नमक का सेवन कम करें और सुबह की दवा Amlodipine समय पर लें।";
        sourceRef = "भारतीय आयुर्विज्ञान अनुसंधान परिषद (ICMR) उच्च रक्तचाप दिशानिर्देश 2024, खंड 5";
      } else {
        responseText = "आपका ब्लड प्रेशर वर्तमान में सामान्य सीमा में है। निवारक स्वास्थ्य के लिए, दैनिक आहार में 5 ग्राम से कम नमक लें और नियमित योग करें।";
        sourceRef = "WHO कार्डियोवैस्कुलर प्रिवेंशन गाइडलाइन 2025";
      }
    } else if (queryNormalized.includes("sugar") || queryNormalized.includes("शुगर") || queryNormalized.includes("मधुमेह")) {
      responseText = "खाली पेट (Fasting) शुगर 100-125 mg/dL को प्रीडायबिटीज कहा जाता है और 126 से ऊपर को मधुमेह। आपके कार्बोहाइड्रेट सेवन को ट्रैक करना और खाने के बाद 30 मिनट टहलना शुगर स्पाइक्स को कम करने में मदद करता है।";
      sourceRef = "राष्ट्रीय मधुमेह नियंत्रण दिशानिर्देश, भारत";
    } else {
      responseText = "मैं समझता हूँ। आपके पारिवारिक स्वास्थ्य इतिहास और आज के लॉग्स के आधार पर, आपके सभी पैरामीटर्स सामान्य की ओर हैं। क्या आप किसी विशिष्ट रिपोर्ट या माता-पिता की दवा के बारे में पूछना चाहते हैं?";
      sourceRef = "सुमिनो क्लीनिकल नॉलेज बेस";
    }
  } else {
    // English
    if (queryNormalized.includes("why is my bp high") || queryNormalized.includes("bp") || queryNormalized.includes("blood pressure")) {
      if (profileId === "father") {
        responseText = "Rajesh's blood pressure is currently 142/92 mmHg. According to clinical standards, this is classified as Stage 1 Hypertension. Factors influencing this trend could be cumulative sodium retention, sleep quality (which was short last night at 5.8 hours), or hydration deficit. Ensure Amlodipine is taken consistently.";
        sourceRef = "AHA/ACC Hypertension Guidelines, Sec 3";
      } else {
        responseText = "Priya, your current blood pressure (118/76) is optimal. The American Heart Association defines normal BP as <120/80 mmHg. To maintain this, balance your screen fatigue and continue sodium monitoring.";
        sourceRef = "ACC/AHA Guidelines for Preventive Cardiology 2024";
      }
    } else if (queryNormalized.includes("hba1c") || queryNormalized.includes("sugar") || queryNormalized.includes("glucose")) {
      if (profileId === "father") {
        responseText = "Rajesh's Fasting Glucose is 158 mg/dL. This is elevated and maps to diabetic glycemic ranges. His HbA1c in the last report was 6.8%. We recommend prioritizing a carb-restricted diabetic diet, scheduling a physician consultation for Metformin XR dose validation, and tracking active post-meal walking logs.";
        sourceRef = "ADA Clinical Standards for Diabetes Management 2025";
      } else {
        responseText = "Priya, your fasting blood sugar is 104 mg/dL. Values between 100-125 mg/dL indicate Pre-diabetes (impaired fasting glucose). We can target resetting this below 99 mg/dL through 150 minutes of weekly zone-2 cardio and reducing glycemic-index meals. No pharmaceutical treatment is currently indicated.";
        sourceRef = "ICMR Guidelines for Management of Type 2 Diabetes 2025";
      }
    } else if (queryNormalized.includes("what should i improve first") || queryNormalized.includes("improve") || queryNormalized.includes("score")) {
      if (profileId === "father") {
        responseText = "To improve Rajesh's Health Score (currently 56), the primary areas to address are: 1. BP Stabilization (targeting <130/80), 2. Sleep duration (increasing from 5.8 to 7 hours), and 3. Atorvastatin compliance at night (currently marked untaken). Stabilizing these will raise his health score to 70+ in 14 days.";
        sourceRef = "SUMINO Metabolic Wellness Engine";
      } else {
        responseText = "Priya, to raise your score from 84 to 90+, focus on: 1. Completing your hydration goal (currently 1500ml of 3000ml), and 2. Resetting your daily steps baseline back to 10,000 steps. These lifestyle factors directly impact fasting insulin levels.";
        sourceRef = "SUMINO Adaptive Retention Engine";
      }
    } else if (queryNormalized.includes("discuss with my doctor") || queryNormalized.includes("doctor") || queryNormalized.includes("consult")) {
      responseText = "Here are 3 specific items to share at your next general physician visit:\n1. The 10-day rising trend in morning systolic values (135 to 144 mmHg).\n2. Fasting glucose averages remaining above 140 mg/dL.\n3. The current drug compliance score of 66% due to missed statins. I have generated a Doctor Preparation Card for you in the Reports tab.";
      sourceRef = "SUMINO Clinical Integration Engine";
    } else {
      responseText = "I've logged that. Looking at the longitudinal health parameters of your family members, everything is stable except your father's BP spikes. Let's make sure he tracks his evening parameters. Would you like me to translate any laboratory results?";
      sourceRef = "SUMINO Knowledge Repository";
    }
  }

  return { text: responseText, source: sourceRef };
}

// POST: Process chat message and get AI answer
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, profileId, language } = body;

    if (!message || !profileId) {
      return NextResponse.json(
        { message: "Missing required fields: message, profileId" },
        { status: 400 }
      );
    }

    const aiAnswer = getAiResponse(message, profileId, language || "English");
    const timestamp = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

    // Save to Supabase "chat_messages" table if database is active
    const { error } = await supabase
      .from("chat_messages")
      .insert([
        {
          profile_id: profileId,
          role: "user",
          message: message,
          created_at: new Date().toISOString()
        },
        {
          profile_id: profileId,
          role: "assistant",
          message: aiAnswer.text,
          source_citation: aiAnswer.source,
          created_at: new Date().toISOString()
        }
      ]);

    if (error) {
      console.warn("Supabase insert failed for chat. Table may not exist yet. Falling back to API memory.", error.message);
    }

    return NextResponse.json({
      status: "Success",
      response: {
        role: "assistant",
        text: aiAnswer.text,
        source: aiAnswer.source,
        time: timestamp
      }
    });

  } catch (err: any) {
    return NextResponse.json(
      { message: "Server error", error: err.message },
      { status: 500 }
    );
  }
}
