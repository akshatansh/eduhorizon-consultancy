import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env.local
config({ path: join(__dirname, '../.env.local') });

console.log('SUPABASE_URL:', process.env.VITE_SUPABASE_URL);
console.log('SUPABASE_ANON_KEY:', process.env.VITE_SUPABASE_ANON_KEY ? 'present' : 'missing');

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const faqs = [
  {
    question: "What is Edu Horizon?",
    answer: `<p><strong>Edu Horizon</strong> is a student-first education consultancy based in India, specializing in <strong>college admissions</strong> across Noida and Greater Noida. We help students find the right college for <strong>BTech</strong>, <strong>BBA</strong>, <strong>BCA</strong>, <strong>BSc</strong>, <strong>MBA</strong>, and more — based on their marks, budget, and career goals. We do not take commission from any college, ensuring unbiased <strong>admission guidance</strong>.</p>`,
    category: "About Us",
    position: 1,
    published: true
  },
  {
    question: "Which colleges does Edu Horizon help with admissions in Greater Noida?",
    answer: `<p><strong>Edu Horizon</strong> guides students for <strong>admissions</strong> at top colleges in Greater Noida including <strong>GL Bajaj Institute of Technology</strong>, <strong>GNIOT</strong>, <strong>NIET</strong>, <strong>Galgotias University</strong>, <strong>Sharda University</strong>, <strong>Bennett University</strong>, <strong>Noida International University</strong>, and <strong>Gautam Buddha University</strong>. We cover <strong>engineering</strong>, <strong>management</strong>, <strong>science</strong>, and <strong>computer application programmes</strong> across all major institutions in the region for <strong>BTech admission</strong>, <strong>MBA admission</strong>, and more.</p>`,
    category: "Colleges",
    position: 2,
    published: true
  },
  {
    question: "Is Edu Horizon's consultation free?",
    answer: `<p>Yes. <strong>Edu Horizon</strong> offers <strong>free consultation</strong> to all students and parents. We do not charge any fee for counselling, <strong>college shortlisting</strong>, or <strong>admission guidance</strong>. Our service is completely student-funded — we earn nothing from colleges, which means our advice is always in your interest for <strong>college admissions in Greater Noida</strong>.</p>`,
    category: "Services",
    position: 3,
    published: true
  },
  {
    question: "Can Edu Horizon help me get BTech admission without JEE in Noida or Greater Noida?",
    answer: `<p>Yes. We specialize in helping students secure <strong>BTech admission</strong> through management quota and direct merit-based routes at AICTE-approved colleges in Noida and Greater Noida — without <strong>JEE Main</strong> scores and without paying any unofficial donation. We verify every college's accreditation and fee structure before recommending it for <strong>engineering admission</strong>.</p>`,
    category: "Admissions",
    position: 4,
    published: true
  },
  {
    question: "Does Edu Horizon charge any donation or extra fees for admission?",
    answer: `<p>Absolutely not. <strong>Edu Horizon</strong> does not charge donations, unofficial fees, or any cash payments. We guide students to pay only official, receipted fees directly to the college. If any agent or consultant is asking for cash to arrange <strong>admission</strong>, that is fraud — and we actively help students avoid it in <strong>Greater Noida colleges</strong>.</p>`,
    category: "Fees",
    position: 5,
    published: true
  },
  {
    question: "Which courses does Edu Horizon cover for admission guidance?",
    answer: `<p><strong>Edu Horizon</strong> covers <strong>admissions</strong> for <strong>BTech</strong> (all branches including <strong>CSE</strong>, <strong>ECE</strong>, <strong>Mechanical</strong>), <strong>BBA</strong>, <strong>BCA</strong>, <strong>BSc</strong>, <strong>MBA</strong>, <strong>MCA</strong>, and <strong>MBBS</strong>. We handle both entrance-based <strong>admissions</strong> (<strong>JEE Main</strong>, <strong>UPTAC</strong>, <strong>CMAT</strong>, <strong>MAT</strong>) and direct merit-based or management quota <strong>admissions</strong> at private colleges in Noida and Greater Noida.</p>`,
    category: "Courses",
    position: 6,
    published: true
  },
  {
    question: "How does Edu Horizon verify if a college is genuine?",
    answer: `<p>We check three things for every college we recommend — AICTE approval on the official portal, NAAC accreditation grade, and three-year placement data. We never recommend a college we have not verified. If a college fails any of these checks, we will tell you plainly and suggest a better alternative for <strong>college admissions in Greater Noida</strong>.</p>`,
    category: "Verification",
    position: 7,
    published: true
  },
  {
    question: "Can Edu Horizon help students from outside Noida and Greater Noida?",
    answer: `<p>Yes. While our core expertise is in Noida and Greater Noida colleges, <strong>Edu Horizon</strong> provides pan-India <strong>admission guidance</strong>. We have helped students from Bihar, UP, Delhi, Rajasthan, and other states find the right college in the Delhi-NCR region based on their academic profile and budget for <strong>BTech</strong>, <strong>MBA</strong>, and other courses.</p>`,
    category: "Location",
    position: 8,
    published: true
  },
  {
    question: "What is the best BTech CSE college in Greater Noida under 5 lakh fees?",
    answer: `<p><strong>GL Bajaj Institute of Technology and Management</strong> is the top recommendation for <strong>CSE</strong> under 5 lakh fees in Greater Noida — NAAC A+ accredited, with total tuition of ₹2.45 lakh and highest placement of ₹44 LPA. <strong>GNIOT</strong> (fees from ₹2.25 lakh, highest package ₹70 LPA) and <strong>Galgotias University</strong> (₹1.44 lakh/year) are also strong options. <strong>Edu Horizon</strong> helps you choose based on your specific <strong>JEE percentile</strong> and budget for <strong>BTech admission</strong>.</p>`,
    category: "Recommendations",
    position: 9,
    published: true
  },
  {
    question: "How do I contact Edu Horizon for admission guidance?",
    answer: `<p>You can reach <strong>Edu Horizon</strong> through our website at <a href="https://eduhorizon.online" target="_blank" rel="noopener noreferrer">eduhorizon.online</a>. We offer <strong>free consultations</strong> for students and parents — no appointment needed, no pressure, and no charges. Simply visit the website, share your academic details, and our counsellors will guide you within 24 hours for <strong>college admissions in Greater Noida</strong>.</p>`,
    category: "Contact",
    position: 10,
    published: true
  }
];

async function insertFaqs() {
  try {
    console.log('Checking if faqs table exists...');
    const { data: checkData, error: checkError } = await supabase
      .from('faqs')
      .select('id')
      .limit(1);

    if (checkError) {
      console.error('Table does not exist or no permission:', checkError);
      return;
    }

    console.log('Table exists, inserting FAQs...');
    const { data, error } = await supabase
      .from('faqs')
      .insert(faqs);

    if (error) {
      console.error('Error inserting FAQs:', error);
    } else {
      console.log('FAQs inserted successfully:', data);
    }
  } catch (err) {
    console.error('Failed to insert FAQs:', err);
  }
}

insertFaqs();