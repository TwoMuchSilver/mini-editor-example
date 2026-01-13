// app/[projectId]/view/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { serverStorage } from '@/shared/utils/serverStorage';
import { extractMetadataFromBlocks } from '@/features/share/utils/metadata';
import ViewerContent from './ViewerContent';

interface PageProps {
  params: Promise<{ projectId: string }>;
}

// 서버 사이드에서 메타데이터 생성 (OG 태그 주입)
export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { projectId } = await params;
  
  try {
    const projectData = await serverStorage.load(projectId);
    
    if (!projectData) {
      return {
        title: '청첩장을 찾을 수 없습니다',
        description: '요청하신 청첩장을 찾을 수 없습니다.',
      };
    }

    const metadata = extractMetadataFromBlocks(projectData.blocks);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                    (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');

    return {
      title: metadata.title,
      description: metadata.description,
      openGraph: {
        title: metadata.title,
        description: metadata.description,
        images: [
          {
            url: metadata.imageUrl,
            width: 1200,
            height: 630,
            alt: metadata.title,
          },
        ],
        type: 'website',
        url: `${baseUrl}/${projectId}/view`,
      },
      twitter: {
        card: 'summary_large_image',
        title: metadata.title,
        description: metadata.description,
        images: [metadata.imageUrl],
      },
    };
  } catch (error) {
    console.error('메타데이터 생성 오류:', error);
    return {
      title: '모바일 청첩장',
      description: '소중한 날에 초대합니다.',
    };
  }
}

// 서버 컴포넌트로 데이터 페칭
export default async function ViewerPage({ params }: PageProps) {
  const { projectId } = await params;
  
  const projectData = await serverStorage.load(projectId);
  
  if (!projectData) {
    notFound();
  }

  return <ViewerContent blocks={projectData.blocks} theme={projectData.theme} />;
}
