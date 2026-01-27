// features/premium/components/PremiumGuard.tsx
'use client';

import { ReactNode } from 'react';

interface PremiumGuardProps {
  isPremium: boolean;
  onUpgrade: () => void;
  children: ReactNode;
  featureName?: string;
}

/**
 * 프리미엄 기능을 보호하는 컴포넌트
 * 프리미엄이 아니면 안내 메시지를 표시하고, 업그레이드 버튼을 제공합니다.
 */
export default function PremiumGuard({ 
  isPremium, 
  onUpgrade, 
  children, 
  featureName = '이 기능' 
}: PremiumGuardProps) {
  if (isPremium) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      {/* 반투명 오버레이 */}
      <div className="relative opacity-50 pointer-events-none">
        {children}
      </div>
      
      {/* 업그레이드 안내 오버레이 */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
        <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm mx-4 text-center">
          <div className="text-4xl mb-3">🔒</div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            프리미엄 기능
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            {featureName}을(를) 사용하려면<br />
            프리미엄 코드가 필요합니다
          </p>
          <button
            onClick={onUpgrade}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg"
          >
            코드 입력하기
          </button>
        </div>
      </div>
    </div>
  );
}
