// app/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { createProject } from '@/shared/utils/storage';
import { useBlockStore } from "@/store/useBlockStore";

export default function Home() {
  const router = useRouter();
  const { blocks, theme } = useBlockStore();

  // 새 프로젝트 생성 버튼 클릭 시
  const handleCreateNew = () => {
    const projectId = createProject(blocks, theme);
    router.push(`/${projectId}/edit`);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-800">청첩장 편집기</h1>
        <p className="text-gray-600">새로운 청첩장을 만들어보세요</p>
        <button
          onClick={handleCreateNew}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold shadow-md hover:shadow-lg transition-all duration-200"
        >
          ✨ 새 프로젝트 만들기
        </button>
      </div>
    </div>
  );
}
