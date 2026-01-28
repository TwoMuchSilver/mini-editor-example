import { DDayContent } from '@/shared/types/block';

export function useDDayBlock(content: DDayContent) {
  const year = content.year || '2026';
  const month = content.month || '06';
  const day = content.day || '15';
  const hour = content.hour || '14';
  const minute = content.minute || '00';

  // YYYY-MM-DD HH:mm:ss 형식으로 변환
  const weddingDateTime = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')} ${hour.padStart(2, '0')}:${minute.padStart(2, '0')}:00`;

  return {
    weddingDateTime,
  };
}
