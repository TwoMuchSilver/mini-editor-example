// components/blocks/ImageBlock.tsx
import { Block } from "@/types/block";

/* Next.js Image 컴포넌트를 써도 되지만, 
   일단 쉬운 이해를 위해 기본 img 태그 사용 */
interface Props {
  block: Block;
}

export default function ImageBlock({ block }: Props) {
  // 데이터가 비어있으면 예시 이미지 표시
  const imageUrl = (typeof block.content === 'string' && block.content) 
    ? block.content 
    : 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&w=800&q=80';
  
  return (
    <div className="w-full">
      <img 
        src={imageUrl} 
        alt="Wedding Image" 
        className="w-full h-auto object-cover" // 꽉 차게 보이기
      />
    </div>
  );
}