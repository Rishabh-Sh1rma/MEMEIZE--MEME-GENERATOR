import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Template {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
}

const CATEGORIES = [
  'All',
  'Reactions',
  'Decisions',
  'Arguments',
  'Progression',
  'Advice',
  'Meme', // General meme category for fetched images
];

interface TemplateGridProps {
  limit?: number;
}

const TemplateGrid: React.FC<TemplateGridProps> = ({ limit }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [templates, setTemplates] = React.useState<Template[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
fetch('https://api.imgflip.com/get_memes')
  .then((res) => res.json())
  .then((data) => {
    if (data.success) {
      const fetchedTemplates: Template[] = data.data.memes.map((meme: any) => ({
        id: meme.id,
        name: meme.name,
        imageUrl: meme.url,
        category: 'Meme',
      }));
      setTemplates(fetchedTemplates);
    }
    setLoading(false);
  })
  .catch(() => setLoading(false));

  }, []);

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const templatesToShow = filteredTemplates.slice(0, limit ?? filteredTemplates.length);

  if (loading) {
    return <div className="text-white p-4">Loading memes...</div>;
  }

  return (
    <div className="bg-dark-800 rounded-lg border border-dark-700 p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-4">Meme Templates</h2>
        <div className="flex flex-col md:flex-row gap-4">
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
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {templatesToShow.length > 0 ? (
          templatesToShow.map((template) => (
            <Link
              key={template.id}
              to={`/editor?templateUrl=${encodeURIComponent(template.imageUrl)}`}
              className="bg-dark-700 rounded-lg overflow-hidden border border-dark-600 hover:border-primary cursor-pointer transition duration-200 transform hover:scale-105"
            >
              <div className="aspect-square overflow-hidden">
                <img src={template.imageUrl} alt={template.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-3">
                <h3 className="text-white font-medium truncate">{template.name}</h3>
                <p className="text-gray-400 text-sm">{template.category}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-400 col-span-full text-center">No templates found.</p>
        )}
      </div>
    </div>
  );
};

export default TemplateGrid;
