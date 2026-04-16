import { Users, Award, BookOpen, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { icon: <Users className="h-6 w-6" />, value: "1000+", label: "Students Guided" },
  { icon: <Award className="h-6 w-6" />, value: "95%", label: "Success Rate" },
  { icon: <BookOpen className="h-6 w-6" />, value: "50+", label: "Partner Colleges" },
  { icon: <Trophy className="h-6 w-6" />, value: "10+", label: "Years Experience" }
];

export default function About() {
  return (
    <div className="pt-24 pb-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">About EduHorizon | Admission Consultancy in Noida & Greater Noida</h1>
          <p className="mt-4 text-xl text-gray-600">
            Trusted admission guidance for students across Noida, Greater Noida, Delhi NCR and major Indian cities since 2018.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-4">
            At EduHorizon, we believe every student deserves access to quality education.
            We specialize in MBA, Engineering, Medical, and Study Abroad admissions, helping students choose the right
            college based on their goals and budget.
            </p>
            <p className="text-lg text-gray-600">
              With over a decade of experience in education consulting, we've helped thousands of students 
              achieve their academic dreams through personalized guidance and support.
            </p>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80" 
            alt="Education consulting" 
            className="rounded-lg shadow-xl"
          />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">Meet Our Counsellors</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-8">
            Work with experienced counsellors for personalized guidance, college shortlisting,
            and end-to-end admission support.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <article className="border border-gray-200 rounded-xl p-6">
              <img
                src="/images/akshat-ansh.png"
                alt="Akshat Ansh education counsellor at EduHorizon"
                className="w-40 h-40 object-cover rounded-full mx-auto mb-4 shadow-md"
              />
              <h3 className="text-xl font-semibold text-gray-900 text-center">Akshat Ansh - Founder - 7+ Years Experience</h3>
              <p className="text-gray-700 text-center mt-2">B.Tech from A.K.T.U</p>
              <p className="text-gray-600 text-center mt-3">
                Specializes in career counselling, college selection, and admission planning for students across India.
              </p>
            </article>

            <article className="border border-dashed border-gray-300 rounded-xl p-6">
              <div className="w-40 h-40 rounded-full bg-gray-100 mx-auto mb-4 flex items-center justify-center text-gray-500">
                Photo Coming Soon
              </div>
              <h3 className="text-xl font-semibold text-gray-900 text-center">Sonali Lodhi - Head Counsellor</h3>
              <p className="text-gray-700 text-center mt-2">4+ Years of Experience</p>
              <p className="text-gray-600 text-center mt-3">
                Provides strategic admission guidance and student-first counselling support for top college admissions.
              </p>
            </article>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="flex justify-center mb-4 text-blue-600">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">MBA Admission Guidance</h3>
              <p className="text-gray-600">
                We strive for excellence in every aspect of our service, ensuring the best guidance for our students.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Engineering College Selection</h3>
              <p className="text-gray-600">
                We maintain the highest standards of honesty and transparency in our consultations.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Study Abroad Counselling</h3>
              <p className="text-gray-600">
                We continuously adapt our methods to meet the evolving needs of education.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Explore More Admission Resources</h2>
          <p className="text-gray-600 mb-4">
            Compare colleges, review real student outcomes, and read expert guidance before finalizing your admission.
          </p>
          <div className="flex flex-wrap gap-4 text-sm font-medium">
            <Link to="/colleges" className="text-blue-700 hover:text-blue-800 hover:underline">
              Compare Top Colleges
            </Link>
            <Link to="/success-stories" className="text-blue-700 hover:text-blue-800 hover:underline">
              Student Success Stories
            </Link>
            <Link to="/testimonials" className="text-blue-700 hover:text-blue-800 hover:underline">
              Verified Testimonials
            </Link>
            <Link to="/blog" className="text-blue-700 hover:text-blue-800 hover:underline">
              Read Admission Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}