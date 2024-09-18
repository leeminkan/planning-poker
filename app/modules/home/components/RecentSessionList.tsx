import { Skeleton } from '~/components/ui/skeleton';
import { cn } from '~/lib/utils';
import { useRecentSessions } from '~/modules/sessions/queries/useRecentSessions';

import { SessionItem } from './SessionItem';

export const RecentSessionList = () => {
  const { data, isLoading } = useRecentSessions();

  return (
    <div
      className={cn([
        'w-full',
        'flex flex-col gap-2 items-center justify-center',
      ])}
    >
      <div className={cn(['flex w-[50%] justify-center'])}>Recent Sessions</div>
      {isLoading ? (
        <>
          <Skeleton className="w-[340px] h-[126px]" />
          <Skeleton className="w-[340px] h-[126px]" />
          <Skeleton className="w-[340px] h-[126px]" />
          <Skeleton className="w-[340px] h-[126px]" />
          <Skeleton className="w-[340px] h-[126px]" />
        </>
      ) : (
        <div className={cn(['p-4', 'flex flex-col gap-2'])}>
          {data?.map((item) => (
            <SessionItem key={item.id} session={item} />
          ))}
        </div>
      )}
    </div>
  );
};
