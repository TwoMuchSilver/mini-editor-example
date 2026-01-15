'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  // 편집/뷰 페이지에서는 헤더 숨김
  if (pathname?.includes('/edit') || pathname?.includes('/view')) {
    return null;
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 로고 */}
          <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
            모청
          </Link>

          {/* 네비게이션 */}
          <nav className="flex items-center gap-6">
            <Link 
              href="/"
              className={`text-sm font-medium transition-colors ${
                pathname === '/' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              홈
            </Link>
            <Link 
              href="/dashboard"
              className={`text-sm font-medium transition-colors ${
                pathname === '/dashboard' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              대시보드
            </Link>
            <Link 
              href="/reviews"
              className={`text-sm font-medium transition-colors ${
                pathname === '/reviews' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              고객 리뷰
            </Link>
            <Link 
              href="/login"
              className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              로그인
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
