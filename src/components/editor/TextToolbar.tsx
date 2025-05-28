// TextToolbar.tsx
"use client";

import { fabric } from "fabric";
import React from "react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Underline,
} from "lucide-react";

const COLORS = [
  { name: "White", value: "#fff" },
  { name: "Black", value: "#000" },
  { name: "Red", value: "#f87171" },
  { name: "Green", value: "#34d399" },
  { name: "Blue", value: "#60a5fa" },
];

const GOOGLE_FONTS = [
  "Anton",
  "Arial",
  "Comic Sans MS",
  "Impact",
  "Times New Roman",
];

interface TextToolbarProps {
  activeObject: fabric.Textbox | null;
  updateTextProperty: (property: string, value: any) => void;
}

const TextToolbar: React.FC<TextToolbarProps> = ({ activeObject, updateTextProperty }) => {
  if (!activeObject) return null;

  const toggleStyle = (prop: keyof fabric.Textbox, onValue: any, offValue: any) => {
    const current = activeObject[prop];
    updateTextProperty(prop, current === onValue ? offValue : onValue);
  };

  return (
    <div className="flex flex-wrap gap-4 p-4 bg-dark-900 rounded-md shadow-lg">
      <div className="flex flex-col">
        <label className="text-gray-300 text-xs mb-1">Font</label>
        <select
          className="bg-dark-800 text-white rounded-md px-3 py-2 w-36"
          value={activeObject.fontFamily || ""}
          onChange={(e) => updateTextProperty("fontFamily", e.target.value)}
        >
          {GOOGLE_FONTS.map((font) => (
            <option key={font} value={font} style={{ fontFamily: font }}>
              {font}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-gray-300 text-xs mb-1">Size</label>
        <select
          className="bg-dark-800 text-white rounded-md px-3 py-2 w-20"
          value={activeObject.fontSize}
          onChange={(e) => updateTextProperty("fontSize", parseInt(e.target.value))}
        >
          {[12, 16, 24, 36, 48, 64, 72, 96].map((size) => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center space-x-2 bg-dark-800 rounded-md overflow-hidden">
        <button
          className={`p-2 ${activeObject.fontWeight === "bold" ? "bg-dark-600" : ""}`}
          onClick={() => toggleStyle("fontWeight", "bold", "normal")}
          aria-label="Bold"
        >
          <Bold size={16} className="text-gray-300" />
        </button>
        <button
          className={`p-2 ${activeObject.fontStyle === "italic" ? "bg-dark-600" : ""}`}
          onClick={() => toggleStyle("fontStyle", "italic", "normal")}
          aria-label="Italic"
        >
          <Italic size={16} className="text-gray-300" />
        </button>
        <button
          className={`p-2 ${activeObject.underline ? "bg-dark-600" : ""}`}
          onClick={() => toggleStyle("underline", true, false)}
          aria-label="Underline"
        >
          <Underline size={16} className="text-gray-300" />
        </button>
      </div>

      <div className="flex items-center space-x-1 bg-dark-800 rounded-md overflow-hidden">
        <button
          className={`p-2 ${activeObject.textAlign === "left" ? "bg-dark-600" : ""}`}
          onClick={() => updateTextProperty("textAlign", "left")}
          aria-label="Align Left"
        >
          <AlignLeft size={16} className="text-gray-300" />
        </button>
        <button
          className={`p-2 ${activeObject.textAlign === "center" ? "bg-dark-600" : ""}`}
          onClick={() => updateTextProperty("textAlign", "center")}
          aria-label="Align Center"
        >
          <AlignCenter size={16} className="text-gray-300" />
        </button>
        <button
          className={`p-2 ${activeObject.textAlign === "right" ? "bg-dark-600" : ""}`}
          onClick={() => updateTextProperty("textAlign", "right")}
          aria-label="Align Right"
        >
          <AlignRight size={16} className="text-gray-300" />
        </button>
      </div>

      <div className="flex flex-col">
        <label className="text-gray-300 text-xs mb-1">Fill</label>
        <select
          className="bg-dark-800 text-white rounded-md px-3 py-2 w-20"
          value={activeObject.fill?.toString() || ""}
          onChange={(e) => updateTextProperty("fill", e.target.value)}
        >
          {COLORS.map((color) => (
            <option key={color.value} value={color.value} style={{ color: color.value }}>
              {color.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-gray-300 text-xs mb-1">Stroke</label>
        <select
          className="bg-dark-800 text-white rounded-md px-3 py-2 w-20"
          value={activeObject.stroke?.toString() || ""}
          onChange={(e) => updateTextProperty("stroke", e.target.value)}
        >
          {COLORS.map((color) => (
            <option key={color.value} value={color.value} style={{ color: color.value }}>
              {color.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-gray-300 text-xs mb-1">Stroke Width</label>
        <select
          className="bg-dark-800 text-white rounded-md px-3 py-2 w-20"
          value={activeObject.strokeWidth}
          onChange={(e) => updateTextProperty("strokeWidth", parseInt(e.target.value))}
        >
          {[0, 1, 2, 3, 4, 5].map((width) => (
            <option key={width} value={width}>{width}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-gray-300 text-xs mb-1">Background</label>
        <select
          className="bg-dark-800 text-white rounded-md px-3 py-2 w-24"
          value={activeObject.backgroundColor || ""}
          onChange={(e) => updateTextProperty("backgroundColor", e.target.value || "")}
        >
          <option value="">None</option>
          {COLORS.map((color) => (
            <option key={color.value} value={color.value} style={{ backgroundColor: color.value, color: "#fff" }}>
              {color.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-gray-300 text-xs mb-1">Bg Opacity</label>
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={(() => {
            const bg = activeObject.backgroundColor;
            if (!bg) return 1;
            const match = /rgba?\((\d+),\s*(\d+),\s*(\d+),\s*(\d*\.?\d+)\)/.exec(bg);
            return match ? parseFloat(match[4]) : 1;
          })()}
          onChange={(e) => {
            const bg = activeObject.backgroundColor || "rgba(0,0,0,1)";
            const newOpacity = parseFloat(e.target.value);
            const match = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(bg);
            const r = match ? match[1] : "0";
            const g = match ? match[2] : "0";
            const b = match ? match[3] : "0";
            const newColor = `rgba(${r},${g},${b},${newOpacity})`;
            updateTextProperty("backgroundColor", newColor);
          }}
          className="w-24"
        />
      </div>
    </div>
  );
};

export default TextToolbar;