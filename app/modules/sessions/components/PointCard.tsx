import { MouseEventHandler } from 'react';

import { cn } from '~/lib/utils';

type PointCardProps = {
  onClick?: MouseEventHandler;
  isFlipped: boolean;
  isActive?: boolean;
  content: string | null;
  enableHover?: boolean;
};
export function PointCard({
  onClick,
  isFlipped,
  isActive,
  content,
  enableHover,
}: PointCardProps) {
  return (
    <div
      className={cn([
        'w-8 h-10',
        'md:w-16 md:h-20',
        isActive ? 'transition-transform -translate-y-10' : '',
        'z-10',
      ])}
      role="presentation"
      onClick={onClick}
    >
      {isFlipped ? (
        <div
          className={cn([
            'w-full h-full',
            'flex items-center justify-center',
            'rounded-lg',
            'shadow-md',
            'text-primary',
            content ? 'shadow-primary bg-white-500' : 'bg-gray-500',
            enableHover ? 'hover:bg-gray-200 hover:cursor-pointer' : '',
          ])}
        >
          <h1 className="text-xl">{content}</h1>
        </div>
      ) : (
        <div
          className={cn([
            'w-full h-full',
            'flex items-center justify-center',
            'rounded-lg',
            'shadow-lg',
            content ? 'bg-red-500' : 'bg-gray-500',
          ])}
        >
          {content ? '✌️' : ''}
        </div>
      )}
    </div>
  );
}
