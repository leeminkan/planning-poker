import { useNavigate } from '@remix-run/react';
import { toast } from 'react-toastify';

import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';
import { QueryIssueBtnDialog } from '~/modules/jira/components/QueryIssueBtnDialog';
import { SetupBtnDialog } from '~/modules/jira/components/SetupBtnDialog';

import { useSessionStore } from '../stores/session.store';
import { UpdateUserSessionBtnDialog } from './UpdateUserSessionBtnDialog';

export const PageHeader = () => {
  const { name, id } = useSessionStore();
  const navigate = useNavigate();

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
        {name || (id && `Session: ${id}`)}
      </div>
      <div className="flex gap-2 basis-2/5 justify-end">
        <QueryIssueBtnDialog />
        <SetupBtnDialog />
        <UpdateUserSessionBtnDialog />
        <Button
          variant="outline"
          onClick={() => {
            navigator.clipboard
              .writeText(`${window.ENV.HOST}/sessions/${id}`)
              .then(() => {
                toast('Copy successfully!');
              });
          }}
        >
          Copy Link
        </Button>
      </div>
    </header>
  );
};
