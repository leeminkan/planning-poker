import { useNavigate } from '@remix-run/react';

import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';
import { useStartNewSessionMutation } from '~/modules/sessions/mutations/useCreateSession';

import { ConfirmationForm } from '../components/ConfirmationForm';
import { RecentSessionList } from '../components/RecentSessionList';

export const HomePage = () => {
  const navigate = useNavigate();
  const { mutateAsync, isLoading } = useStartNewSessionMutation({
    onSuccess: (data) => {
      return navigate(`/sessions/${data.id}`);
    },
  });

  return (
    <div className="w-full">
      <header
        title="page-header"
        className={cn([
          'w-full p-4',
          'bg-white shadow-md',
          'flex items-center justify-between',
        ])}
      >
        <div>Home</div>
        <Button
          onClick={async () => {
            await mutateAsync();
          }}
          disabled={isLoading}
        >
          Start new session!
        </Button>
      </header>
      <div
        title="page-body"
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
