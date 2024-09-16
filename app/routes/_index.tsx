import type { MetaFunction } from '@remix-run/node';
import { HomePage } from '~/modules/home/routes/HomePage';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  return <HomePage />;
}
