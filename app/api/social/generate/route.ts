import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

interface ResearchReport {
  id: string;
  topic: string;
  category: string;
  summary: string;
  keyFindings: string[];
  preventiveRecommendations: string[];
  clinicalGuidelines: string[];
  sources: { title: string; journal: string; pubDate: string; link: string }[];
  timestamp: string;
}

interface VideoScript {
  title: string;
  hook: string;
  body: string;
  cta: string;
}

interface GeneratedPost {
  id: string;
  researchId: string;
  topic: string;
  category: string;
  tone: string;
  status: "draft" | "scheduled" | "published";
  scheduledDate: string | null;
  twitterThread: string[];
  linkedinPost: string;
  videoScript: VideoScript;
  imagePrompt: string;
  createdAt: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { researchId, tone = "Empathetic" } = body;
    const authHeader = request.headers.get("Authorization");
    const geminiApiKey = authHeader ? authHeader.replace("Bearer ", "").trim() : "";

    if (!researchId) {
      return NextResponse.json({ message: "Research ID is required." }, { status: 400 });
    }

    // 1. Read research report from local file
    const dataDir = path.join(process.cwd(), "data");
    const researchFilePath = path.join(dataDir, "social_research.json");
    
    let researchList: ResearchReport[] = [];
    try {
      const fileContents = await fs.readFile(researchFilePath, "utf-8");
      researchList = JSON.parse(fileContents);
    } catch (err) {
      return NextResponse.json({ message: "Research data file not found. Please run research first." }, { status: 404 });
    }

    const report = researchList.find((r) => r.id === researchId);
    if (!report) {
      return NextResponse.json({ message: `Research report with ID ${researchId} not found.` }, { status: 404 });
    }

    let twitterThread: string[] = [];
    let linkedinPost = "";
    let videoScript: VideoScript = { title: "", hook: "", body: "", cta: "" };
    let imagePrompt = "";

    // 2. If Gemini API key is provided, use it to generate the post drafts
    if (geminiApiKey && !geminiApiKey.includes("YOUR_API_KEY")) {
      try {
        const prompt = `You are a Senior Social Media Strategist and Copywriter for SUMINO, a family health prevention platform.
We have researched the topic: "${report.topic}" (${report.category}).
Here is the research report summary and details:
Summary: ${report.summary}
Key Findings:
${report.keyFindings.map((f) => `- ${f}`).join("\n")}
Preventive Tips:
${report.preventiveRecommendations.map((r) => `- ${r}`).join("\n")}
Guidelines:
${report.clinicalGuidelines.map((g) => `- ${g}`).join("\n")}

Generate social media drafts in the tone: "${tone}" (e.g. Empathetic, Clinical, Urgent, Informative).
Return a strict JSON format (no markdown code blocks, just raw JSON).
The JSON must have the following structure:
{
  "twitterThread": [
    "Tweet 1 (max 260 chars): Engaging Hook + Statistic. Tag @SuminoHealth. Use 1 emoji.",
    "Tweet 2 (max 260 chars): Explain the hidden problem or symptoms. Cite a finding.",
    "Tweet 3 (max 260 chars): Give 2 practical preventive steps families can take at home.",
    "Tweet 4 (max 260 chars): Reference clinical guidelines (WHO/ICMR) to show credibility.",
    "Tweet 5 (max 260 chars): Call to Action. Encourage joining the waitlist at sumino.in to track vitals early."
  ],
  "linkedinPost": "A longer, professional 3-4 paragraph post. Hook the reader, present the health challenges in India/globally, highlight the scientific/clinical research takeaways, explain why continuous family vitals logging beats emergency care, and end with a strong CTA to partner with us or join our waitlist.",
  "videoScript": {
    "title": "A punchy, viral title for a 60-second video",
    "hook": "First 10 seconds. Visual action description (e.g., [Visual: Close up of alarm clock ringing, phone screen showing high heart rate]) + Voiceover line (e.g., 'If your aging parent\\'s heart rate rose slowly...')",
    "body": "Middle 40 seconds. Describe visual sequence + Voiceover explaining 2 key warnings and what home metrics to track.",
    "cta": "Last 10 seconds. Visual of waitlist link + Voiceover (e.g., 'Don\\'t wait for an emergency. Join the Sumino waitlist today.')"
  },
  "imagePrompt": "A highly detailed, professional AI image generator prompt (DALL-E/Midjourney) matching Sumino\\'s aesthetic: clean medical designs, modern home vitals dashboard, soft studio lighting, harmonious blue and green color palette, realistic, 4k."
}`;

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                responseMimeType: "application/json"
              }
            })
          }
        );

        if (!geminiRes.ok) {
          throw new Error(`Gemini API responded with status ${geminiRes.status}`);
        }

        const geminiData = await geminiRes.json();
        const responseText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "";
        const cleanJSON = JSON.parse(responseText);

        twitterThread = cleanJSON.twitterThread || [];
        linkedinPost = cleanJSON.linkedinPost || "";
        videoScript = cleanJSON.videoScript || { title: "", hook: "", body: "", cta: "" };
        imagePrompt = cleanJSON.imagePrompt || "";
      } catch (geminiErr) {
        console.error("Gemini content generation failed, falling back to local generator:", geminiErr);
        const localDrafts = generateLocalDrafts(report, tone);
        twitterThread = localDrafts.twitterThread;
        linkedinPost = localDrafts.linkedinPost;
        videoScript = localDrafts.videoScript;
        imagePrompt = localDrafts.imagePrompt;
      }
    } else {
      // 3. Fallback: Local High-Fidelity Copywriting Engine
      const localDrafts = generateLocalDrafts(report, tone);
      twitterThread = localDrafts.twitterThread;
      linkedinPost = localDrafts.linkedinPost;
      videoScript = localDrafts.videoScript;
      imagePrompt = localDrafts.imagePrompt;
    }

    const newPost: GeneratedPost = {
      id: `post_${Date.now()}`,
      researchId,
      topic: report.topic,
      category: report.category,
      tone,
      status: "draft",
      scheduledDate: null,
      twitterThread,
      linkedinPost,
      videoScript,
      imagePrompt,
      createdAt: new Date().toISOString()
    };

    // 4. Save to local database (data/social_posts.json)
    const postsFilePath = path.join(dataDir, "social_posts.json");
    let existingPosts: GeneratedPost[] = [];

    try {
      const fileContents = await fs.readFile(postsFilePath, "utf-8");
      existingPosts = JSON.parse(fileContents);
    } catch (err) {
      // File doesn't exist yet
    }

    existingPosts.unshift(newPost);
    await fs.writeFile(postsFilePath, JSON.stringify(existingPosts, null, 2), "utf-8");

    return NextResponse.json({ success: true, post: newPost }, { status: 201 });
  } catch (error: any) {
    console.error("Error in social generate API:", error);
    return NextResponse.json(
      { message: "Server error occurred during content generation.", error: error?.message },
      { status: 500 }
    );
  }
}

// Local high-fidelity copy generator
function generateLocalDrafts(report: ResearchReport, tone: string) {
  const isClinical = tone === "Clinical";
  const isUrgent = tone === "Urgent";
  const isInformative = tone === "Informative";
  
  // Custom templates based on the tone
  let toneEmoji = "❤️";
  let toneIntro = "Healthcare shouldn't begin in the emergency room. It should start at home.";
  
  if (isClinical) {
    toneEmoji = "🔬";
    toneIntro = "Early clinical identification of vital deviations is essential to preventative medicine.";
  } else if (isUrgent) {
    toneEmoji = "🚨";
    toneIntro = "Did you know that 70% of health crises show warning signs weeks before they happen?";
  } else if (isInformative) {
    toneEmoji = "📊";
    toneIntro = "Understanding our family's health patterns is the first step to preventing emergencies.";
  }

  // Create Twitter Thread
  const twitterThread = [
    `1/5 ${toneEmoji} ${toneIntro} Today, we're sharing key insights on early prevention for "${report.topic}". Let's dive into the clinical research. @SuminoHealth`,
    
    `2/5 📊 Key Finding: ${report.keyFindings[0] || "Home vitals and sleep tracking are critical markers."} In healthcare, minor fluctuations over weeks highlight cumulative risk.`,
    
    `3/5 💡 What can you do at home? Here are 2 simple checks:\n- ${report.preventiveRecommendations[0] || "Monitor sleep efficiency metrics."}\n- ${report.preventiveRecommendations[1] || "Establish baseline vitals logs."}`,
    
    `4/5 🩺 Credibility matters. ${report.clinicalGuidelines[0] || "Standard guidelines recommend screening when baseline metrics decline."} Longitudinal context helps your GP treat you better.`,
    
    `5/5 Prevention starts at home. Secure peace of mind for your family and aging parents. Join the SUMINO waitlist today to access early screening tools: https://sumino.in/waitlist 🚀`
  ];

  // Create LinkedIn Post
  const linkedinPost = `🚨 Prevention Starts at Home: Clinical Insights on ${report.topic}

${toneIntro}

For too long, healthcare in India has been reactive—focusing on expensive, stressful clinical treatments only after symptoms become severe. The data shows that out-of-pocket health expenditure exceeds $45B+ annually. We need to move from reaction to prevention.

Our research team summarized these core scientific insights regarding ${report.topic}:
- ${report.keyFindings[0] || "Minor fluctuations in resting vital averages point to cardiac or cognitive strain."}
- ${report.keyFindings[1] || "Single readings fail to capture masked chronic fluctuations that occur at home."}
- ${report.keyFindings[2] || "Reversing health decline is highly achievable during early pre-clinical windows."}

What action can family caregivers take today?
1. ${report.preventiveRecommendations[0] || "Establish a daily resting pulse log."}
2. ${report.preventiveRecommendations[1] || "Watch sleep patterns for progressive decay trends."}
3. ${report.preventiveRecommendations[2] || "Share a longitudinal vital timeline with your GP."}

According to standard medical guidelines, ${report.clinicalGuidelines[0] || "continuous tracking is the best way to support diagnostic accuracy and prevent ICU events."}

At SUMINO, we are building the digital layer for family prevention. Let's make wellness proactive.

👉 Join the Waitlist: https://sumino.in/waitlist
#PreventiveHealthcare #FamilyWellness #HealthTech #Caregiving #DigitalHealth #Sumino`;

  // Create Short Video Script
  const videoScript: VideoScript = {
    title: `How to Spot Warning Signs for ${report.topic}`,
    hook: `[Visual: Close-up of phone displaying Sumino vital dashboard, soft glowing light. Text overlay: 'Don't wait for the ER. Track early.']\nVoiceover: "Did you know that 70% of major health emergencies show warning signs weeks in advance? Here is how to catch them at home."`,
    body: `[Visual: Quick cuts showing: 1. A daughter checking on her aging father. 2. A smartwatch showing resting heart rate trend. 3. Copy of PubMed study "${report.sources[0]?.title || "Preventive Medicine Study"}".]\nVoiceover: "Research shows that sleep efficiency decay and slow vitals deviations are early markers. Tracking a 7-day average resting pulse and sleep cycles reveals patterns your doctor needs to see."`,
    cta: `[Visual: Clean blue-50 screen showing SUMINO logo, web URL sumino.in/waitlist, and a 'Join Waitlist' button.]\nVoiceover: "Protect your parents and children. Join the Sumino waitlist today at sumino.in/waitlist to secure early access. Prevention starts at home."`
  };

  // Create Image Prompt
  const imagePrompt = `A premium, photorealistic editorial image for social media. A clean, modern family health dashboard mockup on a sleek smartphone resting on a wooden bedside table. In the background, a warm, softly blurred image of an elderly grandfather smiling and drinking tea in a cozy Indian living room. Ambient soft studio lighting, professional color grading with harmonious HSL blue and green accents. High-detail, 4k resolution, clean composition.`;

  return {
    twitterThread,
    linkedinPost,
    videoScript,
    imagePrompt
  };
}
