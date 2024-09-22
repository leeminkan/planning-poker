import { CopyIcon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import { useNavigate } from '@remix-run/react';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';
import { QueryIssueBtnDialog } from '~/modules/jira/components/QueryIssueBtnDialog';
import { SetupBtnDialog } from '~/modules/jira/components/SetupBtnDialog';

import { useClickOutside } from '../hooks/useClickOutside';
import { useSessionStore } from '../stores/session.store';
import { UpdateUserSessionBtnDialog } from './UpdateUserSessionBtnDialog';

const PageRightHeader = () => {
  const { id } = useSessionStore();
  const [showMenu, setShowMenu] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => {
    setShowMenu(false);
  });

  return (
    <>
      <div className="hidden md:flex gap-2">
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
          <CopyIcon className="h-4 w-4" />
        </Button>
      </div>
      <div className="md:hidden z-30">
        <Button
          variant="outline"
          onClick={() => {
            setShowMenu(!showMenu);
          }}
        >
          <HamburgerMenuIcon className="w-4 h-4" />
        </Button>
        {showMenu && (
          <div
            ref={ref}
            className={cn([
              'absolute bg-white p-4 mt-2 -translate-x-full',
              'flex flex-col gap-2',
              'rounded-md border-primary border-solid border',
              'shadow-lg',
            ])}
            role="presentation"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
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
              <CopyIcon className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

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
        <PageRightHeader />
      </div>
    </header>
  );
};
