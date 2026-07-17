'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

function IconUpload({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>;
}
function IconTrash2({ size = 16 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>;
}
function IconMove({ size = 12 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="5 9 2 12 5 15"/><polyline points="9 5 12 2 15 5"/><polyline points="15 19 12 22 9 19"/><polyline points="19 9 22 12 19 15"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="12" y1="2" x2="12" y2="22"/></svg>;
}

interface TShirtCustomizerProps {
  productName: string;
  basePrice: number;
  image?: string;
  sizes?: string[];
  colors?: string[];
  onCustomizationChange?: (data: { color: string; size: string; designImage: string | null }) => void;
}

const colorMap: Record<string, string> = {
  White: '#FFFFFF', Black: '#1A1A1A', Navy: '#1B2A4A', Red: '#D85A30',
  Sage: '#9CAF88', Charcoal: '#36454F',
};

const defaultSizes = ['S', 'M', 'L', 'XL', '2XL', '3XL'];

export default function TShirtCustomizer({ productName, basePrice, image: productImage, sizes: availableSizes, colors: availableColors, onCustomizationChange }: TShirtCustomizerProps) {
  const colorOptions = availableColors?.map((c) => ({ name: c, hex: colorMap[c] || '#ccc' })) || Object.entries(colorMap).map(([name, hex]) => ({ name, hex }));
  const sizeOptions = availableSizes || defaultSizes;

  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  const [selectedSize, setSelectedSize] = useState(sizeOptions[1] || sizeOptions[0]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [designX, setDesignX] = useState(200);
  const [designY, setDesignY] = useState(270);
  const [designW, setDesignW] = useState(100);
  const [isDragging, setIsDragging] = useState(false);
  const prevMouse = useRef({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const notify = useCallback((color: string, size: string, design: string | null) => {
    onCustomizationChange?.({ color, size, designImage: design });
  }, [onCustomizationChange]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setUploadedImage(dataUrl);
      notify(selectedColor.name, selectedSize, dataUrl);
    };
    reader.readAsDataURL(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleColorChange = (c: typeof colorOptions[0]) => {
    setSelectedColor(c);
    notify(c.name, selectedSize, uploadedImage);
  };

  const handleSizeChange = (s: string) => {
    setSelectedSize(s);
    notify(selectedColor.name, s, uploadedImage);
  };

  const getSVGPoint = (clientX: number, clientY: number) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const rect = svgRef.current.getBoundingClientRect();
    const scaleX = 400 / rect.width;
    const scaleY = 520 / rect.height;
    return { x: (clientX - rect.left) * scaleX, y: (clientY - rect.top) * scaleY };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!uploadedImage) return;
    const pt = getSVGPoint(e.clientX, e.clientY);
    setIsDragging(true);
    prevMouse.current = { x: pt.x, y: pt.y };
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !uploadedImage) return;
    const pt = getSVGPoint(e.clientX, e.clientY);
    const dx = pt.x - prevMouse.current.x;
    const dy = pt.y - prevMouse.current.y;
    prevMouse.current = { x: pt.x, y: pt.y };
    setDesignX((p) => Math.max(80, Math.min(320, p + dx)));
    setDesignY((p) => Math.max(170, Math.min(420, p + dy)));
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleWheel = (e: React.WheelEvent) => {
    if (!uploadedImage) return;
    e.preventDefault();
    setDesignW((p) => Math.max(40, Math.min(180, p - Math.sign(e.deltaY) * 8)));
  };

  const resetDesign = () => {
    setUploadedImage(null);
    setDesignX(200); setDesignY(270); setDesignW(100);
    notify(selectedColor.name, selectedSize, null);
  };

  const shirtColor = selectedColor.hex;
  const strokeColor = selectedColor.name === 'White' ? '#d0d0d0' : 'rgba(255,255,255,0.15)';
  const dashColor = selectedColor.name === 'White' ? '#bbb' : 'rgba(255,255,255,0.3)';

  return (
    <div className="grid md:grid-cols-2 gap-10">
      <div className="space-y-6">
        {productImage && (
          <div className="rounded-2xl overflow-hidden border border-gray-200 bg-gray-50 mx-auto max-w-[450px]">
            <img src={productImage} alt={productName} className="w-full h-auto object-cover" />
          </div>
        )}

        <div>
          <div className="text-center mb-3">
            <h2 className="text-sm font-semibold text-dark">Interactive Preview</h2>
            <p className="text-xs text-gray-400">{selectedColor.name} &middot; Size {selectedSize}</p>
          </div>

          <div className="mx-auto max-w-[450px]"
            onWheel={handleWheel}
            style={{ touchAction: uploadedImage ? 'none' : 'auto' }}
          >
            <svg
              ref={svgRef}
              viewBox="0 0 400 520"
              className="w-full h-auto block rounded-2xl border-2 border-gray-200 select-none drop-shadow-md"
              style={{ backgroundColor: shirtColor }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <path
                d="M200 45 C160 45 120 55 85 75 C65 87 50 110 45 130 L40 155 L70 155 L70 440 C70 470 95 490 125 490 L275 490 C305 490 330 470 330 440 L330 155 L360 155 L355 130 C350 110 335 87 315 75 C280 55 240 45 200 45Z"
                fill={shirtColor}
                stroke={strokeColor}
                strokeWidth="2"
              />
              <path d="M200 45 C160 45 120 55 85 75" fill="none" stroke={strokeColor} strokeWidth="1" />
              <path d="M315 75 C335 87 350 110 355 130" fill="none" stroke={strokeColor} strokeWidth="1" />
              <path d="M130 155 L130 100 C130 90 140 85 150 85 L170 85" fill="none" stroke={strokeColor} strokeWidth="1" />
              <path d="M270 155 L270 100 C270 90 260 85 250 85 L230 85" fill="none" stroke={strokeColor} strokeWidth="1" />

              <rect x="120" y="170" width="160" height="180" rx="8"
                fill="none" stroke={dashColor} strokeWidth="1.5" strokeDasharray="6,4"
              />

              {uploadedImage && (
                <image
                  href={uploadedImage}
                  x={designX - designW / 2}
                  y={designY - designW / 2}
                  width={designW}
                  height={designW}
                  preserveAspectRatio="xMidYMid meet"
                  style={{ cursor: 'grab', filter: isDragging ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' : 'none' }}
                />
              )}
            </svg>
          </div>

          {uploadedImage && (
            <div className="flex items-center justify-center gap-4 mt-3 text-xs text-gray-400">
              <span className="flex items-center gap-1"><IconMove size={12} /> Drag to position</span>
              <span className="flex items-center gap-1">Scroll to resize</span>
            </div>
          )}
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-bold text-dark mb-2">{productName}</h1>
        <p className="text-2xl font-bold text-brand-500 mb-6">${basePrice.toFixed(2)}</p>

        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold text-dark mb-3">Choose Color</p>
            <div className="flex flex-wrap gap-3">
              {colorOptions.map((c) => (
                <button key={c.name} onClick={() => handleColorChange(c)}
                  className={`w-10 h-10 rounded-full border-2 transition-all ${
                    selectedColor.name === c.name
                      ? 'border-brand-500 ring-2 ring-brand-500/30 scale-110'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  style={{ backgroundColor: c.hex }} title={c.name}
                />
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2 font-medium">{selectedColor.name}</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-dark mb-3">Choose Size</p>
            <div className="flex flex-wrap gap-2">
              {sizeOptions.map((s) => (
                <button key={s} onClick={() => handleSizeChange(s)}
                  className={`min-w-[48px] px-4 py-2.5 rounded-lg text-sm font-medium border transition-all ${
                    selectedSize === s
                      ? 'bg-brand-500 text-white border-brand-500 shadow-md'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-brand-300 hover:text-brand-500'
                  }`}
                >{s}</button>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <p className="text-sm font-semibold text-dark mb-3">Upload Your Design</p>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            <button onClick={() => fileInputRef.current?.click()}
              className={`flex items-center justify-center gap-2 w-full px-5 py-4 rounded-xl border-2 border-dashed transition-all ${
                uploadedImage
                  ? 'border-brand-300 bg-brand-50 text-brand-600 hover:bg-brand-100'
                  : 'border-gray-300 bg-gray-50 text-gray-500 hover:border-brand-400 hover:text-brand-500'
              }`}
            >
              <IconUpload size={20} />
              <span className="font-medium">{uploadedImage ? 'Replace Design' : 'Click to Upload Image'}</span>
            </button>
            <p className="text-xs text-gray-400 mt-1.5">Supports PNG, JPG, SVG &mdash; transparent backgrounds work best</p>
          </div>

          {uploadedImage && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <div className="w-14 h-14 rounded-lg overflow-hidden border border-gray-200 bg-white shrink-0 flex items-center justify-center">
                <img src={uploadedImage} alt="" className="max-w-full max-h-full object-contain" />
              </div>
              <div>
                <p className="text-sm font-medium text-dark">Design uploaded</p>
                <p className="text-xs text-gray-400">Drag on preview to position &middot; Scroll to resize</p>
              </div>
            </div>
          )}

          {uploadedImage && (
            <div className="bg-gray-50 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-dark">Design Size</p>
                <span className="text-xs text-gray-400">{Math.round((designW / 200) * 100)}%</span>
              </div>
              <input type="range" min="40" max="180" value={designW}
                onChange={(e) => setDesignW(Number(e.target.value))}
                className="w-full accent-brand-500 h-2"
              />
              <button onClick={resetDesign}
                className="w-full flex items-center justify-center gap-2 text-sm text-red-500 hover:text-red-600 hover:bg-red-50 py-2.5 rounded-lg transition-colors"
              >
                <IconTrash2 size={16} /> Remove Design
              </button>
            </div>
          )}

          <div className="bg-brand-50 rounded-xl p-4">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-dark">Premium Quality Printing</span>
              <br />Vibrant colors &middot; Wash-resistant &middot; Eco-friendly inks
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
