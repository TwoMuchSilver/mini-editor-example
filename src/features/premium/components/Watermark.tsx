// features/premium/components/Watermark.tsx
'use client';

interface WatermarkProps {
  show: boolean;
}

/**
 * 워터마크 컴포넌트
 * 프리미엄이 아닌 경우 화면에 워터마크를 표시합니다.
 */
export default function Watermark({ show }: WatermarkProps) {
  if (!show) return null;

  return (
    <>
      {/* 중앙 워터마크 */}
      <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
        <div className="text-gray-400/30 text-6xl font-bold rotate-[-30deg] select-none">
          DEMO
        </div>
      </div>
      
      {/* 하단 워터마크 바 */}
      <div className="fixed bottom-0 left-0 right-0 bg-yellow-50 border-t-2 border-yellow-200 py-3 px-4 z-50 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚠️</span>
            <span className="text-yellow-800 font-semibold">
              데모 버전 - 워터마크가 표시됩니다
            </span>
          </div>
          <button
            onClick={() => {
              // 스크롤을 맨 위로 이동 (EditorPanel의 코드 입력 버튼으로)
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition-all whitespace-nowrap"
          >
            프리미엄으로 업그레이드 →
          </button>
        </div>
      </div>
    </>
  );
}
