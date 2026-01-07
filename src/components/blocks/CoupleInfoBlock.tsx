// components/blocks/CoupleInfoBlock.tsx
import { Block, CoupleInfo } from "@/types/block";

interface Props {
  block: Block;
}

export default function CoupleInfoBlock({ block }: Props) {
  const info = block.content as CoupleInfo;
  
  // 데이터가 비어있으면 예시 데이터 표시
  const groomName = info.groomName || '김철수';
  const groomFather = info.groomFather || '김00';
  const groomMother = info.groomMother || '박00';
  const brideName = info.brideName || '이영희';
  const brideFather = info.brideFather || '이00';
  const brideMother = info.brideMother || '최00';
  
  return (
    <div className="w-full p-6">
      <div className="max-w-md mx-auto">
        {/* 가로 배치: 신랑 | 하트 | 신부 */}
        <div className="flex items-start justify-center gap-6">
          
          {/* 신랑 */}
          <div className="flex-1 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">{groomName}</h3>
            <div className="text-xs text-gray-600 leading-relaxed">
              <div>{groomFather} · {groomMother}</div>
              <div className="mt-1">의 아들</div>
            </div>
          </div>

          {/* 하트 아이콘 */}
          <div className="text-3xl pt-1">❤️</div>

          {/* 신부 */}
          <div className="flex-1 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">{brideName}</h3>
            <div className="text-xs text-gray-600 leading-relaxed">
              <div>{brideFather} · {brideMother}</div>
              <div className="mt-1">의 딸</div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

