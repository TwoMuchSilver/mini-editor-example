// store/useBlockStore.ts
import { create } from 'zustand';
import { Block } from '@/types/block';

// 초기 데이터 (나중엔 서버에서 받아오거나 빈 배열로 시작)
const INITIAL_BLOCKS: Block[] = [
  { id: 'b1', type: 'image', content: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&w=800&q=80' },
  { id: 'b2', type: 'text', content: '김철수 & 이영희\n결혼합니다', styles: { fontSize: '24px', align: 'center' } },
  { id: 'b3', type: 'text', content: '2026년 1월 6일 오후 1시', styles: { fontSize: '16px', color: '#666', align: 'center' } },
];

interface BlockState {
  blocks: Block[];
  updateBlockContent: (id: string, newContent: string) => void;
  setBlocks: (newBlocks: Block[]) => void; // 순서 변경용
}

export const useBlockStore = create<BlockState>((set) => ({
  blocks: INITIAL_BLOCKS, // 실제(초기) 데이터터

  // 1. 내용 수정하기 (불변성 유지)
  updateBlockContent: (id, newContent) => 
    set((state) => ({
        // 배열을 돌면서 ID가 같은 놈을 찾아서 content만 갈아끼움 (불변성 유지)
      blocks: state.blocks.map((block) => 
        block.id === id ? { ...block, content: newContent } : block
      ),
    })),

  // 2. 블록 통째로 교체하기 (드래그 앤 드롭 후 순서 바뀐 배열 저장)
  setBlocks: (newBlocks) => set({ blocks: newBlocks }),
}));