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
import { useSessionStore } from '~/modules/sessions/stores/session.store';

import { useSetupJiraApiKeyApiMutation } from '../../mutations/useSetupJiraApiKeyApiMutation';
import { createEmptyObjectFromZodSchema } from '../../utils';
import { FormSchema, formSchema } from './types';

type SetupJiraApiKeyFormParams = {
  onSuccess: () => void;
  defaultValues: Partial<FormSchema>;
};
export function SetupJiraApiKeyForm({
  onSuccess,
  defaultValues,
}: SetupJiraApiKeyFormParams) {
  const { id } = useSessionStore();
  const { mutate, isLoading } = useSetupJiraApiKeyApiMutation({ onSuccess });

  // 1. Define your form.
  const emptyDefaultValue = createEmptyObjectFromZodSchema(formSchema);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...emptyDefaultValue,
      ...defaultValues,
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
