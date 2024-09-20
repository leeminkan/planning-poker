import { cn } from '~/lib/utils';

import { ConfirmationForm } from '../components/ConfirmationForm';
import { RecentSessionList } from '../components/RecentSessionList';
import { PageHeader } from './PageHeader';

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
