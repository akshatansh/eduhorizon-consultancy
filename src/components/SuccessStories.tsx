import React from 'react';

const stories = [
  {
    name: "Sarah Chen",
    university: "Stanford University",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
    quote: "The guidance I received was invaluable. I got into my dream school!"
  },
  {
    name: "James Wilson",
    university: "MIT",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
    quote: "The personalized strategy made all the difference in my applications."
  },
  {
    name: "Emily Rodriguez",
    university: "Harvard University",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80",
    quote: "From essay reviews to interview prep, every service was top-notch."
  }
];

export default function SuccessStories() {
  return (
    <div id="success-stories" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Success Stories</h2>
          <p className="mt-4 text-xl text-gray-600">
            Meet some of our successful students
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={story.image}
                alt={story.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <p className="text-gray-600 italic mb-4">"{story.quote}"</p>
                <h3 className="text-lg font-semibold text-gray-900">{story.name}</h3>
                <p className="text-blue-600">{story.university}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}