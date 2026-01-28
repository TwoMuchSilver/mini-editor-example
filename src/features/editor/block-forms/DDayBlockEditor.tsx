'use client';

import { DDayContent } from '@/shared/types/block';

interface DDayBlockEditorProps {
  content: DDayContent;
  onUpdate: (content: DDayContent) => void;
}

export default function DDayBlockEditor({ content, onUpdate }: DDayBlockEditorProps) {
  const ddayInfo = content;

  const handleChange = (field: keyof DDayContent) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onUpdate({
      ...ddayInfo,
      [field]: e.target.value,
    });
  };

  const commonInputClass = "border border-border rounded p-2 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none";

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <label className="text-xs text-muted-foreground">결혼식 날짜</label>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={ddayInfo.year || ''}
            onChange={handleChange('year')}
            className={`${commonInputClass} w-20`}
            placeholder="2026"
            maxLength={4}
          />
          <span className="text-xs text-muted-foreground">년</span>
          <input
            type="text"
            value={ddayInfo.month || ''}
            onChange={handleChange('month')}
            className={`${commonInputClass} w-16`}
            placeholder="06"
            maxLength={2}
          />
          <span className="text-xs text-muted-foreground">월</span>
          <input
            type="text"
            value={ddayInfo.day || ''}
            onChange={handleChange('day')}
            className={`${commonInputClass} w-16`}
            placeholder="15"
            maxLength={2}
          />
          <span className="text-xs text-muted-foreground">일</span>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-muted-foreground">예식 시간</label>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={ddayInfo.hour || ''}
            onChange={handleChange('hour')}
            className={`${commonInputClass} w-16`}
            placeholder="14"
            maxLength={2}
          />
          <span className="text-xs text-muted-foreground">시</span>
          <input
            type="text"
            value={ddayInfo.minute || ''}
            onChange={handleChange('minute')}
            className={`${commonInputClass} w-16`}
            placeholder="00"
            maxLength={2}
          />
          <span className="text-xs text-muted-foreground">분</span>
        </div>
      </div>
    </div>
  );
}
