// components/blocks/TextBlock.tsx
import { Block } from "@/types/block";

interface Props {
  block: Block;
}

export default function TextBlock({ block }: Props) {
  // 스타일이 없으면 기본값 적용
  const { align = 'center', color = '#000', fontSize = '16px' } = block.styles || {};

  return (
    <div 
      className="w-full p-4"
      style={{ 
        textAlign: align, 
        color: color,
        fontSize: fontSize,
        whiteSpace: 'pre-wrap' // 줄바꿈 적용
      }}
    >
      {block.content}
    </div>
  );
}