import React from 'react';

import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { cn } from '~/lib/utils';
import { UpdateSessionForm } from '~/modules/sessions/components/UpdateSessionForm';
import { useSessionJira } from '~/modules/sessions/queries/useSessionJira';
import { useSessionStore } from '~/modules/sessions/stores/session.store';

import { replaceUndefinedWithEmptyString } from '../utils';
import { SetupJiraApiKeyForm } from './SetupJiraApiKeyForm';
import { SetupJiraSyncForm } from './SetupJiraSyncForm';

export const SetupBtnDialog = () => {
  const { id, name } = useSessionStore();
  const [open, setOpen] = React.useState(false);
  const { isLoading, data } = useSessionJira({ sessionId: id });
  if (!id) {
    throw Error('This component belongs to Session');
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={cn(['m-0'])}>Setup</Button>
      </DialogTrigger>
      <DialogTitle></DialogTitle>
      <DialogContent
        className="sm:max-w-[425px]"
        aria-disabled={isLoading}
        aria-describedby={undefined}
      >
        <Tabs defaultValue="setup-jira" className="w-full mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="setup-session">Setup Session</TabsTrigger>
            <TabsTrigger value="setup-jira">Setup Jira</TabsTrigger>
            <TabsTrigger value="setup-sync">Setup Sync</TabsTrigger>
          </TabsList>
          <TabsContent value="setup-session">
            <UpdateSessionForm
              onSuccess={() => {}}
              defaultValues={{ id, name }}
            />
          </TabsContent>
          <TabsContent value="setup-jira">
            <SetupJiraApiKeyForm
              onSuccess={() => {}}
              defaultValues={{ ...data }}
            />
          </TabsContent>
          <TabsContent value="setup-sync">
            <SetupJiraSyncForm
              onSuccess={() => {}}
              defaultValues={replaceUndefinedWithEmptyString({
                enableSync: data?.enableSync,
                point: data?.mappingFields?.point,
              })}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
