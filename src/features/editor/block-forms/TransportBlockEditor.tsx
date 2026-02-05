'use client';

import { TransportContent, TransportItem } from '@/shared/types/block';
import { Plus, Trash2, TrainFront, BusFront, CarFront, CircleParking, Info } from 'lucide-react';

interface TransportBlockEditorProps {
  content: TransportContent;
  onUpdate: (content: TransportContent) => void;
}

export default function TransportBlockEditor({ content, onUpdate }: TransportBlockEditorProps) {
  const items = content.items || [];

  const handleAddItem = () => {
    const newItem: TransportItem = {
      type: 'subway',
      text: '',
      label: ''
    };
    onUpdate({
      ...content,
      items: [...items, newItem]
    });
  };

  const handleRemoveItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    onUpdate({
      ...content,
      items: newItems
    });
  };

  const handleUpdateItem = (index: number, updates: Partial<TransportItem>) => {
    const newItems = items.map((item, i) => {
      if (i === index) {
        return { ...item, ...updates };
      }
      return item;
    });
    onUpdate({
      ...content,
      items: newItems
    });
  };

  const typeOptions: { value: TransportItem['type']; label: string; icon: React.ReactNode }[] = [
    { value: 'subway', label: '지하철', icon: <TrainFront size={16} /> },
    { value: 'bus', label: '버스', icon: <BusFront size={16} /> },
    { value: 'car', label: '자가용', icon: <CarFront size={16} /> },
    { value: 'parking', label: '주차장', icon: <CircleParking size={16} /> },
    { value: 'etc', label: '기타', icon: <Info size={16} /> },
  ];

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="border border-border rounded-lg p-3 bg-muted/30 relative group">
          <button
            onClick={() => handleRemoveItem(index)}
            className="absolute top-2 right-2 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
            title="삭제"
          >
            <Trash2 size={16} />
          </button>

          <div className="space-y-3">
            {/* Type Selector */}
            <div className="flex gap-2 flex-wrap">
              {typeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleUpdateItem(index, { type: option.value })}
                  className={`flex items-center gap-1 px-2 py-1.5 rounded text-xs font-medium transition-colors border ${
                    item.type === option.value
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background hover:bg-muted text-muted-foreground border-border'
                  }`}
                >
                  {option.icon}
                  {option.label}
                </button>
              ))}
            </div>

            {/* Fields */}
            <div className="grid gap-2">
              <input
                type="text"
                value={item.label || ''}
                onChange={(e) => handleUpdateItem(index, { label: e.target.value })}
                placeholder="라벨 (선택: 예 '2호선')"
                className="w-full border border-border rounded p-2 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              />
              <textarea
                value={item.text}
                onChange={(e) => handleUpdateItem(index, { text: e.target.value })}
                placeholder="상세 안내 문구 (예: 강남역 1번 출구 도보 5분)"
                className="w-full border border-border rounded p-2 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none min-h-15"
                rows={2}
              />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={handleAddItem}
        className="w-full py-2 border-2 border-dashed border-border rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-muted/50 transition-colors flex items-center justify-center gap-2"
      >
        <Plus size={16} />
        교통편 추가하기
      </button>
    </div>
  );
}
