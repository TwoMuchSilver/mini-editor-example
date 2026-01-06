// components/blocks/ImageBlock.tsx
import { Block } from "@/types/block";

/* Next.js Image 컴포넌트를 써도 되지만, 
   일단 쉬운 이해를 위해 기본 img 태그 사용 */
interface Props {
  block: Block;
}

export default function ImageBlock({ block }: Props) {
  return (
    <div className="w-full">
      <img 
        src={block.content} 
        alt="Wedding Image" 
        className="w-full h-auto object-cover" // 꽉 차게 보이기
      />
    </div>
  );
}