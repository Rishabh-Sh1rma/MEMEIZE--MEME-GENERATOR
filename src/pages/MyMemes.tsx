import React, { useEffect, useState } from 'react';
import { Download, Share } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useUser } from '@supabase/auth-helpers-react';

interface Meme {
  id: string;
  title: string;
  image_url: string;
  created_at: string;
}

const MyMemes: React.FC = () => {
  const user = useUser();
  const [memes, setMemes] = useState<Meme[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) fetchUserMemes();
  }, [user]);

  const fetchUserMemes = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('memes')
      .select('*')
      .eq('user_id', user?.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Failed to fetch memes:', error.message);
    } else {
      setMemes(data || []);
    }
    setLoading(false);
  };

  const downloadImage = (url: string, id: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `meme-${id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const shareImage = async (url: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out this meme!',
          url,
        });
      } catch (error) {
        alert('Failed to share: ' + (error as Error).message);
      }
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Saved Memes</h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : memes.length === 0 ? (
        <p className="text-gray-500">No memes saved yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {memes.map((meme) => (
            <div key={meme.id} className="bg-white rounded-lg shadow hover:shadow-lg transition duration-200">
              <img
                src={meme.image_url}
                alt={meme.title}
                className="w-full h-60 object-cover rounded-t-lg"
              />
              <div className="p-3">
                <p className="font-semibold truncate">{meme.title || 'Untitled Meme'}</p>
                <div className="mt-2 flex justify-between">
                  <button
                    onClick={() => downloadImage(meme.image_url, meme.id)}
                    className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
                  >
                    <Download size={16} className="mr-1" />
                    Download
                  </button>
                  <button
                    onClick={() => shareImage(meme.image_url)}
                    className="flex items-center text-green-600 hover:text-green-800 text-sm"
                  >
                    <Share size={16} className="mr-1" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyMemes;
