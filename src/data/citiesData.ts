export interface CityData {
  slug: string;
  name: string;
  state: string;
  emoji: string;
  collegesCount: number;
  studentsCount: string;
  popularCourses: string[];
  shortDescription: string;
  featured: boolean;
  theme: {
    color: string;
    lightColor: string;
    textColor: string;
    borderColor: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  content: {
    about: string;
    topColleges: string[];
    whyChooseUs: string[];
  };
  faqs: { question: string; answer: string }[];
}

export const citiesData: CityData[] = [
  {
    slug: 'noida',
    name: 'Noida',
    state: 'Uttar Pradesh',
    emoji: '🏙️',
    collegesCount: 30,
    studentsCount: '5000+',
    popularCourses: ['B.Tech', 'MBA', 'BCA', 'MCA'],
    shortDescription: 'Silicon Valley of India — top engineering & management colleges with excellent placements.',
    featured: true,
    theme: {
      color: 'from-blue-600 to-indigo-700',
      lightColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      borderColor: 'border-blue-200',
    },
    seo: {
      title: 'Top College Admission Consultancy in Noida 2026 | B.Tech, MBA, BCA',
      description: 'Get expert admission guidance for top colleges in Noida. Direct admission in B.Tech, MBA, BCA in Noida top colleges with best fee structure and placements.',
      keywords: 'admission consultancy in noida, top colleges in noida, b.tech admission noida, mba colleges in noida, direct admission in noida, best education consultant noida, ncr admission guidance',
    },
    content: {
      about: 'Noida has emerged as a premier educational hub in North India, offering world-class infrastructure and proximity to top IT and corporate companies. This makes it an ideal destination for students pursuing engineering, management, and IT courses.',
      topColleges: ['Jaypee Institute of Information Technology (JIIT)', 'Amity University', 'JSS Academy of Technical Education', 'Galgotias University', 'Noida Institute of Engineering and Technology (NIET)'],
      whyChooseUs: [
        'Direct tie-ups with top Noida colleges for fast-track admissions.',
        'Expert guidance on placement records and real fee structures.',
        'Scholarship assistance for meritorious students.',
      ]
    },
    faqs: [
      { question: 'Which are the top engineering colleges in Noida?', answer: 'Some of the top engineering colleges in Noida include JIIT, Amity University, and JSS Academy.' },
      { question: 'Can I get direct admission in Noida colleges?', answer: 'Yes, many colleges in Noida offer direct admission under the management quota. EduHorizon can help you secure a seat at the best possible fee.' },
    ]
  },
  {
    slug: 'greater-noida',
    name: 'Greater Noida',
    state: 'Uttar Pradesh',
    emoji: '🏛️',
    collegesCount: 25,
    studentsCount: '4500+',
    popularCourses: ['B.Tech', 'MBA', 'BCA'],
    shortDescription: 'Planned city with GNIOT, GL Bajaj, IIMT & more — a hub for quality education.',
    featured: true,
    theme: {
      color: 'from-purple-600 to-pink-600',
      lightColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      borderColor: 'border-purple-200',
    },
    seo: {
      title: 'Best Admission Consultants in Greater Noida | Engineering & Management',
      description: 'Secure your admission in Greater Noida top colleges. Expert counselling for B.Tech, MBA, BCA in GL Bajaj, GNIOT, IIMT, Galgotias with placement support.',
      keywords: 'greater noida admission, top colleges in greater noida, b.tech admission greater noida, mba in greater noida, gl bajaj admission, gniot admission, iimt greater noida, direct admission greater noida',
    },
    content: {
      about: 'Knowledge Park in Greater Noida is home to some of the most prestigious engineering and management institutes in India. With a focus on practical learning and industry exposure, Greater Noida is the top choice for professional courses.',
      topColleges: ['GL Bajaj Institute of Technology and Management', 'GNIOT', 'IIMT College of Engineering', 'Mangalmay Institute', 'KCC Institute'],
      whyChooseUs: [
        'Deep local knowledge of all Greater Noida colleges.',
        'End-to-end support from campus visits to final admission.',
        'Placement-focused college selection.',
      ]
    },
    faqs: [
      { question: 'Which is better for B.Tech: Noida or Greater Noida?', answer: 'Both have excellent colleges. Greater Noida offers a dense cluster of colleges in Knowledge Park with great campus facilities and competitive fee structures.' },
      { question: 'How can EduHorizon help with Greater Noida admissions?', answer: 'We provide free counselling, compare colleges based on your profile, arrange campus visits, and negotiate the best fee structure for you.' },
    ]
  },
  {
    slug: 'patna',
    name: 'Patna',
    state: 'Bihar',
    emoji: '🌆',
    collegesCount: 20,
    studentsCount: '3500+',
    popularCourses: ['B.Tech', 'MBBS', 'B.Pharm', 'MBA'],
    shortDescription: 'Bihar capital with growing education ecosystem and affordable quality colleges.',
    featured: true,
    theme: {
      color: 'from-orange-500 to-red-600',
      lightColor: 'bg-orange-50',
      textColor: 'text-orange-700',
      borderColor: 'border-orange-200',
    },
    seo: {
      title: 'Top Education Consultancy in Patna | Admission Guidance 2026',
      description: 'Looking for top colleges? EduHorizon Patna offers expert admission guidance for B.Tech, MBBS, MBA across India. Best education consultant in Bihar.',
      keywords: 'education consultancy patna, admission guidance patna, b.tech admission from bihar, top colleges for bihar students, mbbs admission patna, best education consultant in bihar',
    },
    content: {
      about: 'Patna is a major educational center in Eastern India. While the city has its own reputed institutions, it also serves as a hub for students seeking quality education in NCR, Bangalore, and Pune.',
      topColleges: ['NIT Patna', 'Patna Science College', 'Amity University Patna', 'BIT Patna'],
      whyChooseUs: [
        'Local office in Kumhrar, Patna for easy accessibility.',
        'Trusted guidance for students migrating to NCR for higher studies.',
        'Affordable fee structures and student credit card scheme guidance.',
      ]
    },
    faqs: [
      { question: 'Do you help Patna students get admission in Delhi NCR?', answer: 'Absolutely! A large number of our students are from Bihar seeking admission in top colleges of Noida and Greater Noida. We handle the entire process.' },
      { question: 'Where is your Patna office located?', answer: 'Our office is located at Kumhrar, Patna. You can visit us for face-to-face free counselling.' },
    ]
  },
  {
    slug: 'delhi',
    name: 'Delhi',
    state: 'Delhi NCR',
    emoji: '🏰',
    collegesCount: 40,
    studentsCount: '8000+',
    popularCourses: ['B.Tech', 'MBA', 'Law', 'Design'],
    shortDescription: 'India\'s capital — home to DU, IP University and hundreds of top-tier colleges.',
    featured: true,
    theme: {
      color: 'from-teal-500 to-cyan-600',
      lightColor: 'bg-teal-50',
      textColor: 'text-teal-700',
      borderColor: 'border-teal-200',
    },
    seo: {
      title: 'Top Admission Consultancy in Delhi | DU, IPU, Private Colleges',
      description: 'Expert admission guidance for colleges in Delhi. Get counselling for IP University, Delhi University, and top private colleges for B.Tech, MBA, Law.',
      keywords: 'admission consultant delhi, ip university admission, du admission guidance, b.tech colleges delhi, mba admission delhi, direct admission in delhi ncr',
    },
    content: {
      about: 'Delhi is the educational capital of India, offering diverse opportunities across disciplines. From Delhi University to IP University and numerous private institutes, the choices are vast and highly competitive.',
      topColleges: ['Delhi University Colleges', 'IP University Affiliated Colleges', 'Delhi Technological University (DTU)', 'Netaji Subhas University of Technology (NSUT)'],
      whyChooseUs: [
        'Expertise in IP University counselling and choice filling.',
        'Guidance on management quota seats in top Delhi private colleges.',
        'Comprehensive career mapping based on student potential.',
      ]
    },
    faqs: [
      { question: 'Can you help with IP University admissions?', answer: 'Yes, we provide complete guidance for IPU CET, choice filling, and spot round counselling.' },
      { question: 'Is direct admission possible in Delhi top colleges?', answer: 'Certain private colleges under IPU and autonomous universities offer management quota seats. Contact us for details.' },
    ]
  },
  {
    slug: 'ghaziabad',
    name: 'Ghaziabad',
    state: 'Uttar Pradesh',
    emoji: '🏗️',
    collegesCount: 18,
    studentsCount: '2800+',
    popularCourses: ['B.Tech', 'MBA', 'Polytechnic'],
    shortDescription: 'Gateway to Delhi NCR with multiple AKTU-affiliated engineering colleges.',
    featured: false,
    theme: {
      color: 'from-green-500 to-emerald-600',
      lightColor: 'bg-green-50',
      textColor: 'text-green-700',
      borderColor: 'border-green-200',
    },
    seo: {
      title: 'Top College Admission Guidance in Ghaziabad | EduHorizon',
      description: 'Get expert admission counselling for engineering and management colleges in Ghaziabad. Top AKTU affiliated colleges with affordable fees.',
      keywords: 'admission in ghaziabad, b.tech colleges ghaziabad, mba in ghaziabad, aktu colleges ghaziabad, direct admission ghaziabad',
    },
    content: {
      about: 'Ghaziabad offers a great alternative to Noida with excellent AKTU-affiliated colleges. It boasts good connectivity to Delhi and a thriving industrial base for practical exposure.',
      topColleges: ['Ajay Kumar Garg Engineering College (AKGEC)', 'ABES Engineering College', 'KIET Group of Institutions', 'IMS Ghaziabad'],
      whyChooseUs: [
        'Detailed comparison of Ghaziabad vs Noida colleges.',
        'Assistance with AKTU counselling process.',
        'Focus on ROI and placement statistics.',
      ]
    },
    faqs: [
      { question: 'Which are the top colleges in Ghaziabad for B.Tech?', answer: 'AKGEC, ABES, and KIET are considered among the top engineering colleges in Ghaziabad under AKTU.' },
    ]
  },
  {
    slug: 'lucknow',
    name: 'Lucknow',
    state: 'Uttar Pradesh',
    emoji: '🌹',
    collegesCount: 22,
    studentsCount: '3200+',
    popularCourses: ['MBBS', 'MBA', 'B.Tech', 'LLB'],
    shortDescription: 'City of Nawabs with premier medical and management institutions.',
    featured: false,
    theme: {
      color: 'from-rose-500 to-pink-600',
      lightColor: 'bg-rose-50',
      textColor: 'text-rose-700',
      borderColor: 'border-rose-200',
    },
    seo: {
      title: 'Best Admission Consultants in Lucknow | Top Colleges Guidance',
      description: 'EduHorizon offers expert admission guidance for students in Lucknow. Counselling for top B.Tech, MBA, and Medical colleges across India.',
      keywords: 'education consultant lucknow, admission guidance lucknow, colleges in lucknow, direct admission lucknow, mbbs admission guidance lucknow',
    },
    content: {
      about: 'Lucknow, the capital of UP, is known for its premier educational institutions. We help students from Lucknow find the best colleges within the city as well as in the Delhi NCR region.',
      topColleges: ['IIM Lucknow', 'Babu Banarasi Das University (BBD)', 'Amity University Lucknow', 'Integral University'],
      whyChooseUs: [
        'Specialized guidance for UPSEE/AKTU counselling.',
        'Assistance for students looking to move to Delhi NCR.',
        'Medical and engineering admission expertise.',
      ]
    },
    faqs: [
      { question: 'Do you provide counselling for medical colleges?', answer: 'Yes, we provide guidance for NEET counselling and admission to top private medical colleges.' },
    ]
  },
  {
    slug: 'agra',
    name: 'Agra',
    state: 'Uttar Pradesh',
    emoji: '🕌',
    collegesCount: 14,
    studentsCount: '2000+',
    popularCourses: ['B.Tech', 'B.Com', 'BBA', 'MBA'],
    shortDescription: 'Historic city with growing private college ecosystem near Taj Mahal.',
    featured: false,
    theme: {
      color: 'from-amber-500 to-yellow-600',
      lightColor: 'bg-amber-50',
      textColor: 'text-amber-700',
      borderColor: 'border-amber-200',
    },
    seo: {
      title: 'Admission Consultancy in Agra | Career Guidance 2026',
      description: 'Get admission in top colleges across India. EduHorizon provides career counselling and direct admission support for students in Agra.',
      keywords: 'admission consultant agra, career counselling agra, b.tech admission agra, mba colleges agra',
    },
    content: {
      about: 'Agra is developing rapidly as an educational center. For students seeking broader exposure, we provide excellent guidance for transitioning to top colleges in the NCR region.',
      topColleges: ['Dayalbagh Educational Institute', 'Anand Engineering College', 'Raja Balwant Singh Engineering Technical Campus'],
      whyChooseUs: [
        'Personalized career mapping.',
        'Smooth transition support to NCR colleges.',
        'Scholarship and fee negotiation.',
      ]
    },
    faqs: [
      { question: 'Can students from Agra get admission in Greater Noida colleges easily?', answer: 'Yes, Agra is well-connected, and many students prefer Greater Noida for higher studies. We assist with the entire process.' },
    ]
  },
  {
    slug: 'meerut',
    name: 'Meerut',
    state: 'Uttar Pradesh',
    emoji: '⚽',
    collegesCount: 16,
    studentsCount: '2500+',
    popularCourses: ['B.Tech', 'BBA', 'Pharmacy', 'MBA'],
    shortDescription: 'Sports city with established private universities and colleges.',
    featured: false,
    theme: {
      color: 'from-violet-500 to-purple-600',
      lightColor: 'bg-violet-50',
      textColor: 'text-violet-700',
      borderColor: 'border-violet-200',
    },
    seo: {
      title: 'Top Education Consultant in Meerut | B.Tech, Pharmacy, MBA',
      description: 'EduHorizon offers best admission guidance in Meerut. Secure your seat in top engineering, pharmacy and management colleges with our experts.',
      keywords: 'meerut admission consultancy, education consultant meerut, top colleges in meerut, pharmacy admission meerut',
    },
    content: {
      about: 'Meerut is home to several established universities. With the new rapid rail (RRTS), connectivity to Delhi NCR has improved, making it easier for students to explore top-tier colleges.',
      topColleges: ['Swami Vivekanand Subharti University', 'Meerut Institute of Engineering and Technology (MIET)', 'IIMT University'],
      whyChooseUs: [
        'Guidance for both local Meerut colleges and NCR institutes.',
        'Expertise in Pharmacy and B.Tech admissions.',
        'Transparent and ethical counselling process.',
      ]
    },
    faqs: [
      { question: 'Is MIET a good college for B.Tech?', answer: 'Yes, MIET is one of the top-ranking AKTU affiliated colleges in the region with good placement records.' },
    ]
  },
  {
    slug: 'kanpur',
    name: 'Kanpur',
    state: 'Uttar Pradesh',
    emoji: '🏭',
    collegesCount: 19,
    studentsCount: '3000+',
    popularCourses: ['B.Tech', 'MBA', 'Polytechnic', 'BCA'],
    shortDescription: 'Industrial hub of UP with IIT Kanpur and several quality institutions.',
    featured: false,
    theme: {
      color: 'from-sky-500 to-blue-600',
      lightColor: 'bg-sky-50',
      textColor: 'text-sky-700',
      borderColor: 'border-sky-200',
    },
    seo: {
      title: 'Best Admission Guidance in Kanpur | Engineering & Management',
      description: 'Expert college admission counselling for students in Kanpur. Get direct admission in top B.Tech, MBA, BCA colleges across UP and NCR.',
      keywords: 'admission consultant kanpur, colleges in kanpur, b.tech admission kanpur, mba admission kanpur, education guidance kanpur',
    },
    content: {
      about: 'Kanpur, known for IIT Kanpur, has a strong foundation in technical education. We help Kanpur students explore top private engineering and management institutes across North India.',
      topColleges: ['PSIT Kanpur', 'Harcourt Butler Technical University (HBTU)', 'Allenhouse Institute of Technology'],
      whyChooseUs: [
        'Deep understanding of UP technical education landscape.',
        'Assistance in choosing between UP and NCR colleges.',
        'End-to-end admission process handling.',
      ]
    },
    faqs: [
      { question: 'How do Kanpur private colleges compare to Greater Noida?', answer: 'While Kanpur has good colleges like PSIT, Greater Noida offers a larger IT hub and corporate exposure which is highly beneficial for placements.' },
    ]
  },
  {
    slug: 'varanasi',
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    emoji: '🪔',
    collegesCount: 15,
    studentsCount: '2200+',
    popularCourses: ['MBBS', 'B.Tech', 'B.Ed', 'MBA'],
    shortDescription: 'Spiritual capital with BHU and diverse private colleges.',
    featured: false,
    theme: {
      color: 'from-orange-600 to-amber-500',
      lightColor: 'bg-orange-50',
      textColor: 'text-orange-700',
      borderColor: 'border-orange-200',
    },
    seo: {
      title: 'Top Education Consultancy in Varanasi | Admission 2026',
      description: 'EduHorizon provides the best admission counselling in Varanasi for B.Tech, Medical, and MBA colleges. Secure your seat in top institutions.',
      keywords: 'admission consultant varanasi, education consultant varanasi, colleges in varanasi, b.tech admission varanasi',
    },
    content: {
      about: 'Varanasi is historically significant for education with BHU at its core. For students looking at private technical and management education, we provide the best options in NCR and other states.',
      topColleges: ['Banaras Hindu University (BHU)', 'Ashoka Institute of Technology and Management', 'School of Management Sciences (SMS)'],
      whyChooseUs: [
        'Dedicated counselling for students from Purvanchal.',
        'Guidance on affordable colleges with high ROI.',
        'Hostel and accommodation assistance in NCR.',
      ]
    },
    faqs: [
      { question: 'Do you help students from Varanasi secure admission in NCR?', answer: 'Yes, a large portion of our students come from Varanasi and nearby regions. We ensure a smooth transition and admission process.' },
    ]
  },
  {
    slug: 'prayagraj',
    name: 'Prayagraj',
    state: 'Uttar Pradesh',
    emoji: '🌊',
    collegesCount: 17,
    studentsCount: '2700+',
    popularCourses: ['Law', 'B.Tech', 'MBA', 'B.Ed'],
    shortDescription: 'City of law & history — Allahabad University and quality private colleges.',
    featured: false,
    theme: {
      color: 'from-indigo-500 to-blue-600',
      lightColor: 'bg-indigo-50',
      textColor: 'text-indigo-700',
      borderColor: 'border-indigo-200',
    },
    seo: {
      title: 'Admission Consultant in Prayagraj (Allahabad) | Top Colleges',
      description: 'Get expert admission counselling in Prayagraj for B.Tech, MBA, Law. EduHorizon helps you choose the right college and career path.',
      keywords: 'admission consultant prayagraj, allahabad education consultant, colleges in prayagraj, law admission prayagraj, b.tech admission allahabad',
    },
    content: {
      about: 'Prayagraj has a rich academic heritage. We assist students here in discovering new-age courses and top-ranked private institutions across the country to match their career ambitions.',
      topColleges: ['United College of Engineering and Research', 'Allahabad University', 'Motilal Nehru National Institute of Technology (MNNIT)'],
      whyChooseUs: [
        'Comprehensive career and aptitude counselling.',
        'Expertise in Law, Engineering, and Management admissions.',
        'Transparent fee discussions.',
      ]
    },
    faqs: [
      { question: 'Are there good private engineering colleges in Prayagraj?', answer: 'Yes, colleges like United are well-regarded. However, many students also opt for NCR colleges for better corporate exposure.' },
    ]
  },
  {
    slug: 'faridabad',
    name: 'Faridabad',
    state: 'Haryana',
    emoji: '🔩',
    collegesCount: 13,
    studentsCount: '1800+',
    popularCourses: ['B.Tech', 'MBA', 'BBA', 'Pharmacy'],
    shortDescription: 'Industrial Haryana city with expanding private college options near Delhi.',
    featured: false,
    theme: {
      color: 'from-lime-500 to-green-600',
      lightColor: 'bg-lime-50',
      textColor: 'text-lime-700',
      borderColor: 'border-lime-200',
    },
    seo: {
      title: 'Top Admission Consultancy in Faridabad | Engineering & MBA',
      description: 'EduHorizon offers professional admission counselling in Faridabad. Secure direct admission in top colleges across Delhi NCR.',
      keywords: 'admission consultant faridabad, colleges in faridabad, b.tech admission faridabad, mba admission faridabad',
    },
    content: {
      about: 'Faridabad is a major industrial hub with growing educational infrastructure. We help students leverage this by guiding them to top local colleges and premier institutes across the broader NCR.',
      topColleges: ['YMCA University of Science and Technology', 'Manav Rachna International Institute of Research and Studies', 'Lingaya\'s Vidyapeeth'],
      whyChooseUs: [
        'Expert guidance on Haryana State Technical Education Society (HSTES) counselling.',
        'Options comparison between Faridabad, Gurgaon, and Noida.',
        'Placement-driven college selection.',
      ]
    },
    faqs: [
      { question: 'Is Manav Rachna a good university?', answer: 'Yes, it is one of the top private universities in the region with excellent infrastructure and diverse course offerings.' },
    ]
  }
];
