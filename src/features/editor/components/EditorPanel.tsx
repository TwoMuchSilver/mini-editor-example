// features/editor/components/EditorPanel.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useBlockStore } from '@/store/useBlockStore';
import SortableItem from './SortableItem';
import { updateProject, createProject, projectExists } from '@/shared/utils/storage';
import ShareModal from '@/features/share/components/ShareModal';
import TemplateSelector from '@/features/wedding/components/TemplateSelector';
import { useDragAndDrop } from '../hooks/useDragAndDrop';
import { useBlockManagement } from '../hooks/useBlockManagement';
import TextForm from './forms/TextForm';
import ImageForm from './forms/ImageForm';
import CoupleInfoForm from './forms/CoupleInfoForm';
import DateForm from './forms/DateForm';
import VenueForm from './forms/VenueForm';
import { CoupleInfo, WeddingDate, VenueInfo } from '@/shared/types/block';

interface EditorPanelProps {
  projectId?: string;
}

export default function EditorPanel({ projectId }: EditorPanelProps = {}) {
  const router = useRouter();
  const { theme } = useBlockStore();
  const { blocks, updateBlock } = useBlockManagement();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  // Drag and Drop 로직 (Hook으로 분리)
  const { handleDragEnd } = useDragAndDrop(blocks, useBlockStore.getState().setBlocks);

  // 저장 버튼 클릭 시
  const handleSave = () => {
    let currentProjectId = projectId;
    
    // 프로젝트 ID가 없거나 존재하지 않으면 새로 생성
    if (!currentProjectId || !projectExists(currentProjectId)) {
      currentProjectId = createProject(blocks, theme);
      // 새 프로젝트 생성 시 편집 페이지로 리다이렉트
      router.push(`/${currentProjectId}/edit`);
    } else {
      // 기존 프로젝트 업데이트
      updateProject(currentProjectId, blocks, theme);
    }
    
    // Phase 2 요구사항: /[projectId]/view 라우팅 사용
    const url = `${window.location.origin}/${currentProjectId}/view`;
    
    setShareUrl(url);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full h-full bg-gray-50 p-6 overflow-y-auto">
      <h2 className="text-xl font-bold mb-6">청첩장 편집</h2>
      
      {/* 👇 템플릿 선택기 추가 */}
      <TemplateSelector />
      
      {/* 저장 버튼 */}
      <div className="mb-6">
        <button 
          onClick={handleSave}
          className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 font-semibold shadow-md hover:shadow-lg transition-all duration-200"
        >
          💾 저장 & 공유하기
        </button>
      </div>
      {/* 1. DnD 컨텍스트 시작 : 이 태그 안은 물리법칙(드래그)가 적용됨 */}
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          
          {/* 2. 정렬 가능한 영역 설정 (vertical 리스트) : 이 태그 안은 드래그 가능한 리스트들*/}
          <SortableContext items={blocks} strategy={verticalListSortingStrategy}>
            
            {blocks.map((block) => (
              // 3. 아까 만든 움직이는 껍데기
              <SortableItem key={block.id} id={block.id}>
              
              {/* 블록 타입에 따라 다른 입력창 보여주기 */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-gray-500 uppercase">{block.type} BLOCK</span>
                
                {block.type === 'text' ? (
                  <TextForm
                    blockId={block.id}
                    initialData={typeof block.content === 'string' ? block.content : ''}
                    onUpdate={updateBlock}
                  />
                ) : block.type === 'image' ? (
                  <ImageForm
                    blockId={block.id}
                    initialData={typeof block.content === 'string' ? block.content : ''}
                    onUpdate={updateBlock}
                  />
                ) : block.type === 'couple_info' ? (
                  <CoupleInfoForm
                    blockId={block.id}
                    initialData={
                      typeof block.content !== 'string' && 'groomName' in block.content
                        ? block.content as CoupleInfo
                        : { groomName: '', groomFather: '', groomMother: '', brideName: '', brideFather: '', brideMother: '' }
                    }
                    onUpdate={(id, content) => updateBlock(id, content)}
                  />
                ) : block.type === 'date' ? (
                  <DateForm
                    blockId={block.id}
                    initialData={
                      typeof block.content !== 'string' && 'year' in block.content
                        ? block.content as WeddingDate
                        : { year: '', month: '', day: '', time: '' }
                    }
                    onUpdate={(id, content) => updateBlock(id, content)}
                  />
                ) : block.type === 'venue' ? (
                  <VenueForm
                    blockId={block.id}
                    initialData={
                      typeof block.content !== 'string' && 'name' in block.content
                        ? block.content as VenueInfo
                        : { name: '', address: '', hall: '' }
                    }
                    onUpdate={(id, content) => updateBlock(id, content)}
                  />
                ) : null}
              </div>

            </SortableItem>
          ))}
          
        </SortableContext>
      </DndContext>

      {/* 공유 모달 */}
      <ShareModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        url={shareUrl}
        blocks={blocks}
      />
    </div>
  );
}