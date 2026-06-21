export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
  };
  content: string;
  primaryKeyword: string;
}

export const mockBlogs: BlogPost[] = [
  {
    slug: "the-rise-of-the-prevention-economy",
    title: "The Rise of the Prevention Economy: Why Indian Healthcare Must Move Home",
    excerpt: "Over 65% of health spend in India is reactive out-of-pocket medical expense. Discover why shifting care into the household is key to health security.",
    category: "Preventive Healthcare",
    date: "June 10, 2026",
    readTime: "5 min read",
    primaryKeyword: "prevention economy india",
    author: {
      name: "Dr. Ananya Sharma",
      role: "Geriatric Medicine Specialist"
    },
    content: `
      <p>Every year, millions of Indian households encounter sudden medical emergencies. But the truth is, most of these situations aren't sudden. They are the culmination of slow, unnoticed changes in vital indicators, sleeping patterns, energy levels, or minor symptoms that happen quietly over weeks.</p>
      
      <h3>The Reactive Cost Burden in Indian Homes</h3>
      <p>Traditional healthcare is designed to treat you only after symptoms become severe enough to require a hospital visit. This reactive model is expensive, stressful, and carries high out-of-pocket medical debt risks. In fact, out-of-pocket health expenditure in India exceeds $45B+ annually.</p>
      
      <h3>Moving From Reaction to Prevention</h3>
      <p>The solution lies in the <strong>prevention economy</strong>. By bringing simple, non-invasive health monitoring into the household, caregivers can establish baseline parameters for resting heart rate, sleep quality, and daily complaints. Catching subtle, downward trends early allows families to schedule routine GP consultations rather than late-night emergency runs.</p>
      
      <h3>Why Prevention Starts at Home</h3>
      <p>Home-based monitoring isn't about self-diagnosis. It is about creating a longitudinal health timeline. When you visit your general physician with three weeks of clean vitals charts, they have the context needed to make early, life-saving clinical adjustments. This is the future of healthcare in India.</p>
    `
  },
  {
    slug: "monitoring-elderly-parents-remotely",
    title: "Monitoring Elderly Parents Remotely: Essential Metrics for Long-Distance Caregivers",
    excerpt: "Living in another city? Learn how to track resting heart rate, sleep patterns, and daily energy levels to proactively protect your aging parents.",
    category: "Elderly Care",
    date: "June 08, 2026",
    readTime: "6 min read",
    primaryKeyword: "monitoring elderly parents remotely",
    author: {
      name: "Dr. Rajesh Verma",
      role: "Preventive Cardiologist"
    },
    content: `
      <p>As our parents age, keeping tabs on their health becomes a primary concern—especially for the millions of working professionals who live in different cities. While regular phone calls help, they often miss silent symptoms like fluid retention, cardiac strain, or sleep decay.</p>
      
      <h3>Key Metrics to Track Remotely</h3>
      <ul>
        <li><strong>Resting Heart Rate Trends</strong>: A slow, progressive increase in resting pulse over two weeks can flag cardiovascular fatigue or silent infections.</li>
        <li><strong>Sleep Efficiency</strong>: Sleep disruptions in seniors often precede cognitive or metabolic changes.</li>
        <li><strong>Daily Energy Indicators</strong>: Logging minor daily complaints (e.g., shortness of breath or dizziness) provides warnings long before emergency calls are necessary.</li>
      </ul>
      
      <h3>Creating a Supportive Routine</h3>
      <p>Work with your parents to set up simple, weekly checks. Encourage them to use digital vitals cuffs and log parameters in a shared family dashboard. This bridges the physical distance, offering caregivers peace of mind and seniors a proactive safety net.</p>
    `
  },
  {
    slug: "managing-hypertension-at-home",
    title: "Managing Hypertension at Home: Why Single BP Readings in Clinics Are Insufficient",
    excerpt: "White-coat hypertension and isolated blood pressure readings lead to diagnostic gaps. Discover the clinical value of continuous home tracking.",
    category: "Chronic Disease",
    date: "May 28, 2026",
    readTime: "4 min read",
    primaryKeyword: "home blood pressure monitoring vs clinic",
    author: {
      name: "Dr. Ananya Sharma",
      role: "Geriatric Medicine Specialist"
    },
    content: `
      <p>Hypertension is often called the silent killer because it rarely shows severe symptoms until a crisis occurs. For millions of Indians, managing blood pressure relies on occasional checkups at a local clinic. However, clinical studies show that single readings can be highly misleading.</p>
      
      <h3>The 'White-Coat' and 'Masked' BP Dilemma</h3>
      <p>Some patients experience elevated blood pressure in clinical settings due to anxiety (white-coat hypertension), while others show normal readings in clinic but spike at home (masked hypertension). Single readings completely miss these variations.</p>
      
      <h3>The Power of Continuous Home Logs</h3>
      <p>Home blood pressure monitoring provides a truer picture of cardiovascular health. Tracking pressure at the same time daily—especially when resting—highlights arterial stiffness trends. Share these longitudinal charts with your doctor to help them optimize dosage and diagnostic decisions.</p>
    `
  },
  {
    slug: "predicting-diabetes-early-warning",
    title: "Predicting Diabetes: The Crucial Warning Window Before Pre-Diabetes Escalates",
    excerpt: "Pre-diabetes is a fully reversible window. Learn what home indicators track metabolic shifts and how lifestyle choices reverse chronic progression.",
    category: "Chronic Disease",
    date: "May 15, 2026",
    readTime: "5 min read",
    primaryKeyword: "diabetes early warning window",
    author: {
      name: "Dr. Amit Patel",
      role: "Endocrinologist"
    },
    content: `
      <p>India is facing a metabolic health crisis, with millions of adults currently living with pre-diabetes. What many do not realize is that pre-diabetes represents a crucial warning window. It is the period where metabolic decline is fully reversible before permanent pancreatic fatigue occurs.</p>
      
      <h3>Spotting Metabolic Warning Signs</h3>
      <p>Common signs like slow energy crashes, resting heart rate changes, or increased weight round the waist indicate insulin resistance. Tracking these lifestyle factors alongside routine HbA1c panels gives caregivers a clear picture of metabolic trends.</p>
      
      <h3>Simple Tweaks that Reverse Decline</h3>
      <p>Reversing pre-diabetes doesn't require extreme diets. Focus on structured micro-habits: a short walk after dinners, balancing carbs with proteins, and securing regular deep sleep cycles. Proactive lifestyle monitoring can reverse metabolic indicators within months.</p>
    `
  },
  {
    slug: "track-child-growth-milestones",
    title: "Tracking Growth Milestones: A Digital Guide for New Parents in India",
    excerpt: "Pediatric health is about more than height and weight checkups. Discover the vital markers that flag developmental and nutritional trends in children.",
    category: "Child Health",
    date: "May 02, 2026",
    readTime: "5 min read",
    primaryKeyword: "track child growth milestones",
    author: {
      name: "Dr. Sarah D'Souza",
      role: "Pediatric Consultant"
    },
    content: `
      <p>For new parents, watching a child grow is an exciting journey. However, keeping track of pediatric guidelines can feel stressful. Growth tracking isn't just about weight checkups; it is about tracking key developmental, immunization, and nutritional baselines.</p>
      
      <h3>Milestones that Matter</h3>
      <p>Track motor skill progress, sleep cycle baselines, speech beginnings, and nutrition indicators. Spotting early delays or sudden changes in appetite/vital parameters helps parents consult their pediatrician before concerns escalate.</p>
      
      <h3>Building a Digital Growth Chart</h3>
      <p>Using a secure family dashboard, log vaccine dates, developmental milestones, and daily activity. A continuous growth chart helps parents coordinate with pediatricians, ensuring children meet their growth potentials safely.</p>
    `
  }
];
