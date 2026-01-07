import { Block } from "@/types/block";

// 프로젝트 저장하기 (Create)
export const saveProject = (blocks: Block[]): string => {
  const id = Math.random().toString(36).substr(2, 9); // 랜덤 ID 생성 (예: 'x7z1a9')
  
  // DB(로컬스토리지)에 저장: 키는 ID, 값은 블록 데이터(JSON)
  localStorage.setItem(`wedding_${id}`, JSON.stringify(blocks));
  
  return id; // 생성된 ID 반환
};

// 프로젝트 불러오기 (Read)
export const loadProject = (id: string): Block[] | null => {
  const data = localStorage.getItem(`wedding_${id}`);
  if (!data) return null;
  return JSON.parse(data);
};