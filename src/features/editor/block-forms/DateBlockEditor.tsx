'use client';

import { WeddingDate } from '@/shared/types/block';

interface DateBlockEditorProps {
  content: WeddingDate;
  onUpdate: (content: WeddingDate) => void;
}

export default function DateBlockEditor({ content, onUpdate }: DateBlockEditorProps) {
  const dateInfo = content;

  const handleDateChange = (field: keyof WeddingDate) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onUpdate({
      ...dateInfo,
      [field]: e.target.value,
    });
  };

  const commonInputClass = "border border-border rounded p-2 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none";

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <label className="text-xs text-muted-foreground">예식 날짜</label>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={dateInfo.year}
            onChange={handleDateChange('year')}
            className={`${commonInputClass} w-20`}
            placeholder="2026"
          />
          <span className="text-xs text-muted-foreground">년</span>
          <input
            type="text"
            value={dateInfo.month}
            onChange={handleDateChange('month')}
            className={`${commonInputClass} w-16`}
            placeholder="6"
          />
          <span className="text-xs text-muted-foreground">월</span>
          <input
            type="text"
            value={dateInfo.day}
            onChange={handleDateChange('day')}
            className={`${commonInputClass} w-16`}
            placeholder="15"
          />
          <span className="text-xs text-muted-foreground">일</span>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-muted-foreground">예식 시간 (선택)</label>
        <input
          type="text"
          value={dateInfo.time || ''}
          onChange={handleDateChange('time')}
          className={commonInputClass}
          placeholder="오후 2시"
        />
      </div>
    </div>
  );
}
