/**
 * ============================================================
 * 🚀 실제 프로젝트용 서버 컴포넌트 구조 (백엔드 연결 시 사용)
 * ============================================================
 * 
 * 이 파일은 예시입니다. 실제로 백엔드 DB를 연결할 때:
 * 1. 이 코드를 page.tsx에 적용
 * 2. localStorage 대신 서버에서 DB 조회
 * 3. generateMetadata로 Open Graph 태그 생성
 * 
 * 그러면 카카오톡, 페이스북 등에서 링크 공유 시
 * 예쁜 미리보기가 자동으로 표시됩니다!
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlockRenderer from '@/components/BlockRenderer';
import { Block } from '@/types/block';
import { extractMetadataFromBlocks } from '@/utils/metadata';

// ============================================================
// 1. 서버에서 메타데이터 생성 (Open Graph)
// ============================================================
export async function generateMetadata({ 
  params 
}: { 
  params: { id: string } 
}): Promise<Metadata> {
  // TODO: 실제 프로젝트에서는 여기서 DB 조회
  // 예시:
  // const blocks = await db.project.findUnique({ where: { id: params.id } });
  
  // 현재는 localStorage를 쓰므로 서버에서 접근 불가능
  // 임시로 기본값 반환
  const metadata = {
    title: '모바일 청첩장',
    description: '소중한 날에 초대합니다.',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&w=800&q=80'
  };
  
  /* 백엔드 연결 시 실제 코드:
  if (blocks) {
    const metadata = extractMetadataFromBlocks(blocks.data);
    return {
      title: metadata.title,
      description: metadata.description,
      openGraph: {
        title: metadata.title,
        description: metadata.description,
        images: [metadata.imageUrl],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: metadata.title,
        description: metadata.description,
        images: [metadata.imageUrl],
      },
    };
  }
  */

  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      images: [metadata.imageUrl],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
      images: [metadata.imageUrl],
    },
  };
}

// ============================================================
// 2. 서버 컴포넌트로 페이지 렌더링
// ============================================================
export default async function ViewerPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  // TODO: 실제 프로젝트에서는 여기서 DB 조회
  // const blocks = await db.project.findUnique({ where: { id: params.id } });
  
  // 현재는 localStorage를 쓰므로 클라이언트 컴포넌트 사용
  // (page.tsx 파일 참고)
  
  /* 백엔드 연결 시 실제 코드:
  if (!blocks) {
    notFound(); // 404 페이지로
  }

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-[375px] min-h-[500px] bg-white shadow-2xl rounded-3xl overflow-hidden">
        <div className="h-6 bg-gray-800 w-full"></div>
        <div className="flex flex-col">
          {blocks.data.map((block: Block) => (
            <BlockRenderer key={block.id} block={block} />
          ))}
        </div>
      </div>
    </main>
  );
  */

  return (
    <div className="p-10 text-center">
      <p>이 파일은 백엔드 연결 시 사용할 예시 코드입니다.</p>
      <p>실제 페이지는 page.tsx를 확인하세요.</p>
    </div>
  );
}

