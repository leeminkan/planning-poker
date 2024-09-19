import React from 'react';

import { Button } from '~/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '~/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { cn } from '~/lib/utils';

import { useJira } from '../queries/useJira';
import { SetupJiraApiKeyForm } from './SetupJiraApiKeyForm';
import { SetupJiraSyncForm } from './SetupJiraSyncForm';

export const JiraBtnDialog = () => {
  const [open, setOpen] = React.useState(false);
  const { isLoading, data } = useJira();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={cn(['m-0'])}>Jira</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" aria-disabled={isLoading}>
        <Tabs defaultValue="setup-jira" className="w-full mt-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="setup-jira">Setup Jira</TabsTrigger>
            <TabsTrigger value="setup-sync">Setup Sync</TabsTrigger>
          </TabsList>
          <TabsContent value="setup-jira">
            <SetupJiraApiKeyForm
              onSuccess={() => {}}
              defaultValues={{ ...data }}
            />
          </TabsContent>
          <TabsContent value="setup-sync">
            <SetupJiraSyncForm
              onSuccess={() => {}}
              defaultValues={{
                enableSync: data?.enableSync,
                pointField: data?.mappingFields.pointField,
              }}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
