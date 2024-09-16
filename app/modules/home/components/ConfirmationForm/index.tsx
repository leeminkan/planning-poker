import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useNavigate } from '@remix-run/react';

import { Button } from '~/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';

import { formSchema } from './types';
import { cn } from '~/lib/utils';
import { useUserSessionStore } from '~/modules/user-session/stores/user-session.store';
import { useSessionStateMutation } from '~/modules/sessions/mutations/useSessionStateMutation';

export function ConfirmationForm() {
  const {
    name,
    actions: { setName },
  } = useUserSessionStore();
  const navigate = useNavigate();

  const { mutate, isLoading } = useSessionStateMutation({
    onSuccess: (data) => {
      return navigate(`/sessions/${data.id}`);
    },
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name,
      sessionId: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setName(values.name);
    mutate(values.sessionId);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn([
          ' p-4 max-w-40',
          'border-solid border-2',
          'flex flex-col gap-2',
        ])}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sessionId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Session ID</FormLabel>
              <FormControl>
                <Input placeholder="Session ID" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          Join!
        </Button>
      </form>
    </Form>
  );
}
