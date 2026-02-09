'use client';

import dynamic from 'next/dynamic';
import { Block, DDayContent } from '@/shared/types/block';
import { useDDayBlock } from './useDDayBlock';

const WeddingCountdown = dynamic(
  () => import('../../components/WeddingCountdown').then(mod => ({ default: mod.WeddingCountdown })),
  { ssr: false }
);

interface Props {
  block: Block;
}

export default function DDayBlock({ block }: Props) {
  const ddayInfo = block.content as DDayContent;
  const { weddingDateTime } = useDDayBlock(ddayInfo);
  const { color: customColor, className, variant = 'default', padding: customPadding } = block.styles || {};

  // Variant Config
  const variantConfig: Record<string, {
    defaultColor: string;
    defaultPadding: string;
  }> = {
    default: {
      defaultColor: 'inherit',
      defaultPadding: 'py-8',
    },
    modern: {
      defaultColor: 'inherit',
      defaultPadding: 'py-10',
    },
    circle: {
      defaultColor: '#a16207',
      defaultPadding: 'py-12',
    },
    classic: {
      defaultColor: '#1c1917',
      defaultPadding: 'py-10',
    },
    simple: {
      defaultColor: '#576b53',
      defaultPadding: 'py-8',
    },
  };

  const currentVariant = variantConfig[variant] || variantConfig.default;
  const color = customColor || currentVariant.defaultColor;
  const padding = customPadding || currentVariant.defaultPadding;

  return (
    <div className={`w-full ${padding} ${className || ''}`} style={{ color }}>
      <WeddingCountdown 
        weddingDate={weddingDateTime}
        color={color}
        variant={variant}
      />
    </div>
  );
}
