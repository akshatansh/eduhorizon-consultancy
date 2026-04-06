import React from 'react';
import { Users, Award, BookOpen, Trophy } from 'lucide-react';

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
          <h1 className="text-4xl font-bold text-gray-900">About EduHorizon</h1>
          <p className="mt-4 text-xl text-gray-600">Your Trusted Partner in Education</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-4">
              At EduHorizon, we believe every student deserves access to quality education and guidance. 
              Our mission is to empower students to make informed decisions about their academic future.
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
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in every aspect of our service, ensuring the best guidance for our students.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Integrity</h3>
              <p className="text-gray-600">
                We maintain the highest standards of honesty and transparency in our consultations.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600">
                We continuously adapt our methods to meet the evolving needs of education.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}