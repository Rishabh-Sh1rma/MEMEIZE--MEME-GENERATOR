import React from 'react';
import { X, Facebook, Twitter, Send, Copy, Apple as WhatsApp } from 'lucide-react';

interface ShareModalProps {
  onClose: () => void;
  imageUrl: string; // Now we pass the uploaded public URL directly
}

const ShareModal: React.FC<ShareModalProps> = ({ onClose, imageUrl }) => {
  const handleShare = async (platform: string) => {
    const encodedURL = encodeURIComponent(imageUrl);

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodedURL}&text=Check out this meme!`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://api.whatsapp.com/send?text=${encodedURL}`, '_blank');
        break;
      case 'telegram':
        window.open(`https://t.me/share/url?url=${encodedURL}`, '_blank');
        break;
      case 'copy':
        try {
          await navigator.clipboard.writeText(imageUrl);
          alert('Link copied to clipboard!');
        } catch (err) {
          console.error('Failed to copy link:', err);
        }
        break;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-dark-800 rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">Share Meme</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition">
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <button onClick={() => handleShare('facebook')} className="flex flex-col items-center p-4 bg-dark-700 rounded-lg hover:bg-dark-600 transition">
            <Facebook size={24} className="text-[#1877F2] mb-2" />
            <span className="text-sm text-gray-300">Facebook</span>
          </button>

          <button onClick={() => handleShare('twitter')} className="flex flex-col items-center p-4 bg-dark-700 rounded-lg hover:bg-dark-600 transition">
            <Twitter size={24} className="text-[#1DA1F2] mb-2" />
            <span className="text-sm text-gray-300">Twitter</span>
          </button>

          <button onClick={() => handleShare('whatsapp')} className="flex flex-col items-center p-4 bg-dark-700 rounded-lg hover:bg-dark-600 transition">
            <WhatsApp size={24} className="text-[#25D366] mb-2" />
            <span className="text-sm text-gray-300">WhatsApp</span>
          </button>

          <button onClick={() => handleShare('telegram')} className="flex flex-col items-center p-4 bg-dark-700 rounded-lg hover:bg-dark-600 transition">
            <Send size={24} className="text-[#0088cc] mb-2" />
            <span className="text-sm text-gray-300">Telegram</span>
          </button>

          <button onClick={() => handleShare('copy')} className="flex flex-col items-center p-4 bg-dark-700 rounded-lg hover:bg-dark-600 transition">
            <Copy size={24} className="text-gray-300 mb-2" />
            <span className="text-sm text-gray-300">Copy Link</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
