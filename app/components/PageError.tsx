import { useNavigate } from '@remix-run/react';

import { Button } from '~/components/ui/button';

export const PageError = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        Oops! Something went wrong...
      </h1>
      <Button variant="outline" onClick={() => navigate('/')}>
        Comeback home
      </Button>
    </div>
  );
};
