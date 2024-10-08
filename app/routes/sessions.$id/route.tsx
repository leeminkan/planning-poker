import { type LoaderFunction, type MetaFunction, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { SessionPage } from '~/modules/sessions/routes/SessionPage';
import { UserSessionWrapper } from '~/modules/user-session/components/UserSessionWrapper';

export const meta: MetaFunction = () => {
  return [
    { title: 'Planning Poker' },
    { name: 'description', content: 'Welcome to Planning Poker!' },
  ];
};

export const loader: LoaderFunction = async function ({ params }) {
  return json({ id: params.id });
};

type LoaderData = {
  id: string;
};
export default function Index() {
  const { id } = useLoaderData<LoaderData>();
  return (
    <UserSessionWrapper>
      <SessionPage id={id} />
    </UserSessionWrapper>
  );
}
