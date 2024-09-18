import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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

import { useSetupJiraApiKeyApiMutation } from '../../mutations/useSetupJiraApiKeyApiMutation';
import { FormSchema, formSchema } from './types';

type SetupJiraApiKeyFormParams = {
  userId: string;
  onSuccess: () => void;
  defaultValues: Partial<FormSchema>;
};
export function SetupJiraApiKeyForm({
  userId,
  onSuccess,
  defaultValues,
}: SetupJiraApiKeyFormParams) {
  const { mutate, isLoading } = useSetupJiraApiKeyApiMutation({ onSuccess });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate({ userId, ...values });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div
          className={cn(['flex flex-col gap-2 items-baseline justify-center'])}
        >
          <FormField
            control={form.control}
            name="host"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Host</FormLabel>
                <FormControl>
                  <Input placeholder="Host" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="token"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Token</FormLabel>
                <FormControl>
                  <Input placeholder="Token" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button className="w-full mt-4" type="submit" disabled={isLoading}>
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
