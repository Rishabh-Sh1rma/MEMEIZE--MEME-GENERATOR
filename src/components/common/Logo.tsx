import React from 'react';
import { Zap } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <Zap size={28} className="text-primary" />
      <span className="ml-2 text-xl font-bold text-white tracking-tight">
        MEME<span className="text-primary">IZE</span>
      </span>
    </div>
  );
};

export default Logo;