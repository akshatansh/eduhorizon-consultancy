import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { colleges as seedColleges } from '../data/colleges';
import CollegeCard from '../components/colleges/CollegeCard';
import { createClient } from '@supabase/supabase-js';
import { mapDbCollegeToUi, type DbCollegeRow } from '../utils/cmsMappers';
import type { College } from '../types/college';

export default function Colleges() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [colleges, setColleges] = useState<College[]>(seedColleges);

  useEffect(() => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseAnonKey) return;

    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const run = async () => {
      const { data, error } = await supabase
        .from('colleges')
        .select('slug,name,location,courses,images,description,fees,website,established,ranking,facilities,highlights')
        .order('name', { ascending: true });

      if (error || !data) return;
      if (data.length === 0) return;
      setColleges((data as DbCollegeRow[]).map(mapDbCollegeToUi));
    };
    run();
  }, []);

  const filteredColleges = colleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = selectedCourse ? college.courses.includes(selectedCourse) : true;
    return matchesSearch && matchesCourse;
  });

  const allCourses = Array.from(new Set(colleges.flatMap(college => college.courses)));

  return (
    <div className="pt-24 pb-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Explore Colleges in Greater Noida
          </h1>
          <p className="text-xl text-gray-600">
            Find the perfect college for your higher education
          </p>
        </motion.div>

        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search colleges..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">All Courses</option>
            {allCourses.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredColleges.map((college, index) => (
            <CollegeCard key={college.id} college={college} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}