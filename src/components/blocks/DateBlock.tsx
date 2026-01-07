// components/blocks/DateBlock.tsx
import { Block, WeddingDate } from "@/types/block";

interface Props {
  block: Block;
}

export default function DateBlock({ block }: Props) {
  const dateInfo = block.content as WeddingDate;
  
  // 데이터가 비어있으면 예시 데이터 표시
  const year = dateInfo.year || '2026';
  const month = dateInfo.month || '1';
  const day = dateInfo.day || '7';
  const time = dateInfo.time || '오후 1시';
  
  // 날짜 포맷팅
  const formattedDate = `${year}년 ${month}월 ${day}일`;
  
  return (
    <div className="w-full p-6 text-center bg-white">
      <div className="max-w-sm mx-auto">
        <p className="text-sm text-gray-500 mb-2">결혼식 날짜</p>
        <p className="text-2xl font-semibold text-gray-800 mb-2">
          {formattedDate}
        </p>
        {time && (
          <p className="text-lg text-gray-600">
            {time}
          </p>
        )}
      </div>
    </div>
  );
}

