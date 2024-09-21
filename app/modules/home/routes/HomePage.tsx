import { cn } from '~/lib/utils';

import { ConfirmationForm } from '../components/ConfirmationForm';
import { PageHeader } from '../components/PageHeader';
import { RecentSessionList } from '../components/RecentSessionList';

export const HomePage = () => {
  return (
    <div className="w-full">
      <PageHeader />
      <div
        className={cn([
          'w-full h-full mt-4',
          'flex flex-col gap-2 items-center justify-center',
        ])}
      >
        <ConfirmationForm />
        <RecentSessionList />
      </div>
    </div>
  );
};
