import type { MetaFunction } from '@remix-run/node';

import { HomePage } from '~/modules/home/routes/HomePage';

export const meta: MetaFunction = () => {
  return [
    { title: 'Planning Poker' },
    { name: 'description', content: 'Welcome to Planning Poker!' },
  ];
};

export default function Index() {
  return <HomePage />;
}
