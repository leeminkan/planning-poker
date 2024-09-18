import { useNavigate } from '@remix-run/react';
import { toast } from 'react-toastify';

import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';

import { useSessionStore } from '../stores/session.store';
import { UpdateSessionBtnDialog } from './UpdateSessionBtnDialog';
import { UpdateUserSessionBtnDialog } from './UpdateUserSessionBtnDialog';

export const PageHeader = () => {
  const { name, id } = useSessionStore();
  const navigate = useNavigate();

  return (
    <header
      title="page-header"
      className={cn([
        'p-4',
        'flex items-center justify-between gap-2',
        'bg-white shadow-md',
      ])}
    >
      <div className="flex basis-1/4 justify-start">
        <Button onClick={() => navigate('/')}>Home</Button>
      </div>
      <div className="flex basis-1/2 justify-center text-center">
        {name || (id && `Session: ${id}`)}
      </div>
      <div className="flex gap-2 basis-1/4 justify-end">
        <UpdateUserSessionBtnDialog />
        <UpdateSessionBtnDialog />
        <Button
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
