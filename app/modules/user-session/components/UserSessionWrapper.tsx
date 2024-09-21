import React, { useEffect } from 'react';

import { PageError } from '~/components/PageError';
import { PageLoading } from '~/components/PageLoading';

import { useInitUserSessionStateMutation } from '../mutations/useInitUserSessionMutation';
import { useUserSessionStore } from '../stores/user-session.store';

interface UserSessionWrapperProps {
  children: React.ReactNode;
}
export const UserSessionWrapper: React.FC<UserSessionWrapperProps> = ({
  children,
}) => {
  const { id } = useUserSessionStore();
  const { mutate, isLoading, isError } = useInitUserSessionStateMutation();

  useEffect(() => {
    mutate();
  }, [mutate]);

  if (!id || isLoading) {
    return <PageLoading />;
  }

  if (isError) {
    return <PageError />;
  }

  return <>{children}</>;
};
