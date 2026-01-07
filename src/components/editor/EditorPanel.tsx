// components/editor/EditorPanel.tsx
'use client';

import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useBlockStore } from '@/store/useBlockStore';
import SortableItem from './SortableItem';
import { saveProject } from '@/utils/storage';

export default function EditorPanel() {
  const { blocks, setBlocks, updateBlockContent } = useBlockStore();

  // 드래그가 끝났을 때 실행되는 함수 (제일 중요!)
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // active: 내가 잡은 놈, over: 내가 놓은 위치에 있는 놈
    if (over && active.id !== over.id) {
      const oldIndex = blocks.findIndex((b) => b.id === active.id);
      const newIndex = blocks.findIndex((b) => b.id === over.id);
      
      // 배열 순서 바꾸기 유틸리티 (dnd-kit 제공)
      const newBlocks = arrayMove(blocks, oldIndex, newIndex);
      setBlocks(newBlocks); // Zustand 업데이트 -> 화면 갱신
    }
  };

  // 추가된 함수: 저장 버튼 클릭 시
  const handleSave = () => {
    const id = saveProject(blocks); // 1. 저장하고 ID 받기
    const url = `${window.location.origin}/view/${id}`; // 2. 공유 URL 만들기
    
    alert(`저장되었습니다!\n이 주소를 공유하세요:\n${url}`);
    // 실제로는 여기서 클립보드 복사 등을 구현함
  };

  return (
    <div className="w-full h-full bg-gray-50 p-6 overflow-y-auto">
      <h2 className="text-xl font-bold mb-6">청첩장 편집</h2>
      {/* 저장 버튼 추가 */}
      <button 
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm font-bold"
        >
          저장 & 공유
        </button>
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
                  <textarea
                    className="w-full border rounded p-2 text-sm"
                    rows={3}
                    value={block.content}
                    onChange={(e) => updateBlockContent(block.id, e.target.value)}
                  />
                ) : (
                  <input
                    type="text"
                    className="w-full border rounded p-2 text-sm"
                    value={block.content}
                    placeholder="이미지 URL 입력"
                    onChange={(e) => updateBlockContent(block.id, e.target.value)}
                  />
                )}
              </div>

            </SortableItem>
          ))}
          
        </SortableContext>
      </DndContext>
    </div>
  );
}