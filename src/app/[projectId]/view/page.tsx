// app/[projectId]/view/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { loadProject } from '@/shared/utils/storage';
import { Block, GlobalTheme } from '@/shared/types/block';
import BlockRenderer from '@/shared/components/BlockRenderer';
import DynamicMetaTags from '@/features/share/components/DynamicMetaTags';

export default function ViewerPage() {
  const params = useParams();
  const projectId = params.projectId as string;
  
  const [blocks, setBlocks] = useState<Block[] | null>(null);
  const [theme, setTheme] = useState<GlobalTheme>({
    backgroundColor: '#ffffff',
    fontFamily: 'system-ui, sans-serif',
    primaryColor: '#6366f1'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 프로젝트 ID로 데이터 로드
    if (projectId) {
      const projectData = loadProject(projectId);
      if (projectData) {
        setBlocks(projectData.blocks);
        setTheme(projectData.theme);
      }
      setLoading(false);
    }
  }, [projectId]);

  if (loading) return <div className="text-center p-10">로딩 중...</div>;
  if (!blocks) return <div className="text-center p-10">청첩장을 찾을 수 없습니다. 😢</div>;

  return (
    <>
      {/* 동적 메타 태그 (클라이언트에서 업데이트 - 제한적) */}
      <DynamicMetaTags blocks={blocks} />
      
      <main className="min-h-screen bg-gray-100 flex justify-center py-8 px-4">
        {/* 핸드폰 모양 프레임 (편집 기능 없음!) */}
        <div className="w-[375px] h-fit shadow-2xl rounded-3xl overflow-hidden border-3 border-gray-800">
          <div className="h-6 bg-gray-800 w-full"></div>
          
          <div 
            className="flex flex-col"
            style={{ 
              backgroundColor: theme.backgroundColor,
              fontFamily: theme.fontFamily 
            }}
          >
            {/* 핵심: 에디터에서 썼던 그 BlockRenderer를 그대로 재사용! 
               하지만 드래그 기능도, 편집 기능도 없는 '순수 뷰어' 상태임.
               Read-only Component 재사용 ✅
            */}
            {blocks.map((block) => (
              <BlockRenderer key={block.id} block={block} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
