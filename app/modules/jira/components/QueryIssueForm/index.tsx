import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { JiraIssue } from '~/shared/jira.interface';

import { Button } from '~/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { cn } from '~/lib/utils';
import { useSessionStore } from '~/modules/sessions/stores/session.store';

import { useQueryIssueMutation } from '../../mutations/useQueryIssueMutation';
import { formSchema } from './types';

type QueryIssueFormParams = {
  onSuccess: (issues: JiraIssue[]) => void;
};
export function QueryIssueForm({ onSuccess }: QueryIssueFormParams) {
  const { id } = useSessionStore();
  const { mutate, isLoading } = useQueryIssueMutation({ onSuccess });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jql: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate({ sessionId: id, ...values });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div
          className={cn(['flex flex-col gap-2 items-baseline justify-center'])}
        >
          <FormField
            control={form.control}
            name="jql"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>JQL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="project = SCRUM ORDER BY Rank ASC"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button className="w-full mt-4" type="submit" disabled={isLoading}>
            Query
          </Button>
        </div>
      </form>
    </Form>
  );
}
