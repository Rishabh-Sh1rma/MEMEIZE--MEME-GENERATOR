import React, { useRef } from 'react';
import { Zap, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TemplateGrid from '../components/templates/TemplateGrid';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const featuresRef = useRef<HTMLDivElement>(null); // 👈 Create ref

  const handleScrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' }); // 👈 Scroll smoothly
  };

  return (
    <div className="flex-grow px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Create memes in <span className="text-primary">seconds</span>
          </h1>
          <p className="text-gray-300 text-xl max-w-2xl mx-auto mb-8">
            The fastest way to go from idea to meme. Pick a template, add text, and share instantly.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigate('/editor?isBlankCanvas=true')}
              className="px-6 py-3 bg-primary text-dark-900 font-medium rounded-lg flex items-center hover:bg-primary-300 transition"
            >
              <Zap size={20} className="mr-2" />
              Get Started
            </button>
            <button
              onClick={handleScrollToFeatures} // 👈 Attach scroll function
              className="px-6 py-3 bg-dark-800 text-white font-medium rounded-lg border border-dark-700 hover:bg-dark-700 transition"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Featured Templates Section */}
        <div className="mt-24 mb-12">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Featured <span className="text-primary">Templates</span>
          </h2>
          <TemplateGrid limit={6} />
          <div className="text-center mt-8 space-y-4">
            <a
              href="/templates"
              className="inline-block px-6 py-3 bg-dark-800 text-white font-medium rounded-lg border border-dark-700 hover:bg-dark-700 transition"
            >
              View All Templates
            </a>
            <button
              onClick={() => navigate('/editor?isBlankCanvas=true')}
              className="inline-block px-6 py-3 bg-primary text-dark-900 font-medium rounded-lg hover:bg-primary-300 transition"
            >
              Create from Scratch
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div ref={featuresRef} className="mt-24 mb-12"> {/* 👈 Add ref here */}
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Create with <span className="text-primary">superpowers</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-dark-800 p-6 rounded-lg border border-dark-700">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <Zap size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Lightning Fast</h3>
              <p className="text-gray-300">
                Go from idea to shareable meme in under 30 seconds with our optimized workflow.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-dark-800 p-6 rounded-lg border border-dark-700">
              <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4">
                <Sparkles size={24} className="text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Pro-Level Tools</h3>
              <p className="text-gray-300">
                Advanced text customization, layering, and special effects without the complexity.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-dark-800 p-6 rounded-lg border border-dark-700">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <Zap size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Share Anywhere</h3>
              <p className="text-gray-300">
                Export for any platform or share directly to social media with optimized formats.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
