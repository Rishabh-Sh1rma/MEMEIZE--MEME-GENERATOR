// src/components/editor/MemeCanvas.tsx
import React, { useRef, useEffect, useState } from 'react';
import { fabric } from 'fabric';
import WebFont from 'webfontloader';
import { useLocation } from 'react-router-dom';
import { MoveVertical, Move, Type, Image, Download, Share, Undo, Redo, ImagePlus } from 'lucide-react';
import TextToolbar from './TextToolbar';
import ShareModal from './ShareModal';
import { useDropzone } from 'react-dropzone';

import { supabase } from '../../lib/supabase';
import { useUser } from '@supabase/auth-helpers-react';

const GOOGLE_FONTS = ['Anton', 'Arial', 'Comic Sans MS', 'Impact', 'Times New Roman'];
const STICKERS = ['/stickers/star.png', '/stickers/heart.png', '/stickers/thumbs-up.png'];

const MemeCanvas: React.FC = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const urlFromQuery = urlParams.get('templateUrl');
  const blankCanvas = urlParams.get('isBlankCanvas') === 'true';

  const [imageUrl, setImageUrl] = useState<string | null>(blankCanvas ? null : urlFromQuery);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const [activeObject, setActiveObject] = useState<fabric.Object | null>(null);
  const [showTextToolbar, setShowTextToolbar] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('');
  const [undoStack, setUndoStack] = useState<string[]>([]);
  const [redoStack, setRedoStack] = useState<string[]>([]);
  const [isUndoRedoBusy, setIsUndoRedoBusy] = useState(false);

  const user = useUser();

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.gif'] },
    onDrop: (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const url = URL.createObjectURL(file);
        addImageToCanvas(url);
      });
    },
  });

  useEffect(() => {
    WebFont.load({ google: { families: GOOGLE_FONTS } });
  }, []);

  const saveState = () => {
    if (!fabricCanvasRef.current || isUndoRedoBusy) return;
    const json = fabricCanvasRef.current.toJSON();
    setUndoStack((prev) => [...prev, JSON.stringify(json)]);
    setRedoStack([]);
  };

  const undo = () => {
    if (!fabricCanvasRef.current || undoStack.length <= 1) return;
    setIsUndoRedoBusy(true);
    setUndoStack((prev) => {
      const newUndo = [...prev];
      const current = newUndo.pop()!;
      const previous = newUndo[newUndo.length - 1];
      setRedoStack((redo) => [...redo, current]);
      fabricCanvasRef.current!.loadFromJSON(previous, () => {
        fabricCanvasRef.current!.renderAll();
        setIsUndoRedoBusy(false);
      });
      return newUndo;
    });
  };

  const redo = () => {
    if (!fabricCanvasRef.current || redoStack.length === 0) return;
    setIsUndoRedoBusy(true);
    setRedoStack((prev) => {
      const newRedo = [...prev];
      const next = newRedo.pop()!;
      setUndoStack((undo) => [...undo, JSON.stringify(fabricCanvasRef.current!.toJSON())]);
      fabricCanvasRef.current!.loadFromJSON(next, () => {
        fabricCanvasRef.current!.renderAll();
        setIsUndoRedoBusy(false);
      });
      return newRedo;
    });
  };

  const addImageToCanvas = (url: string) => {
    fabric.Image.fromURL(url, (img) => {
      const canvas = fabricCanvasRef.current!;
      img.scaleToWidth(200);
      img.set({ left: 200, top: 200, selectable: true });
      canvas.add(img);
      canvas.setActiveObject(img);
      canvas.renderAll();
      saveState();
    });
  };

  const loadImage = (url: string) => {
    fabric.Image.fromURL(url, (img) => {
      const canvas = fabricCanvasRef.current!;
      canvas.clear();
      canvas.setWidth(600);
      canvas.setHeight(600);
      const scale = Math.min(canvas.width! / img.width!, canvas.height! / img.height!);
      img.set({ left: (canvas.width! - img.width! * scale) / 2, top: (canvas.height! - img.height! * scale) / 2, selectable: false, evented: false });
      img.scale(scale);
      canvas.add(img);
      canvas.sendToBack(img);
      canvas.renderAll();
      saveState();
    }, { crossOrigin: 'anonymous' });
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
      width: 600,
      height: 600,
      backgroundColor: '#f0f0f0',
      preserveObjectStacking: true,
    });

    const canvas = fabricCanvasRef.current;
    if (!blankCanvas && imageUrl) loadImage(imageUrl);
    else canvas.setBackgroundColor('#f0f0f0', canvas.renderAll.bind(canvas));

    const onSelectionChange = (e: fabric.IEvent) => {
      const selected = (e.selected && e.selected.length > 0) ? e.selected[0] : null;
      setActiveObject(selected);
      setShowTextToolbar(selected?.type === 'textbox');
    };

    canvas.on('selection:created', onSelectionChange);
    canvas.on('selection:updated', onSelectionChange);
    canvas.on('selection:cleared', () => { setActiveObject(null); setShowTextToolbar(false); });
    canvas.on('object:added', saveState);
    canvas.on('object:modified', saveState);
    canvas.on('object:removed', saveState);

    return () => {
      canvas.dispose();
    };
  }, [imageUrl, blankCanvas]);

  const addText = () => {
    if (!fabricCanvasRef.current) return;
    const text = new fabric.Textbox('YOUR TEXT HERE', {
      left: 50,
      top: 50,
      fontFamily: 'Anton',
      fontSize: 40,
      fill: 'white',
      stroke: 'black',
      strokeWidth: 1,
      textAlign: 'center',
      width: 300,
    });
    fabricCanvasRef.current.add(text);
    fabricCanvasRef.current.setActiveObject(text);
    setActiveObject(text);
    setShowTextToolbar(true);
    saveState();
  };

  const updateTextProperty = (property: string, value: any) => {
    if (!activeObject || !fabricCanvasRef.current) return;
    activeObject.set({ [property]: value });
    fabricCanvasRef.current.renderAll();
    saveState();
  };

  const addSticker = (src: string) => {
    fabric.Image.fromURL(src, (img) => {
      img.scaleToWidth(100);
      img.set({ left: 250, top: 250 });
      fabricCanvasRef.current!.add(img);
      fabricCanvasRef.current!.renderAll();
      saveState();
    });
  };

  const downloadMeme = () => {
    if (!fabricCanvasRef.current) return;
    const dataURL = fabricCanvasRef.current.toDataURL({ format: 'jpeg', quality: 0.8 });
    const link = document.createElement('a');
    link.download = 'memeize-creation.jpg';
    link.href = dataURL;
    link.click();
  };

  const uploadImageToImgbb = async (base64Image: string) => {
    const apiKey = 'b8e1ae43c05b97f357826d2f549b7f3a';
    const formData = new FormData();
    formData.append('image', base64Image.split(',')[1]);
    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, { method: 'POST', body: formData });
      const data = await response.json();
      return data.data.url;
    } catch (error) {
      console.error('Error uploading to imgbb:', error);
      return null;
    }
  };

  const handleShare = async () => {
    if (!fabricCanvasRef.current) return;
    const dataURL = fabricCanvasRef.current.toDataURL({ format: 'jpeg', quality: 0.8 });
    const uploadedUrl = await uploadImageToImgbb(dataURL);
    if (uploadedUrl) {
      setUploadedImageUrl(uploadedUrl);
      setShowShareModal(true);
    } else alert('Failed to upload image.');
  };

  const saveMeme = async (imageUrlToSave: string) => {
    if (!user) return alert('Please log in first to save memes.');
    try {
      const { error } = await supabase.from('memes').insert([{ user_id: user.id, title: 'User Created Meme', image_url: imageUrlToSave }]);
      if (error) throw error;
      alert('Meme saved successfully!');
    } catch (error) {
      alert('Failed to save meme: ' + (error as Error).message);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="bg-dark-800 p-4 rounded-t-lg border border-dark-700 flex justify-between">
        <div className="flex space-x-2">
          <button onClick={addText} className="p-2 bg-dark-700 hover:bg-dark-600 text-gray-300 rounded-md flex items-center">
            <Type size={20} className="mr-2" /> <span>Add Text</span>
          </button>
          <button onClick={undo} className="p-2 bg-dark-700 hover:bg-dark-600 text-gray-300 rounded-md"><Undo size={20} /></button>
          <button onClick={redo} className="p-2 bg-dark-700 hover:bg-dark-600 text-gray-300 rounded-md"><Redo size={20} /></button>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <button className="p-2 bg-dark-700 hover:bg-dark-600 text-gray-300 rounded-md flex items-center">
              <ImagePlus size={20} className="mr-2" /> <span>Upload Image(s)</span>
            </button>
          </div>
        </div>
        <div className="flex space-x-2">
          <button onClick={downloadMeme} className="p-2 bg-primary text-dark-900 rounded-md flex items-center hover:bg-primary-300 transition">
            <Download size={20} className="mr-2" /> <span>Download</span>
          </button>
          <button onClick={handleShare} className="p-2 bg-secondary hover:bg-secondary-400 text-white rounded-md flex items-center transition">
            <Share size={20} className="mr-2" /> <span>Share</span>
          </button>
          <button onClick={async () => {
            if (!fabricCanvasRef.current) return;
            const dataURL = fabricCanvasRef.current.toDataURL({ format: 'jpeg', quality: 0.8 });
            const uploadedUrl = await uploadImageToImgbb(dataURL);
            if (!uploadedUrl) return alert('Failed to upload meme image.');
            await saveMeme(uploadedUrl);
          }} className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-md flex items-center transition">
            Save
          </button>
        </div>
      </div>

      {showTextToolbar && activeObject?.type === 'textbox' && (
        <TextToolbar activeObject={activeObject as fabric.Textbox} updateTextProperty={updateTextProperty} />
      )}

      <div className="relative bg-dark-900 flex justify-center items-center p-8 rounded-b-lg border-x border-b border-dark-700">
        <div className="canvas-container shadow-xl">
          <canvas ref={canvasRef} />
        </div>
      </div>

      <div className="mt-2 flex space-x-4 overflow-x-auto bg-dark-800 p-2 rounded-md">
        {STICKERS.map((src) => (
          <img key={src} src={src} alt="Sticker" onClick={() => addSticker(src)} className="h-16 w-16 object-contain cursor-pointer hover:scale-110 transition-transform rounded-md" draggable={false} loading="lazy" />
        ))}
      </div>

      {showShareModal && <ShareModal onClose={() => setShowShareModal(false)} imageUrl={uploadedImageUrl} />}
    </div>
  );
};

export default MemeCanvas;