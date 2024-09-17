import { useNavigate } from '@remix-run/react';
import { toast } from 'react-toastify';

import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';

import { useSessionStore } from '../stores/session.store';
import { UpdateSessionBtnDialog } from './UpdateSessionBtnDialog';

export const PageHeader = () => {
  const { name, id } = useSessionStore();
  const navigate = useNavigate();

  return (
    <header
      title="page-header"
      className={cn([
        'p-4',
        'flex items-center justify-between',
        'bg-white shadow-md',
      ])}
    >
      <Button onClick={() => navigate('/')}>Home</Button>
      <div>{name || `Session: ${id}`}</div>
      <div className="flex gap-2">
        <UpdateSessionBtnDialog />
        <Button
          onClick={() => {
            navigator.clipboard
              .writeText(`http://localhost:3000/sessions/${id}`)
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
