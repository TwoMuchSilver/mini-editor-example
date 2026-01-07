// components/blocks/VenueBlock.tsx
import { Block, VenueInfo } from "@/types/block";

interface Props {
  block: Block;
}

export default function VenueBlock({ block }: Props) {
  const venue = block.content as VenueInfo;
  
  // 데이터가 비어있으면 예시 데이터 표시
  const name = venue.name || '그랜드 웨딩홀';
  const hall = venue.hall || '3층 그랜드홀';
  const address = venue.address || '서울특별시 강남구 테헤란로 123';
  
  return (
    <div className="w-full p-6 bg-gray-50">
      <div className="max-w-sm mx-auto text-center">
        <p className="text-sm text-gray-500 mb-3">예식장</p>
        
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {name}
        </h3>
        
        {hall && (
          <p className="text-md text-gray-600 mb-3">
            {hall}
          </p>
        )}
        
        <p className="text-sm text-gray-600 leading-relaxed">
          {address}
        </p>
      </div>
    </div>
  );
}

