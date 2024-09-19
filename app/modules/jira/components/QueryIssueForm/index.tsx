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

import { useQueryIssueMutation } from '../../mutations/useQueryIssueMutation';
import { FormSchema, formSchema } from './types';

type QueryIssueFormParams = {
  onSuccess: (issues: JiraIssue[]) => void;
  defaultValues: Partial<FormSchema>;
};
export function QueryIssueForm({
  onSuccess,
  defaultValues,
}: QueryIssueFormParams) {
  const { mutate, isLoading } = useQueryIssueMutation({ onSuccess });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
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
