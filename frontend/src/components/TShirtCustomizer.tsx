'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

/* ── Types ── */
interface DesignElement {
  id: string;
  type: 'image' | 'text' | 'clipart' | 'shape';
  x: number;
  y: number;
  w: number;
  h: number;
  content: string;
  fontFamily?: string;
  fontSize?: number;
  color?: string;
  bold?: boolean;
  italic?: boolean;
  shapeType?: string;
  rotation?: number;
}

interface TShirtCustomizerProps {
  productName: string;
  basePrice: number;
  image?: string;
  sizes?: string[];
  colors?: string[];
  onCustomizationChange?: (data: { color: string; size: string; designSnapshot: string | null }) => void;
}

/* ── Constants ── */
const colorMap: Record<string, string> = {
  White: '#FFFFFF', Black: '#1A1A1A', Navy: '#1B2A4A', Red: '#D85A30',
  Sage: '#9CAF88', Charcoal: '#36454F',
};
const defaultSizes = ['S', 'M', 'L', 'XL', '2XL', '3XL'];

const CLIPARTS: { name: string; path: string; viewBox: string }[] = [
  { name: 'Star', viewBox: '0 0 24 24', path: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' },
  { name: 'Heart', viewBox: '0 0 24 24', path: 'M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z' },
  { name: 'Circle', viewBox: '0 0 24 24', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z' },
  { name: 'Triangle', viewBox: '0 0 24 24', path: 'M12 2L2 22h20L12 2z' },
  { name: 'Diamond', viewBox: '0 0 24 24', path: 'M12 2L2 12l10 10 10-10L12 2z' },
  { name: 'Hexagon', viewBox: '0 0 24 24', path: 'M12 2L3 7v10l9 5 9-5V7l-9-5z' },
];

const SHAPES: { name: string; icon: string }[] = [
  { name: 'Square', icon: '□' },
  { name: 'Circle', icon: '○' },
  { name: 'Triangle', icon: '△' },
  { name: 'Diamond', icon: '◇' },
  { name: 'Line', icon: '╱' },
  { name: 'Arrow', icon: '→' },
];

const FONTS = ['Arial', 'Georgia', 'Times New Roman', 'Courier New', 'Verdana', 'Trebuchet MS', 'Comic Sans MS', 'Impact'];

/* ── Helpers ── */
let _id = 0;
const uid = () => `el_${++_id}_${Date.now()}`;

/* ── Icons ── */
const IconDesign = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>;
const IconProduct = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>;
const IconImages = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>;
const IconText = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>;
const IconLayers = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>;
const IconCliparts = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>;
const IconShapes = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 12 12 17 22 12"/><polyline points="2 17 12 22 22 17"/></svg>;
const IconUpload = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>;
const IconTrash = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>;
const IconMove = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="5 9 2 12 5 15"/><polyline points="9 5 12 2 15 5"/><polyline points="15 19 12 22 9 19"/><polyline points="19 9 22 12 19 15"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="12" y1="2" x2="12" y2="22"/></svg>;

/* ── Clipart SVG renderer ── */
function ClipartPreview({ path, viewBox, color }: { path: string; viewBox: string; color?: string }) {
  return <svg viewBox={viewBox} className="w-full h-full" fill={color || '#333'}><path d={path} /></svg>;
}

/* ── Main Component ── */
export default function TShirtCustomizer({ productName, basePrice, image: productImage, sizes: availableSizes, colors: availableColors, onCustomizationChange }: TShirtCustomizerProps) {
  const colorOptions = availableColors?.map((c) => ({ name: c, hex: colorMap[c] || '#ccc' })) || Object.entries(colorMap).map(([name, hex]) => ({ name, hex }));
  const sizeOptions = availableSizes || defaultSizes;

  /* ── State ── */
  const [activeTab, setActiveTab] = useState<string | null>('design');
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  const [selectedSize, setSelectedSize] = useState(sizeOptions[1] || sizeOptions[0]);
  const [elements, setElements] = useState<DesignElement[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [canvasSize, setCanvasSize] = useState({ w: 0, h: 0 });

  /* Text editing */
  const [textContent, setTextContent] = useState('');
  const [textFont, setTextFont] = useState('Arial');
  const [textSize, setTextSize] = useState(32);
  const [textColor, setTextColor] = useState('#333333');
  const [textBold, setTextBold] = useState(false);
  const [textItalic, setTextItalic] = useState(false);

  /* Upload */
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  /* Interaction */
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDir, setResizeDir] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const prevMouse = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasInitDone = useRef(false);

  /* ── Canvas sizing ── */
  useEffect(() => {
    if (!containerRef.current || canvasInitDone.current) return;
    const el = containerRef.current;
    const obs = new ResizeObserver((entries) => {
      for (const e of entries) {
        const w = e.contentRect.width;
        const h = e.contentRect.height;
        if (w > 0 && !canvasInitDone.current) {
          setCanvasSize({ w, h });
          canvasInitDone.current = true;
          obs.disconnect();
        }
      }
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* ── Notification ── */
  const notify = useCallback(() => {
    if (!onCustomizationChange) return;
    onCustomizationChange({
      color: selectedColor.name,
      size: selectedSize,
      designSnapshot: elements.length > 0 ? JSON.stringify(elements) : null,
    });
  }, [onCustomizationChange, selectedColor, selectedSize, elements]);

  useEffect(() => { notify(); }, [notify]);

  /* ── Handlers ── */
  const getCanvasPt = (clientX: number, clientY: number) => {
    if (!containerRef.current) return { x: 0, y: 0 };
    const r = containerRef.current.getBoundingClientRect();
    return { x: clientX - r.left, y: clientY - r.top };
  };

  const addElement = (el: Omit<DesignElement, 'id'>) => {
    const id = uid();
    setElements((prev) => [...prev, { ...el, id }]);
    setSelectedId(id);
  };

  const updateElement = (id: string, patch: Partial<DesignElement>) => {
    setElements((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  };

  const removeElement = (id: string) => {
    setElements((prev) => prev.filter((e) => e.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const bringForward = (id: string) => {
    setElements((prev) => {
      const idx = prev.findIndex((e) => e.id === id);
      if (idx < 0 || idx === prev.length - 1) return prev;
      const arr = [...prev];
      [arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]];
      return arr;
    });
  };

  const sendBackward = (id: string) => {
    setElements((prev) => {
      const idx = prev.findIndex((e) => e.id === id);
      if (idx <= 0) return prev;
      const arr = [...prev];
      [arr[idx], arr[idx - 1]] = [arr[idx - 1], arr[idx]];
      return arr;
    });
  };

  /* Image upload */
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = ev.target?.result as string;
      setUploadedImage(url);
      addElement({ type: 'image', x: canvasSize.w * 0.3, y: canvasSize.h * 0.25, w: 100, h: 100, content: url });
    };
    reader.readAsDataURL(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  /* Add text */
  const handleAddText = () => {
    if (!textContent.trim()) return;
    addElement({
      type: 'text', x: canvasSize.w * 0.3, y: canvasSize.h * 0.3,
      w: 200, h: 50, content: textContent,
      fontFamily: textFont, fontSize: textSize, color: textColor,
      bold: textBold, italic: textItalic,
    });
  };

  /* Add clipart */
  const handleAddClipart = (clipart: typeof CLIPARTS[0]) => {
    addElement({
      type: 'clipart', x: canvasSize.w * 0.3, y: canvasSize.h * 0.25,
      w: 80, h: 80, content: clipart.name,
      color: selectedColor.name === 'White' ? '#333' : '#fff',
    });
  };

  /* Add shape */
  const handleAddShape = (shape: typeof SHAPES[0]) => {
    addElement({
      type: 'shape', x: canvasSize.w * 0.3, y: canvasSize.h * 0.25,
      w: 80, h: 80, content: shape.name,
      color: selectedColor.name === 'White' ? '#333' : '#fff',
      shapeType: shape.name.toLowerCase(),
    });
  };

  /* Canvas mouse */
  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    const pt = getCanvasPt(e.clientX, e.clientY);
    const clicked = [...elements].reverse().find((el) => pt.x >= el.x && pt.x <= el.x + el.w && pt.y >= el.y && pt.y <= el.y + el.h);
    if (clicked) {
      setSelectedId(clicked.id);
      setDragOffset({ x: pt.x - clicked.x, y: pt.y - clicked.y });
      setIsDragging(true);
      e.preventDefault();
    } else {
      setSelectedId(null);
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !selectedId || !containerRef.current) return;
    const pt = getCanvasPt(e.clientX, e.clientY);
    const cw = containerRef.current.clientWidth;
    const ch = containerRef.current.clientHeight;
    setElements((prev) => prev.map((el) => {
      if (el.id !== selectedId) return el;
      let nx = pt.x - dragOffset.x;
      let ny = pt.y - dragOffset.y;
      nx = Math.max(0, Math.min(cw - el.w, nx));
      ny = Math.max(0, Math.min(ch - el.h, ny));
      return { ...el, x: nx, y: ny };
    }));
  };

  const handleCanvasMouseUp = () => { setIsDragging(false); setIsResizing(false); };

  /* Scroll to resize selected */
  const handleCanvasWheel = (e: React.WheelEvent) => {
    if (!selectedId) return;
    e.preventDefault();
    const el = elements.find((e) => e.id === selectedId);
    if (!el) return;
    const delta = -Math.sign(e.deltaY) * 6;
    setElements((prev) => prev.map((e) => {
      if (e.id !== selectedId) return e;
      const nw = Math.max(30, Math.min(300, e.w + delta));
      const nh = e.type === 'text' ? nw * 0.25 : nw;
      return { ...e, w: nw, h: nh };
    }));
  };

  const handleColor = (c: typeof colorOptions[0]) => {
    setSelectedColor(c);
    setElements((prev) => prev.map((el) => {
      if (el.type === 'clipart' || el.type === 'shape') {
        return { ...el, color: c.name === 'White' ? '#333' : '#fff' };
      }
      return el;
    }));
  };

  const handleSize = (s: string) => setSelectedSize(s);

  /* ── Render helpers ── */
  const selectedEl = elements.find((e) => e.id === selectedId);

  /* ── Render ── */
  return (
    <div className="flex flex-col gap-0 bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50/50">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-700">{selectedColor.name} &middot; {selectedSize}</span>
        </div>
        <h2 className="text-sm font-bold text-dark truncate max-w-[200px]">{productName}</h2>
        <div className="flex items-center gap-2">
          {elements.length > 0 && (
            <span className="text-xs bg-brand-100 text-brand-700 px-2 py-0.5 rounded-full font-medium">{elements.length} items</span>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* ── Left Sidebar ── */}
        <div className="flex md:flex-col bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200">
          <button onClick={() => setActiveTab(activeTab === 'design' ? null : 'design')}
            className={`flex-1 md:w-auto p-3 flex flex-col items-center gap-1 text-xs border-b border-gray-200 transition-colors ${activeTab === 'design' ? 'text-brand-600 bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
          ><IconDesign /><span>Design</span></button>
          <button onClick={() => setActiveTab(activeTab === 'product' ? null : 'product')}
            className={`flex-1 md:w-auto p-3 flex flex-col items-center gap-1 text-xs border-b border-gray-200 transition-colors ${activeTab === 'product' ? 'text-brand-600 bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
          ><IconProduct /><span>Product</span></button>
          <button onClick={() => setActiveTab(activeTab === 'images' ? null : 'images')}
            className={`flex-1 md:w-auto p-3 flex flex-col items-center gap-1 text-xs border-b border-gray-200 transition-colors ${activeTab === 'images' ? 'text-brand-600 bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
          ><IconImages /><span>Images</span></button>
          <button onClick={() => setActiveTab(activeTab === 'text' ? null : 'text')}
            className={`flex-1 md:w-auto p-3 flex flex-col items-center gap-1 text-xs border-b border-gray-200 transition-colors ${activeTab === 'text' ? 'text-brand-600 bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
          ><IconText /><span>Text</span></button>
          <button onClick={() => setActiveTab(activeTab === 'layers' ? null : 'layers')}
            className={`flex-1 md:w-auto p-3 flex flex-col items-center gap-1 text-xs border-b border-gray-200 transition-colors ${activeTab === 'layers' ? 'text-brand-600 bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
          ><IconLayers /><span>Layers</span></button>
          <button onClick={() => setActiveTab(activeTab === 'cliparts' ? null : 'cliparts')}
            className={`flex-1 md:w-auto p-3 flex flex-col items-center gap-1 text-xs border-b border-gray-200 transition-colors ${activeTab === 'cliparts' ? 'text-brand-600 bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
          ><IconCliparts /><span>Cliparts</span></button>
          <button onClick={() => setActiveTab(activeTab === 'shapes' ? null : 'shapes')}
            className={`flex-1 md:w-auto p-3 flex flex-col items-center gap-1 text-xs border-b border-gray-200 transition-colors ${activeTab === 'shapes' ? 'text-brand-600 bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
          ><IconShapes /><span>Shapes</span></button>
        </div>

        {/* ── Tab Panel ── */}
        {activeTab && (
          <div className="w-full md:w-72 border-b md:border-b-0 md:border-r border-gray-200 bg-white overflow-y-auto max-h-[500px] md:max-h-[600px]">
            {/* Design Tab */}
            {activeTab === 'design' && (
              <div className="p-4 space-y-4">
                <h3 className="text-sm font-bold text-dark">Design Tools</h3>
                <p className="text-xs text-gray-500">Use the sidebar tabs to add and customize elements on your product.</p>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => setActiveTab('text')} className="p-3 rounded-lg border border-gray-200 text-center hover:border-brand-300 hover:bg-brand-50 transition-all">
                    <IconText /><span className="block text-xs mt-1 font-medium text-gray-700">Add Text</span>
                  </button>
                  <button onClick={() => setActiveTab('images')} className="p-3 rounded-lg border border-gray-200 text-center hover:border-brand-300 hover:bg-brand-50 transition-all">
                    <IconImages /><span className="block text-xs mt-1 font-medium text-gray-700">Add Image</span>
                  </button>
                  <button onClick={() => setActiveTab('cliparts')} className="p-3 rounded-lg border border-gray-200 text-center hover:border-brand-300 hover:bg-brand-50 transition-all">
                    <IconCliparts /><span className="block text-xs mt-1 font-medium text-gray-700">Cliparts</span>
                  </button>
                  <button onClick={() => setActiveTab('shapes')} className="p-3 rounded-lg border border-gray-200 text-center hover:border-brand-300 hover:bg-brand-50 transition-all">
                    <IconShapes /><span className="block text-xs mt-1 font-medium text-gray-700">Shapes</span>
                  </button>
                </div>
                {elements.length > 0 && (
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-500 mb-2">Quick actions:</p>
                    <button onClick={() => { setElements([]); setSelectedId(null); }}
                      className="w-full text-xs text-red-500 hover:text-red-600 hover:bg-red-50 py-2 rounded-lg transition-colors"
                    >Clear all elements</button>
                  </div>
                )}
              </div>
            )}

            {/* Product Tab */}
            {activeTab === 'product' && (
              <div className="p-4 space-y-5">
                <h3 className="text-sm font-bold text-dark">Product Options</h3>
                <div>
                  <p className="text-xs font-semibold text-gray-600 mb-2">Color</p>
                  <div className="flex flex-wrap gap-2">
                    {colorOptions.map((c) => (
                      <button key={c.name} onClick={() => handleColor(c)}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor.name === c.name ? 'border-brand-500 ring-2 ring-brand-500/30 scale-110' : 'border-gray-300 hover:border-gray-400'}`}
                        style={{ backgroundColor: c.hex }} title={c.name}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1 font-medium">{selectedColor.name}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-600 mb-2">Size</p>
                  <div className="flex flex-wrap gap-1.5">
                    {sizeOptions.map((s) => (
                      <button key={s} onClick={() => handleSize(s)}
                        className={`min-w-[40px] px-3 py-2 rounded-lg text-xs font-medium border transition-all ${selectedSize === s ? 'bg-brand-500 text-white border-brand-500' : 'bg-white border-gray-200 text-gray-600 hover:border-brand-300'}`}
                      >{s}</button>
                    ))}
                  </div>
                </div>
                <div className="bg-brand-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600"><span className="font-semibold text-dark">Price:</span> ${basePrice.toFixed(2)}</p>
                </div>
              </div>
            )}

            {/* Images Tab */}
            {activeTab === 'images' && (
              <div className="p-4 space-y-4">
                <h3 className="text-sm font-bold text-dark">Upload Image</h3>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
                <button onClick={() => fileInputRef.current?.click()}
                  className="flex items-center justify-center gap-2 w-full px-4 py-6 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 text-gray-500 hover:border-brand-400 hover:text-brand-500 hover:bg-brand-50 transition-all"
                ><IconUpload /><span className="font-medium text-sm">Click to Upload</span></button>
                <p className="text-xs text-gray-400">PNG, JPG, SVG &mdash; transparent backgrounds work best</p>
                {elements.filter(e => e.type === 'image').length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-gray-100">
                    <p className="text-xs font-semibold text-gray-600">Uploaded Images</p>
                    <div className="grid grid-cols-3 gap-2">
                      {elements.filter(e => e.type === 'image').map((img) => (
                        <div key={img.id} className={`relative aspect-square rounded-lg overflow-hidden border-2 cursor-pointer ${selectedId === img.id ? 'border-brand-500' : 'border-gray-200'}`}
                          onClick={() => setSelectedId(img.id)}
                        >
                          <img src={img.content} alt="" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Text Tab */}
            {activeTab === 'text' && (
              <div className="p-4 space-y-4">
                <h3 className="text-sm font-bold text-dark">Add Text</h3>
                <div>
                  <p className="text-xs font-semibold text-gray-600 mb-1">Text Content</p>
                  <input type="text" value={textContent} onChange={(e) => setTextContent(e.target.value)}
                    placeholder="Enter your text..." className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-400"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-600 mb-1">Font</p>
                  <select value={textFont} onChange={(e) => setTextFont(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-400"
                  >{FONTS.map((f) => <option key={f} value={f} style={{ fontFamily: f }}>{f}</option>)}</select>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-600 mb-1">Size: {textSize}px</p>
                  <input type="range" min="10" max="96" value={textSize} onChange={(e) => setTextSize(Number(e.target.value))}
                    className="w-full accent-brand-500 h-1.5"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-600 mb-1">Color</p>
                  <div className="flex items-center gap-2">
                    <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)}
                      className="w-10 h-10 rounded cursor-pointer border border-gray-200"
                    />
                    <span className="text-xs text-gray-500">{textColor}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setTextBold(!textBold)}
                    className={`px-4 py-2 rounded-lg text-sm font-bold border transition-all ${textBold ? 'bg-brand-500 text-white border-brand-500' : 'bg-white border-gray-200 text-gray-600 hover:border-brand-300'}`}
                  >B</button>
                  <button onClick={() => setTextItalic(!textItalic)}
                    className={`px-4 py-2 rounded-lg text-sm italic border transition-all ${textItalic ? 'bg-brand-500 text-white border-brand-500' : 'bg-white border-gray-200 text-gray-600 hover:border-brand-300'}`}
                  >I</button>
                </div>
                <button onClick={handleAddText} disabled={!textContent.trim()}
                  className="w-full py-2.5 rounded-lg text-sm font-semibold bg-brand-500 text-white hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >Add Text to Design</button>
              </div>
            )}

            {/* Layers Tab */}
            {activeTab === 'layers' && (
              <div className="p-4 space-y-3">
                <h3 className="text-sm font-bold text-dark">Layers</h3>
                {elements.length === 0 ? (
                  <p className="text-xs text-gray-400 text-center py-8">No elements yet. Add text, images, cliparts or shapes.</p>
                ) : (
                  <div className="space-y-1">
                    {[...elements].reverse().map((el, i) => (
                      <div key={el.id}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs border cursor-pointer transition-all ${selectedId === el.id ? 'border-brand-500 bg-brand-50' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
                        onClick={() => setSelectedId(el.id)}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-gray-400 font-mono w-4 shrink-0">#{elements.length - i}</span>
                          <span className={`inline-block w-5 h-5 rounded flex items-center justify-center text-xs ${selectedId === el.id ? 'text-brand-600' : 'text-gray-500'}`}>
                            {el.type === 'text' ? 'T' : el.type === 'image' ? '🖼' : el.type === 'clipart' ? '❤' : '◇'}
                          </span>
                          <span className="text-gray-700 truncate max-w-[100px]">
                            {el.type === 'text' ? el.content : el.type === 'image' ? 'Image' : el.content}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button onClick={(e) => { e.stopPropagation(); bringForward(el.id); }}
                            className="p-1 text-gray-400 hover:text-gray-600" title="Bring forward"
                          >↑</button>
                          <button onClick={(e) => { e.stopPropagation(); sendBackward(el.id); }}
                            className="p-1 text-gray-400 hover:text-gray-600" title="Send backward"
                          >↓</button>
                          <button onClick={(e) => { e.stopPropagation(); removeElement(el.id); }}
                            className="p-1 text-red-400 hover:text-red-600" title="Delete"
                          ><IconTrash /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Cliparts Tab */}
            {activeTab === 'cliparts' && (
              <div className="p-4 space-y-4">
                <h3 className="text-sm font-bold text-dark">Cliparts</h3>
                <div className="grid grid-cols-3 gap-3">
                  {CLIPARTS.map((c) => (
                    <button key={c.name} onClick={() => handleAddClipart(c)}
                      className="aspect-square p-3 rounded-xl border border-gray-200 bg-gray-50 hover:border-brand-300 hover:bg-brand-50 transition-all flex flex-col items-center justify-center gap-1"
                    >
                      <div className="w-8 h-8">
                        <ClipartPreview path={c.path} viewBox={c.viewBox} color="#555" />
                      </div>
                      <span className="text-[10px] text-gray-600 font-medium">{c.name}</span>
                    </button>
                  ))}
                </div>
                {elements.filter(e => e.type === 'clipart').length > 0 && (
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-xs text-gray-500">{elements.filter(e => e.type === 'clipart').length} clipart(s) on canvas</p>
                  </div>
                )}
              </div>
            )}

            {/* Shapes Tab */}
            {activeTab === 'shapes' && (
              <div className="p-4 space-y-4">
                <h3 className="text-sm font-bold text-dark">Shapes</h3>
                <div className="grid grid-cols-3 gap-3">
                  {SHAPES.map((s) => (
                    <button key={s.name} onClick={() => handleAddShape(s)}
                      className="aspect-square p-3 rounded-xl border border-gray-200 bg-gray-50 hover:border-brand-300 hover:bg-brand-50 transition-all flex flex-col items-center justify-center gap-1"
                    >
                      <span className="text-2xl text-gray-600">{s.icon}</span>
                      <span className="text-[10px] text-gray-600 font-medium">{s.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Canvas ── */}
        <div className="flex-1 p-4 md:p-6 bg-gray-50/30">
          <div className="mx-auto max-w-[500px]">
            <div ref={containerRef}
              className="relative w-full rounded-xl overflow-hidden border-2 border-gray-200 bg-white select-none drop-shadow-sm"
              onWheel={handleCanvasWheel}
              onMouseDown={handleCanvasMouseDown}
              onMouseMove={handleCanvasMouseMove}
              onMouseUp={handleCanvasMouseUp}
              onMouseLeave={handleCanvasMouseUp}
              style={{ touchAction: selectedId ? 'none' : 'auto', minHeight: '300px' }}
            >
              {productImage ? (
                <img src={productImage} alt={productName} className="w-full h-auto block pointer-events-none" />
              ) : (
                <div className="w-full aspect-[3/4] bg-gray-100 flex items-center justify-center text-gray-400 text-sm">No product image</div>
              )}

              {/* Design Elements */}
              {canvasSize.w > 0 && elements.map((el) => (
                <div key={el.id}
                  className={`absolute ${selectedId === el.id ? 'ring-2 ring-indigo-500 ring-offset-1 rounded-sm' : ''}`}
                  style={{
                    left: el.x, top: el.y, width: el.w, height: el.h,
                    cursor: selectedId === el.id ? (isDragging ? 'grabbing' : 'grab') : 'pointer',
                    zIndex: elements.indexOf(el) + 1,
                  }}
                  onClick={(e) => { e.stopPropagation(); setSelectedId(el.id); }}
                >
                  {el.type === 'image' && (
                    <img src={el.content} alt="" className="w-full h-full object-contain pointer-events-none" draggable={false} />
                  )}
                  {el.type === 'text' && (
                    <div className="w-full h-full flex items-center justify-center pointer-events-none overflow-hidden"
                      style={{
                        fontFamily: el.fontFamily || 'Arial',
                        fontSize: (el.fontSize || 32) + 'px',
                        color: el.color || '#333',
                        fontWeight: el.bold ? 'bold' : 'normal',
                        fontStyle: el.italic ? 'italic' : 'normal',
                        textShadow: '0 1px 2px rgba(0,0,0,0.15)',
                        lineHeight: 1.2,
                        textAlign: 'center',
                        wordBreak: 'break-word',
                      }}
                    >{el.content}</div>
                  )}
                  {el.type === 'clipart' && (
                    <div className="w-full h-full pointer-events-none">
                      {(() => {
                        const c = CLIPARTS.find((c) => c.name === el.content);
                        return c ? <ClipartPreview path={c.path} viewBox={c.viewBox} color={el.color || '#333'} /> : null;
                      })()}
                    </div>
                  )}
                  {el.type === 'shape' && (
                    <div className="w-full h-full flex items-center justify-center pointer-events-none">
                      {el.shapeType === 'square' && <div className="w-4/5 h-4/5 border-2 rounded" style={{ borderColor: el.color || '#333' }} />}
                      {el.shapeType === 'circle' && <div className="w-4/5 h-4/5 border-2 rounded-full" style={{ borderColor: el.color || '#333' }} />}
                      {el.shapeType === 'triangle' && (
                        <svg viewBox="0 0 100 100" className="w-4/5 h-4/5">
                          <polygon points="50,10 90,90 10,90" fill="none" stroke={el.color || '#333'} strokeWidth="3" />
                        </svg>
                      )}
                      {el.shapeType === 'diamond' && (
                        <svg viewBox="0 0 100 100" className="w-4/5 h-4/5">
                          <polygon points="50,10 90,50 50,90 10,50" fill="none" stroke={el.color || '#333'} strokeWidth="3" />
                        </svg>
                      )}
                      {el.shapeType === 'line' && (
                        <svg viewBox="0 0 100 100" className="w-4/5 h-4/5">
                          <line x1="10" y1="90" x2="90" y2="10" stroke={el.color || '#333'} strokeWidth="3" strokeLinecap="round" />
                        </svg>
                      )}
                      {el.shapeType === 'arrow' && (
                        <svg viewBox="0 0 100 100" className="w-4/5 h-4/5">
                          <line x1="10" y1="50" x2="80" y2="50" stroke={el.color || '#333'} strokeWidth="3" strokeLinecap="round" />
                          <polyline points="65,35 85,50 65,65" fill="none" stroke={el.color || '#333'} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {elements.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <p className="text-sm text-gray-400 mb-1">No design elements yet</p>
                    <p className="text-xs text-gray-300">Use the sidebar tools to add text, images, cliparts & shapes</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
              <span className="flex items-center gap-1"><IconMove /> Drag to move</span>
              <span>Scroll to resize</span>
              <span>Click to select</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Selected Element Properties ── */}
      {selectedEl && (
        <div className="border-t border-gray-200 bg-gray-50/80 px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-700">
              Selected: {selectedEl.type} — {selectedEl.type === 'text' ? selectedEl.content : selectedEl.content}
            </span>
            <button onClick={() => removeElement(selectedEl.id)}
              className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 hover:bg-red-50 px-2 py-1 rounded transition-colors"
            ><IconTrash /> Delete</button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <span>X: {Math.round(selectedEl.x)}</span>
              <span>Y: {Math.round(selectedEl.y)}</span>
              <span>W: {Math.round(selectedEl.w)}</span>
              <span>H: {Math.round(selectedEl.h)}</span>
            </div>
            <div className="flex gap-1">
              <button onClick={() => sendBackward(selectedEl.id)}
                className="px-2 py-1 text-xs border border-gray-200 rounded bg-white hover:bg-gray-50 text-gray-600"
              >Send Back</button>
              <button onClick={() => bringForward(selectedEl.id)}
                className="px-2 py-1 text-xs border border-gray-200 rounded bg-white hover:bg-gray-50 text-gray-600"
              >Bring Front</button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Size:</span>
              <input type="range" min="30" max="300" value={selectedEl.w}
                onChange={(e) => updateElement(selectedEl.id, { w: Number(e.target.value), h: selectedEl.type === 'text' ? Number(e.target.value) * 0.25 : Number(e.target.value) })}
                className="w-24 accent-brand-500 h-1.5"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
