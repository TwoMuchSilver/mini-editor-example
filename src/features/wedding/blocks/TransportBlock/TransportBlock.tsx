import { Block, TransportContent, TransportItem } from "@/shared/types/block";
import { TrainFront, BusFront, CarFront, CircleParking, Info } from "lucide-react";

interface Props {
  block: Block;
}

export default function TransportBlock({ block }: Props) {
  const content = block.content as TransportContent;
  const { variant = 'simple-list', className, padding: customPadding, fontSize: customFontSize, color: customColor, align: customAlign } = block.styles || {};

  // Variant Config: 각 스타일의 기본값 정의
  const variantConfig: Record<string, { 
    container: string;
    item: string;
    iconWrapper: string;
    label: string;
    text: string;
    defaultPadding: string;
    defaultFontSize: string;
    defaultColor: string;
    defaultAlign: 'left' | 'center' | 'right';
  }> = {
    // Simple Theme (List Style)
    'simple-list': {
      container: 'flex flex-col gap-4',
      item: 'flex items-start gap-3',
      iconWrapper: 'w-6 h-6 flex items-center justify-center shrink-0 mt-0.5 text-stone-400',
      label: 'font-bold min-w-[60px]',
      text: 'flex-1 leading-relaxed',
      defaultPadding: 'py-8 px-6',
      defaultFontSize: '15px',
      defaultColor: '#44403c',
      defaultAlign: 'left'
    },
    
    // Card Theme (Boxed Style)
    'card-grid': {
      container: 'grid gap-3',
      item: 'bg-stone-50 p-4 rounded-lg flex flex-col gap-2 items-center text-center',
      iconWrapper: 'w-8 h-8 flex items-center justify-center rounded-full bg-stone-200 text-stone-600 mb-1',
      label: 'font-bold text-sm',
      text: 'text-sm leading-relaxed opacity-80',
      defaultPadding: 'py-8 px-4',
      defaultFontSize: '14px',
      defaultColor: '#292524',
      defaultAlign: 'center'
    },

    // Minimal Theme (Clean, Divided)
    'minimal-divider': {
      container: 'divide-y divide-gray-100',
      item: 'py-3 flex items-center justify-between gap-4 first:pt-0 last:pb-0',
      iconWrapper: 'hidden', // Icon hidden for minimal look
      label: 'font-medium text-gray-900 min-w-[80px]',
      text: 'text-right text-gray-600 flex-1',
      defaultPadding: 'py-10 px-6',
      defaultFontSize: '14px',
      defaultColor: '#1f2937',
      defaultAlign: 'left'
    },

    // Classic Theme (Serif, Centered)
    'classic-centered': {
      container: 'flex flex-col gap-6 items-center',
      item: 'flex flex-col items-center gap-2 max-w-[280px]',
      iconWrapper: 'w-6 h-6 text-stone-800 mb-1',
      label: 'font-serif font-bold tracking-widest text-xs uppercase border-b border-stone-300 pb-1 mb-1',
      text: 'font-serif text-center leading-loose',
      defaultPadding: 'py-12 px-6',
      defaultFontSize: '15px',
      defaultColor: '#292524',
      defaultAlign: 'center'
    },
  };

  const currentVariant = variantConfig[variant] || variantConfig['simple-list'];
  
  // Custom overrides take precedence over defaults
  const finalPadding = customPadding || currentVariant.defaultPadding;
  const finalFontSize = customFontSize || currentVariant.defaultFontSize;
  const finalColor = customColor || currentVariant.defaultColor;
  // const finalAlign = customAlign || currentVariant.defaultAlign; // Align is often handled by flex classes in item/container

  const getIcon = (type: TransportItem['type']) => {
    switch (type) {
      case 'subway': return <TrainFront size="100%" />;
      case 'bus': return <BusFront size="100%" />;
      case 'car': return <CarFront size="100%" />;
      case 'parking': return <CircleParking size="100%" />;
      default: return <Info size="100%" />;
    }
  };

  const getDefaultLabel = (type: TransportItem['type']) => {
    switch (type) {
      case 'subway': return '지하철';
      case 'bus': return '버스';
      case 'car': return '자가용';
      case 'parking': return '주차안내';
      case 'etc': return '기타';
    }
  };

  if (!content?.items || content.items.length === 0) {
    return null;
  }

  return (
    <div 
      className={`w-full ${finalPadding} ${className || ''}`}
      style={{
        backgroundColor: block.styles?.backgroundColor,
        color: finalColor,
        fontSize: finalFontSize,
      }}
    >
      <div className={currentVariant.container}>
        {content.items.map((item, index) => (
          <div key={index} className={currentVariant.item}>
            {/* Icon */}
            <div className={currentVariant.iconWrapper}>
              {getIcon(item.type)}
            </div>

            {/* Label */}
            {(item.label || getDefaultLabel(item.type)) && (
              <div className={currentVariant.label}>
                {item.label || getDefaultLabel(item.type)}
              </div>
            )}

            {/* Text */}
            <div className={currentVariant.text}>
              {item.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
