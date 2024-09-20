import { useNavigate } from '@remix-run/react';

import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';
import { useStartNewSessionMutation } from '~/modules/sessions/mutations/useCreateSession';

export const PageHeader = () => {
  const navigate = useNavigate();
  const { mutateAsync, isLoading } = useStartNewSessionMutation({
    onSuccess: (data) => {
      return navigate(`/sessions/${data.id}`);
    },
  });

  return (
    <header
      className={cn([
        'p-4',
        'flex items-center justify-between gap-2',
        'bg-white shadow-md',
      ])}
    >
      <div className="flex basis-2/5 justify-start">
        <Button variant="outline" onClick={() => navigate('/')}>
          Home
        </Button>
      </div>
      <div
        className={cn([
          'flex basis-1/5 justify-center text-center',
          'text-primary font-bold text-2xl',
        ])}
      >
        Home
      </div>
      <div className="flex gap-2 basis-2/5 justify-end">
        <Button
          variant="outline"
          onClick={async () => {
            await mutateAsync();
          }}
          disabled={isLoading}
        >
          Start new session!
        </Button>
      </div>
    </header>
  );
};
