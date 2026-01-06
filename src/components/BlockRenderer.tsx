// components/BlockRenderer.tsx
//데이터를 받아서 화면에 뿌려주는 공장 같은 컴포넌트
import { Block } from "@/types/block";
import TextBlock from "./blocks/TextBlock";
import ImageBlock from "./blocks/ImageBlock";

interface Props {
  block: Block;
}

export default function BlockRenderer({ block }: Props) {
  // block.type에 따라 다른 컴포넌트를 리턴 (Switch Case)
  switch (block.type) {
    case 'text':
      return <TextBlock block={block} />;
    case 'image':
      return <ImageBlock block={block} />;
    default:
      return <div>알 수 없는 블록입니다.</div>;
  }
}