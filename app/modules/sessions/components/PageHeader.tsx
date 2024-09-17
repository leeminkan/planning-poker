import { useNavigate } from '@remix-run/react';
import { toast } from 'react-toastify';

import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';

export const PageHeader = ({ id }: { id: string }) => {
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
      <div>Session: {id}</div>
      <div>
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
