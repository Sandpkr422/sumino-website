export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SUMINO",
    "url": "https://www.sumino.in",
    "logo": "https://www.sumino.in/logo.jpg",
    "description": "SUMINO is a category-defining family health intelligence platform helping Indian households spot health risks early and track daily vital indicators at home.",
    "sameAs": [
      "https://www.facebook.com/profile.php?id=61591036100295",
      "https://www.instagram.com/sumino.in/",
      "https://x.com/suminohealth",
      "https://www.linkedin.com/company/suminohealth/"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "SUMINO",
    "url": "https://www.sumino.in",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.sumino.in/blog?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FaqJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is SUMINO?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SUMINO is a category-defining family health prevention platform. We help households identify health risks early, track vital indicators, and receive preventive guidance. Our focus is keeping families safe and healthy at home, preventing minor issues from escalating into major medical emergencies."
        }
      },
      {
        "@type": "Question",
        "name": "Is SUMINO a hospital, clinic, or telemedicine provider?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. SUMINO is not a hospital, clinic, or telemedicine service. We do not provide clinical diagnoses, treatments, or prescriptions. We are a software-driven preventive intelligence platform that partners with families, doctors, and diagnostics to provide continuous monitoring and warning signs."
        }
      },
      {
        "@type": "Question",
        "name": "What does the tagline \"Prevention Starts at Home\" mean?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It represents our core philosophy: healthcare shouldn't begin when someone enters an emergency room. It should start in the household. By monitoring indicators and building preventative habits at home, families can catch risks long before they require acute clinical treatment."
        }
      },
      {
        "@type": "Question",
        "name": "How does SUMINO help Tier 2, Tier 3, and rural households in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Families in smaller cities and rural areas often face delayed diagnoses due to limited specialist access. SUMINO provides easy-to-use, localized health tracking templates and AI-powered guidelines that help caregivers flag problems early and connect with local general physicians in a timely manner."
        }
      },
      {
        "@type": "Question",
        "name": "How is SUMINO different from regular fitness trackers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Fitness trackers focus on calorie burn, workouts, and individual step counts. SUMINO is a clinical-grade family dashboard. We look at combined family trends, focus on warning signs for elderly care and children, and map metrics to validated preventive healthcare guidelines rather than just fitness goals."
        }
      },
      {
        "@type": "Question",
        "name": "How does SUMINO identify health risks before they become emergencies?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We utilize a multi-parameter risk detection framework. By analyzing the combination of daily energy, resting heart rate trends, sleep disruption, minor complaints, and laboratory diagnostic reports, our platform flags deviations from a user's normal baseline."
        }
      },
      {
        "@type": "Question",
        "name": "What role does Artificial Intelligence (AI) play on SUMINO?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SUMINO uses AI to analyze complex, multi-variable health trends. Instead of simple thresholds (e.g. alert if heart rate is high), our models identify slow, progressive declines in overall health indicators over weeks. All AI suggestions are strictly advisory and based on peer-reviewed medical guidelines."
        }
      },
      {
        "@type": "Question",
        "name": "Is my family's health data secure on SUMINO?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. We employ bank-grade security standards. All sensitive personal health data is encrypted both in transit (using TLS 1.3) and at rest (using AES-256). We strictly adhere to India's Digital Personal Data Protection (DPDP) Act and design our backend using standard secure medical data architectures."
        }
      },
      {
        "@type": "Question",
        "name": "Will SUMINO sell my data to insurance companies or advertisers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely not. SUMINO holds a strict ethical commitment: we will never sell or share your family's personal health data with third-party advertisers, insurance providers, or data brokers. Your information is strictly used to provide preventive insights to you and your selected doctors."
        }
      },
      {
        "@type": "Question",
        "name": "How does the family health dashboard work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The dashboard allows a primary family caregiver to manage profiles for multiple members (e.g., parents, children, spouse). It displays easy-to-read charts, daily check-in logs, risk status badges (e.g., Stable, Needs Attention), and actionable wellness recommendations."
        }
      },
      {
        "@type": "Question",
        "name": "Does SUMINO replace my visits to a regular doctor?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. SUMINO works with your doctor. By tracking daily health indicators over time, SUMINO provides a comprehensive longitudinal chart. When you visit your doctor, they can review this chart to gain a much deeper understanding of your health history than a single clinic visit allows."
        }
      },
      {
        "@type": "Question",
        "name": "How do doctors onboard onto the SUMINO platform?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Doctors can join the SUMINO Panel through our dedicated onboarding funnel (/doctors). Once verified with their medical registration details, they gain access to a secure clinical dashboard where they can view the authorized home health timelines of their patients who opt-in."
        }
      },
      {
        "@type": "Question",
        "name": "How does SUMINO support clinical decision-making?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SUMINO does not diagnose. Instead, it provides clean, formatted, continuous patient health timelines. By summarizing weeks of vitals, sleep, and lifestyle patterns into clinical summaries, doctors save time during visits and can easily identify chronic trends."
        }
      },
      {
        "@type": "Question",
        "name": "What clinical guidelines does SUMINO reference?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our warning models are mapped to internationally accepted clinical standards from the World Health Organization (WHO) and Indian Council of Medical Research (ICMR) preventive guidelines for diabetes, cardiovascular risks, elderly frailty, and childhood wellness."
        }
      },
      {
        "@type": "Question",
        "name": "Can my doctor receive direct alerts from my SUMINO profile?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Patient-authorized general practitioners can configure the platform to highlight patients whose data shows persistent risk markers. However, SUMINO is not a continuous ICU-grade monitoring system; it does not send immediate clinical alarms for acute emergencies."
        }
      },
      {
        "@type": "Question",
        "name": "Who can partner with SUMINO?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We actively partner with hospital chains, local general physician clinics, diagnostic laboratories, healthcare NGOs, insurance providers looking to incentivize preventive wellness, and corporate employee wellness programs."
        }
      },
      {
        "@type": "Question",
        "name": "What is the benefit of joining the SUMINO Waitlist now?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "By joining the waitlist, you secure early access to the SUMINO platform during our limited beta release. Early members receive complimentary onboarding support, priority access to family health consultations, and lifetime discount pricing."
        }
      },
      {
        "@type": "Question",
        "name": "How does the waitlist onboarding process work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Once you register with your email, mobile number, and city, you will receive a confirmation code. We release access in batches based on geographic regions. You will receive an SMS and email invite once the beta goes live in your city."
        }
      },
      {
        "@type": "Question",
        "name": "How does SUMINO partner with diagnostic centers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Diagnostic labs can integrate with SUMINO to securely deliver test results directly into the patient's dashboard. Our system translates complex lab values into simple, visual explanations, highlighting how they fit into the patient's overall preventive wellness plan."
        }
      },
      {
        "@type": "Question",
        "name": "What is SUMINO's long-term vision for the prevention economy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We believe that by shifting 10% of healthcare spending from emergency hospital treatment to early home-based detection, we can save millions of lives and reduce out-of-pocket healthcare debt for Indian households. We aim to become the default digital layers for preventive health."
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
