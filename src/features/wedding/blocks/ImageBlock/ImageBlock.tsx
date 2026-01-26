// features/wedding/blocks/ImageBlock/ImageBlock.tsx
'use client';

import { Block } from "@/shared/types/block";
import { useImageBlock } from "./useImageBlock";
import Image from "next/image";
import { useLightbox } from "@/features/wedding/components/LightboxProvider";

interface Props {
  block: Block;
}

export default function ImageBlock({ block }: Props) {
  const { imageUrl } = useImageBlock(block.content);
  const { openLightbox } = useLightbox();

  return (
    <div 
      className="w-full cursor-pointer"
      onClick={() => openLightbox(imageUrl)}
    >
      <Image
        src={imageUrl} 
        alt="Wedding Image" 
        width={800}
        height={600}
        className="w-full h-auto object-cover hover:opacity-90 transition-opacity"
      />
    </div>
  );
}
