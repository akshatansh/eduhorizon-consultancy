import { BlogPost } from '../types';

export const blogPosts: BlogPost[] = [
  {
    id: 'choosing-right-college',
    title: 'How to Choose the Right College in Greater Noida',
    excerpt: 'A comprehensive guide to selecting the perfect college for your academic journey in Greater Noida.',
    content: `
      Choosing the right college is one of the most important decisions in your academic journey. Here's a comprehensive guide to help you make an informed choice:

      ## Consider Your Course
      - Research the curriculum thoroughly
      - Check the faculty expertise
      - Look for industry partnerships
      - Evaluate placement records

      ## Campus Infrastructure
      - Modern classrooms and labs
      - Library facilities
      - Sports facilities
      - Hostel accommodation

      ## Location and Accessibility
      - Distance from your residence
      - Transportation options
      - Campus environment
      - Safety considerations

      ## Career Prospects
      - Placement statistics
      - Alumni network
      - Industry connections
      - Internship opportunities

      Remember to visit the campus personally and talk to current students before making your final decision.
    `,
    author: {
      name: 'Dr. Rajesh Kumar',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80',
      role: 'Senior Education Counselor'
    },
    date: '2024-03-10',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80',
    category: 'Admissions',
    tags: ['college selection', 'career guidance', 'admissions']
  },
  {
    id: 'engineering-vs-management',
    title: 'Engineering vs Management: Making the Right Choice',
    excerpt: 'Understanding the key differences between engineering and management courses to make an informed decision.',
    content: `
      Deciding between engineering and management can be challenging. Let's explore both paths:

      ## Engineering
      - Technical skill development
      - Problem-solving focus
      - Wide range of specializations
      - Strong foundation in mathematics and science

      ## Management
      - Business acumen development
      - Leadership skills
      - Strategic thinking
      - People management

      ## Career Prospects
      ### Engineering
      - Technical roles
      - Research opportunities
      - Product development
      - Innovation focus

      ### Management
      - Business operations
      - Marketing and sales
      - Human resources
      - Entrepreneurship

      Consider your interests, strengths, and long-term career goals when making this decision.
    `,
    author: {
      name: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80',
      role: 'Career Counselor'
    },
    date: '2024-03-08',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80',
    category: 'Career Guidance',
    tags: ['engineering', 'management', 'career choice']
  },
  {
    id: 'campus-life-greater-noida',
    title: 'Campus Life in Greater Noida: A Student Guide',
    excerpt: 'Everything you need to know about student life in Greater Noida colleges.',
    content: `
      Greater Noida offers a unique campus life experience. Here's what you can expect:

      ## Academic Environment
      - Modern infrastructure
      - Digital learning resources
      - Industry exposure
      - Expert faculty

      ## Student Life
      - Cultural festivals
      - Sports events
      - Technical competitions
      - Club activities

      ## City Life
      - Safe environment
      - Good connectivity
      - Shopping centers
      - Entertainment options

      Make the most of your college years by actively participating in various activities.
    `,
    author: {
      name: 'Amit Verma',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80',
      role: 'Student Counselor'
    },
    date: '2024-03-05',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80',
    category: 'College Life',
    tags: ['campus life', 'student guide', 'Greater Noida']
  }
];