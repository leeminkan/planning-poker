import { useNavigate } from '@remix-run/react';

import { SessionEntityInterface } from '~/shared/session-state.interface';

import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

export const SessionItem = ({
  session,
}: {
  session: SessionEntityInterface;
}) => {
  const navigate = useNavigate();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{session.id}</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-2 justify-between">
        <div>{session.name}</div>
        <Button
          variant="outline"
          onClick={() => {
            return navigate(`/sessions/${session.id}`);
          }}
        >
          Join
        </Button>
      </CardContent>
    </Card>
  );
};
