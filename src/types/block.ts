// 1. 우리가 지원할 블록의 종류 (나중에 'map', 'video' 등 추가 가능)
export type BlockType = 'text' | 'image';

// 2. 블록 하나가 가져야 할 정보
export interface Block {
  id: string;        // 고유 ID (순서 바꿀 때 필수)
  type: BlockType;   // 텍스트, 이미지 등 블록의 종류 
  content: string;   // 내용 (텍스트면 글자, 이미지면 URL)
  
  // 3. 스타일 옵션 (선택 사항)
  styles?: {
    color?: string;
    backgroundColor?: string;
    align?: 'left' | 'center' | 'right';
    fontSize?: string; // '14px', '20px' 등
  };
}