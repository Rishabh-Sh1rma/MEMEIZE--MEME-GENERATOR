import React, { useState } from 'react';
import TemplateGrid from '../components/templates/TemplateGrid';
import { Search, Filter } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
}

const Templates: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleSelectTemplate = (template: Template) => {
    // Template selection logic will be implemented here
  };

  return (
    <div className="flex-grow px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-dark-800 rounded-lg border border-dark-700 p-6">
          <h1 className="text-3xl font-bold text-white mb-6">
            Meme Templates
          </h1>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="bg-dark-700 w-full pl-10 pr-4 py-2 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="relative flex-shrink-0">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter size={18} className="text-gray-400" />
              </div>
              <select
                className="bg-dark-700 pl-10 pr-4 py-2 border border-dark-600 rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                <option value="Bollywood">Bollywood</option>
                <option value="Cricket">Cricket</option>
                <option value="Politics">Politics</option>
                <option value="Trending">Trending</option>
              </select>
            </div>
          </div>

          <TemplateGrid 
            onSelectTemplate={handleSelectTemplate}
            searchQuery={searchQuery}
            category={selectedCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default Templates;