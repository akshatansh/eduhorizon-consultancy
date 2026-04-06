import React from 'react';

interface AdminTopBarProps {
  rightSlot?: React.ReactNode;
}

export default function AdminTopBar({ rightSlot }: AdminTopBarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <span className="text-sm sm:text-base font-semibold text-gray-900">EduHorizon Admin</span>
        {rightSlot}
      </div>
    </header>
  );
}
